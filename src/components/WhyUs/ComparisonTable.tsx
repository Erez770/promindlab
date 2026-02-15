'use client';

import { motion } from 'framer-motion';
import { X, Check, AlertTriangle, Zap } from 'lucide-react';

const selfItems = [
  '2-4 недели попыток и переделок',
  'Результат выглядит как шаблон',
  'Не знаете какой промпт написать',
  'Код работает, но непонятно почему',
  'Ошибки которые невозможно найти',
  'Сайт не оптимизирован и не индексируется',
  'Нет анимаций — только статичные блоки',
  'На мобильных всё "едет"',
  'Поддержки нет — вы один на один с проблемой',
];

const proItems = [
  'Готово за 3-7 дней',
  'Дизайн уровня $15,000',
  'Промпт-инженеры знают как правильно поставить задачу AI',
  'Чистый, масштабируемый, профессиональный код',
  'Всё работает, протестировано, задеплоено',
  'SEO, скорость, индексация с первого дня',
  'Плавные анимации и wow-эффекты',
  'Идеально на всех устройствах',
  'Поддержка 24/7 после запуска',
];

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, delay: i * 0.08 },
  }),
};

export default function ComparisonTable() {
  return (
    <div className="grid md:grid-cols-2 gap-5 sm:gap-6">
      {/* Self column */}
      <motion.div
        className="glass rounded-2xl overflow-hidden group hover:border-red-500/20 transition-all duration-500"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-surface-light/50 px-6 py-4 flex items-center gap-3 border-b border-border/50">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
            <AlertTriangle size={20} className="text-red-400" />
          </div>
          <div>
            <h3 className="font-heading text-base sm:text-lg font-semibold">Вы + ChatGPT самостоятельно</h3>
          </div>
        </div>
        <div className="p-6 space-y-3.5">
          {selfItems.map((item, i) => (
            <motion.div
              key={i}
              className="flex items-start gap-3"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
            >
              <div className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-red-500/10 flex items-center justify-center">
                <X size={12} className="text-red-400" />
              </div>
              <span className="text-foreground/60 text-sm leading-relaxed">{item}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Pro column */}
      <motion.div
        className="glass rounded-2xl overflow-hidden border-primary/20 glow group hover:border-primary/40 transition-all duration-500"
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 px-6 py-4 flex items-center gap-3 border-b border-primary/20">
          <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
            <Zap size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="font-heading text-base sm:text-lg font-semibold">Вы + ProMindLab</h3>
          </div>
        </div>
        <div className="p-6 space-y-3.5">
          {proItems.map((item, i) => (
            <motion.div
              key={i}
              className="flex items-start gap-3"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
            >
              <div className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center">
                <Check size={12} className="text-primary" />
              </div>
              <span className="text-foreground/90 text-sm leading-relaxed">{item}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
