"use client";

import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  BlockTypeSelect,
  CreateLink,
  InsertTable,
  InsertThematicBreak,
  ListsToggle,
  CodeToggle,
  codeBlockPlugin,
  InsertCodeBlock,
  codeMirrorPlugin,
  linkPlugin,
  tablePlugin,
  linkDialogPlugin,
  diffSourcePlugin,
  DiffSourceToggleWrapper,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { useTheme } from "next-themes";
import { useCallback, useMemo, useState } from "react";
import debounce from "lodash/debounce";

interface MDXEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  onPreview?: (markdown: string) => void;
}

export function MDXEditorComponent({
  value,
  onChange,
  onPreview,
}: MDXEditorProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  // Debounce the onChange handler to reduce update frequency
  const debouncedOnChange = useCallback(
    debounce((newValue: string) => {
      onChange?.(newValue);
      if (onPreview) {
        onPreview(newValue);
      }
    }, 300),
    [onChange, onPreview]
  );

  // Memoize plugins to prevent unnecessary re-renders
  const plugins = useMemo(
    () => [
      headingsPlugin(),
      listsPlugin(),
      quotePlugin(),
      thematicBreakPlugin(),
      markdownShortcutPlugin(),
      codeBlockPlugin({
        defaultCodeBlockLanguage: "javascript",
      }),
      codeMirrorPlugin({
        codeBlockLanguages: {
          javascript: "JavaScript",
          typescript: "TypeScript",
          python: "Python",
          php: "PHP",
          html: "HTML",
          css: "CSS",
          sql: "SQL",
          json: "JSON",
          yaml: "YAML",
          markdown: "Markdown",
          bash: "Bash",
          shell: "Shell",
        },
      }),
      linkPlugin(),
      linkDialogPlugin(),
      tablePlugin(),
      diffSourcePlugin(),
      toolbarPlugin({
        toolbarContents: () => (
          <DiffSourceToggleWrapper>
            <UndoRedo />
            <BoldItalicUnderlineToggles />
            <BlockTypeSelect />
            <CreateLink />
            <InsertTable />
            <InsertThematicBreak />
            <ListsToggle />
            <CodeToggle />
            <InsertCodeBlock />
          </DiffSourceToggleWrapper>
        ),
      }),
    ],
    []
  );

  return (
    <div className="border rounded-md">
      <MDXEditor
        markdown={value || ""}
        onChange={debouncedOnChange}
        contentEditableClassName="prose prose-sm dark:prose-invert max-w-none"
        className={`mdx-editor ${isDark ? "dark-theme" : ""}`}
        plugins={plugins}
      />
    </div>
  );
}
