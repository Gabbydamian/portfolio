"use client";

import { useState, useEffect } from "react";
import { fetchLearningPostsByTopic } from "@/actions/learningActions";
import { LearningPost } from "@/app/types/learning";
import { TopicTabs } from "./topic-tabs";
import { LearningCard } from "./learning-card";
import { Spinner } from "@/components/ui/spinner";

interface LearningPostsProps {
  initialPosts: LearningPost[];
  topics: string[];
}

export function LearningPosts({ initialPosts, topics }: LearningPostsProps) {
  const [selectedTopic, setSelectedTopic] = useState("all");
  const [posts, setPosts] = useState(initialPosts);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleTopicChange = async () => {
      setIsLoading(true);
      const result = await fetchLearningPostsByTopic(selectedTopic);
      if (!result.error && result.posts) {
        setPosts(result.posts);
      }
      setIsLoading(false);
    };

    handleTopicChange();
  }, [selectedTopic]);

  return (
    <div>
      <TopicTabs
        topics={topics}
        selectedTopic={selectedTopic}
        onTopicChange={setSelectedTopic}
      />

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Spinner />
        </div>
      ) : posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <LearningCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            No learning posts found for this topic.
          </p>
        </div>
      )}
    </div>
  );
}
