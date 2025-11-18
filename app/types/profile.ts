// =============================================
// Profile TypeScript Types
// =============================================

export interface Profile {
    id: string;
    full_name: string;
    title: string;
    bio: string;
    avatar_url: string | null;
    resume_url: string | null;
    email: string;
    location: string | null;
    website: string | null;
    created_at: string;
    updated_at: string;
}

export interface ProfileUpdate {
    full_name?: string;
    title?: string;
    bio?: string;
    avatar_url?: string | null;
    resume_url?: string | null;
    email?: string;
    location?: string | null;
    website?: string | null;
}

export interface Skill {
    id: string;
    name: string;
    color: string;
    category: string;
    order: number;
    created_at: string;
}

export interface SkillInsert {
    name: string;
    color: string;
    category?: string;
    order?: number;
}

export interface SkillUpdate {
    name?: string;
    color?: string;
    category?: string;
    order?: number;
}

export interface Experience {
    id: string;
    title: string;
    company: string;
    period: string;
    description: string;
    order: number;
    is_current: boolean;
    created_at: string;
}

export interface ExperienceInsert {
    title: string;
    company: string;
    period: string;
    description: string;
    order?: number;
    is_current?: boolean;
}

export interface ExperienceUpdate {
    title?: string;
    company?: string;
    period?: string;
    description?: string;
    order?: number;
    is_current?: boolean;
}

export interface Education {
    id: string;
    degree: string;
    institution: string;
    period: string;
    description: string;
    order: number;
    created_at: string;
}

export interface EducationInsert {
    degree: string;
    institution: string;
    period: string;
    description: string;
    order?: number;
}

export interface EducationUpdate {
    degree?: string;
    institution?: string;
    period?: string;
    description?: string;
    order?: number;
}

export interface Interest {
    id: string;
    text: string;
    icon_name: string;
    order: number;
    created_at: string;
}

export interface InterestInsert {
    text: string;
    icon_name: string;
    order?: number;
}

export interface InterestUpdate {
    text?: string;
    icon_name?: string;
    order?: number;
}
