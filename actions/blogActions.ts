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

  const slug = generateSlug(data.title);
  const read_time = calculateReadTime(data.content);

  let author, email, approved;

  let session = await supabase.auth.getSession()

  if (session.data.session) {
    author = "Damian Gabriel";
    email = "gabbydamian92@gmail.com";
    approved = true;
  } else {
    author = data.name || "Anonymous";
    email = data.email || "Anonymous";
    approved = false;
  }

  const blog = {
    title: data.title,
    content: data.content,
    excerpt: data.excerpt,
    category: data.category,
    slug,
    read_time,
    author: author,
    email: email,
    approved: approved,
    cover_img: data.cover_img || "/placeholder.svg?height=300&width=500"
  };

  // console.log(blog);

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

export async function updateBlogPost(id: string, formData: NewBlogPost) {
  const supabase = await createClient();
  const slug = generateSlug(formData.title);
  const readTime = calculateReadTime(formData.content);

  // console.log(formData, slug, readTime);

  const { error } = await supabase
    .from("blogs")
    .update({
      title: formData.title,
      category: formData.category,
      cover_img: formData.cover_img,
      content: formData.content,
      excerpt: formData.excerpt,
      slug,
      read_time: readTime,
    })
    .eq("id", id);

  if (error) {
    console.error("Error updating blog post:", error.message);
    return { success: false, error: error.message };
  }

  return { success: true };
}
