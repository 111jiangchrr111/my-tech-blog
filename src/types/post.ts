export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  summary: string;
  coverImage?: string;
}

export interface Post extends PostMeta {
  content: string;
  readingTime: number;
}

export interface PostIndex {
  posts: PostMeta[];
  tags: { name: string; count: number }[];
}

export interface TocItem {
  id: string;
  text: string;
  level: number;
}
