import { Tone } from '../enums/calculator.enums';
import z from 'zod';

export const calculatorValidationSchema = z.object({
  satiety: z.object({
    dailyKcalPerKg: z.number().min(0, 'Denní příjem energie na kilogram musí být kladné číslo.'),
    thresholds: z.array(
      z.object({
        id: z.string().min(1, 'ID je povinné.'),
        maxDishToDailyRatio: z
          .number()
          .min(0, 'Maximální poměr jídla k dennímu příjmu musí být kladné číslo.')
          .nullable(),
        label: z.string().min(1, 'Popisek je povinný.'),
        tone: z.enum(Tone),
      }),
    ),
    disclaimer: z.string().max(255, 'Disclaimer musí mít maximálně 255 znaků.'),
  }),
});
