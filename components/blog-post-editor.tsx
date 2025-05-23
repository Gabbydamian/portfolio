"use client";

import { useState } from "react";
import { MDXEditorComponent } from "@/components/mdx-editor";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "next-themes";

interface BlogPostEditorProps {
  value?: string;
  onChange?: (value: string) => void;
}

export function BlogPostEditor({ value, onChange }: BlogPostEditorProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const [markdown, setMarkdown] = useState(
    value ||
      `# Hello, Markdown!

This is a sample blog post written in Markdown.

## Features

- **Bold** and *italic* text
- Lists and tables
- Code blocks with syntax highlighting

\`\`\`javascript
// Example code
function greet() {
  console.log("Hello, world!");
}
\`\`\`

> This is a blockquote

Enjoy writing your blog posts!
`
  );

  const handleChange = (val: string) => {
    setMarkdown(val);
    onChange?.(val);
  };

  return (
    <Tabs defaultValue="write">
      <TabsList className="mb-4">
        <TabsTrigger value="write">Write</TabsTrigger>
        <TabsTrigger value="preview">Preview</TabsTrigger>
      </TabsList>
      <TabsContent value="write">
        <MDXEditorComponent value={markdown} onChange={handleChange} />
      </TabsContent>
      <TabsContent value="preview">
        <div
          className={`border rounded-md p-4 min-h-[400px] ${
            isDark ? "bg-background" : "bg-white"
          }`}
        >
          <div className={`prose ${isDark ? "prose-invert" : ""} max-w-none`}>
            <MarkdownRenderer content={markdown} />
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
