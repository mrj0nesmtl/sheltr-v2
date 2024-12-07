export interface BlogAuthor {
  name: string;
  avatar: string;
  title?: string;
  bio?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  author: BlogAuthor;
  publishedAt: string;
  summary: string;
  content: string;
  categories: string[];
  image: string;
} 