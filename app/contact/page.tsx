import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { EnquiryForm, FacebookContactLink } from "@/components/contact-experience";
import { contact } from "@/lib/contact";

export const metadata: Metadata = { title: "Contact | EasyDesignTech", description: "Tell EasyDesignTech about your project, service enquiry or business question." };

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ quote?: string }> }) {
  const isQuote = (await searchParams).quote === "tailored";
  return <div className="site-shell"><SiteHeader /><main className="contact-page"><section className={`contact-section${isQuote ? " quote-contact" : ""}`} aria-labelledby="contact-title"><div className="container contact-layout"><div className="contact-copy"><p className="eyebrow"><span className="eyebrow-line" /> {isQuote ? "LET'S PLAN IT" : "LET'S TALK"}</p><h1 id="contact-title">{isQuote ? <>A quote shaped<br /><em>around your idea.</em></> : <>Tell us what<br /><em>you are imagining.</em></>}</h1><p>{isQuote ? "Tell us about your goals and timing. We will review your brief and follow up with the right scope and next steps." : "Share the idea, the challenge or the service you need. Our team will read your enquiry and get back to you."}</p><div className="contact-direct"><a href={contact.emailHref}>Email us <span>{contact.email}</span><ArrowUpRight size={18} aria-hidden="true" /></a><a href={contact.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp <span>Start a conversation</span><ArrowUpRight size={18} aria-hidden="true" /></a><FacebookContactLink /></div></div><div className="contact-form-wrap"><div className="form-title"><span>{isQuote ? "TAILORED QUOTE" : "PROJECT ENQUIRY"}</span><span>01 / 01</span></div><EnquiryForm /></div></div></section></main><SiteFooter /></div>;
}
