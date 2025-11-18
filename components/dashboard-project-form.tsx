import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { TagsInput } from "@/components/ui/tags-input";
import { ImageUpload } from "@/components/image-upload";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface DashboardProjectFormProps {
  initialValues?: {
    title?: string;
    description?: string;
    image?: string;
    link?: string;
    tags?: string | string[];
  };
  onSubmit: (values: any) => Promise<void>;
  loading?: boolean;
  mode?: "add" | "edit";
}

export default function DashboardProjectForm({
  initialValues = {},
  onSubmit,
  loading,
  mode = "add",
}: DashboardProjectFormProps) {
  const [values, setValues] = useState({
    title: initialValues.title || "",
    description: initialValues.description || "",
    image: initialValues.image || "",
    link: initialValues.link || "",
  });
  const [tags, setTags] = useState<string[]>(
    initialValues.tags
      ? Array.isArray(initialValues.tags)
        ? initialValues.tags
        : initialValues.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
      : []
  );
  const [submitting, setSubmitting] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    await onSubmit({ ...values, tags: tags.join(",") });
    setSubmitting(false);
  }

  return (
    <form className="space-y-4 max-w-xl" onSubmit={handleSubmit}>
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
        <Label htmlFor="description" className="text-foreground">
          Description *
        </Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Description"
          value={values.description}
          onChange={handleChange}
          rows={5}
          required
        />
      </div>

      <div className="space-y-2">
        <Label className="text-foreground">Project Image (Optional)</Label>
        <ImageUpload
          value={values.image}
          onChange={(url) => setValues((v) => ({ ...v, image: url }))}
          onError={(error) => toast.error(error)}
          bucket="portfolio-project-images"
          name={values.title || "project"}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="link" className="text-foreground">
          Project Link
        </Label>
        <Input
          id="link"
          name="link"
          placeholder="Project Link"
          value={values.link}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-2">
        <Label className="text-foreground">Tags</Label>
        <TagsInput value={tags} onChange={setTags} placeholder="Add tag..." />
      </div>

      <Button type="submit" disabled={submitting || loading} className="w-full">
        {mode === "edit" ? "Update Project" : "Add Project"}
      </Button>
    </form>
  );
}
