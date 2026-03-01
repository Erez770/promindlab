import type { Metadata } from 'next';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import JsonLd from '@/components/JsonLd';
import YandexMetrika from '@/components/YandexMetrika';
import HtmlAttributes from '@/components/HtmlAttributes';

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    alternates: {
      canonical: `https://promindlab.ru/${locale}`,
      languages: {
        en: 'https://promindlab.ru/en',
        ru: 'https://promindlab.ru/ru',
        he: 'https://promindlab.ru/he',
        ar: 'https://promindlab.ru/ar',
      },
    },
    openGraph: {
      type: 'website',
      url: `https://promindlab.ru/${locale}`,
      title: t('ogTitle'),
      description: t('ogDescription'),
      locale: locale === 'ru' ? 'ru_RU' : locale === 'en' ? 'en_US' : locale === 'he' ? 'he_IL' : 'ar_SA',
      siteName: 'ProMindLab',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('twitterTitle'),
      description: t('twitterDescription'),
    },
    icons: {
      icon: [
        { url: '/branding/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/branding/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      ],
      apple: [{ url: '/branding/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    },
    manifest: '/site.webmanifest',
    verification: {
      yandex: '358ed387c1d469fb',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Explicitly load messages for this locale to ensure correct translations on client
  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <HtmlAttributes />
      <JsonLd locale={locale} />
      <YandexMetrika />
      {children}
    </NextIntlClientProvider>
  );
}
