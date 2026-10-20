import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  variant?: 'neutral' | 'accent';
}

const variants = {
  neutral: 'bg-paper-muted text-ink-soft dark:bg-night-raised',
  accent: 'bg-accent-soft text-accent-deep dark:bg-accent-night',
};

/**
 * Component representing a badge
 */
export default function Badge({ variant = 'neutral', children }: Readonly<Props>) {
  return (
    <span
      className={`rounded-pill text-caption inline-flex items-center gap-1 px-2.5 py-1 font-medium whitespace-nowrap ${variants[variant]}`}>
      {children}
    </span>
  );
}
