import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, LayoutDashboard, Monitor, Search, ShoppingBag, Smartphone, Workflow } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Web and app development | EasyDesignTech",
  description: "Websites, online stores, customer portals, web apps, mobile app design and UI and UX from EasyDesignTech.",
};

const services = [
  { icon: Monitor, title: "Websites with purpose", copy: "A clear story, a confident first impression and a responsive experience that guides visitors toward the next step." },
  { icon: ShoppingBag, title: "Online stores", copy: "Shopping journeys shaped around your products, your customers and a checkout experience that feels considered." },
  { icon: LayoutDashboard, title: "Web apps and portals", copy: "Useful tools for customers or teams, with the right information and actions easy to find." },
  { icon: Smartphone, title: "Mobile app experiences", copy: "Flows and interfaces made for the smaller screen, with the same care for clarity, speed and personality." },
  { icon: Search, title: "UI and UX design", copy: "Research, structure, wireframes and visual design that make complex journeys feel understandable." },
  { icon: Workflow, title: "Connected systems", copy: "Thoughtful integrations, forms and workflows that help the experience continue beyond the first click." },
];
const process = [
  { number: "01", title: "Understand", copy: "We learn the business, the audience and the problem worth solving." },
  { number: "02", title: "Shape", copy: "We map the journey and decide what the product needs to do first." },
  { number: "03", title: "Design and build", copy: "We bring the interface to life across screen sizes and practical use cases." },
  { number: "04", title: "Refine", copy: "We test, improve and prepare the experience for the people who will use it." },
];

export default function WebAppsPage() {
  return <div className="site-shell"><SiteHeader /><main className="specialty-page web-specialty">
    <section className="specialty-hero" aria-labelledby="web-title"><div className="container specialty-hero-grid"><div className="specialty-hero-copy"><div className="specialty-breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/services">Services</Link><span>/</span><span>Web and apps</span></div><p className="eyebrow"><span className="eyebrow-line" /> DIGITAL EXPERIENCES BY EASYDESIGNTECH</p><h1 id="web-title">Built to be<br /><em>used. Loved. Remembered.</em></h1><p className="specialty-intro">Your digital experience should do more than look the part. We design and build websites, products and mobile journeys that help people understand, explore and act.</p><div className="specialty-actions"><Link className="button button-light" href="/contact?interest=Web%20and%20apps">Discuss your idea <ArrowUpRight size={18} aria-hidden="true" /></Link><a href="#what-we-build">See what we build <ArrowRight size={17} aria-hidden="true" /></a></div></div><div className="specialty-hero-image"><Image src="/service-devices.webp" alt="Desktop, tablet and phone in a connected digital design scene" fill priority sizes="(max-width: 850px) 100vw, 50vw" /><span>WEBSITE / PRODUCT / MOBILE</span></div></div></section>
    <div className="specialty-value-strip"><div className="container"><span>DESIGNED FOR REAL PEOPLE</span><span>BUILT FOR EVERY SCREEN</span><span>READY TO GROW WITH YOU</span></div></div>

    <section className="specialty-offerings" id="what-we-build" aria-labelledby="web-offerings-title"><div className="container"><div className="specialty-section-head"><div><p className="eyebrow dark-eyebrow"><span className="eyebrow-line" /> WHAT WE CAN BUILD</p><h2 id="web-offerings-title">The right shape<br /><em>for your idea.</em></h2></div><p>Some projects need a beautiful front door. Others need a whole system behind it. We can help define the scope and create an experience that fits.</p></div><div className="specialty-offerings-grid">{services.map((item, index) => <article key={item.title}><div><span>{String(index + 1).padStart(2, "0")} / 06</span><item.icon size={28} strokeWidth={1.5} aria-hidden="true" /></div><h3>{item.title}</h3><p>{item.copy}</p></article>)}</div></div></section>

    <section className="specialty-statement"><div className="container specialty-statement-grid"><p className="eyebrow"><span className="eyebrow-line" /> THE DETAILS MATTER</p><div><h2>Make every click<br /><em>feel effortless.</em></h2><p>Fast to understand. Comfortable to navigate. Consistent from phone to desktop. The strongest digital products make the next action feel obvious without taking away what makes a brand distinctive.</p><div className="specialty-statement-tags"><span>Clear journeys</span><span>Responsive design</span><span>Thoughtful details</span></div></div></div></section>

    <section className="specialty-process"><div className="container"><div className="specialty-section-head"><div><p className="eyebrow dark-eyebrow"><span className="eyebrow-line" /> HOW THE WORK TAKES SHAPE</p><h2>From first idea<br /><em>to useful reality.</em></h2></div><p>We start with what the experience needs to achieve, then give each decision a reason to be there.</p></div><div className="specialty-process-grid">{process.map(item => <article key={item.number}><span>{item.number}</span><h3>{item.title}</h3><p>{item.copy}</p></article>)}</div></div></section>

    <section className="specialty-close"><div className="container specialty-close-grid"><div><p className="eyebrow"><span className="eyebrow-line" /> LET US BUILD SOMETHING USEFUL</p><h2>What could your<br /><em>idea become?</em></h2></div><div><p>Tell us about the website, app or platform you have in mind. An early idea is enough to begin the conversation.</p><Link className="button button-light" href="/contact?interest=Web%20and%20apps">Start a project <ArrowUpRight size={18} aria-hidden="true" /></Link><Link className="specialty-related" href="/services/social-content">Explore content and video <ArrowRight size={16} aria-hidden="true" /></Link></div></div></section>
  </main><SiteFooter /></div>;
}
