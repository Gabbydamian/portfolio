"use client";

import { useState, useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Upload, FileText, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import {
  updateProfile,
  uploadAvatar,
  uploadResume,
} from "@/actions/profileActions";
import type { Profile } from "@/app/types/profile";

interface ProfileInfoFormProps {
  profile: Profile | null;
}

export function ProfileInfoForm({ profile }: ProfileInfoFormProps) {
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isUploadingResume, setIsUploadingResume] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url || "");
  const [resumeUrl, setResumeUrl] = useState(profile?.resume_url || "");

  const [state, formAction, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      const result = await updateProfile({
        full_name: formData.get("full_name") as string,
        title: formData.get("title") as string,
        bio: formData.get("bio") as string,
        email: formData.get("email") as string,
        location: formData.get("location") as string,
        website: formData.get("website") as string,
      });

      if (result.error) {
        return { error: result.error };
      }

      return { success: true };
    },
    null
  );

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingAvatar(true);

    const result = await uploadAvatar(file);

    if (result.error) {
      toast.error(result.error);
    } else if (result.url) {
      setAvatarUrl(result.url);
      toast.success("Profile photo updated successfully");
    }

    setIsUploadingAvatar(false);
  };

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingResume(true);

    const result = await uploadResume(file);

    if (result.error) {
      toast.error(result.error);
    } else if (result.url) {
      setResumeUrl(result.url);
      toast.success("Resume uploaded successfully");
    }

    setIsUploadingResume(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-1">Profile Information</h3>
        <p className="text-sm text-muted-foreground">
          Update your personal information and profile photo
        </p>
      </div>

      {/* Avatar Upload Section */}
      <div className="space-y-3">
        <Label>Profile Photo</Label>
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={avatarUrl} alt={profile?.full_name || "Avatar"} />
            <AvatarFallback>
              {profile?.full_name
                ?.split(" ")
                .map((n) => n[0])
                .join("") || "?"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Label htmlFor="avatar-upload" className="cursor-pointer">
              <div className="flex items-center gap-2 px-4 py-2 border border-input rounded-md hover:bg-accent transition-colors w-fit">
                {isUploadingAvatar ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm">Uploading...</span>
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4" />
                    <span className="text-sm">Upload New Photo</span>
                  </>
                )}
              </div>
            </Label>
            <input
              id="avatar-upload"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleAvatarUpload}
              disabled={isUploadingAvatar}
              className="hidden"
            />
            <p className="text-xs text-muted-foreground mt-1">
              JPG, PNG or WebP. Max 2MB.
            </p>
          </div>
        </div>
      </div>

      {/* Resume Upload Section */}
      <div className="space-y-3">
        <Label>Resume/CV</Label>
        <div className="flex items-center gap-4">
          {resumeUrl ? (
            <div className="flex items-center gap-2 px-3 py-2 border border-input rounded-md bg-muted">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Resume uploaded</span>
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2"
              >
                <ExternalLink className="h-4 w-4 text-primary hover:text-primary/80" />
              </a>
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">
              No resume uploaded
            </div>
          )}
          <Label htmlFor="resume-upload" className="cursor-pointer">
            <div className="flex items-center gap-2 px-4 py-2 border border-input rounded-md hover:bg-accent transition-colors">
              {isUploadingResume ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Uploading...</span>
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  <span className="text-sm">Upload Resume</span>
                </>
              )}
            </div>
          </Label>
          <input
            id="resume-upload"
            type="file"
            accept="application/pdf"
            onChange={handleResumeUpload}
            disabled={isUploadingResume}
            className="hidden"
          />
        </div>
        <p className="text-xs text-muted-foreground">PDF only. Max 5MB.</p>
      </div>


      {/* Profile Form */}
      <form action={formAction} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="full_name">Full Name</Label>
            <Input
              id="full_name"
              name="full_name"
              defaultValue={profile?.full_name}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              defaultValue={profile?.title}
              placeholder="e.g., Full-Stack Developer"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            name="bio"
            defaultValue={profile?.bio}
            rows={4}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              defaultValue={profile?.email}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              defaultValue={profile?.location || ""}
              placeholder="e.g., Lagos, Nigeria"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            name="website"
            type="url"
            defaultValue={profile?.website || ""}
            placeholder="https://example.com"
          />
        </div>

        {state?.error && (
          <Alert variant="destructive">
            <AlertDescription>{state.error}</AlertDescription>
          </Alert>
        )}

        {state?.success && (
          <Alert>
            <AlertDescription>Profile updated successfully!</AlertDescription>
          </Alert>
        )}

        <Button type="submit" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </form>
    </div>
  );
}
