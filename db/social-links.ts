export const socialPlatforms = ["facebook", "instagram", "snapchat", "tiktok", "x", "linkedin", "youtube"] as const;
export type SocialPlatform = (typeof socialPlatforms)[number];

export const defaultSocialLinks: Record<SocialPlatform, string> = {
  facebook: "https://www.facebook.com/p/EasyDesigntech-100064087063397/",
  instagram: "",
  snapchat: "",
  tiktok: "",
  x: "",
  linkedin: "",
  youtube: "",
};

const hosts: Record<SocialPlatform, string[]> = {
  facebook: ["facebook.com", "fb.com"],
  instagram: ["instagram.com"],
  snapchat: ["snapchat.com"],
  tiktok: ["tiktok.com"],
  x: ["x.com", "twitter.com"],
  linkedin: ["linkedin.com"],
  youtube: ["youtube.com", "youtu.be"],
};

export function isValidSocialUrl(platform: SocialPlatform, value: string) {
  if (!value) return true;
  if (value.length > 500) return false;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password && hosts[platform].some(host => url.hostname === host || url.hostname.endsWith(`.${host}`));
  } catch { return false; }
}

export function mergeSocialLinks(settings: { key: string; value: string }[]) {
  const links = { ...defaultSocialLinks };
  for (const row of settings) {
    const platform = row.key.replace(/^social_/, "") as SocialPlatform;
    if (socialPlatforms.includes(platform) && isValidSocialUrl(platform, row.value)) links[platform] = row.value;
  }
  return links;
}
