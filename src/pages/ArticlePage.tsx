import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import { getPostBySlug, extractToc, formatDate } from '@/lib/posts';
import { MarkdownRenderer } from '@/components/markdown/MarkdownRenderer';
import { TableOfContents } from '@/components/markdown/TableOfContents';

export function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : null;

  if (!post) {
    return (
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-32 text-center">
        <h1 className="text-4xl font-bold gradient-text mb-4">404</h1>
        <p className="text-muted-foreground mb-8">文章未找到</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-cyan-400 hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          返回首页
        </Link>
      </div>
    );
  }

  const toc = extractToc(post.content);

  return (
    <article className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Back button */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-cyan-400 transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        返回文章列表
      </Link>

      <div className="lg:flex lg:gap-10">
        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Article header */}
          <header className="mb-10">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map(tag => (
                <Link
                  key={tag}
                  to={`/tags?tag=${encodeURIComponent(tag)}`}
                  className="inline-flex items-center gap-1 text-xs font-mono px-2.5 py-1 rounded-full bg-cyan-400/10 text-cyan-400 border border-cyan-400/20 hover:bg-cyan-400/20 transition-colors"
                >
                  <Tag className="h-3 w-3" />
                  {tag}
                </Link>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight mb-4">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                约 {post.readingTime} 分钟阅读
              </span>
            </div>
          </header>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent mb-10" />

          {/* Markdown content */}
          <MarkdownRenderer content={post.content} />
        </div>

        {/* TOC sidebar */}
        {toc.length > 0 && (
          <aside className="hidden lg:block w-64 shrink-0">
            <TableOfContents items={toc} />
          </aside>
        )}
      </div>
    </article>
  );
}
