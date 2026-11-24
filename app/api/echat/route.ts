import { database } from "@/db/site-data";

export async function GET() {
  try {
    const setting = await database().prepare("SELECT value FROM site_settings WHERE key = 'echat_launch_at'").first<{ value: string }>();
    const date = setting?.value && Number.isFinite(Date.parse(setting.value)) ? new Date(setting.value).toISOString() : null;
    return Response.json({ launchAt: date }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("eChat launch date unavailable", error);
    return Response.json({ launchAt: null }, { headers: { "Cache-Control": "no-store" } });
  }
}
