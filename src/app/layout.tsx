import Footer from '@/components/layout/Footer';
import Layout from '@/components/layout/Layout';
import Navbar from '@/components/menu/Navbar';
import MotionProvider from '@/components/ui/MotionProvider';

import type { Metadata } from 'next';
import { Fraunces, Poppins } from 'next/font/google';
import { ThemeProvider } from 'next-themes';

import './globals.css';

const poppins = Poppins({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
});

const fraunces = Fraunces({
  subsets: ['latin', 'latin-ext'],
  axes: ['SOFT', 'WONK', 'opsz'],
  variable: '--font-display',
});

// Social image shared by every page, generated once into public/
const ogImage = {
  url: '/images/og/og-image.png',
  width: 1200,
  height: 630,
  alt: 'NinjaFood - Street food rychlostí ninji',
};

// Titles and descriptions are left out of openGraph and twitter, Next.js fills them from each page
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    template: 'NinjaFood | %s',
    default: 'NinjaFood',
  },
  description:
    'Burgery, ramen, bowly a wrapy inspirované americkou a asijskou kuchyní. S rozvozem po celém Hradci Králové.',
  applicationName: 'NinjaFood',
  authors: [{ name: 'Petr Kašpar', url: 'https://ksprptr.dev' }],
  creator: 'Petr Kašpar',
  keywords: [
    'NinjaFood',
    'street food',
    'restaurace',
    'Hradec Králové',
    'rozvoz jídla',
    'rozvoz Hradec Králové',
    'burgery',
    'ramen',
    'bowly',
    'wrapy',
    'asijská kuchyně',
    'americká kuchyně',
    'jídelní lístek',
    'vegetariánská jídla',
    'veganská jídla',
    'bez lepku',
    'alergeny',
  ],
  openGraph: {
    type: 'website',
    locale: 'cs_CZ',
    siteName: 'NinjaFood',
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    images: [ogImage],
  },
};

/**
 * Component representing the root layout of the app
 */
export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang='cs'
      className={`${poppins.variable} ${fraunces.variable} h-full antialiased`}
      data-scroll-behavior='smooth'
      suppressHydrationWarning>
      <head>
        <meta name='apple-mobile-web-app-title' content='NinjaFood' />
        {/* Without JavaScript, animated content is shown and controls that need it are hidden or inert */}
        <noscript>
          <style>
            {
              '[data-reveal]{opacity:1!important;transform:none!important}[data-expand]{height:auto!important;opacity:1!important}[data-requires-js]{display:none!important}[data-js-interactive]{cursor:auto!important}[data-js-interactive]:hover{background-color:transparent!important}'
            }
          </style>
        </noscript>
      </head>
      <body className='flex min-h-full flex-col' suppressHydrationWarning>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <MotionProvider>
            <Navbar />
            <main className='flex-1'>
              <Layout>{children}</Layout>
            </main>
            <Footer />
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
