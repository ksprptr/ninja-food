import { categories } from '@/common/lib/categories';

import { NavbarLink } from '../types/navbar.types';

export const navbarLinks: NavbarLink[] = [
  {
    label: 'Domů',
    href: '/',
  },
  {
    label: 'Menu',
    href: '/menu',
  },
  {
    label: 'Kategorie',
    href: '/kategorie',
    children: categories.map((c) => ({
      label: c.name,
      href: `/kategorie/${c.slug}`,
      icon: c.icon,
    })),
  },
  {
    label: 'Alergeny',
    href: '/alergeny',
  },
  {
    label: 'Zasytí mě to',
    href: '/zasyti-me-to',
  },
  {
    label: 'Rozvoz',
    href: '/rozvoz',
  },
  {
    label: 'Blog',
    href: '/blog',
  },
  {
    label: 'FAQ',
    href: '/faq',
  },
];
