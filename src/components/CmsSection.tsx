'use client';

import { motion } from 'framer-motion';
import { Layers, Globe, ShoppingBag, GraduationCap, type LucideIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

const categoryMeta: { Icon: LucideIcon; color: string; accent: string; border: string; bg: string; platforms: string[] }[] = [
  {
    Icon: Layers,
    color: 'from-blue-500/20 to-cyan-500/20',
    accent: 'text-blue-400',
    border: 'border-blue-500/20',
    bg: 'bg-blue-500/8',
    platforms: ['Tilda', 'Wix'],
  },
  {
    Icon: Globe,
    color: 'from-violet-500/20 to-purple-500/20',
    accent: 'text-violet-400',
    border: 'border-violet-500/20',
    bg: 'bg-violet-500/8',
    platforms: ['WordPress', '1C-Битрикс', 'Joomla'],
  },
  {
    Icon: ShoppingBag,
    color: 'from-emerald-500/20 to-teal-500/20',
    accent: 'text-emerald-400',
    border: 'border-emerald-500/20',
    bg: 'bg-emerald-500/8',
    platforms: ['Shopify', 'WooCommerce', 'OpenCart', 'PrestaShop', 'Magento', 'BigCommerce'],
  },
  {
    Icon: GraduationCap,
    color: 'from-amber-500/20 to-orange-500/20',
    accent: 'text-amber-400',
    border: 'border-amber-500/20',
    bg: 'bg-amber-500/8',
    platforms: ['GetCourse', 'Teachable', 'Kajabi'],
  },
];

export default function CmsSection() {
  const t = useTranslations('CmsSection');
  const categoryLabels = t.raw('categories') as Array<{ label: string }>;
  const categories = categoryMeta.map((m, i) => ({ ...m, label: categoryLabels[i].label }));

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-64 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-[1.875rem] sm:text-[2.5rem] lg:text-[3rem] font-bold tracking-[-0.025em] leading-[1.15] mb-4">
            {t('headline')}{' '}
            <span className="gradient-text">{t('headlineAccent')}</span>
          </h2>
          <p className="text-muted text-[1.0625rem] leading-[1.65] tracking-[-0.01em] max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => {
            const CatIcon = cat.Icon;
            return (
              <motion.div
                key={i}
                className={`glass rounded-2xl p-6 border ${cat.border} hover:scale-[1.02] transition-transform duration-300`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center shrink-0`}>
                    <CatIcon size={18} className={cat.accent} />
                  </div>
                  <h3 className="font-heading text-[0.9375rem] font-semibold">{cat.label}</h3>
                </div>

                {/* Platforms */}
                <div className="flex flex-wrap gap-2">
                  {cat.platforms.map((platform) => (
                    <span
                      key={platform}
                      className={`px-3 py-1.5 rounded-lg ${cat.bg} border ${cat.border} text-[0.8125rem] font-medium ${cat.accent}`}
                    >
                      {platform}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* SEO-rich bottom text */}
        <motion.p
          className="text-center text-sm text-muted mt-10 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {t('bottomText')}
        </motion.p>
      </div>
    </section>
  );
}
