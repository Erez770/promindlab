'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { reachGoal } from '@/lib/metrika';
import { Send, MessageCircle, Mail, Clock, ShieldCheck, Star } from 'lucide-react';

const schema = z.object({
  name: z.string().min(2, 'Минимум 2 символа'),
  email: z.string().email('Введите корректный email'),
  phone: z.string().min(10, 'Введите корректный номер телефона'),
  projectType: z.string().min(1, 'Выберите тип проекта'),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const projectTypes = [
  'Лендинг пейдж',
  'Корпоративный сайт',
  'SaaS платформа',
  'Telegram/WhatsApp бот',
  'Интернет-магазин',
  'Веб-приложение',
  'UI/UX дизайн',
  'Доработка сайта',
  'Другое',
];

const contactMethods = [
  {
    icon: Send,
    label: 'Telegram',
    value: '@ProMindLabAdmin',
    href: 'https://t.me/ProMindLabAdmin',
    color: 'text-blue-400',
    bg: 'from-blue-500/15 to-cyan-500/15',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+7 (926) 300-06-74',
    href: 'https://wa.me/79263000674',
    color: 'text-emerald-400',
    bg: 'from-emerald-500/15 to-teal-500/15',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@promindlab.ru',
    href: 'mailto:hello@promindlab.ru',
    color: 'text-violet-400',
    bg: 'from-violet-500/15 to-purple-500/15',
  },
];

const trustPoints = [
  { Icon: Clock, text: 'Ответим в течение 2 часов' },
  { Icon: ShieldCheck, text: 'Бесплатная консультация' },
  { Icon: Star, text: 'Рейтинг 4.9 — 50+ клиентов' },
];

export default function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [submitError, setSubmitError] = useState('');

  const onSubmit = async (data: FormData) => {
    setSubmitError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Ошибка отправки');
      }

      reachGoal('form_submit', { service: data.projectType });
      setIsSubmitted(true);
      reset();
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Не удалось отправить заявку. Попробуйте позже.');
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/8 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 rounded-full bg-secondary/8 blur-[100px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-[1.875rem] sm:text-[2.5rem] lg:text-[3rem] font-bold tracking-[-0.025em] leading-[1.15] mb-4">
            Готовы <span className="gradient-text">запустить проект?</span>
          </h2>
          <p className="text-muted text-[1.0625rem] leading-[1.65] tracking-[-0.01em] max-w-xl mx-auto">
            Оставьте заявку и получите бесплатный расчёт стоимости
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-8 items-start">

          {/* Left — contact info panel (shows below form on mobile) */}
          <motion.div
            className="flex flex-col gap-6 order-2 lg:order-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Trust points */}
            <div className="glass rounded-2xl p-7 flex flex-col gap-4">
              <h3 className="font-heading text-lg font-bold mb-1">Почему выбирают нас</h3>
              {trustPoints.map(({ Icon, text }, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/15 to-secondary/15 flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-primary" />
                  </div>
                  <span className="text-sm text-muted">{text}</span>
                </div>
              ))}
            </div>

            {/* Contact channels */}
            <div className="glass rounded-2xl p-7">
              <h3 className="font-heading text-lg font-bold mb-5">Связаться напрямую</h3>
              <div className="flex flex-col gap-3">
                {contactMethods.map(({ icon: Icon, label, value, href, color, bg }, i) => (
                  <a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl glass-light hover:bg-foreground/5 transition-all duration-200 group"
                  >
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${bg} flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110`}>
                      <Icon size={18} className={color} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-muted mb-0.5">{label}</p>
                      <p className="text-sm font-medium truncate">{value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Mini testimonial */}
            <div className="glass rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/10 to-transparent rounded-2xl pointer-events-none" />
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#F59E0B">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <p className="text-sm text-muted leading-relaxed italic mb-4">
                &ldquo;Получили готовый SaaS за 5 дней. Качество — на уровне агентств, цена — в 8 раз ниже.&rdquo;
              </p>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-blue-500" />
                <span className="text-xs font-medium">Александр К. — CEO TechStart</span>
              </div>
            </div>
          </motion.div>

          {/* Right — form (shows first on mobile) */}
          <motion.div
            className="glass rounded-2xl p-8 sm:p-10 order-1 lg:order-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center py-16"
                >
                  <motion.div
                    className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                  >
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-success">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </motion.div>
                  <h3 className="font-heading text-[1.375rem] font-bold tracking-[-0.02em] mb-2">Заявка отправлена!</h3>
                  <p className="text-muted">Мы свяжемся с вами в течение 2 часов</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="grid sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium mb-2">Имя</label>
                      <input
                        {...register('name')}
                        className="w-full px-4 py-3 rounded-xl bg-surface-light border border-border focus:border-primary focus:outline-none transition-colors text-foreground placeholder:text-muted/50"
                        placeholder="Иван Иванов"
                      />
                      {errors.name && (
                        <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input
                        {...register('email')}
                        type="email"
                        className="w-full px-4 py-3 rounded-xl bg-surface-light border border-border focus:border-primary focus:outline-none transition-colors text-foreground placeholder:text-muted/50"
                        placeholder="ivan@example.com"
                      />
                      {errors.email && (
                        <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium mb-2">Телефон</label>
                      <input
                        {...register('phone')}
                        type="tel"
                        className="w-full px-4 py-3 rounded-xl bg-surface-light border border-border focus:border-primary focus:outline-none transition-colors text-foreground placeholder:text-muted/50"
                        placeholder="+7 (999) 123-45-67"
                      />
                      {errors.phone && (
                        <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>
                      )}
                    </div>

                    {/* Project Type */}
                    <div>
                      <label className="block text-sm font-medium mb-2">Тип проекта</label>
                      <select
                        {...register('projectType')}
                        className="w-full px-4 py-3 rounded-xl bg-surface-light border border-border focus:border-primary focus:outline-none transition-colors text-foreground appearance-none cursor-pointer"
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Выберите тип
                        </option>
                        {projectTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      {errors.projectType && (
                        <p className="text-red-400 text-xs mt-1">{errors.projectType.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Сообщение{' '}
                      <span className="text-muted font-normal">(необязательно)</span>
                    </label>
                    <textarea
                      {...register('message')}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl bg-surface-light border border-border focus:border-primary focus:outline-none transition-colors text-foreground placeholder:text-muted/50 resize-none"
                      placeholder="Расскажите о вашем проекте..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-shimmer w-full py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <motion.span
                          className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        />
                        Отправка...
                      </span>
                    ) : (
                      'Получить бесплатный расчёт'
                    )}
                  </button>

                  {submitError && (
                    <p className="text-center text-sm text-red-400">{submitError}</p>
                  )}

                  <p className="text-center text-sm text-muted">
                    Ответим в течение 2 часов. Никакого спама.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
