import { database } from "@/db/site-data";
import { mergeSocialLinks } from "@/db/social-links";

export async function GET() {
  try {
    const settings = await database().prepare("SELECT key, value FROM site_settings WHERE key LIKE 'social_%'").all<{ key: string; value: string }>();
    return Response.json({ links: mergeSocialLinks(settings.results || []) }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Social link read failed", error);
    return Response.json({ error: "Social links unavailable" }, { status: 503 });
  }
}
