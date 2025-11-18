"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageUpload } from "@/components/image-upload";
import { MDXEditorComponent } from "@/components/mdx-editor";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { TopicSelector } from "@/components/topic-selector";
import { useTheme } from "next-themes";
import { toast } from "sonner";

interface DashboardLearningPostFormProps {
  initialValues?: {
    title?: string;
    topic?: string;
    image?: string;
    content?: string;
  };
  onSubmit: (values: any) => Promise<void>;
  loading?: boolean;
  mode?: "add" | "edit";
  topics?: string[];
}

export function DashboardLearningPostForm({
  initialValues = {},
  onSubmit,
  loading,
  mode = "add",
  topics = [],
}: DashboardLearningPostFormProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const [values, setValues] = useState({
    title: initialValues.title || "",
    topic: initialValues.topic || "",
    image: initialValues.image || "",
    content: initialValues.content || "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [imageError, setImageError] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
  }

  function handleContentChange(val: string) {
    setValues((v) => ({ ...v, content: val }));
  }

  function handleTopicChange(topic: string) {
    setValues((v) => ({ ...v, topic }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!values.title.trim()) {
      toast.error("Title is required");
      return;
    }

    if (!values.topic.trim()) {
      toast.error("Topic is required");
      return;
    }

    if (!values.content.trim()) {
      toast.error("Content is required");
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit(values);
      if (mode === "add") {
        toast.success("Learning post created successfully!");
        setValues({
          title: "",
          topic: "",
          image: "",
          content: "",
        });
      } else {
        toast.success("Learning post updated successfully!");
      }
    } catch (error) {
      toast.error("Failed to save learning post");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title *</Label>
        <Input
          id="title"
          name="title"
          value={values.title}
          onChange={handleChange}
          placeholder="Enter post title"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="topic">Topic *</Label>
        <TopicSelector
          value={values.topic}
          onChange={handleTopicChange}
          topics={topics}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Featured Image</Label>
        <ImageUpload
          bucket="learning-blog-images"
          onChange={(url: string) => setValues((v) => ({ ...v, image: url }))}
          onError={(error: string) => setImageError(error)}
          value={values.image}
          name="featured-image"
        />
      </div>

      <div className="space-y-2">
        <Label>Content *</Label>
        <Tabs defaultValue="write">
          <TabsList className="mb-4">
            <TabsTrigger value="write">Write</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="write">
            <MDXEditorComponent
              value={values.content}
              onChange={handleContentChange}
              bucket="learning-blog-images"
            />
          </TabsContent>
          <TabsContent value="preview">
            <div
              className={`border rounded-md p-4 min-h-[400px] max-h-[600px] overflow-y-auto ${
                isDark ? "bg-background" : "bg-white"
              }`}
            >
              <div
                className={`prose ${isDark ? "prose-invert" : ""} max-w-none`}
              >
                <MarkdownRenderer content={values.content} />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="flex gap-2">
        <Button
          type="submit"
          disabled={submitting || loading}
          className="w-full sm:w-auto"
        >
          {submitting
            ? "Saving..."
            : mode === "add"
            ? "Create Post"
            : "Update Post"}
        </Button>
      </div>
    </form>
  );
}
