import type { Metadata } from "next";
import { Source_Serif_4, IBM_Plex_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lead-qualification assistant for voltade.com — built on Volty",
  description:
    "An independent demo built by Haris Waqar: a Volty-powered chat that qualifies leads for voltade.com, scores them, and routes them to a plan, a case study, or the team.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sourceSerif.variable} ${plexSans.variable} antialiased`}>
        {children}
        <Script
          async
          src="https://volty.voltade.com/widget/v1.js"
          data-widget-id="lzzt5w3u2je56oom9crg4"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
