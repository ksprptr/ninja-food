'use client';

import { navbarLinks } from '@/common/data/navbar-links.data';

import { icons } from '../ui/CategoryCard';
import { ChevronDown, Menu, X } from 'lucide-react';
import { animate, AnimatePresence, motion, useReducedMotion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

/**
 * Component representing a navigation bar
 */
export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState<boolean>(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const desktopMenuRef = useRef<HTMLUListElement>(null);
  const activePillRef = useRef<HTMLSpanElement>(null);
  const activePillPlaced = useRef<boolean>(false);
  const reducedMotion = useReducedMotion();

  const HamburgerIcon = open ? X : Menu;

  const isActive = (href: string) =>
    href === '/' ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);

  const activeHref = navbarLinks.find((link) => isActive(link.href))?.href;

  // Slide the active pill under the active link
  useLayoutEffect(() => {
    const menu = desktopMenuRef.current;
    const pill = activePillRef.current;

    if (!menu || !pill) return;

    const move = (instant: boolean) => {
      const link = menu.querySelector<HTMLElement>(`[data-href="${activeHref}"]`);

      if (!link) {
        animate(pill, { opacity: 0 }, { duration: instant ? 0 : 0.2 });
        return;
      }

      const origin = (pill.offsetParent ?? menu).getBoundingClientRect();
      const target = {
        x: link.getBoundingClientRect().left - origin.left,
        width: link.offsetWidth,
        opacity: 1,
      };

      animate(
        pill,
        target,
        instant || reducedMotion || !activePillPlaced.current
          ? { duration: 0 }
          : { type: 'spring', stiffness: 380, damping: 32 },
      );
      activePillPlaced.current = true;
    };

    move(false);

    menu.dataset.pillReady = '';

    let observed = false;
    const observer = new ResizeObserver(() => {
      if (observed) move(true);
      observed = true;
    });

    observer.observe(menu);

    return () => observer.disconnect();
  }, [activeHref, reducedMotion]);

  // Close the dropdown on a click outside of the desktop menu
  useEffect(() => {
    if (!dropdown) return;

    const handleClick = (event: MouseEvent) => {
      if (!desktopMenuRef.current?.contains(event.target as Node)) setDropdown(null);
    };

    document.addEventListener('click', handleClick);

    return () => document.removeEventListener('click', handleClick);
  }, [dropdown]);

  return (
    <header className='px-gutter fixed inset-x-0 top-3 z-20'>
      <nav className='max-w-content bg-paper ring-line dark:bg-night-muted dark:ring-line-night shadow-float rounded-bar mx-auto px-3 ring-1'>
        <div className='flex w-full items-center justify-between py-2'>
          {/* Logo */}
          <Link
            href='/'
            className='font-display flex items-center gap-2 pl-1 text-xl font-semibold'>
            <Image src='/images/logo/logo.png' alt='' width={34} height={34} />
            <span>
              Ninja<span className='text-accent'>Food</span>
            </span>
          </Link>

          {/* Desktop menu */}
          <div className='relative hidden lg:block'>
            {/* Active pill */}
            <span
              ref={activePillRef}
              aria-hidden
              className='bg-accent rounded-pill pointer-events-none absolute inset-y-0 left-0 opacity-0'
            />
            <ul ref={desktopMenuRef} className='flex items-center gap-1'>
              {navbarLinks.map((link) => {
                const linkClassName = `rounded-pill relative flex items-center gap-1 px-3.5 py-2 text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? 'text-accent-ink bg-accent [[data-pill-ready]_&]:bg-transparent'
                    : 'text-ink-soft hover:text-ink dark:hover:text-night-ink'
                }`;

                if (!link.children) {
                  return (
                    <li key={link.href}>
                      <Link href={link.href} data-href={link.href} className={linkClassName}>
                        <span className='relative'>{link.label}</span>
                      </Link>
                    </li>
                  );
                }

                const expanded = dropdown === link.href;

                return (
                  <li
                    key={link.href}
                    className='relative'
                    onMouseEnter={() => setDropdown(link.href)}
                    onMouseLeave={() => setDropdown(null)}
                    onKeyDown={(event) => event.key === 'Escape' && setDropdown(null)}>
                    <button
                      type='button'
                      aria-expanded={expanded}
                      aria-controls={`navbar-dropdown-${link.label}`}
                      onClick={() => setDropdown(expanded ? null : link.href)}
                      data-href={link.href}
                      className={linkClassName}>
                      <span className='relative'>{link.label}</span>
                      <ChevronDown
                        size={14}
                        className={`relative transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
                      />
                    </button>

                    {/* Dropdown */}
                    <AnimatePresence>
                      {expanded && (
                        <motion.div
                          id={`navbar-dropdown-${link.label}`}
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                          className='absolute top-full left-1/2 w-64 -translate-x-1/2 pt-3'>
                          <ul className='rounded-card bg-paper ring-line dark:bg-night-muted dark:ring-line-night shadow-float grid gap-0.5 p-2 ring-1'>
                            {link.children.map((child) => {
                              const Icon = child.icon ? icons[child.icon] : null;

                              return (
                                <li key={child.href}>
                                  <Link
                                    href={child.href}
                                    aria-current={pathname === child.href ? 'page' : undefined}
                                    onClick={() => setDropdown(null)}
                                    className={`group flex items-center gap-3 rounded-xl px-2 py-1.5 text-sm font-medium transition-colors ${
                                      pathname === child.href
                                        ? 'bg-accent-soft text-ink dark:bg-accent-night dark:text-night-ink'
                                        : 'text-ink-soft hover:bg-paper-muted hover:text-ink dark:hover:bg-night-raised dark:hover:text-night-ink'
                                    }`}>
                                    {Icon && (
                                      <span
                                        className={`grid size-8 shrink-0 place-items-center rounded-full transition-colors ${
                                          pathname === child.href
                                            ? 'bg-accent text-accent-ink'
                                            : 'bg-paper-muted text-accent-deep group-hover:bg-blob dark:bg-night-raised'
                                        }`}>
                                        <Icon size={16} />
                                      </span>
                                    )}
                                    {child.label}
                                  </Link>
                                </li>
                              );
                            })}
                            <li className='border-line dark:border-line-night mt-1 border-t pt-1'>
                              <Link
                                href={link.href}
                                onClick={() => setDropdown(null)}
                                className='text-accent-deep block rounded-xl px-2 py-2 text-sm font-semibold hover:underline'>
                                Všechny kategorie
                              </Link>
                            </li>
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Hamburger for mobile menu */}
          <button
            type='button'
            aria-label='Menu'
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className='rounded-pill text-ink-soft hover:bg-paper-muted dark:hover:bg-night-raised grid size-10 place-items-center lg:hidden'>
            <HamburgerIcon size={20} />
          </button>
        </div>

        {/* Mobile menu */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className='overflow-hidden lg:hidden'>
          <ul className='border-line dark:border-line-night grid gap-1 border-t py-3'>
            {navbarLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-pill block px-4 py-2.5 font-medium ${
                    pathname === link.href || (!link.children && isActive(link.href))
                      ? 'bg-accent text-accent-ink'
                      : 'text-ink-soft'
                  }`}>
                  {link.label}
                </Link>

                {/* Sub links */}
                {link.children && (
                  <ul className='flex flex-wrap gap-2 px-4 pt-1 pb-2'>
                    {link.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          aria-current={pathname === child.href ? 'page' : undefined}
                          onClick={() => setOpen(false)}
                          className={`rounded-pill block px-3 py-1.5 text-sm font-medium ring-1 ${
                            pathname === child.href
                              ? 'bg-accent text-accent-ink ring-accent'
                              : 'text-ink-soft ring-line dark:ring-line-night'
                          }`}>
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </motion.div>
      </nav>
    </header>
  );
}
