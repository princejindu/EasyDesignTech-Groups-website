import { database, type Review } from "@/db/site-data";
import { googleReviews, googleReviewSnapshot } from "@/lib/google-reviews";

export async function GET() {
  try {
    const db = database();
    const [reviews, reviewTotal, count] = await Promise.all([
      db.prepare("SELECT id, name, context, quote, published, created_at FROM reviews WHERE published = 1 ORDER BY created_at DESC LIMIT 12").all<Review>(),
      db.prepare("SELECT COUNT(*) AS total FROM reviews WHERE published = 1").first<{ total: number }>(),
      db.prepare("SELECT value FROM site_settings WHERE key = 'satisfied_clients'").first<{ value: string }>(),
    ]);
    return Response.json({ reviews: [...googleReviews, ...(reviews.results || []).map(review => ({ ...review, source: "client" as const, excerpt: false }))], googleReviewSnapshot, approvedReviews: reviewTotal?.total || 0, satisfiedClients: count ? Number(count.value) : null }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Social proof unavailable", error);
    return Response.json({ reviews: googleReviews, googleReviewSnapshot, approvedReviews: null, satisfiedClients: null }, { headers: { "Cache-Control": "no-store" } });
  }
}
