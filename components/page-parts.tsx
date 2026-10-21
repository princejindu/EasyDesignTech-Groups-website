/* eslint-disable @next/next/no-img-element -- Plain links and images keep full page loads and exact crops. */
import type { CSSProperties, ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";

type LinkSpec = { label: string; href: string; external?: boolean };
const ext = (link: LinkSpec) => link.external || link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {};
export const delay = (n: number) => ({ "--d": n }) as CSSProperties;

/** Title tile over a photograph and a rail with the sentence and the action. */
export function PageHero({ crumbs, title, intro, action, secondary, image, media }: {
  crumbs?: LinkSpec[]; title: ReactNode; intro: string; action: LinkSpec; secondary?: LinkSpec;
  image?: { src: string; alt: string; width?: number; height?: number }; media?: ReactNode;
}) {
  return <section className="page-hero" aria-labelledby="page-title">
    <div className="page-title load" style={{ ["--i" as string]: 0 }}>
      {crumbs && <nav className="crumbs" aria-label="Breadcrumb">{crumbs.map((crumb, index) => index < crumbs.length - 1 ? <span key={crumb.href}><a href={crumb.href}>{crumb.label}</a> /</span> : <span key={crumb.href} aria-current="page">{crumb.label}</span>)}</nav>}
      <h1 id="page-title">{title}</h1>
    </div>
    <div className="page-hero-body">
      <div className="page-hero-photo load" style={{ ["--i" as string]: 1 }}>
        {media ?? (image && <img src={image.src} alt={image.alt} width={image.width ?? 1536} height={image.height ?? 1024} fetchPriority="high" />)}
      </div>
      <div className="page-hero-rail">
        <div className="page-hero-intro load" style={{ ["--i" as string]: 2 }}>
          <p>{intro}</p>
          {secondary && <a className="text-link" href={secondary.href} {...ext(secondary)}>{secondary.label} <ArrowRight size={17} aria-hidden="true" /></a>}
        </div>
        <a className="button load" style={{ ["--i" as string]: 3 }} href={action.href} {...ext(action)}>{action.label} <ArrowUpRight size={20} aria-hidden="true" /></a>
      </div>
    </div>
  </section>;
}

export function BandHead({ title, text, id }: { title: ReactNode; text?: ReactNode; id?: string }) {
  return <div className="band-head"><h2 id={id} className="rv">{title}</h2>{text && <p className="rv" style={delay(1)}>{text}</p>}</div>;
}

export function Rows({ items }: { items: { title: string; copy: string; link?: LinkSpec }[] }) {
  return <div className="rows">{items.map((item, index) => {
    const inner = <><h3>{item.title}</h3><p>{item.copy}</p>{item.link && <span className="row-link">{item.link.label} <ArrowUpRight size={17} aria-hidden="true" /></span>}</>;
    return item.link ? <a key={item.title} className="row rv" style={delay(index % 3)} href={item.link.href} {...ext(item.link)}>{inner}</a> : <div key={item.title} className="row rv" style={delay(index % 3)}>{inner}</div>;
  })}</div>;
}

export function Split({ image, title, children, flip, tone = "band-dark", id }: {
  image: { src: string; alt: string; width?: number; height?: number }; title: ReactNode; children: ReactNode; flip?: boolean; tone?: string; id?: string;
}) {
  return <section className={`split ${tone}${flip ? " flip" : ""}`} aria-labelledby={id}>
    <div className="split-media rv"><img src={image.src} alt={image.alt} width={image.width ?? 1536} height={image.height ?? 1024} loading="lazy" /></div>
    <div className="split-copy"><h2 id={id} className="rv">{title}</h2><div className="rv" style={{ ...delay(1), display: "grid", gap: 24 }}>{children}</div></div>
  </section>;
}

export function Steps({ items }: { items: { title: string; copy: string }[] }) {
  return <ol className="steps" style={{ ["--n" as string]: items.length }}>{items.map((item, index) => <li key={item.title} className="step rv" style={delay(index)}><h3>{item.title}</h3><p>{item.copy}</p></li>)}</ol>;
}

export function Faq({ items }: { items: { q: string; a: ReactNode }[] }) {
  return <div className="faq">{items.map((item, index) => <details key={item.q} className="rv" style={delay(index % 3)}><summary>{item.q}<span aria-hidden="true">+</span></summary><p>{item.a}</p></details>)}</div>;
}

/** A small product screen drawn in HTML, used where a photograph of the product does not exist. */
export function PhoneScene({ caption }: { caption: string }) {
  return <div className="ui-scene" data-ui>
    <div className="ui-phone" aria-hidden="true">
      <div className="ui-bar"><span>9:41</span><span>5G</span></div>
      <h4>Where are you going?</h4>
      <div className="ui-search">Search 190+ destinations</div>
      <div className="ui-plan sel"><b>Spain</b><span>Local data plan</span><em>Select</em></div>
      <div className="ui-plan"><b>Europe</b><span>Regional data plan</span><em>Select</em></div>
      <div className="ui-plan"><b>Global</b><span>Multi-country plan</span><em>Select</em></div>
      <div className="ui-buy">Continue</div>
    </div>
    <span className="ui-caption">{caption}</span>
  </div>;
}

export const studioServices = [
  { slug: "web-apps", name: "Websites and apps", line: "Sites, stores, portals and web products.", href: "/services/web-apps", image: "/service-devices.webp", alt: "Laptop, tablet and phone screens in a blue studio scene" },
  { slug: "branding", name: "Branding and design", line: "Identity, guidelines, print and campaigns.", href: "/services/branding", image: "/service-branding.webp", alt: "Folded paper, ribbon and glass forms in warm brand colours" },
  { slug: "social-content", name: "Social and content", line: "Monthly content, short video and AI edits.", href: "/services/social-content", image: "/service-content.webp", alt: "Layered video frames and colour on an editing timeline" },
  { slug: "automation", name: "AI automation", line: "Workflows, assistants and dashboards.", href: "/services/automation", image: "/service-systems.webp", alt: "Glass blocks and green light forming a connected system" },
];

/** Picture plates that link onward: other services, or the ventures. */
export function Plates({ title, text, items, id = "plates-title" }: { title: string; text?: string; id?: string; items: { name: string; line: string; href: string; image: string; alt: string; status?: string }[] }) {
  return <section className="band band-deep plates-band" aria-labelledby={id}>
    <BandHead id={id} title={title} text={text} />
    <div className="venture-plates" style={{ ["--cols" as string]: items.length }}>{items.map((item, index) => <a key={item.href + item.name} className="venture-plate rv" style={delay(index)} href={item.href}>
      <img src={item.image} alt={item.alt} width={1200} height={900} loading="lazy" />
      {item.status && <span className="status">{item.status}</span>}
      <div className="plate-copy"><h3>{item.name}</h3><p>{item.line}</p><span>Explore <ArrowUpRight size={17} aria-hidden="true" /></span></div>
    </a>)}</div>
  </section>;
}
