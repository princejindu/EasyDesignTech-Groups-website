import type { Metadata } from "next";
import { VenturePage } from "@/components/venture-page";

export const metadata: Metadata = { title: "EasyProperties | EasyDesignTech", description: "EasyProperties: a clearer way to discover property, being built within the EasyDesignTech family." };

export default function EasyPropertiesPage() {
  return <VenturePage
    crumb="EasyProperties" slug="easyproperties"
    title={<>Places worth<br />finding.</>}
    intro="EasyProperties is shaping a simpler way to explore property, with clearer information and a more confident path from discovery to decision. It is in development now."
    action={{ label: "Enquire about EasyProperties", href: "/contact?interest=EasyProperties" }}
    image={{ src: "/property.webp", alt: "A bright living room with a city skyline beyond the windows", width: 1500, height: 750 }}
    idea={{ title: <>Property, with<br />more clarity.</>, copy: "Built around discovery, useful detail and a smoother experience, EasyProperties aims to help people navigate property opportunities with less friction and more confidence.", points: ["Discover with useful detail", "Understand each option clearly", "Decide with confidence"], image: { src: "/property.webp", alt: "Sofas and a marble table in a sunlit apartment", width: 1500, height: 750 }, link: { label: "Ask us about EasyProperties", href: "/contact?interest=EasyProperties" } }}
    featuresTitle="What EasyProperties is being built to do" featuresText="The vision, in plain terms. Features will arrive in stages as the platform develops."
    features={[
      { title: "Clear listings", copy: "The details that matter, laid out so options are easy to compare." },
      { title: "A calmer search", copy: "Fewer distractions and a journey that respects your time." },
      { title: "Confidence to act", copy: "Useful context at each stage, from first look to next step." },
    ]}
    stepsTitle="Discover, understand, decide" stepsText="The path EasyProperties is designed around."
    steps={[
      { title: "Discover", copy: "Find places that fit how you want to live." },
      { title: "Understand", copy: "See clearly what each option offers." },
      { title: "Decide", copy: "Move forward with confidence." },
    ]}
    next={[
      { name: "Easylink eSIM", line: "Travel data for 190+ destinations.", href: "/easylink", image: "/esim-globe.webp", alt: "A glowing globe wrapped in lines of connection", status: "Live" },
      { name: "EasyHoli", line: "Trips and shared plans in one place.", href: "/easyholi", image: "/travel.webp", alt: "A sunlit terrace above a coastal old town and the sea", status: "In development" },
      { name: "EasyDesignTech services", line: "The studio that builds all three, available for your project.", href: "/services", image: "/service-devices.webp", alt: "Laptop, tablet and phone screens in a blue studio scene" },
    ]}
    invite={["Interested in", "EasyProperties?"]} inviteAction="Get in touch" inviteHref="/contact?interest=EasyProperties"
  />;
}
