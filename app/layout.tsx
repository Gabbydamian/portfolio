import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryProvider } from "./providers/queryProvider";
import { LocationProvider } from "@/app/contexts/location-context";
import { SpotifyProvider } from "@/app/contexts/spotify-context";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "sonner";
// import { ThemeTransitionOverlay } from "@/components/theme-transition-overlay";

// const inter = Inter({ subsets: ["latin"] })
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Damian Gabriel",
  description: "Damian's portfolio and blog",
  generator: "Next.js",
  authors: [
    {
      name: "Damian Gabriel",
      url: "https://astridamian.vercel.app/",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={montserrat.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <LocationProvider>
            <SpotifyProvider>
              <QueryProvider>{children}</QueryProvider>
            </SpotifyProvider>
          </LocationProvider>
          <Analytics />
          <SpeedInsights />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
