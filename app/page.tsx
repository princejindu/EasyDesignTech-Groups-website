"use client";
/* eslint-disable @next/next/no-img-element -- Plain links and images keep full page loads and exact crops. */

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Motion, SiteFooter } from "@/components/site-shell";
import { contact } from "@/lib/contact";
import { packages, quoteHref } from "@/lib/packages";

const d = (n: number) => ({ "--d": n }) as CSSProperties;
const i = (n: number) => ({ "--i": n }) as CSSProperties;

const services = [
  { tab: "Websites and apps", title: "Websites and apps", href: "/services/web-apps", interest: "Web and apps", image: "/service-devices.webp", alt: "Laptop, tablet and phone screens in a blue studio scene",
    copy: "Business websites, online stores, customer portals and mobile journeys, designed around what your visitors need to do next.",
    items: ["Websites and online stores", "Web apps and customer portals", "Mobile app design"] },
  { tab: "Branding", title: "Branding and design", href: "/services/branding", interest: "Branding and design", image: "/service-branding.webp", alt: "Folded paper, ribbon and glass forms in warm brand colours",
    copy: "A brand people recognise at a glance: identity, guidelines, print and campaign creative that carry one confident story.",
    items: ["Identity systems and guidelines", "Graphic and print design", "Campaign creative"] },
  { tab: "Content and video", title: "Social media and content", href: "/services/social-content", interest: "Social media and content", image: "/service-content.webp", alt: "Layered video frames and colour on an editing timeline",
    copy: "Social content with a point of view, from a monthly plan and designed posts to short edits and AI assisted video.",
    items: ["Content plans and account care", "Short video, reels and motion", "AI assisted video"] },
  { tab: "AI automation", title: "AI automation and data", href: "/services/automation", interest: "AI automation and data", image: "/service-systems.webp", alt: "Glass blocks and green light forming a connected system",
    copy: "Practical AI workflows, connected tools and clear dashboards that take repetitive steps off your team’s desk.",
    items: ["AI assistants and workflows", "Connected systems", "Dashboards and reporting"] },
];

const work = [
  { name: "Websites", href: "/services/web-apps", kind: "Sites and online stores", fact: "From £749", image: "/service-devices.webp" },
  { name: "Web apps", href: "/services/web-apps", kind: "Portals and products", fact: "From £4,500", image: "/service-systems.webp" },
  { name: "Brands", href: "/services/branding", kind: "Identity and print", fact: "Quoted to scope", image: "/service-branding.webp" },
  { name: "Social", href: "/services/social-content", kind: "Monthly content", fact: "From £450 a month", image: "/service-content.webp" },
  { name: "AI video", href: "/services/social-content", kind: "Short edits", fact: "From £300", image: "/service-content.webp" },
  { name: "Automation", href: "/services/automation", kind: "AI workflows", fact: "From £900", image: "/service-systems.webp" },
  { name: "Easylink", href: "/easylink", kind: "Our travel eSIM", fact: "Live", image: "/esim-globe.webp" },
  { name: "EasyHoli", href: "/easyholi", kind: "Our travel planner", fact: "In development", image: "/travel.webp" },
  { name: "EasyProperties", href: "/easyproperties", kind: "Our property platform", fact: "In development", image: "/property.webp" },
];

const verbs = [
  { word: "Listen", image: "/service-content.webp", note: "We learn the business, the people it serves and the one result the work has to deliver." },
  { word: "Shape", image: "/service-branding.webp", note: "We map the journey, agree the scope and decide what has to exist first. You get a written quote before work starts." },
  { word: "Build", image: "/service-devices.webp", note: "We design and build it across every screen, and you see it working while it takes shape." },
  { word: "Grow", image: "/business-globe.webp", note: "We launch, measure what changes and keep improving it with you." },
];

function Hero() {
  return <header className="home-hero" id="top">
    <a className="skip-link" href="#main">Skip to content</a>
    <div className="tile name-band load" style={i(0)}>
      <h1><span className="monument">EasyDesign<span className="m-break" aria-hidden="true" />Tech</span></h1>
    </div>
    <nav className="hero-links" aria-label="Main navigation">
      <a className="tile load" style={i(1)} href="/services">Services <ArrowUpRight size={18} aria-hidden="true" /></a>
      <a className="tile load" style={i(2)} href="/businesses">Our businesses <ArrowUpRight size={18} aria-hidden="true" /></a>
      <a className="tile load" style={i(3)} href="/pricing">Pricing <ArrowUpRight size={18} aria-hidden="true" /></a>
      <a className="tile load" style={i(4)} href="/about">About <ArrowUpRight size={18} aria-hidden="true" /></a>
    </nav>
    <div className="hero-body">
      <div className="hero-left">
        <ul className="tile facts load" style={i(5)}>
          <li>A studio in Birmingham</li>
          <li>Websites and apps</li>
          <li>Brands and content</li>
          <li>AI workflows</li>
          <li>Three ventures of our own</li>
        </ul>
        <div className="tile load" style={i(6)}><img src="/service-branding.webp" alt="Folded paper and ribbon from a brand identity study" width={1586} height={992} /></div>
      </div>
      <div className="hero-centre load" style={i(5)}>
        <div className="tile hero-photo"><img src="/business-globe.webp" alt="A glowing globe crossed by bright lines of connection" width={1536} height={1024} fetchPriority="high" /></div>
        <div className="hero-statement">
          <p>Websites, apps, brands and AI, built in Birmingham.</p>
          <span>For businesses ready to be seen and chosen. And for our own ventures.</span>
        </div>
      </div>
      <div className="hero-rail">
        <a className="rail-tile rail-1 load" style={i(6)} href="/services/web-apps"><span>Websites</span><strong>from £749</strong></a>
        <a className="rail-tile rail-2 load" style={i(7)} href="/services/social-content"><span>Social content</span><strong>£450 / month</strong></a>
        <a className="rail-tile rail-3 load" style={i(8)} href="/services/automation"><span>AI workflows</span><strong>from £900</strong></a>
        <a className="rail-tile rail-4 load" style={i(9)} href="/businesses"><span>Our own ventures</span><strong>3 businesses</strong></a>
        <a className="rail-tile rail-action load" style={i(10)} href="/contact">Start a project <ArrowUpRight aria-hidden="true" /></a>
      </div>
    </div>
  </header>;
}

function Marquee() {
  const line = <><span>EasyDesignTech <i>·</i> Birmingham <i>·</i> Forward <i>·</i></span><span>Design <i>·</i> Build <i>·</i> Grow <i>·</i></span></>;
  return <div className="marquee" aria-label="EasyDesignTech, Birmingham. Forward."><div className="marquee-track" aria-hidden="true">{line}{line}</div></div>;
}

function Showcase() {
  const [active, setActive] = useState(0);
  const item = services[active];
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  function onKey(event: React.KeyboardEvent, index: number) {
    const keys: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    if (!(event.key in keys)) return;
    event.preventDefault();
    const next = (index + keys[event.key] + services.length) % services.length;
    setActive(next); tabs.current[next]?.focus();
  }
  return <section className="showcase" id="services" aria-label="What we do">
    <div className="showcase-plate rv">
      <div className="plate"><img key={item.image} src={item.image} alt={item.alt} width={1200} height={1200} loading="lazy" /><span className="plate-ring" aria-hidden="true" /></div>
    </div>
    <div className="showcase-copy">
      <div className="showcase-tabs rv" role="tablist" aria-label="Our services">
        {services.map((service, index) => <button key={service.tab} ref={node => { tabs.current[index] = node; }} type="button" role="tab" id={`svc-tab-${index}`} aria-controls="svc-panel" aria-selected={active === index} tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={event => onKey(event, index)}>{service.tab}</button>)}
      </div>
      <div className="showcase-body rv" style={d(1)} role="tabpanel" id="svc-panel" aria-labelledby={`svc-tab-${active}`} key={item.title}>
        <h2>{item.title}</h2>
        <p>{item.copy}</p>
        <ul>{item.items.map(value => <li key={value}>{value}</li>)}</ul>
      </div>
      <div className="showcase-actions rv" style={d(2)}>
        <a className="cell cell-ink" href={item.href}>Explore {item.tab.toLowerCase()} <ArrowUpRight size={20} aria-hidden="true" /></a>
        <a className="cell cell-tone" href={`/contact?quote=tailored&interest=${encodeURIComponent(item.interest)}`}>Get a quote <ArrowUpRight size={20} aria-hidden="true" /></a>
      </div>
    </div>
  </section>;
}

function Work() {
  const [current, setCurrent] = useState(0);
  const refs = useRef<(HTMLAnchorElement | null)[]>([]);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setCurrent(Number((entry.target as HTMLElement).dataset.index)); });
    }, { rootMargin: "-49% 0px -49% 0px", threshold: 0 });
    refs.current.forEach(node => node && observer.observe(node));
    return () => observer.disconnect();
  }, []);
  const item = work[current];
  return <section className="work" aria-labelledby="work-title">
    <div className="work-frame-holder" aria-hidden="true">
      <span className="work-fact left">{item.kind}</span>
      <div className="work-frame">{work.map((entry, index) => <img key={entry.name} className={index === current ? "on" : undefined} src={entry.image} alt="" width={900} height={900} loading="lazy" />)}</div>
      <span className="work-fact">{item.fact}</span>
    </div>
    <div className="work-list">
      <h2 id="work-title">What we make</h2>
      {work.map((entry, index) => <a key={entry.name} ref={node => { refs.current[index] = node; }} data-index={index} className={index === current ? "current" : undefined} href={entry.href} aria-label={`${entry.name}: ${entry.kind}, ${entry.fact}`}>{entry.name}</a>)}
    </div>
    <p className="work-mobile-facts" aria-hidden="true"><span>{item.kind}</span><span>{item.fact}</span></p>
  </section>;
}

function PriceSentence() {
  const [active, setActive] = useState(0);
  const item = packages[active];
  return <section className="price-sentence" aria-labelledby="price-title">
    <div className="price-picker rv" role="group" aria-label="Choose what you need">
      {packages.map((entry, index) => <button key={entry.title} type="button" aria-pressed={index === active} onClick={() => setActive(index)}>{entry.pick}</button>)}
    </div>
    <h2 id="price-title" className="rv" style={d(1)} aria-live="polite"><span>{item.line}</span><span>from <span className="price-block" key={item.price}>{item.price}</span>.</span></h2>
    <div className="price-foot rv" style={d(2)}>
      <p>{item.title}: {item.includes.join(", ").toLowerCase()}.<small>{item.note} Prices are guides in GBP; we confirm everything in a written quote.</small></p>
      <div className="price-actions">
        <a className="button" href={quoteHref(item)}>Request this quote <ArrowUpRight size={19} aria-hidden="true" /></a>
        <a className="text-link" href="/pricing">See every package <ArrowRight size={17} aria-hidden="true" /></a>
      </div>
    </div>
  </section>;
}

function Verbs() {
  return <section className="verbs" aria-label="How a project runs">
    {verbs.map(verb => <div className="verb-panel" key={verb.word}>
      <img src={verb.image} alt="" width={1536} height={1024} loading="lazy" />
      <div className="verb-word"><h2>{verb.word}</h2></div>
      <div className="verb-note"><p>{verb.note}</p></div>
    </div>)}
  </section>;
}

function CornerStatement() {
  return <section className="corner-statement" aria-labelledby="own-title">
    <h2 id="own-title" className="rv"><span>We run our own products.</span><span>We build yours the same way.</span></h2>
    <div className="corner-notes">
      <div className="corner-note rv">
        <p><strong>Easylink eSIM</strong> is our travel data business, with plans for 190+ destinations advertised on its site.</p>
        <p>Live today.</p>
        <a className="text-link" href="https://www.geteasylink.app/" target="_blank" rel="noopener noreferrer">Visit Easylink <ArrowUpRight size={16} aria-hidden="true" /></a>
      </div>
      <div className="corner-note rv" style={d(1)}>
        <p><strong>EasyHoli and EasyProperties</strong> are a travel planner and a property platform, both being built in our studio.</p>
        <p>In development.</p>
        <a className="text-link" href="/businesses">Meet the businesses <ArrowRight size={16} aria-hidden="true" /></a>
      </div>
    </div>
  </section>;
}

function ContactRows() {
  return <section className="contact-rows" aria-labelledby="talk-title">
    <div className="contact-row rv"><h2 id="talk-title">Talk to us.</h2></div>
    <a className="contact-row rv" href={contact.emailHref}>{contact.email}</a>
    <a className="contact-row rv" href={contact.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp the studio</a>
    <p className="contact-row rv">Birmingham, England</p>
    <a className="contact-row greet rv" href="/contact">Start a project <span className="round" aria-hidden="true"><ArrowRight /></span></a>
  </section>;
}

export default function Home() {
  return <div className="site-shell">
    <Hero />
    <Motion />
    <main id="main">
      <Marquee />
      <Showcase />
      <Work />
      <PriceSentence />
      <Verbs />
      <CornerStatement />
      <ContactRows />
    </main>
    <SiteFooter />
  </div>;
}
