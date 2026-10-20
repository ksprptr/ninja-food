import { formatDate } from '@/common/lib/format';
import { Article } from '@/common/types/article.types';

import Link from 'next/link';

interface Props {
  article: Article;
}

/**
 * Component representing an article card
 */
export default function ArticleCard({ article }: Readonly<Props>) {
  return (
    <Link
      href={`/blog/${article.slug}`}
      className='group border-line dark:border-line-night grid gap-2 border-t py-6 sm:grid-cols-[11rem_1fr_auto] sm:items-baseline sm:gap-8'>
      <p className='text-caption text-ink-soft'>{formatDate(article.publishedAt)}</p>
      <div className='space-y-1.5'>
        <h3 className='text-title group-hover:text-accent-deep font-semibold transition-colors'>
          {article.title}
        </h3>
        <p className='text-ink-soft max-w-prose'>{article.excerpt}</p>
      </div>
      <p className='text-caption text-ink-soft'>{article.readingTimeMin} min čtení</p>
    </Link>
  );
}
