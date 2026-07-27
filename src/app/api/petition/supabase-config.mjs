export const getSupabaseConfig = (env = process.env) => {
  const url = env.SUPABASE_URL?.trim();
  const anonKey = env.SUPABASE_ANON_KEY?.trim();
  const apiSecret = env.PETITION_API_SECRET?.trim();
  if (!url || !anonKey || !apiSecret || apiSecret.length < 32) return null;
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:") return null;
    return { anonKey, apiSecret, url: parsed.origin };
  } catch {
    return null;
  }
};

export const supabaseHeaders = (config) => ({
  apikey: config.anonKey,
  Authorization: `Bearer ${config.anonKey}`,
  "Content-Type": "application/json",
});
