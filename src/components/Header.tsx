'use client';

import { motion, useSpring, useScroll } from 'framer-motion';
import { useTheme } from './ThemeProvider';
import Logo from '@/components/Logo';
import {
  LayoutGrid,
  Briefcase,
  CreditCard,
  MessageSquareQuote,
  HelpCircle,
  Mail,
  Sun,
  Moon,
  ArrowRight,
  Globe,
  Check,
} from 'lucide-react';
import { reachGoal } from '@/lib/metrika';
import { useTranslations, useLocale } from 'next-intl';
import { routing } from '@/i18n/routing';
import { FloatingNav, FloatingNavItem } from '@/components/ui/floating-nav';
import { useState, useRef, useEffect } from 'react';

const localeConfig: Record<string, { label: string; flag: string; name: string }> = {
  en: { label: 'EN', flag: '🇬🇧', name: 'English' },
  ru: { label: 'RU', flag: '🇷🇺', name: 'Русский' },
  he: { label: 'עב', flag: '🇮🇱', name: 'עברית' },
  ar: { label: 'عر', flag: '🇸🇦', name: 'العربية' },
};

const SECTIONS = ['services', 'portfolio', 'calculator', 'testimonials', 'faq', 'contact'];

function useActiveSection() {
  const [active, setActive] = useState('');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: '-40% 0px -55% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return active;
}

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #6366F1 0%, #8B5CF6 50%, #06B6D4 100%)',
      }}
    />
  );
}

function LangPicker() {
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const cfg = localeConfig[locale];

  return (
    <div ref={ref} className="relative flex items-center justify-center">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex flex-col items-center justify-center w-10 h-10 rounded-xl hover:bg-foreground/8 transition-colors cursor-pointer gap-0.5"
        aria-label="Switch language"
      >
        <Globe size={16} className="text-foreground/60" />
        <span className="text-[9px] font-bold leading-none text-foreground/50 hidden sm:block">{cfg?.label}</span>
      </button>

      {open && (
        <div className="absolute top-[calc(100%+6px)] left-1/2 -translate-x-1/2 z-[300] min-w-[150px] rounded-2xl border border-border/20 bg-background/95 backdrop-blur-xl shadow-2xl shadow-black/40 overflow-hidden dropdown-appear">
          {routing.locales.map((loc) => {
            const c = localeConfig[loc];
            const isActive = loc === locale;
            return (
              <button
                key={loc}
                onClick={() => { if (!isActive) window.location.href = `/${loc}`; setOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors cursor-pointer ${isActive ? 'bg-primary/10 text-foreground' : 'text-muted hover:bg-foreground/6 hover:text-foreground'}`}
              >
                <span className="text-base leading-none">{c?.flag}</span>
                <span className="flex-1 text-[12px] font-medium">{c?.name}</span>
                {isActive && <Check size={12} className="text-primary shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const t = useTranslations('Header');

  return (
    <button
      onClick={toggleTheme}
      className="flex flex-col items-center justify-center w-10 h-10 rounded-xl hover:bg-foreground/8 transition-colors cursor-pointer gap-0.5"
      aria-label={theme === 'dark' ? t('themeLight') : t('themeDark')}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        <motion.div
          animate={{ scale: theme === 'light' ? 1 : 0, opacity: theme === 'light' ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute"
        >
          <Sun size={16} className="text-foreground/60" />
        </motion.div>
        <motion.div
          animate={{ scale: theme === 'dark' ? 1 : 0, opacity: theme === 'dark' ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute"
        >
          <Moon size={16} className="text-foreground/60" />
        </motion.div>
      </div>
      <span className="text-[9px] font-bold leading-none text-foreground/50 hidden sm:block">
        {theme === 'dark' ? 'Light' : 'Dark'}
      </span>
    </button>
  );
}

function CTAButton() {
  const t = useTranslations('Header');
  return (
    <button
      onClick={() => {
        reachGoal('header_cta_click');
        document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
      }}
      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-secondary text-white text-[12px] font-semibold shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/35 hover:scale-105 transition-all cursor-pointer"
    >
      <span className="hidden sm:block">{t('cta')}</span>
      <ArrowRight size={14} />
    </button>
  );
}

export default function Header() {
  const t = useTranslations('Header');
  const activeSection = useActiveSection();

  const navItems: FloatingNavItem[] = [
    { id: 'services',     label: t('nav.services'),     icon: <LayoutGrid size={18} />,        onClick: () => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'portfolio',    label: t('nav.portfolio'),    icon: <Briefcase size={18} />,         onClick: () => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'calculator',   label: t('nav.pricing'),      icon: <CreditCard size={18} />,        onClick: () => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'testimonials', label: t('nav.testimonials'), icon: <MessageSquareQuote size={18} />, onClick: () => document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'faq',          label: t('nav.faq'),          icon: <HelpCircle size={18} />,        onClick: () => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'contact',      label: t('nav.contacts'),     icon: <Mail size={18} />,              onClick: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) },
  ];

  return (
    <>
      <ScrollProgressBar />

      {/* Logo — top left */}
      <motion.div
        className="fixed top-4 left-6 z-50 hidden xl:flex items-center"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Logo variant="full" size="xl" />
      </motion.div>

      {/* Floating nav — top center */}
      <motion.div
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="flex items-center gap-1 px-2 py-1.5 rounded-2xl border border-border/20 bg-background/75 backdrop-blur-xl shadow-xl shadow-black/15">
          {/* Nav items with sliding indicator */}
          <FloatingNav
            items={navItems}
            activeId={activeSection}
          />

          {/* Divider */}
          <div className="w-px h-7 bg-border/30 mx-1 shrink-0" />

          {/* Utilities */}
          <LangPicker />
          <ThemeToggle />

          {/* Divider */}
          <div className="w-px h-7 bg-border/30 mx-1 shrink-0" />

          {/* CTA */}
          <CTAButton />
        </div>
      </motion.div>
    </>
  );
}
