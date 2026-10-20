import z from 'zod';

export const deliveryValidationSchema = z.object({
  freeDeliveryFromCzk: z.number().min(0, 'Hranice pro dopravu zdarma musí být kladné číslo.'),
  zones: z.array(
    z.object({
      slug: z.string().min(1, 'Slug je povinný.'),
      name: z.string().min(1, 'Název zóny je povinný.'),
      areas: z.array(z.string().min(1, 'Název oblasti je povinný.')),
      feeCzk: z.number().min(0, 'Cena dopravy musí být kladné číslo.'),
      minOrderCzk: z.number().min(0, 'Minimální objednávka musí být kladné číslo.'),
      deliveryTimeMin: z.object({
        from: z.number().min(0, 'Minimální doba doručení musí být kladné číslo.'),
        to: z.number().min(0, 'Maximální doba doručení musí být kladné číslo.'),
      }),
    }),
  ),
  openingHours: z.array(
    z.object({
      days: z.string().min(1, 'Dny jsou povinné.'),
      from: z.string().min(1, 'Čas otevření je povinný.'),
      to: z.string().min(1, 'Čas zavření je povinný.'),
    }),
  ),
});
