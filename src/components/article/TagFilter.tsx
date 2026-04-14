import { cn } from '@/lib/utils';

interface TagFilterProps {
  tags: string[];
  selected: string | null;
  onSelect: (tag: string | null) => void;
}

export function TagFilter({ tags, selected, onSelect }: TagFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelect(null)}
        className={cn(
          'px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer',
          selected === null
            ? 'bg-cyan-400 text-gray-900 shadow-[0_0_12px_rgba(0,240,255,0.3)]'
            : 'bg-white/5 text-muted-foreground border border-border/50 hover:border-cyan-400/30 hover:text-cyan-400'
        )}
      >
        全部
      </button>
      {tags.map(tag => (
        <button
          key={tag}
          onClick={() => onSelect(selected === tag ? null : tag)}
          className={cn(
            'px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer',
            selected === tag
              ? 'bg-cyan-400 text-gray-900 shadow-[0_0_12px_rgba(0,240,255,0.3)]'
              : 'bg-white/5 text-muted-foreground border border-border/50 hover:border-cyan-400/30 hover:text-cyan-400'
          )}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
