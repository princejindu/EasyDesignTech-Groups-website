// Testimonials supplied directly by the site owner on 25 November 2026.
// These are separate from the EasyDesignUK Google review snapshot.
export const clientTestimonials = [
  {
    id: -101,
    name: "Helane-Mau Home Care Services",
    quote: "Easydesigntech built us a website that feels warm and professional, which matters when families are trusting us with someone they love. It's easy to navigate, works well on mobile, and we've seen more enquiries since launch. Prince was patient, responsive and really understood our sector.",
  },
  {
    id: -102,
    name: "Renew Clean Group",
    quote: "We needed a site that looked sharp and made booking simple, and Easydesigntech delivered both. Clean design, fast loading, and customers say it's really easy to get a quote. Great communication from start to finish.",
  },
  {
    id: -103,
    name: "A-Z Cybersecurity",
    quote: "Easydesigntech gave our brand a confident, modern identity that people trust instantly, and trust is everything in cybersecurity. The logo, colours and overall look made us stand out from competitors straight away. Amazing branding work.",
  },
].map(testimonial => ({ ...testimonial, context: "", source: "direct" as const, excerpt: false }));
