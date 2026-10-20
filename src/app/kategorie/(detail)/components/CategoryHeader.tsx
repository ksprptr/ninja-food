'use client';

import { categories, getCategoryBySlug } from '@/common/lib/categories';
import PageHeader from '@/components/layout/PageHeader';
import CategoryCard from '@/components/ui/CategoryCard';

import { animate, useReducedMotion } from 'motion/react';
import { useParams } from 'next/navigation';
import { useLayoutEffect, useRef } from 'react';

/**
 * Component representing a category page header with a category switcher
 */
export default function CategoryHeader() {
  const { slug } = useParams<{ slug: string }>();
  const navRef = useRef<HTMLElement>(null);
  const circleRef = useRef<HTMLSpanElement>(null);
  const markerRef = useRef<HTMLSpanElement>(null);
  const placed = useRef<boolean>(false);
  const reducedMotion = useReducedMotion();

  const category = getCategoryBySlug(slug);

  // Slide the active background and marker to the active category
  useLayoutEffect(() => {
    const nav = navRef.current;

    if (!nav) return;

    const move = (instant: boolean) => {
      const navRect = nav.getBoundingClientRect();
      const options =
        instant || reducedMotion || !placed.current
          ? { duration: 0 }
          : { type: 'spring' as const, stiffness: 380, damping: 32 };

      const place = (indicator: HTMLElement | null, selector: string) => {
        const target = nav.querySelector<HTMLElement>(`[aria-current='page'] ${selector}`);

        if (!indicator || !target) return;

        const rect = target.getBoundingClientRect();

        animate(
          indicator,
          {
            x: rect.left - navRect.left + nav.scrollLeft,
            y: rect.top - navRect.top + nav.scrollTop,
            width: rect.width,
            height: rect.height,
            opacity: 1,
          },
          options,
        );
      };

      place(circleRef.current, '[data-category-circle]');
      place(markerRef.current, '[data-category-marker]');
      placed.current = true;
    };

    move(false);

    nav.dataset.indicatorReady = '';

    let observed = false;

    const observer = new ResizeObserver(() => {
      if (observed) move(true);
      observed = true;
    });

    observer.observe(nav);

    return () => observer.disconnect();
  }, [slug, reducedMotion]);

  if (!category) {
    return null;
  }

  return (
    <>
      {/* Page header */}
      <PageHeader title={category.name} description={category.description} />

      {/* Other categories */}
      <nav
        ref={navRef}
        aria-label='Kategorie'
        className='-mx-gutter px-gutter relative flex snap-x gap-4 overflow-x-auto pb-2 sm:mx-0 sm:grid sm:grid-cols-4 sm:gap-6 sm:overflow-visible sm:px-0 lg:grid-cols-7'>
        {/* Active category indicators */}
        <span
          ref={circleRef}
          aria-hidden
          className='bg-accent shadow-glow pointer-events-none absolute top-0 left-0 z-1 rounded-full opacity-0'
        />
        <span
          ref={markerRef}
          aria-hidden
          className='bg-accent rounded-pill pointer-events-none absolute top-0 left-0 z-1 opacity-0'
        />

        {/* Other categories */}
        {categories.map((c) => (
          <CategoryCard key={c.slug} category={c} compact active={c.slug === category.slug} />
        ))}
      </nav>
    </>
  );
}
