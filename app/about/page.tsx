import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Braces, Compass, Layers3 } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-shell";

export const metadata: Metadata = { title: "About | EasyDesignTech", description: "The thinking behind EasyDesignTech and its growing family of businesses." };

export default function AboutPage() {
  return <div className="site-shell"><SiteHeader /><main>
    <section className="page-hero about-hero"><div className="container page-hero-layout"><div><p className="eyebrow"><span className="eyebrow-line" /> ABOUT EASYDESIGNTECH</p><h1>Curiosity meets<br /><em>useful action.</em></h1></div><p>EasyDesignTech brings design, technology and practical thinking together to build experiences people can understand and use.</p></div><span className="about-orbit" aria-hidden="true" /></section>
    <section className="about-story"><div className="container about-story-grid"><p className="eyebrow dark-eyebrow"><span className="eyebrow-line" /> OUR POINT OF VIEW</p><div><h2>Make it clear.<br />Make it matter.</h2><p>We work across websites and apps, visual identity, content and automation. Each starts with a real need and a straightforward question: how could this feel easier for the people using it?</p><p>That same approach connects the wider family. Easylink eSIM focuses on connectivity, EasyHoli on travel, and EasyProperties on discovery. Each has its own purpose and visual world.</p><Link className="text-link" href="/services">Explore our services <ArrowUpRight size={18} aria-hidden="true" /></Link></div></div></section>
    <section className="about-method"><div className="container"><p className="eyebrow"><span className="eyebrow-line" /> WHAT CONNECTS THE WORK</p><div className="about-method-grid"><article><Braces size={33} strokeWidth={1.3} aria-hidden="true" /><span>01</span><h3>Build with purpose.</h3><p>Shape a useful experience around the people it serves.</p></article><article><Layers3 size={33} strokeWidth={1.3} aria-hidden="true" /><span>02</span><h3>Design with character.</h3><p>Give each idea a distinctive, consistent identity.</p></article><article><Compass size={33} strokeWidth={1.3} aria-hidden="true" /><span>03</span><h3>Keep moving forward.</h3><p>Make space to improve as needs and opportunities change.</p></article></div></div></section>
    <section className="about-next"><div className="container"><div><p className="eyebrow dark-eyebrow"><span className="eyebrow-line" /> EXPLORE THE FAMILY</p><h2>One vision.<br /><em>Many possibilities.</em></h2></div><Link href="/businesses" className="button button-dark">Meet our businesses <ArrowRight size={18} aria-hidden="true" /></Link></div></section>
  </main><SiteFooter /></div>;
}
