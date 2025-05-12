"use server";
import { Project } from "@/app/types/project";
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

  const project = { ...projectData, last_modified: new Date() };

  const { data, error } = await supabase
    .from("projects")
    .insert([project])
    .select("*")
    .single();

  if (error) {
    return { projectData: null, error };
  }
  return { projectData: data, error: null };
}

export async function updateProject(projectData: Partial<Project>, id: string) {
  const supabase = await createClient();

  const project = { ...projectData, last_modified: new Date() };

  const { data, error } = await supabase
    .from("projects")
    .update([project])
    .eq("id", id);

  if (error) {
    return { projectData: null, error };
  }
  return { projectData: data, error: null };
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
