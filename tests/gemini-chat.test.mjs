import assert from "node:assert/strict";
import test from "node:test";
import { askGemini, buildGeminiRequest, containsContactDetails } from "../lib/gemini-chat.ts";

test("the Gemini request contains public turns but no contact form fields", () => {
  const form = { name: "Private Customer", email: "private@example.com", message: "Confidential project brief" };
  const request = buildGeminiRequest("Can I combine services?", [{ sender: "visitor", body: "Do you design websites?", ...form }]);
  const body = JSON.stringify(request);
  assert.match(body, /Can I combine services/);
  assert.doesNotMatch(body, /Private Customer|private@example.com|Confidential project brief/);
  assert.equal(containsContactDetails("Please contact private@example.com"), true);
  assert.equal(containsContactDetails("Call +44 7700 900123"), true);
  assert.equal(containsContactDetails("What are your website prices?"), false);
});

test("Gemini rate limits and unknown answers offer a handoff", async () => {
  const previous = globalThis.fetch;
  try {
    globalThis.fetch = async () => new Response("quota", { status: 429 });
    assert.deepEqual(await askGemini("A question", [], "test-key"), { kind: "limit" });
    globalThis.fetch = async () => Response.json({ candidates: [{ finishReason: "STOP", content: { parts: [{ text: JSON.stringify({ can_answer: false, answer: "" }) }] } }] });
    assert.deepEqual(await askGemini("What is my account status?", [], "test-key"), { kind: "handoff" });
  } finally {
    globalThis.fetch = previous;
  }
});

test("Gemini uses a server header and returns a supported answer", async () => {
  const previous = globalThis.fetch;
  try {
    globalThis.fetch = async (_url, options) => {
      assert.equal(options.headers["x-goog-api-key"], "test-key");
      assert.doesNotMatch(options.body, /test-key/);
      return Response.json({ candidates: [{ finishReason: "STOP", content: { parts: [{ text: JSON.stringify({ can_answer: true, answer: "Yes, a website and brand can be planned together." }) }] } }] });
    };
    assert.deepEqual(await askGemini("Can I combine services?", [], "test-key"), { kind: "answered", answer: "Yes, a website and brand can be planned together." });
  } finally {
    globalThis.fetch = previous;
  }
});
