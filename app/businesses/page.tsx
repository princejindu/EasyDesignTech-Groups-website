/* eslint-disable @next/next/no-img-element -- Plain links and images keep full page loads and exact crops. */
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { BusinessJourney } from "@/components/business-journey";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
import { BandHead, PageHero, Split, Steps } from "@/components/page-parts";

export const metadata: Metadata = {
  title: "Our businesses | EasyDesignTech",
  description: "Meet Easylink eSIM, EasyHoli and EasyProperties: travel connectivity for 190+ destinations, plus the travel and property platforms being built at EasyDesignTech.",
};

const easyLink = "https://www.geteasylink.app/";

const ventures = [
  { name: "Easylink eSIM", line: "Travel data for 190+ destinations, set up digitally.", href: "/easylink", image: "/esim-globe.webp", alt: "A glowing globe wrapped in lines of connection", status: "Live", live: true, w: 1024, h: 1536 },
  { name: "EasyHoli", line: "Trips, plans and shared itineraries in one place.", href: "/easyholi", image: "/travel.webp", alt: "A sunlit terrace above a coastal old town and the sea", status: "In development", live: false, w: 1500, h: 844 },
  { name: "EasyProperties", line: "A calmer, clearer way to discover property.", href: "/easyproperties", image: "/property.webp", alt: "A bright living room with a city skyline beyond the windows", status: "In development", live: false, w: 1500, h: 750 },
];

export default function BusinessesPage() {
  return <div className="site-shell"><SiteHeader /><main id="main">
    <PageHero
      crumbs={[{ label: "Home", href: "/" }, { label: "Our businesses", href: "/businesses" }]}
      title={<>Built for the way<br />life moves.</>}
      intro="Connection, travel and the places we call home. Three businesses made by our own studio, shaped by one belief: the best experiences make the complicated feel easy."
      action={{ label: "Explore Easylink plans", href: easyLink, external: true }}
      secondary={{ label: "Meet all three", href: "#ventures" }}
      image={{ src: "/business-globe.webp", alt: "A glowing globe crossed by bright lines of connection" }}
    />

    <section id="ventures" aria-labelledby="ventures-title">
      <h2 id="ventures-title" className="sr-only">Our three businesses</h2>
      <div className="venture-plates">{ventures.map((venture, index) => <a key={venture.name} className="venture-plate rv" style={{ ["--d" as string]: index }} href={venture.href}>
        <img src={venture.image} alt={venture.alt} width={venture.w} height={venture.h} loading="lazy" />
        <span className={`status${venture.live ? " live" : ""}`}>{venture.status}</span>
        <div className="plate-copy"><h3>{venture.name}</h3><p>{venture.line}</p><span>Explore {venture.name} <ArrowUpRight size={17} aria-hidden="true" /></span></div>
      </a>)}</div>
    </section>

    <Split id="esim-title" tone="band-paper" image={{ src: "/esim-globe.webp", alt: "A glowing globe wrapped in lines of connection", width: 1024, height: 1536 }} title={<>Easylink eSIM.<br />Go further, stay closer.</>}>
      <p>The best part of arriving somewhere new is being free to explore it. Easylink brings travel data into a simple digital journey, so the important things stay within reach wherever you go.</p>
      <ul><li>Plans for 190+ destinations advertised by Easylink</li><li>Buy and set up digitally, no plastic SIM</li><li>Local, regional and global options</li></ul>
      <div className="actions"><a className="button button-dark" href={easyLink} target="_blank" rel="noopener noreferrer">Visit Easylink <ArrowUpRight size={18} aria-hidden="true" /></a><a className="text-link" href="/easylink">Read about Easylink</a></div>
    </Split>

    <section className="band band-dark" aria-labelledby="steps-title">
      <BandHead id="steps-title" title="A little less setup, a lot more going" text="Plan availability, coverage, pricing, validity and activation requirements vary. Check current details and device compatibility on Easylink before you buy." />
      <Steps items={[
        { title: "Find", copy: "Start with where you are going and see the plans available for your route." },
        { title: "Choose", copy: "Compare data allowances and validity, then pick the plan that fits the trip." },
        { title: "Connect", copy: "Follow the activation steps on a compatible phone and land ready to go." },
      ]} />
    </section>

    <BusinessJourney />

    <Split id="holi-title" tone="band-paper" flip image={{ src: "/travel.webp", alt: "A sunlit terrace above a coastal old town and the sea", width: 1500, height: 844 }} title={<>EasyHoli.<br />More journey, less juggling.</>}>
      <p>Imagine a trip that feels connected from the first idea to the last sunset. EasyHoli is being built around the many moving pieces of travel, bringing inspiration, planning and the small details into one considered experience.</p>
      <ul><li>Discover places and possibilities</li><li>Shape plans together</li><li>Keep flights, stays, activities and expenses in view</li></ul>
      <div className="actions"><a className="button button-dark" href="/easyholi">Explore EasyHoli <ArrowUpRight size={18} aria-hidden="true" /></a><a className="text-link" href="/contact?interest=EasyHoli">Ask about EasyHoli</a></div>
    </Split>

    <Split id="property-title" image={{ src: "/property.webp", alt: "A bright living room with a city skyline beyond the windows", width: 1500, height: 750 }} title={<>EasyProperties.<br />See what comes next.</>}>
      <p>Every place has a story. EasyProperties is being designed to help people discover property with clearer information, a calmer experience and more confidence at every stage of the search.</p>
      <ul><li>Discover with useful detail</li><li>Understand each option</li><li>Decide with confidence</li></ul>
      <div className="actions"><a className="button" href="/easyproperties">Explore EasyProperties <ArrowUpRight size={18} aria-hidden="true" /></a><a className="text-link" href="/contact?interest=EasyProperties">Ask about EasyProperties</a></div>
    </Split>
  </main><SiteFooter invite={["Different ambitions.", "One studio."]} action="Explore our services" href="/services" /></div>;
}
