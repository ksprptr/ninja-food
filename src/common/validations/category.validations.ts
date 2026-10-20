import z from 'zod';

export const categoryValidationSchema = z.object({
  slug: z.string().min(1, 'Slug je povinný.'),
  name: z.string().min(1, 'Název je povinný.'),
  description: z
    .string()
    .min(1, 'Popis je povinný.')
    .max(255, 'Popis musí mít maximálně 255 znaků.'),
  icon: z.string().min(1, 'Ikona je povinná.'),
});
