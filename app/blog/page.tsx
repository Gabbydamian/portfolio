"use client"

import { useState } from "react"
import { MainLayout } from "@/components/main-layout"
import { BlogPostCard } from "@/components/blog-post-card"
import { BlogFilter } from "@/components/blog-filter"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PenLine, Lock } from "lucide-react"

type Category = "all" | "development" | "design" | "career" | "personal"

// Sample blog posts - would come from a database in a real app
const blogPosts = [
  {
    id: 1,
    title: "Getting Started with Next.js",
    excerpt: "Learn how to build modern web applications with Next.js and React",
    coverImage: "/placeholder.svg?height=300&width=500",
    date: "2023-05-15",
    readTime: "5 min read",
    slug: "getting-started-with-nextjs",
    category: "development",
  },
  {
    id: 2,
    title: "The Power of Tailwind CSS",
    excerpt: "Discover how Tailwind CSS can streamline your styling workflow",
    coverImage: "/placeholder.svg?height=300&width=500",
    date: "2023-06-22",
    readTime: "7 min read",
    slug: "power-of-tailwind-css",
    category: "design",
  },
  {
    id: 3,
    title: "Building Interactive UIs with Framer Motion",
    excerpt: "Create stunning animations and interactions with Framer Motion",
    coverImage: "/placeholder.svg?height=300&width=500",
    date: "2023-07-10",
    readTime: "8 min read",
    slug: "interactive-uis-framer-motion",
    category: "development",
  },
  {
    id: 4,
    title: "Design Systems for Developers",
    excerpt: "How to implement and maintain design systems in your projects",
    coverImage: "/placeholder.svg?height=300&width=500",
    date: "2023-08-05",
    readTime: "6 min read",
    slug: "design-systems-for-developers",
    category: "design",
  },
  {
    id: 5,
    title: "Navigating Your Tech Career",
    excerpt: "Tips and strategies for growing your career in technology",
    coverImage: "/placeholder.svg?height=300&width=500",
    date: "2023-09-18",
    readTime: "10 min read",
    slug: "navigating-tech-career",
    category: "career",
  },
]

export default function Blog() {
  const [filteredCategory, setFilteredCategory] = useState<Category>("all")

  const filteredPosts = blogPosts.filter((post) => filteredCategory === "all" || post.category === filteredCategory)

  return (
    <MainLayout>
      <div className="container mx-auto px-4 md:px-24 py-12 mt-24">
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
          {filteredPosts.map((post, index) => (
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

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No posts found in this category.</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
