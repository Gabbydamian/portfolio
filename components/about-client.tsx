"use client";

import { ReactElement, useState } from "react";
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
  FileDown,
  Gamepad2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ContactForm } from "@/components/contact-form";
import Link from "next/link";

interface InterestType {
  icon: ReactElement;
  text: string;
}

export default function AboutClient() {
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

  const interests: InterestType[] = [
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
    // { icon: <Gamepad2 className="w-5 h-5" />, text: "Gameplay" },
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
      {/* Structured data for About/Person */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Damian Gabriel",
            url: "https://astridamian.vercel.app/about",
            jobTitle: "Full-Stack Developer & IT Expert",
            description:
              "Learn more about Damian Gabriel, a passionate full-stack developer and IT Expert specializing in React, Next.js, and TypeScript.",
            sameAs: [
              "https://github.com/Gabbydamian",
              "https://linkedin.com/in/gabriel-damian-43309423b",
              "https://twitter.com/astridesigns_",
            ],
            inLanguage: "en-US",
          }),
        }}
      />
      <div className="container mx-auto px-4 md:px-24 py-12 mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-card text-card-foreground rounded-xl p-8 col-span-2"
          >
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start px-0  py-0 md:py-4 md:px-8">
              <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-primary">
                <Image
                  src="/headshot.webp"
                  alt="Damian Gabriel"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl md:text-4xl font-bold mb-4 flex items-center text-center md:text-left justify-self-center md:justify-self-start">
                  Damian Gabriel O.{" "}
                  <Link
                    href="/Damian_Gabriel-Resume.pdf"
                    target="_blank"
                    className="ml-2 hover:text-[#6B26D9] transition-colors"
                  >
                    <FileDown className="w-6 h-6" />
                  </Link>
                </h1>
                <p className="text-muted-foreground mb-6 text-center md:text-justify">
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
                  A product MVP, admin dashboard, or internal tool? I've got you
                  covered. I build with{" "}
                  <span className="text-blue-400 font-medium">React</span>,{" "}
                  <span className="text-blue-400 font-medium">Next.js</span>,
                  and modern backend stacks, I focus on {""}
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
            className="bg-card text-card-foreground rounded-xl p-8 col-span-2 md:col-span-1"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <span className="text-primary mr-2">
                <Briefcase className="w-6 h-6" />
              </span>
              Experience
            </h2>
            <div className="space-y-8">
              {experience.map((job, index) => (
                <div
                  key={index}
                  className="relative pl-6 border-l border-border"
                >
                  <div className="absolute w-3 h-3 bg-primary rounded-full -left-[6.5px] top-1"></div>
                  <h3 className="text-xl font-bold">{job.title}</h3>
                  <p className="text-muted-foreground mb-2">
                    {job.company} • {job.period}
                  </p>
                  <p className="text-muted-foreground">{job.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Education Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-card text-card-foreground rounded-xl p-8 col-span-2 md:col-span-1"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <span className="text-primary mr-2">
                <GraduationCap className="w-6 h-6" />
              </span>
              Education
            </h2>
            <div className="space-y-8">
              {education.map((edu, index) => (
                <div
                  key={index}
                  className="relative pl-6 border-l border-border"
                >
                  <div className="absolute w-3 h-3 bg-primary rounded-full -left-[6.5px] top-1"></div>
                  <h3 className="text-xl font-bold">{edu.degree}</h3>
                  <p className="text-muted-foreground mb-2">
                    {edu.institution} • {edu.period}
                  </p>
                  <p className="text-muted-foreground">{edu.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Interests Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-card text-card-foreground rounded-xl p-8 col-span-2"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center text-center justify-self-center text-foreground">
              Interests
            </h2>
            <div className="flex flex-wrap gap-6 justify-center">
              {interests.map((interest, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-muted px-4 py-2 rounded-lg min-w-[200px]"
                >
                  <span className="text-primary">{interest.icon}</span>
                  <span className="text-sm md:text-base text-foreground">
                    {interest.text}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-card text-card-foreground rounded-xl p-8 col-span-2"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center justify-center text-center">
              <span className="text-primary mr-2">
                <Mail className="w-6 h-6" />
              </span>
              Get In Touch
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-8 col-span-1 place-items-center md:place-items-start mt-6">
                <div className="flex items-center gap-3">
                  <span className="text-primary">
                    <Mail className="w-5 h-5" />
                  </span>
                  <span>
                    <Link
                      href={"mailto:gabbydamian92@gmail.com"}
                      className="hover:text-primary transition-colors font-medium"
                    >
                      gabbydamian92@gmail.com
                    </Link>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-primary">
                    <Globe className="w-5 h-5" />
                  </span>
                  <span>
                    <Link
                      href={"https://astridamian.vercel.app/"}
                      className="hover:text-primary transition-colors font-medium"
                    >
                      astridamian.dev
                    </Link>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-primary">
                    <MapPin className="w-5 h-5" />
                  </span>
                  <span className="font-medium">Lagos, Nigeria</span>
                </div>
              </div>
              <div className="col-span-2">
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <ContactForm onClose={() => setShowContactForm(false)} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
}
