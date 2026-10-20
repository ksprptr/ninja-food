import z from 'zod';

export const cuisineValidationSchema = z.object({
  slug: z.string().min(1, 'Slug je povinný.'),
  name: z.string().min(1, 'Název je povinný.'),
  country: z.string().min(1, 'Stát je povinný.'),
});
