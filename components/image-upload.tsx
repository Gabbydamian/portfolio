"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { uploadImage, validateImage } from "@/lib/image-utils";
import { createClient } from "@/utils/supabase/client";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  onError: (error: string) => void;
  bucket: "blog-images" | "portfolio-project-images" | "learning-blog-images";
  name: string;
}

export function ImageUpload({
  value,
  onChange,
  onError,
  bucket,
  name,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(value || null);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [error, setError] = useState<string>("");

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      const validationError = validateImage(file);
      if (validationError) {
        console.error("[ImageUpload] Validation error:", validationError);
        setError(validationError);
        onError(validationError);
        return;
      }

      try {
        console.log("[ImageUpload] Starting upload for file:", {
          name: file.name,
          size: file.size,
          type: file.type,
        });
        setError("");
        setIsUploading(true);
        setUploadStatus("Compressing image...");
        const url = await uploadImage(file, bucket, name);
        console.log("[ImageUpload] Upload successful:", url);
        setPreview(url);
        onChange(url);
        setUploadStatus("");
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Upload failed";
        console.error("[ImageUpload] Upload error:", errorMessage, err);
        setError(errorMessage);
        onError(errorMessage);
        setUploadStatus("");
      } finally {
        setIsUploading(false);
      }
    },
    [bucket, name, onChange, onError]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
    },
    maxFiles: 1,
    multiple: false,
  });

  const removeImage = () => {
    setPreview(null);
    onChange("");
  };

  return (
    <div className="space-y-4">
      {preview ? (
        <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
          <Image src={preview} alt="Preview" fill className="object-cover" />
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2"
            onClick={removeImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive
              ? "border-primary bg-primary/10"
              : "border-border hover:border-primary/50"
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            {isDragActive
              ? "Drop the image here"
              : "Drag & drop an image, or click to select"}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            JPG, PNG or WebP up to 5MB
          </p>
        </div>
      )}
      {isUploading && (
        <p className="text-sm text-muted-foreground text-center">
          {uploadStatus || "Uploading..."}
        </p>
      )}
      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3">
          <p className="text-sm text-destructive">
            <strong>Upload Error:</strong> {error}
          </p>
          <details className="mt-2 text-xs text-destructive/80">
            <summary className="cursor-pointer">Debug Info</summary>
            <pre className="mt-2 overflow-auto bg-background p-2 rounded text-foreground text-xs">
              {JSON.stringify(
                { bucket, name, fileName: `${name}.webp` },
                null,
                2
              )}
            </pre>
            <p className="mt-2">
              Check browser console (F12) for detailed logs
            </p>
          </details>
        </div>
      )}
    </div>
  );
}
