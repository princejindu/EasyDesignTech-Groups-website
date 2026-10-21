import type { Metadata } from "next";
import { ServicePage } from "@/components/service-page";

export const metadata: Metadata = {
  title: "Social media and content | EasyDesignTech",
  description: "Social media strategy, content production, AI assisted video, short form edits, campaign visuals and account care by EasyDesignTech.",
};

export default function SocialContentPage() {
  return <ServicePage
    crumb="Social media and content" slug="social-content" interest="Social media and content"
    title={<>Make them stop.<br />Then make them stay.</>}
    intro="Posting on a schedule is not a strategy. We combine ideas, design, video and account care so your business shows up with a voice people remember."
    action="Plan your content"
    image={{ src: "/service-content.webp", alt: "Layered video frames and colour on an editing timeline" }}
    offersTitle="More ways to tell your story"
    offersText="Choose the support you need, from one launch asset to an ongoing creative presence across your channels."
    offers={[
      { title: "Content direction", copy: "A plan for what to say, who it is for and how each piece fits the bigger story." },
      { title: "Design for social", copy: "Distinctive graphics, carousels and branded visuals made for the places your audience spends time." },
      { title: "AI assisted video", copy: "Creative concepts, AI supported visuals and carefully edited video, shaped by human direction and review." },
      { title: "Short form and motion", copy: "Reels, animated explainers and edits that make the message clear in the seconds you have." },
      { title: "Account care", copy: "A consistent publishing rhythm and day to day support for the channels that matter to you." },
      { title: "Campaign creative", copy: "One connected visual idea carried across launches, promotions and paid social." },
    ]}
    feature={{
      title: "Video that moves the idea",
      image: { src: "/service-content.webp", alt: "A product bottle and bright motion frames in an edit" },
      copy: "AI can open new visual directions. The work still needs a point of view. We shape the concept, guide the tools, edit the result and make sure the final piece suits your brand and your message. We also create short form video for apps and brands.",
      points: ["Product and brand stories", "Short social videos and reels", "Motion led campaign assets"],
      link: { label: "Ask about a video project", href: "/contact?quote=tailored&interest=Social%20media%20and%20content&package=Short%20Video" },
    }}
    steps={[
      { title: "Plan", copy: "We agree the audience, the message and a realistic rhythm." },
      { title: "Create", copy: "We design posts and produce video in your brand’s voice." },
      { title: "Publish", copy: "We schedule and post, or hand over ready-to-go files." },
      { title: "Review", copy: "We look at what worked each month and adjust the plan." },
    ]}
    packages={["Social Presence", "Short Video"]}
    faq={[
      { q: "Which platforms do you create for?", a: "Instagram, TikTok, Facebook, LinkedIn, YouTube Shorts and more. The Social Presence package covers one channel, and more can be added." },
      { q: "Is AI video right for my brand?", a: "It depends on the message. We use AI where it opens a better visual idea, and always review the result by hand. If filmed or designed content fits better, we will say so." },
      { q: "Do you run paid ads?", a: "We can design the creative for paid social. Ad spend is always separate and stays in your control." },
      { q: "Can I buy a single video?", a: "Yes. Short videos start from £300 each, with one revision round included." },
    ]}
    invite={["Ready to show up", "differently?"]} inviteAction="Start a content brief"
    related={{ label: "Need the brand first? Explore branding", href: "/services/branding" }}
  />;
}
