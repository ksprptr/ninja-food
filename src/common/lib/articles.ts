import { Article } from '@/common/types/article.types';
import { articleValidationSchema } from '@/common/validations/article.validations';
import articleData from '@/data/articles.json';

import z from 'zod';

// Articles array
export const articles: Article[] = z.array(articleValidationSchema).parse(articleData);

/**
 * Function to get article by slug
 */
export const getArticleBySlug = (slug: string): Article | null => {
  const article = articles.find((a) => a.slug === slug);

  return article || null;
};

/**
 * Function to get top three latest articles
 */
export const getTopThreeLatestArticles = (): Article[] => {
  return [...articles]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 3);
};
