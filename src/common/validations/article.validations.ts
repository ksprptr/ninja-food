import z from 'zod';

export const articleValidationSchema = z.object({
  slug: z.string().min(1, 'Slug je povinný.'),
  title: z.string().min(1, 'Nadpis je povinný.'),
  excerpt: z
    .string()
    .min(1, 'Úvodní text je povinný.')
    .max(255, 'Úvodní text musí mít maximálně 255 znaků.'),
  readingTimeMin: z.number().min(1, 'Doba čtení musí být kladné číslo.'),
  publishedAt: z.coerce.date(),
  relatedCategories: z.array(z.string().min(1, 'Slug kategorie je povinný.')),
  sections: z.array(
    z.object({
      heading: z.string().min(1, 'Nadpis sekce je povinný.'),
      paragraphs: z.array(z.string().min(1, 'Odstavec je povinný.')),
    }),
  ),
});
