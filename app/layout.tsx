import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryProvider } from "./providers/queryProvider";
import { LocationProvider } from "@/app/contexts/location-context";
// import { SpotifyProvider } from "@/app/contexts/spotify-context";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "sonner";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Damian Gabriel | Full-Stack Developer & IT Expert",
  keywords: [
    // Primary identity keywords
    "Damian Gabriel",
    "Full Stack Developer",
    "Software Engineer",
    "IT Expert",

    // Technical expertise (long-tail keywords)
    "React performance optimization",
    "Next.js application development",
    "TypeScript web architecture",
    "Modern JavaScript frameworks",
    "Frontend development best practices",
    "Backend API design",
    "Web application optimization",

    // Solution-focused keywords
    "Custom web solutions",
    "Scalable application development",
    "User experience optimization",
    "Technical consulting",
    "Code quality improvement",

    // Industry-specific terms
    "SaaS development",
    "E-commerce solutions",
    "Progressive web apps",
    "Mobile-responsive design",
    "Database optimization",
  ],

  description:
    "Discover innovative web development solutions through Damian Gabriel's expertise in React, Next.js, and TypeScript. Explore performance-optimized applications, architectural insights, and proven methodologies that transform complex technical challenges into elegant, scalable solutions. Specializing in full-stack development with a focus on user experience and code quality.",

  openGraph: {
    title: "Damian Gabriel | Full-Stack Developer & IT Expert",
    description:
      "Expert full-stack developer specializing in React, Next.js, and TypeScript. Delivering high-performance web applications and scalable technical solutions that drive business growth and exceptional user experiences.",
    url: "https://astridamian.vercel.app/",
    siteName: "Damian Gabriel - Portfolio",
    images: [
      {
        url: "https://astridamian.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Damian Gabriel - Full-Stack Developer Portfolio showcasing modern web applications and technical expertise",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Damian Gabriel | Full-Stack Developer & Technical Solutions",
    description:
      "Innovative web development expertise in React, Next.js & TypeScript. Proven track record of delivering scalable applications and optimized user experiences.",
    images: ["https://astridamian.vercel.app/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Enhanced metadata fields
  generator: "Next.js",
  applicationName: "Damian Gabriel Technical Portfolio",

  authors: [
    {
      name: "Damian Gabriel",
      url: "https://astridamian.vercel.app/",
    },
  ],

  creator: "Damian Gabriel",
  publisher: "Damian Gabriel",

  // Additional SEO enhancements
  alternates: {
    canonical: "https://astridamian.vercel.app/",
  },

  // Category classification
  category: "Technology",

  // Enhanced verification and indexing
  verification: {
    // Add your verification codes here when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },

  // Structured data hints (implement JSON-LD in components)
  other: {
    "application-name": "Damian Gabriel Portfolio",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Damian Gabriel",
    "format-detection": "telephone=no",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Enhanced favicon setup */}
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

        {/* Enhanced meta tags for better crawling */}
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="google-site-verification"
          content="12Vzs0o5A8FksNuRb6tb1K7SMLkHUuBhFtTjTjh65YI"
        />

        {/* Structured data - implement this in a separate component */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Damian Gabriel",
              jobTitle: "Full-Stack Developer",
              description:
                "Expert full-stack developer specializing in React, Next.js, and TypeScript",
              url: "https://astridamian.vercel.app/",
              sameAs: [
                "https://github.com/Gabbydamian",
                "https://linkedin.com/in/gabriel-damian-43309423b",
                "https://twitter.com/astridesigns_",
              ],
              knowsAbout: [
                "React",
                "Next.js",
                "TypeScript",
                "JavaScript",
                "Web Development",
                "Software Engineering",
                "Frontend Development",
                "Backend Development",
                "API Design",
                "Information Technology",
                "Web Architecture",
                "Application Security",
              ],
            }),
          }}
        />
      </head>
      <body className={montserrat.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <LocationProvider>
            {/* <SpotifyProvider>
            </SpotifyProvider> */}
            <QueryProvider>{children}</QueryProvider>
          </LocationProvider>
          <Analytics />
          <SpeedInsights />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
