export type Project = {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  link: string;
  tags: string[];
  date_created: string;
  last_modified: string;
};

export interface NewProject {
  title: string;
  description: string;
  image_url?: string | null;
  link: string;
  tags: string[];
}
