import { database, isSiteOwner, type Enquiry, type Review } from "@/db/site-data";
import { isValidSocialUrl, mergeSocialLinks, socialPlatforms } from "@/db/social-links";

const denied = () => Response.json({ error: "Owner access required" }, { status: 403 });

export async function GET(request: Request) {
  if (!isSiteOwner(request)) return denied();
  try {
    const db = database();
    const [enquiries, reviews, count, settings] = await Promise.all([
      db.prepare("SELECT id, name, email, phone, interest, message, status, created_at FROM enquiries ORDER BY created_at DESC LIMIT 100").all<Enquiry>(),
      db.prepare("SELECT id, name, context, quote, published, created_at FROM reviews ORDER BY created_at DESC LIMIT 100").all<Review>(),
      db.prepare("SELECT value FROM site_settings WHERE key = 'satisfied_clients'").first<{ value: string }>(),
      db.prepare("SELECT key, value FROM site_settings WHERE key LIKE 'social_%'").all<{ key: string; value: string }>(),
    ]);
    return Response.json({ enquiries: enquiries.results || [], reviews: reviews.results || [], satisfiedClients: count ? Number(count.value) : null, socialLinks: mergeSocialLinks(settings.results || []) }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Studio read failed", error);
    return Response.json({ error: "Inbox unavailable" }, { status: 503 });
  }
}

export async function POST(request: Request) {
  if (!isSiteOwner(request)) return denied();
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return denied();
  try {
    const data = await request.json() as Record<string, unknown>;
    const db = database();
    if (data.action === "count") {
      const count = Number(data.count);
      if (!Number.isSafeInteger(count) || count < 0 || count > 1000000) return Response.json({ error: "Enter a verified whole number" }, { status: 400 });
      await db.prepare("INSERT INTO site_settings (key, value) VALUES ('satisfied_clients', ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value").bind(String(count)).run();
    } else if (data.action === "social_links") {
      const links = data.links;
      if (!links || typeof links !== "object" || Array.isArray(links)) return Response.json({ error: "Check the social links" }, { status: 400 });
      const values = links as Record<string, unknown>;
      const updates = socialPlatforms.map(platform => {
        const value = values[platform];
        if (typeof value !== "string") return null;
        const trimmed = value.trim();
        if (!isValidSocialUrl(platform, trimmed)) return null;
        return db.prepare("INSERT INTO site_settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value").bind(`social_${platform}`, trimmed);
      });
      if (updates.some(update => !update)) return Response.json({ error: "Use the official HTTPS profile URL for each platform" }, { status: 400 });
      await db.batch(updates.filter(update => update !== null));
    } else if (data.action === "review") {
      const name = String(data.name || "").trim();
      const context = String(data.context || "").trim();
      const quote = String(data.quote || "").trim();
      if (name.length < 2 || name.length > 100 || context.length > 120 || quote.length < 10 || quote.length > 1000) return Response.json({ error: "Check the review details" }, { status: 400 });
      await db.prepare("INSERT INTO reviews (name, context, quote, published) VALUES (?, ?, ?, 1)").bind(name, context, quote).run();
    } else if (data.action === "review_visibility") {
      const id = Number(data.id);
      if (!Number.isSafeInteger(id) || id < 1 || typeof data.published !== "boolean") return Response.json({ error: "Invalid review" }, { status: 400 });
      await db.prepare("UPDATE reviews SET published = ? WHERE id = ?").bind(data.published ? 1 : 0, id).run();
    } else if (data.action === "enquiry_status") {
      const id = Number(data.id);
      if (!Number.isSafeInteger(id) || id < 1 || !["new", "handled"].includes(String(data.status))) return Response.json({ error: "Invalid enquiry" }, { status: 400 });
      await db.prepare("UPDATE enquiries SET status = ? WHERE id = ?").bind(data.status, id).run();
    } else return Response.json({ error: "Unknown action" }, { status: 400 });
    return Response.json({ ok: true });
  } catch (error) {
    console.error("Studio update failed", error);
    return Response.json({ error: "Could not save this change" }, { status: 503 });
  }
}
