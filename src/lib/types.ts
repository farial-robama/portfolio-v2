export interface Post {
  id: string;
  title: string;
  excerpt: string;
  date: string | null;
  status: "published" | "draft";
  views: number;
}

export interface Project {
  id: string;
  tag: string;
  title: string;
  description: string;
  stack: string[];
}

export interface TimelineItem {
  date: string;
  role: string;
  org: string;
  description: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}
