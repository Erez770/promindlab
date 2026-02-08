'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const plans = [
  {
    name: 'Старт',
    price: 35000,
    features: [
      'Лендинг пейдж',
      'До 5 секций',
      'Адаптивный дизайн',
      'Базовые анимации',
      'Форма обратной связи',
      '1 месяц поддержки',
    ],
    popular: false,
    cta: 'Заказать',
  },
  {
    name: 'Бизнес',
    price: 85000,
    features: [
      'Всё из "Старт"',
      'До 7 страниц',
      'Premium анимации',
      'CMS интеграция',
      'SEO оптимизация',
      'Telegram бот в подарок',
      '3 месяца поддержки',
    ],
    popular: true,
    cta: 'Заказать',
  },
  {
    name: 'Премиум',
    price: 180000,
    features: [
      'Всё из "Бизнес"',
      'SaaS/веб-приложение',
      'Личный кабинет',
      'API интеграции',
      'Админ панель',
      'Неограниченные правки',
      '6 месяцев поддержки',
    ],
    popular: false,
    cta: 'Заказать',
  },
];

function formatPrice(price: number): string {
  return price.toLocaleString('ru-RU');
}

export default function Pricing() {
  const [isSubscription, setIsSubscription] = useState(false);

  return (
    <section id="pricing" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-[1.875rem] sm:text-[2.5rem] lg:text-[3rem] font-bold tracking-[-0.025em] leading-[1.15] mb-4">
            Прозрачные <span className="gradient-text">цены</span>
          </h2>
          <p className="text-muted text-[1.0625rem] leading-[1.65] tracking-[-0.01em] max-w-2xl mx-auto mb-8">
            Выберите пакет под ваш проект
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-4 glass rounded-full p-1.5">
            <button
              onClick={() => setIsSubscription(false)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                !isSubscription
                  ? 'bg-gradient-to-r from-primary to-secondary text-white'
                  : 'text-muted hover:text-foreground'
              }`}
            >
              Разовый проект
            </button>
            <button
              onClick={() => setIsSubscription(true)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                isSubscription
                  ? 'bg-gradient-to-r from-primary to-secondary text-white'
                  : 'text-muted hover:text-foreground'
              }`}
            >
              Абонемент
              <span className="ml-2 px-2 py-0.5 rounded-full bg-success/20 text-success text-xs">
                -20%
              </span>
            </button>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => {
            const price = isSubscription
              ? Math.round(plan.price * 0.8)
              : plan.price;

            return (
              <motion.div
                key={i}
                className={`relative group ${plan.popular ? 'md:-mt-4 md:mb-[-16px]' : ''}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                whileHover={{ scale: 1.03 }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-primary to-secondary text-xs font-semibold text-white z-10">
                    Популярный выбор
                  </div>
                )}
                <div
                  className={`glass rounded-2xl p-8 h-full flex flex-col ${
                    plan.popular
                      ? 'border-primary/30 glow'
                      : ''
                  } hover:border-primary/20 transition-all duration-300`}
                >
                  <h3 className="font-heading text-[1.125rem] font-semibold tracking-[-0.02em] leading-[1.3] mb-2">{plan.name}</h3>
                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="font-heading text-[2.25rem] font-bold gradient-text tabular-nums">
                        {formatPrice(price)}₽
                      </span>
                    </div>
                    {isSubscription && (
                      <p className="text-xs text-muted mt-1 line-through">
                        {formatPrice(plan.price)}₽
                      </p>
                    )}
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm">
                        <span className="text-primary mt-0.5 shrink-0">✓</span>
                        <span className="text-foreground/80">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() =>
                      document
                        .querySelector('#contact')
                        ?.scrollIntoView({ behavior: 'smooth' })
                    }
                    className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 cursor-pointer ${
                      plan.popular
                        ? 'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg hover:shadow-primary/25'
                        : 'glass-light hover:bg-foreground/5'
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
