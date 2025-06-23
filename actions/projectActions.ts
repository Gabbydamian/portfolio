"use server";
import { Project, NewProject } from "@/app/types/project";
import { createClient } from "@/utils/supabase/supabase";

export async function fetchProjects() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("last_modified", { ascending: false });
  if (error) {
    return { projectsData: null, error };
  }
  return { projectsData: data, error: null };
}

export async function addProject(projectData: Partial<Project>) {
  const supabase = await createClient();

  // Ensure last_modified is an ISO string
  const project = { ...projectData, last_modified: new Date().toISOString() };

  const { data, error } = await supabase
    .from("projects")
    .insert([project]);

  // Debug logging for Supabase response
  console.log("Supabase insert data:", data);
  console.log("Supabase insert error:", error);

  if (error) {
    return { projectData: null, error };
  }
  return { projectData: data, error: null };
}

export async function updateProject(id: string, data: NewProject) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("projects")
    .update({
      title: data.title,
      description: data.description,
      image: data.image || null,
      link: data.link,
      tags: data.tags,
    })
    .eq("id", id);

  if (error) {
    console.error("Error updating project:", error.message);
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function deleteProject(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", id)
    .single();

  if (error) {
    return { error };
  }

  return {};
}
