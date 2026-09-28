import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen, Fingerprint, Layers3, Megaphone, Palette, PenTool } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Branding and design | EasyDesignTech",
  description: "Brand identity, creative direction, graphic design and campaign assets that help businesses show up with clarity.",
};

const offerings = [
  { icon: Fingerprint, title: "Brand identity", copy: "A recognisable logo, colour, type and visual language designed to work together wherever people meet you." },
  { icon: BookOpen, title: "Brand guidelines", copy: "A practical system your team can use consistently across digital, social and printed materials." },
  { icon: Palette, title: "Creative direction", copy: "An idea and visual point of view to guide your launch, refresh or next campaign." },
  { icon: PenTool, title: "Graphic and print", copy: "Presentations, brochures, packaging and everyday assets that carry the same confident story." },
  { icon: Megaphone, title: "Campaign visuals", copy: "Distinctive assets shaped for the message and channels behind a promotion or launch." },
  { icon: Layers3, title: "Digital brand systems", copy: "Reusable visuals and interface details that give your website and product a coherent feel." },
];

export default function BrandingPage() {
  return <div className="site-shell"><SiteHeader /><main className="specialty-page brand-specialty">
    <section className="specialty-hero" aria-labelledby="brand-title"><div className="container specialty-hero-grid"><div className="specialty-hero-copy"><div className="specialty-breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/services">Services</Link><span>/</span><span>Branding</span></div><p className="eyebrow"><span className="eyebrow-line" /> MAKE THE RIGHT IMPRESSION</p><h1 id="brand-title">Look like<br /><em>you mean business.</em></h1><p className="specialty-intro">People decide how they feel about a brand in moments. We give yours a clear identity and the creative tools to show up with confidence again and again.</p><div className="specialty-actions"><Link className="button button-light" href="/contact?interest=Branding%20and%20design">Discuss your brand <ArrowUpRight size={18} aria-hidden="true" /></Link><Link href="/pricing">See starting prices <ArrowRight size={17} aria-hidden="true" /></Link></div></div><div className="specialty-hero-image"><Image src="/service-branding.webp" alt="Expressive graphic design and brand identity composition" fill priority sizes="(max-width: 850px) 100vw, 50vw" /><span>IDENTITY / DIRECTION / DESIGN</span></div></div></section>
    <div className="specialty-value-strip"><div className="container"><span>RECOGNISABLE AT A GLANCE</span><span>CONSISTENT AT EVERY TOUCHPOINT</span><span>READY TO GROW</span></div></div>
    <section className="specialty-offerings" aria-labelledby="brand-offerings"><div className="container"><div className="specialty-section-head"><div><p className="eyebrow dark-eyebrow"><span className="eyebrow-line" /> THE BRAND TOOLKIT</p><h2 id="brand-offerings">An identity with<br /><em>room to move.</em></h2></div><p>Start with the essentials or build a complete system. Every piece should help the right people recognise and remember you.</p></div><div className="specialty-offerings-grid">{offerings.map((item, index) => <article key={item.title}><div><span>{String(index + 1).padStart(2, "0")} / 06</span><item.icon size={28} strokeWidth={1.5} aria-hidden="true" /></div><h3>{item.title}</h3><p>{item.copy}</p><Link className="offering-action" href="/contact?interest=Branding%20and%20design">Enquire about this <ArrowUpRight size={16} aria-hidden="true" /></Link></article>)}</div></div></section>
    <section className="specialty-close"><div className="container specialty-close-grid"><div><p className="eyebrow"><span className="eyebrow-line" /> MAKE IT YOURS</p><h2>Bring the idea.<br /><em>We will shape the identity.</em></h2></div><div><p>Tell us what you do, who you want to reach and where your brand needs to go next. We can build from a blank page or refresh what already exists.</p><Link className="button button-light" href="/contact?interest=Branding%20and%20design">Start a brand brief <ArrowUpRight size={18} aria-hidden="true" /></Link><Link className="specialty-related" href="/services/social-content">Explore content and video <ArrowRight size={16} aria-hidden="true" /></Link></div></div></section>
  </main><SiteFooter /></div>;
}
