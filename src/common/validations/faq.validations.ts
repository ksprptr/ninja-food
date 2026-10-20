import z from 'zod';

export const faqValidationSchema = z.object({
  id: z.string().min(1, 'ID je povinné.'),
  question: z
    .string()
    .min(1, 'Otázka je povinná.')
    .max(255, 'Otázka musí mít maximálně 255 znaků.'),
  answer: z
    .string()
    .min(1, 'Odpověď je povinná.')
    .max(255, 'Odpověď musí mít maximálně 255 znaků.'),
});
