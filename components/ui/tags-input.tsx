import { useState } from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";

interface TagsInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}

export function TagsInput({ value, onChange, placeholder }: TagsInputProps) {
  const [input, setInput] = useState("");

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }

  function handleInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if ((e.key === "Enter" || e.key === ",") && input.trim()) {
      e.preventDefault();
      if (!value.includes(input.trim())) {
        onChange([...value, input.trim()]);
      }
      setInput("");
    } else if (e.key === "Backspace" && !input && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  }

  function removeTag(idx: number) {
    onChange(value.filter((_, i) => i !== idx));
  }

  return (
    <div className="flex flex-wrap items-center gap-2 border rounded-md px-2 py-1 bg-background focus-within:ring-2 ring-ring">
      {value.map((tag, idx) => (
        <span
          key={tag + idx}
          className="flex items-center gap-1 bg-accent text-accent-foreground rounded px-2 py-0.5 text-sm"
        >
          {tag}
          <button
            type="button"
            className="ml-1 hover:text-destructive"
            onClick={() => removeTag(idx)}
            aria-label={`Remove tag ${tag}`}
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}
      <Input
        className="flex-1 border-none shadow-none focus:ring-0 focus-visible:ring-0 bg-transparent p-0 min-w-[80px]"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        placeholder={placeholder || "Add tag..."}
        autoComplete="off"
      />
    </div>
  );
}
