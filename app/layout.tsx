import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EasyDesignTech | Websites, apps, brands and AI from Birmingham",
  description: "EasyDesignTech is a Birmingham design and technology studio. We design and build websites, apps, brands, content and AI workflows, and run our own ventures: Easylink eSIM, EasyHoli and EasyProperties.",
  icons: {
    icon: "/brand-icon.png",
    shortcut: "/brand-icon.png",
    apple: "/brand-icon.png",
  },
  openGraph: {
    title: "EasyDesignTech",
    description: "Websites, apps, brands, content and AI workflows, designed and built in Birmingham.",
    images: ["/business-globe.webp"],
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#0e121c" };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js');setTimeout(function(){if(!window.__edtMotion){document.querySelectorAll('.rv').forEach(function(e){e.classList.add('in')})}},2500)" }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
