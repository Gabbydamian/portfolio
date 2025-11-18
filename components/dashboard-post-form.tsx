import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BlogPostEditor } from "@/components/blog-post-editor";
import { ImageUpload } from "@/components/image-upload";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

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

export default function DashboardPostForm({
  initialValues = {},
  onSubmit,
  loading,
  mode = "add",
}: DashboardPostFormProps) {
  const [values, setValues] = useState({
    title: initialValues.title || "",
    content: initialValues.content || "",
    excerpt: initialValues.excerpt || "",
    category: initialValues.category || "",
    cover_img: initialValues.cover_img || "",
  });
  const [submitting, setSubmitting] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
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
    <form className="space-y-4 max-w-full mx-auto" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <Label htmlFor="title" className="text-foreground">
          Title *
        </Label>
        <Input
          id="title"
          name="title"
          placeholder="Title"
          value={values.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt" className="text-foreground">
          Excerpt
        </Label>
        <Input
          id="excerpt"
          name="excerpt"
          placeholder="Excerpt"
          value={values.excerpt}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category" className="text-foreground">
          Category
        </Label>
        <Input
          id="category"
          name="category"
          placeholder="Category"
          value={values.category}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-2">
        <Label className="text-foreground">Cover Image (Optional)</Label>
        <ImageUpload
          value={values.cover_img}
          onChange={(url) => setValues((v) => ({ ...v, cover_img: url }))}
          onError={(error) => toast.error(error)}
          bucket="blog-images"
          name={values.title || "blog-post"}
        />
      </div>

      <div className="space-y-2">
        <Label className="text-foreground">Content *</Label>
        <div className="bg-background border border-border rounded-md">
          <BlogPostEditor
            value={values.content}
            onChange={handleContentChange}
            bucket="blog-images"
          />
        </div>
      </div>

      <Button type="submit" disabled={submitting || loading} className="w-full">
        {mode === "edit" ? "Update Post" : "Add Post"}
      </Button>
    </form>
  );
}
