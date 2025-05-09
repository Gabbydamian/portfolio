"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BlogPostEditor } from "@/components/blog-post-editor";
import { useToast } from "@/hooks/use-toast";
import { addNewBlogPost } from "@/actions/blogActions";

export function NewPost() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [cover_img, setCover_img] = useState("");
  const [content, setContent] = useState("");

  const handleSavePost = async () => {
    setIsLoading(true);

    try {
      // This would call a server action to save the post
      await addNewBlogPost({ title, slug, category, cover_img, content });

      toast({
        title: "Post saved",
        description: "Your blog post has been saved successfully.",
      });

      // Reset form after successful save
      setTitle("");
      setSlug("");
      setCategory("");
      setCover_img("");
      setContent("");
    } catch (error) {
      toast({
        title: "Error saving post",
        description:
          error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Create New Post</h2>
      <div className="space-y-4 mb-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="Post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            placeholder="post-slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <select
            id="category"
            className="w-full rounded-md border border-input bg-background px-3 py-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            <option value="development">Development</option>
            <option value="design">Design</option>
            <option value="career">Career</option>
            <option value="personal">Personal</option>
          </select>
        </div>
        <div>
          <Label htmlFor="coverImage">Cover Image URL</Label>
          <Input
            id="coverImage"
            placeholder="https://example.com/image.jpg"
            value={cover_img}
            onChange={(e) => setCover_img(e.target.value)}
          />
        </div>
      </div>
      <div className="mb-4">
        <Label>Content</Label>
        <BlogPostEditor value={content} onChange={setContent} />
      </div>
      <Button onClick={handleSavePost} disabled={isLoading}>
        {isLoading ? "Saving..." : "Save Post"}
      </Button>
    </div>
  );
}
