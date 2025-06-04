import { MainLayout } from "@/components/main-layout";
import Blogs from "@/components/Blogs";
import { fetchBlogPosts } from "@/actions/blogActions";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Damian Gabriel - Full-Stack Developer & IT Expert",
  description:
    "Read the latest articles and insights from Damian Gabriel on web development, React, Next.js, TypeScript, and more. Stay updated with best practices, tutorials, and industry trends.",
  keywords: [
    "Damian Gabriel",
    "Blog",
    "Web Development",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Frontend",
    "Backend",
    "Software Engineering",
    "Programming",
    "Tutorials",
    "Tech Articles",
  ],
  openGraph: {
    title: "Blog | Damian Gabriel - Full-Stack Developer & IT Expert",
    description:
      "Latest blog posts and technical articles by Damian Gabriel. Explore web development, best practices, and more.",
    url: "https://astridamian.vercel.app/blog",
    siteName: "Damian Gabriel - Portfolio Blog",
    images: [
      {
        url: "https://astridamian.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Damian Gabriel Blog - Technical Articles and Insights",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Damian Gabriel - Full-Stack Developer & IT Expert",
    description:
      "Latest blog posts and technical articles by Damian Gabriel. Explore web development, best practices, and more.",
    images: ["https://astridamian.vercel.app/og-image.png"],
  },
  alternates: {
    canonical: "https://astridamian.vercel.app/blog",
  },
  category: "Technology",
};

export default async function BlogsPage() {
  // const result = await fetchBlogPosts("approved");
  // // console.log("Result: ", result);
  // const blogs = result.error ? [] : result.blogs ?? [];
  // const error = result.error ? "Failed to fetch projects" : null;

  // if (result.error) {
  //   console.error("Error fetching blogs: ", result.error);
  // }

  // console.log("Blogs: ", blogs);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["blogs"],
    queryFn: () => fetchBlogPosts("approved"),
  });

  return (
    <MainLayout>
      {/* Structured data for Blog index */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "Damian Gabriel Blog",
            url: "https://astridamian.vercel.app/blog",
            description:
              "Read the latest articles and insights from Damian Gabriel on web development, React, Next.js, TypeScript, and more.",
            publisher: {
              "@type": "Person",
              name: "Damian Gabriel",
              url: "https://astridamian.vercel.app/",
            },
            inLanguage: "en-US",
          }),
        }}
      />
      {/* <Blogs fetchedBlogs={blogs} blogsError={error} /> */}
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Blogs />
      </HydrationBoundary>
    </MainLayout>
  );
}
