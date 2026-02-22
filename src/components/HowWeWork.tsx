'use client';

import { motion } from 'framer-motion';
import { ClipboardList, PenLine, Bot, Search, Rocket, type LucideIcon } from 'lucide-react';

const steps: { num: string; title: string; desc: string; time: string; Icon: LucideIcon }[] = [
  {
    num: '01',
    title: 'Заявка и бриф',
    desc: 'Обсуждаем задачу, определяем требования и составляем техническое задание.',
    time: '1 день',
    Icon: ClipboardList,
  },
  {
    num: '02',
    title: 'Прототип и согласование',
    desc: 'Создаём wireframe и дизайн-прототип. Утверждаем концепцию с вами.',
    time: '1-2 дня',
    Icon: PenLine,
  },
  {
    num: '03',
    title: 'Разработка с AI',
    desc: 'AI-инструменты генерируют код, мы контролируем качество и архитектуру.',
    time: '2-5 дней',
    Icon: Bot,
  },
  {
    num: '04',
    title: 'Тестирование и правки',
    desc: 'Тестируем на всех устройствах, вносим финальные корректировки.',
    time: '1 день',
    Icon: Search,
  },
  {
    num: '05',
    title: 'Запуск и обучение',
    desc: 'Деплоим проект, проводим обучение по управлению и передаём все доступы.',
    time: '1 день',
    Icon: Rocket,
  },
];

export default function HowWeWork() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/50 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-[1.875rem] sm:text-[2.5rem] lg:text-[3rem] font-bold tracking-[-0.025em] leading-[1.15] mb-4">
            Как мы <span className="gradient-text">работаем</span>
          </h2>
          <p className="text-muted text-[1.0625rem] leading-[1.65] tracking-[-0.01em] max-w-2xl mx-auto">
            Прозрачный процесс от заявки до запуска
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-y-1/2" />

          <div className="grid lg:grid-cols-5 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                className="relative"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <div className="glass rounded-2xl p-6 text-center relative group hover:border-primary/20 transition-colors duration-300">
                  {/* Step number */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-xs font-bold text-white">
                    {step.num}
                  </div>

                  <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-primary/15 to-secondary/15 flex items-center justify-center mt-2 mb-4">
                    <step.Icon size={24} className="text-primary" />
                  </div>
                  <h3 className="font-heading text-[1.0625rem] font-semibold tracking-[-0.015em] leading-[1.35] mb-2">{step.title}</h3>
                  <p className="text-sm text-muted mb-3 leading-relaxed">{step.desc}</p>
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                    {step.time}
                  </span>
                </div>

                {/* Arrow between cards (desktop) */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-5 -translate-y-1/2 z-10 items-center justify-center w-10 h-10">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-primary/60">
                      <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
