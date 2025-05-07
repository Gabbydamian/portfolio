"use server";

import { createClient } from "@/utils/supabase/supabase";

export async function fetchBlogPosts() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .order("date_created", { ascending: false });

  if (error) {
    return { blogs: null, error: error };
  }
  return { blogs:data, error: null };
}

export async function fetchBlogPostBySlug(slug: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    return { blogPost: null, error: error };
  }
  return { blogPost: data, error: null };
}