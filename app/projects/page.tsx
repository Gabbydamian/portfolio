import { MainLayout } from "@/components/main-layout";
import { fetchProjects } from "@/actions/projectActions";
import { Projects } from "@/components/Projects";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { HydrationBoundary } from "@tanstack/react-query";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Damian Gabriel - Full-Stack Developer & IT Expert",
  description:
    "Explore Damian Gabriel's portfolio projects, showcasing expertise in React, Next.js, TypeScript, and scalable web solutions. Discover innovative applications and technical achievements.",
  keywords: [
    "Damian Gabriel",
    "Projects",
    "Portfolio",
    "Web Development",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Frontend",
    "Backend",
    "Software Engineering",
    "Technical Solutions",
  ],
  openGraph: {
    title: "Projects | Damian Gabriel - Full-Stack Developer & IT Expert",
    description:
      "Portfolio projects by Damian Gabriel. Explore innovative web applications and technical solutions.",
    url: "https://astridamian.vercel.app/projects",
    siteName: "Damian Gabriel - Portfolio Projects",
    images: [
      {
        url: "https://astridamian.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Damian Gabriel Projects - Portfolio of Web Applications and Solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Damian Gabriel - Full-Stack Developer & IT Expert",
    description:
      "Portfolio projects by Damian Gabriel. Explore innovative web applications and technical solutions.",
    images: ["https://astridamian.vercel.app/og-image.png"],
  },
  alternates: {
    canonical: "https://astridamian.vercel.app/projects",
  },
  category: "Technology",
};

export default async function ProjectsPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  return (
    <MainLayout>
      {/* Structured data for Projects CollectionPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Damian Gabriel Projects",
            url: "https://astridamian.vercel.app/projects",
            description:
              "Explore Damian Gabriel's portfolio projects, showcasing expertise in React, Next.js, TypeScript, and scalable web solutions.",
            publisher: {
              "@type": "Person",
              name: "Damian Gabriel",
              url: "https://astridamian.vercel.app/",
            },
            inLanguage: "en-US",
          }),
        }}
      />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Projects />
      </HydrationBoundary>
    </MainLayout>
  );
}
