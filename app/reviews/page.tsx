import type { Metadata } from "next";
import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { PageHero, Plates, studioServices } from "@/components/page-parts";
import { SocialProof } from "@/components/social-proof";

export const metadata: Metadata = { title: "Client reviews | EasyDesignTech", description: "Read approved client feedback and share your experience of working with EasyDesignTech." };

export default function ReviewsPage() {
  return <div className="site-shell"><SiteHeader /><main id="main">
    <PageHero
      crumbs={[{ label: "Home", href: "/" }, { label: "Reviews", href: "/reviews" }]}
      title={<>Real words from<br />real clients.</>}
      intro="Every review on this page comes from someone we have worked with and is approved before it appears. No samples, no stand-ins."
      action={{ label: "Start a project", href: "/contact" }}
      secondary={{ label: "Read the reviews", href: "#reviews" }}
      image={{ src: "/service-devices.webp", alt: "Laptop, tablet and phone screens in a blue studio scene" }}
    />
    <SocialProof />
    <Plates title="What we can do for you" text="Websites, brands, content and AI workflows, designed and built in Birmingham." items={studioServices} />
  </main><SiteFooter invite={["Have something", "in mind?"]} /></div>;
}
