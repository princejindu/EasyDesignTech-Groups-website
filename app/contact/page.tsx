/* eslint-disable @next/next/no-html-link-for-pages -- Full page navigation starts at the top of each destination. */
import type { Metadata } from "next";
import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { EnquiryForm, FacebookContactLink } from "@/components/contact-experience";
import { contact } from "@/lib/contact";
import { Plates, studioServices } from "@/components/page-parts";

export const metadata: Metadata = { title: "Contact | EasyDesignTech", description: "Tell EasyDesignTech about your project, request a tailored quote or ask about Easylink, EasyHoli and EasyProperties." };

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ quote?: string }> }) {
  const isQuote = (await searchParams).quote === "tailored";
  return <div className="site-shell"><SiteHeader /><main id="main" className="contact-page">
    <section className="page-hero" aria-labelledby="page-title">
      <div className="page-title load">
        <nav className="crumbs" aria-label="Breadcrumb"><span><a href="/">Home</a> /</span><span aria-current="page">Contact</span></nav>
        <h1 id="page-title">{isQuote ? <>A quote shaped<br />around your idea.</> : <>Tell us what<br />you’re imagining.</>}</h1>
      </div>
    </section>
    <div className="contact-page-body">
      <div className="contact-ways">
        <a className="contact-way load" style={{ ["--i" as string]: 1 }} href={contact.emailHref}><strong>{contact.email}</strong><span>Email the studio</span></a>
        <a className="contact-way accent load" style={{ ["--i" as string]: 2 }} href={contact.whatsapp} target="_blank" rel="noopener noreferrer"><strong>Message the studio</strong><span>On WhatsApp</span></a>
        <div className="contact-way load" style={{ ["--i" as string]: 3 }}><strong>Birmingham, England</strong><span>Where we are</span></div>
        <div className="contact-way facebook-way load" style={{ ["--i" as string]: 4 }}><FacebookContactLink /></div>
      </div>
      <div className="contact-form-wrap load" style={{ ["--i" as string]: 2 }}>
        <h2>{isQuote ? "Request a tailored quote" : "Send a project enquiry"}</h2>
        <p>{isQuote ? "Tell us about your goals and timing. We will review your brief and follow up with the right scope and next steps." : "Share the idea, the challenge or the service you need. We read every enquiry and reply by email."}</p>
        <EnquiryForm />
      </div>
    </div>
    <Plates title="Not sure what you need yet?" text="Start with the service closest to your idea. Each page explains what is included and where prices start." items={studioServices} />
  </main><SiteFooter invite={["Rather talk", "it through?"]} action="WhatsApp the studio" href={contact.whatsapp} /></div>;
}
