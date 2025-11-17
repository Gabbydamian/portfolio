export type LearningPost = {
    id: string;
    title: string;
    slug: string;
    content: string;
    topic: string;
    author: string | null;
    date_created: string;
    date_modified: string;
    status: "draft" | "published";
    image: string | null;
};

export type NewLearningPost = {
    title: string;
    content: string;
    topic: string;
    image?: string | null;
    status?: "draft" | "published";
    author?: string | null;
};

export type LearningPostPageProps = {
    post: LearningPost;
};

export type LearningPostsProps = {
    posts: LearningPost[];
    topics: string[];
    selectedTopic: string;
};
