"use client";

import { useEffect, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getAllTopics } from "@/actions/learningActions";

interface TopicSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function TopicSelector({ value, onChange }: TopicSelectorProps) {
  const [open, setOpen] = useState(false);
  const [topics, setTopics] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch existing topics when component mounts
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const result = await getAllTopics();
        setTopics(result.topics || []);
      } catch (error) {
        console.error("Error fetching topics:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopics();
  }, []);

  // Filter topics based on input
  const filteredTopics = topics.filter((topic) =>
    topic.toLowerCase().includes(value.toLowerCase())
  );

  // Check if the current value is a new topic (not in existing list)
  const isNewTopic = value && !topics.includes(value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value || "Select or create topic..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput
            placeholder="Search or type new topic..."
            value={value}
            onValueChange={onChange}
          />
          <CommandList>
            {isLoading ? (
              <CommandEmpty>Loading topics...</CommandEmpty>
            ) : filteredTopics.length === 0 && !isNewTopic ? (
              <CommandEmpty>No topics found.</CommandEmpty>
            ) : (
              <>
                {filteredTopics.length > 0 && (
                  <CommandGroup heading="Existing Topics">
                    {filteredTopics.map((topic) => (
                      <CommandItem
                        key={topic}
                        value={topic}
                        onSelect={(currentValue) => {
                          onChange(currentValue);
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === topic ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {topic}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
                {isNewTopic && (
                  <CommandGroup heading="New Topic">
                    <CommandItem
                      value={value}
                      onSelect={() => {
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      Create "{value}"
                    </CommandItem>
                  </CommandGroup>
                )}
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
