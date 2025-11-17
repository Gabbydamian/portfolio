"use client";

import { useState } from "react";

interface TopicTabsProps {
  topics: string[];
  selectedTopic: string;
  onTopicChange: (topic: string) => void;
}

export function TopicTabs({
  topics,
  selectedTopic,
  onTopicChange,
}: TopicTabsProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8 pb-4 border-b border-border">
      <button
        onClick={() => onTopicChange("all")}
        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
          selectedTopic === "all"
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
        }`}
        aria-label="Show all learning posts"
      >
        All
      </button>
      {topics.map((topic) => (
        <button
          key={topic}
          onClick={() => onTopicChange(topic)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            selectedTopic === topic
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
          aria-label={`Show posts about ${topic}`}
        >
          {topic}
        </button>
      ))}
    </div>
  );
}
