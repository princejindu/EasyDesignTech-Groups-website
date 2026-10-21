 
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { BandHead, PageHero, Plates, Rows, Split, Steps } from "@/components/page-parts";

export const metadata: Metadata = { title: "About | EasyDesignTech", description: "EasyDesignTech is a design and technology studio in Birmingham, and the company behind Easylink eSIM, EasyHoli and EasyProperties." };

export default function AboutPage() {
  return <div className="site-shell"><SiteHeader /><main id="main">
    <PageHero
      crumbs={[{ label: "Home", href: "/" }, { label: "About", href: "/about" }]}
      title={<>Curiosity meets<br />useful action.</>}
      intro="EasyDesignTech is a design and technology studio in Birmingham. We build for clients, and we build businesses of our own."
      action={{ label: "Work with us", href: "/contact" }}
      secondary={{ label: "Explore our services", href: "/services" }}
      image={{ src: "/brand-dark.jpg", alt: "The EasyDesignTech logo: a blue to violet monogram above the company name", width: 2048, height: 2048 }}
    />

    <Split id="view-title" tone="band-paper" image={{ src: "/service-branding.webp", alt: "Folded paper, ribbon and glass forms in warm brand colours" }} title={<>Make it clear.<br />Make it matter.</>}>
      <p>We work across websites and apps, visual identity, content and automation. Each project starts with a real need and a plain question: how could this feel easier for the people using it?</p>
      <p>The same question runs through our own businesses. Easylink eSIM focuses on connectivity, EasyHoli on travel and EasyProperties on discovery. Each has its own purpose and its own visual world.</p>
      <div className="actions"><a className="button button-dark" href="/services">Explore our services <ArrowUpRight size={18} aria-hidden="true" /></a></div>
    </Split>

    <section className="band band-blue" aria-labelledby="values-title">
      <BandHead id="values-title" title="What connects the work" text="Three habits we bring to every client project and every product of our own." />
      <Steps items={[
        { title: "Purpose", copy: "Build a useful experience around the people it serves." },
        { title: "Character", copy: "Give every idea a distinctive, consistent identity." },
        { title: "Momentum", copy: "Leave room to improve as needs and chances change." },
      ]} />
    </section>

    <Plates id="family-title" title="Three businesses of our own" text="We build our own products with the same studio that serves our clients." items={[
      { name: "Easylink eSIM", line: "Travel data for 190+ destinations.", href: "/easylink", image: "/esim-globe.webp", alt: "A glowing globe wrapped in lines of connection", status: "Live" },
      { name: "EasyHoli", line: "Trips and shared plans in one place.", href: "/easyholi", image: "/travel.webp", alt: "A sunlit terrace above a coastal old town and the sea", status: "In development" },
      { name: "EasyProperties", line: "A clearer way to discover property.", href: "/easyproperties", image: "/property.webp", alt: "A bright living room with a city skyline beyond the windows", status: "In development" },
    ]} />

    <section className="band band-dark" aria-labelledby="forward-title">
      <BandHead id="forward-title" title="Birmingham. Forward." text="EasyDesignTech Ltd is registered in England and Wales and based in Birmingham, a city whose motto is one word: Forward. It suits the way we like to work." />
      <Rows items={[
        { title: "Studio services", copy: "Websites, apps, brands, content and AI workflows for businesses of every size.", link: { label: "Services", href: "/services" } },
        { title: "Our businesses", copy: "Easylink eSIM is live. EasyHoli and EasyProperties are in development.", link: { label: "Businesses", href: "/businesses" } },
        { title: "Client reviews", copy: "Read approved feedback, or share your own experience of working with us.", link: { label: "Reviews", href: "/reviews" } },
      ]} />
    </section>
  </main><SiteFooter invite={["One studio.", "Many possibilities."]} /></div>;
}
