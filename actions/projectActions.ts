"use server";

import { createClient } from "@/utils/supabase/supabase";

export async function fetchProjects() {
  const supabase = await createClient();

  const { data, error } = await supabase.from("projects").select("*");
  if (error) {
    return { projectsData: null, error };
  }
  return { projectsData: data, error: null };
}

export async function addProject(
  description: string | null,
  image: string | null,
  link: string,
  tags: string[] | null,
  title: string,
  uuid: string
){
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("projects")
    .insert([
      {
        title,
        description,
        image,
        link,
        tags,
      },
    ])
    .select("*")
    .single();

  if (error) {
    return { projectData: null, error };
  }
  return { projectData: data, error: null };
};
