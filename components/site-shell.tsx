"use client";
/* eslint-disable @next/next/no-html-link-for-pages -- Full page navigation starts at the top of each destination. */

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X as CloseIcon } from "lucide-react";
import { ChatWidget } from "@/components/contact-experience";
import { contact } from "@/lib/contact";

export const navLinks = [
  { name: "Services", href: "/services" },
  { name: "Our businesses", href: "/businesses" },
  { name: "Pricing", href: "/pricing" },
  { name: "About", href: "/about" },
  { name: "Reviews", href: "/reviews" },
];

const menuLinks = [
  { name: "Home", href: "/" },
  ...navLinks,
  { name: "Websites and apps", href: "/services/web-apps" },
  { name: "Branding and design", href: "/services/branding" },
  { name: "Social media and content", href: "/services/social-content" },
  { name: "AI automation and data", href: "/services/automation" },
  { name: "Contact", href: "/contact" },
];

function isActive(path: string, href: string) {
  if (href === "/businesses") return ["/businesses", "/easylink", "/easyholi", "/easyproperties"].includes(path);
  if (href === "/services") return path.startsWith("/services");
  return path === href;
}

/** Reveals `.rv` elements as they enter the viewport. Content stays visible if this never runs. */
export function Motion() {
  const path = usePathname();
  useEffect(() => {
    (window as unknown as { __edtMotion?: boolean }).__edtMotion = true;
    const items = Array.from(document.querySelectorAll<HTMLElement>(".rv:not(.in)"));
    if (!("IntersectionObserver" in window)) { items.forEach(item => item.classList.add("in")); return; }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    items.forEach(item => observer.observe(item));
    return () => observer.disconnect();
  }, [path]);
  return null;
}

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", close);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", close); document.body.style.overflow = ""; };
  }, [open, onClose]);
  if (!open) return null;
  return <nav id="mobile-navigation" className="mobile-menu" aria-label="Mobile navigation">
    {menuLinks.map(item => <a key={item.href} href={item.href} onClick={onClose}>{item.name}<ArrowUpRight size={20} aria-hidden="true" /></a>)}
    <a className="menu-action" href="/contact" onClick={onClose}>Start a project<ArrowUpRight size={20} aria-hidden="true" /></a>
  </nav>;
}

export function SiteHeader() {
  const path = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header" id="top"><div className="header-inner">
      <a className="brand" href="/" aria-label="EasyDesignTech home"><img src="/brand-icon.png" alt="" width={30} height={30} />EasyDesignTech</a>
      <nav className="desktop-nav" aria-label="Main navigation">{navLinks.map(item => <a key={item.href} className={isActive(path, item.href) ? "active" : undefined} aria-current={path === item.href ? "page" : undefined} href={item.href}>{item.name}</a>)}</nav>
      <a className="button header-cta" href="/contact">Start a project <ArrowUpRight size={17} aria-hidden="true" /></a>
      <button className="mobile-menu-button" type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-controls="mobile-navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(value => !value)}>{menuOpen ? <CloseIcon size={24} /> : <Menu size={24} />}</button>
    </div><MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} /></header>
    <Motion />
  </>;
}

type SocialKey = "facebook" | "instagram" | "snapchat" | "tiktok" | "x" | "linkedin" | "youtube";
const platforms: { key: SocialKey; label: string }[] = [
  { key: "facebook", label: "Facebook" },
  { key: "instagram", label: "Instagram" },
  { key: "tiktok", label: "TikTok" },
  { key: "linkedin", label: "LinkedIn" },
  { key: "x", label: "X" },
  { key: "youtube", label: "YouTube" },
  { key: "snapchat", label: "Snapchat" },
];

/** Shows only the profiles the owner has published from the studio. */
export function SocialLinks() {
  const [links, setLinks] = useState<Partial<Record<SocialKey, string>>>({ facebook: contact.facebook });
  useEffect(() => {
    let active = true;
    fetch("/api/social-links", { cache: "no-store" }).then(response => response.ok ? response.json() as Promise<{ links: Partial<Record<SocialKey, string>> }> : null).then(data => {
      if (active && data?.links) setLinks(current => ({ ...current, ...data.links }));
    }).catch(() => {});
    return () => { active = false; };
  }, []);
  return <div className="footer-social" aria-label="Social media">{platforms.filter(platform => links[platform.key]).map(platform => <a key={platform.key} href={links[platform.key]} target="_blank" rel="noopener noreferrer">{platform.label}</a>)}</div>;
}

type FooterProps = { invite?: [string, string]; action?: string; href?: string };

export function SiteFooter({ invite = ["Got an idea?", "Let’s build it."], action = "Start a project", href = "/contact" }: FooterProps) {
  return <><footer className="site-footer">
    <div className="footer-top">
      <div className="footer-invite rv"><h2>{invite[0]}<br />{invite[1]}</h2><a className="button button-dark" href={href} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{action} <ArrowUpRight size={18} aria-hidden="true" /></a></div>
      <div className="footer-contact rv" style={{ ["--d" as string]: 1 }}>
        <a href={contact.emailHref}>{contact.email}</a>
        <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp us</a>
        <a href="/contact">Project enquiry form</a>
        <span>Birmingham, England</span>
      </div>
    </div>
    <div className="footer-nav">
      <nav aria-label="Footer navigation">
        <a href="/">Home</a><a href="/services">Services</a><a href="/services/web-apps">Websites and apps</a><a href="/services/branding">Branding</a><a href="/services/social-content">Content</a><a href="/services/automation">AI automation</a><a href="/pricing">Pricing</a><a href="/businesses">Businesses</a><a href="https://www.geteasylink.app/" target="_blank" rel="noopener noreferrer">Easylink eSIM</a><a href="/easyholi">EasyHoli</a><a href="/easyproperties">EasyProperties</a><a href="/about">About</a><a href="/reviews">Reviews</a><a href="/contact">Contact</a>
      </nav>
      <SocialLinks />
      <span>© {new Date().getFullYear()} EasyDesignTech Ltd · Registered in England and Wales</span>
    </div>
    <p className="footer-name" aria-hidden="true">EasyDesignTech</p>
  </footer><ChatWidget /></>;
}
