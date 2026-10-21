import type { Metadata } from "next";
import { ServicePage } from "@/components/service-page";

export const metadata: Metadata = {
  title: "AI automation and data | EasyDesignTech",
  description: "Practical AI workflows, connected systems, customer support journeys and reporting built around the way your team works.",
};

export default function AutomationPage() {
  return <ServicePage
    crumb="AI automation and data" slug="automation" interest="AI automation and data"
    title={<>Less busywork.<br />More room to grow.</>}
    intro="Put repetitive steps on a smarter path. We design practical AI workflows, connected customer journeys and clear dashboards around the work your team actually does."
    action="Discuss your workflow"
    image={{ src: "/service-systems.webp", alt: "Glass blocks and green light forming a connected system" }}
    offersTitle="A better way through the work"
    offersText="We begin with a real bottleneck, define a useful outcome and build a workflow with room for oversight and refinement."
    offers={[
      { title: "Workflow automation", copy: "Map repeatable steps, connect the tools you use and make handoffs easier for your team." },
      { title: "AI assistants", copy: "A guided assistant for common questions, enquiry triage or internal knowledge, with a clear route to a person." },
      { title: "Customer journeys", copy: "Better enquiry capture, timely follow up and organised conversations across the touchpoints that matter." },
      { title: "System connections", copy: "Let useful information move between forms, tools and teams without needless copy and paste." },
      { title: "Dashboards", copy: "See meaningful activity in one place, so decisions rest on signals you can understand." },
      { title: "Data foundations", copy: "Clean structures, sensible permissions and human review points that keep a workflow dependable." },
    ]}
    feature={{
      title: "Start with one use case",
      image: { src: "/support-agent.webp", alt: "Illustrated customer care assistant wearing a headset" },
      copy: "The chat assistant on this website is a working example: it answers common questions, then hands the conversation to a person. That is how we approach every automation. Start with one job, keep people in control and measure what changes.",
      points: ["One focused first automation", "A human review point built in", "Clear before and after"],
      link: { label: "Start a workflow brief", href: "/contact?quote=tailored&interest=AI%20automation%20and%20data&package=Workflow%20Starter" },
    }}
    steps={[
      { title: "Map", copy: "We trace the task as it happens today and find the slow steps." },
      { title: "Choose", copy: "We pick one use case with a clear, measurable outcome." },
      { title: "Build", copy: "We connect the tools, add AI where it helps and test it." },
      { title: "Hand over", copy: "We train the team and agree how the workflow is watched." },
    ]}
    packages={["Workflow Starter"]}
    faq={[
      { q: "Will AI replace my team?", a: "That is not the aim. We automate the repetitive parts so people can spend their time on the work that needs them, with a person reviewing the important decisions." },
      { q: "What tools do you work with?", a: "We work with the tools you already use where we can, and recommend others where they are a better fit. Software subscriptions and API usage are quoted separately." },
      { q: "Is our data safe?", a: "We design workflows with sensible permissions and only connect what the task needs. We will talk through where your data goes before anything is built." },
      { q: "What is a good first automation?", a: "Something frequent, repetitive and rule based: sorting enquiries, sending follow ups, moving form data into a system or building a weekly report." },
    ]}
    invite={["Tell us where", "the work gets stuck."]} inviteAction="Start a workflow brief"
    related={{ label: "Need a product built around it? Explore websites and apps", href: "/services/web-apps" }}
  />;
}
