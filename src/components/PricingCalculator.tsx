'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { reachGoal } from '@/lib/metrika';

const projectTypes = [
  { id: 'landing', label: 'Лендинг пейдж', base: 25000 },
  { id: 'corporate', label: 'Корпоративный сайт', base: 50000 },
  { id: 'ecommerce', label: 'Интернет-магазин', base: 80000 },
  { id: 'saas', label: 'SaaS / Веб-приложение', base: 150000 },
  { id: 'bot', label: 'Telegram / WhatsApp бот', base: 35000 },
];

const addons = [
  { id: 'design', label: 'Premium UI/UX дизайн', price: 15000 },
  { id: 'cms', label: 'Админ-панель (CMS)', price: 20000 },
  { id: 'seo', label: 'SEO оптимизация', price: 10000 },
  { id: 'analytics', label: 'Яндекс.Метрика + Google Analytics', price: 5000 },
  { id: 'bot_addon', label: 'Telegram бот в подарок', price: 0 },
  { id: 'support3', label: 'Поддержка 3 мес.', price: 15000 },
];

function formatPrice(price: number): string {
  return price.toLocaleString('ru-RU');
}

export default function PricingCalculator() {
  const [selectedType, setSelectedType] = useState('landing');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [pages, setPages] = useState(5);

  const projectType = projectTypes.find((t) => t.id === selectedType)!;
  const pageMultiplier = selectedType === 'landing' || selectedType === 'bot' ? 1 : Math.max(1, pages / 5);
  const basePrice = Math.round(projectType.base * pageMultiplier);
  const addonsPrice = selectedAddons.reduce((sum, id) => {
    const addon = addons.find((a) => a.id === id);
    return sum + (addon?.price ?? 0);
  }, 0);
  const total = basePrice + addonsPrice;

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const handleGetQuote = () => {
    reachGoal('calculator_submit', {
      type: selectedType,
      total,
      addons: selectedAddons.join(','),
    });
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="calculator" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/[0.02] to-transparent pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-[1.875rem] sm:text-[2.5rem] lg:text-[3rem] font-bold tracking-[-0.025em] leading-[1.15] mb-4">
            Рассчитайте <span className="gradient-text">стоимость</span>
          </h2>
          <p className="text-muted text-[1.0625rem] leading-[1.65] max-w-xl mx-auto">
            Выберите параметры и узнайте примерную стоимость вашего проекта
          </p>
        </motion.div>

        <motion.div
          className="glass rounded-2xl p-8 sm:p-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Project type */}
          <div className="mb-8">
            <label className="block text-sm font-medium mb-3">Тип проекта</label>
            <div className="grid sm:grid-cols-2 gap-3">
              {projectTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium text-left transition-all cursor-pointer ${
                    selectedType === type.id
                      ? 'bg-gradient-to-r from-primary to-secondary text-white'
                      : 'glass-light hover:bg-foreground/5'
                  }`}
                >
                  {type.label}
                  <span className="block text-xs mt-0.5 opacity-75">от {formatPrice(type.base)}₽</span>
                </button>
              ))}
            </div>
          </div>

          {/* Pages slider */}
          {selectedType !== 'landing' && selectedType !== 'bot' && (
            <div className="mb-8">
              <label className="block text-sm font-medium mb-3">
                Количество страниц: <strong className="gradient-text">{pages}</strong>
              </label>
              <input
                type="range"
                min={1}
                max={20}
                value={pages}
                onChange={(e) => setPages(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-xs text-muted mt-1">
                <span>1</span>
                <span>20</span>
              </div>
            </div>
          )}

          {/* Addons */}
          <div className="mb-8">
            <label className="block text-sm font-medium mb-3">Дополнительно</label>
            <div className="grid sm:grid-cols-2 gap-3">
              {addons.map((addon) => (
                <button
                  key={addon.id}
                  onClick={() => toggleAddon(addon.id)}
                  className={`px-4 py-3 rounded-xl text-sm text-left transition-all cursor-pointer flex items-center justify-between ${
                    selectedAddons.includes(addon.id)
                      ? 'bg-primary/10 border border-primary/30'
                      : 'glass-light hover:bg-foreground/5'
                  }`}
                >
                  <span>{addon.label}</span>
                  <span className="text-xs font-medium text-muted">
                    {addon.price === 0 ? 'Бесплатно' : `+${formatPrice(addon.price)}₽`}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="border-t border-border/30 pt-6 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-sm text-muted mb-1">Примерная стоимость</p>
              <p className="font-heading text-3xl sm:text-4xl font-bold gradient-text tabular-nums">
                {formatPrice(total)}₽
              </p>
            </div>
            <button
              onClick={handleGetQuote}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/25 transition-all cursor-pointer"
            >
              Получить точный расчёт
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
