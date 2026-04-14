import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Hash, X } from 'lucide-react';
import { getPostIndex, getPostsByTag } from '@/lib/posts';
import { ArticleCard } from '@/components/article/ArticleCard';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';

export function TagsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useLanguage();
  const initialTag = searchParams.get('tag');
  const [selectedTag, setSelectedTag] = useState<string | null>(initialTag);
  const { posts, tags } = getPostIndex();

  const filteredPosts = useMemo(() => {
    if (!selectedTag) return posts;
    return posts.filter(post => post.tags.includes(selectedTag));
  }, [posts, selectedTag]);

  const maxCount = tags.length > 0 ? tags[0].count : 1;

  const handleTagClick = (tag: string) => {
    const newTag = selectedTag === tag ? null : tag;
    setSelectedTag(newTag);
    if (newTag) {
      setSearchParams({ tag: newTag });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Page header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <Hash className="h-6 w-6 text-cyan-400" />
          <h1 className="text-3xl font-bold text-foreground">{t.tags.title}</h1>
        </div>
        <p className="text-muted-foreground ml-9">
          {t.home.allTags}
        </p>
      </div>

      {/* Tag cloud */}
      <div className="flex flex-wrap gap-3 mb-10">
        {tags.map(tag => {
          const ratio = tag.count / maxCount;
          const size = 0.8 + ratio * 0.4; // 0.8rem to 1.2rem
          return (
            <button
              key={tag.name}
              onClick={() => handleTagClick(tag.name)}
              className={cn(
                'inline-flex items-center gap-1.5 px-4 py-2 rounded-full transition-all duration-200 cursor-pointer',
                selectedTag === tag.name
                  ? 'bg-cyan-400 text-gray-900 font-semibold shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                  : 'glass neon-border hover:border-cyan-400/40 text-muted-foreground hover:text-cyan-400'
              )}
              style={{ fontSize: `${size}rem` }}
            >
              <span className="font-mono">#</span>
              {tag.name}
              <span className={cn(
                'text-xs px-1.5 py-0.5 rounded-full',
                selectedTag === tag.name
                  ? 'bg-gray-900/20 text-gray-900'
                  : 'bg-white/5 text-muted-foreground'
              )}>
                {tag.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected tag indicator */}
      {selectedTag && (
        <div className="flex items-center gap-2 mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-400/10 text-cyan-400 text-sm font-mono border border-cyan-400/20">
            #{selectedTag}
            <button
              onClick={() => handleTagClick(selectedTag)}
              className="hover:text-white transition-colors cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </span>
          <span className="text-sm text-muted-foreground">
            · {filteredPosts.length} {t.tags.posts}
          </span>
        </div>
      )}

      {/* Article list */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredPosts.map(post => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-muted-foreground">
          <p className="text-lg">{t.home.noResults}</p>
        </div>
      )}
    </div>
  );
}
