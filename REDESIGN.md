# Redesign branch (`redesign-monument`)

This branch holds the redesigned EasyDesignTech Groups website. It is kept separate from the original site on `main`.

- **Original site:** `main` (last commit `ace3e79`, "Add tailored quote flow and compact contact footer"). Not changed by this branch.
- **Redesign:** `redesign-monument`. Merge it into `main` only when you are ready to publish it.

## What is different from the original

### Look and feel
- The company name is the centrepiece of the home page: set huge, cropped by the screen edges, and repeated at the foot of every page.
- One typeface (Geist). Navy, off-white, a brand blue field and lime for the main actions only.
- Removed the small capital labels above headings, the 01 / 02 numbering, the italic serif accent words and the glassy panels.

### Home page, rebuilt
- A grid of tiles at the top: the name, page links, a large picture, starting prices and a "Start a project" tile.
- A moving banner with Birmingham's motto, "Forward".
- A services panel with tabs.
- A "What we make" list: each name changes the picture as you scroll.
- A live price picker: choose a package and see its starting price and what it includes, with a quote button.
- Four full-screen steps: Listen, Shape, Build, Grow.
- A section on our own ventures, large contact lines and a closing invitation.

### Every other page
- One shared layout for services, the four service pages, pricing, businesses, Easylink, EasyHoli, EasyProperties, about, contact and reviews.
- Added to each service page: an FAQ, a starting-price list, a "how the work takes shape" section and links to the other services.
- Pricing data now lives in one place (`lib/packages.ts`) and is shared by the home page, the pricing page and the service pages.
- **Reviews:** the fictional "sample client" testimonials are gone. Only approved real reviews appear, or a "be the first to review" prompt.
- The contact form labels are in plain sentence case.

### Behaviour kept from the original
The enquiry form, the tailored quote flow, the customer care chat, social links, the review form and the private owner studio all work as before.

## Files
- **New:** `components/page-parts.tsx`, `components/service-page.tsx`, `components/venture-page.tsx`, `lib/packages.ts`, `app/legacy.css` (form, chat and studio styles carried over).
- **Removed:** `components/service-spectrum.tsx`.
- **Rewritten:** `app/globals.css`, `app/page.tsx`, `components/site-shell.tsx` and every page under `app/`.

## Before publishing
- Confirm the Easylink "190+ destinations" figure.
- Check the new FAQ answers.
- Add your other social profiles in the owner studio.
- The pictures are the original site's images; none were added.
