"use server";

import { createClient } from "@/utils/supabase/supabase";
import { calculateReadTime, generateSlug } from "@/lib/utils";
import { Blog } from "@/app/types/blog";
import { error } from "console";

export async function fetchBlogPosts(status?: string) {
  const supabase = await createClient();

  let query = supabase
    .from("blogs")
    .select("*")
    .order("date_created", { ascending: false });

  if (status === "approved") {
    query = query.eq("approved", true);
  } else if (status === "pending") {
    query = query.eq("approved", false);
  }

  const { data, error } = await query;

  if (error) {
    return { blogs: null, error };
  }

  return { blogs: data, error: null };
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

export async function addNewBlogPost(blog: Partial<Blog>) {
  const supabase = await createClient();

  const { author, category, content, cover_img, excerpt, title } = blog;
  const read_time = calculateReadTime(content || "");
  const slug = generateSlug(title || "");

  const { error } = await supabase
    .from("blogs")
    .insert([
      author,
      category,
      content,
      cover_img,
      excerpt,
      read_time,
      slug,
      title,
    ]);

  if (error) {
    console.error("An error occured: ", error);
  }
}
