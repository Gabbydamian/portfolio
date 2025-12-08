import type { Metadata } from "next";
import AboutClient from "../../components/about-client";
import {
  fetchProfile,
  fetchSkills,
  fetchExperience,
  fetchEducation,
  fetchInterests,
} from "@/actions/profileActions";

export const metadata: Metadata = {
  title: "About | Damian Gabriel - Full-Stack Developer & IT Expert",
  description:
    "Learn more about Damian Gabriel, a passionate full-stack developer and IT Expert specializing in React, Next.js, and TypeScript. Discover his background, skills, interests, and professional journey.",
  keywords: [
    "Damian Gabriel",
    "About",
    "Full-Stack Developer",
    "IT Expert",
    "Web Development",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Software Engineering",
    "Portfolio",
    "Personal Story",
  ],
  openGraph: {
    title: "About | Damian Gabriel - Full-Stack Developer & IT Expert",
    description:
      "Learn more about Damian Gabriel, his skills, experience, and journey as a web developer.",
    url: "https://astridamian.vercel.app/about",
    siteName: "Damian Gabriel - About",
    images: [
      {
        url: "https://astridamian.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "About Damian Gabriel - Full-Stack Developer & IT Expert",
      },
    ],
    locale: "en_US",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "About | Damian Gabriel - Full-Stack Developer & IT Expert",
    description:
      "Learn more about Damian Gabriel, his skills, experience, and journey as a web developer.",
    images: ["https://astridamian.vercel.app/og-image.png"],
  },
  alternates: {
    canonical: "https://astridamian.vercel.app/about",
  },
  category: "Technology",
};

export default async function AboutPage() {
  // Fetch all about page data from database
  const profileResult = await fetchProfile();
  const skillsResult = await fetchSkills();
  const experienceResult = await fetchExperience();
  const educationResult = await fetchEducation();
  const interestsResult = await fetchInterests();

  const profile = profileResult.error ? null : profileResult.profile;
  const skills = skillsResult.error ? [] : skillsResult.skills ?? [];
  const experience = experienceResult.error
    ? []
    : experienceResult.experience ?? [];
  const education = educationResult.error
    ? []
    : educationResult.education ?? [];
  const interests = interestsResult.error
    ? []
    : interestsResult.interests ?? [];

  return (
    <AboutClient
      profile={profile}
      skills={skills}
      experience={experience}
      education={education}
      interests={interests}
    />
  );
}
