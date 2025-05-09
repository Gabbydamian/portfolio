"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { MarkdownRenderer } from "@/components/markdown-renderer";

interface BlogPostEditorProps {
  value?: string;
  onChange?: (value: string) => void;
}

export function BlogPostEditor({ value, onChange }: BlogPostEditorProps) {
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

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
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
        <Textarea
          value={markdown}
          onChange={handleChange}
          className="min-h-[400px] font-mono"
          placeholder="Write your blog post in Markdown..."
        />
      </TabsContent>
      <TabsContent value="preview">
        <div className="border rounded-md p-4 min-h-[400px] bg-gray-900">
          <div className="prose prose-invert">
            <MarkdownRenderer content={markdown} />
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
