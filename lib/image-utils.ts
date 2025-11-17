import { createClient } from "@/utils/supabase/client";
import { generateSlug } from "./utils";

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

/**
 * Compress and convert image to WebP format
 * @param file - The image file to compress
 * @param quality - Quality level (0-1), default 0.8
 * @returns Compressed WebP blob
 */
async function compressImageToWebP(
  file: File,
  quality: number = 0.8
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          reject(new Error("Could not get canvas context"));
          return;
        }

        // Set canvas dimensions
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw and compress
        ctx.drawImage(img, 0, 0);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error("Failed to compress image"));
            }
          },
          "image/webp",
          quality
        );
      };

      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = e.target?.result as string;
    };

    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

export async function uploadImage(
  file: File,
  bucket: "blog-images" | "portfolio-project-images" | "learning-blog-images",
  name: string
) {
  console.log("[uploadImage] Starting upload:", { bucket, name, fileSize: file.size, fileType: file.type });
  
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    const error = "Invalid file type. Only JPG, PNG and WebP are allowed.";
    console.error("[uploadImage] Validation error:", error, { fileType: file.type });
    throw new Error(error);
  }

  if (file.size > MAX_FILE_SIZE) {
    const error = "File size too large. Maximum size is 5MB.";
    console.error("[uploadImage] Size error:", error, { fileSize: file.size, maxSize: MAX_FILE_SIZE });
    throw new Error(error);
  }

  try {
    // Compress and convert to WebP
    console.log("[uploadImage] Starting compression...");
    const compressedBlob = await compressImageToWebP(file, 0.8);
    console.log("[uploadImage] Compression complete:", { compressedSize: compressedBlob.size });
    
    const compressedFile = new File([compressedBlob], `${name}.webp`, {
      type: "image/webp",
    });

    const supabase = createClient();
    const fileName = `${generateSlug(name)}.webp`;
    
    console.log("[uploadImage] Uploading to bucket:", { bucket, fileName, fileSize: compressedFile.size });

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, compressedFile, {
        cacheControl: "3600",
        upsert: true,
      });

    if (error) {
      console.error("[uploadImage] Upload error:", error);
      throw new Error(`Upload failed: ${error.message || JSON.stringify(error)}`);
    }

    console.log("[uploadImage] Upload successful:", data);

    const {
      data: { publicUrl },
    } = supabase.storage.from(bucket).getPublicUrl(fileName);

    console.log("[uploadImage] Public URL generated:", publicUrl);
    return publicUrl;
  } catch (error) {
    console.error("[uploadImage] Unexpected error:", error);
    if (error instanceof Error) {
      throw new Error(`Upload failed: ${error.message}`);
    }
    throw new Error("Upload failed: Unknown error");
  }
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
