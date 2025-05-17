"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Projects", path: "/projects" },
  { name: "Blog", path: "/blog" },
  { name: "About", path: "/about" },
];

export function NavBar() {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState(pathname);

  useEffect(() => {
    setActiveTab(pathname);
  }, [pathname]);

  return (
    <header className="fixed top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur">
      <div className="container relative flex h-16 items-center justify-center">
        <nav className="relative flex items-center space-x-1 md:space-x-4 px-2 md:px-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              prefetch={true}
              className={cn(
                "relative px-3 py-2 text-sm font-medium transition-colors",
                activeTab === item.path
                  ? "text-primary"
                  : "text-foreground hover:text-primary"
              )}
            >
              {item.name}
              {activeTab === item.path && (
                <motion.div
                  className="absolute bottom-0 left-0 h-1 w-full bg-primary"
                  layoutId="navbar-indicator"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>
        <div className="absolute right-4 flex items-center">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
