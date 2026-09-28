import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Braces, Layers3, Megaphone, Sparkles } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/site-shell";

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
    icon: Layers3, theme: "brand", image: "", href: "/contact?interest=Branding%20and%20design",
    copy: "A memorable brand is more than a logo. We create the visual language, graphic assets and thoughtful details that help your business look and feel like itself.",
    items: ["Brand identity and direction", "Graphic, print and presentation design", "Campaign visuals and creative systems"],
    action: "Enquire about branding",
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
    icon: Sparkles, theme: "data", image: "", href: "/contact?interest=AI%20automation%20and%20data",
    copy: "When the right information reaches the right place, teams have more room to do their best work. We shape practical workflows and clearer views of the business.",
    items: ["AI assisted workflows and customer journeys", "Dashboards and useful reporting", "Organised data and connected systems"],
    action: "Enquire about automation",
  },
];

const capabilities = [
  "Business websites", "Online stores", "Customer portals", "Mobile app design",
  "UI and UX design", "Brand identities", "Graphic and print design", "Social account care",
  "AI assisted video", "Motion and campaign assets", "AI workflows", "Dashboards and reporting",
];

export default function ServicesPage() {
  return <div className="site-shell"><SiteHeader /><main className="services-hub">
    <section className="services-hub-hero" aria-labelledby="services-hub-title"><div className="container services-hub-hero-grid">
      <div className="services-hub-hero-copy"><p className="eyebrow"><span className="eyebrow-line" /> EASYDESIGNTECH / THE STUDIO</p><h1 id="services-hub-title">Make it look good.<br /><em>Make it work.</em></h1><p>Ideas need more than attention. They need direction, craft and a team that can bring every detail together. That is where we come in.</p><Link className="button button-light" href="/contact">Start a project <ArrowUpRight size={18} aria-hidden="true" /></Link></div>
      <div className="services-hub-hero-art"><Image src="/service-devices.webp" alt="A desktop, tablet and phone representing connected digital experiences" fill priority sizes="(max-width: 850px) 100vw, 52vw" /><span>CREATIVE THINKING / PRACTICAL BUILDING</span><span className="services-hub-hero-stamp">ED<span>✳</span></span></div>
    </div><div className="container services-hub-quick"><span>FIND YOUR FOCUS</span><Link href="/services/web-apps">Web and apps <ArrowUpRight size={17} /></Link><a href="#branding">Branding <ArrowRight size={17} /></a><Link href="/services/social-content">Social and video <ArrowUpRight size={17} /></Link><a href="#automation">AI and data <ArrowRight size={17} /></a></div></section>

    <section className="services-chapters" aria-labelledby="chapters-title"><div className="container"><div className="services-chapters-intro"><div><p className="eyebrow dark-eyebrow"><span className="eyebrow-line" /> WHAT WE DO</p><h2 id="chapters-title">Good work,<br /><em>from every angle.</em></h2></div><p>Four connected areas of expertise. Choose the one that fits your brief, or bring us the whole challenge.</p></div>
      <div className="service-chapters-list">{chapters.map(item => <article className={`service-chapter chapter-${item.theme}`} id={item.id} key={item.id}><span className="service-chapter-number">{item.number} / 04</span><div className="service-chapter-copy"><div className="service-chapter-icon"><item.icon size={28} strokeWidth={1.5} aria-hidden="true" /></div><p className="service-chapter-category">{item.category}</p><h3>{item.title}</h3><p className="service-chapter-description">{item.copy}</p><ul>{item.items.map(value => <li key={value}>{value}</li>)}</ul><Link href={item.href} className="service-chapter-link">{item.action} <ArrowUpRight size={18} aria-hidden="true" /></Link></div><div className="service-chapter-art" aria-hidden="true">{item.image ? <Image src={item.image} alt="" fill sizes="(max-width: 850px) 100vw, 37vw" /> : item.theme === "brand" ? <div className="chapter-brand-glyph"><span>ED</span><small>DESIGN THAT SPEAKS</small></div> : <div className="chapter-data-glyph"><span>MAKE ROOM FOR BETTER WORK</span><div><i /><i /><i /><i /><i /><i /></div><Sparkles size={38} strokeWidth={1} /></div>}</div></article>)}</div>
    </div></section>

    <section className="services-capabilities"><div className="container"><div className="services-capabilities-head"><p className="eyebrow"><span className="eyebrow-line" /> A CLOSER LOOK</p><h2>One studio.<br /><em>More ways to move forward.</em></h2></div><div className="services-capabilities-grid">{capabilities.map((value, index) => <Link href={index < 5 ? "/services/web-apps" : index < 7 ? "/services#branding" : index < 10 ? "/services/social-content" : "/services#automation"} key={value}><span>{String(index + 1).padStart(2, "0")}</span><strong>{value}</strong><ArrowUpRight size={17} aria-hidden="true" /></Link>)}</div><p>Have a brief that spans several areas? <Link href="/contact">Tell us what you are building <ArrowRight size={16} aria-hidden="true" /></Link></p></div></section>

    <section className="services-hub-end"><div className="container services-hub-end-grid"><div><p className="eyebrow dark-eyebrow"><span className="eyebrow-line" /> FROM IDEA TO IMPACT</p><h2>Let us make the<br /><em>next step count.</em></h2></div><div><p>Tell us where you are now and where you want to go. We will help shape the work around your goals and the people you want to reach.</p><Link className="button button-dark" href="/contact">Start your project <ArrowUpRight size={18} aria-hidden="true" /></Link></div></div></section>
  </main><SiteFooter /></div>;
}
