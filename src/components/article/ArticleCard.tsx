import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { formatDate } from '@/lib/posts';
import type { PostMeta } from '@/types/post';

export function ArticleCard({ post }: { post: PostMeta }) {
  return (
    <Link to={`/article/${post.slug}`} className="group block">
      <article className="h-full rounded-xl border border-border/50 bg-card/50 glass neon-border-hover p-5 transition-all duration-300 hover:-translate-y-1">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.map(tag => (
            <span
              key={tag}
              className="text-xs font-mono px-2 py-0.5 rounded-full bg-cyan-400/10 text-cyan-400 border border-cyan-400/20"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-foreground group-hover:text-cyan-400 transition-colors mb-2 line-clamp-2">
          {post.title}
        </h3>

        {/* Summary */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
          {post.summary}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {formatDate(post.date)}
          </span>
          <span className="flex items-center gap-1 group-hover:text-cyan-400 transition-colors">
            阅读全文
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </article>
    </Link>
  );
}
