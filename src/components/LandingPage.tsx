'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { reachGoal } from '@/lib/metrika';
import ContactForm from './ContactForm';
import FloatingButtons from './FloatingButtons';
import ThemeProvider from './ThemeProvider';
import CookieBanner from './CookieBanner';
import ExitIntentPopup from './ExitIntentPopup';
import StickyCTA from './StickyCTA';

interface Benefit {
  icon: string;
  title: string;
  desc: string;
}

interface LandingPageProps {
  badge: string;
  headline: string;
  headlineAccent: string;
  subtitle: string;
  price: string;
  deadline: string;
  benefits: Benefit[];
  stats: { value: string; label: string }[];
  utm: string;
}

export default function LandingPage({
  badge,
  headline,
  headlineAccent,
  subtitle,
  price,
  deadline,
  benefits,
  stats,
  utm,
}: LandingPageProps) {
  return (
    <ThemeProvider>
      <div className="w-full min-h-screen flex flex-col">
        {/* Minimal Header */}
        <header className="fixed top-0 left-0 right-0 z-50 glass">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <a href="/" className="inline-flex items-center">
              <Image
                src="/branding/logo.png"
                alt="ProMindLab"
                width={140}
                height={35}
                priority
                className="h-8 w-auto"
              />
            </a>
            <button
              onClick={() => {
                reachGoal('landing_cta_click', { landing: utm });
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/25 transition-all cursor-pointer"
            >
              Получить расчёт
            </button>
          </div>
        </header>

        <main className="flex-1 w-full">
          {/* Hero */}
          <section className="pt-32 pb-20 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px]" />
            </div>

            <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-light mb-8"
              >
                <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-[13px] font-medium text-muted">{badge}</span>
              </motion.div>

              <motion.h1
                className="font-heading text-[2.25rem] sm:text-[3rem] lg:text-[3.75rem] font-extrabold leading-[1.1] tracking-[-0.03em] mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                {headline} <span className="gradient-text">{headlineAccent}</span>
              </motion.h1>

              <motion.p
                className="text-[1.125rem] sm:text-[1.25rem] text-muted max-w-2xl mx-auto mb-10 leading-[1.65]"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                {subtitle}
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
              >
                <button
                  onClick={() => {
                    reachGoal('landing_cta_click', { landing: utm });
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-10 py-4 rounded-2xl text-[15px] font-semibold text-white bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/25 transition-all cursor-pointer"
                >
                  Получить бесплатный расчёт
                </button>
                <div className="flex items-center gap-6 text-sm text-muted">
                  <span>от <strong className="text-foreground">{price}</strong></span>
                  <span className="w-px h-4 bg-border" />
                  <span>за <strong className="text-foreground">{deadline}</strong></span>
                </div>
              </motion.div>

              {/* Stats */}
              <motion.div
                className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.8 }}
              >
                {stats.map((stat, i) => (
                  <div key={i} className="glass rounded-xl p-4 text-center">
                    <div className="font-heading text-2xl font-bold gradient-text">{stat.value}</div>
                    <div className="text-xs text-muted mt-1">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Benefits */}
          <section className="py-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.h2
                className="font-heading text-[1.875rem] sm:text-[2.5rem] font-bold tracking-[-0.025em] text-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Почему <span className="gradient-text">выбирают нас</span>
              </motion.h2>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {benefits.map((b, i) => (
                  <motion.div
                    key={i}
                    className="glass rounded-2xl p-8 hover:border-primary/20 transition-all"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="text-4xl mb-4">{b.icon}</div>
                    <h3 className="font-heading text-lg font-semibold mb-2">{b.title}</h3>
                    <p className="text-sm text-muted leading-relaxed">{b.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* How it works */}
          <section className="py-20 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />
            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.h2
                className="font-heading text-[1.875rem] sm:text-[2.5rem] font-bold tracking-[-0.025em] text-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Как это <span className="gradient-text">работает</span>
              </motion.h2>

              <div className="space-y-8">
                {[
                  { step: '01', title: 'Оставляете заявку', desc: 'Заполните форму или напишите в Telegram. Мы перезвоним в течение 2 часов.' },
                  { step: '02', title: 'Обсуждаем детали', desc: 'Разбираем задачу, составляем ТЗ и согласовываем бюджет. Бесплатно.' },
                  { step: '03', title: 'Разрабатываем с AI', desc: 'Используем Claude, GPT-4 и лучшие AI-инструменты для быстрой и качественной разработки.' },
                  { step: '04', title: 'Запускаем проект', desc: 'Деплоим, тестируем, передаём вам готовый продукт с гарантией.' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex gap-6 items-start"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                  >
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-bold text-sm">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-semibold mb-1">{item.title}</h3>
                      <p className="text-sm text-muted">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Form */}
          <ContactForm />
        </main>

        {/* Footer */}
        <footer className="border-t border-border/30 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted">&copy; 2025 ProMindLab. Все права защищены.</p>
            <div className="flex gap-6 text-xs text-muted">
              <a href="https://t.me/ProMindLabAdmin" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Telegram</a>
              <a href="https://wa.me/79104666668" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">WhatsApp</a>
              <a href="mailto:hello@promindlab.ru" className="hover:text-foreground transition-colors">Email</a>
            </div>
          </div>
        </footer>

        <FloatingButtons />
        <StickyCTA />
        <ExitIntentPopup />
        <CookieBanner />
      </div>
    </ThemeProvider>
  );
}
