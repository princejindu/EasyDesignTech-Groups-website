"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check, RefreshCw, Send } from "lucide-react";
import type { SocialPlatform } from "@/db/social-links";

type Enquiry = { id: number; name: string; email: string; phone: string; interest: string; message: string; status: string; created_at: string };
type Review = { id: number; name: string; context: string; quote: string; published: number; created_at: string };
type Thread = { id: number; status: string; visitor_name: string; visitor_email: string; handoff_at: string | null; created_at: string; updated_at: string };
type Message = { id: number; thread_id: number; sender: "visitor" | "assistant" | "support"; body: string; created_at: string };
const socialLabels: { key: SocialPlatform; label: string }[] = [
  { key: "facebook", label: "Facebook" }, { key: "instagram", label: "Instagram" },
  { key: "snapchat", label: "Snapchat" }, { key: "tiktok", label: "TikTok" },
  { key: "x", label: "X" }, { key: "linkedin", label: "LinkedIn" },
  { key: "youtube", label: "YouTube" },
];
const emptySocial = Object.fromEntries(socialLabels.map(item => [item.key, ""])) as Record<SocialPlatform, string>;

export default function Studio() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [count, setCount] = useState("");
  const [socialLinks, setSocialLinks] = useState<Record<SocialPlatform, string>>(emptySocial);
  const [threads, setThreads] = useState<Thread[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [reply, setReply] = useState("");
  const [sending, setSending] = useState(false);
  const [state, setState] = useState<"loading" | "ready" | "denied" | "error">("loading");
  const [notice, setNotice] = useState("");

  const loadChat = useCallback(async () => {
    const response = await fetch("/api/studio/chat", { cache: "no-store" });
    if (!response.ok) return;
    const data = await response.json() as { threads: Thread[]; messages: Message[] };
    setThreads(data.threads || []);
    setMessages(data.messages || []);
    setSelected(previous => previous && data.threads.some(thread => thread.id === previous) ? previous : data.threads[0]?.id ?? null);
  }, []);
  const load = useCallback(async () => {
    try {
      const response = await fetch("/api/studio", { cache: "no-store" });
      if (response.status === 403) { setState("denied"); return; }
      if (!response.ok) throw new Error();
      const data = await response.json() as { enquiries: Enquiry[]; reviews: Review[]; satisfiedClients: number | null; socialLinks: Record<SocialPlatform, string> };
      setEnquiries(data.enquiries || []); setReviews(data.reviews || []);
      setCount(data.satisfiedClients === null ? "" : String(data.satisfiedClients));
      setSocialLinks(data.socialLinks || emptySocial); setState("ready");
      void loadChat();
    } catch { setState("error"); }
  }, [loadChat]);
  useEffect(() => { const timer = window.setTimeout(() => void load(), 0); return () => window.clearTimeout(timer); }, [load]);
  useEffect(() => {
    if (state !== "ready") return;
    const timer = window.setInterval(() => { if (document.visibilityState === "visible") void loadChat(); }, 5000);
    return () => window.clearInterval(timer);
  }, [state, loadChat]);
  async function action(payload: Record<string, unknown>) {
    setNotice("");
    try {
      const response = await fetch("/api/studio", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await response.json() as { error?: string };
      if (!response.ok) throw new Error(data.error || "Could not save");
      setNotice("Saved"); await load(); return true;
    } catch (cause) { setNotice(cause instanceof Error ? cause.message : "Could not save"); return false; }
  }
  async function addReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const form = event.currentTarget; const data = new FormData(form);
    if (await action({ action: "review", name: data.get("name"), context: data.get("context"), quote: data.get("quote") })) form.reset();
  }
  async function sendReply(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selected || !reply.trim() || sending) return;
    setSending(true); setNotice("");
    try {
      const response = await fetch("/api/studio/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ threadId: selected, body: reply }) });
      const data = await response.json() as { error?: string };
      if (!response.ok) throw new Error(data.error || "Could not send reply");
      setReply(""); await loadChat(); setNotice("Reply sent");
    } catch (cause) { setNotice(cause instanceof Error ? cause.message : "Could not send reply"); }
    finally { setSending(false); }
  }
  const currentMessages = messages.filter(message => message.thread_id === selected);
  const currentThread = threads.find(thread => thread.id === selected);
  return <main className="studio-page"><div className="studio-wrap">
    <header className="studio-header"><div><Link href="/"><ArrowLeft size={17} /> Back to website</Link><p>PRIVATE OWNER SPACE</p><h1>EasyDesignTech studio</h1></div><button onClick={() => { void load(); void loadChat(); }} aria-label="Refresh inbox"><RefreshCw size={20} /></button></header>
    {state === "loading" && <p>Loading your studio…</p>}
    {state === "denied" && <div className="studio-message"><h2>Owner access required</h2><p>Sign in with the account that owns this website to manage enquiries, chats, social links and client stories.</p></div>}
    {state === "error" && <div className="studio-message"><h2>The studio is unavailable</h2><p>Try refreshing this page.</p></div>}
    {state === "ready" && <>
      <div className="studio-summary"><div><span>NEW ENQUIRIES</span><strong>{enquiries.filter(item => item.status === "new").length}</strong></div><div><span>CHAT CONVERSATIONS</span><strong>{threads.length}</strong></div><div><span>VERIFIED CLIENT TOTAL</span><strong>{count || "Not set"}</strong></div></div>
      <p className="studio-notice" aria-live="polite">{notice}</p>
      <section className="studio-section" id="chats"><div className="studio-section-top"><div><p>01 / LIVE CHAT</p><h2>Conversations</h2></div><span>New messages appear while this page is open</span></div>
        {threads.length ? <div className="studio-chat-grid"><div className="studio-thread-list" aria-label="Conversations">{threads.map(thread => {
          const last = messages.filter(message => message.thread_id === thread.id).at(-1);
          return <button key={thread.id} type="button" className={selected === thread.id ? "selected" : ""} onClick={() => setSelected(thread.id)}><strong>{thread.visitor_name || `Conversation #${thread.id}`}</strong><small>{thread.status === "human" ? "Ready for human support" : "Assistant intake"} · {thread.updated_at}</small><span>{last?.body || "Open conversation"}</span></button>;
        })}</div><div className="studio-chat-detail">{currentThread && <div className="studio-chat-contact"><strong>{currentThread.status === "human" ? "Human handoff" : "Assistant intake"}</strong>{currentThread.visitor_email && <a href={`mailto:${currentThread.visitor_email}`}>{currentThread.visitor_email} <ArrowUpRight size={13} /></a>}</div>}<div className="studio-chat-log" role="log" aria-label="Selected conversation">{currentMessages.map(message => <article key={message.id} className={message.sender === "support" ? "from-support" : message.sender === "assistant" ? "from-assistant" : ""}><small>{message.sender === "support" ? "YOU / SUPPORT" : message.sender === "assistant" ? "VIRTUAL ASSISTANT" : "VISITOR"} · {message.created_at}</small><p>{message.body}</p></article>)}</div><form onSubmit={sendReply}><textarea aria-label="Your reply" value={reply} onChange={event => setReply(event.target.value)} rows={2} maxLength={1000} placeholder="Write a reply…" required /><button type="submit" disabled={sending || !reply.trim()}>Reply <Send size={15} /></button></form></div></div> : <p className="studio-empty">Visitor chats will appear here. Keep this page open to reply.</p>}
      </section>
      <section className="studio-section"><div className="studio-section-top"><div><p>02 / ENQUIRIES</p><h2>Incoming messages</h2></div><span>{enquiries.length} recent</span></div>{enquiries.length ? <div className="enquiry-list">{enquiries.map(item => <article key={item.id} className="enquiry-item"><div><span className={item.status === "new" ? "status-new" : "status-handled"}>{item.status}</span>{item.message.startsWith("TAILORED QUOTE REQUEST\n") && <span className="quote-badge">TAILORED QUOTE</span>}<time>{item.created_at}</time></div><h3>{item.name} <small>{item.interest}</small></h3><p>{item.message}</p><div className="enquiry-actions"><a href={`mailto:${item.email}`}>{item.email} <ArrowUpRight size={14} /></a>{item.phone && <span>{item.phone}</span>}<button onClick={() => action({ action: "enquiry_status", id: item.id, status: item.status === "new" ? "handled" : "new" })}>{item.status === "new" ? "Mark handled" : "Mark new"}</button></div></article>)}</div> : <p className="studio-empty">New enquiries will appear here.</p>}</section>
      <section className="studio-section"><div className="studio-section-top"><div><p>03 / SOCIAL CHANNELS</p><h2>Connect your profiles.</h2></div></div><form className="studio-social-form" onSubmit={event => { event.preventDefault(); void action({ action: "social_links", links: socialLinks }); }}><p className="studio-social-hint">Paste your official profile URLs. Empty fields appear as coming soon on the website so visitors are never sent to a guessed account.</p>{socialLabels.map(item => <label key={item.key}>{item.label}<input type="url" placeholder={`https://${item.key === "x" ? "x.com" : `${item.key}.com`}/…`} value={socialLinks[item.key] || ""} onChange={event => setSocialLinks(previous => ({ ...previous, [item.key]: event.target.value }))} /></label>)}<button type="submit">Save social links</button></form></section>
      <section className="studio-section"><div className="studio-section-top"><div><p>04 / CLIENT PROOF</p><h2>Only publish what is true.</h2></div></div><div className="studio-proof-grid"><div><h3>Verified satisfied clients</h3><p>Enter a real total you can stand behind. The website animates this number once saved.</p><form onSubmit={event => { event.preventDefault(); void action({ action: "count", count: Number(count) }); }}><input aria-label="Verified satisfied client total" type="number" min="0" max="1000000" value={count} onChange={event => setCount(event.target.value)} placeholder="Enter verified total" required /><button type="submit">Save total <Check size={16} /></button></form></div><div><h3>Add a client review</h3><p>Use a real quote with the client’s permission. New visitor submissions stay unpublished until approved.</p><form className="studio-review-form" onSubmit={addReview}><input name="name" placeholder="Client name" required minLength={2} maxLength={100} /><input name="context" placeholder="Project or service, optional" maxLength={120} /><textarea name="quote" placeholder="Their exact words" required minLength={10} maxLength={1000} rows={3} /><button type="submit">Publish approved review <ArrowUpRight size={16} /></button></form></div></div><div className="studio-reviews">{reviews.map(item => <article key={item.id}><p>“{item.quote}”</p><span>{item.name}{item.context ? ` / ${item.context}` : ""}</span><button onClick={() => action({ action: "review_visibility", id: item.id, published: !item.published })}>{item.published ? "Unpublish" : "Approve and publish"}</button></article>)}</div></section>
    </>}
  </div></main>;
}
