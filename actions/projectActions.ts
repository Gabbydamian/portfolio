"use server";
import { Project, NewProject } from "@/app/types/project";
import { createClient } from "@/utils/supabase/supabase";
import { revalidatePath } from "next/cache";

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
    .insert([project])
    .select() // Select to return the inserted data
    .single();

  // Debug logging for Supabase response
  console.log("Supabase insert data:", data);
  console.log("Supabase insert error:", error);

  if (error) {
    return { projectData: null, error };
  }

  revalidatePath("/projects");
  revalidatePath("/dashboard");
  return { projectData: data, error: null };
}

export async function updateProject(id: string, data: Partial<NewProject>) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("projects")
    .update({
      title: data.title,
      description: data.description,
      image: data.image || null,
      link: data.link,
      tags: data.tags,
      last_modified: new Date().toISOString(), // Update last_modified
    })
    .eq("id", id);

  if (error) {
    console.error("Error updating project:", error.message);
    return { success: false, error: error.message };
  }

  revalidatePath("/projects");
  revalidatePath("/dashboard");
  return { success: true };
}

export async function deleteProject(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", id);
  // .single(); // Single is not always necessary for delete

  if (error) {
    return { error };
  }

  revalidatePath("/projects");
  revalidatePath("/dashboard");
  return {};
}
