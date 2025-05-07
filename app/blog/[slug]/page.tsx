"use client";

import { use } from "react";
import { MainLayout } from "@/components/main-layout";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

type Params = {
  params: Promise<{ slug: string }>;
};

// This would be replaced with a database query in a real app
const getBlogPost = (slug: string) => {
  // Sample blog post content
  const posts = {
    "getting-started-with-nextjs": {
      title: "Getting Started with Next.js",
      date: "2023-05-15",
      author: "Damian",
      category: "development",
      coverImage: "/placeholder.svg?height=600&width=1200",
      content: `
# Getting Started with Next.js

Next.js is a React framework that enables functionality such as server-side rendering and static site generation.

## Why Next.js?

- **Server-side Rendering**: Improves performance and SEO
- **Static Site Generation**: Pre-renders pages at build time
- **API Routes**: Create API endpoints easily
- **File-based Routing**: Intuitive routing system
- **Built-in CSS Support**: Various styling options

## Installation

\`\`\`bash
npx create-next-app@latest my-next-app
cd my-next-app
npm run dev
\`\`\`

## Basic Routing

Next.js has a file-system based router built on the concept of pages.

\`\`\`jsx
// pages/index.js
export default function Home() {
  return <h1>Hello, Next.js!</h1>
}
\`\`\`

## Conclusion

Next.js provides an excellent developer experience with all the features you need for production.
      `,
    },
    "power-of-tailwind-css": {
      title: "The Power of Tailwind CSS",
      date: "2023-06-22",
      author: "Damian",
      category: "design",
      coverImage: "/placeholder.svg?height=600&width=1200",
      content: `
# The Power of Tailwind CSS

Tailwind CSS is a utility-first CSS framework that allows you to build custom designs without leaving your HTML.

## Why Tailwind CSS?

- **Utility-First**: Compose designs directly in your markup
- **Responsive Design**: Built-in responsive modifiers
- **Component Extraction**: Extract reusable components
- **Customization**: Easily customize your design system
- **Performance**: Only include the CSS you use

## Installation

\`\`\`bash
npm install tailwindcss
npx tailwindcss init
\`\`\`

## Basic Usage

\`\`\`html
<div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
  <div>
    <div class="text-xl font-medium text-black">Tailwind CSS</div>
    <p class="text-gray-500">The utility-first CSS framework</p>
  </div>
</div>
\`\`\`

## Conclusion

Tailwind CSS provides an excellent balance between flexibility and structure, making it a great choice for modern web development.
      `,
    },
    "interactive-uis-framer-motion": {
      title: "Building Interactive UIs with Framer Motion",
      date: "2023-07-10",
      author: "Damian",
      category: "development",
      coverImage: "/placeholder.svg?height=600&width=1200",
      content: `
# Building Interactive UIs with Framer Motion

Framer Motion is a production-ready motion library for React that makes it easy to create stunning animations and interactions.

## Why Framer Motion?

- **Declarative Animations**: Simple, declarative syntax
- **Gestures**: Built-in support for drag, tap, hover, and more
- **Layout Animations**: Animate between different layouts automatically
- **Variants**: Create coordinated animations with variants
- **Exit Animations**: Animate components when they're removed from the React tree

## Installation

\`\`\`bash
npm install framer-motion
\`\`\`

## Basic Usage

\`\`\`jsx
import { motion } from 'framer-motion';

function App() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      Hello, Framer Motion!
    </motion.div>
  );
}
\`\`\`

## Using Variants

\`\`\`jsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

function List() {
  return (
    <motion.ul
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {items.map(item => (
        <motion.li key={item.id} variants={itemVariants}>
          {item.text}
        </motion.li>
      ))}
    </motion.ul>
  );
}
\`\`\`

## Conclusion

Framer Motion provides a powerful yet simple way to add animations to your React applications, enhancing the user experience with smooth transitions and interactive elements.
      `,
    },
    "design-systems-for-developers": {
      title: "Design Systems for Developers",
      date: "2023-08-05",
      author: "Damian",
      category: "design",
      coverImage: "/placeholder.svg?height=600&width=1200",
      content: `
# Design Systems for Developers

A design system is a collection of reusable components, guided by clear standards, that can be assembled to build any number of applications.

## Why Design Systems Matter

- **Consistency**: Ensure UI consistency across products
- **Efficiency**: Speed up development with reusable components
- **Collaboration**: Improve collaboration between designers and developers
- **Scalability**: Scale design across multiple products
- **Documentation**: Provide clear guidelines for implementation

## Key Components of a Design System

### 1. Design Tokens

Design tokens are the visual design atoms of the design system—specifically, they are named entities that store visual design attributes.

\`\`\`js
// Example of design tokens
export const colors = {
  primary: '#0070f3',
  secondary: '#ff4081',
  success: '#00c853',
  error: '#ff1744',
};

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
};
\`\`\`

### 2. Component Library

A collection of reusable UI components that follow the design system's guidelines.

\`\`\`jsx
// Example Button component
function Button({ variant = 'primary', size = 'medium', children, ...props }) {
  return (
    <button 
      className={\`btn btn-\${variant} btn-\${size}\`}
      {...props}
    >
      {children}
    </button>
  );
}
\`\`\`

## Implementing a Design System

1. **Start Small**: Begin with core components
2. **Document Everything**: Create clear documentation
3. **Version Control**: Treat your design system like any other codebase
4. **Get Feedback**: Continuously improve based on user feedback
5. **Maintain Consistency**: Ensure all components follow the same patterns

## Conclusion

Design systems bridge the gap between designers and developers, creating a shared language that improves collaboration and ensures consistency across products.
      `,
    },
    "navigating-tech-career": {
      title: "Navigating Your Tech Career",
      date: "2023-09-18",
      author: "Damian",
      category: "career",
      coverImage: "/placeholder.svg?height=600&width=1200",
      content: `
# Navigating Your Tech Career

Building a successful career in technology requires more than just technical skills. It's about continuous learning, building relationships, and making strategic career decisions.

## Key Career Development Strategies

### 1. Continuous Learning

Technology evolves rapidly, making continuous learning essential for career growth.

- **Stay Current**: Follow industry blogs, podcasts, and newsletters
- **Side Projects**: Build personal projects to learn new technologies
- **Open Source**: Contribute to open source projects
- **Certifications**: Pursue relevant certifications in your field

### 2. Building Your Network

Networking is crucial for discovering opportunities and growing professionally.

- **Tech Communities**: Join local and online tech communities
- **Conferences**: Attend industry conferences and meetups
- **Mentorship**: Find mentors and become a mentor yourself
- **Social Media**: Engage professionally on platforms like Twitter and LinkedIn

### 3. Career Progression Paths

Understanding potential career paths helps you make informed decisions.

\`\`\`
Junior Developer → Mid-level Developer → Senior Developer → 
  ↓
  → Tech Lead → Engineering Manager → Director → CTO
  ↓
  → Software Architect → Principal Engineer
  ↓
  → DevOps Specialist → Site Reliability Engineer
\`\`\`

### 4. Soft Skills Development

Technical skills alone aren't enough for career advancement.

- **Communication**: Learn to explain complex concepts clearly
- **Teamwork**: Develop collaboration skills
- **Problem-solving**: Enhance your analytical thinking
- **Time Management**: Improve your productivity and efficiency

## Conclusion

A successful tech career is built on a foundation of technical excellence, continuous learning, strong relationships, and strategic career planning. By focusing on these areas, you can navigate the ever-changing technology landscape and build a fulfilling career.
      `,
    },
  };

  return posts[slug as keyof typeof posts] || null;
};

export default function BlogPost({ params }: Params) {
  const resolvedParams = use(params);
  const post = getBlogPost(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <MainLayout>
      <article className="container mx-auto px-4 md:px-24 py-12 mt-24 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {post.title}
          </h1>
          <div className="flex items-center text-gray-400 mb-4">
            <span>{formatDate(post.date)}</span>
            <span className="mx-2">•</span>
            <span>By {post.author}</span>
          </div>
          {post.category && (
            <div className="mb-6">
              <Badge
                variant="outline"
                className="bg-gray-700 hover:bg-gray-600"
              >
                {post.category}
              </Badge>
            </div>
          )}
          <div className="relative w-full h-[300px] md:h-[400px] mb-8 rounded-lg overflow-hidden">
            <Image
              src={post.coverImage || "/placeholder.svg"}
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
    </MainLayout>
  );
}
