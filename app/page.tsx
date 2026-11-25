"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, Braces, Compass, Layers3, Sparkles } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { EnquiryForm, FacebookContactLink } from "@/components/contact-experience";
import { contact } from "@/lib/contact";
import { SocialProof } from "@/components/social-proof";
import { CompactWeeklyCountdown } from "@/components/launch-countdown";

const services = [
  { number: "01", name: "Web and app development", detail: "Thoughtful websites, useful platforms and mobile experiences built to turn a bold idea into something people love to use.", features: ["Websites and commerce", "Web apps and portals", "Mobile product design"], icon: Braces, id: "web-apps", href: "/services/web-apps", image: "/stock-web.jpg" },
  { number: "02", name: "Branding and design", detail: "A brand people recognise at a glance, carried through identity, graphics, print and every important touchpoint.", features: ["Identity systems", "Graphic and print design", "Campaign creative"], icon: Layers3, id: "branding", href: "/services/branding", image: "/stock-branding.jpg" },
  { number: "03", name: "Social media and content", detail: "Content with a point of view, from social campaigns and account care to striking AI assisted video and motion.", features: ["Social strategy", "AI video and reels", "Content production"], icon: Sparkles, id: "social", href: "/services/social-content", image: "/stock-content.jpg" },
  { number: "04", name: "AI automation and data", detail: "Smarter workflows, clearer dashboards and better connected customer journeys that make everyday work easier.", features: ["AI workflows", "Dashboards", "Customer systems"], icon: Compass, id: "automation", href: "/services/automation", image: "/stock-automation.jpg" },
];

const ventures = [
  { name: "Easylink eSIM", category: "Connectivity", description: "Simple, instant mobile connectivity for life beyond borders.", href: "https://easylinksim.com/", image: "/stock-esim-travelers.jpg", theme: "esim", number: "01" },
  { name: "EasyLink Flex", category: "Travel", description: "Flights, cruises and holidays with AI itinerary planning in one place.", href: "/easylinkflex", image: "/stock-travel.jpg", theme: "holi", number: "02" },
  { name: "EasyProperties", category: "Property · Coming soon", description: "A clearer way to discover and navigate property opportunities.", href: "/easyproperties", image: "/stock-property.jpg", theme: "property", number: "03" },
  { name: "eChat", category: "AI assistant · Coming soon", description: "Thoughtful AI replies, chat support and conversation starters.", href: "/echat", image: "/stock-automation.jpg", theme: "chat", number: "04" },
];

export default function Home() {
  const track = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  useEffect(() => {
    const node = track.current;
    if (!node) return;
    const update = () => {
      setCanScrollLeft(node.scrollLeft > 2);
      setCanScrollRight(node.scrollLeft + node.clientWidth < node.scrollWidth - 2);
    };
    update();
    node.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => { node.removeEventListener("scroll", update); observer.disconnect(); };
  }, []);
  const move = (direction: number) => {
    if (!track.current) return;
    const card = track.current.querySelector<HTMLElement>(".venture-card");
    track.current.scrollBy({ left: direction * ((card?.offsetWidth || track.current.clientWidth) + 21), behavior: "smooth" });
  };

  return (
    <div className="site-shell">
      <SiteHeader />
      <main>
        <section className="hero home-hero" aria-labelledby="hero-title" onPointerMove={event => { if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return; const rect = event.currentTarget.getBoundingClientRect(); event.currentTarget.style.setProperty("--pointer-x", `${event.clientX - rect.left}px`); event.currentTarget.style.setProperty("--pointer-y", `${event.clientY - rect.top}px`); }}>
          <div className="hero-motion" aria-hidden="true"><Image src="/business-globe.webp" alt="" fill priority sizes="100vw" /><span className="hero-motion-wash" /><span className="hero-motion-light hero-motion-light-one" /><span className="hero-motion-light hero-motion-light-two" /><span className="hero-motion-ring hero-motion-ring-one" /><span className="hero-motion-ring hero-motion-ring-two" /><span className="hero-motion-sweep" /></div>
          <div className="hero-glow" aria-hidden="true" />
          <div className="hero-pointer-glow" aria-hidden="true" />
          <div className="container hero-stage">
            <div className="hero-topline"><span>EASYDESIGNTECH / CREATIVE TECHNOLOGY</span><span>DESIGN · DEVELOPMENT · AI</span></div>
            <div className="hero-copy">
              <p className="eyebrow"><span className="eyebrow-line" /> FOR THE BUSINESS YOU ARE BUILDING</p>
              <h1 id="hero-title"><span className="hero-title-line">Make your business</span><span className="hero-title-line">look <em>better.</em></span><span className="hero-title-line">Work <em>smarter.</em></span></h1>
              <div className="hero-lead-row">
                <p className="hero-intro">We design brands, build websites and apps, create content and connect AI tools. One studio to help your business make its next move.</p>
                <div className="hero-actions">
                  <Link className="button button-light" href="/contact">Start a project <ArrowUpRight size={18} aria-hidden="true" /></Link>
                  <Link className="text-link text-link-light" href="/services">See what we do <ArrowDownRight size={18} aria-hidden="true" /></Link>
                </div>
              </div>
            </div>
          </div>
          <div className="hero-business-band"><div className="container">
            <div className="hero-business-heading"><span>01 / THE GROUP</span><p>Explore the businesses we are building</p><Link href="/businesses">View all businesses <ArrowUpRight size={15} aria-hidden="true" /></Link></div>
            <nav className="hero-business-links" aria-label="EasyDesignTech businesses">
              <a href="https://easylinksim.com/" target="_blank" rel="noopener noreferrer"><span>01 / CONNECTIVITY</span><strong>Easylink eSIM</strong><ArrowUpRight size={20} aria-hidden="true" /></a>
              <Link href="/easylinkflex"><span>02 / TRAVEL</span><strong>EasyLink Flex</strong><ArrowUpRight size={20} aria-hidden="true" /></Link>
              <Link href="/easyproperties"><span>03 / PROPERTY · COMING SOON</span><strong>EasyProperties</strong><ArrowUpRight size={20} aria-hidden="true" /></Link>
              <Link href="/echat"><span>04 / AI · COMING SOON</span><strong>eChat</strong><ArrowUpRight size={20} aria-hidden="true" /></Link>
            </nav>
          </div></div>
        </section>

        <section className="services-section services-showcase" id="services" aria-labelledby="services-title">
          <div className="container">
            <div className="section-heading services-heading"><div><p className="eyebrow dark-eyebrow"><span className="eyebrow-line" /> WHAT WE DO</p><h2 id="services-title">Clear ideas.<br /><em>Useful results.</em></h2></div><p>Choose the specialist help you need, from your first brand impression to a working digital product and smarter daily systems.</p></div>
            <div className="service-grid">
              {services.map((service) => <Link className={`service-card service-card-${service.id}`} href={service.href} key={service.number} aria-label={`Explore ${service.name}`}>
                <div className="service-card-art" aria-hidden="true"><Image src={service.image} alt="" fill sizes="(max-width: 760px) 100vw, 50vw" /></div>
                <div className="service-card-top"><span>{service.number} / SERVICE</span><service.icon size={27} strokeWidth={1.5} aria-hidden="true" /></div>
                <div className="service-card-copy"><h3>{service.name}</h3><p>{service.detail}</p><ul>{service.features.map(feature => <li key={feature}>{feature}</li>)}</ul><span className="service-card-link"><span>Explore this service</span><span className="circle-arrow"><ArrowUpRight size={20} aria-hidden="true" /></span></span></div>
              </Link>)}
            </div>
            <div className="section-foot"><span>FROM FIRST IDEA TO THE FINISHED EXPERIENCE</span><div className="section-foot-actions"><Link href="/pricing" className="text-link">View pricing <ArrowUpRight size={18} aria-hidden="true" /></Link><Link href="/services" className="text-link">Explore all services <ArrowUpRight size={18} aria-hidden="true" /></Link></div></div>
          </div>
        </section>

        <section className="ventures-section" id="ventures" aria-labelledby="ventures-title">
          <div className="container">
            <div className="section-heading ventures-heading"><div><p className="eyebrow"><span className="eyebrow-line" /> OUR BUSINESSES</p><h2 id="ventures-title">Different worlds.<br /><em>One way forward.</em></h2></div><div className="carousel-controls"><button type="button" onClick={() => move(-1)} disabled={!canScrollLeft} aria-label="Scroll businesses left"><ArrowLeft size={20} /></button><button type="button" onClick={() => move(1)} disabled={!canScrollRight} aria-label="Scroll businesses right"><ArrowRight size={20} /></button></div></div>
            <div className="venture-track" ref={track}>
              {ventures.map((venture) => <a key={venture.name} href={venture.href} className={`venture-card ${venture.theme}`} aria-label={`Explore ${venture.name}`} onPointerMove={event => { if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return; const rect = event.currentTarget.getBoundingClientRect(); event.currentTarget.style.setProperty("--tilt-x", `${((event.clientY - rect.top) / rect.height - .5) * -3}deg`); event.currentTarget.style.setProperty("--tilt-y", `${((event.clientX - rect.left) / rect.width - .5) * 3}deg`); }} onPointerLeave={event => { event.currentTarget.style.setProperty("--tilt-x", "0deg"); event.currentTarget.style.setProperty("--tilt-y", "0deg"); }}>
                <img src={venture.image} alt={venture.theme === "esim" ? "Travellers looking at a phone while exploring a city" : venture.theme === "property" ? "Bright modern apartment interior" : venture.theme === "chat" ? "Colleagues reviewing work at a laptop" : "Aerial view of a blue coastline"} />
                <div className="venture-overlay"><div className="venture-meta"><span>{venture.number} / {venture.category}</span><span className="venture-icon"><ArrowUpRight size={20} aria-hidden="true" /></span></div><div><h3>{venture.name}</h3><p>{venture.description}</p>{(venture.theme === "chat" || venture.theme === "property") && <CompactWeeklyCountdown product={venture.name} />}<span className="venture-action">Explore business <ArrowRight size={17} aria-hidden="true" /></span></div></div>
              </a>)}
            </div>
            <p className="venture-hint">Browse the businesses <span aria-hidden="true">→</span></p>
          </div>
        </section>

        <SocialProof />

        <section className="closing-section" id="about"><div className="container closing-layout"><p className="eyebrow dark-eyebrow"><span className="eyebrow-line" /> THE BIGGER PICTURE</p><div><h2>Connected by curiosity.<br /><em>Driven by purpose.</em></h2><p>From a stronger brand to a simpler journey, every part of EasyDesignTech begins with the same question: how can this work better for people?</p><Link className="button button-dark" href="/about">Discover EasyDesignTech <ArrowUpRight size={18} aria-hidden="true" /></Link></div></div></section>
        <section className="contact-section" id="contact" aria-labelledby="contact-title"><div className="container contact-layout"><div className="contact-copy"><p className="eyebrow"><span className="eyebrow-line" /> START A CONVERSATION</p><h2 id="contact-title">Tell us what<br /><em>you are imagining.</em></h2><p>Whether it is a new digital product, a sharper identity or a better way of working, share the idea and we will take it from there.</p><div className="contact-direct"><a href={contact.emailHref}>Email us <span>{contact.email}</span><ArrowUpRight size={18} aria-hidden="true" /></a><a href={contact.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp <span>Start a conversation</span><ArrowUpRight size={18} aria-hidden="true" /></a><FacebookContactLink /></div></div><div className="contact-form-wrap"><div className="form-title"><span>PROJECT ENQUIRY</span><span>01 / 01</span></div><EnquiryForm /></div></div></section>
      </main>
      <SiteFooter />
    </div>
  );
}
