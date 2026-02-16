'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { FileText, Globe, Rocket, MessageSquare, ShoppingCart, Smartphone, Palette, Wrench, type LucideIcon } from 'lucide-react';

const services: { Icon: LucideIcon; title: string; desc: string; features: string[]; price: string; time: string; popular: boolean }[] = [
  {
    Icon: FileText,
    title: 'Лендинг Пейдж',
    desc: 'Одностраничный сайт с wow-эффектом',
    features: ['Адаптивный дизайн, анимации, формы', 'SEO-оптимизация'],
    price: 'от 25,000₽',
    time: '2-3 дня',
    popular: false,
  },
  {
    Icon: Globe,
    title: 'Корпоративный сайт',
    desc: 'Многостраничный сайт (до 10 страниц)',
    features: ['CMS для управления контентом', 'Интеграции, формы, блог'],
    price: 'от 60,000₽',
    time: '5-7 дней',
    popular: true,
  },
  {
    Icon: Rocket,
    title: 'SaaS платформа (MVP)',
    desc: 'Веб-приложение с личным кабинетом',
    features: ['Авторизация, база данных', 'API интеграции, панель управления'],
    price: 'от 150,000₽',
    time: '7-14 дней',
    popular: true,
  },
  {
    Icon: MessageSquare,
    title: 'Telegram/WhatsApp боты',
    desc: 'Автоматизация коммуникации',
    features: ['Приём заказов, консультации', 'Интеграция с CRM/платежами'],
    price: 'от 30,000₽',
    time: '3-5 дней',
    popular: false,
  },
  {
    Icon: ShoppingCart,
    title: 'Интернет-магазин',
    desc: 'E-commerce с корзиной и оплатой',
    features: ['Каталог товаров, фильтры', 'Интеграция с доставкой'],
    price: 'от 80,000₽',
    time: '5-7 дней',
    popular: false,
  },
  {
    Icon: Smartphone,
    title: 'Веб-приложение',
    desc: 'Кастомное решение под задачу',
    features: ['Дашборды, аналитика, автоматизация', 'Интеграции с API'],
    price: 'от 100,000₽',
    time: '7-10 дней',
    popular: false,
  },
  {
    Icon: Palette,
    title: 'UI/UX дизайн',
    desc: 'Дизайн-макеты в Figma',
    features: ['Прототипирование, user flow', 'Дизайн-система'],
    price: 'от 40,000₽',
    time: '3-5 дней',
    popular: false,
  },
  {
    Icon: Wrench,
    title: 'Доработка сайта',
    desc: 'Исправления, новые функции',
    features: ['Оптимизация, рефакторинг', 'Интеграции и автоматизация'],
    price: 'от 15,000₽',
    time: '1-3 дня',
    popular: false,
  },
];

function ServiceCard({ service, index }: { service: (typeof services)[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-150, 150], [8, -8]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-150, 150], [-8, 8]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouse = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className="card-3d group relative"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY }}
    >
      <div className="relative glass rounded-2xl p-6 h-full flex flex-col overflow-hidden group-hover:border-primary/30 transition-colors duration-500">
        {service.popular && (
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r from-primary to-secondary text-xs font-semibold text-white">
            Хит
          </div>
        )}

        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/15 to-secondary/15 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
          <service.Icon size={24} className="text-primary" />
        </div>
        <h3 className="font-heading text-[1.125rem] font-semibold tracking-[-0.02em] leading-[1.3] mb-2">{service.title}</h3>
        <p className="text-[0.875rem] leading-[1.55] text-muted mb-4">{service.desc}</p>

        <ul className="space-y-2 mb-6 flex-1">
          {service.features.map((f, j) => (
            <li key={j} className="flex items-start gap-2 text-sm text-muted">
              <span className="text-primary mt-0.5">✓</span>
              {f}
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between mb-4 pt-4 border-t border-border/30">
          <div>
            <p className="font-heading text-[1.0625rem] font-bold gradient-text tabular-nums">{service.price}</p>
            <p className="text-[0.75rem] font-medium text-muted">Срок: {service.time}</p>
          </div>
        </div>

        <button
          onClick={() =>
            document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
          }
          className="w-full py-2.5 rounded-xl text-sm font-medium glass-light hover:bg-foreground/5 transition-colors duration-300 cursor-pointer"
        >
          Заказать
        </button>

        {/* Hover border glow */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-[1.875rem] sm:text-[2.5rem] lg:text-[3rem] font-bold tracking-[-0.025em] leading-[1.15] mb-4">
            Наши <span className="gradient-text">услуги</span>
          </h2>
          <p className="text-muted text-[1.0625rem] leading-[1.65] tracking-[-0.01em] max-w-2xl mx-auto">
            Полный спектр digital-разработки с использованием AI-технологий
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <ServiceCard key={i} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
