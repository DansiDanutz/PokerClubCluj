const DEFAULT_MAX_BYTES = 16_384;

const error = (status, message) => ({ ok: false, status, error: message });

const isJsonContentType = (value) => {
  const mediaType = value.split(";", 1)[0].trim().toLowerCase();
  return (
    mediaType === "application/json" ||
    /^application\/[a-z0-9!#$&^_.+-]+\+json$/.test(mediaType)
  );
};

export async function readJsonObject(request, maxBytes = DEFAULT_MAX_BYTES) {
  if (!isJsonContentType(request.headers.get("content-type") ?? "")) {
    return error(415, "Content-Type trebuie sa fie application/json.");
  }

  const declaredLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(declaredLength) && declaredLength > maxBytes) {
    return error(413, "Cererea este prea mare.");
  }

  const reader = request.body?.getReader();
  if (!reader) return error(400, "Cerere invalida.");

  const chunks = [];
  let totalBytes = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      totalBytes += value.byteLength;
      if (totalBytes > maxBytes) {
        try {
          await reader.cancel();
        } catch {
          // The rejection reason must remain payload size, even if cancellation fails.
        }
        return error(413, "Cererea este prea mare.");
      }
      chunks.push(value);
    }

    const bytes = new Uint8Array(totalBytes);
    let offset = 0;
    for (const chunk of chunks) {
      bytes.set(chunk, offset);
      offset += chunk.byteLength;
    }
    const value = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
    if (!value || typeof value !== "object" || Array.isArray(value)) {
      return error(400, "Cerere invalida.");
    }
    return { ok: true, value };
  } catch {
    return error(400, "Cerere invalida.");
  }
}
