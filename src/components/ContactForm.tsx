'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { reachGoal } from '@/lib/metrika';

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
    <section id="contact" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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

        <motion.div
          className="glass rounded-2xl p-8 sm:p-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-12"
              >
                <motion.div
                  className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                >
                  <span className="text-4xl">✓</span>
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
                <div className="grid sm:grid-cols-2 gap-6">
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
                  className="w-full py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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
    </section>
  );
}
