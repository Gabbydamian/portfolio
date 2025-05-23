"use client";

import { useState } from "react";
import { ProjectForm } from "@/components/NewProject";
import { addProject } from "@/actions/projectActions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function NewProjectPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = async (data: any) => {
    try {
      setIsSubmitting(true);
      await addProject(data);
      toast.success("Project created successfully");
      router.push("/admin/projects");
    } catch (error) {
      toast.error("Failed to create project");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Create New Project</h1>
      <div className="bg-background/60 backdrop-blur border border-border shadow rounded-lg p-6">
        <ProjectForm onSubmit={handleCreate} />
      </div>
    </div>
  );
}
