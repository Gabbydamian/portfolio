export type Project = {
  id: string;
  title: string;
  description: string;
  image: string | null;
  link: string;
  tags: string[];
  date_created: string;
  last_modified: string;
  source_code?: string;
};

export interface NewProject {
  title: string;
  description: string;
  image?: string | null;
  link: string;
  tags: string[];
  source_code?: string;
  last_modified?: Date;
}
