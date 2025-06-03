import { MainLayout } from "@/components/main-layout";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { fetchBlogPostBySlug } from "@/actions/blogActions";

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
        <BlogPageWithSpinner post={post} />
      </MainLayout>
    );
  } catch (error) {
    console.error("Error fetching blog post: ", error);
    return notFound();
  }
}
