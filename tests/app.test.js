import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";

import app from "../src/app.js";

test("GET /health returns a successful health response", async () => {
  const response = await request(app)
    .get("/health")
    .expect("Content-Type", /json/)
    .expect(200);

  assert.deepEqual(response.body, {
    status: "ok"
  });
});

test("GET / renders the home page", async () => {
  const response = await request(app)
    .get("/")
    .expect("Content-Type", /html/)
    .expect(200);

  assert.match(
    response.text,
    /Build client websites without starting from scratch\./
  );
});

test("GET /missing-page returns the 404 page", async () => {
  const response = await request(app)
    .get("/missing-page")
    .expect("Content-Type", /html/)
    .expect(404);

  assert.match(response.text, /Page not found/i);
  assert.match(response.text, /Page not found: \/missing-page/i);
});