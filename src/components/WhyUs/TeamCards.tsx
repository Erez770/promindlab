'use client';

import { motion } from 'framer-motion';
import { Brain, Code2, Rocket } from 'lucide-react';
import { useTranslations } from 'next-intl';

const icons = [Brain, Code2, Rocket];

export default function TeamCards() {
  const t = useTranslations('TeamCards');
  const rawCards = t.raw('cards') as Array<{title: string; description: string; badge: string}>;
  const cards = rawCards.map((c, i) => ({ ...c, icon: icons[i], popular: i === 1 }));
  return (
    <div>
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight mb-3">
          {t('headline')} <span className="gradient-text">{t('headlineAccent')}</span>
        </h3>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-5 sm:gap-6">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={i}
              className={`relative glass rounded-2xl p-6 sm:p-7 flex flex-col group transition-all duration-500 hover:scale-[1.03] ${
                card.popular ? 'border-primary/30 glow md:-mt-3 md:mb-[-12px]' : 'hover:border-primary/20'
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              {card.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-primary to-secondary text-xs font-semibold text-white">
                  {t('keyRole')}
                </div>
              )}

              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-500 ${
                  card.popular
                    ? 'bg-gradient-to-br from-primary/20 to-secondary/20'
                    : 'bg-surface-light group-hover:bg-primary/10'
                }`}
              >
                <Icon
                  size={24}
                  className={`transition-colors duration-300 ${
                    card.popular ? 'text-primary' : 'text-muted group-hover:text-primary'
                  }`}
                />
              </div>

              <h4 className="font-heading text-lg font-semibold mb-3">{card.title}</h4>
              <p className="text-foreground/60 text-sm leading-relaxed mb-5 flex-1">{card.description}</p>

              <div className="px-3 py-2 rounded-lg bg-surface-light/80 text-xs text-muted font-medium text-center">
                {card.badge}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
