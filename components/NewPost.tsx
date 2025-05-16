"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BlogPostEditor } from "@/components/blog-post-editor";
import { ToastContainer, toast } from "react-toastify";
import { addNewBlogPost } from "@/actions/blogActions";
import removeMarkdown from "remove-markdown";

export function NewPost() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [coverImg, setCoverImg] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const excerpt = removeMarkdown(content).slice(0, 60).trim() + "...";
    const approved = true;

    try {
      await addNewBlogPost({
        title,
        category,
        cover_img: coverImg,
        content,
        excerpt,
        approved,
      });

      setTitle("");
      setCategory("");
      setCoverImg("");
      setContent("");
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

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg p-6">
      <ToastContainer />
      <h2 className="text-xl font-semibold mb-4">Create New Post</h2>
      <div className="space-y-4 mb-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            placeholder="Post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <select
            id="category"
            name="category"
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
          <Label htmlFor="cover_img">Cover Image URL</Label>
          <Input
            id="cover_img"
            name="cover_img"
            placeholder="https://example.com/image.jpg"
            value={coverImg}
            onChange={(e) => setCoverImg(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-4">
        <Label>Content</Label>
        <BlogPostEditor value={content} onChange={setContent} />
      </div>

      <Button type="submit">Save Post</Button>
    </form>
  );
}
