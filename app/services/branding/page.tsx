import type { Metadata } from "next";
import { ServicePage } from "@/components/service-page";

export const metadata: Metadata = {
  title: "Branding and design | EasyDesignTech",
  description: "Brand identity, guidelines, creative direction, graphic design and campaign assets that help businesses show up with clarity.",
};

export default function BrandingPage() {
  return <ServicePage
    crumb="Branding and design" slug="branding" interest="Branding and design"
    title={<>Look like you<br />mean business.</>}
    intro="People decide how they feel about a brand in moments. We give yours a clear identity and the creative tools to show up with confidence, again and again."
    action="Discuss your brand"
    image={{ src: "/service-branding.webp", alt: "Folded paper, ribbon and glass forms in warm brand colours" }}
    offersTitle="An identity with room to move"
    offersText="Start with the essentials or build a complete system. Every piece should help the right people recognise and remember you."
    offers={[
      { title: "Brand identity", copy: "A recognisable logo, colour, type and visual language designed to work together wherever people meet you." },
      { title: "Brand guidelines", copy: "A practical system your team can use consistently across digital, social and printed materials." },
      { title: "Creative direction", copy: "An idea and a visual point of view to guide your launch, refresh or next campaign." },
      { title: "Graphic and print", copy: "Presentations, brochures, packaging and everyday assets that carry the same confident story." },
      { title: "Campaign visuals", copy: "Distinctive assets shaped for the message and the channels behind a promotion or launch." },
      { title: "Digital brand systems", copy: "Reusable visuals and interface details that give your website and product a coherent feel." },
    ]}
    feature={{
      title: "Recognisable at a glance",
      image: { src: "/brand-dark.jpg", alt: "The EasyDesignTech logo: a blue to violet monogram above the company name" },
      copy: "A brand earns recognition by being consistent. We design the mark, then the system around it: colours, type, layouts and the rules that keep every post, page and print job looking like you. Our own family of brands, from EasyDesignTech to Easylink, was built the same way.",
      points: ["Consistent at every touchpoint", "Easy for your team to use", "Ready to grow with new products"],
      link: { label: "Start a brand brief", href: "/contact?quote=tailored&interest=Branding%20and%20design" },
    }}
    steps={[
      { title: "Discover", copy: "We learn what you do, who you serve and what sets you apart." },
      { title: "Explore", copy: "We test directions for the idea, the mark and the visual language." },
      { title: "Design", copy: "We refine the chosen route into a complete, usable identity." },
      { title: "Roll out", copy: "We apply it to the assets you need and hand over clear guidelines." },
    ]}
    packages={[]}
    faq={[
      { q: "Can you refresh our brand rather than start again?", a: "Yes. Many businesses need a sharper version of what they already have. We look at what people already recognise and keep what is working." },
      { q: "What do we receive at the end?", a: "The files you need for screen and print, plus guidelines that explain how to use them. The exact list is agreed in your quote." },
      { q: "How is branding priced?", a: "Branding is quoted to scope, because a logo refresh and a full identity system are very different jobs. Share your brief and we will propose a clear price." },
      { q: "Can you design for social media and the website too?", a: "Yes. We can carry the identity into your website, social content and campaigns so everything feels like one brand." },
    ]}
    invite={["Bring the idea.", "We’ll shape the brand."]} inviteAction="Start a brand brief"
    related={{ label: "Carry the brand into social content and video", href: "/services/social-content" }}
  />;
}
