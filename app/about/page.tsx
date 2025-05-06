"use client"

import { useState } from "react"
import { MainLayout } from "@/components/main-layout"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import {
  Briefcase,
  GraduationCap,
  Mail,
  MapPin,
  Film,
  Music,
  CastleIcon as ChessKnight,
  BookOpen,
  Globe,
  Send,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ContactForm } from "@/components/contact-form"

export default function About() {
  const [showContactForm, setShowContactForm] = useState(false)

  const skills = [
    { name: "JavaScript", color: "bg-[#3E7B45] text-white" },
    { name: "React", color: "bg-[#4A5899] text-white" },
    { name: "Node.js", color: "bg-gray-800 text-white" },
    { name: "TypeScript", color: "bg-gray-800 text-white" },
    { name: "Python", color: "bg-[#3E7B45] text-white" },
  ]

  const interests = [
    { icon: <Film className="w-5 h-5" />, text: "Classic film analysis and theory" },
    { icon: <Music className="w-5 h-5" />, text: "Music production and discovery" },
    { icon: <ChessKnight className="w-5 h-5" />, text: "Competitive chess" },
    { icon: <BookOpen className="w-5 h-5" />, text: "Learning new technologies and skills" },
  ]

  const experience = [
    {
      title: "Senior Frontend Developer",
      company: "TechNova Solutions",
      period: "2021 - Present",
      description: "Led development of responsive web applications using React, Redux, and TypeScript.",
    },
    {
      title: "Full Stack Developer",
      company: "CodeCraft Studio",
      period: "2019 - 2021",
      description: "Developed and maintained web applications using MERN stack and implemented CI/CD pipelines.",
    },
    {
      title: "Junior Developer",
      company: "WebSphere Inc.",
      period: "2018 - 2019",
      description: "Created custom WordPress themes and plugins for clients in various industries.",
    },
  ]

  const education = [
    {
      degree: "BSc in Computer Science",
      institution: "University of Technology",
      period: "2014 - 2018",
      description: "Graduated with First Class Honors, specializing in Web Technologies and Artificial Intelligence.",
    },
    {
      degree: "Advanced Certification in UI/UX Design",
      institution: "Design Academy",
      period: "2019",
      description: "Completed intensive 6-month program focused on user interface and experience design principles.",
    },
  ]

  return (
    <MainLayout>
      <div className="container mx-auto px-4 md:px-24 py-12 mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-900 rounded-xl p-8 col-span-2"
          >
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-[#3E7B45]">
                <Image src="/placeholder.svg?height=200&width=200" alt="Damian" fill className="object-cover" />
              </div>
              <div className="flex-1">
                <h1 className="text-4xl font-bold mb-4">Damian</h1>
                <p className="text-gray-300 mb-6">
                  I'm a passionate full-stack developer with a love for creating beautiful, interactive web experiences.
                  My journey in programming started 5 years ago, and I've been building digital solutions ever since.
                </p>
                <p className="text-gray-300 mb-6">
                  When I'm not coding, you'll find me exploring new music, watching classic films, or engaged in an
                  intense chess match. I believe in continuous learning and pushing the boundaries of what's possible
                  with technology.
                </p>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Badge key={skill.name} className={`${skill.color} px-4 py-1 text-sm rounded-full`}>
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Interests Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gray-900 rounded-xl p-8"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <span className="text-[#3E7B45] mr-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 16V12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 8H12.01"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              Interests
            </h2>
            <div className="space-y-4">
              {interests.map((interest, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="text-[#3E7B45]">{interest.icon}</span>
                  <span>{interest.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Experience Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gray-900 rounded-xl p-8"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <span className="text-[#3E7B45] mr-2">
                <Briefcase className="w-6 h-6" />
              </span>
              Experience
            </h2>
            <div className="space-y-8">
              {experience.map((job, index) => (
                <div key={index} className="relative pl-6 border-l border-gray-700">
                  <div className="absolute w-3 h-3 bg-[#3E7B45] rounded-full -left-[6.5px] top-1"></div>
                  <h3 className="text-xl font-bold">{job.title}</h3>
                  <p className="text-gray-400 mb-2">
                    {job.company} • {job.period}
                  </p>
                  <p className="text-gray-300">{job.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Education Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gray-900 rounded-xl p-8"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <span className="text-[#3E7B45] mr-2">
                <GraduationCap className="w-6 h-6" />
              </span>
              Education
            </h2>
            <div className="space-y-8">
              {education.map((edu, index) => (
                <div key={index} className="relative pl-6 border-l border-gray-700">
                  <div className="absolute w-3 h-3 bg-[#3E7B45] rounded-full -left-[6.5px] top-1"></div>
                  <h3 className="text-xl font-bold">{edu.degree}</h3>
                  <p className="text-gray-400 mb-2">
                    {edu.institution} • {edu.period}
                  </p>
                  <p className="text-gray-300">{edu.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-gray-900 rounded-xl p-8 col-span-2"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <span className="text-[#3E7B45] mr-2">
                <Mail className="w-6 h-6" />
              </span>
              Get In Touch
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-[#3E7B45]">
                    <Mail className="w-5 h-5" />
                  </span>
                  <span>contact@damian.dev</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#3E7B45]">
                    <Globe className="w-5 h-5" />
                  </span>
                  <span>damian.dev</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#3E7B45]">
                    <MapPin className="w-5 h-5" />
                  </span>
                  <span>Lagos, Nigeria</span>
                </div>
                <div className="mt-6">
                  <Button
                    onClick={() => setShowContactForm(!showContactForm)}
                    className="bg-[#3E7B45] hover:bg-[#2D5A33] text-white w-full py-6 flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Send Message
                  </Button>
                </div>
              </div>
              <div>
                <AnimatePresence>
                  {showContactForm && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <ContactForm onClose={() => setShowContactForm(false)} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  )
}
