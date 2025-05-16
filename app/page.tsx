"use client";

import { MainLayout } from "@/components/main-layout";
import { ParticleBackground } from "@/components/particle-background";
import { SocialIcons } from "@/components/social-icons";
import { SpotifyWidget } from "@/components/spotify-widget";
import { LocationInfo } from "@/components/location-info";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

export default function Home() {
  const { theme } = useTheme();
  const isDark =
    theme === "dark" ||
    (!theme &&
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
  const styles = {
    insetText: {
      color: isDark ? "white" : "#18181b",
      textShadow: isDark
        ? "-1px -1px 1px rgba(255,255,255,0.2), 1px 1px 1px rgba(0,0,0,0.1), 0px 0px 3px rgba(0,0,0,0.1)"
        : "0 2px 8px rgba(0,0,0,0.08)",
      // fontFamily: "sans-serif",
      // fontWeight: "bold",
      letterSpacing: "2px",
    },
  };
  return (
    <MainLayout showFloatingPlayer={false}>
      <div className="relative h-[100dvh] w-full overflow-hidden">
        <ParticleBackground />
        <div className="relative z-10 flex flex-col h-full">
          <main className="flex-1 flex flex-col items-center justify-center text-center px-4 pt-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl md:text-3xl font-light text-foreground mb-2">
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
          </main>

          <footer className="w-full p-4 border-t border-border">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
              <LocationInfo />
              <div className="my-4 md:my-0">
                <SpotifyWidget floating={false} />
              </div>
              <SocialIcons />
            </div>
          </footer>
        </div>
      </div>
    </MainLayout>
  );
}
