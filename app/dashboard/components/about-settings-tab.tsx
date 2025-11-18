"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import type {
  Profile,
  Skill,
  Experience,
  Education,
  Interest,
} from "@/app/types/profile";
import { EducationManager } from "./education-manager";
import { ExperienceManager } from "./experience-manager";
import { InterestsManager } from "./interests-manager";
import { ProfileInfoForm } from "./profile-info-form";
import { SkillsManager } from "./skills-manager";

interface AboutSettingsTabProps {
  profile: Profile | null;
  skills: Skill[];
  experience: Experience[];
  education: Education[];
  interests: Interest[];
}

export function AboutSettingsTab({
  profile,
  skills,
  experience,
  education,
  interests,
}: AboutSettingsTabProps) {
  const [activeSubTab, setActiveSubTab] = useState("profile");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">About Settings</h2>
        <p className="text-muted-foreground">
          Manage your profile information, skills, experience, education, and
          interests
        </p>
      </div>

      <Tabs value={activeSubTab} onValueChange={setActiveSubTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="interests">Interests</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card className="p-6">
            <ProfileInfoForm profile={profile} />
          </Card>
        </TabsContent>

        <TabsContent value="experience" className="space-y-4">
          <ExperienceManager experience={experience} />
        </TabsContent>

        <TabsContent value="education" className="space-y-4">
          <EducationManager education={education} />
        </TabsContent>

        <TabsContent value="skills" className="space-y-4">
          <SkillsManager skills={skills} />
        </TabsContent>

        <TabsContent value="interests" className="space-y-4">
          <InterestsManager interests={interests} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
