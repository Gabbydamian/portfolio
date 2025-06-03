"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit, Trash, Plus } from "lucide-react";
import { toast } from "sonner";
import { Blog } from "@/app/types/blog";
import { deleteBlogPost, updateBlogPost } from "@/actions/blogActions";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PostForm } from "./NewPost";

export function BlogPosts({ blogs }: { blogs: Blog[] }) {
  const router = useRouter();
  const [editingPost, setEditingPost] = useState<Blog | null>(null);

  const displayPosts: Blog[] = blogs ?? [];

  const handleDelete = async (id: string) => {
    const { error } = await deleteBlogPost(id);

    if (error) {
      toast.error("Something went wrong...");
      console.error("Deletion failed");
      return;
    }
    toast.success("Blogpost deleted Successfully");
    router.refresh();
  };

  const handleEdit = async (formData: any) => {
    if (!editingPost) return;

    const { error } = await updateBlogPost(editingPost.id, formData);

    if (error) {
      toast.error("Failed to update post");
      return;
    }

    toast.success("Post updated successfully");

    setEditingPost(null);
    router.refresh();
  };

  if (editingPost) {
    return (
      <div className="bg-background/60 backdrop-blur border border-border shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edit Post</h2>
          <Button variant="outline" onClick={() => setEditingPost(null)}>
            Cancel
          </Button>
        </div>
        <PostForm
          initialData={editingPost}
          onSubmit={handleEdit}
          submitLabel="Update Post"
        />
      </div>
    );
  }

  return (
    <div className="bg-background/60 backdrop-blur border border-border shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Your Blog Posts</h2>
      </div>
      <div className="space-y-4">
        {displayPosts.map((post, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-4 bg-background/80 backdrop-blur border border-border rounded-lg"
          >
            <span>
              <Link
                href={`/blog/${post.slug}`}
                target="__blank"
                className="hover:underline transition-all duration-500"
              >
                {post.title}
              </Link>
            </span>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditingPost(post)}
              >
                <Edit className="w-4 h-4 mr-1" /> Edit
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(post.id)}
              >
                <Trash className="w-4 h-4 mr-1" /> Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
