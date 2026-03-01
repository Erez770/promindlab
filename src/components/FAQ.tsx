'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

function FAQItem({ faq, index }: { faq: { q: string; a: string }; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const id = `faq-answer-${index}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <div className={`glass rounded-2xl transition-all duration-300 ${isOpen ? 'border-primary/20' : 'hover:border-primary/15'}`}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls={id}
          className="flex items-center justify-between gap-4 p-6 w-full text-left cursor-pointer"
        >
          <h3 className="font-heading text-[1.0625rem] font-semibold tracking-[-0.015em] leading-[1.35] pr-4">{faq.q}</h3>
          <span
            className={`text-xl text-muted shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
            aria-hidden="true"
          >
            +
          </span>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              id={id}
              role="region"
              aria-label={faq.q}
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: 'easeInOut' }}
              style={{ overflow: 'hidden' }}
            >
              <div className="px-6 pb-6">
                <p className="text-muted leading-relaxed pt-4 border-t border-border/30">
                  {faq.a}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function FAQ() {
  const t = useTranslations('FAQ');
  const faqs = t.raw('items') as Array<{q: string; a: string}>;

  return (
    <section id="faq" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 grid-lines opacity-40 pointer-events-none" />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-[1.875rem] sm:text-[2.5rem] lg:text-[3rem] font-bold tracking-[-0.025em] leading-[1.15] mb-4">
            {t('headline')} <span className="gradient-text">{t('headlineAccent')}</span>
          </h2>
          <p className="text-muted text-[1.0625rem] leading-[1.65] tracking-[-0.01em]">{t('subtitle')}</p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
