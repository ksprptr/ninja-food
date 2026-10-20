import { Allergen } from '@/common/types/allergen.types';
import { allergenValidationSchema } from '@/common/validations/allergen.validations';
import allergenData from '@/data/allergens.json';

import z from 'zod';

// Allergens array
export const allergens: Allergen[] = z.array(allergenValidationSchema).parse(allergenData);

/**
 * Function to get allergen by code
 */
export const getAllergenByCode = (code: number): Allergen | null => {
  const allergen = allergens.find((a) => a.code === code);

  return allergen || null;
};
