import Motion from '../ui/Motion';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  id: string;
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
  delay?: number;
}

/**
 * Component representing a page section
 */
export default function Section({
  id,
  title,
  description,
  href,
  linkLabel,
  delay,
  children,
}: Readonly<Props>) {
  return (
    <Motion as='section' id={id} className='space-y-6' delay={delay}>
      <div className='flex flex-wrap items-end justify-between gap-x-6 gap-y-2'>
        <div className='max-w-prose space-y-2'>
          <h2 className='text-section font-semibold tracking-tight'>{title}</h2>
          {description && <p className='text-ink-soft'>{description}</p>}
        </div>
        {href && (
          <Link
            href={href}
            className='text-accent-deep decoration-accent font-semibold underline decoration-2 underline-offset-4 transition-colors hover:decoration-transparent'>
            {linkLabel ?? 'Zobrazit vše'}
          </Link>
        )}
      </div>
      {children}
    </Motion>
  );
}
