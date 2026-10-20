import { articles } from '@/common/lib/articles';
import { categories } from '@/common/lib/categories';
import { dishes } from '@/common/lib/dishes';

import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const staticPaths = [
  '',
  '/menu',
  '/kategorie',
  '/alergeny',
  '/zasyti-me-to',
  '/rozvoz',
  '/blog',
  '/faq',
];

/**
 * Function representing a sitemap generation
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const paths = [
    ...staticPaths,
    ...dishes.map((d) => `/menu/${d.slug}`),
    ...categories.map((c) => `/kategorie/${c.slug}`),
    ...articles.map((a) => `/blog/${a.slug}`),
  ];

  return paths.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: path === '' ? 1 : 0.7,
  }));
}
