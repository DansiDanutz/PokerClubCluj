export const ADMIN_SESSION_COOKIE: string;
export const ADMIN_SESSION_MAX_AGE_SECONDS: number;

export type AdminCredentials = { email: string; password: string };

export function configuredAdminSessionSecret(
  env?: NodeJS.ProcessEnv,
): string | null;
export function sealAdminSession(
  credentials: AdminCredentials,
  secret: string,
  now?: number,
): string;
export function openAdminSession(
  token: string | undefined,
  secret: string,
  now?: number,
): AdminCredentials | null;

