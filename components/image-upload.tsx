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
  bucket: "blog-images" | "portfolio-project-images";
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

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      const error = validateImage(file);
      if (error) {
        onError(error);
        return;
      }

      try {
        setIsUploading(true);
        const url = await uploadImage(file, bucket, name);
        setPreview(url);
        onChange(url);
      } catch (error) {
        onError(error instanceof Error ? error.message : "Upload failed");
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
          Uploading...
        </p>
      )}
    </div>
  );
}
