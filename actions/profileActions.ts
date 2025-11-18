"use server";

import { revalidatePath } from "next/cache";
import type {
    Profile,
    ProfileUpdate,
    Skill,
    SkillInsert,
    SkillUpdate,
    Experience,
    ExperienceInsert,
    ExperienceUpdate,
    Education,
    EducationInsert,
    EducationUpdate,
    Interest,
    InterestInsert,
    InterestUpdate,
} from "@/app/types/profile";
import { uploadImage } from "@/lib/image-utils";
import { createClient } from "@/utils/supabase/supabase";

// =============================================
// PROFILE ACTIONS
// =============================================

export async function fetchProfile() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("profile")
        .select("*")
        .single();

    if (error) {
        console.error("Error fetching profile:", error);
        return { error: error.message, profile: null };
    }

    return { profile: data as Profile, error: null };
}

export async function updateProfile(updates: ProfileUpdate) {
    const supabase = await createClient();

    // Get the first profile (should only be one)
    const { data: existing } = await supabase
        .from("profile")
        .select("id")
        .single();

    if (!existing) {
        return { error: "Profile not found", success: false };
    }

    const { error } = await supabase
        .from("profile")
        .update(updates)
        .eq("id", existing.id);

    if (error) {
        console.error("Error updating profile:", error);
        return { error: error.message, success: false };
    }

    revalidatePath("/about");
    return { success: true, error: null };
}

export async function uploadAvatar(file: File) {
    try {
        const url = await uploadImage(file, "profile-images", "avatar");

        // Update profile with new avatar URL
        await updateProfile({ avatar_url: url });

        revalidatePath("/about");
        return { url, error: null };
    } catch (error: any) {
        console.error("Error uploading avatar:", error);
        return { url: null, error: error.message };
    }
}

export async function uploadResume(file: File) {
    const supabase = await createClient();

    try {
        // Validate file type
        if (file.type !== "application/pdf") {
            return { url: null, error: "Only PDF files are allowed" };
        }

        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
            return { url: null, error: "File size must be less than 5MB" };
        }

        const fileName = `resume-${Date.now()}.pdf`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from("resumes")
            .upload(filePath, file, {
                cacheControl: "3600",
                upsert: true,
            });

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
            .from("resumes")
            .getPublicUrl(filePath);

        const url = urlData.publicUrl;

        // Update profile with new resume URL
        await updateProfile({ resume_url: url });

        revalidatePath("/about");
        return { url, error: null };
    } catch (error: any) {
        console.error("Error uploading resume:", error);
        return { url: null, error: error.message };
    }
}

// =============================================
// SKILLS ACTIONS
// =============================================

export async function fetchSkills() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("skills")
        .select("*")
        .order("order", { ascending: true });

    if (error) {
        console.error("Error fetching skills:", error);
        return { error: error.message, skills: [] };
    }

    return { skills: data as Skill[], error: null };
}

export async function addSkill(skill: SkillInsert) {
    const supabase = await createClient();

    // Get the max order to append at the end
    const { data: maxOrderData } = await supabase
        .from("skills")
        .select("order")
        .order("order", { ascending: false })
        .limit(1)
        .single();

    const newOrder = skill.order ?? (maxOrderData?.order ?? 0) + 1;

    const { data, error } = await supabase
        .from("skills")
        .insert({ ...skill, order: newOrder })
        .select()
        .single();

    if (error) {
        console.error("Error adding skill:", error);
        return { error: error.message, skill: null };
    }

    revalidatePath("/about");
    return { skill: data as Skill, error: null };
}

export async function updateSkill(id: string, updates: SkillUpdate) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("skills")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

    if (error) {
        console.error("Error updating skill:", error);
        return { error: error.message, skill: null };
    }

    revalidatePath("/about");
    return { skill: data as Skill, error: null };
}

export async function deleteSkill(id: string) {
    const supabase = await createClient();

    const { error } = await supabase
        .from("skills")
        .delete()
        .eq("id", id);

    if (error) {
        console.error("Error deleting skill:", error);
        return { error: error.message, success: false };
    }

    revalidatePath("/about");
    return { success: true, error: null };
}

export async function reorderSkills(skillIds: string[]) {
    const supabase = await createClient();

    // Update order for each skill
    const updates = skillIds.map((id, index) =>
        supabase
            .from("skills")
            .update({ order: index + 1 })
            .eq("id", id)
    );

    const results = await Promise.all(updates);
    const errors = results.filter((r) => r.error);

    if (errors.length > 0) {
        console.error("Error reordering skills:", errors);
        return { error: "Failed to reorder some skills", success: false };
    }

    revalidatePath("/about");
    return { success: true, error: null };
}

// =============================================
// EXPERIENCE ACTIONS
// =============================================

export async function fetchExperience() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("experience")
        .select("*")
        .order("order", { ascending: true });

    if (error) {
        console.error("Error fetching experience:", error);
        return { error: error.message, experience: [] };
    }

    return { experience: data as Experience[], error: null };
}

export async function addExperience(exp: ExperienceInsert) {
    const supabase = await createClient();

    // Get the max order to append at the end
    const { data: maxOrderData } = await supabase
        .from("experience")
        .select("order")
        .order("order", { ascending: false })
        .limit(1)
        .single();

    const newOrder = exp.order ?? (maxOrderData?.order ?? 0) + 1;

    const { data, error } = await supabase
        .from("experience")
        .insert({ ...exp, order: newOrder })
        .select()
        .single();

    if (error) {
        console.error("Error adding experience:", error);
        return { error: error.message, experience: null };
    }

    revalidatePath("/about");
    return { experience: data as Experience, error: null };
}

export async function updateExperience(id: string, updates: ExperienceUpdate) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("experience")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

    if (error) {
        console.error("Error updating experience:", error);
        return { error: error.message, experience: null };
    }

    revalidatePath("/about");
    return { experience: data as Experience, error: null };
}

export async function deleteExperience(id: string) {
    const supabase = await createClient();

    const { error } = await supabase
        .from("experience")
        .delete()
        .eq("id", id);

    if (error) {
        console.error("Error deleting experience:", error);
        return { error: error.message, success: false };
    }

    revalidatePath("/about");
    return { success: true, error: null };
}

export async function reorderExperience(expIds: string[]) {
    const supabase = await createClient();

    const updates = expIds.map((id, index) =>
        supabase
            .from("experience")
            .update({ order: index + 1 })
            .eq("id", id)
    );

    const results = await Promise.all(updates);
    const errors = results.filter((r) => r.error);

    if (errors.length > 0) {
        console.error("Error reordering experience:", errors);
        return { error: "Failed to reorder some experience items", success: false };
    }

    revalidatePath("/about");
    return { success: true, error: null };
}

// =============================================
// EDUCATION ACTIONS
// =============================================

export async function fetchEducation() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("education")
        .select("*")
        .order("order", { ascending: true });

    if (error) {
        console.error("Error fetching education:", error);
        return { error: error.message, education: [] };
    }

    return { education: data as Education[], error: null };
}

export async function addEducation(edu: EducationInsert) {
    const supabase = await createClient();

    // Get the max order to append at the end
    const { data: maxOrderData } = await supabase
        .from("education")
        .select("order")
        .order("order", { ascending: false })
        .limit(1)
        .single();

    const newOrder = edu.order ?? (maxOrderData?.order ?? 0) + 1;

    const { data, error } = await supabase
        .from("education")
        .insert({ ...edu, order: newOrder })
        .select()
        .single();

    if (error) {
        console.error("Error adding education:", error);
        return { error: error.message, education: null };
    }

    revalidatePath("/about");
    return { education: data as Education, error: null };
}

export async function updateEducation(id: string, updates: EducationUpdate) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("education")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

    if (error) {
        console.error("Error updating education:", error);
        return { error: error.message, education: null };
    }

    revalidatePath("/about");
    return { education: data as Education, error: null };
}

export async function deleteEducation(id: string) {
    const supabase = await createClient();

    const { error } = await supabase
        .from("education")
        .delete()
        .eq("id", id);

    if (error) {
        console.error("Error deleting education:", error);
        return { error: error.message, success: false };
    }

    revalidatePath("/about");
    return { success: true, error: null };
}

export async function reorderEducation(eduIds: string[]) {
    const supabase = await createClient();

    const updates = eduIds.map((id, index) =>
        supabase
            .from("education")
            .update({ order: index + 1 })
            .eq("id", id)
    );

    const results = await Promise.all(updates);
    const errors = results.filter((r) => r.error);

    if (errors.length > 0) {
        console.error("Error reordering education:", errors);
        return { error: "Failed to reorder some education items", success: false };
    }

    revalidatePath("/about");
    return { success: true, error: null };
}

// =============================================
// INTERESTS ACTIONS
// =============================================

export async function fetchInterests() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("interests")
        .select("*")
        .order("order", { ascending: true });

    if (error) {
        console.error("Error fetching interests:", error);
        return { error: error.message, interests: [] };
    }

    return { interests: data as Interest[], error: null };
}

export async function addInterest(interest: InterestInsert) {
    const supabase = await createClient();

    // Get the max order to append at the end
    const { data: maxOrderData } = await supabase
        .from("interests")
        .select("order")
        .order("order", { ascending: false })
        .limit(1)
        .single();

    const newOrder = interest.order ?? (maxOrderData?.order ?? 0) + 1;

    const { data, error } = await supabase
        .from("interests")
        .insert({ ...interest, order: newOrder })
        .select()
        .single();

    if (error) {
        console.error("Error adding interest:", error);
        return { error: error.message, interest: null };
    }

    revalidatePath("/about");
    return { interest: data as Interest, error: null };
}

export async function updateInterest(id: string, updates: InterestUpdate) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("interests")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

    if (error) {
        console.error("Error updating interest:", error);
        return { error: error.message, interest: null };
    }

    revalidatePath("/about");
    return { interest: data as Interest, error: null };
}

export async function deleteInterest(id: string) {
    const supabase = await createClient();

    const { error } = await supabase
        .from("interests")
        .delete()
        .eq("id", id);

    if (error) {
        console.error("Error deleting interest:", error);
        return { error: error.message, success: false };
    }

    revalidatePath("/about");
    return { success: true, error: null };
}

export async function reorderInterests(interestIds: string[]) {
    const supabase = await createClient();

    const updates = interestIds.map((id, index) =>
        supabase
            .from("interests")
            .update({ order: index + 1 })
            .eq("id", id)
    );

    const results = await Promise.all(updates);
    const errors = results.filter((r) => r.error);

    if (errors.length > 0) {
        console.error("Error reordering interests:", errors);
        return { error: "Failed to reorder some interests", success: false };
    }

    revalidatePath("/about");
    return { success: true, error: null };
}
