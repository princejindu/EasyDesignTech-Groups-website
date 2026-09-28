import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Bot, ChartNoAxesCombined, DatabaseZap, MessagesSquare, Network, Workflow } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "AI automation and data | EasyDesignTech",
  description: "Practical AI workflows, connected systems, customer support journeys and reporting built around the way your team works.",
};

const offerings = [
  { icon: Workflow, title: "Workflow automation", copy: "Map repeatable steps, connect the tools you use and make handoffs easier for your team." },
  { icon: Bot, title: "AI assistants", copy: "A guided assistant for common questions, enquiry triage or internal knowledge with a clear route to a person." },
  { icon: MessagesSquare, title: "Customer journeys", copy: "Better enquiry capture, timely follow up and organised conversations across the touchpoints that matter." },
  { icon: Network, title: "System connections", copy: "Help useful information move between forms, tools and teams without needless copy and paste." },
  { icon: ChartNoAxesCombined, title: "Dashboards", copy: "See meaningful activity in one place so decisions are based on signals you can understand." },
  { icon: DatabaseZap, title: "Data foundations", copy: "Clean structures, sensible permissions and human review points that keep a workflow dependable." },
];

export default function AutomationPage() {
  return <div className="site-shell"><SiteHeader /><main className="specialty-page automation-specialty">
    <section className="specialty-hero" aria-labelledby="automation-title"><div className="container specialty-hero-grid"><div className="specialty-hero-copy"><div className="specialty-breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/services">Services</Link><span>/</span><span>AI and data</span></div><p className="eyebrow"><span className="eyebrow-line" /> BETTER SYSTEMS, BETTER FLOW</p><h1 id="automation-title">Less busywork.<br /><em>More room to grow.</em></h1><p className="specialty-intro">Put repetitive steps on a smarter path. We design practical AI assisted workflows, connected customer journeys and clear dashboards around the work your team actually does.</p><div className="specialty-actions"><Link className="button button-light" href="/contact?interest=AI%20automation%20and%20data">Discuss your workflow <ArrowUpRight size={18} aria-hidden="true" /></Link><Link href="/pricing">See starting prices <ArrowRight size={17} aria-hidden="true" /></Link></div></div><div className="specialty-hero-image"><Image src="/service-systems.webp" alt="Connected digital systems and data visualisation" fill priority sizes="(max-width: 850px) 100vw, 50vw" /><span>WORKFLOWS / AI / INSIGHT</span></div></div></section>
    <div className="specialty-value-strip"><div className="container"><span>START WITH ONE USE CASE</span><span>KEEP PEOPLE IN CONTROL</span><span>MEASURE WHAT CHANGES</span></div></div>
    <section className="specialty-offerings" aria-labelledby="automation-offerings"><div className="container"><div className="specialty-section-head"><div><p className="eyebrow dark-eyebrow"><span className="eyebrow-line" /> WHAT CAN BE CONNECTED</p><h2 id="automation-offerings">A better way<br /><em>through the work.</em></h2></div><p>We begin with a real bottleneck, define a useful outcome and build a workflow with room for oversight and refinement.</p></div><div className="specialty-offerings-grid">{offerings.map((item, index) => <article key={item.title}><div><span>{String(index + 1).padStart(2, "0")} / 06</span><item.icon size={28} strokeWidth={1.5} aria-hidden="true" /></div><h3>{item.title}</h3><p>{item.copy}</p><Link className="offering-action" href="/contact?interest=AI%20automation%20and%20data">Explore this use case <ArrowUpRight size={16} aria-hidden="true" /></Link></article>)}</div><div className="offerings-next"><p>One workflow or a connected system? See the starting guide and we will scope the right fit.</p><Link href="/pricing">Explore pricing <ArrowUpRight size={17} aria-hidden="true" /></Link></div></div></section>
    <section className="specialty-close"><div className="container specialty-close-grid"><div><p className="eyebrow"><span className="eyebrow-line" /> FIND THE USEFUL FIRST STEP</p><h2>Tell us where<br /><em>the work gets stuck.</em></h2></div><div><p>Share the repetitive task, disconnected tools or reporting gap you want to solve. We will discuss a focused first use case before proposing a build.</p><Link className="button button-light" href="/contact?interest=AI%20automation%20and%20data">Start a workflow brief <ArrowUpRight size={18} aria-hidden="true" /></Link><Link className="specialty-related" href="/services/web-apps">Explore digital products <ArrowRight size={16} aria-hidden="true" /></Link></div></div></section>
  </main><SiteFooter /></div>;
}
