"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BlogPostEditor } from "@/components/blog-post-editor";
import { toast } from "sonner";
import { addLearningPost } from "@/actions/learningActions";
import type { NewLearningPost } from "@/app/types/learning";
import { createClient } from "@/utils/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface LearningPostFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function LearningPostForm({
  isOpen,
  onClose,
  onSuccess,
}: LearningPostFormProps) {
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status when form opens
  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);

      if (!session && isOpen) {
        toast.error("You must be logged in to create learning posts");
        onClose();
      }
    };

    if (isOpen) {
      checkAuth();
    }
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !topic.trim() || !content.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await addLearningPost({
        title,
        topic,
        content,
        image: image || null,
        status: "published",
      });

      if (result.success) {
        toast.success("Learning post created successfully!");
        setTitle("");
        setTopic("");
        setImage("");
        setContent("");
        onClose();
        onSuccess?.();
      } else {
        toast.error("Failed to create learning post");
      }
    } catch (error) {
      console.error("Error creating learning post:", error);
      toast.error("An error occurred while creating the post");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Learning Post</DialogTitle>
          <DialogDescription>
            Add a new learning resource organized by topic
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-foreground">
                Title *
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Learning Post Title"
                className="bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="topic" className="text-foreground">
                Topic *
              </Label>
              <Input
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                required
                placeholder="e.g., React, TypeScript, CSS"
                className="bg-background"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image" className="text-foreground">
              Cover Image URL (Optional)
            </Label>
            <Input
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="bg-background"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-foreground">Content *</Label>
            <div className="bg-background border border-border rounded-md">
              <BlogPostEditor value={content} onChange={setContent} />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Post"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
