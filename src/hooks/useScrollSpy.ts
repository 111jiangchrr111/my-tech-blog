import { useEffect, useRef, useState } from 'react';

export function useScrollSpy(itemIds: string[], offset = 80) {
  const [activeId, setActiveId] = useState<string>('');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current?.disconnect();

    observerRef.current = new IntersectionObserver(
      entries => {
        const visible = entries.filter(e => e.isIntersecting);
        if (visible.length > 0) {
          // Pick the first visible heading closest to the top
          const sorted = visible.sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          );
          setActiveId(sorted[0].target.id);
        }
      },
      { rootMargin: `-${offset}px 0px -70% 0px`, threshold: 0.1 }
    );

    itemIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [itemIds, offset]);

  return activeId;
}
