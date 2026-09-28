"use client";
/* eslint-disable @next/next/no-html-link-for-pages -- Full page navigation starts at the top of each destination. */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, Ghost, Menu, Music2, X as CloseIcon } from "lucide-react";
import { ChatWidget } from "@/components/contact-experience";
import { contact } from "@/lib/contact";

const sections = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Pricing", href: "/pricing" },
  { name: "Our businesses", href: "/businesses" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const mobileLinks = [
  ...sections.slice(0, 4),
  { name: "Easylink eSIM", href: "https://www.geteasylink.app/" },
  { name: "EasyHoli", href: "/easyholi" },
  { name: "EasyProperties", href: "/easyproperties" },
  ...sections.slice(4),
  { name: "Start a project", href: "/contact" },
];

function Brand({ footer = false }: { footer?: boolean }) {
  return <Link className={`brand brand-logo${footer ? " brand-footer" : ""}`} href="/" aria-label="EasyDesignTech home"><img className="brand-symbol" src="/brand-icon.png" alt="" /><span className="brand-wordmark"><span className="brand-wordmark-line">EasyDesign<b>Tech</b></span><small>CREATIVE STUDIO</small></span></Link>;
}

export function SiteHeader() {
  const path = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    if (!menuOpen) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [menuOpen]);
  return <header className="site-header" id="top"><div className="container header-inner">
    <Brand />
    <nav className="desktop-nav" aria-label="Main navigation">{sections.map(item => <a key={item.href} className={path === item.href || (item.href === "/businesses" && ["/easylink", "/easyholi", "/easyproperties"].includes(path)) || (item.href === "/services" && path.startsWith("/services/")) ? "active" : undefined} href={item.href}>{item.name}</a>)}</nav>
    <a className="header-cta" href="/contact">Start a project <ArrowUpRight size={16} aria-hidden="true" /></a>
    <button className="mobile-menu-button" type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-controls="mobile-navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(value => !value)}>{menuOpen ? <CloseIcon size={24} /> : <Menu size={24} />}</button>
  </div>{menuOpen && <nav id="mobile-navigation" className="mobile-menu" aria-label="Mobile navigation">{mobileLinks.map((item, index) => <a key={`${item.href}-${index}`} href={item.href} onClick={() => setMenuOpen(false)}>{item.name}<ArrowUpRight size={17} aria-hidden="true" /></a>)}</nav>}</header>;
}

type SocialKey = "facebook" | "instagram" | "snapchat" | "tiktok" | "x" | "linkedin" | "youtube";
const platforms = [
  { key: "facebook", label: "Facebook" },
  { key: "instagram", label: "Instagram" },
  { key: "snapchat", label: "Snapchat" },
  { key: "tiktok", label: "TikTok" },
  { key: "x", label: "X" },
  { key: "linkedin", label: "LinkedIn" },
  { key: "youtube", label: "YouTube" },
] as const;

function SocialIcon({ platform }: { platform: SocialKey }) {
  if (platform === "snapchat") return <Ghost size={17} strokeWidth={1.8} aria-hidden="true" />;
  if (platform === "tiktok") return <Music2 size={17} strokeWidth={1.8} aria-hidden="true" />;
  if (platform === "instagram") return <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><rect x="2" y="2" width="14" height="14" rx="4"/><circle cx="9" cy="9" r="3"/><circle cx="13.3" cy="4.8" r=".8" fill="currentColor" stroke="none"/></svg>;
  return <strong className="social-glyph" aria-hidden="true">{{ facebook: "f", x: "X", linkedin: "in", youtube: "▶" }[platform]}</strong>;
}

export function SocialLinks() {
  const [links, setLinks] = useState<Partial<Record<SocialKey, string>>>({ facebook: contact.facebook });
  useEffect(() => {
    let active = true;
    fetch("/api/social-links", { cache: "no-store" }).then(response => response.ok ? response.json() as Promise<{ links: Partial<Record<SocialKey, string>> }> : null).then(data => {
      if (active && data?.links) setLinks(data.links);
    }).catch(() => {});
    return () => { active = false; };
  }, []);
  return <div className="social-links" aria-label="Social media">{platforms.map(platform => {
    const icon = <SocialIcon platform={platform.key} />;
    const url = links[platform.key];
    return url ? <a key={platform.key} href={url} target="_blank" rel="noopener noreferrer" aria-label={`EasyDesignTech on ${platform.label}`} title={platform.label}>{icon}<span>{platform.label}</span></a> : <span key={platform.key} className="social-soon" aria-label={`${platform.label} profile coming soon`} title={`${platform.label} link coming soon`}>{icon}<span>{platform.label}</span><small>soon</small></span>;
  })}</div>;
}

export function SiteFooter() {
  return <><footer className="site-footer"><div className="container"><div className="footer-main"><div><Brand footer /><p>Design, build and grow what comes next.</p><a className="footer-email" href={`mailto:${contact.email}`}>{contact.email}</a><SocialLinks /></div><div className="footer-links"><div><span>EXPLORE</span><a href="/">Home</a><a href="/services">Our services</a><a href="/pricing">Pricing guide</a><a href="/businesses">Our businesses</a><a href="/about">About EasyDesignTech</a><a href="/reviews">Client voices</a><a href="/contact">Get in touch</a></div><div><span>SERVICES AND BUSINESSES</span><a href="/services/web-apps">Web and apps</a><a href="/services/branding">Branding and design</a><a href="/services/social-content">Social and content</a><a href="/services/automation">AI automation</a><a href="https://www.geteasylink.app/" target="_blank" rel="noopener noreferrer">Easylink eSIM <ArrowUpRight size={13} aria-hidden="true" /></a><Link href="/easyholi">EasyHoli</Link><Link href="/easyproperties">EasyProperties</Link></div></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} EasyDesignTech Ltd</span><a href="/">Back to home <ArrowUpRight size={15} aria-hidden="true" /></a></div></div></footer><ChatWidget /></>;
}
