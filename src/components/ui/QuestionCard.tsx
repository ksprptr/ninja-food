'use client';

import { Question } from '@/common/types/faq.types';

import { Plus } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

interface Props {
  question: Question;
}

/**
 * Component representing a question card
 */
export default function QuestionCard({ question }: Readonly<Props>) {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <div
      className={`rounded-card transition-colors ${
        visible
          ? 'bg-paper-muted dark:bg-night-muted'
          : 'ring-line hover:bg-paper-muted dark:ring-line-night dark:hover:bg-night-muted ring-1'
      }`}>
      {/* Question */}
      <button
        aria-expanded={visible}
        onClick={() => setVisible(!visible)}
        className='font-display text-title flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left font-medium'>
        {question.question}
        <motion.span
          animate={{ rotate: visible ? 45 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className={`grid size-9 shrink-0 place-items-center rounded-full transition-colors ${
            visible
              ? 'bg-accent text-accent-ink'
              : 'bg-paper-muted text-ink-soft dark:bg-night-raised'
          }`}>
          <Plus size={18} />
        </motion.span>
      </button>

      {/* Answer */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: visible ? 'auto' : 0, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className='overflow-hidden'>
        <p className='text-ink-soft max-w-prose px-5 pb-5'>{question.answer}</p>
      </motion.div>
    </div>
  );
}
