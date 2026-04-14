import type { PostMeta, Post, TocItem } from '@/types/post';
import reactGuideRaw from '../content/posts/react-18-guide.md?raw';
import tsTypesRaw from '../content/posts/typescript-advanced-types.md?raw';
import viteBuildRaw from '../content/posts/vite-build-optimization.md?raw';
import cicdRaw from '../content/posts/cicd-pipeline-guide.md?raw';
import jsAsyncRaw from '../content/posts/js-async-programming.md?raw';

const rawPosts: Record<string, string> = {
  '../content/posts/react-18-guide.md': reactGuideRaw,
  '../content/posts/typescript-advanced-types.md': tsTypesRaw,
  '../content/posts/vite-build-optimization.md': viteBuildRaw,
  '../content/posts/cicd-pipeline-guide.md': cicdRaw,
  '../content/posts/js-async-programming.md': jsAsyncRaw,
};

let cachedIndex: { posts: PostMeta[]; tags: { name: string; count: number }[] } | null = null;

/** Pure-browser frontmatter parser (no gray-matter / Buffer dependency) */
function parseFrontmatter(raw: string): { data: Record<string, unknown>; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };
  const fm: Record<string, unknown> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const m = line.match(/^(\w[\w-]*)\s*:\s*(.*)$/);
    if (!m) continue;
    const key = m[1];
    let val: string | string[] = m[2].trim();
    if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
    else if (val.startsWith('[') && val.endsWith(']')) {
      val = val
        .slice(1, -1)
        .split(',')
        .map(s => s.trim().replace(/^['"]|['"]$/g, ''))
        .filter(Boolean);
    }
    fm[key] = val;
  }
  return { data: fm, content: match[2] };
}

function parsePost(slug: string, rawContent: string): Post {
  const { data, content } = parseFrontmatter(rawContent);
  const wordCount = content.length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 400));

  return {
    slug,
    title: String(data.title || slug),
    date: String(data.date || new Date().toISOString().split('T')[0]),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    summary: String(data.summary || ''),
    content,
    readingTime,
  };
}

export function getPostIndex(): { posts: PostMeta[]; tags: { name: string; count: number }[] } {
  if (cachedIndex) return cachedIndex;

  const posts: PostMeta[] = Object.entries(rawPosts).map(([filePath, rawContent]) => {
    const fileName = filePath.split('/').pop() || filePath;
    const slug = fileName.replace(/\.md$/, '');
    const post = parsePost(slug, rawContent);
    return {
      slug: post.slug,
      title: post.title,
      date: post.date,
      tags: post.tags,
      summary: post.summary,
    };
  });

  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const tagMap = new Map<string, number>();
  posts.forEach(post => {
    post.tags.forEach(tag => {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
    });
  });

  const tags = Array.from(tagMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  cachedIndex = { posts, tags };
  return cachedIndex;
}

export function getAllPosts(): PostMeta[] {
  return getPostIndex().posts;
}

export function getPostBySlug(slug: string): Post | null {
  const matchKey = Object.keys(rawPosts).find(key => key.endsWith(`${slug}.md`));
  if (!matchKey) return null;
  return parsePost(slug, rawPosts[matchKey]);
}

export function getPostsByTag(tag: string): PostMeta[] {
  return getAllPosts().filter(post => post.tags.includes(tag));
}

export function extractToc(content: string): TocItem[] {
  const lines = content.split('\n');
  const toc: TocItem[] = [];

  lines.forEach(line => {
    const match = line.match(/^(#{2,4})\s+(.+)/);
    if (match) {
      const level = match[1].length;
      const text = match[2].replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').trim();
      const id = text
        .toLowerCase()
        .replace(/[^\p{L}\p{N}\s-]/gu, '')
        .replace(/\s+/g, '-');
      toc.push({ id, text, level });
    }
  });

  return toc;
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
