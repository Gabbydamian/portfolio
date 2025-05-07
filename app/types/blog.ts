export type Blog = {
  author: string | null;
  category: string | null;
  content: string;
  cover_img: string | null;
  date_created: string;
  excerpt: string;
  id: string;
  read_time: string | null;
  slug: string;
  title: string;
};

export type BlogProps = {
  fetchedBlogs: Blog[];
  blogsError: string | null;
};

export type BlogCategory =
  | "all"
  | "development"
  | "design"
  | "career"
  | "personal";

export type BlogPageProps = {
  post: Blog;
};
