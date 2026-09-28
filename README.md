# EasyDesignTech Groups website

The EasyDesignTech hub connects the studio's services with Easylink eSIM, EasyHoli and EasyProperties. It includes dedicated service and business pages, an enquiry form, reviews, a guided customer care chat and a private owner studio.

## Run locally

Use Node.js 22.13 or later and pnpm.

```sh
pnpm install
pnpm dev
```

Check the source with `pnpm lint` and `pnpm build`.

The project uses Vinext on Cloudflare Workers. D1 is bound as `DB` for enquiries, reviews, social links and chat. Apply the migrations in `drizzle/` to a new database before using those features.

## Configuration

Set `SITE_OWNER_USER_ID` as a secret in the hosting environment. It must match the authenticated account user ID allowed to manage the private studio. If it is missing, studio API access is denied. Never commit its value.

The optional `OPENAI_API_KEY` runtime secret enables AI responses in customer care chat. Without it, the chat uses a guided intake and human handoff. Current contact details are in `lib/contact.ts`.

## Deployment

The live Site is deployed privately through Sites. Its project identifier and D1 binding are recorded in `.openai/hosting.json`. Deploying the source to another provider needs equivalent Worker, D1 and authentication configuration.

The repository contains source and static assets. Environment files, runtime data and generated build output are ignored.
