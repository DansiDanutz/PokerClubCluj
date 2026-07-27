import {
  createCipheriv,
  createDecipheriv,
  createHash,
  randomBytes,
} from "node:crypto";

export const ADMIN_SESSION_COOKIE = "pokercluj_admin_session";
export const ADMIN_SESSION_MAX_AGE_SECONDS = 2 * 60 * 60;

const VERSION = 1;
const IV_BYTES = 12;
const TAG_BYTES = 16;
const AAD = Buffer.from("pokercluj-admin-session:v1", "utf8");

const validSecret = (secret) =>
  typeof secret === "string" && Buffer.byteLength(secret, "utf8") >= 32;

const validCredentials = (credentials) =>
  credentials &&
  typeof credentials.email === "string" &&
  credentials.email.length > 0 &&
  credentials.email.length <= 254 &&
  typeof credentials.password === "string" &&
  credentials.password.length > 0 &&
  credentials.password.length <= 512;

const keyFor = (secret) => createHash("sha256").update(secret, "utf8").digest();

export const configuredAdminSessionSecret = (env = process.env) => {
  const secret = env.ADMIN_SESSION_SECRET?.trim();
  return validSecret(secret) ? secret : null;
};

export const sealAdminSession = (credentials, secret, now = Date.now()) => {
  if (!validSecret(secret)) throw new Error("ADMIN_SESSION_SECRET must be at least 32 bytes");
  if (!validCredentials(credentials)) throw new Error("Invalid admin credentials");

  const iv = randomBytes(IV_BYTES);
  const cipher = createCipheriv("aes-256-gcm", keyFor(secret), iv);
  cipher.setAAD(AAD);
  const plaintext = Buffer.from(
    JSON.stringify({
      email: credentials.email,
      password: credentials.password,
      expiresAt: now + ADMIN_SESSION_MAX_AGE_SECONDS * 1_000,
    }),
    "utf8",
  );
  const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
  const tag = cipher.getAuthTag();

  return Buffer.concat([Buffer.from([VERSION]), iv, tag, encrypted]).toString(
    "base64url",
  );
};

export const openAdminSession = (token, secret, now = Date.now()) => {
  if (!validSecret(secret) || typeof token !== "string" || token.length > 4_096) {
    return null;
  }

  try {
    const packed = Buffer.from(token, "base64url");
    if (packed.length <= 1 + IV_BYTES + TAG_BYTES || packed[0] !== VERSION) {
      return null;
    }
    const iv = packed.subarray(1, 1 + IV_BYTES);
    const tag = packed.subarray(1 + IV_BYTES, 1 + IV_BYTES + TAG_BYTES);
    const encrypted = packed.subarray(1 + IV_BYTES + TAG_BYTES);
    const decipher = createDecipheriv("aes-256-gcm", keyFor(secret), iv);
    decipher.setAAD(AAD);
    decipher.setAuthTag(tag);
    const payload = JSON.parse(
      Buffer.concat([decipher.update(encrypted), decipher.final()]).toString("utf8"),
    );
    if (
      !validCredentials(payload) ||
      !Number.isSafeInteger(payload.expiresAt) ||
      payload.expiresAt <= now
    ) {
      return null;
    }
    return { email: payload.email, password: payload.password };
  } catch {
    return null;
  }
};

