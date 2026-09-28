import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EasyDesignTech | Building the future today",
  description: "Explore EasyDesignTech services and the EasyProperties, EasyHoli and Easylink eSIM businesses.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
