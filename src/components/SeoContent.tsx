'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function SeoContent() {
  const t = useTranslations('SeoContent');
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="py-16 border-t border-border/20" aria-label={t('ariaLabel')}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.article
          className="prose prose-sm max-w-none text-muted"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-[1.25rem] sm:text-[1.5rem] font-bold tracking-[-0.02em] text-foreground mb-6">
            {t('title')}
          </h2>

          <p className="text-[0.875rem] leading-[1.75] mb-4">
            {t('intro')}
          </p>

          <div className={`overflow-hidden transition-all duration-500 ${isExpanded ? 'max-h-[3000px]' : 'max-h-0'}`}>
            <h3 className="font-heading text-[1rem] font-semibold text-foreground mt-6 mb-3">
              {t('servicesTitle')}
            </h3>
            <ul className="text-[0.875rem] leading-[1.75] space-y-2 list-none pl-0">
              {(t.raw('serviceItems') as string[]).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            <h3 className="font-heading text-[1rem] font-semibold text-foreground mt-6 mb-3">
              {t('stackTitle')}
            </h3>
            <p className="text-[0.875rem] leading-[1.75] mb-4">
              {t('stackText')}
            </p>

            <h3 className="font-heading text-[1rem] font-semibold text-foreground mt-6 mb-3">
              {t('portfolioTitle')}
            </h3>
            <p className="text-[0.875rem] leading-[1.75] mb-4">
              {t('portfolioText')}
            </p>

            <h3 className="font-heading text-[1rem] font-semibold text-foreground mt-6 mb-3">
              {t('guaranteesTitle')}
            </h3>
            <p className="text-[0.875rem] leading-[1.75] mb-4">
              {t('guaranteesText')}
            </p>

            <h3 className="font-heading text-[1rem] font-semibold text-foreground mt-6 mb-3">
              {t('geographyTitle')}
            </h3>
            <p className="text-[0.875rem] leading-[1.75]">
              {t('geographyText')}
            </p>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-4 text-[0.8125rem] text-primary hover:text-primary/80 transition-colors cursor-pointer font-medium"
          >
            {isExpanded ? t('collapseBtn') : t('expandBtn')}
          </button>
        </motion.article>
      </div>
    </section>
  );
}
