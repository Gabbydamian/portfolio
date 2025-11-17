import { MainLayout } from "@/components/main-layout";
import { fetchLearningPosts, getAllTopics } from "@/actions/learningActions";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import type { Metadata } from "next";
import { LearningPageClient } from "./components/learning-page-client";
import { createClient } from "@/utils/supabase/supabase";

export const metadata: Metadata = {
  title: "Learning | Damian Gabriel - Web Development Courses & Tutorials",
  description:
    "Explore structured learning content on web development, programming concepts, and technical topics. Learn from comprehensive guides, tutorials, and educational resources.",
  keywords: [
    "Damian Gabriel",
    "Learning",
    "Courses",
    "Tutorials",
    "Web Development",
    "Programming",
    "Education",
    "React",
    "Next.js",
    "JavaScript",
  ],
  openGraph: {
    title: "Learning | Damian Gabriel - Web Development Courses & Tutorials",
    description:
      "Explore structured learning content on web development and programming. Access comprehensive guides and tutorials.",
    url: "https://astridamian.vercel.app/learning",
    siteName: "Damian Gabriel - Portfolio Learning",
    images: [
      {
        url: "https://astridamian.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Damian Gabriel Learning - Courses and Educational Content",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Learning | Damian Gabriel - Web Development Courses & Tutorials",
    description:
      "Explore structured learning content on web development and programming.",
    images: ["https://astridamian.vercel.app/og-image.png"],
  },
  alternates: {
    canonical: "https://astridamian.vercel.app/learning",
  },
  category: "Education",
};

export default async function LearningPage() {
  const queryClient = new QueryClient();

  // Fetch initial posts and topics
  const postsResult = await fetchLearningPosts();
  const topicsResult = await getAllTopics();

  const posts = postsResult.error ? [] : postsResult.posts ?? [];
  const topics = topicsResult.topics ?? [];

  // Check authentication on the server
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const isAuthenticated = !!session;

  return (
    <MainLayout>
      {/* Structured data for Learning page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationEvent",
            name: "Damian Gabriel Learning Hub",
            url: "https://astridamian.vercel.app/learning",
            description:
              "Comprehensive learning resources and tutorials on web development and programming.",
            provider: {
              "@type": "Person",
              name: "Damian Gabriel",
              url: "https://astridamian.vercel.app/",
            },
            inLanguage: "en-US",
          }),
        }}
      />

      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Learning Hub</h1>
          <p className="text-lg text-muted-foreground">
            Explore structured learning content organized by topic. Dive deep
            into web development, programming concepts, and technical skills.
          </p>
        </div>

        <HydrationBoundary state={dehydrate(queryClient)}>
          <LearningPageClient
            initialPosts={posts}
            topics={topics}
            isAuthenticated={isAuthenticated}
          />
        </HydrationBoundary>
      </div>
    </MainLayout>
  );
}
