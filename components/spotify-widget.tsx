"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, Volume2, Maximize2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface SpotifyWidgetProps {
  floating?: boolean;
}

export function SpotifyWidget({ floating = false }: SpotifyWidgetProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  // Always show expanded on home page
  useEffect(() => {
    if (isHomePage) {
      setIsExpanded(true);
    }
  }, [isHomePage]);

  const playerContent = (
    <div className="flex items-center p-2 space-x-3">
      <div className="relative h-8 w-8 rounded overflow-hidden bg-gray-900">
        <Image
          src={
            "https://th.bing.com/th/id/R.4a98ce482bd7504e34e999724f1b8f93?rik=9ITkpQqZ4AnWqw&pid=ImgRaw&r=0"
          }
          alt="Album cover"
          width={32}
          height={32}
          className="object-cover"
        />
      </div>
      <div className="text-sm">
        <p className="font-medium leading-none">Lofi Beats</p>
        <p className="text-xs text-gray-400">Chillhop Music</p>
      </div>
      <div className="flex space-x-3">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full hover:bg-gray-700"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          <Play className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full hover:bg-gray-700"
        >
          <Volume2 className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full hover:bg-gray-700"
        >
          <Maximize2 className="h-4 w-4" />
        </Button>
        {!isHomePage && floating && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full hover:bg-gray-700"
            onClick={() => setIsExpanded(false)}
          >
            <span className="sr-only">Collapse</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </Button>
        )}
      </div>
    </div>
  );

  // If not floating, just return the player content
  if (!floating) {
    return (
      <div className="bg-gray-800 rounded-lg overflow-hidden flex items-center">
        {playerContent}
      </div>
    );
  }

  // If floating, return the floating version with expand/collapse
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isExpanded ? (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="bg-gray-800 rounded-lg overflow-hidden flex items-center shadow-lg"
          >
            {playerContent}
          </motion.div>
        ) : (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
          >
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full bg-gray-800 hover:bg-gray-700 shadow-lg"
              onClick={() => setIsExpanded(true)}
            >
              <span className="sr-only">Expand music player</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
