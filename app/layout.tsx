import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EasyDesignTech | Design, build and grow what comes next",
  description: "Explore EasyDesignTech services and the EasyProperties, EasyHoli and Easylink eSIM businesses.",
  icons: {
    icon: "/brand-icon.png",
    shortcut: "/brand-icon.png",
    apple: "/brand-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head><link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" /><link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700;800&display=swap" rel="stylesheet" /></head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
