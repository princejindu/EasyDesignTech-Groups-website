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

const heroScenes = [
  { id: "web", label: "Web & apps", title: "Digital experiences", description: "Websites and apps built to look sharp, feel simple and work hard.", image: "/stock-web.jpg", href: "/services/web-apps", icon: Braces },
  { id: "brand", label: "Brand & design", title: "Distinctive brands", description: "Identity and design that make your business recognisable.", image: "/stock-branding.jpg", href: "/services/branding", icon: Layers3 },
  { id: "content", label: "Content & motion", title: "Stories that move", description: "Social content, campaigns and motion made with purpose.", image: "/stock-video.jpg", href: "/services/social-content", icon: Sparkles },
  { id: "ai", label: "AI & automation", title: "Smarter systems", description: "Useful AI workflows and data tools for the way you work.", image: "/stock-automation.jpg", href: "/services/automation", icon: Compass },
];

const ventures = [
  { name: "Easylink eSIM", category: "Connectivity", description: "Simple, instant mobile connectivity for life beyond borders.", href: "https://easylinksim.com/", image: "/stock-esim-travelers.jpg", theme: "esim", number: "01" },
  { name: "EasyLink Flex", category: "Travel", description: "Flights, cruises and holidays with AI itinerary planning in one place.", href: "/easylinkflex", image: "/stock-travel.jpg", theme: "holi", number: "02" },
  { name: "EasyProperties", category: "Property · Coming soon", description: "A clearer way to discover and navigate property opportunities.", href: "/easyproperties", image: "/stock-property.jpg", theme: "property", number: "03" },
  { name: "eChat", category: "AI assistant · Coming soon", description: "Thoughtful AI replies, chat support and conversation starters.", href: "/echat", image: "/stock-automation.jpg", theme: "chat", number: "04" },
];

export default function Home() {
  const track = useRef<HTMLDivElement>(null);
  const [activeHero, setActiveHero] = useState(2);
  const ActiveHeroIcon = heroScenes[activeHero].icon;
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
        <section className={`hero home-hero immersive-hero immersive-hero-${heroScenes[activeHero].id}`} aria-labelledby="hero-title" onPointerMove={event => {
          if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
          const rect = event.currentTarget.getBoundingClientRect();
          event.currentTarget.style.setProperty("--hero-pointer-x", `${event.clientX - rect.left}px`);
          event.currentTarget.style.setProperty("--hero-pointer-y", `${event.clientY - rect.top}px`);
        }}>
          <div className="immersive-scene" key={heroScenes[activeHero].id} aria-hidden="true"><Image src={heroScenes[activeHero].image} alt="" fill priority={activeHero === 2} sizes="100vw" /></div>
          <div className="immersive-atmosphere" aria-hidden="true"><span className="immersive-orbit" /><span className="immersive-pointer" /></div>
          <div className="container immersive-stage">
            <div className="immersive-topline"><span>EASYDESIGNTECH / CREATIVE TECHNOLOGY</span><span>DESIGN · DEVELOPMENT · AI</span></div>
            <div className="immersive-main">
              <div className="immersive-copy">
                <p className="immersive-kicker"><span /> A STUDIO FOR WHAT COMES NEXT</p>
                <h1 id="hero-title"><span>MAKE THE</span><span><em>NEXT</em> MOVE.</span></h1>
                <p className="immersive-intro">We build brands, websites, apps, content and smart systems that help your business stand out and move forward.</p>
                <div className="immersive-actions"><Link className="immersive-primary" href="/contact">Start a project <ArrowUpRight size={19} aria-hidden="true" /></Link><Link className="immersive-secondary" href="/services">Explore services <ArrowDownRight size={19} aria-hidden="true" /></Link></div>
              </div>
              <div className="immersive-feature" aria-live="polite">
                <Link key={heroScenes[activeHero].id} href={heroScenes[activeHero].href} className="immersive-feature-panel">
                  <span className="immersive-feature-top"><span>IN FOCUS / {String(activeHero + 1).padStart(2, "0")}</span><ActiveHeroIcon size={23} strokeWidth={1.4} aria-hidden="true" /></span>
                  <strong>{heroScenes[activeHero].title}</strong>
                  <p>{heroScenes[activeHero].description}</p>
                  <span className="immersive-feature-link">Explore this service <ArrowUpRight size={17} aria-hidden="true" /></span>
                </Link>
              </div>
            </div>
            <div className="immersive-switcher"><div className="immersive-switcher-label"><span>EXPLORE OUR SERVICES</span><small>SELECT A FOCUS</small></div><div className="immersive-options" role="group" aria-label="Change the featured service">{heroScenes.map((scene, index) => <button type="button" key={scene.id} className={activeHero === index ? "is-active" : ""} aria-pressed={activeHero === index} onClick={() => setActiveHero(index)}><span>{String(index + 1).padStart(2, "0")}</span><strong>{scene.label}</strong><ArrowUpRight size={16} aria-hidden="true" /></button>)}</div></div>
          </div>
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
