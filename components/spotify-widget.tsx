"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useSpotify } from "@/app/contexts/spotify-context";
import { Slider } from "@/components/ui/slider";

interface SpotifyWidgetProps {
  floating?: boolean;
}

const tracks = [
  {
    title: "Rainy Lofi City",
    artist: "Pixabay Music",
    audio:
      // "https://vkzysblijnkwykumefrg.supabase.co/storage/v1/object/public/music//lofi.mp3",
      "",
    cover:
      "https://th.bing.com/th/id/R.4a98ce482bd7504e34e999724f1b8f93?rik=9ITkpQqZ4AnWqw&pid=ImgRaw&r=0",
  },
];

export function SpotifyWidget({ floating = false }: SpotifyWidgetProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const {
    isPlaying,
    isMuted,
    currentTrack,
    togglePlay,
    toggleMute,
    volume,
    setVolume,
  } = useSpotify();

  useEffect(() => {
    if (isHomePage) {
      setIsExpanded(true);
    }
  }, [isHomePage]);

  const playerContent = (
    <div className="flex items-center p-2 space-x-3 relative">
      {/* <div className="relative h-8 w-8 rounded overflow-hidden bg-gray-900">
        <Image
          src={currentTrack.cover}
          alt="Album cover"
          width={32}
          height={32}
          className="object-cover"
        />
      </div> */}
      <div className="text-sm">
        <p className="font-medium leading-none">{currentTrack.title}</p>
        <p className="text-xs text-gray-400">{currentTrack.artist}</p>
      </div>
      <div className="flex space-x-3">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full hover:bg-primary/80"
          onClick={togglePlay}
          aria-label="play/pause"
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full hover:bg-primary/80"
          onClick={toggleMute}
          aria-label="mute"
        >
          {isMuted ? (
            <VolumeX className="h-4 w-4" />
          ) : (
            <Volume2 className="h-4 w-4" />
          )}
        </Button>
        <div className="w-20 self-center">
          <Slider
            value={[volume * 100]}
            onValueChange={([value]) => setVolume(value / 100)}
            max={100}
            step={1}
            className="w-full"
          />
        </div>
        {!isHomePage && floating && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full hover:bg-primary/80"
            aria-label="expand"
            onClick={() => setIsExpanded(false)}
          >
            <Minimize className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );

  if (!floating) {
    return (
      <div className="backdrop-blur bg-background/60 border border-border shadow-xl rounded-2xl px-4 py-2 flex items-center space-x-3 transition-all duration-300">
        {playerContent}
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isExpanded ? (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="backdrop-blur bg-background/60 border border-border shadow-xl rounded-2xl px-4 py-2 flex items-center space-x-3 transition-all duration-300"
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
              className="h-10 w-10 rounded-full bg-background/60 backdrop-blur border border-border shadow-lg"
              onClick={() => setIsExpanded(true)}
            >
              <span className="sr-only">Expand music player</span>
              <Maximize2 className="h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
