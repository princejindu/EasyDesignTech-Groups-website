import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Braces, Layers3, Megaphone, Sparkles } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
import { ServiceSpectrum } from "@/components/service-spectrum";

export const metadata: Metadata = {
  title: "Our services | EasyDesignTech",
  description: "Web and app development, branding, social content, AI assisted video, automation and data services from EasyDesignTech.",
};

const chapters = [
  {
    id: "web-apps", number: "01", category: "DIGITAL PRODUCTS", title: "Web and app development",
    icon: Braces, theme: "web", image: "/service-devices.webp", href: "/services/web-apps",
    copy: "From a striking first impression to the product behind your business, we design useful digital experiences with a clear path from idea to launch.",
    items: ["Business websites and online stores", "Web apps and customer portals", "Mobile app design and user journeys"],
    action: "Explore web and app development",
  },
  {
    id: "branding", number: "02", category: "IDENTITY AND DESIGN", title: "Branding and design",
    icon: Layers3, theme: "brand", image: "/service-branding.webp", href: "/services/branding",
    copy: "A memorable brand is more than a logo. We create the visual language, graphic assets and thoughtful details that help your business look and feel like itself.",
    items: ["Brand identity and direction", "Graphic, print and presentation design", "Campaign visuals and creative systems"],
    action: "Explore branding and design",
  },
  {
    id: "social", number: "03", category: "CONTENT AND CONNECTION", title: "Social media and content",
    icon: Megaphone, theme: "social", image: "/service-content.webp", href: "/services/social-content",
    copy: "Show up with purpose. We turn ideas into visual stories for the channels your audience uses, including AI assisted video concepts, motion and day to day content.",
    items: ["Content planning and social management", "Short video, reels and motion graphics", "AI assisted video and campaign creative"],
    action: "Explore content services",
  },
  {
    id: "automation", number: "04", category: "SYSTEMS AND INSIGHT", title: "AI automation and data",
    icon: Sparkles, theme: "data", image: "/service-systems.webp", href: "/services/automation",
    copy: "When the right information reaches the right place, teams have more room to do their best work. We shape practical workflows and clearer views of the business.",
    items: ["AI assisted workflows and customer journeys", "Dashboards and useful reporting", "Organised data and connected systems"],
    action: "Explore AI automation",
  },
];

const capabilities = [
  "Business websites", "Online stores", "Customer portals", "Mobile app design",
  "UI and UX design", "Brand identities", "Graphic and print design", "Social account care",
  "AI assisted video", "Motion and campaign assets", "AI workflows", "Dashboards and reporting",
];

export default function ServicesPage() {
  return <div className="site-shell"><SiteHeader /><main className="services-hub">
    <ServiceSpectrum />

    <div className="services-motion-ribbon" aria-hidden="true"><div>THINK <span>✳</span> DESIGN <span>✳</span> BUILD <span>✳</span> REFINE <span>✳</span> THINK <span>✳</span> DESIGN <span>✳</span> BUILD <span>✳</span> REFINE <span>✳</span></div></div>

    <section className="services-chapters" aria-labelledby="chapters-title"><div className="container"><div className="services-chapters-intro"><div><p className="eyebrow dark-eyebrow"><span className="eyebrow-line" /> WHAT WE DO</p><h2 id="chapters-title">Good work,<br /><em>from every angle.</em></h2></div><p>Four connected areas of expertise. Choose the one that fits your brief, or bring us the whole challenge.</p></div>
      <div className="service-chapters-list">{chapters.map(item => <article className={`service-chapter chapter-${item.theme}`} id={item.id} key={item.id}><span className="service-chapter-number">{item.number} / 04</span><div className="service-chapter-copy"><div className="service-chapter-icon"><item.icon size={28} strokeWidth={1.5} aria-hidden="true" /></div><p className="service-chapter-category">{item.category}</p><h3>{item.title}</h3><p className="service-chapter-description">{item.copy}</p><ul>{item.items.map(value => <li key={value}>{value}</li>)}</ul><div className="service-chapter-actions"><Link href={item.href} className="service-chapter-link">{item.action} <ArrowUpRight size={18} aria-hidden="true" /></Link><Link href={`/contact?interest=${encodeURIComponent(item.title === "Web and app development" ? "Web and apps" : item.title)}`} className="service-chapter-link">Get a quote <ArrowUpRight size={18} aria-hidden="true" /></Link></div></div><div className="service-chapter-art" aria-hidden="true"><Image src={item.image} alt="" fill sizes="(max-width: 850px) 100vw, 37vw" /><span>{item.number} / {item.category}</span></div></article>)}</div>
    </div></section>

    <section className="services-capabilities"><div className="container"><div className="services-capabilities-head"><p className="eyebrow"><span className="eyebrow-line" /> A CLOSER LOOK</p><h2>One studio.<br /><em>More ways to move forward.</em></h2></div><div className="services-capabilities-grid">{capabilities.map((value, index) => <Link href={index < 5 ? "/services/web-apps" : index < 7 ? "/services/branding" : index < 10 ? "/services/social-content" : "/services/automation"} key={value}><span>{String(index + 1).padStart(2, "0")}</span><strong>{value}</strong><ArrowUpRight size={17} aria-hidden="true" /></Link>)}</div><p>Have a brief that spans several areas? <Link href="/contact">Tell us what you are building <ArrowRight size={16} aria-hidden="true" /></Link></p><Link className="services-pricing-link" href="/pricing">Compare starting packages <ArrowUpRight size={17} aria-hidden="true" /></Link></div></section>

    <section className="services-hub-end"><div className="container services-hub-end-grid"><div><p className="eyebrow dark-eyebrow"><span className="eyebrow-line" /> FROM IDEA TO IMPACT</p><h2>Let us make the<br /><em>next step count.</em></h2></div><div><p>Tell us where you are now and where you want to go. We will help shape the work around your goals and the people you want to reach.</p><Link className="button button-dark" href="/contact">Start your project <ArrowUpRight size={18} aria-hidden="true" /></Link></div></div></section>
  </main><SiteFooter /></div>;
}
