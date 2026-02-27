'use client';

import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Алексей Петров',
    role: 'CEO',
    company: 'TechStart',
    text: 'Заказали MVP для нашего стартапа. Результат превзошёл все ожидания — за неделю получили полноценный продукт, который раньше оценивали в 3 месяца разработки.',
    rating: 5,
    initials: 'АП',
    gradient: 'from-blue-500 to-violet-500',
    project: 'SaaS платформа',
  },
  {
    name: 'Мария Иванова',
    role: 'Маркетолог',
    company: 'DigitalPro',
    text: 'Лендинг сделали за 2 дня. Конверсия выросла на 40% по сравнению с предыдущим сайтом. Дизайн — огонь, анимации плавные, скорость загрузки отличная.',
    rating: 5,
    initials: 'МИ',
    gradient: 'from-pink-500 to-rose-500',
    project: 'Лендинг пейдж',
  },
  {
    name: 'Дмитрий Козлов',
    role: 'Основатель',
    company: 'EduOnline',
    text: 'Сделали образовательную платформу с личными кабинетами и оплатой. Качество кода отличное, всё работает стабильно. Поддержка реагирует моментально.',
    rating: 5,
    initials: 'ДК',
    gradient: 'from-emerald-500 to-teal-500',
    project: 'Онлайн-школа',
  },
  {
    name: 'Анна Сидорова',
    role: 'Владелец',
    company: 'BeautyShop',
    text: 'Telegram-бот для записи клиентов — это лучшее вложение в бизнес. Автоматизация сэкономила нам 20 часов в неделю. Рекомендую ProMindLab всем!',
    rating: 5,
    initials: 'АС',
    gradient: 'from-amber-500 to-orange-500',
    project: 'Telegram-бот',
  },
  {
    name: 'Игорь Волков',
    role: 'CTO',
    company: 'FinanceApp',
    text: 'Скептически относился к AI-разработке, но результат убедил. Сложную SaaS-платформу собрали за 10 дней. Архитектура чистая, код поддерживаемый.',
    rating: 5,
    initials: 'ИВ',
    gradient: 'from-cyan-500 to-blue-500',
    project: 'FinTech SaaS',
  },
  {
    name: 'Елена Новикова',
    role: 'Предприниматель',
    company: 'NoviStore',
    text: 'Интернет-магазин запустили за 5 дней. Интеграция с ЮKassa, доставкой — всё работает. Цена в 8 раз ниже, чем у обычной студии. Просто космос!',
    rating: 5,
    initials: 'ЕН',
    gradient: 'from-violet-500 to-purple-500',
    project: 'Интернет-магазин',
  },
];

function QuoteIcon() {
  return (
    <svg width="32" height="24" viewBox="0 0 32 24" fill="none" className="opacity-20">
      <path d="M0 24V14.4C0 10.56 0.96 7.36 2.88 4.8C4.88 2.16 7.76 0.56 11.52 0L13.44 2.88C11.04 3.44 9.2 4.56 7.92 6.24C6.72 7.84 6.12 9.68 6.12 11.76H12V24H0ZM20 24V14.4C20 10.56 20.96 7.36 22.88 4.8C24.88 2.16 27.76 0.56 31.52 0L33.44 2.88C31.04 3.44 29.2 4.56 27.92 6.24C26.72 7.84 26.12 9.68 26.12 11.76H32V24H20Z" fill="currentColor"/>
    </svg>
  );
}

function TestimonialCard({ t, index }: { t: typeof testimonials[0]; index: number }) {
  return (
    <motion.div
      className="group relative glass rounded-2xl p-6 flex flex-col gap-5 hover:border-primary/20 transition-colors duration-500"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Quote icon */}
      <div className="text-primary">
        <QuoteIcon />
      </div>

      {/* Project badge */}
      <span className="absolute top-5 right-5 text-[11px] font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/15">
        {t.project}
      </span>

      {/* Stars */}
      <div className="flex gap-0.5" role="img" aria-label={`Оценка ${t.rating} из 5 звёзд`}>
        {Array.from({ length: t.rating }).map((_, i) => (
          <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#F59E0B" className="shrink-0" aria-hidden="true">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        ))}
      </div>

      {/* Text */}
      <p className="text-[0.9375rem] leading-[1.7] text-foreground/80 flex-1">
        {t.text}
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t border-border/20">
        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-xs font-bold text-white shrink-0`}>
          {t.initials}
        </div>
        <div>
          <p className="text-sm font-semibold leading-tight">{t.name}</p>
          <p className="text-xs text-muted mt-0.5">{t.role}, {t.company}</p>
        </div>
      </div>

      {/* Hover glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-secondary/8 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-light mb-6">
            <div className="flex gap-0.5" role="img" aria-label="Рейтинг 5 звёзд">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#F59E0B" aria-hidden="true">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              ))}
            </div>
            <span className="text-[12px] font-medium text-muted">50+ довольных клиентов</span>
          </div>

          <h2 className="font-heading text-[1.875rem] sm:text-[2.5rem] lg:text-[3rem] font-bold tracking-[-0.025em] leading-[1.15] mb-4">
            Клиенты о нас <span className="gradient-text">говорят</span>
          </h2>
          <p className="text-muted text-[1.0625rem] leading-[1.65] tracking-[-0.01em] max-w-xl mx-auto">
            Реальные результаты от реальных проектов
          </p>
        </motion.div>

        {/* Grid: 3 columns on desktop, 2 on tablet, 1 on mobile */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} t={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
