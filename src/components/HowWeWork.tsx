'use client';

import { motion } from 'framer-motion';

const steps = [
  {
    num: '01',
    title: 'Заявка и бриф',
    desc: 'Обсуждаем задачу, определяем требования и составляем техническое задание.',
    time: '1 день',
    icon: '📋',
  },
  {
    num: '02',
    title: 'Прототип и согласование',
    desc: 'Создаём wireframe и дизайн-прототип. Утверждаем концепцию с вами.',
    time: '1-2 дня',
    icon: '✏️',
  },
  {
    num: '03',
    title: 'Разработка с AI',
    desc: 'AI-инструменты генерируют код, мы контролируем качество и архитектуру.',
    time: '2-5 дней',
    icon: '🤖',
  },
  {
    num: '04',
    title: 'Тестирование и правки',
    desc: 'Тестируем на всех устройствах, вносим финальные корректировки.',
    time: '1 день',
    icon: '🔍',
  },
  {
    num: '05',
    title: 'Запуск и обучение',
    desc: 'Деплоим проект, проводим обучение по управлению и передаём все доступы.',
    time: '1 день',
    icon: '🚀',
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
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent -translate-y-1/2" />

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

                  <span className="text-3xl block mt-2 mb-4">{step.icon}</span>
                  <h3 className="font-heading text-[1.0625rem] font-semibold tracking-[-0.015em] leading-[1.35] mb-2">{step.title}</h3>
                  <p className="text-sm text-muted mb-3 leading-relaxed">{step.desc}</p>
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                    {step.time}
                  </span>
                </div>

                {/* Arrow between cards (desktop) */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-5 text-muted -translate-y-1/2 z-10">
                    →
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
