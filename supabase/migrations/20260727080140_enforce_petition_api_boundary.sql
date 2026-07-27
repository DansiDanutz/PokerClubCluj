-- Phase B runs only after the Vercel deployment uses the secret-gated RPC
-- overloads from the preceding migration.

begin;

do $block$
declare
  v_plain text;
  v_hash text;
begin
  select admin_secret, api_secret_hash
    into v_plain, v_hash
  from public.petition_admin_config
  where id = 1
  for update;

  if v_hash is null or v_hash not like '$2%' then
    raise exception 'petition API secret has not been provisioned';
  end if;

  if v_plain not like '$2%' then
    v_hash := extensions.crypt(v_plain, extensions.gen_salt('bf', 12));
    if v_hash = v_plain or extensions.crypt(v_plain, v_hash) <> v_hash then
      raise exception 'petition admin secret hash verification failed';
    end if;
    update public.petition_admin_config
      set admin_secret = v_hash
      where id = 1;
  end if;
end;
$block$;

comment on column public.petition_admin_config.admin_secret is
  'bcrypt hash of the operator password; plaintext storage is forbidden';

drop policy if exists petition_insert_anon on public.petition_signatures;

revoke all privileges on table public.petition_admin_config
  from public, anon, authenticated;
revoke all privileges on table public.petition_blocked_ips
  from public, anon, authenticated;
revoke all privileges on table public.petition_comment_likes
  from public, anon, authenticated;
revoke all privileges on table public.petition_signatures
  from public, anon, authenticated;

-- Remove every legacy public entry point. The secret-gated overloads retain
-- explicit anon EXECUTE grants because the Data API still authenticates with a
-- publishable/anon key; the server-only API secret is the second factor.
revoke execute on function public.petition_admin_delete(text, text, uuid)
  from public, anon, authenticated;
revoke execute on function public.petition_admin_list(text, text)
  from public, anon, authenticated;
revoke execute on function public.petition_admin_restore(text, text, uuid)
  from public, anon, authenticated;
revoke execute on function public.petition_admin_set_block(text, text, uuid, boolean)
  from public, anon, authenticated;
revoke execute on function public.petition_admin_set_featured(text, text, uuid, boolean)
  from public, anon, authenticated;
revoke execute on function public.petition_admin_set_flag(text, text, uuid, boolean)
  from public, anon, authenticated;
revoke execute on function public.petition_admin_set_visibility(text, text, uuid, boolean)
  from public, anon, authenticated;
revoke execute on function public.petition_like(uuid, text)
  from public, anon, authenticated;
revoke execute on function public.petition_stats()
  from public, anon, authenticated;
revoke execute on function public.petition_block_check()
  from public, anon, authenticated;

commit;
