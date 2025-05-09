import { MainLayout } from "@/components/main-layout";
import Blogs from "@/components/Blogs";
import { fetchBlogPosts } from "@/actions/blogActions";

export default async function BlogsPage() {
  const result = await fetchBlogPosts("approved");
  // console.log("Result: ", result);
  const blogs = result.error ? [] : result.blogs ?? [];
  const error = result.error ? "Failed to fetch projects" : null;

  if (result.error) {
    console.error("Error fetching blogs: ", result.error);
  }

  // console.log("Blogs: ", blogs);

  return (
    <MainLayout>
      <Blogs fetchedBlogs={blogs} blogsError={error} />
    </MainLayout>
  );
}
