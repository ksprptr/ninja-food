'use client';

import { Check } from 'lucide-react';
import { ComponentProps } from 'react';

interface Props extends Omit<ComponentProps<'input'>, 'onChange' | 'type'> {
  label: string;
  onChange?: (checked: boolean) => void;
}

/**
 * Component representing a checkbox field
 */
export default function Checkbox({ label, className, onChange, ...props }: Readonly<Props>) {
  return (
    <label
      className={`group bg-paper-raised text-ink-soft ring-line hover:text-ink has-checked:bg-accent-soft has-checked:text-ink has-checked:ring-accent dark:bg-night-raised dark:ring-line-night dark:hover:text-night-ink dark:has-checked:bg-accent-night dark:has-checked:text-night-ink dark:has-checked:ring-accent text-caption flex cursor-pointer items-center gap-2 rounded-xl px-2.5 py-2 font-medium ring-1 transition-colors select-none has-focus-visible:ring-2 ${className ?? ''}`}>
      <input
        type='checkbox'
        onChange={(event) => onChange?.(event.target.checked)}
        className='sr-only'
        {...props}
      />
      <span className='bg-paper ring-line text-accent-ink group-has-checked:bg-accent group-has-checked:ring-accent dark:bg-night dark:ring-line-night dark:group-has-checked:bg-accent dark:group-has-checked:ring-accent rounded-box grid size-4 shrink-0 place-items-center ring-1 transition-colors'>
        <Check
          size={12}
          strokeWidth={3.5}
          className='scale-50 opacity-0 transition group-has-checked:scale-100 group-has-checked:opacity-100'
        />
      </span>
      {label}
    </label>
  );
}
