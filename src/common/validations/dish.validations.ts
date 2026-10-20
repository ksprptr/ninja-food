import { DietTag, PortionUnit } from '../enums/dish.enums';
import z from 'zod';

export const dishValidationSchema = z.object({
  slug: z.string().min(1, 'Slug je povinný.'),
  name: z.string().min(1, 'Název je povinný.'),
  cuisine: z.string().min(1, 'Kuchyně je povinná.'),
  category: z.string().min(1, 'Kategorie je povinná.'),
  portion: z.object({
    amount: z.number().min(0, 'Velikost porce musí být kladné číslo.'),
    unit: z.enum(PortionUnit),
  }),
  energyKcal: z.number().min(0, 'Energetická hodnota musí být kladné číslo.'),
  nutrition: z.object({
    proteinG: z.number().min(0, 'Množství bílkovin musí být kladné číslo.'),
    carbsG: z.number().min(0, 'Množství sacharidů musí být kladné číslo.'),
    fatG: z.number().min(0, 'Množství tuků musí být kladné číslo.'),
  }),
  spiciness: z
    .number()
    .min(0, 'Pálivost musí být mezi 0 a 3.')
    .max(3, 'Pálivost musí být mezi 0 a 3.'),
  priceCzk: z.number().min(0, 'Cena jídla musí být kladné číslo.'),
  diets: z.array(z.enum(DietTag)),
  allergens: z.array(
    z
      .number()
      .min(1, 'Číslo alergenu musí být mezi 1 a 14.')
      .max(14, 'Číslo alergenu musí být mezi 1 a 14.'),
  ),
  tagline: z.string().min(1, 'Tagline je povinný.'),
  description: z
    .string()
    .min(1, 'Popis jídla je povinný.')
    .max(255, 'Popis jídla musí mít maximálně 255 znaků.'),
  highlights: z.array(z.string().min(1, 'Highlight je povinný.')),
  featured: z.boolean(),
  image: z.object({
    src: z.string().min(1, 'URL obrázku je povinná.'),
    alt: z.string().min(1, 'Alt text obrázku je povinný.'),
  }),
});
