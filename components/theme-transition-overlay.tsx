"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeTransitionOverlay() {
  const { theme, systemTheme } = useTheme();
  const [show, setShow] = useState(false);
  const [color, setColor] = useState("#000");
  const [lastTheme, setLastTheme] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (lastTheme && lastTheme !== theme) {
      // Determine overlay color based on target theme
      const target = theme === "system" ? systemTheme : theme;
      setColor(target === "dark" ? "#000" : "#fff");
      setShow(true);
      const timeout = setTimeout(() => setShow(false), 500);
      return () => clearTimeout(timeout);
    }
    setLastTheme(theme);
  }, [theme, systemTheme, lastTheme]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="theme-fade"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: color,
            pointerEvents: "none",
          }}
        />
      )}
    </AnimatePresence>
  );
}
