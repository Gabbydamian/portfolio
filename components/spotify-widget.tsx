"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2, VolumeX, Maximize2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Howl, Howler } from "howler";

interface SpotifyWidgetProps {
  floating?: boolean;
}

const tracks = [
  {
    title: "Rainy Lofi City",
    artist: "Pixabay Music",
    audio: "/audio/lofi.mp3",
    cover:
      "https://th.bing.com/th/id/R.4a98ce482bd7504e34e999724f1b8f93?rik=9ITkpQqZ4AnWqw&pid=ImgRaw&r=0",
  },
];

export function SpotifyWidget({ floating = false }: SpotifyWidgetProps) {
  const [isPlaying, setIsPlaying] = useState(false); //Set to true
  const [isMuted, setIsMuted] = useState(true); //set to false
  const [isExpanded, setIsExpanded] = useState(true);
  const [currentTrack, setCurrentTrack] = useState(tracks[0]);

  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const soundRef = useRef<Howl | null>(null);

  useEffect(() => {
    const randomTrack = tracks[Math.floor(Math.random() * tracks.length)];
    setCurrentTrack(randomTrack);

    soundRef.current = new Howl({
      src: [randomTrack.audio],
      html5: true,
      volume: 0.3,
      loop: true,
      autoplay: false,
    });

    return () => {
      soundRef.current?.unload();
    };
  }, []);

  useEffect(() => {
    const sound = soundRef.current;
    if (!sound) return;

    if (isPlaying) {
      sound.play();
    } else {
      sound.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    Howler.mute(isMuted);
  }, [isMuted]);

  useEffect(() => {
    if (isHomePage) {
      setIsExpanded(true);
    }
  }, [isHomePage]);

  useEffect(() => {
    const triggerPlay = () => {
      if (soundRef.current && !soundRef.current.playing()) {
        soundRef.current.play();
        setIsPlaying(true);
      }

      window.removeEventListener("scroll", triggerPlay);
      window.removeEventListener("mousemove", triggerPlay);
    };

    window.addEventListener("scroll", triggerPlay);
    window.addEventListener("mousemove", triggerPlay);

    return () => {
      window.removeEventListener("scroll", triggerPlay);
      window.removeEventListener("mousemove", triggerPlay);
    };
  }, []);

  const playerContent = (
    <div className="flex items-center p-2 space-x-3 relative">
      <div className="relative h-8 w-8 rounded overflow-hidden bg-gray-900">
        <Image
          src={currentTrack.cover}
          alt="Album cover"
          width={32}
          height={32}
          className="object-cover"
        />
      </div>
      <div className="text-sm">
        <p className="font-medium leading-none">{currentTrack.title}</p>
        <p className="text-xs text-gray-400">{currentTrack.artist}</p>
      </div>
      <div className="flex space-x-3">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full hover:bg-primary/80"
          onClick={() => setIsPlaying((prev) => !prev)}
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
          onClick={() => setIsMuted((prev) => !prev)}
          aria-label="mute"
        >
          {isMuted ? (
            <VolumeX className="h-4 w-4" />
          ) : (
            <Volume2 className="h-4 w-4" />
          )}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full hover:bg-primary/80"
          aria-label="expand"
        >
          <Maximize2 className="h-4 w-4" />
        </Button>
        {!isHomePage && floating && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full hover:bg-primary/80"
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

  if (!floating) {
    return (
      <div className="backdrop-blur-md bg-white/10 border border-white/20 shadow-xl rounded-2xl px-4 py-2 flex items-center space-x-3 transition-all duration-300">
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
            className="backdrop-blur-md bg-white/10 border border-white/20 shadow-xl rounded-2xl px-4 py-2 flex items-center space-x-3 transition-all duration-300"
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
              className="h-10 w-10 rounded-full bg-gray-800 hover:bg-primary/80 shadow-lg"
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
