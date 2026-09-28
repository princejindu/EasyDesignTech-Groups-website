import { env } from "cloudflare:workers";
import { database } from "@/db/site-data";

const cookieName = "edt_chat";
type Thread = { id: number; status: string; visitor_name: string; visitor_email: string };
type ChatMessage = { id: number; sender: "visitor" | "assistant" | "support"; body: string; created_at: string };
const greeting = "Hello, I’m the EasyDesignTech virtual assistant. Tell me what you’re looking for, and I’ll guide you and pass your message to a person on our team.";
const handoff = "I’ve passed your message to our team. A person can reply here when available. You can leave an email below if you’d like a follow up outside this chat.";

async function hashToken(token: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(token));
  return Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, "0")).join("");
}
function readToken(request: Request) {
  return request.headers.get("cookie")?.split(";").map(part => part.trim()).find(part => part.startsWith(`${cookieName}=`))?.slice(cookieName.length + 1) || "";
}
async function existingThread(request: Request) {
  const token = readToken(request);
  if (!/^[a-f0-9]{64}$/.test(token)) return null;
  return database().prepare("SELECT id, status, visitor_name, visitor_email FROM chat_threads WHERE token_hash = ?").bind(await hashToken(token)).first<Thread>();
}
function modelKey() {
  return (env as unknown as { OPENAI_API_KEY?: string }).OPENAI_API_KEY?.trim() || "";
}
function guidedReply(body: string) {
  const query = body.toLowerCase();
  if (/e.?sim|easy.?link|mobile data|roaming|connectivity/.test(query)) return "For Easylink eSIM plans and activation, visit geteasylink.app. Our team can help with other connectivity questions.";
  if (/easy.?holi|travel|trip|holiday|flight|hotel/.test(query)) return "EasyHoli is our travel experience in development. Tell the team what kind of trip or partnership you have in mind.";
  if (/propert|house|home|real estate|listing/.test(query)) return "EasyProperties is our property discovery concept. Our team can follow up about your property enquiry.";
  if (/brand|logo|graphic|identity/.test(query)) return "Our branding and design service covers visual identity and graphics. A project brief will help our team advise you.";
  if (/social|content|marketing/.test(query)) return "Our social media and content service can help shape your message and creative assets. Share your goals with our team.";
  if (/ai|automat|data|workflow/.test(query)) return "Our AI automation and data service focuses on useful workflows and insights. Tell our team what process you want to improve.";
  if (/web|app|site|software|digital product/.test(query)) return "We build websites and apps around clear user journeys. Our team can discuss your idea, timeline and scope.";
  return "Thanks for sharing your question. Our team can take a closer look and respond with the right details.";
}
async function aiReply(body: string, key: string) {
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "gpt-5-mini", store: false, max_output_tokens: 220,
      instructions: "You are EasyDesignTech's clearly identified virtual customer care assistant. Reply to this one visitor message in at most 70 words, warmly and concretely. EasyDesignTech offers web and apps, branding and design, social media and content, and AI automation and data. Its businesses are Easylink eSIM at https://www.geteasylink.app/ (live), EasyHoli travel (concept), and EasyProperties property discovery (concept). Do not invent prices, availability, customer results, commitments, or staff response times. If uncertain, say a person will follow up. Do not claim to be human. Do not ask for payment or sensitive data. Do not say you have already transferred the chat; the site does that after your reply.",
      input: [{ role: "user", content: body }],
    }), signal: AbortSignal.timeout(8500),
  });
  if (!response.ok) throw new Error(`Assistant request failed: ${response.status}`);
  const result = await response.json() as { output?: { type?: string; content?: { type?: string; text?: string }[] }[] };
  const answer = result.output?.filter(item => item.type === "message").flatMap(item => item.content || []).filter(item => item.type === "output_text").map(item => item.text || "").join("\n").trim();
  if (!answer) throw new Error("Assistant returned no message");
  return answer.slice(0, 1000);
}
export async function GET(request: Request) {
  try {
    const db = database();
    let thread = await existingThread(request);
    const headers = new Headers({ "Cache-Control": "no-store" });
    if (!thread) {
      const token = Array.from(crypto.getRandomValues(new Uint8Array(32)), byte => byte.toString(16).padStart(2, "0")).join("");
      const result = await db.prepare("INSERT INTO chat_threads (token_hash) VALUES (?)").bind(await hashToken(token)).run();
      thread = { id: Number(result.meta.last_row_id), status: "assistant", visitor_name: "", visitor_email: "" };
      await db.prepare("INSERT INTO chat_messages (thread_id, sender, body) VALUES (?, 'assistant', ?)").bind(thread.id, greeting).run();
      headers.set("Set-Cookie", `${cookieName}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000${new URL(request.url).protocol === "https:" ? "; Secure" : ""}`);
    }
    const messages = await db.prepare("SELECT id, sender, body, created_at FROM chat_messages WHERE thread_id = ? ORDER BY id DESC LIMIT 100").bind(thread.id).all<ChatMessage>();
    return Response.json({ messages: (messages.results || []).reverse(), status: thread.status, visitorName: thread.visitor_name, visitorEmail: thread.visitor_email, aiEnabled: Boolean(modelKey()) }, { headers });
  } catch (error) {
    console.error("Chat read failed", error);
    return Response.json({ error: "Chat is temporarily unavailable" }, { status: 503 });
  }
}
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return Response.json({ error: "Invalid origin" }, { status: 403 });
  if (Number(request.headers.get("content-length") || 0) > 4000) return Response.json({ error: "Message is too long" }, { status: 413 });
  try {
    const thread = await existingThread(request);
    if (!thread) return Response.json({ error: "Open the chat and try again" }, { status: 403 });
    const data = await request.json() as { action?: unknown; body?: unknown; name?: unknown; email?: unknown; website?: unknown };
    if (data.website) return Response.json({ ok: true });
    const db = database();
    if (data.action === "contact") {
      const name = typeof data.name === "string" ? data.name.trim() : "";
      const email = typeof data.email === "string" ? data.email.trim() : "";
      if (thread.status !== "human" || name.length > 100 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) return Response.json({ error: "Enter a valid email address" }, { status: 400 });
      await db.prepare("UPDATE chat_threads SET visitor_name = ?, visitor_email = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(name, email, thread.id).run();
      return Response.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
    }
    const body = typeof data.body === "string" ? data.body.trim() : "";
    if (!body || body.length > 1000) return Response.json({ error: "Enter a message of up to 1000 characters" }, { status: 400 });
    const recent = await db.prepare("SELECT COUNT(*) AS total FROM chat_messages WHERE thread_id = ? AND sender = 'visitor' AND created_at >= datetime('now', '-1 minute')").bind(thread.id).first<{ total: number }>();
    if ((recent?.total || 0) >= 12) return Response.json({ error: "Please wait a moment before sending another message" }, { status: 429 });
    await db.batch([
      db.prepare("INSERT INTO chat_messages (thread_id, sender, body) VALUES (?, 'visitor', ?)").bind(thread.id, body),
      db.prepare("UPDATE chat_threads SET updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(thread.id),
    ]);
    if (thread.status === "assistant") {
      let reply = guidedReply(body);
      const key = modelKey();
      if (key) { try { reply = await aiReply(body, key); } catch (error) { console.error("Assistant unavailable, using guided response", error); } }
      await db.batch([
        db.prepare("INSERT INTO chat_messages (thread_id, sender, body) VALUES (?, 'assistant', ?)").bind(thread.id, reply),
        db.prepare("INSERT INTO chat_messages (thread_id, sender, body) VALUES (?, 'assistant', ?)").bind(thread.id, handoff),
        db.prepare("UPDATE chat_threads SET status = 'human', handoff_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(thread.id),
      ]);
    }
    return Response.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Chat send failed", error);
    return Response.json({ error: "Could not send your message" }, { status: 503 });
  }
}
