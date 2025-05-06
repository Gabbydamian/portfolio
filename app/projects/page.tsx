"use client"

import { MainLayout } from "@/components/main-layout"
import { ProjectCard } from "@/components/project-card"
import { motion } from "framer-motion"

// Sample project data - would come from a database in a real app
const projects = [
  {
    id: 1,
    title: "Portfolio Website",
    description: "A modern portfolio website built with Next.js and Tailwind CSS",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["Next.js", "React", "Tailwind CSS"],
    link: "#",
  },
  {
    id: 2,
    title: "E-commerce Platform",
    description: "A full-featured e-commerce platform with payment processing",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["React", "Node.js", "MongoDB"],
    link: "#",
  },
  {
    id: 3,
    title: "Weather App",
    description: "A weather application that shows forecasts for any location",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["JavaScript", "API", "CSS"],
    link: "#",
  },
  {
    id: 4,
    title: "Task Management System",
    description: "A collaborative task management system for teams",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["TypeScript", "React", "Firebase"],
    link: "#",
  },
]

export default function Projects() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 md:px-24 py-12 mt-24">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Projects
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
