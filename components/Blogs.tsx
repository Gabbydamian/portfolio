"use client";

import { useState } from "react";
import { MainLayout } from "@/components/main-layout";
import { BlogPostCard } from "@/components/blog-post-card";
import { BlogFilter } from "@/components/blog-filter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PenLine, Lock } from "lucide-react";
import { BlogCategory, BlogProps } from "@/app/types/blog";
import { useQuery } from "@tanstack/react-query";
import { fetchBlogPosts } from "@/actions/blogActions";
// import { Breadcrumbs } from "@/components/breadcrumbs";

const Blogs = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["blogs"],
    queryFn: () => fetchBlogPosts("approved"),
  });

  const [filteredCategory, setFilteredCategory] = useState<BlogCategory>("all");
  const filteredPosts = data?.blogs?.filter(
    (post) => filteredCategory === "all" || post.category === filteredCategory
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>An error occured</div>;
  }

  return (
    <div className="container mx-auto px-4 md:px-24 py-12 mt-24">
      {/* <Breadcrumbs /> */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Insights on software development, design patterns, and technology
          trends
        </p>
      </motion.div>

      <div className="flex justify-center gap-4 mb-8">
        <Button asChild variant="outline">
          <Link href="/blog/submit" className="flex items-center gap-2">
            <PenLine size={16} />
            Submit a Post
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/admin" className="flex items-center gap-2">
            <Lock size={16} />
            Admin
          </Link>
        </Button>
      </div>

      <BlogFilter onFilterChange={setFilteredCategory} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts?.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <BlogPostCard post={post} />
          </motion.div>
        ))}
      </div>

      {filteredPosts?.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">No posts found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default Blogs;
