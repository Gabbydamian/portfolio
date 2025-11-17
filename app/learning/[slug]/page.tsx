import { MainLayout } from "@/components/main-layout";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { fetchLearningPostBySlug } from "@/actions/learningActions";
import type { Metadata } from "next";

const LearningPostPageWithSpinner = dynamic(
  () => import("@/components/learning-post"),
  {
    loading: () => (
      <div className="flex justify-center my-32">
        <span className="sr-only">Loading...</span>
        <div className="w-8 h-8 border-4 border-t-transparent border-primary rounded-full animate-spin" />
      </div>
    ),
  }
);

type Params = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = params;
  const result = await fetchLearningPostBySlug(slug);
  const post = result?.post;

  if (!post) {
    return {
      title: "Learning Post Not Found | Damian Gabriel",
      description: "This learning post could not be found.",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${post.title} | Damian Gabriel Learning`,
    description: post.title,
    keywords: [
      "Damian Gabriel",
      "Learning",
      post.title,
      post.topic,
      "Education",
      "Web Development",
      "Programming",
      "Tutorial",
    ].filter(Boolean),
    openGraph: {
      title: `${post.title} | Damian Gabriel Learning`,
      description: post.title,
      url: `https://astridamian.vercel.app/learning/${slug}`,
      siteName: "Damian Gabriel - Learning Hub",
      images: [
        {
          url: post.image || "https://astridamian.vercel.app/og-image.png",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Damian Gabriel Learning`,
      description: post.title,
      images: [post.image || "https://astridamian.vercel.app/og-image.png"],
    },
    alternates: {
      canonical: `https://astridamian.vercel.app/learning/${slug}`,
    },
    category: "Education",
    authors: [{ name: post.author || "Damian Gabriel" }],
    publisher: "Damian Gabriel",
  };
}

export default async function LearningPost({ params }: Params) {
  const { slug } = await params;

  try {
    const result = await fetchLearningPostBySlug(slug);

    const post = result.error ? null : result.post ?? null;

    if (!post) {
      return notFound();
    }

    return (
      <MainLayout>
        {/* Structured data for Article */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: post.title,
              description: post.title,
              image:
                post.image || "https://astridamian.vercel.app/og-image.png",
              author: {
                "@type": "Person",
                name: post.author || "Damian Gabriel",
              },
              publisher: {
                "@type": "Person",
                name: "Damian Gabriel",
                url: "https://astridamian.vercel.app/",
              },
              datePublished: post.date_created,
              dateModified: post.date_modified,
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `https://astridamian.vercel.app/learning/${post.slug}`,
              },
              inLanguage: "en-US",
            }),
          }}
        />
        <LearningPostPageWithSpinner post={post} />
      </MainLayout>
    );
  } catch (error) {
    console.error("Error fetching learning post: ", error);
    return notFound();
  }
}
