"use server";

import { createClient } from "@/utils/supabase/supabase";
import { calculateReadTime, generateSlug } from "@/lib/utils";
import { NewLearningPost, LearningPost } from "@/app/types/learning";
import { revalidateTag } from "next/cache";

export async function fetchLearningPosts() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("learning_posts")
        .select("*")
        .eq("status", "published")
        .order("date_created", { ascending: false });

    if (error) {
        console.error("Error fetching learning posts:", error);
        return { posts: null, error };
    }

    return { posts: data, error: null };
}

export async function fetchLearningPostsByTopic(topic: string) {
    const supabase = await createClient();

    let query = supabase
        .from("learning_posts")
        .select("*")
        .eq("status", "published")
        .order("date_created", { ascending: false });

    if (topic !== "all") {
        query = query.eq("topic", topic);
    }

    const { data, error } = await query;

    if (error) {
        console.error("Error fetching learning posts by topic:", error);
        return { posts: null, error };
    }

    return { posts: data, error: null };
}

export async function fetchLearningPostBySlug(slug: string) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("learning_posts")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .single();

    if (error) {
        console.error("Error fetching learning post:", error);
        return { post: null, error };
    }

    return { post: data, error: null };
}

export async function getAllTopics() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("learning_posts")
        .select("topic")
        .eq("status", "published")
        .order("topic", { ascending: true });

    if (error) {
        console.error("Error fetching topics:", error);
        return { topics: [], error };
    }

    // Get unique topics
    const uniqueTopics = Array.from(
        new Set(data?.map((item: any) => item.topic).filter(Boolean) || [])
    ) as string[];

    return { topics: uniqueTopics, error: null };
}

export async function addLearningPost(postData: NewLearningPost) {
    const supabase = await createClient();

    const slug = generateSlug(postData.title);

    const session = await supabase.auth.getSession();
    const author = session.data.session
        ? "Damian Gabriel"
        : postData.author || "Anonymous";

    const now = new Date().toISOString();

    const post = {
        title: postData.title,
        slug,
        content: postData.content,
        topic: postData.topic,
        author,
        image: postData.image || null,
        status: postData.status || "published",
        date_created: now,
        date_modified: now,
    };

    const { error } = await supabase.from("learning_posts").insert([post]);

    if (error) {
        console.error("Error inserting learning post:", error);
        return { success: false, error };
    }

    revalidateTag("learning-posts");
    revalidateTag("learning-topics");
    revalidateTag("sitemap");

    return { success: true };
}

export async function updateLearningPost(
    id: string,
    postData: NewLearningPost
) {
    const supabase = await createClient();

    const slug = generateSlug(postData.title);
    const now = new Date().toISOString();

    const { error } = await supabase
        .from("learning_posts")
        .update({
            title: postData.title,
            slug,
            content: postData.content,
            topic: postData.topic,
            image: postData.image || null,
            status: postData.status || "published",
            date_modified: now,
        })
        .eq("id", id);

    if (error) {
        console.error("Error updating learning post:", error);
        return { success: false, error };
    }

    revalidateTag("learning-posts");
    revalidateTag("learning-topics");
    revalidateTag("sitemap");

    return { success: true };
}

export async function deleteLearningPost(id: string) {
    const supabase = await createClient();

    const { error } = await supabase
        .from("learning_posts")
        .delete()
        .eq("id", id);

    if (error) {
        console.error("Error deleting learning post:", error);
        return { success: false, error };
    }

    revalidateTag("learning-posts");
    revalidateTag("learning-topics");
    revalidateTag("sitemap");

    return { success: true };
}
