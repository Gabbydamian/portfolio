"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { LearningPosts } from "./learning-posts";
import { LearningPostForm } from "@/components/learning-post-form";
import { LearningPost } from "@/app/types/learning";
import { createClient } from "@/utils/supabase/client";

interface LearningPageClientProps {
  initialPosts: LearningPost[];
  topics: string[];
}

export function LearningPageClient({
  initialPosts,
  topics,
}: LearningPageClientProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const handlePostCreated = () => {
    // Trigger a refresh of the learning posts
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <>
      {!isLoading && isAuthenticated && (
        <div className="mb-8 flex justify-end">
          <Button
            onClick={() => setIsFormOpen(true)}
            className="gap-2"
            aria-label="Create a new learning post"
          >
            <Plus className="w-4 h-4" />
            Add Learning Post
          </Button>
        </div>
      )}

      <LearningPosts initialPosts={initialPosts} topics={topics} />

      <LearningPostForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSuccess={handlePostCreated}
      />
    </>
  );
}
