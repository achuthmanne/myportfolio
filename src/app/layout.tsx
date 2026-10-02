import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

// --------------------------------------------------------
// Luxi Sans Setup
// --------------------------------------------------------
const luxiSans = localFont({
  src: [
    {
      path: "../../public/fonts/LuxiSans-Regular.ttf",
      weight: "400",
      style: "normal",
    }
  ],
  variable: "--font-luxi-sans",
});

export const metadata: Metadata = {
  title: "Creative Portfolio",
  description: "A high-performance creative portfolio built with Next.js, Motion, GSAP, and Three.js",
};

import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${luxiSans.variable}`} 
    >
      <body className="min-h-full flex flex-col font-sans bg-bg-primary text-text-primary selection:bg-accent-rich selection:text-white">
        <SmoothScroll>
          <Navbar />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
