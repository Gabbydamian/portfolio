"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { addProject } from "@/actions/projectActions";
import type { Project } from "@/app/types/project";

interface ProjectFormData {
  title: string;
  description: string;
  image: string | null;
  link: string;
  tags: string[];
}

interface ProjectFormProps {
  initialData?: Partial<Project>;
  onSubmit: (data: ProjectFormData) => Promise<void>;
  submitLabel?: string;
}

export function ProjectForm({
  initialData,
  submitLabel = "Save Project",
  onSubmit,
}: ProjectFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [image, setImage] = useState(initialData?.image || "");
  const [projectLink, setProjectLink] = useState(initialData?.link || "");
  const [tags, setTags] = useState(
    initialData?.tags ? initialData.tags.join(", ") : ""
  );

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setDescription(initialData.description || "");
      setImage(initialData.image || "");
      setProjectLink(initialData.link || "");
      setTags(initialData.tags ? initialData.tags.join(", ") : "");
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const tagsArray = tags.split(",").map((tag) => tag.trim());
    await onSubmit({
      title,
      description,
      image: image || null,
      link: projectLink,
      tags: tagsArray,
    });
    setTitle("");
    setDescription("");
    setImage("");
    setProjectLink("");
    setTags("");
    toast.success("Project submitted successfully");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-background/60 backdrop-blur border border-border shadow rounded-lg p-6"
    >
      <h2 className="text-xl font-semibold mb-4">{submitLabel}</h2>
      <div className="space-y-4 mb-4">
        <div>
          <Label htmlFor="project-title">Title</Label>
          <Input
            id="project-title"
            placeholder="Project title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="project-description">Description</Label>
          <Textarea
            id="project-description"
            placeholder="Project description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="project-image">Image URL</Label>
          <Input
            id="project-image"
            placeholder="https://example.com/image.jpg"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="project-link">Project Link</Label>
          <Input
            id="project-link"
            placeholder="https://example.com/project"
            value={projectLink}
            onChange={(e) => setProjectLink(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="project-tags">Tags (comma separated)</Label>
          <Input
            id="project-tags"
            placeholder="React, Node.js, MongoDB"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
      </div>
      <Button type="submit">{submitLabel}</Button>
    </form>
  );
}

// export type NewProjectProps = {
//   initialData?: Project;
//   onSubmit: (data: any) => Promise<void>;
//   submitLabel?: string;
// };

export function NewProject() {
  const handleCreate = async (data: ProjectFormData) => {
    try {
      await addProject(data);
      toast.success("New project added successfully");
    } catch (error) {
      toast.error("Something went wrong...");
    }
  };

  return (
    <ProjectForm onSubmit={handleCreate} submitLabel="Create New Project" />
  );
}
