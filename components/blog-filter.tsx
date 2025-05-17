"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BlogCategory } from "@/app/types/blog";

// type Category = "all" | "development" | "design" | "security" | "personal";

interface BlogFilterProps {
  onFilterChange: (category: BlogCategory) => void;
}

export function BlogFilter({ onFilterChange }: BlogFilterProps) {
  const [activeFilter, setActiveFilter] = useState<BlogCategory>("all");

  const handleFilterClick = (category: BlogCategory ) => {
    setActiveFilter(category);
    onFilterChange(category);
  };

  return (
    <div className="flex flex-wrap gap-2 mb-8 justify-center">
      <Button
        variant={activeFilter === "all" ? "default" : "outline"}
        className={`rounded-full ${
          activeFilter === "all" ? "bg-gray-900" : ""
        }`}
        onClick={() => handleFilterClick("all")}
      >
        All Posts
      </Button>
      <Button
        variant={activeFilter === "development" ? "default" : "outline"}
        className={`rounded-full ${
          activeFilter === "development" ? "bg-gray-900" : ""
        }`}
        onClick={() => handleFilterClick("development")}
      >
        Development
      </Button>
      <Button
        variant={activeFilter === "design" ? "default" : "outline"}
        className={`rounded-full ${
          activeFilter === "design" ? "bg-gray-900" : ""
        }`}
        onClick={() => handleFilterClick("design")}
      >
        Design
      </Button>

      <Button
        variant={activeFilter === "personal" ? "default" : "outline"}
        className={`rounded-full ${
          activeFilter === "personal" ? "bg-gray-900" : ""
        }`}
        onClick={() => handleFilterClick("personal")}
      >
        Personal
      </Button>
      <Button
        variant={activeFilter === "security" ? "default" : "outline"}
        className={`rounded-full ${
          activeFilter === "security" ? "bg-gray-900" : ""
        }`}
        onClick={() => handleFilterClick("security")}
      >
        Security
      </Button>
    </div>
  );
}
