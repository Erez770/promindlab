'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { reachGoal } from '@/lib/metrika';
import { useTranslations, useLocale } from 'next-intl';

const projectTypePrices = [25000, 50000, 80000, 150000, 35000];
const addonPrices = [15000, 20000, 10000, 5000, 0, 15000];

export default function PricingCalculator() {
  const t = useTranslations('PricingCalculator');
  const locale = useLocale();

  const ptTranslations = t.raw('projectTypes') as Array<{ id: string; label: string }>;
  const projectTypes = ptTranslations.map((pt, i) => ({ ...pt, base: projectTypePrices[i] }));

  const addonTranslations = t.raw('addons') as Array<{ id: string; label: string }>;
  const addons = addonTranslations.map((a, i) => ({ ...a, price: addonPrices[i] }));

  const [selectedType, setSelectedType] = useState('landing');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [pages, setPages] = useState(5);

  const projectType = projectTypes.find((tp) => tp.id === selectedType)!;
  const pageMultiplier = selectedType === 'landing' || selectedType === 'bot' ? 1 : Math.max(1, pages / 5);
  const basePrice = Math.round(projectType.base * pageMultiplier);
  const addonsPrice = selectedAddons.reduce((sum, id) => {
    const addon = addons.find((a) => a.id === id);
    return sum + (addon?.price ?? 0);
  }, 0);
  const total = basePrice + addonsPrice;

  function formatPrice(price: number): string {
    return price.toLocaleString(locale === 'ru' ? 'ru-RU' : locale);
  }

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const handleGetQuote = () => {
    reachGoal('calculator_submit', {
      type: selectedType,
      total,
      addons: selectedAddons.join(','),
    });
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="calculator" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/[0.02] to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-primary/6 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-[1.875rem] sm:text-[2.5rem] lg:text-[3rem] font-bold tracking-[-0.025em] leading-[1.15] mb-4">
            {t('headline')} <span className="gradient-text">{t('headlineAccent')}</span>
          </h2>
          <p className="text-muted text-[1.0625rem] leading-[1.65] max-w-xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        <motion.div
          className="glass rounded-2xl p-8 sm:p-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Project type */}
          <div className="mb-8">
            <label className="block text-sm font-medium mb-3">{t('projectTypeLabel')}</label>
            <div className="grid sm:grid-cols-2 gap-3">
              {projectTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium text-left transition-all cursor-pointer ${
                    selectedType === type.id
                      ? 'bg-gradient-to-r from-primary to-secondary text-white'
                      : 'glass-light hover:bg-foreground/5'
                  }`}
                >
                  {type.label}
                  <span className="block text-xs mt-0.5 opacity-75">{t('from')} {formatPrice(type.base)}₽</span>
                </button>
              ))}
            </div>
          </div>

          {/* Pages slider */}
          {selectedType !== 'landing' && selectedType !== 'bot' && (
            <div className="mb-8">
              <label className="block text-sm font-medium mb-3">
                {t('pagesLabel')} <strong className="gradient-text">{pages}</strong>
              </label>
              <input
                type="range"
                min={1}
                max={20}
                value={pages}
                onChange={(e) => setPages(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-xs text-muted mt-1">
                <span>1</span>
                <span>20</span>
              </div>
            </div>
          )}

          {/* Addons */}
          <div className="mb-8">
            <label className="block text-sm font-medium mb-3">{t('addonsLabel')}</label>
            <div className="grid sm:grid-cols-2 gap-3">
              {addons.map((addon) => (
                <button
                  key={addon.id}
                  onClick={() => toggleAddon(addon.id)}
                  className={`px-4 py-3 rounded-xl text-sm text-left transition-all cursor-pointer flex items-center justify-between ${
                    selectedAddons.includes(addon.id)
                      ? 'bg-primary/10 border border-primary/30'
                      : 'glass-light hover:bg-foreground/5'
                  }`}
                >
                  <span>{addon.label}</span>
                  <span className="text-xs font-medium text-muted">
                    {addon.price === 0 ? t('free') : `+${formatPrice(addon.price)}₽`}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="border-t border-border/30 pt-6 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-sm text-muted mb-1">{t('estimatedPrice')}</p>
              <AnimatePresence mode="wait">
                <motion.p
                  key={total}
                  className="font-heading text-3xl sm:text-4xl font-bold gradient-text tabular-nums"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  {formatPrice(total)}₽
                </motion.p>
              </AnimatePresence>
            </div>
            <button
              onClick={handleGetQuote}
              className="btn-shimmer w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/25 transition-all cursor-pointer"
            >
              {t('ctaBtn')}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
