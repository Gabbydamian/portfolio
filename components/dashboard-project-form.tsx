import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { TagsInput } from "@/components/ui/tags-input";

interface DashboardProjectFormProps {
  initialValues?: {
    title?: string;
    description?: string;
    image?: string;
    link?: string;
    tags?: string;
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
      ? initialValues.tags
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
      <Input
        name="title"
        placeholder="Title"
        value={values.title}
        onChange={handleChange}
        required
      />
      <Textarea
        name="description"
        placeholder="Description"
        value={values.description}
        onChange={handleChange}
        rows={5}
        required
      />
      <Input
        name="image"
        placeholder="Image URL"
        value={values.image}
        onChange={handleChange}
      />
      <Input
        name="link"
        placeholder="Project Link"
        value={values.link}
        onChange={handleChange}
      />
      <TagsInput value={tags} onChange={setTags} placeholder="Add tag..." />
      <Button type="submit" disabled={submitting || loading} className="w-full">
        {mode === "edit" ? "Update Project" : "Add Project"}
      </Button>
    </form>
  );
}
