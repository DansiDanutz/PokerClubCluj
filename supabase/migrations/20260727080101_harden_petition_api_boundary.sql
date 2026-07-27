-- Phase A is intentionally backward compatible: the hardened overloads are
-- installed before the application switches traffic to them. Direct anon table
-- access and legacy RPCs are removed by the follow-up enforcement migration.

begin;

alter table public.petition_admin_config
  add column if not exists api_secret_hash text;

comment on column public.petition_admin_config.api_secret_hash is
  'bcrypt hash of the server-only PETITION_API_SECRET; never store plaintext';

create or replace function public.petition_api_authorized(p_api_secret text)
returns boolean
language sql
stable
security definer
set search_path to 'public'
as $function$
  select exists (
    select 1
    from public.petition_admin_config
    where id = 1
      and api_secret_hash is not null
      and api_secret_hash = extensions.crypt(p_api_secret, api_secret_hash)
  );
$function$;

create or replace function public.petition_admin_authorized(
  p_email text,
  p_secret text,
  p_api_secret text
)
returns boolean
language sql
stable
security definer
set search_path to 'public'
as $function$
  select exists (
    select 1
    from public.petition_admin_config
    where id = 1
      and public.petition_api_authorized(p_api_secret)
      and lower(admin_email) = lower(p_email)
      and case
        when admin_secret like '$2%' then
          admin_secret = extensions.crypt(p_secret, admin_secret)
        else admin_secret = p_secret
      end
  );
$function$;

create or replace function public.petition_submit(
  p_full_name text,
  p_email text,
  p_city text,
  p_comment text,
  p_ip text,
  p_user_agent text,
  p_lang text,
  p_api_secret text
)
returns boolean
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_full_name text := trim(coalesce(p_full_name, ''));
  v_email text := lower(trim(coalesce(p_email, '')));
  v_city text := nullif(trim(coalesce(p_city, '')), '');
  v_comment text := nullif(trim(coalesce(p_comment, '')), '');
begin
  if not public.petition_api_authorized(p_api_secret) then
    raise exception 'unauthorized';
  end if;
  if length(v_full_name) < 3 or length(v_full_name) > 120 then
    raise exception 'invalid full name';
  end if;
  if length(v_email) > 254
     or v_email !~ '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$' then
    raise exception 'invalid email';
  end if;
  if length(coalesce(v_city, '')) > 80
     or length(coalesce(v_comment, '')) > 2000
     or length(coalesce(p_ip, '')) > 64
     or length(coalesce(p_user_agent, '')) > 300
     or length(coalesce(p_lang, '')) > 120 then
    raise exception 'invalid field length';
  end if;

  insert into public.petition_signatures (
    full_name, email, city, comment, ip, user_agent, lang
  ) values (
    v_full_name,
    v_email,
    v_city,
    v_comment,
    nullif(trim(coalesce(p_ip, '')), ''),
    nullif(p_user_agent, ''),
    nullif(p_lang, '')
  )
  on conflict do nothing;

  -- New and duplicate addresses deliberately have the same response.
  return true;
end;
$function$;

create or replace function public.petition_stats(p_api_secret text)
returns json
language plpgsql
stable
security definer
set search_path to 'public'
as $function$
declare
  v json;
begin
  if not public.petition_api_authorized(p_api_secret) then
    raise exception 'unauthorized';
  end if;

  select json_build_object(
    'count', (select count(*) from public.petition_signatures),
    'recent', (
      select coalesce(json_agg(t), '[]'::json) from (
        select
          split_part(trim(full_name), ' ', 1) || ' ' ||
          coalesce(left(nullif(split_part(trim(full_name), ' ', 2), ''), 1) || '.', '') as name,
          coalesce(city, '') as city,
          to_char(created_at, 'DD.MM.YYYY') as date,
          case when comment_approved then coalesce(comment, '') else '' end as comment
        from public.petition_signatures
        order by
          (comment_approved and comment is not null and length(trim(comment)) > 0) desc,
          created_at desc
        limit 40
      ) t
    ),
    'messages', (
      select coalesce(json_agg(m), '[]'::json) from (
        select
          ps.id,
          split_part(trim(ps.full_name), ' ', 1) || ' ' ||
          coalesce(left(nullif(split_part(trim(ps.full_name), ' ', 2), ''), 1) || '.', '') as name,
          coalesce(ps.city, '') as city,
          to_char(ps.created_at, 'DD.MM.YYYY') as date,
          ps.comment,
          ps.featured,
          (select count(*) from public.petition_comment_likes l where l.signature_id = ps.id) as likes
        from public.petition_signatures ps
        where ps.comment_approved = true
          and ps.comment is not null
          and length(trim(ps.comment)) > 0
        order by
          ps.featured desc,
          (select count(*) from public.petition_comment_likes l where l.signature_id = ps.id) desc,
          ps.created_at desc
        limit 60
      ) m
    )
  ) into v;
  return v;
end;
$function$;

create or replace function public.petition_like(
  p_id uuid,
  p_ip text,
  p_api_secret text
)
returns integer
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_count int;
begin
  if not public.petition_api_authorized(p_api_secret) then
    raise exception 'unauthorized';
  end if;
  if length(coalesce(p_ip, '')) > 64 then
    raise exception 'invalid ip';
  end if;

  insert into public.petition_comment_likes (signature_id, ip)
  values (p_id, coalesce(nullif(trim(p_ip), ''), 'unknown'))
  on conflict (signature_id, ip) do nothing;

  select count(*) into v_count
  from public.petition_comment_likes
  where signature_id = p_id;
  return v_count;
end;
$function$;

create or replace function public.petition_admin_list(
  p_email text,
  p_secret text,
  p_api_secret text
)
returns json
language plpgsql
stable
security definer
set search_path to 'public'
as $function$
declare
  v json;
begin
  if not public.petition_admin_authorized(p_email, p_secret, p_api_secret) then
    raise exception 'unauthorized';
  end if;

  select coalesce(json_agg(t), '[]'::json) into v from (
    select ps.id, ps.full_name, ps.email, ps.city, ps.comment,
           ps.comment_approved, ps.flagged, ps.featured, ps.created_at,
           ps.ip, ps.user_agent, ps.lang,
           (select count(*) from public.petition_comment_likes l
             where l.signature_id = ps.id) as likes,
           exists(select 1 from public.petition_blocked_ips b
             where b.ip = ps.ip) as ip_blocked
    from public.petition_signatures ps
    order by ps.created_at desc
  ) t;
  return v;
end;
$function$;

create or replace function public.petition_admin_delete(
  p_email text,
  p_secret text,
  p_id uuid,
  p_api_secret text
)
returns integer
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_deleted int;
  v_ip text;
begin
  if not public.petition_admin_authorized(p_email, p_secret, p_api_secret) then
    raise exception 'unauthorized';
  end if;

  select ip into v_ip from public.petition_signatures where id = p_id;
  delete from public.petition_signatures where id = p_id;
  get diagnostics v_deleted = row_count;
  if v_deleted > 0 and v_ip is not null and v_ip <> 'unknown' then
    insert into public.petition_blocked_ips (ip, reason)
    values (v_ip, 'sters din admin')
    on conflict (ip) do nothing;
  end if;
  return v_deleted;
end;
$function$;

create or replace function public.petition_admin_restore(
  p_email text,
  p_secret text,
  p_id uuid,
  p_api_secret text
)
returns boolean
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_ip text;
begin
  if not public.petition_admin_authorized(p_email, p_secret, p_api_secret) then
    raise exception 'unauthorized';
  end if;
  select ip into v_ip from public.petition_signatures where id = p_id;
  update public.petition_signatures
    set comment_approved = true, flagged = false
    where id = p_id;
  if v_ip is not null then
    delete from public.petition_blocked_ips where ip = v_ip;
  end if;
  return true;
end;
$function$;

create or replace function public.petition_admin_set_block(
  p_email text,
  p_secret text,
  p_id uuid,
  p_blocked boolean,
  p_api_secret text
)
returns boolean
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_ip text;
begin
  if not public.petition_admin_authorized(p_email, p_secret, p_api_secret) then
    raise exception 'unauthorized';
  end if;
  select ip into v_ip from public.petition_signatures where id = p_id;
  if v_ip is null or v_ip = 'unknown' then return false; end if;
  if p_blocked then
    insert into public.petition_blocked_ips (ip, reason)
    values (v_ip, 'blocat manual')
    on conflict (ip) do nothing;
  else
    delete from public.petition_blocked_ips where ip = v_ip;
  end if;
  return true;
end;
$function$;

create or replace function public.petition_admin_set_featured(
  p_email text,
  p_secret text,
  p_id uuid,
  p_featured boolean,
  p_api_secret text
)
returns boolean
language plpgsql
security definer
set search_path to 'public'
as $function$
begin
  if not public.petition_admin_authorized(p_email, p_secret, p_api_secret) then
    raise exception 'unauthorized';
  end if;
  update public.petition_signatures set featured = p_featured where id = p_id;
  return found;
end;
$function$;

create or replace function public.petition_admin_set_flag(
  p_email text,
  p_secret text,
  p_id uuid,
  p_flagged boolean,
  p_api_secret text
)
returns boolean
language plpgsql
security definer
set search_path to 'public'
as $function$
begin
  if not public.petition_admin_authorized(p_email, p_secret, p_api_secret) then
    raise exception 'unauthorized';
  end if;
  update public.petition_signatures set flagged = p_flagged where id = p_id;
  return found;
end;
$function$;

create or replace function public.petition_admin_set_visibility(
  p_email text,
  p_secret text,
  p_id uuid,
  p_visible boolean,
  p_api_secret text
)
returns boolean
language plpgsql
security definer
set search_path to 'public'
as $function$
begin
  if not public.petition_admin_authorized(p_email, p_secret, p_api_secret) then
    raise exception 'unauthorized';
  end if;
  update public.petition_signatures
    set comment_approved = p_visible
    where id = p_id;
  return found;
end;
$function$;

revoke execute on function public.petition_api_authorized(text)
  from public, anon, authenticated;
revoke execute on function public.petition_admin_authorized(text, text, text)
  from public, anon, authenticated;

revoke execute on function public.petition_submit(text, text, text, text, text, text, text, text)
  from public, authenticated;
revoke execute on function public.petition_stats(text)
  from public, authenticated;
revoke execute on function public.petition_like(uuid, text, text)
  from public, authenticated;
revoke execute on function public.petition_admin_list(text, text, text)
  from public, authenticated;
revoke execute on function public.petition_admin_delete(text, text, uuid, text)
  from public, authenticated;
revoke execute on function public.petition_admin_restore(text, text, uuid, text)
  from public, authenticated;
revoke execute on function public.petition_admin_set_block(text, text, uuid, boolean, text)
  from public, authenticated;
revoke execute on function public.petition_admin_set_featured(text, text, uuid, boolean, text)
  from public, authenticated;
revoke execute on function public.petition_admin_set_flag(text, text, uuid, boolean, text)
  from public, authenticated;
revoke execute on function public.petition_admin_set_visibility(text, text, uuid, boolean, text)
  from public, authenticated;

grant execute on function public.petition_submit(text, text, text, text, text, text, text, text)
  to anon;
grant execute on function public.petition_stats(text) to anon;
grant execute on function public.petition_like(uuid, text, text) to anon;
grant execute on function public.petition_admin_list(text, text, text) to anon;
grant execute on function public.petition_admin_delete(text, text, uuid, text) to anon;
grant execute on function public.petition_admin_restore(text, text, uuid, text) to anon;
grant execute on function public.petition_admin_set_block(text, text, uuid, boolean, text) to anon;
grant execute on function public.petition_admin_set_featured(text, text, uuid, boolean, text) to anon;
grant execute on function public.petition_admin_set_flag(text, text, uuid, boolean, text) to anon;
grant execute on function public.petition_admin_set_visibility(text, text, uuid, boolean, text) to anon;

commit;
