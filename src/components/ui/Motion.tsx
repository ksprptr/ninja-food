'use client';

import { ExtendedProps } from '@/common/types/global.types';

import { motion } from 'motion/react';

interface Props extends ExtendedProps {
  delay?: number;
  as?: 'div' | 'section';
}

/**
 * Component representing a motion component revealed on scroll
 */
export default function Motion({ as = 'div', delay, id, className, children }: Readonly<Props>) {
  const MotionComponent = as === 'section' ? motion.section : motion.div;

  return (
    <MotionComponent
      id={id}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={className}>
      {children}
    </MotionComponent>
  );
}
