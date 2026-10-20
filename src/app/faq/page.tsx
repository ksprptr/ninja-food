import { questions } from '@/common/lib/faqs';
import PageHeader from '@/components/layout/PageHeader';
import Motion from '@/components/ui/Motion';
import QuestionCard from '@/components/ui/QuestionCard';

import { Metadata } from 'next';

// Page description
const description = 'Krátké odpovědi na to, co nejčastěji řeší naši hosté, od rozvozu po alergeny.';

// Page metadata
export const metadata: Metadata = {
  title: 'Často kladené otázky',
  description,
};

/**
 * Component representing a faq page
 */
export default function Page() {
  return (
    <>
      {/* Page header */}
      <PageHeader title='Často kladené otázky' description={description} />

      {/* Questions */}
      <section id='questions' className='flex max-w-3xl flex-col gap-2'>
        <h2 className='sr-only'>Otázky a odpovědi</h2>
        {questions.map((question, i) => (
          <Motion delay={i * 0.04} key={question.id}>
            <QuestionCard question={question} />
          </Motion>
        ))}
      </section>
    </>
  );
}
