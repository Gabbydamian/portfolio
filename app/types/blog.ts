export type Blog = {
  author: string | null;
  email: string | null;
  category: string | null;
  content: string;
  cover_img: string | null;
  date_created: string;
  excerpt: string;
  id: string;
  read_time: string | null;
  slug: string;
  title: string;
  approved: boolean;
};

export type BlogProps = {
  fetchedBlogs: Blog[];
  blogsError: string | null;
};

export type BlogCategory =
  | "all"
  | "development"
  | "design"
  | "personal"
  | "security";

export type BlogPageProps = {
  post: Blog;
};

export type PendingSubmissionsProps = {
  submissions: Blog[];
};

export interface NewBlogPost {
  title: string;
  category: string | null;
  cover_img?: string | null;
  content: string;
  excerpt: string;
  approved?: boolean;
  name?: string;
  email?: string;
}
