"use client";

import type React from "react";

import { useState } from "react";
import { MainLayout } from "@/components/main-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BlogPostEditor } from "@/components/blog-post-editor";
import { motion } from "framer-motion";
import Link from "next/link";
import removeMarkdown from "remove-markdown";
import { addNewBlogPost } from "@/actions/blogActions";
import { Breadcrumbs } from "@/components/breadcrumbs";

export default function SubmitBlogPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const excerpt = removeMarkdown(content).slice(0, 60).trim() + "...";
    const approved = false;

    setIsSubmitting(true);
    try {
      await addNewBlogPost({
        title,
        category,
        content,
        excerpt,
        approved,
        name,
        email,
      });
      setIsSubmitted(true);
      setName
      setTitle("");
      setEmail("")
      setCategory("");
      setContent("");
    } catch (error) {
      setIsSubmitted(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <MainLayout>
        <Breadcrumbs />
        <div className="container mx-auto px-4 md:px-24 py-12 mt-24 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-card rounded-lg p-8 text-center"
          >
            <h1 className="text-3xl font-bold mb-4 text-foreground">
              Thank You!
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Your blog post has been submitted for review. We'll notify you
              once it's approved.
            </p>
            <div className="flex justify-center gap-4">
              <Button asChild>
                <Link href="/blog">Back to Blog</Link>
              </Button>
              <Button variant="outline" onClick={() => setIsSubmitted(false)}>
                Submit Another
              </Button>
            </div>
          </motion.div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 md:px-24 py-12 mt-24 max-w-4xl">
        <Breadcrumbs />
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl font-bold mb-4 text-foreground">
            Submit a Blog Post
          </h1>
          <p className="text-muted-foreground">
            Share your knowledge with the community. All submissions are
            reviewed before publishing.
          </p>
        </motion.div>

        <div className="bg-card rounded-lg p-6 border border-border">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground">
                  Your Name
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="John Doe"
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="john@example.com"
                  className="bg-background"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title" className="text-foreground">
                Post Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="An Interesting Blog Title"
                className="bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-foreground">
                Category
              </Label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground"
              >
                <option value="">Select a category</option>
                <option value="development">Development</option>
                <option value="design">Design</option>
                <option value="personal">Personal</option>
                <option value="career">Security</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label className="text-foreground">Content</Label>
              <div className="bg-background border border-border rounded-md">
                <BlogPostEditor value={content} onChange={setContent} />
              </div>
            </div>

            <div className="pt-4">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit for Review"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}
