import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(path, "utf8");

test("admin mutations authenticate before parsing and never accept raw credentials", async () => {
  const root = "src/app/api/petition/admin";
  const directories = (await readdir(root, { withFileTypes: true })).filter((entry) =>
    entry.isDirectory(),
  );
  assert.ok(directories.length >= 5);
  for (const directory of directories) {
    const path = `${root}/${directory.name}/route.ts`;
    const source = await read(path);
    const auth = source.indexOf("authorizeAdminRequest(req)");
    const body = source.indexOf("await readJsonObject");
    assert.ok(auth >= 0 && auth < body, `${path} must authenticate before reading the body`);
    assert.doesNotMatch(source, /email\?:|password\?:|p_secret|p_email/u);
  }
});

test("the admin client submits the password only during login", async () => {
  const source = await read("src/app/memoriu/admin/page.tsx");
  assert.equal(source.match(/JSON\.stringify\(\{ email, password \}\)/gu)?.length, 1);
  assert.doesNotMatch(source, /JSON\.stringify\(\{ email, password, id/gu);
});

test("source has no embedded Supabase JWT fallback", async () => {
  const routeSource = await read("src/app/api/petition/route.ts");
  const adminSource = await read("src/app/api/petition/admin/route.ts");
  assert.doesNotMatch(`${routeSource}\n${adminSource}`, /eyJhbGciOiJIUzI1Ni/gu);
  assert.doesNotMatch(`${routeSource}\n${adminSource}`, /process\.env\.[A-Z_]+\s*\?\?/gu);
});

test("petition access uses the secret-gated RPC boundary", async () => {
  const publicRoute = await read("src/app/api/petition/route.ts");
  const likeRoute = await read("src/app/api/petition/like/route.ts");
  const adminRpc = await read("src/app/api/petition/admin/admin-rpc.ts");

  assert.match(publicRoute, /\/rest\/v1\/rpc\/petition_submit/u);
  assert.doesNotMatch(publicRoute, /\/rest\/v1\/petition_signatures/u);
  for (const [path, source] of [
    ["src/app/api/petition/route.ts", publicRoute],
    ["src/app/api/petition/like/route.ts", likeRoute],
    ["src/app/api/petition/admin/admin-rpc.ts", adminRpc],
  ]) {
    assert.match(source, /p_api_secret/u, `${path} must send the API second factor`);
  }
});

test("the CI workflow pins every external action to a full commit SHA", async () => {
  const workflow = [
    await read(".github/workflows/verify.yml"),
    await read(".github/workflows/codeql.yml"),
  ].join("\n");
  const uses = [...workflow.matchAll(/^\s*uses:\s*(\S+)/gmu)].map(
    (match) => match[1],
  );
  assert.ok(uses.length >= 2);
  assert.ok(uses.every((entry) => /@[0-9a-f]{40}$/u.test(entry)));
});

test("the dependency surface excludes unused UI and unconfigured lint packages", async () => {
  const manifest = JSON.parse(await read("package.json"));
  for (const name of [
    "@radix-ui/react-slot",
    "autoprefixer",
    "class-variance-authority",
    "clsx",
    "eslint",
    "eslint-config-next",
    "tailwind-merge",
    "tailwindcss",
    "tailwindcss-animate",
  ]) {
    assert.equal(manifest.dependencies?.[name] ?? manifest.devDependencies?.[name], undefined);
  }
});
