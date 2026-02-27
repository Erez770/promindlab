'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, GraduationCap, Bot, Palette, ShoppingCart, ExternalLink, Clock, ImageIcon } from 'lucide-react';

const projects = [
  {
    title: 'FinTech SaaS',
    category: 'SaaS платформа',
    description: 'Финтех-платформа с аналитикой портфеля, графиками и транзакциями в реальном времени. Личный кабинет, авторизация, дашборд.',
    image: '/portfolio-fintrack.png',
    icon: BarChart3,
    tags: ['React', 'Node.js', 'PostgreSQL'],
    url: '#',
    timeline: '7 дней',
    color: 'from-blue-500/20 to-cyan-500/20',
    accent: 'text-blue-400',
  },
  {
    title: 'Education Platform',
    category: 'Онлайн-школа',
    description: 'Платформа онлайн-курсов с видеоуроками, прогрессом студентов и адаптивным дизайном. Интеграция с Stripe.',
    image: '/portfolio-eduplatform.png',
    icon: GraduationCap,
    tags: ['Next.js', 'Stripe', 'AI'],
    url: '#',
    timeline: '5 дней',
    color: 'from-emerald-500/20 to-teal-500/20',
    accent: 'text-emerald-400',
  },
  {
    title: 'Telegram / WhatsApp Bot',
    category: 'Чат-бот',
    description: 'AI-платформа для автоматизации чатов в Telegram и WhatsApp с визуальным конструктором сценариев.',
    image: '/portfolio-shopbot.png',
    icon: Bot,
    tags: ['Node.js', 'Telegram API', 'WhatsApp API'],
    url: '#',
    timeline: '3 дня',
    color: 'from-violet-500/20 to-purple-500/20',
    accent: 'text-violet-400',
  },
  {
    title: 'Luxury Landing',
    category: 'Премиум лендинг',
    description: 'Премиальный лендинг для консалтингового агентства с 3D-элементами, анимациями и высокой конверсией.',
    image: '/portfolio-landing.png',
    icon: Palette,
    tags: ['Next.js', 'Framer Motion', '3D'],
    url: '#',
    timeline: '3 дня',
    color: 'from-pink-500/20 to-rose-500/20',
    accent: 'text-pink-400',
  },
  {
    title: 'E-Commerce',
    category: 'Интернет-магазин',
    description: 'Премиальный магазин с каталогом, фильтрами, корзиной, оплатой через ЮKassa и интеграцией с доставкой.',
    image: '/portfolio-ecommerce.png',
    icon: ShoppingCart,
    tags: ['React', 'ЮKassa', 'CRM'],
    url: '#',
    timeline: '5 дней',
    color: 'from-amber-500/20 to-orange-500/20',
    accent: 'text-amber-400',
  },
];

function ProjectPreview({ project }: { project: typeof projects[0] }) {
  const [iframeError, setIframeError] = useState(false);
  const [iframeLoading, setIframeLoading] = useState(true);

  const hasLiveUrl = project.url !== '#';
  const showIframe = hasLiveUrl && !iframeError;
  const displayUrl = hasLiveUrl
    ? project.url
    : `https://${project.title.toLowerCase().replace(/[\s/]/g, '')}.ru`;

  return (
    <div className="glass rounded-2xl overflow-hidden">
      {/* Browser top bar */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border/20 bg-surface/50">
        <div className="flex gap-1.5 shrink-0">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <div className="flex-1 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface/80 border border-border/20 max-w-sm">
          <div className="w-2.5 h-2.5 rounded-full bg-success/60 shrink-0" />
          <span className="text-[12px] text-muted font-mono truncate">{displayUrl}</span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          {/* Live / Screenshot toggle indicator */}
          {hasLiveUrl && !iframeError ? (
            <span className="text-[11px] font-medium text-success flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              Live
            </span>
          ) : (
            <span className="text-[11px] font-medium text-muted flex items-center gap-1">
              <ImageIcon size={11} />
              Превью
            </span>
          )}
          {hasLiveUrl && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg glass-light hover:bg-foreground/5 transition-colors"
            >
              <ExternalLink size={13} className="text-muted" />
            </a>
          )}
        </div>
      </div>

      {/* Content area — responsive height, scrollable */}
      <div className="relative w-full h-[260px] sm:h-[380px] lg:h-[520px] overflow-hidden bg-surface/30">
        {showIframe ? (
          <>
            {iframeLoading && (
              <div className="absolute inset-0 flex items-center justify-center z-10 bg-surface/80">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                  <span className="text-sm text-muted">Загружаем сайт...</span>
                </div>
              </div>
            )}
            <iframe
              key={project.url}
              src={project.url}
              className="w-full h-full border-0"
              title={project.title}
              loading="lazy"
              onLoad={() => setIframeLoading(false)}
              onError={() => { setIframeError(true); setIframeLoading(false); }}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          </>
        ) : (
          /* Fallback: scrollable screenshot simulation */
          <div className="w-full h-full overflow-y-auto overflow-x-hidden scrollbar-thin">
            <Image
              src={project.image}
              alt={project.title}
              width={1200}
              height={900}
              className="w-full h-auto"
              sizes="(max-width: 768px) 100vw, 70vw"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default function InteractiveSelector() {
  const [active, setActive] = useState(0);
  const project = projects[active];
  const Icon = project.icon;

  return (
    <div className="flex flex-col lg:flex-row gap-6">

      {/* Mobile — horizontal compact tabs with icon + title */}
      <div className="flex lg:hidden gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-thin">
        {projects.map((p, i) => {
          const TabIcon = p.icon;
          const isActive = i === active;
          return (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`flex flex-col items-center gap-1.5 px-3 py-2.5 rounded-xl text-center transition-all duration-300 cursor-pointer shrink-0 min-w-[76px] border
                ${isActive
                  ? 'glass border-primary/30 bg-primary/5'
                  : 'glass-light border-transparent'
                }
              `}
            >
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${p.color} flex items-center justify-center`}>
                <TabIcon size={15} className={isActive ? p.accent : 'text-muted'} />
              </div>
              <span className={`text-[10px] font-medium leading-tight ${isActive ? 'text-foreground' : 'text-muted'}`}>
                {p.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Desktop — vertical tab list */}
      <div className="hidden lg:flex flex-col gap-2 w-64 shrink-0">
        {projects.map((p, i) => {
          const TabIcon = p.icon;
          const isActive = i === active;
          return (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`
                group flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 cursor-pointer shrink-0 w-full
                ${isActive
                  ? 'glass border-primary/30 bg-primary/5'
                  : 'glass-light hover:bg-foreground/5 border-transparent'
                }
              `}
            >
              <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${p.color} flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110`}>
                <TabIcon size={18} className={isActive ? p.accent : 'text-muted'} />
              </div>
              <div className="min-w-0">
                <p className={`text-sm font-semibold leading-tight truncate ${isActive ? 'text-foreground' : 'text-muted'}`}>
                  {p.title}
                </p>
                <p className="text-[11px] text-muted mt-0.5 truncate">{p.category}</p>
              </div>
              {isActive && (
                <motion.div
                  layoutId="tab-indicator"
                  className="ml-auto w-1 h-8 rounded-full bg-primary shrink-0"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Right — preview */}
      <div className="flex-1 min-w-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-4"
          >
            <ProjectPreview project={project} />

            {/* Mobile pagination dots */}
            <div className="flex lg:hidden justify-center gap-2" role="tablist" aria-label="Выбор проекта">
              {projects.map((p, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === active}
                  aria-label={p.title}
                  onClick={() => setActive(i)}
                  className={`rounded-full transition-all duration-300 cursor-pointer ${
                    i === active ? 'w-5 h-2 bg-primary' : 'w-2 h-2 bg-muted/30'
                  }`}
                />
              ))}
            </div>

            {/* Meta info */}
            <div className="flex flex-wrap items-start justify-between gap-4 px-1">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <Icon size={16} className={project.accent} />
                  <h3 className="font-heading text-lg font-bold">{project.title}</h3>
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded-full glass-light text-muted">
                    {project.category}
                  </span>
                </div>
                <p className="text-sm text-muted leading-relaxed max-w-lg">{project.description}</p>
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0">
                <div className="flex items-center gap-1.5 text-[12px] text-muted glass-light px-2.5 py-1.5 rounded-lg">
                  <Clock size={12} />
                  <span className="font-medium">{project.timeline}</span>
                </div>
                <div className="flex flex-wrap gap-1.5 justify-end">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded-lg glass-light text-[11px] font-medium text-muted">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
