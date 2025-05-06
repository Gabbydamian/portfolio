"use client"

import type React from "react"

import { motion } from "framer-motion"
import {
  Braces,
  Code2,
  Database,
  FileJson,
  Github,
  Globe,
  Layers,
  LayoutGrid,
  Leaf,
  Server,
  Sigma,
  Workflow,
} from "lucide-react"

interface Skill {
  name: string
  icon: React.ReactNode
  color: string
}

export function SkillsGrid() {
  const skills: Skill[] = [
    { name: "JavaScript", icon: <FileJson size={24} />, color: "from-yellow-400 to-yellow-600" },
    { name: "TypeScript", icon: <Code2 size={24} />, color: "from-blue-400 to-blue-600" },
    { name: "React", icon: <Sigma size={24} />, color: "from-cyan-400 to-cyan-600" },
    { name: "Next.js", icon: <Globe size={24} />, color: "from-gray-400 to-gray-600" },
    { name: "Node.js", icon: <Server size={24} />, color: "from-green-400 to-green-600" },
    { name: "Tailwind CSS", icon: <Leaf size={24} />, color: "from-teal-400 to-teal-600" },
    { name: "HTML/CSS", icon: <LayoutGrid size={24} />, color: "from-orange-400 to-orange-600" },
    { name: "Git", icon: <Github size={24} />, color: "from-purple-400 to-purple-600" },
    { name: "MongoDB", icon: <Leaf size={24} />, color: "from-green-500 to-green-700" },
    { name: "PostgreSQL", icon: <Database size={24} />, color: "from-blue-500 to-blue-700" },
    { name: "GraphQL", icon: <Braces size={24} />, color: "from-pink-400 to-pink-600" },
    { name: "AWS", icon: <Layers size={24} />, color: "from-orange-500 to-orange-700" },
    { name: "Docker", icon: <Workflow size={24} />, color: "from-blue-400 to-blue-600" },
    { name: "Redux", icon: <Sigma size={24} />, color: "from-purple-500 to-purple-700" },
    { name: "Jest", icon: <Code2 size={24} />, color: "from-red-400 to-red-600" },
  ]

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 max-w-4xl">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className={`flex flex-col items-center justify-center p-4 rounded-lg bg-gradient-to-br ${skill.color} shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 aspect-square`}
            style={{
              boxShadow: `0 0 15px rgba(var(--color-primary), 0.5)`,
            }}
          >
            <div className="text-black mb-2">{skill.icon}</div>
            <span className="text-sm font-medium text-center text-black">{skill.name}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
