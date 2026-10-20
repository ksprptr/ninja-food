import { Category } from '@/common/types/category.types';
import { categoryValidationSchema } from '@/common/validations/category.validations';
import categoryData from '@/data/categories.json';

import z from 'zod';

// Categories array
export const categories: Category[] = z.array(categoryValidationSchema).parse(categoryData);

/**
 * Function to get category by slug
 */
export const getCategoryBySlug = (slug: string): Category | null => {
  const category = categories.find((c) => c.slug === slug);

  return category || null;
};
