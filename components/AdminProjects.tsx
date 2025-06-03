"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { toast } from "sonner";
import { Project } from "@/app/types/project";
import { deleteProject, updateProject } from "@/actions/projectActions";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { NewProject } from "./NewProject";

export function Projects({ projects }: { projects: Project[] }) {
  const router = useRouter();
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const displayProjects: Project[] = projects ?? [];

  const handleDelete = async (id: string) => {
    const { error } = await deleteProject(id);

    if (error) {
      toast.error("Something went wrong...");
      return;
    }

    toast.success("Project deleted successfully");
    router.refresh();
  };

  const handleEdit = async (data: any) => {
    if (!editingProject) return;

    const { error } = await updateProject(editingProject.id, data);

    if (error) {
      toast.error("Failed to update project");
      return;
    }

    toast.success("Project updated successfully");
    setEditingProject(null);
    router.refresh();
  };

  if (editingProject) {
    return (
      <div className="bg-background/60 backdrop-blur border border-border shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edit Project</h2>
          <Button variant="outline" onClick={() => setEditingProject(null)}>
            Cancel
          </Button>
        </div>
        <NewProject
          initialData={editingProject}
          onSubmit={handleEdit}
          submitLabel="Update Project"
        />
      </div>
    );
  }

  return (
    <div className="bg-background/60 backdrop-blur border border-border shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Your Projects</h2>
      </div>
      <div className="space-y-4">
        {displayProjects.map((project, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-4 bg-background/80 backdrop-blur border border-border rounded-lg"
          >
            <span>
              <Link
                href={`${project.link}`}
                target="__blank"
                className="hover:underline"
              >
                {project.title}
              </Link>
            </span>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditingProject(project)}
              >
                <Edit className="w-4 h-4 mr-1" /> Edit
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(project.id)}
              >
                <Trash className="w-4 h-4 mr-1" /> Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
