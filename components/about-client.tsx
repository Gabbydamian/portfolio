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
  Code,
  Music,
  Film,
  Book,
  Coffee,
  Heart,
  Star,
  Zap,
  Trophy,
  Target,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ContactForm } from "@/components/contact-form";
import Link from "next/link";
import type {
  Profile,
  Skill,
  Experience,
  Education,
  Interest,
} from "@/app/types/profile";
import {
  STATIC_SKILLS,
  STATIC_EXPERIENCE,
  STATIC_EDUCATION,
  STATIC_INTERESTS,
} from "@/lib/placeholder-data";

interface InterestType {
  icon: ReactElement;
  text: string;
}

interface AboutClientProps {
  profile: Profile | null;
  skills: Skill[];
  experience: Experience[];
  education: Education[];
  interests: Interest[];
}

// Map icon names to Lucide components
const iconMap: Record<string, ReactElement> = {
  Clapperboard: <Clapperboard className="w-5 h-5" />,
  Headphones: <Headphones className="w-5 h-5" />,
  ChessKnight: <ChessKnight className="w-5 h-5" />,
  Rocket: <Rocket className="w-5 h-5" />,
  Gamepad2: <Gamepad2 className="w-5 h-5" />,
  Code: <Code className="w-5 h-5" />,
  Music: <Music className="w-5 h-5" />,
  Film: <Film className="w-5 h-5" />,
  Book: <Book className="w-5 h-5" />,
  Coffee: <Coffee className="w-5 h-5" />,
  Heart: <Heart className="w-5 h-5" />,
  Star: <Star className="w-5 h-5" />,
  Zap: <Zap className="w-5 h-5" />,
  Trophy: <Trophy className="w-5 h-5" />,
  Target: <Target className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
};

export default function AboutClient({
  profile,
  skills: dbSkills,
  experience: dbExperience,
  education: dbEducation,
  interests: dbInterests,
}: AboutClientProps) {
  const [showContactForm, setShowContactForm] = useState(false);

  // Use database data or fallback to static data
  const skills = dbSkills.length > 0 ? dbSkills : STATIC_SKILLS;

  // Map interests with icons
  const mappedInterests: InterestType[] = dbInterests.map((interest) => ({
    icon: iconMap[interest.icon_name] || <Star className="w-5 h-5" />,
    text: interest.text,
  }));

  // Fallback interests
  const staticInterests: InterestType[] = STATIC_INTERESTS.map((interest) => ({
    icon: iconMap[interest.icon_name] || <Star className="w-5 h-5" />,
    text: interest.text,
  }));

  const interests =
    mappedInterests.length > 0 ? mappedInterests : staticInterests;

  // Use database data or fallback for experience and education
  const experience =
    dbExperience.length > 0 ? dbExperience : STATIC_EXPERIENCE;

  const education = dbEducation.length > 0 ? dbEducation : STATIC_EDUCATION;

  // Profile data with fallbacks
  const displayName = profile?.full_name || "Damian Gabriel O.";
  const displayBio = profile?.bio || "Developer. Problem-solver. UX thinker.";
  const displayAvatar = profile?.avatar_url || "/headshot.webp";
  const displayResume = profile?.resume_url || "/Damian_Gabriel-Resume.pdf";
  const displayLocation = profile?.location || "Lagos, Nigeria";
  const displayEmail = profile?.email || "gabbydamian92@gmail.com";
  const displayWebsite = profile?.website || "https://astridamian.vercel.app/";

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
                  src={displayAvatar}
                  alt={displayName}
                  fill
                  className="object-cover"
                  loading="eager"
                  priority
                />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl md:text-4xl font-bold mb-4 flex items-center text-center md:text-left justify-self-center md:justify-self-start">
                  {displayName}{" "}
                  <Link
                    href={displayResume}
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
                      href={`mailto:${displayEmail}`}
                      className="hover:text-primary transition-colors font-medium"
                    >
                      {displayEmail}
                    </Link>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-primary">
                    <Globe className="w-5 h-5" />
                  </span>
                  <span>
                    <Link
                      href={displayWebsite}
                      className="hover:text-primary transition-colors font-medium"
                      target="_blank"
                    >
                      {displayWebsite
                        .replace(/^https?:\/\//, "")
                        .replace(/\/$/, "")}
                    </Link>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-primary">
                    <MapPin className="w-5 h-5" />
                  </span>
                  <span className="font-medium">{displayLocation}</span>
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
