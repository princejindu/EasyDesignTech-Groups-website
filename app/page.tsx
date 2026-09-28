"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, Braces, Compass, Layers3, MoveUpRight, Sparkles } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { EnquiryForm, FacebookContactLink } from "@/components/contact-experience";
import { contact } from "@/lib/contact";
import { SocialProof } from "@/components/social-proof";

const services = [
  { number: "01", name: "Web and app development", detail: "Thoughtful websites, useful platforms and mobile experiences built to turn a bold idea into something people love to use.", features: ["Websites and commerce", "Web apps and portals", "Mobile product design"], icon: Braces, id: "web-apps", href: "/services/web-apps", image: "/service-devices.webp" },
  { number: "02", name: "Branding and design", detail: "A brand people recognise at a glance, carried through identity, graphics, print and every important touchpoint.", features: ["Identity systems", "Graphic and print design", "Campaign creative"], icon: Layers3, id: "branding", href: "/services/branding", image: "/service-branding.webp" },
  { number: "03", name: "Social media and content", detail: "Content with a point of view, from social campaigns and account care to striking AI assisted video and motion.", features: ["Social strategy", "AI video and reels", "Content production"], icon: Sparkles, id: "social", href: "/services/social-content", image: "/service-content.webp" },
  { number: "04", name: "AI automation and data", detail: "Smarter workflows, clearer dashboards and better connected customer journeys that make everyday work easier.", features: ["AI workflows", "Dashboards", "Customer systems"], icon: Compass, id: "automation", href: "/services/automation", image: "/service-systems.webp" },
];

const ventures = [
  { name: "Easylink eSIM", category: "Connectivity", description: "Simple, instant mobile connectivity for life beyond borders.", href: "https://www.geteasylink.app/", image: "/esim-globe.webp", theme: "esim", number: "01" },
  { name: "EasyHoli", category: "Travel", description: "Travel planning that brings the whole journey together.", href: "/easyholi", image: "/travel.webp", theme: "holi", number: "02" },
  { name: "EasyProperties", category: "Property", description: "A clearer way to discover and navigate property opportunities.", href: "/easyproperties", image: "/property.webp", theme: "property", number: "03" },
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
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-motion" aria-hidden="true"><Image src="/business-globe.webp" alt="" fill priority sizes="100vw" /><span className="hero-motion-wash" /><span className="hero-motion-light hero-motion-light-one" /><span className="hero-motion-light hero-motion-light-two" /><span className="hero-motion-ring hero-motion-ring-one" /><span className="hero-motion-ring hero-motion-ring-two" /><span className="hero-motion-sweep" /></div>
          <div className="hero-glow" aria-hidden="true" />
          <div className="container hero-layout">
            <div className="hero-copy">
              <p className="eyebrow"><span className="eyebrow-line" /> DESIGN / TECHNOLOGY / GROWTH</p>
              <h1 id="hero-title">Make your<br /><em>next move</em><br />matter.</h1>
              <p className="hero-intro">Websites and apps, standout brands, content and AI workflows for businesses ready to be seen and chosen.</p>
              <div className="hero-actions">
                <Link className="button button-light" href="/contact">Start your project <ArrowUpRight size={18} aria-hidden="true" /></Link>
                <Link className="text-link text-link-light" href="/services">Explore services <ArrowDownRight size={18} aria-hidden="true" /></Link>
              </div>
            </div>
            <div className="hero-directory" aria-label="Choose a business">
              <div className="directory-top"><span>CHOOSE YOUR NEXT STEP</span><span>01 / 04</span></div>
              <Link href="/services" className="directory-row"><span className="directory-index">01</span><span><strong>EasyDesignTech</strong><small>Creative and digital services</small></span><MoveUpRight size={22} aria-hidden="true" /></Link>
              <a href="https://www.geteasylink.app/" className="directory-row"><span className="directory-index">02</span><span><strong>Easylink eSIM</strong><small>Connectivity</small></span><MoveUpRight size={22} aria-hidden="true" /></a>
              <Link href="/easyholi" className="directory-row"><span className="directory-index">03</span><span><strong>EasyHoli</strong><small>Travel</small></span><MoveUpRight size={22} aria-hidden="true" /></Link>
              <Link href="/easyproperties" className="directory-row"><span className="directory-index">04</span><span><strong>EasyProperties</strong><small>Property</small></span><MoveUpRight size={22} aria-hidden="true" /></Link>
              <div className="directory-bottom"><Link href="/pricing">SEE STARTING PRICES <ArrowUpRight size={14} /></Link><span className="directory-asterisk">✳</span></div>
            </div>
          </div>
          <div className="hero-bottom container"><span>DESIGN. TECHNOLOGY. POSSIBILITY.</span><span>SCROLL TO EXPLORE <span aria-hidden="true">↓</span></span></div>
        </section>

        <section className="services-section services-showcase" id="services" aria-labelledby="services-title">
          <div className="container">
            <div className="section-heading services-heading"><div><p className="eyebrow dark-eyebrow"><span className="eyebrow-line" /> WHAT WE DO</p><h2 id="services-title">Ideas deserve<br /><em>good execution.</em></h2></div><p>From the first sketch to the final detail, we bring design, technology and storytelling together to make the whole experience work harder.</p></div>
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
                <img src={venture.image} alt={venture.theme === "esim" ? "Abstract glass globe with illuminated connections" : venture.theme === "property" ? "Concept image of a contemporary property interior" : "Concept image of a coastal travel destination"} />
                <div className="venture-overlay"><div className="venture-meta"><span>{venture.number} / {venture.category}</span><span className="venture-icon"><ArrowUpRight size={20} aria-hidden="true" /></span></div><div><h3>{venture.name}</h3><p>{venture.description}</p><span className="venture-action">Explore business <ArrowRight size={17} aria-hidden="true" /></span></div></div>
              </a>)}
            </div>
            <p className="venture-hint">Browse the businesses <span aria-hidden="true">→</span></p>
          </div>
        </section>

        <SocialProof />

        <section className="closing-section" id="about"><div className="container closing-layout"><p className="eyebrow dark-eyebrow"><span className="eyebrow-line" /> THE BIGGER PICTURE</p><div><h2>Connected by curiosity.<br /><em>Driven by purpose.</em></h2><p>From a stronger brand to a simpler journey, every part of EasyDesignTech begins with the same question: how can this work better for people?</p><Link className="button button-dark" href="/about">Discover EasyDesignTech <ArrowUpRight size={18} aria-hidden="true" /></Link></div></div></section>
        <section className="contact-section" id="contact" aria-labelledby="contact-title"><div className="container contact-layout"><div className="contact-copy"><p className="eyebrow"><span className="eyebrow-line" /> START A CONVERSATION</p><h2 id="contact-title">Tell us what<br /><em>you are imagining.</em></h2><p>Whether it is a new digital product, a sharper identity or a better way of working, share the idea and we will take it from there.</p><div className="contact-direct"><a href={`mailto:${contact.email}`}>Email us <span>{contact.email}</span><ArrowUpRight size={18} aria-hidden="true" /></a><a href={contact.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp <span>Start a conversation</span><ArrowUpRight size={18} aria-hidden="true" /></a><FacebookContactLink /></div></div><div className="contact-form-wrap"><div className="form-title"><span>PROJECT ENQUIRY</span><span>01 / 01</span></div><EnquiryForm /></div></div></section>
      </main>
      <SiteFooter />
    </div>
  );
}
