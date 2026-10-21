 
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
import { BandHead, PageHero, Split, Steps } from "@/components/page-parts";

export const metadata: Metadata = {
  title: "Services | EasyDesignTech",
  description: "Web and app development, branding, social content, AI assisted video, automation and data services from EasyDesignTech in Birmingham.",
};

const chapters = [
  { id: "web-apps", title: "Websites and apps", href: "/services/web-apps", interest: "Web and apps", image: "/service-devices.webp", alt: "Laptop, tablet and phone screens in a blue studio scene",
    copy: "From a striking first impression to the product behind your business, we design useful digital experiences with a clear path from idea to launch.",
    items: ["Business websites and online stores", "Web apps and customer portals", "Mobile app design and user journeys"], price: "Websites from £749" },
  { id: "branding", title: "Branding and design", href: "/services/branding", interest: "Branding and design", image: "/service-branding.webp", alt: "Folded paper, ribbon and glass forms in warm brand colours",
    copy: "A logo alone does not make a brand. We create the visual language, graphic assets and details that help your business look and feel like itself.",
    items: ["Brand identity and direction", "Graphic, print and presentation design", "Campaign visuals and creative systems"], price: "Quoted to your scope" },
  { id: "social", title: "Social media and content", href: "/services/social-content", interest: "Social media and content", image: "/service-content.webp", alt: "Layered video frames and colour on an editing timeline",
    copy: "Show up with purpose. We turn ideas into visual stories for the channels your audience uses, including AI assisted video, motion and everyday content.",
    items: ["Content planning and social management", "Short video, reels and motion graphics", "AI assisted video and campaign creative"], price: "From £450 a month, videos from £300" },
  { id: "automation", title: "AI automation and data", href: "/services/automation", interest: "AI automation and data", image: "/service-systems.webp", alt: "Glass blocks and green light forming a connected system",
    copy: "When the right information reaches the right place, teams have more room to do their best work. We build practical workflows and clearer views of the business.",
    items: ["AI assisted workflows and customer journeys", "Dashboards and useful reporting", "Organised data and connected systems"], price: "Workflows from £900" },
];

const capabilities: [string, string][] = [
  ["Business websites", "/services/web-apps"], ["Online stores", "/services/web-apps"], ["Customer portals", "/services/web-apps"],
  ["Mobile app design", "/services/web-apps"], ["UI and UX design", "/services/web-apps"], ["Brand identities", "/services/branding"],
  ["Graphic and print design", "/services/branding"], ["Social account care", "/services/social-content"], ["AI assisted video", "/services/social-content"],
  ["Motion and campaign assets", "/services/social-content"], ["AI workflows", "/services/automation"], ["Dashboards and reporting", "/services/automation"],
];

export default function ServicesPage() {
  return <div className="site-shell"><SiteHeader /><main id="main">
    <PageHero
      crumbs={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }]}
      title={<>Make it look good.<br />Make it work.</>}
      intro="Design, technology and storytelling under one roof in Birmingham. Choose the part you need, or bring us the whole challenge."
      action={{ label: "Start your project", href: "/contact" }}
      secondary={{ label: "Compare starting prices", href: "/pricing" }}
      image={{ src: "/service-content.webp", alt: "Layered creative frames, colour and motion on a studio screen" }}
    />

    {chapters.map((item, index) => <Split key={item.id} id={`svc-${item.id}`} flip={index % 2 === 1} tone={index % 2 === 0 ? "band-paper" : "band-dark"} image={{ src: item.image, alt: item.alt }} title={item.title}>
      <p>{item.copy}</p>
      <ul>{item.items.map(value => <li key={value}>{value}</li>)}</ul>
      <p><strong>{item.price}</strong></p>
      <div className="actions">
        <a className={index % 2 === 0 ? "button button-dark" : "button"} href={item.href}>Explore {item.title.toLowerCase()} <ArrowUpRight size={18} aria-hidden="true" /></a>
        <a className="text-link" href={`/contact?quote=tailored&interest=${encodeURIComponent(item.interest)}`}>Get a quote <ArrowUpRight size={17} aria-hidden="true" /></a>
      </div>
    </Split>)}

    <section className="band band-deep" aria-labelledby="cap-title">
      <BandHead id="cap-title" title="One studio, every part of the job" text="Have a brief that spans several of these? Most of our projects do. Tell us the whole thing and we will plan a sensible order of work." />
      <div className="cap-list">{capabilities.map(([name, href], index) => <a key={name} className="rv" style={{ ["--d" as string]: index % 2 }} href={href}>{name}</a>)}</div>
    </section>

    <section className="band band-blue" aria-labelledby="how-title">
      <BandHead id="how-title" title="How a project runs" text="Every project, large or small, follows the same four moves. You always know what happens next and what it costs." />
      <Steps items={[
        { title: "Listen", copy: "We learn the business, the audience and the problem worth solving." },
        { title: "Shape", copy: "We map the journey, agree the scope and send a written quote." },
        { title: "Build", copy: "We design and build it across every screen, sharing progress as we go." },
        { title: "Grow", copy: "We launch, measure what changes and keep improving it with you." },
      ]} />
    </section>
  </main><SiteFooter invite={["Tell us what", "you’re building."]} /></div>;
}
