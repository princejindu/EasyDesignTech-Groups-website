import { database, type Review } from "@/db/site-data";

export async function GET() {
  try {
    const db = database();
    const [reviews, reviewTotal, count] = await Promise.all([
      db.prepare("SELECT id, name, context, quote, published, created_at FROM reviews WHERE published = 1 ORDER BY created_at DESC LIMIT 12").all<Review>(),
      db.prepare("SELECT COUNT(*) AS total FROM reviews WHERE published = 1").first<{ total: number }>(),
      db.prepare("SELECT value FROM site_settings WHERE key = 'satisfied_clients'").first<{ value: string }>(),
    ]);
    return Response.json({ reviews: reviews.results || [], verifiedReviews: reviewTotal?.total || 0, satisfiedClients: count ? Number(count.value) : null }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Social proof unavailable", error);
    return Response.json({ reviews: [], verifiedReviews: null, satisfiedClients: null }, { status: 503 });
  }
}
