"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { NavBar } from "@/components/nav-bar"
import { AnimatePresence, motion } from "framer-motion"
// import { SpotifyWidget } from "@/components/spotify-widget"

interface MainLayoutProps {
  children: React.ReactNode
  showFloatingPlayer?: boolean
}

export function MainLayout({ children, showFloatingPlayer = true }: MainLayoutProps) {
  const pathname = usePathname()
  const [isHome, setIsHome] = useState(false)

  useEffect(() => {
    setIsHome(pathname === "/")
  }, [pathname])

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavBar />
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`flex-1 ${isHome ? "overflow-hidden" : "overflow-y-auto"}`}
        >
          {children}
        </motion.div>
      </AnimatePresence>
      {/* {showFloatingPlayer && !isHome && <SpotifyWidget floating={true} />} */}
    </div>
  )
}
