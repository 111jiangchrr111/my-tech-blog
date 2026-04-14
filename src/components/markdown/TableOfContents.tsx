import { cn } from '@/lib/utils';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import type { TocItem } from '@/types/post';
import { List } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface TableOfContentsProps {
  items: TocItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const { t } = useLanguage();
  const ids = items.map(item => item.id);
  const activeId = useScrollSpy(ids);
  const [mobileOpen, setMobileOpen] = useState(false);

  if (items.length === 0) return null;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileOpen(false);
    }
  };

  // Mobile floating button + drawer
  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed bottom-6 right-6 md:hidden z-40 p-3 rounded-full bg-cyan-400 text-gray-900 shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-transform hover:scale-105 cursor-pointer"
        aria-label="Table of contents"
      >
        <List className="h-5 w-5" />
      </button>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-30 md:hidden" onClick={() => setMobileOpen(false)}>
          <div className="absolute inset-0 bg-black/50" />
          <nav
            className="absolute bottom-20 right-4 w-64 max-h-[60vh] overflow-y-auto rounded-xl border border-border/50 bg-card glass-strong p-4 scrollbar-thin"
            onClick={e => e.stopPropagation()}
          >
            <TocList items={items} activeId={activeId} onScroll={scrollTo} />
          </nav>
        </div>
      )}

      {/* Desktop sidebar */}
      <nav className="hidden md:block sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto scrollbar-thin">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          {t.article.tableOfContents}
        </h4>
        <TocList items={items} activeId={activeId} onScroll={scrollTo} />
      </nav>
    </>
  );
}

function TocList({
  items,
  activeId,
  onScroll,
}: {
  items: TocItem[];
  activeId: string;
  onScroll: (id: string) => void;
}) {
  return (
    <ul className="space-y-1">
      {items.map(item => (
        <li key={item.id}>
          <button
            onClick={() => onScroll(item.id)}
            className={cn(
              'block w-full text-left text-sm py-1 transition-colors cursor-pointer',
              item.level === 2 && 'font-medium',
              item.level === 3 && 'pl-4',
              item.level === 4 && 'pl-8',
              activeId === item.id
                ? 'text-cyan-400'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <span
              className={cn(
                'inline-block transition-all',
                activeId === item.id && 'border-l-2 border-cyan-400 pl-2'
              )}
            >
              {item.text}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
