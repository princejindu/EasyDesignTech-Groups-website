import type { Metadata } from "next";
import { VenturePage } from "@/components/venture-page";
import { PhoneScene } from "@/components/page-parts";

export const metadata: Metadata = { title: "Easylink eSIM | EasyDesignTech", description: "Easylink eSIM: travel data for 190+ destinations, from the EasyDesignTech family." };
const site = "https://www.geteasylink.app/";

export default function EasylinkPage() {
  return <VenturePage
    crumb="Easylink eSIM" slug="easylink"
    title={<>Go further.<br />Stay connected.</>}
    intro="Easylink eSIM is built for travellers, remote workers and anyone on the move who wants straightforward mobile data without the usual friction."
    action={{ label: "Visit Easylink eSIM", href: site, external: true }}
    media={<PhoneScene caption="Concept screen of the Easylink plan picker" />}
    idea={{ title: <>Connectivity<br />that travels.</>, copy: "Explore local, regional and global data options, activate digitally and stay focused on the journey ahead. Easylink is the live part of a more connected travel experience across the EasyDesignTech family.", points: ["Plans for 190+ destinations advertised by Easylink", "Digital setup on compatible phones", "Local, regional and global options"], image: { src: "/esim-globe.webp", alt: "A glowing globe wrapped in lines of connection", width: 1024, height: 1536 }, link: { label: "See plans on Easylink", href: site, external: true } }}
    featuresTitle="Made for people on the move" featuresText="Different trips need different things. Easylink is designed around the three we hear about most."
    features={[
      { title: "Holidays", copy: "Maps, messages and bookings ready the moment you land." },
      { title: "Work trips", copy: "Keep your working day connected in a new city or time zone." },
      { title: "Multi-country routes", copy: "Regional and global options for itineraries that cross borders." },
    ]}
    stepsTitle="Three steps to connected" stepsText="Coverage, pricing, validity and device compatibility vary. Check current details on Easylink before you buy."
    steps={[
      { title: "Find", copy: "Search for where you are going." },
      { title: "Choose", copy: "Pick the data allowance and validity that fit." },
      { title: "Connect", copy: "Activate on your phone and go." },
    ]}
    next={[
      { name: "EasyHoli", line: "Trips and shared plans in one place.", href: "/easyholi", image: "/travel.webp", alt: "A sunlit terrace above a coastal old town and the sea", status: "In development" },
      { name: "EasyProperties", line: "A clearer way to discover property.", href: "/easyproperties", image: "/property.webp", alt: "A bright living room with a city skyline beyond the windows", status: "In development" },
      { name: "EasyDesignTech services", line: "The studio that builds all three, available for your project.", href: "/services", image: "/service-devices.webp", alt: "Laptop, tablet and phone screens in a blue studio scene" },
    ]}
    invite={["Going somewhere?", "Stay connected."]} inviteAction="Visit Easylink" inviteHref={site}
  />;
}
