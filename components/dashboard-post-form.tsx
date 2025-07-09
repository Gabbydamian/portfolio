import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BlogPostEditor } from "@/components/blog-post-editor";

interface DashboardPostFormProps {
  initialValues?: {
    title?: string;
    content?: string;
    excerpt?: string;
    category?: string;
    cover_img?: string;
  };
  onSubmit: (values: any) => Promise<void>;
  loading?: boolean;
  mode?: "add" | "edit";
}

export default function DashboardPostForm({ initialValues = {}, onSubmit, loading, mode = "add" }: DashboardPostFormProps) {
  const [values, setValues] = useState({
    title: initialValues.title || "",
    content: initialValues.content || "",
    excerpt: initialValues.excerpt || "",
    category: initialValues.category || "",
    cover_img: initialValues.cover_img || "",
  });
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
  }

  function handleContentChange(val: string) {
    setValues((v) => ({ ...v, content: val }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    await onSubmit(values);
    setSubmitting(false);
  }

  return (
    <form className="space-y-4 max-w-xl" onSubmit={handleSubmit}>
      <Input name="title" placeholder="Title" value={values.title} onChange={handleChange} required />
      <BlogPostEditor value={values.content} onChange={handleContentChange} />
      <Input name="excerpt" placeholder="Excerpt" value={values.excerpt} onChange={handleChange} />
      <Input name="category" placeholder="Category" value={values.category} onChange={handleChange} />
      <Input name="cover_img" placeholder="Cover Image URL" value={values.cover_img} onChange={handleChange} />
      <Button type="submit" disabled={submitting || loading} className="w-full">
        {mode === "edit" ? "Update Post" : "Add Post"}
      </Button>
    </form>
  );
}
