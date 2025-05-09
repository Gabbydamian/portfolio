"use server";

import { createClient } from "@/utils/supabase/supabase";
import { calculateReadTime, generateSlug } from "@/lib/utils";
// import { Blog } from "@/app/types/blog";
import { NewBlogPost } from "@/app/types/blog";
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


export async function addNewBlogPost(data: NewBlogPost) {
  const supabase = await createClient();

  const slug = await generateSlug(data.title);
  const read_time = await calculateReadTime(data.content);

  const blog = {
    ...data,
    slug,
    read_time,
    author: "Damian Gabriel",
    email: "gabbydamian92@gmail.com",
  };

  const { error } = await supabase.from("blogs").insert([blog]);

  if (error) {
    console.error("Error inserting blog post:", error);
    throw error;
  }
}


export async function approveBlogPost(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("blogs")
    .update({ approved: true })
    .eq("id", id);

  if (error) {
    console.error("Error approving blog post:", error.message);
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function rejectBlogPost(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("blogs").delete().eq("id", id);

  if (error) {
    console.error("Error rejecting blog post:", error.message);
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function deleteBlogPost(id: string) {
  const supabse = await createClient();

  const { error } = await supabse.from("blogs").delete().eq("id", id);

  if (error) {
    console.error("Error Deleting blog post:", error.message);
    return { success: false, error: error.message };
  }

  return { success: true };
}
