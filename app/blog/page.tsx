import { MainLayout } from "@/components/main-layout";
import Blogs from "@/components/Blogs";
import { fetchBlogPosts } from "@/actions/blogActions";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";

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
      {/* <Blogs fetchedBlogs={blogs} blogsError={error} /> */}
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Blogs />
      </HydrationBoundary>
    </MainLayout>
  );
}
