import SatietyCalculator from '@/components/calculators/SatietyCalculator';
import PageHeader from '@/components/layout/PageHeader';

import { Metadata } from 'next';

// Page description
const description =
  'Porovnej energetickou hodnotu jídla se svou denní potřebou a zjisti, jak vydatná porce to pro tebe bude.';

// Page metadata
export const metadata: Metadata = {
  title: 'Zasytí mě to',
  description,
};

/**
 * Component representing a satiety page
 */
export default function Page() {
  return (
    <>
      {/* Page header */}
      <PageHeader title='Zasytí mě to?' description={description} />

      {/* Satiety calculator */}
      <SatietyCalculator />
    </>
  );
}
