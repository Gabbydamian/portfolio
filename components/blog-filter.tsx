"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

type Category = "all" | "development" | "design" | "career" | "personal";

interface BlogFilterProps {
  onFilterChange: (category: Category) => void;
}

export function BlogFilter({ onFilterChange }: BlogFilterProps) {
  const [activeFilter, setActiveFilter] = useState<Category>("all");

  const handleFilterClick = (category: Category) => {
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
        variant={activeFilter === "career" ? "default" : "outline"}
        className={`rounded-full ${
          activeFilter === "career" ? "bg-gray-900" : ""
        }`}
        onClick={() => handleFilterClick("career")}
      >
        Career
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
    </div>
  );
}
