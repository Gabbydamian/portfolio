"use client";

import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  atomDark,
  oneLight,
} from "react-syntax-highlighter/dist/cjs/styles/prism";
import remarkGfm from "remark-gfm";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure we only render theme-dependent UI after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine if dark mode based on resolvedTheme
  const isDark = mounted && resolvedTheme === "dark";

  const styles = {
    insetText: {
      color: isDark ? "white" : "#18181b",
      textShadow: isDark
        ? "-1px -1px 1px rgba(255,255,255,0.2), 1px 1px 1px rgba(0,0,0,0.1), 0px 0px 3px rgba(0,0,0,0.1)"
        : "0 2px 8px rgba(0,0,0,0.08)",
      letterSpacing: "2px",
    },
  };

  // Only render after mounting to prevent flash
  if (!mounted) return <div className="opacity-0">Loading...</div>;

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ node, children, ...props }) => (
          <h1
            className="text-5xl md:text-6xl font-extrabold text-primary-foreground mb-6"
            style={styles.insetText}
            {...props}
          >
            {children}
          </h1>
        ),
        h2: ({ node, children, ...props }) => (
          <h2
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            style={styles.insetText}
            {...props}
          >
            {children}
          </h2>
        ),
        h3: ({ node, children, ...props }) => (
          <h3
            className="text-2xl md:text-3xl font-semibold text-foreground mb-3"
            {...props}
          >
            {children}
          </h3>
        ),
        p: ({ node, children, ...props }) => (
          <p
            className="my-4 leading-relaxed text-lg"
            style={{
              color: isDark ? "var(--muted-foreground, #a1a1aa)" : "#000000",
              lineHeight: "1.75",
              letterSpacing: "0.01em",
              fontWeight: 400,
            }}
            {...props}
          >
            {children}
          </p>
        ),
        a: ({ node, children, ...props }) => (
          <a className="text-[#06B6D4] hover:underline font-medium" {...props}>
            {children}
          </a>
        ),
        strong: ({ node, children, ...props }) => (
          <strong className="font-semibold text-[#22C55E]" {...props}>
            {children}
          </strong>
        ),
        em: ({ node, children, ...props }) => (
          <em className="italic text-primary" {...props}>
            {children}
          </em>
        ),
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              style={isDark ? atomDark : oneLight}
              language={match[1]}
              PreTag="div"
              {...props}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code
              className={`px-1.5 py-0.5 rounded-md font-mono text-sm ${className}`}
              style={{
                backgroundColor: isDark ? "#1e3a8a" : "#e0f2fe",
                color: isDark ? "#e0f2fe" : "#1e40af",
                border: isDark ? "1px solid #3b82f6" : "1px solid #93c5fd",
              }}
              {...props}
            >
              {children}
            </code>
          );
        },
        blockquote: ({ node, children, ...props }) => (
          <blockquote
            className="my-6 pl-6 py-2 relative"
            style={{
              borderLeftWidth: "4px",
              borderLeftStyle: "solid",
              borderLeftColor: "#22c55e",
              backgroundColor: isDark
                ? "rgba(59, 130, 246, 0.1)"
                : "#fff",
              borderRadius: "0.25rem",
              padding: "1rem",
            }}
            {...props}
          >
            <div
              className="absolute left-2 top-0 text-4xl opacity-80"
              style={{ color: isDark ? "#22c55e" : "#22c55e" }}
            >
              "
            </div>
            <div
              className={`italic ${isDark ? "text-gray-300" : "text-gray-700"}`}
            >
              {children}
            </div>
          </blockquote>
        ),
        ul: ({ node, children, ...props }) => (
          <ul className="list-disc pl-6 my-4" {...props}>
            {children}
          </ul>
        ),
        ol: ({ node, children, ...props }) => (
          <ol className="list-decimal pl-6 my-4" {...props}>
            {children}
          </ol>
        ),
        li: ({ node, children, ...props }) => (
          <li
            className={`ml-2 my-1 ${
              isDark ? "text-muted-foreground" : "text-black"
            }`}
            {...props}
          >
            {children}
          </li>
        ),
        table: ({node, children, ...props}) => (
          <table>

          </table>
        )
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
