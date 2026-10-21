"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { ArrowUpRight, Star } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

type Review = { id: number; name: string; context: string; quote: string };

function Count({ value }: { value: number }) {
  const element = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(0);
  useEffect(() => {
    const node = element.current;
    if (!node) return;
    let frame = 0;
    const observer = new IntersectionObserver(entries => {
      if (!entries[0]?.isIntersecting) return;
      observer.disconnect();
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setShown(value); return; }
      const start = performance.now();
      const step = (time: number) => { const progress = Math.min((time - start) / 1200, 1); setShown(Math.round(value * (1 - Math.pow(1 - progress, 3)))); if (progress < 1) frame = requestAnimationFrame(step); };
      frame = requestAnimationFrame(step);
    });
    observer.observe(node);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [value]);
  return <span ref={element}>{shown.toLocaleString()}</span>;
}

function ReviewDialog() {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "error" | "success">("idle");
  const [error, setError] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const form = event.currentTarget; const data = new FormData(form); setState("sending");
    try { const response = await fetch("/api/reviews", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: data.get("name"), context: data.get("context"), quote: data.get("quote"), website: data.get("website"), consent: data.get("consent") === "on" }) }); const result = await response.json() as { error?: string }; if (!response.ok) throw new Error(result.error || "Please try again"); form.reset(); setState("success"); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "Please try again"); setState("error"); }
  }
  return <Dialog open={open} onOpenChange={setOpen}><DialogTrigger className="review-trigger">Share your experience <ArrowUpRight size={17} aria-hidden="true" /></DialogTrigger><DialogContent className="review-dialog"><DialogHeader><DialogTitle>Your experience matters.</DialogTitle><p>Worked with us? Send a review for approval before it appears on the website.</p></DialogHeader>{state === "success" ? <div className="review-success"><Star size={26} /><p>Thank you for sharing your experience. We will review it before publishing.</p><button onClick={() => setOpen(false)}>Close</button></div> : <form onSubmit={submit} className="review-form"><label>Your name<input name="name" required minLength={2} maxLength={100} /></label><label>Project or service <span>optional</span><input name="context" maxLength={120} /></label><label>Your review<textarea name="quote" required minLength={10} maxLength={1000} rows={4} /></label><label className="honeypot" aria-hidden="true">Leave blank<input name="website" tabIndex={-1} /></label><label className="consent"><input name="consent" type="checkbox" required /><span>I agree to this review and my name being displayed after approval.</span></label><button className="button button-light" type="submit" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Send review"} <ArrowUpRight size={17} /></button>{state === "error" && <p role="alert">{error}</p>}</form>}</DialogContent></Dialog>;
}

export function SocialProof() {
  const [reviews, setReviews] = useState<Review[] | null>(null);
  const [reviewCount, setReviewCount] = useState<number | null>(null);
  const [count, setCount] = useState<number | null>(null);
  useEffect(() => {
    let active = true;
    async function refresh() {
      try {
        const response = await fetch("/api/social-proof", { cache: "no-store" });
        if (!response.ok) { if (active) setReviews(current => current ?? []); return; }
        const data = await response.json() as { reviews: Review[]; verifiedReviews: number; satisfiedClients: number | null };
        if (!active) return;
        setReviews(Array.isArray(data.reviews) ? data.reviews : []);
        setReviewCount(Number.isSafeInteger(data.verifiedReviews) && data.verifiedReviews > 0 ? data.verifiedReviews : null);
        setCount(Number.isSafeInteger(data.satisfiedClients) && data.satisfiedClients !== null && data.satisfiedClients > 0 ? data.satisfiedClients : null);
      } catch { if (active) setReviews(current => current ?? []); }
    }
    refresh();
    const timer = window.setInterval(() => { if (!document.hidden) refresh(); }, 30000);
    return () => { active = false; window.clearInterval(timer); };
  }, []);

  const list = reviews ?? [];
  return <section className="band band-paper" id="reviews" aria-labelledby="proof-title">
    <div className="band-head"><h2 id="proof-title" className="rv">What clients say</h2><p className="rv">Only approved reviews from real clients appear here. Each one is checked before it is published.</p></div>
    {(reviewCount !== null || count !== null) && <div className="proof-counts" aria-live="polite">
      {reviewCount !== null && <div><strong><Count value={reviewCount} /></strong><span>Approved reviews</span></div>}
      {count !== null && <div><strong><Count value={count} /></strong><span>Satisfied clients</span></div>}
    </div>}
    {list.length > 0 ? <>
      <div className="review-list">{list.map(review => <article className="review-item rv" key={review.id}><blockquote>“{review.quote}”</blockquote><div><strong>{review.name}</strong>{review.context && <span>{review.context}</span>}</div></article>)}</div>
      <p className="fine-print">Worked with us? <ReviewDialog /></p>
    </> : <div className="review-empty rv">
      <h3>{reviews === null ? "Loading reviews…" : "Be the first to leave a review."}</h3>
      <p>Approved client reviews will appear on this page. If we have worked together, we would love to hear how it went.</p>
      <ReviewDialog />
    </div>}
  </section>;
}
