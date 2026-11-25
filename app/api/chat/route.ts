import { env } from "cloudflare:workers";
import { database } from "@/db/site-data";
import { sendCustomerAcknowledgement, sendOwnerNotification } from "@/lib/email-notifications";
import { askGemini, containsContactDetails } from "@/lib/gemini-chat";

const cookieName = "edt_chat";
type Thread = { id: number; status: string; visitor_name: string; visitor_email: string };
type ChatMessage = { id: number; sender: "visitor" | "assistant" | "support"; body: string; created_at: string };
const greeting = "Hello, I’m the EasyDesignTech virtual assistant. Ask me about our published services and common questions. For a personal enquiry, use the contact form. Please do not share private details in the chat question.";
const handoff = "I can’t give you a reliable answer from our published information. Please leave your name, email and message in the contact form below so our team can follow up.";
const limitHandoff = "The virtual assistant has reached its usage limit right now. Please leave your name, email and message in the contact form below so our team can follow up.";
const unavailableHandoff = "The virtual assistant is unavailable right now. Please leave your name, email and message in the contact form below so our team can follow up.";

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
function geminiKey() {
  return (env as unknown as { GEMINI_API_KEY?: string }).GEMINI_API_KEY?.trim() || "";
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
    return Response.json({ messages: (messages.results || []).reverse(), status: thread.status, visitorName: thread.visitor_name, visitorEmail: thread.visitor_email, aiEnabled: Boolean(geminiKey()) }, { headers });
  } catch (error) {
    console.error("Chat read failed", error);
    return Response.json({ error: "Chat is temporarily unavailable" }, { status: 503 });
  }
}
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return Response.json({ error: "Invalid origin" }, { status: 403 });
  if (Number(request.headers.get("content-length") || 0) > 6000) return Response.json({ error: "Message is too long" }, { status: 413 });
  try {
    const thread = await existingThread(request);
    if (!thread) return Response.json({ error: "Open the chat and try again" }, { status: 403 });
    const data = await request.json() as { action?: unknown; body?: unknown; name?: unknown; email?: unknown; message?: unknown; consent?: unknown; website?: unknown };
    if (data.website) return Response.json({ ok: true });
    const db = database();
    if (data.action === "new_conversation") {
      if (thread.status !== "human" || !geminiKey()) return Response.json({ error: "A new AI chat is not available right now" }, { status: 409 });
      // A separate thread keeps contact form details and the previous support enquiry
      // out of the next Gemini conversation, while preserving it for the team.
      const token = Array.from(crypto.getRandomValues(new Uint8Array(32)), byte => byte.toString(16).padStart(2, "0")).join("");
      const created = await db.prepare("INSERT INTO chat_threads (token_hash) VALUES (?)").bind(await hashToken(token)).run();
      await db.prepare("INSERT INTO chat_messages (thread_id, sender, body) VALUES (?, 'assistant', ?)").bind(Number(created.meta.last_row_id), greeting).run();
      const headers = new Headers({ "Cache-Control": "no-store" });
      headers.set("Set-Cookie", `${cookieName}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000${new URL(request.url).protocol === "https:" ? "; Secure" : ""}`);
      return Response.json({ ok: true }, { headers });
    }
    if (data.action === "contact") {
      const name = typeof data.name === "string" ? data.name.trim() : "";
      const email = typeof data.email === "string" ? data.email.trim().toLowerCase() : "";
      const message = typeof data.message === "string" ? data.message.trim() : "";
      if (name.length < 2 || name.length > 100 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 || message.length < 10 || message.length > 2000 || data.consent !== true) return Response.json({ error: "Please enter your name, email and a message of at least 10 characters" }, { status: 400 });
      const recent = await db.prepare("SELECT id FROM enquiries WHERE email = ? AND interest = 'Website chat' AND created_at > datetime('now', '-2 minutes') LIMIT 1").bind(email).first();
      if (recent) return Response.json({ error: "Please wait a moment before sending another message" }, { status: 429 });
      const saved = await db.batch([
        db.prepare("UPDATE chat_threads SET visitor_name = ?, visitor_email = ?, status = 'human', handoff_at = COALESCE(handoff_at, CURRENT_TIMESTAMP), updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(name, email, thread.id),
        db.prepare("INSERT INTO chat_messages (thread_id, sender, body) VALUES (?, 'visitor', ?)").bind(thread.id, message),
        db.prepare("INSERT INTO enquiries (name, email, phone, interest, message) VALUES (?, ?, '', 'Website chat', ?)").bind(name, email, `Chat conversation #${thread.id}\n\n${message}`),
      ]);
      const enquiryId = Number(saved[2].meta.last_row_id);
      await Promise.all([
        sendOwnerNotification({
          subject: `Website chat enquiry from ${name}`,
          text: [`New website chat enquiry #${enquiryId}`, "", `Name: ${name}`, `Email: ${email}`, `Conversation: #${thread.id}`, "", "Message:", message, "", `Open the private Studio: ${new URL("/studio#chats", request.url)}`, `Reply to this email to contact ${email}.`].join("\n"),
          replyTo: email,
          idempotencyKey: `chat-enquiry-${enquiryId}`,
        }),
        sendCustomerAcknowledgement({ to: email, name, kind: "chat", idempotencyKey: `chat-enquiry-ack-${enquiryId}` }),
      ]);
      return Response.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
    }
    const body = typeof data.body === "string" ? data.body.trim() : "";
    if (!body || body.length > 1000) return Response.json({ error: "Enter a message of up to 1000 characters" }, { status: 400 });
    const recent = await db.prepare("SELECT COUNT(*) AS total FROM chat_messages WHERE thread_id = ? AND sender = 'visitor' AND created_at >= datetime('now', '-1 minute')").bind(thread.id).first<{ total: number }>();
    if ((recent?.total || 0) >= 12) return Response.json({ error: "Please wait a moment before sending another message" }, { status: 429 });
    const saved = await db.batch([
      db.prepare("INSERT INTO chat_messages (thread_id, sender, body) VALUES (?, 'visitor', ?)").bind(thread.id, body),
      db.prepare("UPDATE chat_threads SET updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(thread.id),
    ]);
    const messageId = Number(saved[0].meta.last_row_id);
    if (thread.status === "assistant") {
      const [history, usage] = await Promise.all([
        db.prepare("SELECT sender, body FROM chat_messages WHERE thread_id = ? AND id < ? AND sender IN ('visitor', 'assistant') ORDER BY id DESC LIMIT 8").bind(thread.id, messageId).all<{ sender: "visitor" | "assistant"; body: string }>(),
        db.prepare("SELECT COUNT(*) AS total FROM chat_messages WHERE thread_id = ? AND sender = 'visitor' AND created_at >= datetime('now', '-1 day')").bind(thread.id).first<{ total: number }>(),
      ]);
      const publicHistory = (history.results || []).reverse().filter(item => item.body !== greeting && !containsContactDetails(item.body));
      const result = (usage?.total || 0) > 20 ? { kind: "limit" as const } : containsContactDetails(body) ? { kind: "handoff" as const } : await askGemini(body, publicHistory, geminiKey());
      if (result.kind === "answered") {
        await db.prepare("INSERT INTO chat_messages (thread_id, sender, body) VALUES (?, 'assistant', ?)").bind(thread.id, result.answer).run();
        return Response.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
      }
      const reply = result.kind === "limit" ? limitHandoff : result.kind === "unavailable" ? unavailableHandoff : handoff;
      await db.batch([
        db.prepare("INSERT INTO chat_messages (thread_id, sender, body) VALUES (?, 'assistant', ?)").bind(thread.id, reply),
        db.prepare("UPDATE chat_threads SET status = 'human', handoff_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(thread.id),
      ]);
      await sendOwnerNotification({
        subject: `Chat needs a human reply: conversation #${thread.id}`,
        text: [
          `A website visitor needs a human reply in conversation #${thread.id}.`,
          "",
          `Visitor: ${body}`,
          `Reason: ${result.kind}`,
          "",
          "The visitor has been offered a contact form for their name, email and message.",
          `Open your private Studio to reply: ${new URL("/studio#chats", request.url)}`,
        ].join("\n"),
        idempotencyKey: `chat-handoff-${thread.id}`,
      });
    } else {
      await sendOwnerNotification({
        subject: `New chat message: conversation #${thread.id}`,
        text: [
          `New visitor message in EasyDesignTech conversation #${thread.id}.`,
          "",
          `Name: ${thread.visitor_name || "Not provided"}`,
          `Email: ${thread.visitor_email || "Not provided"}`,
          "",
          body,
          "",
          `Open your private Studio to reply: ${new URL("/studio#chats", request.url)}`,
        ].join("\n"),
        ...(thread.visitor_email ? { replyTo: thread.visitor_email } : {}),
        idempotencyKey: `chat-message-${messageId}`,
      });
    }
    return Response.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Chat send failed", error);
    return Response.json({ error: "Could not send your message" }, { status: 503 });
  }
}
