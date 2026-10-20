import { Cuisine } from '@/common/types/cuisine.types';
import { cuisineValidationSchema } from '@/common/validations/cuisine.validations';
import cuisineData from '@/data/cuisines.json';

import z from 'zod';

// Cuisines array
export const cuisines: Cuisine[] = z.array(cuisineValidationSchema).parse(cuisineData);

/**
 * Function to get cuisine by slug
 */
export const getCuisineBySlug = (slug: string): Cuisine | null => {
  const cuisine = cuisines.find((c) => c.slug === slug);

  return cuisine || null;
};
