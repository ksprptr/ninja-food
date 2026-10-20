import z from 'zod';

export const allergenValidationSchema = z.object({
  code: z
    .number()
    .min(1, 'Číslo alergenu musí být mezi 1 a 14.')
    .max(14, 'Číslo alergenu musí být mezi 1 a 14.'),
  name: z.string().min(1, 'Název alergenu je povinný.'),
  description: z
    .string()
    .min(1, 'Popis alergenu je povinný.')
    .max(255, 'Popis alergenu musí mít maximálně 255 znaků.'),
});
