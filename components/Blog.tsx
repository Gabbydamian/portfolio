"use client";

import { use } from "react";
import { MainLayout } from "@/components/main-layout";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import type { BlogPageProps } from "@/app/types/blog";

const BlogPage = ({ post }: BlogPageProps) => {
  return (
    <article className="container mx-auto px-4 md:px-24 py-12 mt-24 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
          {post.title}
        </h1>
        <div className="flex items-center text-gray-400 mb-4">
          <span>{formatDate(post.date_created)}</span>
          <span className="mx-2">•</span>
          <span>By {post.author}</span>
        </div>
        {post.category && (
          <div className="mb-6">
            <Badge variant="default">
              {post.category}
            </Badge>
          </div>
        )}
        <div className="relative w-full h-[300px] md:h-[400px] mb-8 rounded-lg overflow-hidden">
          <Image
            src={post.cover_img || "/placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="prose prose-invert max-w-none">
        <MarkdownRenderer content={post.content} />
      </div>
    </article>
  );
};

export default BlogPage;
