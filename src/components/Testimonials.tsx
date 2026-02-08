'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useCallback } from 'react';

const testimonials = [
  {
    name: 'Алексей Петров',
    role: 'CEO, TechStart',
    text: 'Заказали MVP для нашего стартапа. Результат превзошёл все ожидания — за неделю получили полноценный продукт, который раньше оценивали в 3 месяца разработки.',
    rating: 5,
    avatar: 'АП',
  },
  {
    name: 'Мария Иванова',
    role: 'Маркетолог, DigitalPro',
    text: 'Лендинг сделали за 2 дня. Конверсия выросла на 40% по сравнению с предыдущим сайтом. Дизайн — огонь, анимации плавные, скорость загрузки отличная.',
    rating: 5,
    avatar: 'МИ',
  },
  {
    name: 'Дмитрий Козлов',
    role: 'Основатель, EduOnline',
    text: 'Сделали образовательную платформу с личными кабинетами и оплатой. Качество кода отличное, всё работает стабильно. Поддержка реагирует моментально.',
    rating: 5,
    avatar: 'ДК',
  },
  {
    name: 'Анна Сидорова',
    role: 'Владелец, BeautyShop',
    text: 'Telegram-бот для записи клиентов — это лучшее вложение в бизнес. Автоматизация сэкономила нам 20 часов в неделю. Рекомендую ProMindLab всем!',
    rating: 5,
    avatar: 'АС',
  },
  {
    name: 'Игорь Волков',
    role: 'CTO, FinanceApp',
    text: 'Скептически относился к AI-разработке, но результат убедил. Сложную SaaS-платформу собрали за 10 дней. Архитектура чистая, код поддерживаемый.',
    rating: 5,
    avatar: 'ИВ',
  },
  {
    name: 'Елена Новикова',
    role: 'Предприниматель',
    text: 'Интернет-магазин запустили за 5 дней. Интеграция с ЮKassa, доставкой — всё работает. Цена в 8 раз ниже, чем у обычной студии. Просто космос!',
    rating: 5,
    avatar: 'ЕН',
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  const t = testimonials[current];

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-[1.875rem] sm:text-[2.5rem] lg:text-[3rem] font-bold tracking-[-0.025em] leading-[1.15] mb-4">
            Что говорят <span className="gradient-text">клиенты</span>
          </h2>
          <p className="text-muted text-[1.0625rem] leading-[1.65] tracking-[-0.01em]">Реальные отзывы от реальных людей</p>
        </motion.div>

        <div className="relative">
          <div className="glass rounded-2xl p-8 sm:p-12 min-h-[280px] flex items-center">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="w-full"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-6 justify-center">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <span key={i} className="star-filled text-xl">
                      ★
                    </span>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-[1.0625rem] sm:text-[1.1875rem] text-center mb-8 leading-[1.7] tracking-[-0.01em] text-foreground/90 max-w-2xl mx-auto">
                  &ldquo;{t.text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-sm font-bold text-white">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold">{t.name}</p>
                    <p className="text-sm text-muted">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full glass-light flex items-center justify-center hover:bg-foreground/5 transition-colors cursor-pointer"
              aria-label="Previous"
            >
              ←
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    i === current
                      ? 'bg-primary w-8'
                      : 'bg-muted/30 hover:bg-muted/50'
                  }`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full glass-light flex items-center justify-center hover:bg-foreground/5 transition-colors cursor-pointer"
              aria-label="Next"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
