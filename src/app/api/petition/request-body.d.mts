export type JsonObjectResult<T extends object> =
  | { ok: true; value: T }
  | { ok: false; status: 400 | 413 | 415; error: string };

export function readJsonObject<T extends object>(
  request: Request,
  maxBytes?: number
): Promise<JsonObjectResult<T>>;
