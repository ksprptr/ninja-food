import { Question } from '@/common/types/faq.types';
import { faqValidationSchema } from '@/common/validations/faq.validations';
import questionsData from '@/data/faq.json';

import z from 'zod';

// Questions array
export const questions: Question[] = z.array(faqValidationSchema).parse(questionsData);
