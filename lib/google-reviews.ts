// Transcribed only from the EasyDesignUK Google review screenshots supplied by
// the site owner on 25 November 2026. The screenshots show a 5.0 rating and
// eight reviews, but only seven distinct review texts are readable. Text after
// a visible "more" link has not been inferred.
export const googleReviewSnapshot = {
  business: "EasyDesignUK",
  rating: 5.0,
  total: 8,
  capturedOn: "24 November 2026",
} as const;

export const googleReviews = [
  { id: -1, name: "OKPALA BLESSING", quote: "I highly recommend EasyDesignUK for their exceptional design services. Their professional, creative, and efficient team", excerpt: true },
  { id: -2, name: "UDEH IFEANYI", quote: "EasyDesignUK consistently demonstrates top-notch professionalism and expertise in every project.", excerpt: true },
  { id: -3, name: "Chioma Getrude", quote: "I must admit that you are good at what you do. Without doubt all the designs and every single job you've done for me is simply a work of art.", excerpt: true },
  { id: -4, name: "Oluwaseun Daniel", quote: "Absolutely professional service! Timely and reliable", excerpt: true },
  { id: -5, name: "beautiful eguagie", quote: "Your design skills are top-notch! You have a keen eye for detail and a talent for creating visually stunning graphics", excerpt: false },
  { id: -6, name: "Eze Somtochukwu", quote: "Tested and trusted. Satisfactory.", excerpt: false },
  { id: -7, name: "ibekwe Collins", quote: "I can't say enough good things about EasyDesignUK! They've nailed every project we've worked on together", excerpt: true },
].map(review => ({ ...review, context: "EasyDesignUK on Google", source: "google" as const }));
