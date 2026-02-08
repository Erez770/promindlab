'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function SeoContent() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="py-16 border-t border-border/20" aria-label="Подробная информация о разработке на AI">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.article
          className="prose prose-sm max-w-none text-muted"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-[1.25rem] sm:text-[1.5rem] font-bold tracking-[-0.02em] text-foreground mb-6">
            Разработка сайтов, SaaS-платформ и ботов на искусственном интеллекте в России
          </h2>

          <p className="text-[0.875rem] leading-[1.75] mb-4">
            <strong className="text-foreground">ProMindLab</strong> — агентство разработки сайтов, веб-приложений и
            Telegram-ботов с использованием искусственного интеллекта. Мы создаём
            премиум-решения за 3-7 дней по ценам в 5-10 раз ниже традиционной разработки,
            используя передовые AI-технологии: <strong className="text-foreground">Claude AI</strong>,{' '}
            <strong className="text-foreground">GPT-4</strong>, GitHub Copilot и Cursor AI.
          </p>

          <div className={`overflow-hidden transition-all duration-500 ${isExpanded ? 'max-h-[3000px]' : 'max-h-0'}`}>
            <h3 className="font-heading text-[1rem] font-semibold text-foreground mt-6 mb-3">
              Услуги разработки на AI
            </h3>
            <ul className="text-[0.875rem] leading-[1.75] space-y-2 list-none pl-0">
              <li>
                <strong className="text-foreground">Разработка лендинг пейдж</strong> от 25,000₽ за 2-3 дня —
                одностраничные сайты с анимациями, адаптивным дизайном и SEO-оптимизацией
              </li>
              <li>
                <strong className="text-foreground">Создание корпоративных сайтов</strong> от 60,000₽ за 5-7 дней —
                многостраничные сайты с CMS, интеграциями и управлением контентом
              </li>
              <li>
                <strong className="text-foreground">Разработка SaaS-платформ (MVP)</strong> от 150,000₽ за 7-14 дней —
                веб-приложения с личным кабинетом, авторизацией, базой данных и API
              </li>
              <li>
                <strong className="text-foreground">Telegram и WhatsApp боты</strong> от 30,000₽ за 3-5 дней —
                автоматизация коммуникации, приём заказов, интеграция с CRM и оплатой
              </li>
              <li>
                <strong className="text-foreground">Интернет-магазины</strong> от 80,000₽ за 5-7 дней —
                e-commerce с корзиной, оплатой через ЮKassa, каталогом и доставкой
              </li>
              <li>
                <strong className="text-foreground">Веб-приложения</strong> от 100,000₽ за 7-10 дней —
                дашборды, аналитика, автоматизация бизнес-процессов
              </li>
            </ul>

            <h3 className="font-heading text-[1rem] font-semibold text-foreground mt-6 mb-3">
              Технологический стек
            </h3>
            <p className="text-[0.875rem] leading-[1.75] mb-4">
              В разработке мы применяем: React, Next.js, Node.js, Python, TypeScript, Tailwind CSS,
              PostgreSQL, MongoDB, Supabase, Firebase, Telegram Bot API, Stripe, ЮKassa.
              AI-инструменты автоматизируют до 80% рутинных задач — написание кода, вёрстку, тестирование —
              что позволяет завершать проекты за 3-7 дней вместо 2-6 месяцев.
            </p>

            <h3 className="font-heading text-[1rem] font-semibold text-foreground mt-6 mb-3">
              Портфолио и результаты
            </h3>
            <p className="text-[0.875rem] leading-[1.75] mb-4">
              За последний год мы разработали и запустили более 50 проектов для стартапов, малого и
              среднего бизнеса в России и СНГ. Наши кейсы включают финтех-платформы, образовательные
              сервисы, e-commerce решения, CRM-системы и автоматизацию продаж через Telegram-ботов.
              Средний срок разработки — 7 дней, удовлетворённость клиентов — 100%.
            </p>

            <h3 className="font-heading text-[1rem] font-semibold text-foreground mt-6 mb-3">
              Гарантии и поддержка
            </h3>
            <p className="text-[0.875rem] leading-[1.75] mb-4">
              Гарантируем премиум-качество: современный дизайн, адаптивная вёрстка,
              быстрая загрузка (Lighthouse 90+), SEO-оптимизация, безопасность.
              Неограниченные правки на этапе разработки, техподдержка 24/7,
              обучение работе с системой. Гарантия возврата 100% средств если результат не устроит.
            </p>

            <h3 className="font-heading text-[1rem] font-semibold text-foreground mt-6 mb-3">
              География работы
            </h3>
            <p className="text-[0.875rem] leading-[1.75]">
              Работаем с клиентами по всей России (Москва, Санкт-Петербург, Казань, Новосибирск,
              Екатеринбург) и в странах СНГ (Казахстан, Беларусь, Узбекистан, Армения).
              Все процессы удалённые: встречи онлайн, демо через Vercel.
              Принимаем оплату: банковский перевод, ЮKassa, Stripe.
            </p>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-4 text-[0.8125rem] text-primary hover:text-primary/80 transition-colors cursor-pointer font-medium"
          >
            {isExpanded ? '↑ Свернуть' : '↓ Подробнее о наших услугах'}
          </button>
        </motion.article>
      </div>
    </section>
  );
}
