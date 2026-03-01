import type { Metadata } from 'next';
import { Inter, Space_Grotesk, Noto_Sans_Arabic, Noto_Sans_Hebrew } from 'next/font/google';
import { headers } from 'next/headers';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['500', '600', '700'],
  display: 'swap',
});

const notoArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  variable: '--font-noto-arabic',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const notoHebrew = Noto_Sans_Hebrew({
  subsets: ['hebrew'],
  variable: '--font-noto-hebrew',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const rtlLocales = ['he', 'ar'];

export const metadata: Metadata = {
  metadataBase: new URL('https://promindlab.ru'),
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const locale = headersList.get('x-next-intl-locale') ?? 'en';
  const dir = rtlLocales.includes(locale) ? 'rtl' : 'ltr';
  const fontVars = [
    inter.variable,
    spaceGrotesk.variable,
    notoArabic.variable,
    notoHebrew.variable,
  ].join(' ');

  return (
    <html lang={locale} dir={dir} className={`${fontVars} scroll-smooth`}>
      <body className="antialiased w-full min-h-screen overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
