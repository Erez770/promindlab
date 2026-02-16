'use client';

import { motion } from 'framer-motion';
import { Rocket, Zap, PiggyBank, Star, type LucideIcon } from 'lucide-react';
import { useCountUp } from '@/hooks/useCountUp';

const stats: { value: number; suffix: string; prefix?: string; label: string; Icon: LucideIcon }[] = [
  { value: 50, suffix: '+', label: 'Проектов запущено', Icon: Rocket },
  { value: 5, suffix: ' дней', label: 'Средний срок разработки', Icon: Zap },
  { value: 10, suffix: 'x', prefix: '5-', label: 'Дешевле обычной разработки', Icon: PiggyBank },
  { value: 100, suffix: '%', label: 'Довольных клиентов', Icon: Star },
];

function StatItem({ stat, index }: { stat: (typeof stats)[0]; index: number }) {
  const { count, ref } = useCountUp(stat.value, 2000);

  return (
    <motion.div
      ref={ref}
      className="text-center group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
    >
      <div className="glass rounded-2xl p-8 hover:border-primary/20 transition-colors duration-300">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/15 to-secondary/15 flex items-center justify-center mb-4 mx-auto">
          <stat.Icon size={24} className="text-primary" />
        </div>
        <div className="font-heading text-[2.25rem] sm:text-[2.75rem] font-bold gradient-text tabular-nums mb-2">
          {stat.prefix || ''}
          {count}
          {stat.suffix}
        </div>
        <p className="text-muted">{stat.label}</p>
      </div>
    </motion.div>
  );
}

export default function Statistics() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-[1.875rem] sm:text-[2.5rem] lg:text-[3rem] font-bold tracking-[-0.025em] leading-[1.15] mb-4">
            Цифры говорят <span className="gradient-text">за нас</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <StatItem key={i} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
