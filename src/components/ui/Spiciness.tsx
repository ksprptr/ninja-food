import { Flame } from 'lucide-react';

interface Props {
  level: number;
}

/**
 * Component representing a spiciness level shown as flames
 */
export default function Spiciness({ level }: Readonly<Props>) {
  return (
    <span
      role='img'
      aria-label={level ? `Pálivost ${level} ze 3` : 'Nepálivé'}
      className='inline-flex items-center gap-0.5'>
      {[1, 2, 3].map((step) => (
        <Flame
          key={step}
          size={14}
          aria-hidden
          className={step <= level ? 'fill-tone-danger text-tone-danger' : 'text-ink-soft/70'}
        />
      ))}
    </span>
  );
}
