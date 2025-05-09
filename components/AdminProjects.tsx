"use client";

import { Button } from "@/components/ui/button";
import { Edit, Trash, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Blog } from "@/app/types/blog";
import { Project } from "@/app/types/project";

export function Projects({ projects }: { projects: Project[] }) {
  const { toast } = useToast();

  // If no projects are provided, use these sample projects
  const displayProjects: Project[] = projects ?? [];

  const handleDelete = (id: string) => {
    // This would be a server action in production
    console.log(id);
    toast({
      title: "Project deleted",
      description: "The project has been deleted.",
    });
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Your Projects</h2>
        <Button size="sm">
          <Plus className="w-4 h-4 mr-1" /> Add New
        </Button>
      </div>
      <div className="space-y-4">
        {displayProjects.map((project, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-4 bg-gray-900 rounded-lg"
          >
            <span>{typeof project === "string" ? project : project.title}</span>
            <div className="space-x-2">
              <Button variant="outline" size="sm">
                <Edit className="w-4 h-4 mr-1" /> Edit
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() =>
                  handleDelete(project.id)
                }
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
