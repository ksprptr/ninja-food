'use client';

import { LucideIcon } from 'lucide-react';
import { ComponentProps, useId } from 'react';

interface Props extends Omit<ComponentProps<'input'>, 'onChange'> {
  label?: string;
  icon?: LucideIcon;
  onChange?: (value: string) => void;
}

/**
 * Component representing an input field
 */
export default function Input({
  label,
  icon: Icon,
  className,
  onChange,
  ...props
}: Readonly<Props>) {
  const generatedId = useId();
  const id = props.id ?? generatedId;

  return (
    <div className='flex flex-col gap-2'>
      {label && (
        <label htmlFor={id} className='text-caption font-semibold'>
          {label}
        </label>
      )}
      <span className='relative flex'>
        {Icon && (
          <Icon
            size={16}
            className='text-ink-soft pointer-events-none absolute top-1/2 left-4 -translate-y-1/2'
          />
        )}
        <input
          id={id}
          onChange={(event) => onChange?.(event.target.value)}
          className={`rounded-pill bg-paper-raised ring-line placeholder:text-ink-soft focus:ring-accent dark:bg-night-raised dark:ring-line-night w-full py-2.5 pr-4 ring-1 transition-shadow outline-none focus:ring-2 ${Icon ? 'pl-10' : 'pl-4'} ${className ?? ''}`}
          {...props}
        />
      </span>
    </div>
  );
}
