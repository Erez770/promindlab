'use client';

import { motion } from 'framer-motion';
import { Target, PenTool, Bot, Wrench, Rocket } from 'lucide-react';

const steps = [
  {
    icon: Target,
    title: 'Анализ',
    description: 'Изучаем нишу, конкурентов и цели. AI помогает обработать данные за минуты вместо дней.',
  },
  {
    icon: PenTool,
    title: 'Промпт-дизайн',
    description: 'Пишем точные промпты для каждой задачи. Это искусство которому учатся годами.',
  },
  {
    icon: Bot,
    title: 'AI-генерация',
    description: 'Claude и GPT-4 создают код, дизайн, тексты под нашим руководством.',
  },
  {
    icon: Wrench,
    title: 'Доработка',
    description: 'Программисты проверяют, улучшают и оптимизируют каждый элемент. AI не идеален — мы знаем это.',
  },
  {
    icon: Rocket,
    title: 'Запуск',
    description: 'Деплой, тестирование, SEO-настройка, обучение. Вы получаете готовый продукт.',
  },
];

export default function ProcessTimeline() {
  return (
    <div>
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight">
          Наш процесс — это не просто <span className="gradient-text">&laquo;спросить ChatGPT&raquo;</span>
        </h3>
      </motion.div>

      {/* Desktop horizontal timeline */}
      <div className="hidden lg:block">
        {/* Connection line */}
        <div className="relative max-w-5xl mx-auto">
          <div className="absolute top-6 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-secondary/20" />

          <div className="grid grid-cols-5 gap-4">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={i}
                  className="flex flex-col items-center text-center group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.12 }}
                >
                  <div className="relative z-10 w-12 h-12 rounded-full bg-surface border-2 border-primary/30 flex items-center justify-center mb-4 group-hover:border-primary group-hover:glow transition-all duration-500">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <span className="text-xs text-primary/60 font-medium mb-1">Шаг {i + 1}</span>
                  <h4 className="font-heading text-sm font-semibold mb-2">{step.title}</h4>
                  <p className="text-foreground/50 text-xs leading-relaxed">{step.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile/Tablet vertical timeline */}
      <div className="lg:hidden space-y-0">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={i}
              className="relative flex gap-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              {/* Vertical line + dot */}
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-surface border-2 border-primary/30 flex items-center justify-center shrink-0 z-10">
                  <Icon size={18} className="text-primary" />
                </div>
                {i < steps.length - 1 && <div className="w-0.5 flex-1 bg-gradient-to-b from-primary/30 to-primary/10" />}
              </div>

              {/* Content */}
              <div className="pb-8">
                <span className="text-xs text-primary/60 font-medium">Шаг {i + 1}</span>
                <h4 className="font-heading text-base font-semibold mb-1">{step.title}</h4>
                <p className="text-foreground/50 text-sm leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
