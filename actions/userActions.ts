"use server";

import { createClient } from "@/utils/supabase/supabase";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function userLogin(email: string, password: string) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error.message);
  }

  // After successful login, redirect to admin page
  return { success: true };
}

export async function userLogout() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }

  // After logout, redirect to login page
  redirect("/admin");
}

export async function getUserSession() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}
