import { database } from "@/db/site-data";

const allowedInterests = new Set(["Web and apps", "Branding and design", "Social media and content", "AI automation and data", "Easylink eSIM", "EasyHoli", "EasyProperties", "Something else"]);

export async function POST(request: Request) {
  try {
    const origin = request.headers.get("origin");
    if (origin && origin !== new URL(request.url).origin) return Response.json({ error: "Invalid request origin" }, { status: 403 });
    if (!(request.headers.get("content-type") || "").includes("application/json")) return Response.json({ error: "Invalid format" }, { status: 415 });
    const raw = await request.text();
    if (raw.length > 10000) return Response.json({ error: "Message is too long" }, { status: 413 });
    const data = JSON.parse(raw);
    if (data.website) return Response.json({ ok: true });
    const name = String(data.name || "").trim();
    const email = String(data.email || "").trim().toLowerCase();
    const phone = String(data.phone || "").trim();
    const interest = String(data.interest || "").trim();
    const message = String(data.message || "").trim();
    if (name.length < 2 || name.length > 100 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 || phone.length > 50 || !allowedInterests.has(interest) || message.length < 15 || message.length > 4000 || data.consent !== true) {
      return Response.json({ error: "Please check the form and try again" }, { status: 400 });
    }
    const db = database();
    const recent = await db.prepare("SELECT id FROM enquiries WHERE email = ? AND created_at > datetime('now', '-2 minutes') LIMIT 1").bind(email).first();
    if (recent) return Response.json({ error: "Please wait a moment before sending another enquiry" }, { status: 429 });
    await db.prepare("INSERT INTO enquiries (name, email, phone, interest, message) VALUES (?, ?, ?, ?, ?)").bind(name, email, phone, interest, message).run();
    return Response.json({ ok: true });
  } catch (error) {
    console.error("Enquiry submission failed", error);
    return Response.json({ error: "We could not save your message. Please try email or WhatsApp." }, { status: 503 });
  }
}
