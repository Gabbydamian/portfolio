"use client";

import { MarkdownRenderer } from "@/components/markdown-renderer";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import type { LearningPostPageProps } from "@/app/types/learning";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ShareButton } from "@/components/share-button";

const LearningPostPage = ({ post }: LearningPostPageProps) => {
  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/learning/${post.slug}`
      : "";

  return (
    <article className="container mx-auto px-4 md:px-24 py-12 mt-24 max-w-4xl">
      <Breadcrumbs />
      <div className="mb-8">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
            {post.title}
          </h1>
          <ShareButton url={shareUrl} title={post.title} />
        </div>
        <div className="flex items-center text-gray-400 mb-4">
          <span>{formatDate(post.date_created)}</span>
          <span className="mx-2">•</span>
          <span>By {post.author || "Damian Gabriel"}</span>
        </div>
        {post.topic && (
          <div className="mb-6">
            <Badge variant="default">{post.topic}</Badge>
          </div>
        )}
        {post.image && (
          <div className="relative w-full h-[300px] md:h-[400px] mb-8 rounded-lg overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              loading="eager"
            />
          </div>
        )}
      </div>

      <div className="prose prose-invert max-w-none">
        <MarkdownRenderer content={post.content} />
      </div>
    </article>
  );
};

export default LearningPostPage;
