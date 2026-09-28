import { database } from "@/db/site-data";

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return Response.json({ error: "Invalid request origin" }, { status: 403 });
  try {
    const raw = await request.text();
    if (raw.length > 4000) return Response.json({ error: "Review is too long" }, { status: 413 });
    const data = JSON.parse(raw);
    if (data.website) return Response.json({ ok: true });
    const name = String(data.name || "").trim();
    const context = String(data.context || "").trim();
    const quote = String(data.quote || "").trim();
    if (name.length < 2 || name.length > 100 || context.length > 120 || quote.length < 10 || quote.length > 1000 || data.consent !== true) {
      return Response.json({ error: "Please check your review" }, { status: 400 });
    }
    await database().prepare("INSERT INTO reviews (name, context, quote, published) VALUES (?, ?, ?, 0)").bind(name, context, quote).run();
    return Response.json({ ok: true });
  } catch (error) {
    console.error("Review submission failed", error);
    return Response.json({ error: "We could not save your review right now" }, { status: 503 });
  }
}
