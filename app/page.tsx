"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, Braces, Compass, Layers3, Pause, Play, Sparkles } from "lucide-react";
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
  { id: "move", label: "Make the move", title: "Make the next move.", lines: [{ before: "MAKE THE" }, { accent: "NEXT", after: " MOVE." }], image: "/stock-video.jpg" },
  { id: "create", label: "Think it", title: "Think it. We bring it to life.", lines: [{ before: "THINK IT." }, { before: "WE BRING IT" }, { accent: "TO LIFE." }], image: "/stock-branding.jpg" },
  { id: "imagine", label: "Imagine it", title: "Your imagination. Made real.", lines: [{ before: "YOUR" }, { accent: "IMAGINATION." }, { before: "MADE REAL." }], image: "/stock-web.jpg" },
  { id: "visible", label: "Be seen", title: "Your business needs to be seen.", lines: [{ before: "YOUR BUSINESS" }, { accent: "NEEDS TO BE" }, { before: "SEEN." }], image: "/stock-automation.jpg" },
];

const designConcepts = [
  { image: "/concept-identity.webp", title: "Identity with presence", category: "BRAND IDENTITY", description: "A bold visual system carried across tactile print." },
  { image: "/concept-hospitality.webp", title: "Made to be remembered", category: "HOSPITALITY", description: "Colour, packaging and experience in one direction." },
  { image: "/concept-care-web.webp", title: "Care, clearly expressed", category: "WEB EXPERIENCE", description: "A warmer digital experience across every screen." },
  { image: "/concept-social.webp", title: "Stop the scroll", category: "SOCIAL CREATIVE", description: "An energetic campaign with a consistent point of view." },
  { image: "/concept-travel.webp", title: "A journey in your hand", category: "PRODUCT DESIGN", description: "A travel app concept that makes exploration feel effortless." },
  { image: "/concept-ai.webp", title: "Clarity from complexity", category: "AI EXPERIENCE", description: "A smarter workspace with a clear visual rhythm." },
];

const ventures = [
  { name: "Easylink eSIM", category: "Connectivity", description: "Simple, instant mobile connectivity for life beyond borders.", href: "https://easylinksim.com/", image: "/stock-esim-travelers.jpg", theme: "esim", number: "01" },
  { name: "EasyLink Flex", category: "Travel", description: "Flights, cruises and holidays with AI itinerary planning in one place.", href: "/easylinkflex", image: "/stock-travel.jpg", theme: "holi", number: "02" },
  { name: "EasyProperties", category: "Property · Coming soon", description: "A clearer way to discover and navigate property opportunities.", href: "/easyproperties", image: "/stock-property.jpg", theme: "property", number: "03" },
  { name: "eChat", category: "AI assistant · Coming soon", description: "Thoughtful AI replies, chat support and conversation starters.", href: "/echat", image: "/stock-automation.jpg", theme: "chat", number: "04" },
];

export default function Home() {
  const track = useRef<HTMLDivElement>(null);
  const [activeHero, setActiveHero] = useState(0);
  const [activeConcept, setActiveConcept] = useState(0);
  const [motionPaused, setMotionPaused] = useState(false);
  const [heroInteracting, setHeroInteracting] = useState(false);
  const [galleryInteracting, setGalleryInteracting] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [heroCycle, setHeroCycle] = useState(0);
  const [galleryCycle, setGalleryCycle] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (motionPaused || reducedMotion || heroInteracting) return;
    const timer = window.setInterval(() => setActiveHero(index => (index + 1) % heroScenes.length), 6400);
    return () => window.clearInterval(timer);
  }, [motionPaused, reducedMotion, heroInteracting, heroCycle]);
  useEffect(() => {
    if (motionPaused || reducedMotion || galleryInteracting) return;
    const timer = window.setInterval(() => setActiveConcept(index => (index + 1) % designConcepts.length), 3200);
    return () => window.clearInterval(timer);
  }, [motionPaused, reducedMotion, galleryInteracting, galleryCycle]);
  const selectHero = (index: number) => { setActiveHero(index); setHeroCycle(value => value + 1); };
  const selectConcept = (index: number) => { setActiveConcept((index + designConcepts.length) % designConcepts.length); setGalleryCycle(value => value + 1); };
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
        <section className={`hero home-hero immersive-hero immersive-hero-${heroScenes[activeHero].id}${motionPaused ? " is-paused" : ""}${heroInteracting ? " is-interacting" : ""}`} aria-labelledby="hero-title" onPointerMove={event => {
          if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
          const rect = event.currentTarget.getBoundingClientRect();
          event.currentTarget.style.setProperty("--hero-pointer-x", `${event.clientX - rect.left}px`);
          event.currentTarget.style.setProperty("--hero-pointer-y", `${event.clientY - rect.top}px`);
        }}>
          {heroScenes.map((scene, index) => <div className={`immersive-scene immersive-scene-${scene.id}${activeHero === index ? " is-active" : ""}`} key={scene.id} aria-hidden="true"><Image src={scene.image} alt="" fill priority={index === 0} sizes="100vw" /></div>)}
          <div className="immersive-atmosphere" aria-hidden="true"><span className="immersive-orbit" /><span className="immersive-pointer" /></div>
          <div className="container immersive-stage">
            <div className="immersive-topline"><span>EASYDESIGNTECH / CREATIVE TECHNOLOGY</span><div><span>DESIGN · DEVELOPMENT · AI</span><button type="button" className="immersive-motion-toggle" onClick={() => setMotionPaused(value => !value)} disabled={reducedMotion} aria-label={reducedMotion ? "Motion is off in your device settings" : motionPaused ? "Play hero and showcase motion" : "Pause hero and showcase motion"}>{motionPaused || reducedMotion ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}<span>{reducedMotion ? "MOTION OFF" : motionPaused ? "PLAY MOTION" : "PAUSE MOTION"}</span></button></div></div>
            <div className="immersive-main">
              <div className="immersive-copy">
                <p className="immersive-kicker"><span /> A STUDIO FOR WHAT COMES NEXT</p>
                <h1 id="hero-title" key={heroScenes[activeHero].id} aria-label={heroScenes[activeHero].title}>{heroScenes[activeHero].lines.map((line, index) => <span key={index}>{line.before}{line.accent && <em>{line.accent}</em>}{"after" in line && line.after}</span>)}</h1>
                <p className="immersive-intro">We build brands, websites, apps, content and smart systems that help your business stand out and move forward.</p>
                <div className="immersive-actions"><Link className="immersive-primary" href="/contact">Start a project <ArrowUpRight size={19} aria-hidden="true" /></Link><Link className="immersive-secondary" href="/services">Explore services <ArrowDownRight size={19} aria-hidden="true" /></Link></div>
              </div>
              <div className="immersive-feature" onPointerEnter={() => setGalleryInteracting(true)} onPointerLeave={() => setGalleryInteracting(false)} onFocusCapture={() => setGalleryInteracting(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setGalleryInteracting(false); }}>
                <div className="showcase-panel" role="region" aria-roledescription="carousel" aria-label="Illustrative design concepts">
                  <div className="showcase-top"><span>THE IDEA ROOM</span><span>{String(activeConcept + 1).padStart(2, "0")} / {String(designConcepts.length).padStart(2, "0")}</span></div>
                  <div className="showcase-image" key={designConcepts[activeConcept].image}><Image src={designConcepts[activeConcept].image} alt={`${designConcepts[activeConcept].category.toLowerCase()} visual concept`} fill sizes="(max-width: 850px) 100vw, 420px" /></div>
                  <div className="showcase-caption"><div><span>{designConcepts[activeConcept].category} / CONCEPT STUDY</span><strong>{designConcepts[activeConcept].title}</strong><p>{designConcepts[activeConcept].description}</p></div><div className="showcase-arrows"><button type="button" aria-label="Previous concept" onClick={() => selectConcept(activeConcept - 1)}><ArrowLeft size={17} aria-hidden="true" /></button><button type="button" aria-label="Next concept" onClick={() => selectConcept(activeConcept + 1)}><ArrowRight size={17} aria-hidden="true" /></button></div></div>
                  <div className="showcase-thumbnails" role="group" aria-label="Choose a design concept">{designConcepts.map((concept, index) => <button type="button" key={concept.image} className={activeConcept === index ? "is-active" : ""} aria-label={`Show concept ${index + 1}: ${concept.title}`} aria-pressed={activeConcept === index} onClick={() => selectConcept(index)}><Image src={concept.image} alt="" fill sizes="64px" /></button>)}</div>
                  <span className="showcase-disclaimer">Illustrative concepts created for this site</span>
                </div>
              </div>
            </div>
            <div className="immersive-switcher" onPointerEnter={() => setHeroInteracting(true)} onPointerLeave={() => setHeroInteracting(false)} onFocusCapture={() => setHeroInteracting(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setHeroInteracting(false); }}><div className="immersive-switcher-label"><span>THE STORY IN MOTION</span><small>CHOOSE A CHAPTER</small></div><div className="immersive-options" role="group" aria-label="Choose a hero message">{heroScenes.map((scene, index) => <button type="button" key={scene.id} className={activeHero === index ? "is-active" : ""} aria-pressed={activeHero === index} onClick={() => selectHero(index)}><span>{String(index + 1).padStart(2, "0")}</span><strong>{scene.label}</strong><ArrowUpRight size={16} aria-hidden="true" /></button>)}</div></div>
          </div>
        </section>

        <div className={`idea-marquee${motionPaused ? " is-paused" : ""}`} role="note" aria-label="Think it. We create it."><div className="idea-marquee-track" aria-hidden="true">{[0, 1].map(group => <div className="idea-marquee-group" key={group}>{Array.from({ length: 5 }, (_, index) => <span key={index}>THINK IT. <strong>WE CREATE IT.</strong><i /></span>)}</div>)}</div></div>

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
