"use client";

import { DashboardLearningPostForm } from "@/components/dashboard-learning-post-form";

interface NewLearningTabProps {
  onSubmit: (values: any) => Promise<void>;
  topics: string[];
}

export function NewLearningTab({ onSubmit, topics }: NewLearningTabProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Create New Learning Post
        </h2>
        <p className="text-muted-foreground">
          Share your learning journey and insights with detailed examples and
          code
        </p>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <DashboardLearningPostForm
          onSubmit={onSubmit}
          mode="add"
          topics={topics}
        />
      </div>
    </div>
  );
}
