import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { EnquiryForm, FacebookContactLink } from "@/components/contact-experience";
import { contact } from "@/lib/contact";

export const metadata: Metadata = { title: "Contact | EasyDesignTech", description: "Tell EasyDesignTech about your project, service enquiry or business question." };

export default function ContactPage() {
  return <div className="site-shell"><SiteHeader /><main className="contact-page"><section className="contact-section" aria-labelledby="contact-title"><div className="container contact-layout"><div className="contact-copy"><p className="eyebrow"><span className="eyebrow-line" /> LET&apos;S TALK</p><h1 id="contact-title">Tell us what<br /><em>you are imagining.</em></h1><p>Share the idea, the challenge or the service you need. Our team will read your enquiry and get back to you.</p><div className="contact-direct"><a href={`mailto:${contact.email}`}>Email us <span>{contact.email}</span><ArrowUpRight size={18} aria-hidden="true" /></a><a href={contact.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp <span>Start a conversation</span><ArrowUpRight size={18} aria-hidden="true" /></a><FacebookContactLink /></div></div><div className="contact-form-wrap"><div className="form-title"><span>PROJECT ENQUIRY</span><span>01 / 01</span></div><EnquiryForm /></div></div></section></main><SiteFooter /></div>;
}
