 
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
import { BandHead, Faq, PageHero, Plates, Steps, studioServices } from "@/components/page-parts";
import { packages, quoteHref } from "@/lib/packages";

export const metadata: Metadata = {
  title: "Pricing | EasyDesignTech",
  description: "Starting prices for websites, web apps, social media, AI automation and AI assisted video. Tell us your brief for a tailored quote.",
};

export default function PricingPage() {
  return <div className="site-shell"><SiteHeader /><main id="main">
    <PageHero
      crumbs={[{ label: "Home", href: "/" }, { label: "Pricing", href: "/pricing" }]}
      title={<>Clear prices.<br />No checkout.</>}
      intro="Pick a starting point, see what it includes and tell us what you have in mind. We confirm the exact scope and price in writing before any work begins."
      action={{ label: "Ask for a tailored quote", href: "/contact?quote=tailored" }}
      secondary={{ label: "See the packages", href: "#packages" }}
      image={{ src: "/service-devices.webp", alt: "Laptop, tablet and phone screens in a blue studio scene" }}
    />

    <section className="band band-paper" id="packages" aria-labelledby="packages-title">
      <BandHead id="packages-title" title="Find your starting point" text="Each package is a useful baseline. Websites start at £749; most clients begin with one package and add to it." />
      <div className="price-list">{packages.map(item => <article key={item.title} className="price-row rv">
        <div className="price-name"><h3>{item.title}</h3></div>
        <p className="price-fig">{item.price}<small>{item.period}</small></p>
        <div className="price-detail"><strong>{item.kind}.</strong> {item.summary}<ul>{item.includes.map(value => <li key={value}>{value}</li>)}</ul><em>{item.note}</em></div>
        <a className="cell cell-ink" href={quoteHref(item)} aria-label={`Request a quote for ${item.title}`}>Request a quote <ArrowUpRight size={18} aria-hidden="true" /></a>
      </article>)}</div>
      <p className="fine-print">These are illustrative starting prices in GBP. Final pricing depends on the agreed scope, timeline and tools. Hosting, ad spend, software subscriptions, API usage, licensing and taxes are quoted separately where they apply. Branding is quoted to scope: <a className="text-link" href="/services/branding">explore branding</a>.</p>
    </section>

    <section className="band band-blue" aria-labelledby="steps-title">
      <BandHead id="steps-title" title="Simple to begin" text="No forms to pay through and no surprises. Just a conversation, then a clear proposal." />
      <Steps items={[
        { title: "Choose", copy: "Pick a package, or tell us about a custom project." },
        { title: "Share", copy: "We learn your audience, goals and the work involved." },
        { title: "Agree", copy: "You get a written scope and price before anything starts." },
      ]} />
    </section>

    <Plates title="See the services behind the prices" items={studioServices} />

    <section className="band band-dark" aria-labelledby="faq-title">
      <BandHead id="faq-title" title="Questions before we begin?" text={<>Still unsure which package fits? <a className="text-link" href="/contact">Ask us</a> and we will point you to the right one.</>} />
      <Faq items={[
        { q: "Are these final prices?", a: "They are indicative starting points. We confirm a written scope and quote after learning about your goals, content, integrations and timeline. Taxes and third party costs are confirmed in the quote." },
        { q: "Can I combine services?", a: "Yes. A website, brand and content can be planned together. Tell us what you need and we will recommend a sensible order of work." },
        { q: "What about a custom app or a larger AI system?", a: "Larger products, mobile apps and multiple connected workflows need discovery before pricing. Share the first use case and we will propose a clear scope." },
        { q: "How do I pay?", a: "Payment terms are set out in your proposal. Nothing is charged through this website." },
      ]} />
    </section>
  </main><SiteFooter invite={["Tell us the idea.", "We’ll make the plan."]} action="Request your quote" href="/contact?quote=tailored" /></div>;
}
