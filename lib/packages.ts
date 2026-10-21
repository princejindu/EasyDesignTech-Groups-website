/** Indicative starting packages. Prices are guides; every project is confirmed in a written quote. */
export const packages = [
  {
    title: "Website Launch", pick: "First website", line: "A first website", price: "£749", period: "one time",
    interest: "Web and apps", kind: "Web design",
    summary: "A polished online starting point for a small business ready to be found and contacted.",
    includes: ["Up to four core pages", "Responsive design", "Clear enquiry route", "Basic search setup"],
    note: "Best for a focused first website.",
  },
  {
    title: "Website Growth", pick: "Bigger website", line: "A growing website", price: "£1,999", period: "one time",
    interest: "Web and apps", kind: "Web design",
    summary: "A more distinctive site with room to explain your offer and guide different audiences.",
    includes: ["Up to eight tailored pages", "Content and user journey planning", "Enquiry flows", "Analytics setup and launch checks"],
    note: "Best for an established offer with more to say.",
  },
  {
    title: "Product First Build", pick: "Web app", line: "Your first web app", price: "£4,500", period: "per project",
    interest: "Web and apps", kind: "App development",
    summary: "Turn one valuable customer or team journey into an initial working web product.",
    includes: ["Discovery and scope", "Core journey and interface design", "One focused initial build", "Testing and handover"],
    note: "Mobile apps and larger products are scoped separately.",
  },
  {
    title: "Social Presence", pick: "Social media", line: "Social, every month,", price: "£450", period: "per month",
    interest: "Social media and content", kind: "Content and social",
    summary: "A consistent branded presence with a plan and useful creative assets each month.",
    includes: ["Monthly content direction", "Eight designed posts for one channel", "Scheduling support", "Monthly review"],
    note: "Video, paid media and community care can be added.",
  },
  {
    title: "Workflow Starter", pick: "Automation", line: "One AI workflow", price: "£900", period: "per setup",
    interest: "AI automation and data", kind: "AI automation",
    summary: "Choose one repetitive task and build a dependable first automation around it.",
    includes: ["Workflow mapping", "One focused automation", "Human review point", "Testing and team handover"],
    note: "Software subscriptions and API usage are separate.",
  },
  {
    title: "Short Video", pick: "Short video", line: "A short video", price: "£300", period: "per video",
    interest: "Social media and content", kind: "AI video editing",
    summary: "A short social video with a concept, crafted edit and a clear brand message.",
    includes: ["Creative direction", "One short form edit", "Captions and social format", "One revision round"],
    note: "Complex AI generation and licensed assets are scoped separately.",
  },
] as const;

export type Package = (typeof packages)[number];

export function quoteHref(item: Pick<Package, "title" | "interest">) {
  return `/contact?quote=tailored&interest=${encodeURIComponent(item.interest)}&package=${encodeURIComponent(item.title)}`;
}
