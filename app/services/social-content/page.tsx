import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CalendarDays, Clapperboard, Film, Megaphone, MessageCircle, PenTool, Sparkles } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Social media and content | EasyDesignTech",
  description: "Social media strategy, content production, AI assisted video, short form edits, campaign visuals and account care by EasyDesignTech.",
};

const services = [
  { icon: CalendarDays, title: "Content direction", copy: "A plan for what to say, who it is for and how each piece fits the bigger story." },
  { icon: PenTool, title: "Design for social", copy: "Distinctive graphics, carousels and branded visuals made for the places your audience spends time." },
  { icon: Film, title: "AI assisted video", copy: "Creative concepts, AI supported visuals and carefully edited video assets shaped by human direction and review." },
  { icon: Clapperboard, title: "Short form and motion", copy: "Reels, animated explainers and edits that make the message clear in the moments you have to earn attention." },
  { icon: MessageCircle, title: "Account care", copy: "A consistent publishing rhythm and day to day support for the channels that matter to your business." },
  { icon: Megaphone, title: "Campaign creative", copy: "A connected visual idea carried across launches, promotions and paid social assets." },
];

export default function SocialContentPage() {
  return <div className="site-shell"><SiteHeader /><main className="specialty-page social-specialty">
    <section className="specialty-hero" aria-labelledby="social-title"><div className="container specialty-hero-grid"><div className="specialty-hero-copy"><div className="specialty-breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/services">Services</Link><span>/</span><span>Social and content</span></div><p className="eyebrow"><span className="eyebrow-line" /> CONTENT WITH A POINT OF VIEW</p><h1 id="social-title">Make them stop.<br /><em>Give them a reason to stay.</em></h1><p className="specialty-intro">Good content is more than a post on a schedule. We combine ideas, design, video and social care to help your business show up with a voice people remember.</p><div className="specialty-actions"><Link className="button button-light" href="/contact?interest=Social%20media%20and%20content">Plan your content <ArrowUpRight size={18} aria-hidden="true" /></Link><a href="#formats">Explore the formats <ArrowRight size={17} aria-hidden="true" /></a></div></div><div className="specialty-hero-image"><Image src="/service-content.webp" alt="Layered creative video frames and a colourful editing timeline" fill priority sizes="(max-width: 850px) 100vw, 50vw" /><span>STORY / MOTION / CONNECTION</span></div></div></section>
    <div className="specialty-value-strip"><div className="container"><span>IDEAS WITH DIRECTION</span><span>DESIGN THAT GETS NOTICED</span><span>CONTENT THAT FEELS LIKE YOU</span></div></div>

    <section className="specialty-offerings" id="formats" aria-labelledby="social-offerings-title"><div className="container"><div className="specialty-section-head"><div><p className="eyebrow dark-eyebrow"><span className="eyebrow-line" /> THE CONTENT MIX</p><h2 id="social-offerings-title">More ways to<br /><em>tell your story.</em></h2></div><p>Choose the support you need, from an individual launch asset to an ongoing creative presence across channels.</p></div><div className="specialty-offerings-grid">{services.map((item, index) => <article key={item.title}><div><span>{String(index + 1).padStart(2, "0")} / 06</span><item.icon size={28} strokeWidth={1.5} aria-hidden="true" /></div><h3>{item.title}</h3><p>{item.copy}</p></article>)}</div></div></section>

    <section className="social-video-feature"><div className="container social-video-grid"><div className="social-video-art"><Image src="/service-content.webp" alt="Illustrative scene of video frames, product imagery and motion graphics" fill sizes="(max-width: 850px) 100vw, 50vw" /><span><Sparkles size={25} aria-hidden="true" /> AI ASSISTED VIDEO</span></div><div className="social-video-copy"><p className="eyebrow"><span className="eyebrow-line" /> NEW CREATIVE POSSIBILITIES</p><h2>Video that<br /><em>moves the idea.</em></h2><p>AI can open a new visual direction. The work still needs a point of view. We shape the concept, guide the tools, edit the result and make sure the final piece is appropriate for your brand and message.</p><ul><li>Product and brand stories</li><li>Short social videos and reels</li><li>Motion led campaign assets</li></ul><Link href="/contact?interest=Social%20media%20and%20content">Ask about a video project <ArrowUpRight size={18} aria-hidden="true" /></Link></div></div></section>

    <section className="specialty-close"><div className="container specialty-close-grid"><div><p className="eyebrow"><span className="eyebrow-line" /> GIVE THE IDEA A VOICE</p><h2>Ready to show up<br /><em>differently?</em></h2></div><div><p>Tell us what you want your audience to see, feel or do. We will help find the right format and a creative direction that fits.</p><Link className="button button-light" href="/contact?interest=Social%20media%20and%20content">Start a content brief <ArrowUpRight size={18} aria-hidden="true" /></Link><Link className="specialty-related" href="/services/web-apps">Explore web and app work <ArrowRight size={16} aria-hidden="true" /></Link></div></div></section>
  </main><SiteFooter /></div>;
}
