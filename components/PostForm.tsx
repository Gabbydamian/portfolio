"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MDXEditorComponent } from "@/components/mdx-editor";
import { ImageUpload } from "@/components/image-upload";

const postFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  excerpt: z.string().min(1, "Excerpt is required"),
  imageUrl: z.string().optional(),
});

type PostFormData = z.infer<typeof postFormSchema>;

interface PostFormProps {
  post?: {
    title: string;
    content: string;
    excerpt: string;
    imageUrl?: string;
  };
  onSubmit: (data: PostFormData) => Promise<void>;
}

export function PostForm({ post, onSubmit }: PostFormProps) {
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<PostFormData>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: post?.title || "",
      content: post?.content || "",
      excerpt: post?.excerpt || "",
      imageUrl: post?.imageUrl || "",
    },
  });

  const handleSubmit = async (data: PostFormData) => {
    try {
      setIsSubmitting(true);
      setError("");
      await onSubmit(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save post");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter post title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="excerpt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Excerpt</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter a brief excerpt"
                  className="h-20"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Featured Image</FormLabel>
              <FormControl>
                <ImageUpload
                  value={field.value}
                  onChange={field.onChange}
                  onError={setError}
                  bucket="blog-images"
                  name={form.getValues("title")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <MDXEditorComponent
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {error && <div className="text-sm text-destructive">{error}</div>}

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : post ? "Update Post" : "Create Post"}
        </Button>
      </form>
    </Form>
  );
}
