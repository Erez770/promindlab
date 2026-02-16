'use client';

import { motion } from 'framer-motion';
import { Rocket, ShoppingCart, Cloud, BookOpen, TrendingUp, CreditCard, HeartPulse, Users, type LucideIcon } from 'lucide-react';

const categories: { name: string; Icon: LucideIcon }[] = [
  { name: 'Стартапы', Icon: Rocket },
  { name: 'E-commerce', Icon: ShoppingCart },
  { name: 'SaaS', Icon: Cloud },
  { name: 'Образование', Icon: BookOpen },
  { name: 'Маркетинг', Icon: TrendingUp },
  { name: 'Финтех', Icon: CreditCard },
  { name: 'Медтех', Icon: HeartPulse },
  { name: 'HR Tech', Icon: Users },
];

export default function SocialProof() {
  const doubled = [...categories, ...categories];

  return (
    <section className="py-16 border-y border-border/30 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-center text-[0.75rem] text-muted mb-8 tracking-[0.1em] uppercase font-medium">
          Работаем с компаниями из разных отраслей
        </p>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
          <div className="flex animate-marquee">
            {doubled.map((cat, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-8 py-3 mx-4 rounded-xl glass-light whitespace-nowrap shrink-0"
              >
                <cat.Icon size={20} className="text-primary" />
                <span className="text-foreground/80 text-[0.875rem] font-medium">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
