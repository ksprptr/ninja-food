import { navbarLinks } from '@/common/data/navbar-links.data';
import { delivery } from '@/common/lib/delivery';

import ThemeChanger from '../ui/ThemeChanger';
import { TriangleAlert } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

/**
 * Component representing a footer
 */
export default function Footer() {
  return (
    <footer className='px-gutter mt-auto pb-6'>
      <div className='max-w-content rounded-panel bg-paper-muted dark:bg-night-muted mx-auto px-6 pt-10 pb-6 sm:px-10'>
        <div className='grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]'>
          {/* Brand */}
          <div className='max-w-sm space-y-4'>
            <Link href='/' className='font-display flex items-center gap-2 text-2xl font-semibold'>
              <Image src='/images/logo/logo.png' alt='' width={40} height={40} />
              <span>
                Ninja<span className='text-accent'>Food</span>
              </span>
            </Link>
            <p className='text-ink-soft'>
              Street food z čerstvých surovin. Vaříme v Hradci Králové a vozíme po celém městě.
            </p>
            <p className='text-caption text-ink-soft'>
              Ceny, gramáže a nutriční hodnoty jsou orientační a mohou se lišit podle sezónních
              surovin. Kuchyně zpracovává všech 14 alergenů, stopová množství proto nelze vyloučit.
            </p>
          </div>

          {/* Links */}
          <div id='odkazy' className='scroll-mt-24 space-y-3'>
            <h2 className='text-title font-semibold'>Stránky</h2>
            <ul className='text-ink-soft grid gap-1.5'>
              {navbarLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className='hover:text-accent-deep transition-colors'>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Opening hours */}
          <div className='space-y-3'>
            <h2 className='text-title font-semibold'>Otevírací doba</h2>
            <dl className='grid gap-1.5'>
              {delivery.openingHours.map((hours) => (
                <div key={hours.days}>
                  <dt className='text-caption text-ink-soft'>{hours.days}</dt>
                  <dd className='font-medium'>
                    {hours.from}
                    {' - '}
                    {hours.to}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Copyright, theme changer and author */}
        <div className='border-line text-caption text-ink-soft dark:border-line-night mt-10 flex flex-wrap items-center justify-between gap-2 border-t pt-5'>
          <div className='flex flex-wrap items-center gap-x-4 gap-y-2'>
            <p>&copy; {new Date().getFullYear()} NinjaFood</p>
            <ThemeChanger />
          </div>
          <p>
            Vytvořil{' '}
            <Link href='https://ksprptr.dev' target='_blank' className='hover:text-accent-deep'>
              Petr Kašpar
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
