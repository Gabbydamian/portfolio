import type { Metadata } from "next";
import AboutClient from "../../components/about-client";

export const metadata: Metadata = {
  title: "About | Damian Gabriel - Full-Stack Developer & Technical Architect",
  description:
    "Learn more about Damian Gabriel, a passionate full-stack developer and technical architect specializing in React, Next.js, and TypeScript. Discover his background, skills, interests, and professional journey.",
  keywords: [
    "Damian Gabriel",
    "About",
    "Full-Stack Developer",
    "Technical Architect",
    "Web Development",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Software Engineering",
    "Portfolio",
    "Personal Story",
  ],
  openGraph: {
    title:
      "About | Damian Gabriel - Full-Stack Developer & Technical Architect",
    description:
      "Learn more about Damian Gabriel, his skills, experience, and journey as a web developer.",
    url: "https://astridamian.vercel.app/about",
    siteName: "Damian Gabriel - About",
    images: [
      {
        url: "https://astridamian.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "About Damian Gabriel - Full-Stack Developer & Technical Architect",
      },
    ],
    locale: "en_US",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "About | Damian Gabriel - Full-Stack Developer & Technical Architect",
    description:
      "Learn more about Damian Gabriel, his skills, experience, and journey as a web developer.",
    images: ["https://astridamian.vercel.app/og-image.png"],
  },
  alternates: {
    canonical: "https://astridamian.vercel.app/about",
  },
  category: "Technology",
};

export default function AboutPage() {
  return <AboutClient />;
}
