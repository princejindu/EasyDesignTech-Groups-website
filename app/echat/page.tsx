import Link from "next/link";
import { ArrowRight, ArrowUpRight, MessageCircle, MessageSquareText, Sparkles } from "lucide-react";
import { LaunchCountdown } from "@/components/launch-countdown";
import { SiteFooter, SiteHeader } from "@/components/site-shell";

export const metadata = { title: "eChat | EasyDesignTech", description: "eChat is an AI reply, text and chat assistant in development. See the launch countdown." };

export default function EChatPage() {
  return <div className="site-shell"><SiteHeader /><main className="echat-page">
    <section className="echat-hero"><div className="container echat-hero-grid"><div><p className="eyebrow"><span className="eyebrow-line" /> EASYDESIGNTECH / COMING SOON</p><h1>Say it better.<br /><em>Keep talking.</em></h1><p>eChat is an AI companion in development for reply suggestions, text conversations and helpful chat starters. Make the next message easier to write.</p><div className="detail-actions"><Link className="button button-light" href="/contact?interest=eChat">Ask about eChat <ArrowUpRight size={18} aria-hidden="true" /></Link><Link className="detail-inline-link" href="#what-is-planned">What is planned <ArrowRight size={18} aria-hidden="true" /></Link></div></div><div className="echat-visual" aria-hidden="true"><div className="echat-orbit" /><div className="echat-sample echat-sample-one"><span>START THE CONVERSATION</span><strong>How should I open?</strong><MessageSquareText size={24} /></div><div className="echat-sample echat-sample-two"><Sparkles size={21} /><strong>Here is a thoughtful way to reply.</strong><span>eChat / AI ASSISTED</span></div><div className="echat-visual-mark">e<span>Chat</span></div></div></div></section>
    <section className="echat-countdown-section"><div className="container"><LaunchCountdown /></div></section>
    <section className="echat-planned" id="what-is-planned"><div className="container"><p className="eyebrow dark-eyebrow"><span className="eyebrow-line" /> WHAT IS PLANNED</p><h2>Help for the next<br /><em>conversation.</em></h2><div className="echat-feature-grid"><article><MessageSquareText size={30} /><span>01 / REPLIES</span><h3>Find the right words</h3><p>Get a starting point for a reply and make it your own before sending.</p></article><article><MessageCircle size={30} /><span>02 / CHAT</span><h3>Keep the flow going</h3><p>Explore helpful prompts for a conversation that has stalled.</p></article><article><Sparkles size={30} /><span>03 / STARTERS</span><h3>Start with confidence</h3><p>Turn a blank message into an approachable first line.</p></article></div><p className="echat-planned-note">eChat is in development. These are planned features, not a live product offer.</p></div></section>
    <section className="crosslink-section"><div className="container"><p>EXPLORE THE FAMILY</p><Link href="/businesses">Meet the other EasyDesignTech businesses <ArrowUpRight size={28} aria-hidden="true" /></Link></div></section>
  </main><SiteFooter /></div>;
}
