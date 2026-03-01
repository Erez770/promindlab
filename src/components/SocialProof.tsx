'use client';

import { motion } from 'framer-motion';
import { Rocket, ShoppingCart, Cloud, BookOpen, TrendingUp, CreditCard, HeartPulse, Users, Building2, Cpu, type LucideIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

const categoryIcons: { Icon: LucideIcon; accent: string }[] = [
  { Icon: Rocket, accent: 'text-violet-400' },
  { Icon: ShoppingCart, accent: 'text-amber-400' },
  { Icon: Cloud, accent: 'text-sky-400' },
  { Icon: BookOpen, accent: 'text-emerald-400' },
  { Icon: TrendingUp, accent: 'text-rose-400' },
  { Icon: CreditCard, accent: 'text-blue-400' },
  { Icon: HeartPulse, accent: 'text-red-400' },
  { Icon: Users, accent: 'text-teal-400' },
  { Icon: Building2, accent: 'text-indigo-400' },
  { Icon: Cpu, accent: 'text-cyan-400' },
];

export default function SocialProof() {
  const t = useTranslations('SocialProof');
  const statsData = t.raw('stats') as Array<{ value: string; label: string }>;
  const categoryNames = t.raw('categories') as string[];

  const row1 = categoryIcons.map((meta, i) => ({ ...meta, name: categoryNames[i] }));
  const doubled = [...row1, ...row1];

  return (
    <section className="py-14 border-y border-border/30 overflow-hidden relative">
      <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Stats row */}
        <div className="flex justify-center items-center gap-8 mb-8 px-4">
          {statsData.map((s, i) => (
            <div key={i} className="text-center">
              <p className="font-heading text-[1.5rem] font-bold gradient-text tabular-nums leading-none">{s.value}</p>
              <p className="text-[0.7rem] text-muted uppercase tracking-[0.08em] mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-[0.75rem] text-muted mb-6 tracking-[0.1em] uppercase font-medium">
          {t('marqueeLabel')}
        </p>

        {/* Marquee */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          <div className="flex animate-marquee">
            {doubled.map((cat, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 px-5 py-2.5 mx-3 rounded-xl glass-light whitespace-nowrap shrink-0 border border-border/30 hover:border-primary/20 transition-colors duration-300"
              >
                <cat.Icon size={16} className={cat.accent} />
                <span className="text-foreground/75 text-[0.8125rem] font-medium">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
