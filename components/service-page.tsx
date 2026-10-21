 
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
import { BandHead, Faq, PageHero, Plates, Rows, Split, Steps, studioServices } from "@/components/page-parts";
import { packages, quoteHref } from "@/lib/packages";

export type ServiceConfig = {
  crumb: string; slug: string; interest: string;
  title: ReactNode; intro: string; action: string;
  image?: { src: string; alt: string }; media?: ReactNode;
  offersTitle: string; offersText: string; offers: { title: string; copy: string }[];
  feature: { title: ReactNode; image: { src: string; alt: string }; copy: string; points: string[]; link: { label: string; href: string } };
  steps: { title: string; copy: string }[];
  packages: string[];
  faq: { q: string; a: string }[];
  invite: [string, string]; inviteAction: string;
  related: { label: string; href: string };
};

export function ServicePage(config: ServiceConfig) {
  const contactHref = `/contact?interest=${encodeURIComponent(config.interest)}`;
  const quoteFor = `/contact?quote=tailored&interest=${encodeURIComponent(config.interest)}`;
  const linked = packages.filter(item => config.packages.includes(item.title));
  return <div className="site-shell"><SiteHeader /><main id="main">
    <PageHero
      crumbs={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: config.crumb, href: `/services/${config.slug}` }]}
      title={config.title}
      intro={config.intro}
      action={{ label: config.action, href: contactHref }}
      secondary={{ label: "See what we offer", href: "#offers" }}
      image={config.image}
      media={config.media}
    />

    <section className="band band-paper" id="offers" aria-labelledby="offers-title">
      <BandHead id="offers-title" title={config.offersTitle} text={config.offersText} />
      <Rows items={config.offers.map(item => ({ ...item, link: { label: "Enquire", href: contactHref } }))} />
    </section>

    <Split id="feature-title" image={config.feature.image} title={config.feature.title}>
      <p>{config.feature.copy}</p>
      <ul>{config.feature.points.map(point => <li key={point}>{point}</li>)}</ul>
      <div className="actions"><a className="button" href={config.feature.link.href}>{config.feature.link.label} <ArrowUpRight size={18} aria-hidden="true" /></a></div>
    </Split>

    <section className="band band-blue" aria-labelledby="steps-title">
      <BandHead id="steps-title" title="How the work takes shape" text="We start with what the work needs to achieve, then give every decision a reason to be there." />
      <Steps items={config.steps} />
    </section>

    {linked.length > 0 && <section className="band band-paper" aria-labelledby="prices-title">
      <BandHead id="prices-title" title="Where prices start" text="Indicative starting points in GBP. We confirm the exact scope and price in writing before any work begins." />
      <div className="price-list">{linked.map(item => <article key={item.title} className="price-row rv">
        <div className="price-name"><h3>{item.title}</h3></div>
        <p className="price-fig">{item.price}<small>{item.period}</small></p>
        <div className="price-detail"><strong>{item.kind}.</strong> {item.summary}<ul>{item.includes.map(value => <li key={value}>{value}</li>)}</ul><em>{item.note}</em></div>
        <a className="cell cell-ink" href={quoteHref(item)}>Request a quote <ArrowUpRight size={18} aria-hidden="true" /></a>
      </article>)}</div>
      <p className="fine-print">Something bigger or different? <a className="text-link" href={quoteFor}>Ask for a tailored quote</a></p>
    </section>}

    <section className="band band-dark" aria-labelledby="faq-title">
      <BandHead id="faq-title" title="Questions we hear often" text={<>Not answered here? <a className="text-link" href="/contact">Ask us directly</a> or use the chat.</>} />
      <Faq items={config.faq} />
      <p className="rv" style={{ marginTop: 40 }}><a className="text-link" href={config.related.href}>{config.related.label} <ArrowUpRight size={17} aria-hidden="true" /></a></p>
    </section>
    <Plates title="More from the studio" text="Most projects use more than one of these. We plan them together so everything feels like one brand." items={studioServices.filter(item => item.slug !== config.slug)} />
  </main><SiteFooter invite={config.invite} action={config.inviteAction} href={quoteFor} /></div>;
}
