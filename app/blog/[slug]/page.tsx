import { MainLayout } from "@/components/main-layout";
import { notFound } from "next/navigation";
import BlogPage from "@/components/Blog";
import { fetchBlogPostBySlug } from "@/actions/blogActions";

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
        <BlogPage post={post} />
      </MainLayout>
    );
  } catch (error) {
    console.error("Error fetching blog post: ", error);
    return notFound();
  }
}
