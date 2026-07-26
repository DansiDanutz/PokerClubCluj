import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

import { readJsonObject } from "../src/app/api/petition/request-body.mjs";

const jsonRequest = (body, headers = {}) =>
  new Request("https://example.test/api/petition", {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8", ...headers },
    body,
  });

test("accepts a JSON object within the byte limit", async () => {
  const result = await readJsonObject(jsonRequest('{"fullName":"Ana Pop"}'));

  assert.deepEqual(result, { ok: true, value: { fullName: "Ana Pop" } });
});

test("rejects unsupported content types", async () => {
  const request = new Request("https://example.test/api/petition", {
    method: "POST",
    headers: { "content-type": "text/plain" },
    body: "{}",
  });

  assert.deepEqual(await readJsonObject(request), {
    ok: false,
    status: 415,
    error: "Content-Type trebuie sa fie application/json.",
  });
});

test("rejects a declared oversized body before reading it", async () => {
  const request = jsonRequest("{}", { "content-length": "20000" });

  assert.deepEqual(await readJsonObject(request), {
    ok: false,
    status: 413,
    error: "Cererea este prea mare.",
  });
});

test("rejects streamed bodies that exceed the limit without Content-Length", async () => {
  const encoder = new TextEncoder();
  const request = new Request("https://example.test/api/petition", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode('{"comment":"'));
        controller.enqueue(encoder.encode("x".repeat(17_000)));
        controller.enqueue(encoder.encode('"}'));
        controller.close();
      },
    }),
    duplex: "half",
  });

  assert.deepEqual(await readJsonObject(request), {
    ok: false,
    status: 413,
    error: "Cererea este prea mare.",
  });
});

for (const [label, body] of [
  ["malformed JSON", "{"],
  ["null", "null"],
  ["an array", "[]"],
  ["a primitive", '"value"'],
]) {
  test(`rejects ${label}`, async () => {
    assert.deepEqual(await readJsonObject(jsonRequest(body)), {
      ok: false,
      status: 400,
      error: "Cerere invalida.",
    });
  });
}

test("every petition POST route uses the bounded reader", async () => {
  const root = path.resolve("src/app/api/petition");
  const routeFiles = [];
  const visit = async (directory) => {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const target = path.join(directory, entry.name);
      if (entry.isDirectory()) await visit(target);
      if (entry.isFile() && entry.name === "route.ts") routeFiles.push(target);
    }
  };
  await visit(root);

  const postRoutes = [];
  for (const file of routeFiles) {
    const source = await readFile(file, "utf8");
    if (!source.includes("export async function POST")) continue;
    postRoutes.push(path.relative(root, file));
    assert.match(source, /readJsonObject/);
    assert.doesNotMatch(source, /req\.json\(/);
  }

  assert.deepEqual(postRoutes.sort(), [
    "admin/block/route.ts",
    "admin/delete/route.ts",
    "admin/feature/route.ts",
    "admin/flag/route.ts",
    "admin/hide/route.ts",
    "admin/route.ts",
    "like/route.ts",
    "route.ts",
  ]);
});
