import { env } from "cloudflare:workers";

export type Enquiry = { id: number; name: string; email: string; phone: string; interest: string; message: string; status: string; created_at: string };
export type Review = { id: number; name: string; context: string; quote: string; published: number; created_at: string };

export function database() {
  if (!env.DB) throw new Error("The enquiry database is unavailable");
  return env.DB;
}

export function isSiteOwner(request: Request) {
  const userId = request.headers.get("oai-authenticated-user-id");
  const ownerId = env.SITE_OWNER_USER_ID?.trim();
  return Boolean(ownerId && userId && userId === ownerId);
}
