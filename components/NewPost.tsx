"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BlogPostEditor } from "@/components/blog-post-editor";
import { ToastContainer, toast } from "react-toastify";
import { addNewBlogPost } from "@/actions/blogActions";
import removeMarkdown from "remove-markdown";

interface PostFormData {
  title: string;
  category: string | null;
  cover_img: string | null;
  content: string;
  excerpt: string;
}

interface PostFormProps {
  initialData?: Partial<PostFormData>;
  onSubmit: (data: PostFormData) => Promise<void>;
  submitLabel?: string;
}

export function PostForm({
  initialData,
  onSubmit,
  submitLabel = "Save Post",
}: PostFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [coverImg, setCoverImg] = useState(initialData?.cover_img || "");
  const [content, setContent] = useState(initialData?.content || "");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setCategory(initialData.category || "");
      setCoverImg(initialData.cover_img || "");
      setContent(initialData.content || "");
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const excerpt = removeMarkdown(content).slice(0, 60).trim() + "..." || "";
    await onSubmit({ title, category, cover_img: coverImg, content, excerpt });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-background/60 backdrop-blur border border-border shadow-lg rounded-lg p-6 space-y-6"
    >
      <ToastContainer theme="dark" />
      <h2 className="text-2xl font-semibold text-foreground">{submitLabel}</h2>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-foreground">
            Title
          </Label>
          <Input
            id="title"
            name="title"
            placeholder="Post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="bg-background/80 border-border"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category" className="text-foreground">
            Category
          </Label>
          <select
            id="category"
            name="category"
            className="w-full rounded-md border border-border bg-background/80 px-3 py-2 text-foreground"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            <option value="development">Development</option>
            <option value="design">Design</option>
            <option value="personal">Personal</option>
            <option value="career">Security</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="cover_img" className="text-foreground">
            Cover Image URL
          </Label>
          <Input
            id="cover_img"
            name="cover_img"
            placeholder="https://example.com/image.jpg"
            value={coverImg}
            onChange={(e) => setCoverImg(e.target.value)}
            className="bg-background/80 border-border"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label className="text-foreground">Content</Label>
        <div className="bg-background/80 border border-border rounded-md">
          <BlogPostEditor value={content} onChange={setContent} />
        </div>
      </div>
      <Button type="submit" className="w-full sm:w-auto">
        {submitLabel}
      </Button>
    </form>
  );
}

export function NewPost() {
  const handleCreate = async (data: PostFormData) => {
    try {
      await addNewBlogPost({ ...data, approved: true });
      toast.success("New post added successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
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
    }
  };
  return <PostForm onSubmit={handleCreate} submitLabel="Create New Post" />;
}
