"use client";

import { useState, useEffect } from "react";
// import { getProject } from "@/actions/projectActions";
import { ProjectForm } from "@/components/NewProject";
import { updateProject } from "@/actions/projectActions";
// import { toast } from "react-toastify";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface EditProjectPageProps {
  params: {
    id: string;
  };
}

export default function EditProjectPage({ params }: EditProjectPageProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [project, setProject] = useState<any>(null);

  // Fetch project data on mount
  // useEffect(() => {
  //   const fetchProject = async () => {
  //     try {
  //       const data = await getProject(params.id);
  //       setProject(data);
  //     } catch (error) {
  //       toast.error("Failed to fetch project");
  //       router.push("/admin/projects");
  //     }
  //   };
  //   fetchProject();
  // }, [params.id, router]);

  const handleUpdate = async (data: any) => {
    try {
      setIsSubmitting(true);
      await updateProject(params.id, data);
      toast.success("Project updated successfully");
      router.push("/admin/projects");
    } catch (error) {
      toast.error("Failed to update project");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Edit Project</h1>
      <div className="bg-background/60 backdrop-blur border border-border shadow rounded-lg p-6">
        <ProjectForm
          project={{
            title: project.title,
            description: project.description,
            imageUrl: project.image_url,
            liveUrl: project.live_url,
            technologies: project.technologies.join(", "),
          }}
          onSubmit={handleUpdate}
        />
      </div>
    </div>
  );
}
