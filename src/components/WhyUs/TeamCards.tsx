'use client';

import { motion } from 'framer-motion';
import { Brain, Code2, Rocket } from 'lucide-react';

const cards = [
  {
    icon: Brain,
    title: 'Prompt Engineers',
    description:
      'Мы знаем как правильно говорить с AI. Правильный промпт — это 80% результата. Мы написали тысячи промптов и знаем точно что написать чтобы получить идеальный результат с первого раза.',
    badge: 'Claude AI  \u2022  GPT-4  \u2022  Midjourney',
    popular: false,
  },
  {
    icon: Code2,
    title: 'Fullstack Разработчики',
    description:
      'AI пишет код, мы его проверяем, дорабатываем и оптимизируем. Мы понимаем каждую строку кода и знаем когда AI ошибается. Результат — чистый профессиональный продукт.',
    badge: 'React  \u2022  Next.js  \u2022  Node.js  \u2022  Python',
    popular: true,
  },
  {
    icon: Rocket,
    title: 'AI Интеграторы',
    description:
      'Мы знаем какой AI инструмент подходит для каждой задачи. Claude для кода, Midjourney для дизайна, GPT-4 для текстов. Комбинация инструментов даёт результат который невозможно получить используя один инструмент.',
    badge: '50+ AI инструментов в арсенале',
    popular: false,
  },
];

export default function TeamCards() {
  return (
    <div>
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight mb-3">
          Мы не просто используем AI — <span className="gradient-text">мы им управляем</span>
        </h3>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-5 sm:gap-6">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={i}
              className={`relative glass rounded-2xl p-6 sm:p-7 flex flex-col group transition-all duration-500 hover:scale-[1.03] ${
                card.popular ? 'border-primary/30 glow md:-mt-3 md:mb-[-12px]' : 'hover:border-primary/20'
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              {card.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-primary to-secondary text-xs font-semibold text-white">
                  Ключевая роль
                </div>
              )}

              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-500 ${
                  card.popular
                    ? 'bg-gradient-to-br from-primary/20 to-secondary/20'
                    : 'bg-surface-light group-hover:bg-primary/10'
                }`}
              >
                <Icon
                  size={24}
                  className={`transition-colors duration-300 ${
                    card.popular ? 'text-primary' : 'text-muted group-hover:text-primary'
                  }`}
                />
              </div>

              <h4 className="font-heading text-lg font-semibold mb-3">{card.title}</h4>
              <p className="text-foreground/60 text-sm leading-relaxed mb-5 flex-1">{card.description}</p>

              <div className="px-3 py-2 rounded-lg bg-surface-light/80 text-xs text-muted font-medium text-center">
                {card.badge}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
