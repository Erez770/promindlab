'use client';

import { motion } from 'framer-motion';
import { BadgeDollarSign, Zap, Target, type LucideIcon } from 'lucide-react';

const items: { problem: string; problemDesc: string; solution: string; solutionDesc: string; Icon: LucideIcon }[] = [
  {
    problem: 'Разработка дорого стоит',
    problemDesc: 'Средняя цена лендинга — 200-500 тыс. ₽. SaaS — от 2 млн.',
    solution: 'У нас в 5-10 раз дешевле',
    solutionDesc: 'AI автоматизирует 80% рутинной работы, снижая себестоимость.',
    Icon: BadgeDollarSign,
  },
  {
    problem: 'Долгие сроки 2-6 месяцев',
    problemDesc: 'Классическая разработка требует месяцы на согласования.',
    solution: 'Готово за 3-7 дней',
    solutionDesc: 'AI-ассистенты генерируют код в 10 раз быстрее человека.',
    Icon: Zap,
  },
  {
    problem: 'Нужна команда специалистов',
    problemDesc: 'Дизайнер, фронтенд, бэкенд, DevOps, PM — минимум 5 человек.',
    solution: 'Один контакт, полный цикл',
    solutionDesc: 'Мы + AI = целая команда. Один менеджер на весь проект.',
    Icon: Target,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

export default function ProblemSolution() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-[1.875rem] sm:text-[2.5rem] lg:text-[3rem] font-bold tracking-[-0.025em] leading-[1.15] mb-4">
            Зачем платить больше{' '}
            <span className="gradient-text">и ждать дольше?</span>
          </h2>
          <p className="text-muted text-[1.0625rem] leading-[1.65] tracking-[-0.01em] max-w-2xl mx-auto">
            AI-разработка решает главные проблемы классического подхода
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {items.map((item, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="relative group"
            >
              <div className="glass rounded-2xl p-8 h-full flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/15 to-secondary/15 flex items-center justify-center mb-6">
                  <item.Icon size={24} className="text-primary" />
                </div>

                {/* Problem */}
                <div className="mb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-red-500/10 text-red-400 text-xs font-medium mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                    Проблема
                  </div>
                  <h3 className="text-[1.0625rem] font-semibold tracking-[-0.015em] leading-[1.35] mb-2">{item.problem}</h3>
                  <p className="text-[0.875rem] leading-[1.55] text-muted">{item.problemDesc}</p>
                </div>

                {/* Arrow */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px flex-1 bg-gradient-to-r from-red-500/20 to-success/20" />
                  <span className="text-xl">→</span>
                  <div className="h-px flex-1 bg-gradient-to-r from-success/20 to-success/5" />
                </div>

                {/* Solution */}
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-success/10 text-success text-xs font-medium mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-success" />
                    Решение
                  </div>
                  <h3 className="text-[1.0625rem] font-semibold tracking-[-0.015em] leading-[1.35] mb-2 text-success">{item.solution}</h3>
                  <p className="text-[0.875rem] leading-[1.55] text-muted">{item.solutionDesc}</p>
                </div>
              </div>

              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
