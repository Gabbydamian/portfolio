import { createClient } from "@/utils/supabase/client";
import { generateSlug } from "./utils";

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export async function uploadImage(
  file: File,
  bucket: "blog-images" | "portfolio-project-images",
  name: string
) {
  // Validate file type
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    throw new Error("Invalid file type. Only JPG, PNG and WebP are allowed.");
  }

  // Validate file size
  if (file.size > MAX_FILE_SIZE) {
    throw new Error("File size too large. Maximum size is 5MB.");
  }

  const supabase = await createClient();

  // Generate a unique filename
  const fileExt = file.name.split(".").pop();
  const fileName = `${generateSlug(name)}.${fileExt}`;

  // Upload to Supabase Storage
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) {
    throw error;
  }

  // Get the public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(fileName);

  return publicUrl;
}

export function validateImage(file: File): string | null {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return "Invalid file type. Only JPG, PNG and WebP are allowed.";
  }

  if (file.size > MAX_FILE_SIZE) {
    return "File size too large. Maximum size is 5MB.";
  }

  return null;
}
