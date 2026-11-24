import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, ArrowUpRight, Compass, Globe2, MapPin, MessageCircle, Plane,
  Search, Smartphone, Sparkles, UsersRound, WalletCards,
} from "lucide-react";
import { BusinessJourney } from "@/components/business-journey";
import { SiteHeader, SiteFooter } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Our businesses | EasyDesignTech",
  description: "Meet Easylink eSIM, EasyLink Flex, EasyProperties and eChat, the businesses growing within EasyDesignTech.",
};

const easyLink = "https://easylinksim.com/";

const steps = [
  { number: "01", icon: MapPin, title: "Find your destination", copy: "Start with where you are going. Explore destination options on Easylink and see what is currently available for your route." },
  { number: "02", icon: Globe2, title: "Choose a data plan", copy: "Compare the available data allowances and validity periods, then select the option that fits your journey." },
  { number: "03", icon: Smartphone, title: "Set up digitally", copy: "Follow the activation instructions on a compatible device and keep your travel essentials close when you arrive." },
];

export default function BusinessesPage() {
  return <div className="site-shell"><SiteHeader /><main className="businesses-page">
    <section className="business-hub-hero" aria-labelledby="businesses-title"><div className="container business-hub-hero-inner">
      <div className="business-hub-title"><p className="eyebrow"><span className="eyebrow-line" /> THE EASYDESIGNTECH FAMILY</p><h1 id="businesses-title">Built for the way<br /><em>life moves.</em></h1></div>
      <div className="business-hub-intro"><span className="business-hub-asterisk" aria-hidden="true">✳</span><p>Connectivity, travel, property and conversations. Four focused ideas shaped to make everyday experiences feel easier.</p><span>EXPLORE THE FAMILY <ArrowRight size={18} aria-hidden="true" /></span></div>
    </div><div className="container business-hub-directory" aria-label="Choose a business">
      <a href={easyLink} target="_blank" rel="noopener noreferrer"><span>01 / CONNECTIVITY</span><strong>Easylink <em>eSIM</em></strong><span className="hub-directory-arrow"><ArrowUpRight size={21} aria-hidden="true" /></span></a>
      <Link href="/easylinkflex"><span>02 / TRAVEL</span><strong>EasyLink Flex</strong><span className="hub-directory-arrow"><ArrowUpRight size={21} aria-hidden="true" /></span></Link>
      <Link href="/easyproperties"><span>03 / PROPERTY</span><strong>EasyProperties</strong><span className="hub-directory-arrow"><ArrowUpRight size={21} aria-hidden="true" /></span></Link>
      <Link href="/echat"><span>04 / AI ASSISTANT · COMING SOON</span><strong>eChat</strong><span className="hub-directory-arrow"><ArrowUpRight size={21} aria-hidden="true" /></span></Link>
    </div></section>

    <section className="business-esim" aria-labelledby="esim-title"><div className="container">
      <div className="business-esim-topline"><span>01 / EASYLINK ESIM</span><span>THE WORLD IS CALLING <Globe2 size={16} aria-hidden="true" /></span></div>
      <div className="business-esim-grid"><div className="business-esim-copy"><p className="eyebrow"><span className="eyebrow-line" /> EASY TRAVEL. EASY CONNECT.</p><h2 id="esim-title">Go further.<br /><em>Stay closer.</em></h2><p className="business-esim-lead">The best part of arriving somewhere new is being free to explore it. Easylink eSIM brings travel data into a simpler, digital journey, so the important things feel within reach wherever your plans take you.</p><div className="business-esim-actions"><a className="button button-light" href={easyLink} target="_blank" rel="noopener noreferrer">Explore Easylink plans <ArrowUpRight size={19} aria-hidden="true" /></a><Link className="business-esim-detail" href="/easylink">Meet the idea <ArrowRight size={17} aria-hidden="true" /></Link></div><div className="business-esim-proof"><div><strong>200<span>+</span></strong><span>countries advertised<br />on Easylink</span></div><div><Smartphone size={27} strokeWidth={1.3} aria-hidden="true" /><span>Digital eSIM<br />setup</span></div></div></div>
        <div className="business-esim-visual"><Image src="/stock-esim-travelers.jpg" alt="Stock photograph of two travellers exploring a city with a phone" fill priority sizes="(max-width: 850px) 100vw, 52vw" /><div className="business-esim-orbit orbit-one" aria-hidden="true" /><div className="business-esim-orbit orbit-two" aria-hidden="true" /><div className="business-esim-visual-top"><span>EXPLORE BEYOND BORDERS</span><Compass size={25} strokeWidth={1.4} aria-hidden="true" /></div><div className="business-esim-floating"><span className="business-esim-floating-icon"><Globe2 size={25} strokeWidth={1.5} aria-hidden="true" /></span><div><small>THE EASYLINK WAY</small><strong>One journey.<br />More possibility.</strong></div><ArrowUpRight size={20} aria-hidden="true" /></div><span className="business-esim-visual-caption">TRAVEL PHOTOGRAPHY / ILLUSTRATIVE</span></div></div>
      <div className="business-esim-ribbon"><span>BUILT FOR MOVEMENT</span><strong>From the first search to the first step off the plane.</strong><span>CONNECT WITH CONFIDENCE <ArrowUpRight size={18} aria-hidden="true" /></span></div>
    </div></section>

    <section className="business-steps" aria-labelledby="steps-title"><div className="container"><div className="business-steps-heading"><div><p className="eyebrow dark-eyebrow"><span className="eyebrow-line" /> THE SIMPLE IDEA</p><h2 id="steps-title">A little less setup.<br /><em>A lot more going.</em></h2></div><p>Explore the options before you set off. Easylink offers digital travel data so you can plan for your destination and get back to what matters: the trip itself.</p></div><div className="business-steps-grid">{steps.map(step => <article key={step.number}><div className="business-step-top"><span>{step.number} / 03</span><step.icon size={31} strokeWidth={1.35} aria-hidden="true" /></div><div><h3>{step.title}</h3><p>{step.copy}</p></div></article>)}</div><p className="business-steps-note">Plan availability, coverage, pricing, validity and activation requirements vary. Check current details and device compatibility on Easylink before you buy.</p></div></section>

    <BusinessJourney />

    <section className="business-holi" aria-labelledby="holi-title"><div className="container business-story-grid"><div className="business-story-art"><Image src="/stock-travel.jpg" alt="Aerial photograph of the Adriatic coastline" fill sizes="(max-width: 850px) 100vw, 50vw" /><div className="business-story-art-label"><span>PLAN THE WHOLE JOURNEY</span><Plane size={24} strokeWidth={1.5} aria-hidden="true" /></div><div className="business-holi-postcard"><span>TRAVEL IN ONE PLACE</span><strong>Find the way<br />to get away.</strong><span>✳&nbsp; EASYLINK FLEX</span></div></div><div className="business-story-copy"><div className="business-story-index"><span>02 / TRAVEL</span><span>IN DEVELOPMENT</span></div><p className="eyebrow dark-eyebrow"><span className="eyebrow-line" /> THE EASYLINK FLEX VISION</p><h2 id="holi-title">More journey.<br /><em>Less juggling.</em></h2><p className="business-story-lead">EasyLink Flex is a travel booking idea for flights, cruises and holidays, with AI itinerary planning to bring the details of a trip together.</p><div className="business-holi-points"><div><Search size={22} strokeWidth={1.5} aria-hidden="true" /><span>Find flights and holidays</span></div><div><UsersRound size={22} strokeWidth={1.5} aria-hidden="true" /><span>Explore cruise options</span></div><div><WalletCards size={22} strokeWidth={1.5} aria-hidden="true" /><span>Shape an itinerary with AI</span></div></div><p className="business-story-future">The booking experience is in development. Easylink eSIM can help keep travellers connected on the journey.</p><Link className="business-story-link" href="/easylinkflex">Explore EasyLink Flex <ArrowUpRight size={20} aria-hidden="true" /></Link></div></div></section>

    <section className="business-property" aria-labelledby="property-title"><div className="container business-property-grid"><div className="business-property-copy"><div className="business-story-index"><span>03 / PROPERTY</span><span>IN DEVELOPMENT</span></div><p className="eyebrow dark-eyebrow"><span className="eyebrow-line" /> THE EASYPROPERTIES VISION</p><h2 id="property-title">A place to see<br /><em>what comes next.</em></h2><p>Every place has a story. EasyProperties is an idea for discovering property with clearer information, a calmer experience and more confidence at every stage of the search.</p><div className="business-property-phrases"><span>01&nbsp; Discover</span><span>02&nbsp; Understand</span><span>03&nbsp; Decide</span></div><Link className="business-story-link" href="/easyproperties">Explore EasyProperties <ArrowUpRight size={20} aria-hidden="true" /></Link></div><div className="business-property-art"><Image src="/stock-property.jpg" alt="Stock photograph of a bright apartment interior" fill sizes="(max-width: 850px) 100vw, 50vw" /><div className="business-property-frame" aria-hidden="true" /><div className="business-property-art-note"><Sparkles size={25} strokeWidth={1.4} aria-hidden="true" /><span>GOOD PLACES<br />START WITH CLARITY</span></div></div></div></section>

    <section className="business-echat" aria-labelledby="echat-business-title"><div className="container business-echat-grid"><div className="business-echat-icon"><MessageCircle size={52} strokeWidth={1.2} aria-hidden="true" /><span>eChat / COMING SOON</span></div><div><p className="eyebrow"><span className="eyebrow-line" /> 04 / CONVERSATIONS</p><h2 id="echat-business-title">A better way<br /><em>to find the words.</em></h2><p>eChat is being shaped as an AI companion for reply suggestions, conversation starters and chat assistance. See the launch countdown and what is planned.</p><Link className="button button-light" href="/echat">Explore eChat <ArrowUpRight size={18} aria-hidden="true" /></Link></div></div></section>

    <section className="business-hub-close"><div className="container business-close-grid"><div><p className="eyebrow"><span className="eyebrow-line" /> THE STUDIO BEHIND THE IDEAS</p><h2>Different ambitions.<br /><em>One creative engine.</em></h2></div><div><p>EasyDesignTech brings design, technology and thoughtful execution together. The result is a family of experiences made to move people forward.</p><Link className="button button-light" href="/services">Explore our services <ArrowUpRight size={18} aria-hidden="true" /></Link><Link className="business-close-contact" href="/contact">Start a conversation <ArrowRight size={17} aria-hidden="true" /></Link></div></div></section>
  </main><SiteFooter /></div>;
}
