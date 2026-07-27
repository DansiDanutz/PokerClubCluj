export type SupabaseConfig = { anonKey: string; apiSecret: string; url: string };

export function getSupabaseConfig(
  env?: NodeJS.ProcessEnv | Record<string, string | undefined>,
): SupabaseConfig | null;
export function supabaseHeaders(config: SupabaseConfig): Record<string, string>;
