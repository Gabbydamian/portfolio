import { fetchBlogPosts, deleteBlogPost } from "@/actions/blogActions";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function BlogPostsPage() {
  const publishedResult = await fetchBlogPosts();
  const posts = publishedResult.error ? [] : publishedResult.blogs ?? [];

  async function handleDelete(id: string) {
    "use server";
    await deleteBlogPost(id);
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Blog Posts</h1>
      {posts.length === 0 ? (
        <div className="text-muted-foreground">No blog posts yet.</div>
      ) : (
        <div className="grid gap-4">
          {posts.map((post: any) => (
            <Card
              key={post.id}
              className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2"
            >
              <div>
                <div className="font-semibold">{post.title}</div>
                <div className="text-sm text-muted-foreground">
                  By {post.author || "Anonymous"}
                </div>
                <div className="text-xs text-muted-foreground">
                  {new Date(post.date_created).toLocaleDateString()}
                </div>
              </div>
              <div className="flex gap-2">
                <Link href={`/dashboard/posts/${post.id}/edit`}>
                  <Button type="button" variant="outline">
                    Edit
                  </Button>
                </Link>
                <form action={handleDelete.bind(null, post.id)}>
                  <Button type="submit" variant="destructive">
                    Delete
                  </Button>
                </form>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
