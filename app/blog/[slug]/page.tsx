import { MainLayout } from "@/components/main-layout";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { fetchBlogPostBySlug } from "@/actions/blogActions";
import type { Metadata } from "next";

const BlogPageWithSpinner = dynamic(() => import("@/components/Blog"), {
  loading: () => (
    <div className="flex justify-center my-32">
      <span className="sr-only">Loading...</span>
      <div className="w-8 h-8 border-4 border-t-transparent border-primary rounded-full animate-spin" />
    </div>
  ),
});

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
  const result = await fetchBlogPostBySlug(slug);
  const post = result?.blogPost;

  if (!post) {
    return {
      title: "Blog Post Not Found | Damian Gabriel",
      description: "This blog post could not be found.",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${post.title} | Damian Gabriel Blog`,
    description: post.excerpt || post.title,
    keywords: [
      "Damian Gabriel",
      "Blog",
      post.title,
      post.category,
      "Web Development",
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Software Engineering",
    ].filter(Boolean),
    openGraph: {
      title: `${post.title} | Damian Gabriel Blog`,
      description: post.excerpt || post.title,
      url: `https://astridamian.vercel.app/blog/${slug}`,
      siteName: "Damian Gabriel - Blog Post",
      images: [
        {
          url: post.cover_img || "https://astridamian.vercel.app/og-image.png",
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
      title: `${post.title} | Damian Gabriel Blog`,
      description: post.excerpt || post.title,
      images: [post.cover_img || "https://astridamian.vercel.app/og-image.png"],
    },
    alternates: {
      canonical: `https://astridamian.vercel.app/blog/${slug}`,
    },
    category: post.category || "Technology",
    authors: [{ name: post.author }],
    publisher: "Damian Gabriel",
  };
}

export default async function BlogPost({ params }: Params) {
  const { slug } = await params;

  try {
    const result = await fetchBlogPostBySlug(slug);
    // console.log("Result: ", result);

    const post = result.error ? null : result.blogPost ?? null;

    if (!post) {
      return notFound();
    }

    return (
      <MainLayout>
        {/* Structured data for BlogPosting */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: post.title,
              description: post.excerpt || post.title,
              image:
                post.cover_img || "https://astridamian.vercel.app/og-image.png",
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
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `https://astridamian.vercel.app/blog/${post.slug}`,
              },
              inLanguage: "en-US",
            }),
          }}
        />
        <BlogPageWithSpinner post={post} />
      </MainLayout>
    );
  } catch (error) {
    console.error("Error fetching blog post: ", error);
    return notFound();
  }
}
