'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { flushSync } from 'react-dom';

/**
 * Component representing a theme changer
 */
export default function ThemeChanger() {
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    const theme = resolvedTheme === 'dark' ? 'light' : 'dark';

    if (!document.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTheme(theme);
      return;
    }

    // Cross-fade the whole page between the themes
    document.startViewTransition(() => flushSync(() => setTheme(theme)));
  };

  return (
    <button
      type='button'
      data-requires-js
      onClick={toggleTheme}
      className='group rounded-pill text-ink-soft ring-line hover:text-ink dark:ring-line-night dark:hover:text-night-ink inline-flex items-center gap-2 px-3 py-1.5 font-medium ring-1 transition-colors'>
      {/* Labels are switched by CSS, so the server render matches the client */}
      <Moon
        size={14}
        className='transition-transform duration-500 group-hover:-rotate-12 dark:hidden'
      />
      <span className='dark:hidden'>Tmavý režim</span>
      <Sun
        size={14}
        className='hidden transition-transform duration-500 group-hover:rotate-90 dark:block'
      />
      <span className='hidden dark:inline'>Světlý režim</span>
    </button>
  );
}
