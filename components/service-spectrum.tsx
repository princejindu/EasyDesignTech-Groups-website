"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

const slides = [
  {
    number: "01", label: "DIGITAL PRODUCTS", short: "Web and apps", title: "Web and app development",
    copy: "Thoughtful websites, useful products and smooth digital journeys built around what people need to do.",
    image: "/service-devices.webp", bg: "#0d2339", panel: "#143d5a", accent: "#d7fb66", ghost: "BUILD",
    href: "/services/web-apps", action: "Explore web and app work",
  },
  {
    number: "02", label: "IDENTITY AND DESIGN", short: "Branding", title: "Branding and design",
    copy: "An unmistakable visual language, from the first impression to every detail that follows.",
    image: "/service-branding.webp", bg: "#48253b", panel: "#713d53", accent: "#ffd2b5", ghost: "SHAPE",
    href: "/services/branding", action: "Explore brand work",
  },
  {
    number: "03", label: "CONTENT AND CONNECTION", short: "Social and video", title: "Social media and content",
    copy: "Distinctive stories, campaign visuals and AI assisted video guided by a human creative point of view.",
    image: "/service-content.webp", bg: "#29213e", panel: "#533b62", accent: "#ffc5a2", ghost: "MOVE",
    href: "/services/social-content", action: "Explore content work",
  },
  {
    number: "04", label: "SYSTEMS AND INSIGHT", short: "AI and data", title: "AI automation and data",
    copy: "Clearer information and connected workflows that give your team more room to do good work.",
    image: "/service-systems.webp", bg: "#103b40", panel: "#1d6364", accent: "#cbfaac", ghost: "CONNECT",
    href: "/services/automation", action: "Explore AI workflows",
  },
] as const;

const DURATION = 650;

export function ServiceSpectrum() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const unlockTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    slides.forEach(({ image }) => { const preload = new window.Image(); preload.src = image; });
    return () => { if (unlockTimer.current) clearTimeout(unlockTimer.current); };
  }, []);

  function goTo(nextIndex: number) {
    if (isAnimating || nextIndex === activeIndex) return;
    setIsAnimating(true);
    setActiveIndex((nextIndex + slides.length) % slides.length);
    unlockTimer.current = setTimeout(() => setIsAnimating(false), DURATION);
  }

  const active = slides[activeIndex];
  const theme = {
    backgroundColor: active.bg,
    "--spectrum-accent": active.accent,
    "--spectrum-panel": active.panel,
  } as CSSProperties;

  return <section className="service-spectrum" style={theme} aria-labelledby="services-hub-title">
    <div className="spectrum-grain" aria-hidden="true" />
    <div className="spectrum-ghost" key={active.ghost} aria-hidden="true">{active.ghost}</div>
    <div className="container spectrum-layout">
      <div className="spectrum-copy">
        <p className="eyebrow"><span className="eyebrow-line" /> EASYDESIGNTECH / THE STUDIO</p>
        <h1 id="services-hub-title">Make it look good.<br /><em>Make it work.</em></h1>
        <p className="spectrum-intro">Design, technology and storytelling meet here. Choose where your next idea needs us most.</p>
        <div className="spectrum-current" key={active.number} aria-live="polite" aria-atomic="true">
          <span className="spectrum-index">{active.number} / 04 <span>{active.label}</span></span>
          <h2>{active.title}</h2>
          <p>{active.copy}</p>
          <Link className="spectrum-action" href={active.href}>{active.action}<ArrowUpRight size={19} aria-hidden="true" /></Link>
        </div>
        <div className="spectrum-controls" aria-label="Service carousel controls">
          <button type="button" onClick={() => goTo(activeIndex - 1)} aria-label="Previous service"><ArrowLeft size={23} aria-hidden="true" /></button>
          <button type="button" onClick={() => goTo(activeIndex + 1)} aria-label="Next service"><ArrowRight size={23} aria-hidden="true" /></button>
          <span>{active.number}<i />04</span>
        </div>
      </div>
      <div className="spectrum-stage" aria-hidden="true">
        <div className="spectrum-orbit spectrum-orbit-one" />
        <div className="spectrum-orbit spectrum-orbit-two" />
        {slides.map((slide, index) => {
          const distance = (index - activeIndex + slides.length) % slides.length;
          const role = ["center", "right", "back", "left"][distance];
          return <div className={`spectrum-panel spectrum-panel-${role}`} key={slide.number} style={{ backgroundColor: slide.panel }}>
            <Image src={slide.image} alt="" fill priority={index === 0} sizes="(max-width: 850px) 80vw, 40vw" />
            <div className="spectrum-panel-wash" />
            <span className="spectrum-panel-top">ED / {slide.number}</span>
            <span className="spectrum-panel-bottom">{slide.label}</span>
          </div>;
        })}
        <span className="spectrum-stage-caption">CREATIVE THINKING / PRACTICAL BUILDING</span>
      </div>
    </div>
    <div className="container spectrum-bottom">
      <span>CHOOSE YOUR FOCUS</span>
      <div className="spectrum-picker" aria-label="Choose a service">
        {slides.map((slide, index) => <button type="button" key={slide.number} onClick={() => goTo(index)} aria-pressed={activeIndex === index}>
          <span>{slide.number}</span>{slide.short}
        </button>)}
      </div>
      <a className="spectrum-scroll" href="#chapters-title">All services <ArrowDown size={17} aria-hidden="true" /></a>
    </div>
  </section>;
}
