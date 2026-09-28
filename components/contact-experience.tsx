"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowUpRight, Mail, MessageCircle, Send, X } from "lucide-react";
import Image from "next/image";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { contact } from "@/lib/contact";

const interests = ["Web and apps", "Branding and design", "Social media and content", "AI automation and data", "Easylink eSIM", "EasyHoli", "EasyProperties", "Something else"];
const packageNames = new Set(["Website Launch", "Website Growth", "Product First Build", "Social Presence", "Workflow Starter", "Short Video"]);
export function FacebookContactLink() {
  const [url, setUrl] = useState(contact.facebook);
  useEffect(() => {
    let active = true;
    fetch("/api/social-links", { cache: "no-store" }).then(response => response.ok ? response.json() as Promise<{ links: { facebook?: string } }> : null).then(data => {
      if (active && data?.links) setUrl(data.links.facebook || "");
    }).catch(() => {});
    return () => { active = false; };
  }, []);
  return url ? <a href={url} target="_blank" rel="noopener noreferrer">Facebook <span>Follow EasyDesignTech</span><ArrowUpRight size={18} aria-hidden="true" /></a> : null;
}

export function EnquiryForm() {
  const searchParams = useSearchParams();
  const [interest, setInterest] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  useEffect(() => {
    const requested = searchParams.get("interest");
    const selectedPackage = searchParams.get("package");
    const timer = window.setTimeout(() => {
      if (requested && interests.includes(requested)) setInterest(requested);
      if (selectedPackage && packageNames.has(selectedPackage)) setMessage(`I am interested in the ${selectedPackage} package. My project is `);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [searchParams]);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!interest) { setError("Choose a service or business."); setStatus("error"); return; }
    const form = event.currentTarget;
    const values = new FormData(form);
    setStatus("sending"); setError("");
    try {
      const response = await fetch("/api/enquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: values.get("name"), email: values.get("email"), phone: values.get("phone"), interest, message: values.get("message"), website: values.get("website"), consent: values.get("consent") === "on" }) });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error || "Please try again");
      form.reset(); setInterest(""); setMessage(""); setStatus("success");
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Please try again"); setStatus("error"); }
  }
  return <form className="enquiry-form" onSubmit={submit}>
    <div className="field-pair"><label>YOUR NAME<input required name="name" autoComplete="name" minLength={2} maxLength={100} placeholder="Your name" /></label><label>EMAIL ADDRESS<input required name="email" type="email" autoComplete="email" placeholder="you@example.com" /></label></div>
    <div className="field-pair"><label>PHONE OR WHATSAPP <span>OPTIONAL</span><input name="phone" type="tel" autoComplete="tel" maxLength={50} placeholder="Your number" /></label><label>WHAT CAN WE HELP WITH?<Select value={interest} onValueChange={value => setInterest(value || "")} required><SelectTrigger className="interest-select" aria-label="Service or business of interest"><SelectValue placeholder="Choose a service or business" /></SelectTrigger><SelectContent>{interests.map(item => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent></Select></label></div>
    <label>YOUR MESSAGE<textarea name="message" value={message} onChange={event => setMessage(event.target.value)} required minLength={15} maxLength={4000} rows={5} placeholder="Tell us a little about your idea or enquiry" /></label>
    <label className="honeypot" aria-hidden="true">Leave blank<input name="website" tabIndex={-1} autoComplete="off" /></label>
    <label className="consent"><input type="checkbox" name="consent" required /><span>Use my details to respond to this enquiry.</span></label>
    <div className="form-bottom"><button className="button button-light" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send enquiry"} <Send size={17} aria-hidden="true" /></button><p aria-live="polite" className={status === "error" ? "form-error" : "form-success"}>{status === "success" ? "Thank you. Your message is in our inbox." : status === "error" ? error : "We will use your information only to reply."}</p></div>
  </form>;
}

type ChatMessage = { id: number; sender: "visitor" | "assistant" | "support"; body: string; created_at: string };

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [stage, setStage] = useState<"assistant" | "human">("assistant");
  const [aiEnabled, setAiEnabled] = useState(false);
  const [draft, setDraft] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [savedEmail, setSavedEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [savingContact, setSavingContact] = useState(false);
  const [error, setError] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const load = useCallback(async () => {
    try {
      const response = await fetch("/api/chat", { cache: "no-store" });
      const data = await response.json() as { messages?: ChatMessage[]; status?: "assistant" | "human"; aiEnabled?: boolean; visitorName?: string; visitorEmail?: string; error?: string };
      if (!response.ok) throw new Error(data.error || "Chat is unavailable");
      setMessages(data.messages || []);
      setStage(data.status || "assistant");
      setAiEnabled(Boolean(data.aiEnabled));
      setSavedEmail(data.visitorEmail || "");
      if (data.visitorName) setName(data.visitorName);
      if (data.visitorEmail) setEmail(data.visitorEmail);
      setError("");
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Chat is unavailable"); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => {
    if (!open) return;
    const initial = window.setTimeout(() => void load(), 0);
    const timer = window.setInterval(() => { if (document.visibilityState === "visible") void load(); }, 5000);
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => { window.clearTimeout(initial); window.clearInterval(timer); window.removeEventListener("keydown", onKey); };
  }, [open, load]);
  useEffect(() => { if (open) endRef.current?.scrollIntoView({ block: "end", behavior: "smooth" }); }, [open, messages]);
  async function sendMessage(body: string) {
    if (!body || sending) return;
    setSending(true); setError("");
    try {
      const response = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ body }) });
      const data = await response.json() as { error?: string };
      if (!response.ok) throw new Error(data.error || "Could not send your message");
      setDraft(""); await load();
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Could not send your message"); }
    finally { setSending(false); }
  }
  async function saveContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (savingContact) return;
    setSavingContact(true); setError("");
    try {
      const response = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "contact", name, email }) });
      const data = await response.json() as { error?: string };
      if (!response.ok) throw new Error(data.error || "Could not save your email");
      await load();
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Could not save your email"); }
    finally { setSavingContact(false); }
  }
  const firstQuestion = stage === "assistant" && !messages.some(message => message.sender === "visitor");
  return <div className="chat-widget">
    {open && <section className="chat-panel" role="dialog" aria-modal="false" aria-label="Chat with EasyDesignTech support">
      <div className="chat-head"><div className="chat-head-person"><Image src="/support-agent.webp" alt="" width={58} height={58} /><div><p>EASYDESIGNTECH CARE</p><h2>How can we help?</h2><span>{stage === "human" ? "Your message is with the team." : aiEnabled ? "AI assistant, then a human handoff" : "Guided assistant, then a human handoff"}</span></div></div><button type="button" onClick={() => setOpen(false)} aria-label="Close chat"><X size={20} /></button></div>
      <div className="chat-conversation" role="log" aria-label="Conversation" aria-live="polite">
        {loading && !messages.length ? <p className="chat-empty">Opening your conversation…</p> : messages.length ? messages.map(message => <div key={message.id} className={`chat-line ${message.sender === "visitor" ? "from-visitor" : "from-team"}`}>{message.sender === "assistant" && <Image className="chat-line-avatar" src="/support-agent.webp" alt="" width={28} height={28} />}<div className={`chat-bubble chat-bubble-${message.sender}`}><small>{message.sender === "assistant" ? "VIRTUAL ASSISTANT" : message.sender === "support" ? "HUMAN SUPPORT" : "YOU"}</small><p>{message.body}</p><time>{message.created_at}</time></div></div>) : <div className="chat-welcome"><MessageCircle size={26} /><strong>Your conversation starts here.</strong><p>Tell us what you need. The team can reply in this chat.</p></div>}
        {firstQuestion && !loading && <div className="chat-prompts" aria-label="Common topics"><span>WHAT CAN WE HELP WITH?</span>{["Easylink eSIM", "Websites and apps", "EasyHoli travel", "EasyProperties"].map(topic => <button key={topic} type="button" disabled={sending} onClick={() => void sendMessage(`I’d like help with ${topic}.`)}>{topic} <ArrowUpRight size={13} /></button>)}</div>}
        {stage === "human" && <div className="chat-handoff"><strong>Passed to a person</strong><p>The team can reply in this conversation when available. Keep this browser to return to it.</p></div>}
        <div ref={endRef} />
      </div>
      {stage === "human" && !savedEmail && <form className="chat-contact" onSubmit={saveContact}><label htmlFor="chat-email">Want a reply by email?</label><div><input aria-label="Your name, optional" value={name} onChange={event => setName(event.target.value)} maxLength={100} placeholder="Name, optional" /><input id="chat-email" type="email" value={email} onChange={event => setEmail(event.target.value)} required maxLength={254} placeholder="Email address" /><button type="submit" disabled={savingContact}>{savingContact ? "Saving…" : "Save"}</button></div></form>}
      {stage === "human" && savedEmail && <p className="chat-contact-saved">We can follow up at {savedEmail}.</p>}
      <form className="chat-compose" onSubmit={event => { event.preventDefault(); void sendMessage(draft.trim()); }}><label htmlFor="chat-message">{stage === "human" ? "ADD TO YOUR MESSAGE" : "YOUR QUESTION"}</label><div><textarea id="chat-message" value={draft} onChange={event => setDraft(event.target.value)} rows={2} maxLength={1000} placeholder={stage === "human" ? "Add a detail for the team…" : "How can we help?"} required disabled={loading || sending} /><button type="submit" disabled={loading || sending || !draft.trim()} aria-label="Send chat message"><Send size={19} /></button></div><p className="chat-error" aria-live="polite">{error}</p></form>
      <div className="chat-alternatives"><a href={contact.whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle size={15} /> WhatsApp <ArrowUpRight size={13} /></a><a href={`mailto:${contact.email}`}><Mail size={15} /> Email <ArrowUpRight size={13} /></a><a href="/contact" onClick={() => setOpen(false)}>Project enquiry <ArrowUpRight size={13} /></a></div>
    </section>}
    <button className="support-trigger" type="button" aria-label={open ? "Close customer care chat" : "Open customer care chat"} aria-expanded={open} onClick={() => { if (!open) setLoading(true); setOpen(value => !value); }}>{open ? <X size={21} aria-hidden="true" /> : <Image src="/support-agent.webp" alt="" width={44} height={44} />}<span>{open ? "Close chat" : "Ask us anything"}</span></button>
  </div>;
}
