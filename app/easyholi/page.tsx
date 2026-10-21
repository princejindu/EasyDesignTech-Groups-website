import type { Metadata } from "next";
import { VenturePage } from "@/components/venture-page";

export const metadata: Metadata = { title: "EasyHoli | EasyDesignTech", description: "EasyHoli: the travel planning platform being built within the EasyDesignTech family." };

export default function EasyHoliPage() {
  return <VenturePage
    crumb="EasyHoli" slug="easyholi"
    title={<>More journey.<br />Less juggling.</>}
    intro="EasyHoli brings the pieces of a trip into one thoughtful experience, from inspiration and planning to the details that make every day easier. It is in development now."
    action={{ label: "Enquire about EasyHoli", href: "/contact?interest=EasyHoli" }}
    image={{ src: "/travel.webp", alt: "A sunlit terrace above a coastal old town and the sea", width: 1500, height: 844 }}
    idea={{ title: <>A better way<br />to get away.</>, copy: "EasyHoli is being designed to bring flights, stays, activities, shared plans and travel expenses into one connected journey, with Easylink eSIM keeping travellers online along the way.", points: ["Flights, stays and activities together", "Shared itineraries for groups and families", "Trip expenses kept in view"], image: { src: "/travel.webp", alt: "A coastal town and island at sunset", width: 1500, height: 844 }, link: { label: "Ask us about EasyHoli", href: "/contact?interest=EasyHoli" } }}
    featuresTitle="What EasyHoli is being built to do" featuresText="The vision, in plain terms. Features will arrive in stages as the platform develops."
    features={[
      { title: "Discover", copy: "Find places and ideas that fit the trip you have in mind." },
      { title: "Plan together", copy: "Build an itinerary everyone travelling can see and shape." },
      { title: "Keep track", copy: "Bookings, plans and shared costs in one view." },
      { title: "Stay connected", copy: "Pair the trip with an Easylink data plan for your destination." },
    ]}
    stepsTitle="From idea to itinerary" stepsText="How a trip is meant to come together in EasyHoli."
    steps={[
      { title: "Dream", copy: "Start with a place, a date or just a feeling." },
      { title: "Plan", copy: "Shape the days, together." },
      { title: "Go", copy: "Travel with everything in one place." },
    ]}
    next={[
      { name: "Easylink eSIM", line: "Travel data for 190+ destinations.", href: "/easylink", image: "/esim-globe.webp", alt: "A glowing globe wrapped in lines of connection", status: "Live" },
      { name: "EasyProperties", line: "A clearer way to discover property.", href: "/easyproperties", image: "/property.webp", alt: "A bright living room with a city skyline beyond the windows", status: "In development" },
      { name: "EasyDesignTech services", line: "The studio that builds all three, available for your project.", href: "/services", image: "/service-devices.webp", alt: "Laptop, tablet and phone screens in a blue studio scene" },
    ]}
    invite={["Interested in", "EasyHoli?"]} inviteAction="Get in touch" inviteHref="/contact?interest=EasyHoli"
  />;
}
