'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { FileText, Globe, Rocket, MessageSquare, ShoppingCart, Smartphone, Palette, Wrench, type LucideIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

const services: { Icon: LucideIcon; tier: 'featured' | 'popular' | 'standard' | 'minor' }[] = [
  { Icon: FileText, tier: 'popular' },
  { Icon: Globe, tier: 'popular' },
  { Icon: Rocket, tier: 'featured' },
  { Icon: MessageSquare, tier: 'standard' },
  { Icon: ShoppingCart, tier: 'standard' },
  { Icon: Smartphone, tier: 'standard' },
  { Icon: Palette, tier: 'standard' },
  { Icon: Wrench, tier: 'minor' },
];

const tierConfig = {
  featured: {
    badge: { label: 'Топ выбор', className: 'bg-gradient-to-r from-primary to-tertiary text-white' },
    cardClass: 'border-primary/25 bg-gradient-to-b from-primary/5 to-transparent',
    iconClass: 'from-primary/25 to-tertiary/20',
    iconSize: 28,
    titleClass: 'text-[1.1875rem]',
    btnClass: 'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg hover:shadow-primary/20 btn-shimmer',
  },
  popular: {
    badge: { label: 'Популярно', className: 'bg-secondary/15 text-secondary border border-secondary/25' },
    cardClass: 'border-secondary/15',
    iconClass: 'from-secondary/20 to-primary/15',
    iconSize: 24,
    titleClass: 'text-[1.125rem]',
    btnClass: 'glass-light hover:bg-foreground/5',
  },
  standard: {
    badge: null,
    cardClass: '',
    iconClass: 'from-primary/15 to-secondary/15',
    iconSize: 22,
    titleClass: 'text-[1.0625rem]',
    btnClass: 'glass-light hover:bg-foreground/5',
  },
  minor: {
    badge: null,
    cardClass: 'opacity-80 hover:opacity-100',
    iconClass: 'from-muted/10 to-muted/5',
    iconSize: 20,
    titleClass: 'text-[1rem]',
    btnClass: 'glass-light hover:bg-foreground/5',
  },
};

type MergedService = {
  Icon: LucideIcon;
  tier: 'featured' | 'popular' | 'standard' | 'minor';
  title: string;
  desc: string;
  features: string[];
  price: string;
  time: string;
};

function ServiceCard({ service, index, t }: { service: MergedService; index: number; t: ReturnType<typeof useTranslations<'Services'>> }) {
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

  const cfg = tierConfig[service.tier];
  const badgeLabel = service.tier === 'featured' ? t('badges.featured') : service.tier === 'popular' ? t('badges.popular') : null;
  const btnLabel = service.tier === 'featured' ? t('btns.discuss') : t('btns.order');

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
      <div className={`relative glass rounded-2xl p-6 h-full flex flex-col overflow-hidden group-hover:border-primary/30 transition-all duration-500 ${cfg.cardClass}`}>
        {cfg.badge && badgeLabel && (
          <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${cfg.badge.className}`}>
            {badgeLabel}
          </div>
        )}

        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cfg.iconClass} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
          <service.Icon size={cfg.iconSize} className="text-primary" />
        </div>
        <h3 className={`font-heading ${cfg.titleClass} font-semibold tracking-[-0.02em] leading-[1.3] mb-2`}>{service.title}</h3>
        <p className="text-[0.875rem] leading-[1.55] text-muted mb-4">{service.desc}</p>

        <ul className="space-y-2 mb-6 flex-1">
          {service.features.map((f, j) => (
            <li key={j} className="flex items-start gap-2 text-sm text-muted">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-primary mt-0.5 shrink-0">
                <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {f}
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between mb-4 pt-4 border-t border-border/30">
          <div>
            <p className="font-heading text-[1.0625rem] font-bold gradient-text tabular-nums">{service.price}</p>
            <p className="text-[0.75rem] font-medium text-muted">{t('timeline')} {service.time}</p>
          </div>
        </div>

        <button
          onClick={() =>
            document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
          }
          className={`w-full py-2.5 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer ${cfg.btnClass}`}
        >
          {btnLabel}
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
  const t = useTranslations('Services');
  const serviceTranslations = t.raw('services') as Array<{title: string; desc: string; features: string[]; price: string; time: string}>;
  const mergedServices: MergedService[] = services.map((s, i) => ({ ...s, ...serviceTranslations[i] }));

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      {/* Dot grid texture */}
      <div className="absolute inset-0 dot-grid opacity-60 pointer-events-none" />
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/4 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[120px]" />
        <div className="absolute -bottom-40 right-1/4 w-[400px] h-[400px] bg-tertiary/6 rounded-full blur-[100px]" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-[1.875rem] sm:text-[2.5rem] lg:text-[3rem] font-bold tracking-[-0.025em] leading-[1.15] mb-4">
            {t('headline')} <span className="gradient-text">{t('headlineAccent')}</span>
          </h2>
          <p className="text-muted text-[1.0625rem] leading-[1.65] tracking-[-0.01em] max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mergedServices.map((s, i) => (
            <ServiceCard key={i} service={s} index={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
