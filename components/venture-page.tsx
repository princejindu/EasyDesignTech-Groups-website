 
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
import { BandHead, PageHero, Plates, Rows, Split, Steps } from "@/components/page-parts";

type Img = { src: string; alt: string; width?: number; height?: number };
type Link = { label: string; href: string; external?: boolean };

export function VenturePage(props: {
  crumb: string; slug: string; title: ReactNode; intro: string; action: Link; image?: Img; media?: ReactNode;
  idea: { title: ReactNode; copy: string; points: string[]; image: Img; link: Link };
  steps: { title: string; copy: string }[]; stepsTitle: string; stepsText: string;
  features: { title: string; copy: string }[]; featuresTitle: string; featuresText: string;
  next: { name: string; line: string; href: string; image: string; alt: string; status?: string }[];
  invite: [string, string]; inviteAction: string; inviteHref: string;
}) {
  return <div className="site-shell"><SiteHeader /><main id="main">
    <PageHero
      crumbs={[{ label: "Home", href: "/" }, { label: "Our businesses", href: "/businesses" }, { label: props.crumb, href: `/${props.slug}` }]}
      title={props.title} intro={props.intro} action={props.action}
      secondary={{ label: "Read the idea", href: "#idea" }} image={props.image} media={props.media}
    />
    <Split id="idea" tone="band-paper" image={props.idea.image} title={props.idea.title}>
      <p>{props.idea.copy}</p>
      <ul>{props.idea.points.map(point => <li key={point}>{point}</li>)}</ul>
      <div className="actions"><a className="button button-dark" href={props.idea.link.href} {...(props.idea.link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{props.idea.link.label} <ArrowUpRight size={18} aria-hidden="true" /></a></div>
    </Split>
    <section className="band band-dark" aria-labelledby="features-title">
      <BandHead id="features-title" title={props.featuresTitle} text={props.featuresText} />
      <Rows items={props.features} />
    </section>
    <section className="band band-blue" aria-labelledby="steps-title">
      <BandHead id="steps-title" title={props.stepsTitle} text={props.stepsText} />
      <Steps items={props.steps} />
    </section>
    <Plates id="family-title" title="The rest of the family" text="Each business has its own purpose. Together they cover the way people travel, connect and live." items={props.next} />
  </main><SiteFooter invite={props.invite} action={props.inviteAction} href={props.inviteHref} /></div>;
}
