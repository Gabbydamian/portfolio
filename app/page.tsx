"use client";

import { MainLayout } from "@/components/main-layout";
import { ParticleBackground } from "@/components/particle-background";
import { SocialIcons } from "@/components/social-icons";
import { LocationInfo } from "@/components/location-info";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Link from "next/link";
export default function Home() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // This effect ensures we only render theme-dependent UI after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine if dark mode based on resolvedTheme (more reliable than theme)
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

  return (
    <MainLayout showFloatingPlayer={false}>
      <div className="relative h-[100dvh] w-full overflow-hidden">
        <ParticleBackground />
        <div className="relative z-10 flex flex-col h-full">
          <main className="flex-1 flex flex-col items-center justify-center text-center px-4 pt-24">
            {/* Only render themed content after mounting to prevent flash */}
            {mounted ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-2xl md:text-3xl font-normal text-foreground mb-2">
                  Hey! I&apos;m
                </h2>
                <h1
                  className="text-6xl md:text-8xl font-extrabold text-primary-foreground mb-6"
                  style={styles.insetText}
                >
                  DAM<span className="italic">I</span>AN
                </h1>
                <p
                  className={`max-w-3xl mx-auto text-lg md:text-lg mb-8 ${
                    isDark ? "text-muted-foreground" : "text-black"
                  }`}
                >
                  Quantity Surveyor turned{" "}
                  <span className="highlight">
                    <span className="font-semibold text-[#06B6D4]">
                      Software developer
                    </span>{" "}
                    and{" "}
                    <span className="font-semibold text-[#22C55E]">
                      IT expert
                    </span>
                  </span>
                  , bringing analytical precision to web applications. Building
                  responsive web experiences that simplify complexity across
                  diverse domains.
                </p>
              </motion.div>
            ) : (
              <div className="opacity-0">Loading...</div>
            )}
          </main>

          <footer className="w-full p-4 border-t border-border">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0">
              <LocationInfo />
              <div className="my-4 md:my-0 text-center text-sm flex flex-col md:flex-row items-center gap-2 md:gap-4">
                <span className="text-primary">
                  &copy; {new Date().getFullYear()} Damian Gabriel &middot;
                  astridamian &middot;{" "}
                  <Link className="underline" href="/privacy">
                    Privacy Policy
                  </Link>
                </span>
              </div>
              <SocialIcons />
            </div>
          </footer>
        </div>
      </div>
    </MainLayout>
  );
}
