'use client';

import { motion } from 'framer-motion';

const faqs = [
  {
    q: 'Как AI помогает в разработке?',
    a: 'AI-инструменты (Claude, GPT-4, Cursor) генерируют до 80% кода, создают дизайн-макеты и автоматизируют тестирование. Мы контролируем качество, архитектуру и бизнес-логику. Результат — продукт уровня топ-студии за долю времени и цены.',
  },
  {
    q: 'Почему так быстро и дёшево?',
    a: 'AI автоматизирует рутинные задачи: написание boilerplate-кода, вёрстку, настройку инфраструктуры. Мы фокусируемся на архитектуре, UX и бизнес-логике. Это позволяет сократить срок разработки в 5-10 раз без потери качества.',
  },
  {
    q: 'Какие гарантии качества?',
    a: 'Гарантируем: код проходит code review, тестирование на всех устройствах, Lighthouse score 90+. Если результат не устроит — вернём 100% оплаты. После запуска предоставляем бесплатную поддержку от 1 до 6 месяцев.',
  },
  {
    q: 'Будет ли поддержка после запуска?',
    a: 'Да! В зависимости от пакета — от 1 до 6 месяцев бесплатной поддержки. Исправление багов, мелкие доработки, консультации. После окончания бесплатного периода — техподдержка по абонементу от 10,000₽/мес.',
  },
  {
    q: 'Можно ли внести правки?',
    a: 'Конечно! В процессе разработки — до 3 раундов правок бесплатно. В пакете "Премиум" — неограниченные правки. Мы работаем итеративно: показываем результат на каждом этапе.',
  },
  {
    q: 'Какие способы оплаты?',
    a: 'Принимаем: банковские карты, расчётный счёт (для юрлиц), ЮKassa, Stripe (для международных клиентов). Оплата в 2 этапа: 50% предоплата + 50% после сдачи проекта.',
  },
  {
    q: 'Работаете ли с СНГ?',
    a: 'Да, работаем с клиентами из России, Казахстана, Беларуси, Узбекистана и других стран СНГ. Для международных клиентов принимаем оплату в USD/EUR через Stripe.',
  },
  {
    q: 'Что если мне не понравится?',
    a: 'Мы показываем прототип до начала основной разработки. Если концепция не устроит — вернём предоплату. Если финальный результат не соответствует ТЗ — бесплатно дорабатываем или возвращаем деньги.',
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="py-24 relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-[1.875rem] sm:text-[2.5rem] lg:text-[3rem] font-bold tracking-[-0.025em] leading-[1.15] mb-4">
            Частые <span className="gradient-text">вопросы</span>
          </h2>
          <p className="text-muted text-[1.0625rem] leading-[1.65] tracking-[-0.01em]">Ответы на популярные вопросы о нашей работе</p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <details className="group glass rounded-2xl hover:border-primary/20 transition-all duration-300">
                <summary className="flex items-center justify-between gap-4 p-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                  <h3 className="font-heading text-[1.0625rem] font-semibold tracking-[-0.015em] leading-[1.35] pr-4">{faq.q}</h3>
                  <span className="text-xl text-muted shrink-0 transition-transform duration-300 group-open:rotate-45">+</span>
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-muted leading-relaxed pt-4 border-t border-border/30">
                    {faq.a}
                  </p>
                </div>
              </details>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
