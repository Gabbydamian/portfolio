"use client";

import { Button } from "@/components/ui/button";
import { Edit, Trash, Plus } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import { Blog } from "@/app/types/blog";
import { deleteBlogPost } from "@/actions/blogActions";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function BlogPosts({ blogs }: { blogs: Blog[] }) {
  const router = useRouter();

  const displayPosts: Blog[] = blogs ?? [];

  const handleDelete = async (id: string) => {
    console.log(id);
    const { error } = await deleteBlogPost(id);

    if (error) {
      toast.error("Something went wrong...", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      console.error("Deletion failed");
      return;
    }
    toast.success("Blogpost deleted Succefully", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    router.refresh();
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <ToastContainer />
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
