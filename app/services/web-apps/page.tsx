import type { Metadata } from "next";
import { ServicePage } from "@/components/service-page";
import { PhoneScene } from "@/components/page-parts";

export const metadata: Metadata = {
  title: "Websites and apps | EasyDesignTech",
  description: "Websites, online stores, customer portals, web apps, mobile app design and UI and UX from EasyDesignTech in Birmingham.",
};

export default function WebAppsPage() {
  return <ServicePage
    crumb="Websites and apps" slug="web-apps" interest="Web and apps"
    title={<>Built to be used.<br />And remembered.</>}
    intro="Your website or app should do more than look the part. We design and build sites, products and mobile journeys that help people understand, explore and act."
    action="Discuss your idea"
    media={<PhoneScene caption="Concept screen: an eSIM plan picker, the kind of journey we design" />}
    offersTitle="The right shape for your idea"
    offersText="Some projects need a beautiful front door. Others need a whole system behind it. We help define the scope and build what fits."
    offers={[
      { title: "Websites with purpose", copy: "A clear story, a confident first impression and a responsive site that guides visitors to the next step." },
      { title: "Online stores", copy: "Shopping journeys shaped around your products and your customers, with a checkout that feels considered." },
      { title: "Web apps and portals", copy: "Useful tools for customers or teams, with the right information and actions easy to find." },
      { title: "Mobile app experiences", copy: "Flows and interfaces made for the smaller screen, with the same care for clarity, speed and personality." },
      { title: "UI and UX design", copy: "Research, structure, wireframes and visual design that make complex journeys feel understandable." },
      { title: "Connected systems", copy: "Integrations, forms and workflows that carry the experience on beyond the first click." },
    ]}
    feature={{
      title: "Clear from the first click",
      image: { src: "/service-devices.webp", alt: "Laptop, tablet and phone screens in a blue studio scene" },
      copy: "Fast to understand, comfortable to navigate and consistent from phone to desktop. The best digital products make the next action obvious without losing what makes the brand distinctive. We build our own products this way too, starting with Easylink.",
      points: ["Clear journeys from the first visit", "Responsive on every screen size", "Built to grow with the business"],
      link: { label: "See starting prices", href: "/pricing" },
    }}
    steps={[
      { title: "Understand", copy: "We learn the business, the audience and the problem worth solving." },
      { title: "Shape", copy: "We map the journey and decide what the product needs to do first." },
      { title: "Build", copy: "We bring the interface to life across screen sizes and real use cases." },
      { title: "Refine", copy: "We test, improve and prepare it for the people who will use it." },
    ]}
    packages={["Website Launch", "Website Growth", "Product First Build"]}
    faq={[
      { q: "Can you redesign the website I already have?", a: "Yes. We can refresh the design, restructure the content, or rebuild it on a better foundation. Tell us what is not working today and we will suggest the right level of change." },
      { q: "Do you build mobile apps?", a: "We design mobile app journeys and interfaces, and build web products that work beautifully on phones. Native mobile apps are scoped separately after a discovery conversation." },
      { q: "Who looks after hosting and updates?", a: "We can recommend and set up hosting, and agree ongoing support if you want us to keep things updated. Hosting and software subscriptions are quoted separately." },
      { q: "What do you need from me to start?", a: "An idea of what the site or product should achieve, who it is for and any content or branding you already have. An early idea is enough to begin." },
    ]}
    invite={["What could your", "idea become?"]} inviteAction="Start a website or app brief"
    related={{ label: "Pair it with branding and design", href: "/services/branding" }}
  />;
}
