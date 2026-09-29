import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, CircleHelp, Sparkles } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Pricing guide | EasyDesignTech",
  description: "Illustrative starting packages for websites, apps, social media, AI automation and AI assisted video. Tell us your brief for a tailored quote.",
};

const packages = [
  {
    eyebrow: "WEB DESIGN", title: "Website Launch", price: "£749", period: "one time", interest: "Web and apps", accent: "lime",
    summary: "A polished online starting point for a small business ready to be found and contacted.",
    includes: ["Up to four core pages", "Responsive design", "Clear enquiry route", "Basic search setup"],
    note: "Best for a focused first website.",
  },
  {
    eyebrow: "WEB DESIGN", title: "Website Growth", price: "£1,999", period: "one time", interest: "Web and apps", accent: "blue",
    summary: "A more distinctive site with room to explain your offer and guide different audiences.",
    includes: ["Up to eight tailored pages", "Content and user journey planning", "Enquiry flows", "Analytics setup and launch checks"],
    note: "Best for an established offer with more to say.",
  },
  {
    eyebrow: "APP DEVELOPMENT", title: "Product First Build", price: "£4,500", period: "per project", interest: "Web and apps", accent: "violet",
    summary: "Turn one valuable customer or team journey into an initial working web product.",
    includes: ["Discovery and scope", "Core journey and interface design", "One focused initial build", "Testing and handover"],
    note: "Mobile apps and larger products are scoped separately.",
  },
  {
    eyebrow: "CONTENT AND SOCIAL", title: "Social Presence", price: "£450", period: "per month", interest: "Social media and content", accent: "peach",
    summary: "A consistent branded presence with a plan and useful creative assets each month.",
    includes: ["Monthly content direction", "Eight designed posts for one channel", "Scheduling support", "Monthly review"],
    note: "Video, paid media and community care can be added.",
  },
  {
    eyebrow: "AI AUTOMATION", title: "Workflow Starter", price: "£900", period: "per setup", interest: "AI automation and data", accent: "mint",
    summary: "Choose one repetitive task and build a dependable first automation around it.",
    includes: ["Workflow mapping", "One focused automation", "Human review point", "Testing and team handover"],
    note: "Software subscriptions and API usage are separate.",
  },
  {
    eyebrow: "AI VIDEO EDITING", title: "Short Video", price: "£300", period: "per video", interest: "Social media and content", accent: "pink",
    summary: "A short social video with a concept, crafted edit and a clear brand message.",
    includes: ["Creative direction", "One short form edit", "Captions and social format", "One revision round"],
    note: "Complex AI generation and licensed assets are scoped separately.",
  },
];

const questions = [
  { title: "Are these final prices?", answer: "These are indicative starting points. We confirm a written scope and quote after learning about your goals, content, integrations and timeline. Taxes and third party costs are confirmed in the quote." },
  { title: "Can I combine services?", answer: "Yes. A website, brand and content can be planned together. Tell us what you need and we will recommend a sensible order of work." },
  { title: "What about a custom app or larger AI system?", answer: "Larger products, mobile apps and multiple connected workflows need discovery before pricing. Share the first use case and we will propose a clear scope." },
];

export default function PricingPage() {
  return <div className="site-shell"><SiteHeader /><main className="pricing-page">
    <section className="pricing-hero" aria-labelledby="pricing-title"><div className="container pricing-hero-grid"><div><p className="eyebrow"><span className="eyebrow-line" /> AN EASIER PLACE TO START</p><h1 id="pricing-title">Good ideas need<br /><em>a clear first step.</em></h1></div><div className="pricing-hero-side"><p>Choose a direction, see an indicative starting point and tell us what you have in mind. We will shape the right scope with you.</p><Link href="/contact?quote=tailored" className="button button-light">Ask for a tailored quote <ArrowUpRight size={18} aria-hidden="true" /></Link></div></div><div className="container pricing-hero-meta"><span>WEB / APPS / CONTENT / AI</span><span>NO CHECKOUT. JUST A CONVERSATION.</span></div></section>
    <section className="pricing-packages" aria-labelledby="packages-title"><div className="container"><div className="pricing-section-heading"><div><p className="eyebrow dark-eyebrow"><span className="eyebrow-line" /> STARTING PACKAGES</p><h2 id="packages-title">Find your<br /><em>starting point.</em></h2></div><p>Each package is a useful baseline. We will confirm the exact deliverables and price before work begins.</p></div><div className="pricing-grid">{packages.map(item => <article className={`pricing-card pricing-${item.accent}`} key={item.title}><div className="pricing-card-top"><span>{item.eyebrow}</span><Sparkles size={19} strokeWidth={1.5} aria-hidden="true" /></div><h3>{item.title}</h3><p className="pricing-summary">{item.summary}</p><div className="pricing-amount"><span>From</span><strong>{item.price}</strong><small>{item.period}</small></div><ul>{item.includes.map(value => <li key={value}><Check size={17} strokeWidth={2} aria-hidden="true" />{value}</li>)}</ul><p className="pricing-note">{item.note}</p><Link className="pricing-action" aria-label={`Request a tailored quote for ${item.title}`} href={`/contact?quote=tailored&interest=${encodeURIComponent(item.interest)}&package=${encodeURIComponent(item.title)}`}>Request a tailored quote <ArrowUpRight size={18} aria-hidden="true" /></Link></article>)}</div><p className="pricing-disclaimer">These are illustrative starting prices in GBP. Final pricing depends on the agreed scope, timeline and required tools. Hosting, ad spend, software subscriptions, API usage, licensing and taxes are quoted separately where applicable.</p></div></section>
    <section className="pricing-process"><div className="container pricing-process-grid"><div><p className="eyebrow"><span className="eyebrow-line" /> FROM INTEREST TO ACTION</p><h2>Simple to begin.<br /><em>Thoughtful from there.</em></h2></div><div className="pricing-steps"><div><span>01</span><strong>Choose a direction</strong><p>Pick a package or tell us about a custom project.</p></div><div><span>02</span><strong>Share your brief</strong><p>We learn your audience, goals and the work involved.</p></div><div><span>03</span><strong>Get a clear proposal</strong><p>We confirm scope, deliverables and price before starting.</p></div></div></div></section>
    <section className="pricing-questions"><div className="container pricing-questions-grid"><div><p className="eyebrow dark-eyebrow"><span className="eyebrow-line" /> USEFUL TO KNOW</p><h2>Questions before<br /><em>we begin?</em></h2></div><div>{questions.map(item => <details key={item.title}><summary><CircleHelp size={19} aria-hidden="true" />{item.title}<span aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}<p className="pricing-brand-note">Need a new brand identity too? <Link href="/services/branding">Explore branding <ArrowRight size={16} aria-hidden="true" /></Link></p></div></div></section>
    <section className="pricing-close"><div className="container"><p className="eyebrow"><span className="eyebrow-line" /> YOUR NEXT MOVE</p><h2>Tell us the idea.<br /><em>We will make the plan.</em></h2><Link href="/contact?quote=tailored" className="button button-light">Request your quote <ArrowUpRight size={18} aria-hidden="true" /></Link></div></section>
  </main><SiteFooter /></div>;
}
