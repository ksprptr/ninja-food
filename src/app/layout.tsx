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

export const metadata: Metadata = {
  title: {
    template: 'NinjaFood | %s',
    default: 'NinjaFood',
  },
  description:
    'Burgery, ramen, bowly a wrapy inspirované americkou a asijskou kuchyní. S rozvozem po celém Hradci Králové.',
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
        {/* Without JavaScript, content waiting for an animation or a toggle stays visible */}
        <noscript>
          <style>
            {
              '[style*="opacity:0"],[style*="scale(0)"]{opacity:1!important;transform:none!important}main [style*="height:0px"]{height:auto!important}'
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
