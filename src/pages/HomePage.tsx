import { useState, useMemo } from 'react';
import { Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getAllPosts, getPostIndex } from '@/lib/posts';
import { ArticleCard } from '@/components/article/ArticleCard';
import { TagFilter } from '@/components/article/TagFilter';

export function HomePage() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const { posts, tags } = getPostIndex();
  const allTags = tags.map(t => t.name);

  const filteredPosts = useMemo(() => {
    if (!selectedTag) return posts;
    return posts.filter(post => post.tags.includes(selectedTag));
  }, [posts, selectedTag]);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="py-16 sm:py-24 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-sm font-mono mb-6">
          <Zap className="h-3.5 w-3.5" />
          技术博客
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
          <span className="gradient-text">探索代码世界</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          记录前端开发、后端架构、DevOps 实践中的技术思考与实战经验。
          <br className="hidden sm:block" />
          每一行代码，都是一次思考的沉淀。
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <a
            href="#posts"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-400 text-gray-900 font-medium text-sm shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] transition-all duration-300 hover:-translate-y-0.5"
          >
            浏览文章
            <ArrowRight className="h-4 w-4" />
          </a>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border/50 text-muted-foreground font-medium text-sm hover:border-cyan-400/30 hover:text-cyan-400 transition-all duration-200"
          >
            了解更多
          </Link>
        </div>
      </section>

      {/* Posts Section */}
      <section id="posts" className="pb-20">
        {/* Tag Filter */}
        <div className="mb-8">
          <TagFilter
            tags={allTags}
            selected={selectedTag}
            onSelect={setSelectedTag}
          />
        </div>

        {/* Stats */}
        <div className="mb-6 text-sm text-muted-foreground">
          共 <span className="text-cyan-400 font-mono">{filteredPosts.length}</span> 篇文章
          {selectedTag && (
            <>
              {' · 标签：'}
              <span className="text-cyan-400 font-mono">{selectedTag}</span>
            </>
          )}
        </div>

        {/* Article Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredPosts.map(post => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-lg">暂无相关文章</p>
            <button
              onClick={() => setSelectedTag(null)}
              className="mt-4 text-cyan-400 hover:underline cursor-pointer"
            >
              查看全部文章
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
