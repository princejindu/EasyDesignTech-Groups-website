import { database, isSiteOwner } from "@/db/site-data";

const denied = () => Response.json({ error: "Owner access required" }, { status: 403 });

export async function GET(request: Request) {
  if (!isSiteOwner(request)) return denied();
  try {
    const db = database();
    const [threads, messages] = await Promise.all([
      db.prepare("SELECT id, status, visitor_name, visitor_email, handoff_at, created_at, updated_at FROM chat_threads WHERE id IN (SELECT thread_id FROM chat_messages) ORDER BY updated_at DESC, id DESC LIMIT 50").all<{ id: number; status: string; visitor_name: string; visitor_email: string; handoff_at: string | null; created_at: string; updated_at: string }>(),
      db.prepare("SELECT id, thread_id, sender, body, created_at FROM chat_messages ORDER BY id DESC LIMIT 500").all<{ id: number; thread_id: number; sender: string; body: string; created_at: string }>(),
    ]);
    return Response.json({ threads: threads.results || [], messages: (messages.results || []).reverse() }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Studio chat read failed", error);
    return Response.json({ error: "Chat inbox unavailable" }, { status: 503 });
  }
}

export async function POST(request: Request) {
  if (!isSiteOwner(request)) return denied();
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return denied();
  try {
    const data = await request.json() as { threadId?: unknown; body?: unknown };
    const threadId = Number(data.threadId);
    const body = typeof data.body === "string" ? data.body.trim() : "";
    if (!Number.isSafeInteger(threadId) || threadId < 1 || !body || body.length > 1000) return Response.json({ error: "Check your reply" }, { status: 400 });
    const db = database();
    const thread = await db.prepare("SELECT id FROM chat_threads WHERE id = ?").bind(threadId).first();
    if (!thread) return Response.json({ error: "Conversation not found" }, { status: 404 });
    await db.batch([
      db.prepare("INSERT INTO chat_messages (thread_id, sender, body) VALUES (?, 'support', ?)").bind(threadId, body),
      db.prepare("UPDATE chat_threads SET status = 'human', handoff_at = COALESCE(handoff_at, CURRENT_TIMESTAMP), updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(threadId),
    ]);
    return Response.json({ ok: true });
  } catch (error) {
    console.error("Studio chat reply failed", error);
    return Response.json({ error: "Could not send reply" }, { status: 503 });
  }
}
