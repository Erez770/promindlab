'use client';

import { motion } from 'framer-motion';
import { Zap, PiggyBank, Award, Brain, ShieldCheck, Headphones, type LucideIcon } from 'lucide-react';

const advantages: { Icon: LucideIcon; title: string; desc: string }[] = [
  {
    Icon: Zap,
    title: 'Скорость',
    desc: 'Готово за 3-7 дней. AI ускоряет разработку в 10 раз.',
  },
  {
    Icon: PiggyBank,
    title: 'Выгода',
    desc: 'В 5-10 раз дешевле традиционной разработки.',
  },
  {
    Icon: Award,
    title: 'Качество',
    desc: 'Премиум дизайн и чистый код на уровне топ-студий.',
  },
  {
    Icon: Brain,
    title: 'AI-технологии',
    desc: 'Claude, GPT-4 и современный стек технологий.',
  },
  {
    Icon: ShieldCheck,
    title: 'Гарантия',
    desc: 'Возврат 100% если результат не устроит.',
  },
  {
    Icon: Headphones,
    title: 'Поддержка',
    desc: '24/7 на связи. Быстрая реакция на любые вопросы.',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Advantages() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/[0.02] to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-[1.875rem] sm:text-[2.5rem] lg:text-[3rem] font-bold tracking-[-0.025em] leading-[1.15] mb-4">
            Почему <span className="gradient-text">выбирают нас</span>
          </h2>
          <p className="text-muted text-[1.0625rem] leading-[1.65] tracking-[-0.01em] max-w-2xl mx-auto">
            6 причин доверить проект ProMindLab
          </p>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {advantages.map((adv, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="group"
            >
              <div className="glass rounded-2xl p-8 h-full hover:border-primary/20 transition-all duration-300 group-hover:bg-foreground/[0.02]">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <adv.Icon size={28} className="text-primary" />
                </div>
                <h3 className="font-heading text-[1.125rem] font-semibold tracking-[-0.02em] leading-[1.3] mb-2">{adv.title}</h3>
                <p className="text-muted leading-relaxed">{adv.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
