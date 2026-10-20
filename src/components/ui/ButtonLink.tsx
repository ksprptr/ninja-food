import Link from 'next/link';
import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  href: string;
  variant?: 'primary' | 'ghost';
}

const variants = {
  primary: 'bg-accent text-accent-ink hover:shadow-glow hover:-translate-y-0.5',
  ghost:
    'bg-paper-raised text-ink ring-1 ring-line hover:ring-accent dark:bg-night-muted dark:text-night-ink dark:ring-line-night dark:hover:ring-accent',
};

/**
 * Component representing a link styled as a button
 */
export default function ButtonLink({ href, variant = 'primary', children }: Readonly<Props>) {
  return (
    <Link
      href={href}
      className={`rounded-pill inline-flex items-center justify-center gap-2 px-5 py-3 font-semibold transition-all duration-300 motion-reduce:transition-none ${variants[variant]}`}>
      {children}
    </Link>
  );
}
