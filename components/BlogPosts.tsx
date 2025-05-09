"use client";

import { Button } from "@/components/ui/button";
import { Edit, Trash, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Blog } from "@/app/types/blog";
import { deleteBlogPost } from "@/actions/blogActions";
import { useRouter } from "next/navigation";

export function BlogPosts({ blogs }: { blogs: Blog[] }) {
  const { toast } = useToast();
  const router = useRouter();

  // If no posts are provided, use these sample posts
  const displayPosts: Blog[] = blogs ?? [];

  const handleDelete = async (id: string) => {
    console.log(id);
    const { error } = await deleteBlogPost(id);

    if (error) {
      toast({
        title: "Error occured",
        description: "The blog post could not be deleted.",
      });
      console.error("Deletion failed");
      return;
    }
    toast({
      title: "Blog Post deleted",
      description: "The blog post has been deleted successfully.",
    });
    router.refresh();
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Your Blog Posts</h2>
        {/* <Button size="sm">
          <Plus className="w-4 h-4 mr-1" /> Add New
        </Button> */}
      </div>
      <div className="space-y-4">
        {displayPosts.map((post, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-4 bg-gray-900 rounded-lg"
          >
            <span>{post.title}</span>
            <div className="space-x-2">
              <Button variant="outline" size="sm">
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
