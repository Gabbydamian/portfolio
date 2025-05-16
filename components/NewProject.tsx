"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { addProject } from "@/actions/projectActions";
import { ToastContainer, toast } from "react-toastify";

export function NewProject() {
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [tags, setTags] = useState("");

  // const handleSaveProject = async () => {
  //   setIsLoading(true);

  //   try {
  //     // This would call a server action to save the project
  //     // await addNewProject({ title, description, imageUrl, projectLink, tags });

  //     toast({
  //       title: "Project saved",
  //       description: "Your project has been saved successfully.",
  //     });

  //     // Reset form after successful save
  //     setTitle("");
  //     setDescription("");
  //     setImageUrl("");
  //     setProjectLink("");
  //     setTags("");
  //   } catch (error) {
  //     toast({
  //       title: "Error saving project",
  //       description:
  //         error instanceof Error ? error.message : "An error occurred",
  //       variant: "destructive",
  //     });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addProject({
        title,
        description,
        image: imageUrl,
        tags: [tags],
        link: projectLink,
      });

      toast.success("Project Added Succefully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setDescription("");
      setImageUrl("");
      setProjectLink("");
      setTags("");
      setTitle("");
    } catch (error) {
      toast.error("An error occured! Unable to Add Project", {
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
    <form
      onSubmit={handleSubmit}
      className="bg-background/60 backdrop-blur border border-border shadow rounded-lg p-6"
    >
      <ToastContainer />
      <h2 className="text-xl font-semibold mb-4">Create New Project</h2>
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
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="project-link">Project Link</Label>
          <Input
            id="project-link"
            placeholder="https://example.com/project"
            value={projectLink}
            onChange={(e) => setProjectLink(e.target.value)}
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
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Saving..." : "Save Project"}
      </Button>
    </form>
  );
}
