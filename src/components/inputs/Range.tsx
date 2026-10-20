'use client';

import { ComponentProps } from 'react';

interface Props extends Omit<ComponentProps<'input'>, 'onChange' | 'type' | 'value'> {
  label: string;
  valueLabel: string;
  min: number;
  max: number;
  value: number;
  onChange?: (value: number) => void;
}

const thumbClass =
  '[&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-pill [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-paper-raised [&::-webkit-slider-thumb]:shadow-cozy [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-125 [&::-moz-range-thumb]:bg-accent [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-pill [&::-moz-range-thumb]:border-4 [&::-moz-range-thumb]:border-paper-raised';

/**
 * Component representing a range input field
 */
export default function Range({
  label,
  valueLabel,
  min,
  max,
  value,
  className,
  onChange,
  ...props
}: Readonly<Props>) {
  const percent = ((value - min) / (max - min)) * 100;

  return (
    <label className='flex flex-col gap-2'>
      <span className='text-caption flex justify-between'>
        <span className='font-semibold'>{label}</span>
        <span className='text-ink-soft'>{valueLabel}</span>
      </span>
      <span className='relative flex h-5 items-center'>
        <span className='bg-line dark:bg-line-night rounded-pill absolute h-1.5 w-full' />
        <span className='bg-accent rounded-pill absolute h-1.5' style={{ width: `${percent}%` }} />
        <input
          type='range'
          min={min}
          max={max}
          value={value}
          onChange={(event) => onChange?.(Number(event.target.value))}
          className={`relative h-5 w-full cursor-pointer appearance-none bg-transparent ${thumbClass} ${className ?? ''}`}
          {...props}
        />
      </span>
    </label>
  );
}
