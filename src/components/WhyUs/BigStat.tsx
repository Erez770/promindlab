'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Quote } from 'lucide-react';
import { useTranslations } from 'next-intl';

function CountUp({ target, suffix, duration = 2000 }: { target: number; suffix: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const start = performance.now();
    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text tabular-nums">
      {value}{suffix}
    </span>
  );
}

const statValues = [{ value: 87, isZero: false }, { value: 3, isZero: false }, { value: 0, isZero: true }];

export default function BigStat() {
  const t = useTranslations('BigStat');
  const statLabels = t.raw('stats') as Array<{suffix: string; label: string}>;
  const stats = statValues.map((s, i) => ({ ...s, ...statLabels[i] }));
  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-surface to-secondary/10" />
      <div className="absolute inset-0 noise pointer-events-none" />

      <div className="relative grid lg:grid-cols-2 gap-8 lg:gap-12 p-6 sm:p-8 lg:p-12">
        {/* Quote */}
        <div className="flex flex-col justify-center">
          <Quote size={40} className="text-primary/30 mb-4" />
          <p className="text-lg sm:text-xl leading-relaxed text-foreground/80 mb-6">
            {t('quote')}
          </p>
          <p className="text-muted text-sm">{t('quoteSource')}</p>
        </div>

        {/* Stats */}
        <div className="flex flex-col justify-center gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="text-center lg:text-left"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.15 }}
            >
              {stat.isZero ? (
                <span className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text tabular-nums">
                  0{stat.suffix}
                </span>
              ) : (
                <CountUp target={stat.value} suffix={stat.suffix} />
              )}
              <p className="text-foreground/50 text-sm mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
