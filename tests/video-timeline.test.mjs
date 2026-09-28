import assert from "node:assert/strict";
import test from "node:test";

import { sortEventsByDateDesc } from "../src/app/video/order.mjs";

test("orders events newest first by ISO date", () => {
  const input = [
    { id: "a", date: "2026-07-10" },
    { id: "c", date: "2026-09-28" },
    { id: "b", date: "2026-08-19" },
  ];

  assert.deepEqual(
    sortEventsByDateDesc(input).map((e) => e.id),
    ["c", "b", "a"]
  );
});

test("does not mutate the original list", () => {
  const input = [
    { id: "a", date: "2026-01-01" },
    { id: "b", date: "2026-02-01" },
  ];
  const order = input.map((e) => e.id);

  sortEventsByDateDesc(input);

  assert.deepEqual(
    input.map((e) => e.id),
    order
  );
});

test("keeps a single event and an empty list intact", () => {
  assert.deepEqual(sortEventsByDateDesc([]), []);
  assert.deepEqual(
    sortEventsByDateDesc([{ id: "only", date: "2026-09-28" }]).map((e) => e.id),
    ["only"]
  );
});

test("preserves input order for equal dates (stable)", () => {
  const input = [
    { id: "first", date: "2026-09-28" },
    { id: "second", date: "2026-09-28" },
    { id: "third", date: "2026-09-28" },
  ];

  assert.deepEqual(
    sortEventsByDateDesc(input).map((e) => e.id),
    ["first", "second", "third"]
  );
});
