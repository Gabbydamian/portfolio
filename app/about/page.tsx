"use client";

import { useState } from "react";
import { MainLayout } from "@/components/main-layout";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Briefcase,
  GraduationCap,
  Mail,
  MapPin,
  Clapperboard,
  Headphones,
  CastleIcon as ChessKnight,
  Globe,
  Send,
  Rocket,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ContactForm } from "@/components/contact-form";
import Link from "next/link";

export default function About() {
  const [showContactForm, setShowContactForm] = useState(false);

  const skills = [
    {
      name: "JavaScript",
      color:
        "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
    },
    {
      name: "TypeScript",
      color:
        "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
    },
    {
      name: "Python",
      color:
        "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
    },
    {
      name: "React",
      color: "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    },
    {
      name: "Node.js",
      color:
        "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300",
    },
    {
      name: "Docker",
      color: "bg-sky-50 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300",
    },
    {
      name: "Next.js",
      color:
        "bg-slate-50 text-slate-800 dark:bg-slate-800/30 dark:text-slate-300",
    },
    {
      name: "Git",
      color: "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300",
    },
    {
      name: "GraphQL",
      color: "bg-pink-50 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
    },
    {
      name: "Tailwind CSS",
      color: "bg-cyan-50 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300",
    },
    {
      name: "Figma",
      color:
        "bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
    },
    {
      name: "UI/UX Design",
      color:
        "bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
    },
    {
      name: "SQL",
      color: "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    },
    {
      name: "Linux/Unix",
      color:
        "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
    },
    {
      name: "AI Systems",
      color:
        "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
    },
    {
      name: "APIs",
      color: "bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300",
    },
    {
      name: "Supabase",
      color:
        "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
    },
    {
      name: "OOP",
      color: "bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
    },
  ];

  const interests = [
    {
      icon: <Clapperboard className="w-5 h-5" />,
      text: "Classic film analysis and theory",
    },
    {
      icon: <Headphones className="w-5 h-5" />,
      text: "Music production and discovery",
    },
    { icon: <ChessKnight className="w-5 h-5" />, text: "Competitive chess" },
    {
      icon: <Rocket className="w-5 h-5" />,
      text: "Learning new technologies and skills",
    },
  ];

  const experience = [
    {
      title: "Frontend Developer",
      company: "Valdymas",
      period: "Mar 2025 – Present",
      description:
        "Built responsive interfaces for a student management system and a full-stack savings/loan app using React, Next.js, and Supabase. Focused on authentication, data security, and performance visualization.",
    },
    {
      title: "Frontend Developer (Next.js)",
      company: "Hire-ng",
      period: "Apr 2024 – Present",
      description:
        "Developed reusable components using Next.js and TailwindCSS. Partnered with design teams to deliver optimized, engaging user interfaces and improve load times.",
    },
    {
      title: "Frontend Developer Intern",
      company: "IINVIO",
      period: "Nov 2023 – Feb 2024",
      description:
        "Collaborated on React-based app components and system architecture prototypes. Contributed to product research and business model development.",
    },
  ];

  const education = [
    {
      degree: "B.Sc. in Quantity Surveying",
      institution: "Obafemi Awolowo University",
      period: "2017 – 2024",
      description:
        "Graduated with Second Class Honours (Upper Division). Built foundational analytical and project planning skills.",
    },
    {
      degree: "CompTIA IT Fundamentals (ITF+)",
      institution: "CompTIA",
      period: "Sep 2024 – Nov 2024",
      description:
        "Studied core IT concepts, security, operating systems, and troubleshooting. Achieved strong mock exam scores (avg. 83%).",
    },
    {
      degree: "Introduction to Computer Science (CS50X)",
      institution: "Harvard University (edX)",
      period: "Nov 2023 – Jun 2024",
      description:
        "Covered CS fundamentals with C, Python, JavaScript, and SQL. Focused on algorithmic thinking and secure web development.",
    },
  ];

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
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start px-0  py-0 md:py-4 md:px-8">
              <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-[#3E7B45]">
                <Image
                  src="/headshot.jpg"
                  alt="Damian Gabriel"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h1 className="text-4xl font-bold mb-4 flex items-center">
                  Damian Gabriel O.
                </h1>
                <p className="text-gray-300 mb-6 text-justify">
                  <span className="font-semibold text-rose-500">
                    Developer.{" "}
                  </span>
                  <span className="font-semibold text-amber-500">
                    Problem-solver.{" "}
                  </span>
                  <span className="font-semibold text-cyan-500">
                    UX thinker.{" "}
                  </span>
                  I build full-stack web apps that are
                  <span className="text-green-400 font-medium">
                    {" "}
                    fast, clean, and built to scale.{" "}
                  </span>
                  A product MVP, admin dashboard, or internal tool? I’ve got you
                  covered. I build with{" "}
                  <span className="text-blue-400">React</span>,{" "}
                  <span className="text-blue-400">Next.js</span>, and modern
                  backend stacks, I focus on {""}
                  detail, performance, and creating products that people
                  actually enjoy using.
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {skills.map((skill) => (
                    <Badge
                      key={skill.name}
                      className={`${skill.color} px-4 py-1 text-sm rounded-sm hover:shadow-md transition duration-300 cursor-default`}
                    >
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </div>
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
                <div
                  key={index}
                  className="relative pl-6 border-l border-gray-700"
                >
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
                <div
                  key={index}
                  className="relative pl-6 border-l border-gray-700"
                >
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

          {/* Interests Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gray-900 rounded-xl p-8 col-span-2"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center text-center justify-self-center">
              {/* <span className="text-[#3E7B45] mr-2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
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
              </span> */}
              Interests
            </h2>
            <div className="flex flex-wrap gap-6 justify-center">
              {interests.map((interest, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-gray-800/50 px-4 py-2 rounded-lg min-w-[200px]"
                >
                  <span className="text-[#3E7B45]">{interest.icon}</span>
                  <span className="text-sm md:text-base">{interest.text}</span>
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
                  <span>
                    <Link
                      href={"mailto:gabbydamian92@gmail.com"}
                      className="hover:text-[#3E7B45] transition-colors font-medium"
                    >
                      gabbydamian92@gmail.com
                    </Link>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#3E7B45]">
                    <Globe className="w-5 h-5" />
                  </span>
                  <span>
                    <Link
                      href={"https://astridamian.vercel.app/"}
                      className="hover:text-[#3e7b45] transition-colors font-medium"
                    >
                      astridamian.dev
                    </Link>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#3E7B45]">
                    <MapPin className="w-5 h-5" />
                  </span>
                  <span className="font-medium">Lagos, Nigeria</span>
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
  );
}
