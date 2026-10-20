'use client';

import { ChevronDown } from 'lucide-react';
import { ComponentProps, useId } from 'react';

interface SelectOption<T extends string> {
  value: T;
  label: string;
}

interface Props<T extends string> extends Omit<ComponentProps<'select'>, 'value' | 'onChange'> {
  label?: string;
  value?: T;
  options: SelectOption<T>[];
  onChange?: (value: T) => void;
}

/**
 * Component representing a select input field
 */
export default function Select<T extends string>({
  label,
  options,
  className,
  onChange,
  ...props
}: Readonly<Props<T>>) {
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
        <select
          id={id}
          onChange={(event) => {
            const option = options.find((o) => o.value === event.target.value);

            if (option) onChange?.(option.value);
          }}
          className={`rounded-pill bg-paper-raised ring-line focus:ring-accent dark:bg-night-raised dark:ring-line-night w-full cursor-pointer appearance-none py-2.5 pr-10 pl-4 ring-1 transition-shadow outline-none focus:ring-2 ${className ?? ''}`}
          {...props}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className='text-ink-soft pointer-events-none absolute top-1/2 right-4 -translate-y-1/2'
        />
      </span>
    </div>
  );
}
