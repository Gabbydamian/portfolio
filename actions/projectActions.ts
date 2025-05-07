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
