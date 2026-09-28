import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { SocialProof } from "@/components/social-proof";

export const metadata: Metadata = { title: "Client voices | EasyDesignTech", description: "See approved client feedback and share your experience with EasyDesignTech." };

export default function ReviewsPage() {
  return <div className="site-shell"><SiteHeader /><main className="reviews-page"><SocialProof /><section className="reviews-next"><div className="container"><h2>Have something in mind?</h2><Link href="/contact" className="button button-light">Start a conversation <ArrowRight size={18} aria-hidden="true" /></Link></div></section></main><SiteFooter /></div>;
}
