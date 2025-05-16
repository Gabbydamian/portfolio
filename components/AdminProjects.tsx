"use client";

import { Button } from "@/components/ui/button";
import { Edit, Trash, Plus } from "lucide-react";
import { Project } from "@/app/types/project";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import { deleteProject } from "@/actions/projectActions";

export function Projects({ projects }: { projects: Project[] }) {
  const displayProjects: Project[] = projects ?? [];

  const handleDelete = async (id: string) => {
    try {
      const { error } = await deleteProject(id);

      if (error) {
        toast.error("Failed to deleted project", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
      toast.success("Project Deleted Succefully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      toast.error("Failed to deleted project", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      console.error(error);
    }
  };

  return (
    <div className="bg-background/60 backdrop-blur border border-border shadow rounded-lg p-6">
      <ToastContainer />
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
              <Button variant="outline" size="sm">
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
