'use client';

import { useLocale } from 'next-intl';
import { useEffect } from 'react';

const rtlLocales = ['he', 'ar'];

export default function HtmlAttributes() {
  const locale = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = rtlLocales.includes(locale) ? 'rtl' : 'ltr';
  }, [locale]);

  return null;
}
