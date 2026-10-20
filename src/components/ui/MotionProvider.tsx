'use client';

import { MotionConfig } from 'motion/react';
import { PropsWithChildren } from 'react';

/**
 * Component representing a motion configuration provider
 */
export default function MotionProvider({ children }: PropsWithChildren) {
  return <MotionConfig reducedMotion='user'>{children}</MotionConfig>;
}
