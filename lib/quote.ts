export const quotePackages = {
  "Website Launch": "Web and apps",
  "Website Growth": "Web and apps",
  "Product First Build": "Web and apps",
  "Social Presence": "Social media and content",
  "Workflow Starter": "AI automation and data",
  "Short Video": "Social media and content",
} as const;

export function serviceForPackage(name: string): string | undefined {
  return Object.prototype.hasOwnProperty.call(quotePackages, name)
    ? quotePackages[name as keyof typeof quotePackages]
    : undefined;
}
