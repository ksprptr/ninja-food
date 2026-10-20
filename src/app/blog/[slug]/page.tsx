import { articles, getArticleBySlug } from '@/common/lib/articles';
import { getCategoryBySlug } from '@/common/lib/categories';
import { formatDate } from '@/common/lib/format';
import { SlugProps } from '@/common/types/slug.types';
import Badge from '@/components/ui/Badge';
import Motion from '@/components/ui/Motion';

import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Function to generate static params for article pages
export const generateStaticParams = async () => {
  return articles.map((a) => ({
    slug: a.slug,
  }));
};

// Function to generate metadata for article pages
export async function generateMetadata({ params }: SlugProps): Promise<Metadata> {
  const { slug } = await params;

  const article = getArticleBySlug(slug.toLowerCase());

  if (!article) {
    return { title: 'Článek nenalezen' };
  }

  return { title: article.title, description: article.excerpt };
}

/**
 * Component representing an article page
 */
export default async function Page({ params }: SlugProps) {
  const { slug } = await params;

  const article = getArticleBySlug(slug);

  if (!article) {
    return notFound();
  }

  return (
    <article className='space-y-block mx-auto mt-16 w-full max-w-prose'>
      {/* Informations */}
      <Motion className='space-y-3'>
        <p className='text-caption text-ink-soft flex flex-wrap gap-x-4'>
          <span>{formatDate(article.publishedAt)}</span>
          <span>{article.readingTimeMin} min čtení</span>
        </p>

        {/* Title and excerpt */}
        <h1 className='text-display font-semibold tracking-tight'>{article.title}</h1>
        <p className='text-lead text-ink-soft border-accent border-l-4 pl-4'>{article.excerpt}</p>

        {/* Categories */}
        <div className='flex flex-wrap gap-2'>
          {article.relatedCategories.map((category) => (
            <Link key={category} href={`/kategorie/${category}`}>
              <Badge>{getCategoryBySlug(category)?.name ?? category}</Badge>
            </Link>
          ))}
        </div>
      </Motion>

      {/* Sections */}
      {article.sections.map((section, i) => (
        <Motion as='section' key={section.heading} className='space-y-3' delay={i * 0.05}>
          <h2 className='text-title font-semibold sm:text-2xl'>{section.heading}</h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph} className='text-ink-soft text-lead'>
              {paragraph}
            </p>
          ))}
        </Motion>
      ))}
    </article>
  );
}
