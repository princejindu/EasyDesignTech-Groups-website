"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { ArrowUpRight, CheckCircle2, Pause, Play, Quote, Star } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

type Review = { id: number; name: string; context: string; quote: string };

// Presentation samples only. Never store these as approved reviews or include
// them in the verified review or satisfied client totals.
const demoReviews: Review[] = [
  { id: -1, name: "Sample client 01", context: "Illustrative website project", quote: "The new experience made it easier to explain what we do and helped people find the right next step." },
  { id: -2, name: "Sample client 02", context: "Illustrative brand project", quote: "The process felt clear from the first conversation, and the design brought the whole idea together." },
  { id: -3, name: "Sample client 03", context: "Illustrative digital project", quote: "A thoughtful team turned a complicated brief into something simple for our customers to use." },
];

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
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewCount, setReviewCount] = useState<number | null>(null);
  const [count, setCount] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    let active = true;
    async function refresh() {
      try {
        const response = await fetch("/api/social-proof", { cache: "no-store" });
        if (!response.ok) return;
        const data = await response.json() as { reviews: Review[]; verifiedReviews: number; satisfiedClients: number | null };
        if (!active) return;
        setReviews(Array.isArray(data.reviews) ? data.reviews : []);
        setReviewCount(Number.isSafeInteger(data.verifiedReviews) && data.verifiedReviews >= 0 ? data.verifiedReviews : null);
        setCount(Number.isSafeInteger(data.satisfiedClients) && data.satisfiedClients !== null && data.satisfiedClients >= 0 ? data.satisfiedClients : null);
      } catch { /* Keep the last known figures if the connection is interrupted. */ }
    }
    refresh();
    const timer = window.setInterval(() => { if (!document.hidden) refresh(); }, 30000);
    const onVisible = () => { if (!document.hidden) refresh(); };
    document.addEventListener("visibilitychange", onVisible);
    return () => { active = false; window.clearInterval(timer); document.removeEventListener("visibilitychange", onVisible); };
  }, []);

  const showingDemo = reviews.length === 0;
  const visibleReviews = showingDemo ? demoReviews : reviews;
  // Repeat short sets within each half so the loop has no blank area on wide screens.
  const loopReviews = Array.from({ length: Math.max(1, Math.ceil(4 / visibleReviews.length)) }, () => visibleReviews).flat();
  const cards = (copy: string) => loopReviews.map((review, index) => <article className="review-card" key={`${copy}-${index}-${review.id}`}>
    <div className="review-card-top"><Quote size={25} strokeWidth={1.4} aria-hidden="true" /><span className={showingDemo ? "demo-badge" : undefined}>{showingDemo ? "DEMO · NOT VERIFIED" : <><CheckCircle2 size={15} aria-hidden="true" /> VERIFIED REVIEW</>}</span></div>
    <blockquote>“{review.quote}”</blockquote>
    <div className="review-card-person"><strong>{review.name}</strong>{review.context && <span>{review.context}</span>}</div>
  </article>);

  return <section className="proof-section" id="reviews" aria-labelledby="proof-title">
    <div className="container">
      <div className="proof-heading"><div><p className="eyebrow dark-eyebrow"><span className="eyebrow-line" /> CLIENT VOICES</p><h2 id="proof-title">The best work<br /><em>means something.</em></h2></div><p className="proof-intro">A moving preview of how client stories will appear. Sample cards are illustrative until approved feedback arrives.</p>
      </div>
      <div className="proof-stats" aria-label="Displayed stories and client figures" aria-live="polite">
        <div className="proof-stat"><span className="proof-stat-index">01 / STORIES ON DISPLAY</span><strong><Count value={visibleReviews.length} /></strong><span>{showingDemo ? "Illustrative sample cards" : "Approved stories in carousel"}</span></div>
        <div className="proof-stat"><span className="proof-stat-index">02 / APPROVED REVIEWS</span><strong>{reviewCount === null ? "—" : <Count value={reviewCount} />}</strong><span>Live total from approved records</span></div>
        <div className="proof-stat proof-stat-accent"><span className="proof-stat-index">03 / SATISFIED CLIENTS</span><strong>{count === null ? "—" : <Count value={count} />}</strong><span>{count === null ? "Confirmed total pending" : "Confirmed client total"}</span></div>
      </div>
      <div className="review-marquee-top"><span><span className="live-dot" /> {showingDemo ? "DEMO STORIES · NOT VERIFIED" : "APPROVED CLIENT STORIES"}</span><button type="button" onClick={() => setPaused(value => !value)} aria-label={paused ? "Play review movement" : "Pause review movement"}>{paused ? <Play size={16} /> : <Pause size={16} />}{paused ? "Play" : "Pause"}</button></div>
        <div className={`review-marquee${paused ? " is-paused" : ""}`} aria-label={showingDemo ? "Illustrative sample cards scrolling from right to left" : "Verified client reviews scrolling from right to left"}>
          <div className="review-motion"><div className="review-group">{cards("first")}</div><div className="review-group" aria-hidden="true">{cards("second")}</div></div>
        </div>
        <div className="proof-bottom"><span>{showingDemo ? "THESE ARE FICTIONAL EXAMPLES, NOT CLIENT TESTIMONIALS" : "REAL WORDS FROM APPROVED CLIENTS"}</span><ReviewDialog /></div>
    </div>
  </section>;
}
