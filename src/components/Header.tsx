'use client';

import { motion, useMotionValue, useSpring, useScroll } from 'framer-motion';
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
import { Dock, DockIcon, DockItem, DockLabel } from '@/components/ui/dock';
import { useState, useRef, useEffect } from 'react';

const localeConfig: Record<string, { label: string; flag: string; name: string }> = {
  en: { label: 'EN', flag: '🇬🇧', name: 'English' },
  ru: { label: 'RU', flag: '🇷🇺', name: 'Русский' },
  he: { label: 'עב', flag: '🇮🇱', name: 'עברית' },
  ar: { label: 'عر', flag: '🇸🇦', name: 'العربية' },
};

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

/* ── Language picker inside dock ── */
function LangDockItem() {
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isHoveredMV = useMotionValue(0);

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const cfg = localeConfig[locale];

  return (
    <div ref={ref} className="relative inline-flex items-center justify-center">
      {/* mimic DockItem sizing via fixed 40px wrapper */}
      <button
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => isHoveredMV.set(1)}
        onMouseLeave={() => isHoveredMV.set(0)}
        className="w-10 h-10 rounded-full bg-surface border border-border/40 flex flex-col items-center justify-center gap-0.5 hover:border-primary/50 transition-all cursor-pointer"
        aria-label="Switch language"
      >
        <Globe size={15} className="text-foreground/70" />
        <span className="text-[9px] font-bold leading-none text-foreground/60">{cfg?.label}</span>
      </button>

      {/* Tooltip */}
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 pointer-events-none opacity-0 group-hover:opacity-100 whitespace-nowrap rounded-lg border border-border/50 bg-surface px-2.5 py-1 text-[11px] font-medium text-foreground shadow-lg">
        {cfg?.name}
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 z-[300] min-w-[150px] rounded-2xl border border-border/20 bg-background/95 backdrop-blur-xl shadow-2xl shadow-black/40 overflow-hidden dropdown-appear">
          {routing.locales.map((loc) => {
            const c = localeConfig[loc];
            const active = loc === locale;
            return (
              <button
                key={loc}
                onClick={() => { if (!active) window.location.href = `/${loc}`; setOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors cursor-pointer ${active ? 'bg-primary/10 text-foreground' : 'text-muted hover:bg-foreground/6 hover:text-foreground'}`}
              >
                <span className="text-base leading-none">{c?.flag}</span>
                <span className="flex-1 text-[12px] font-medium">{c?.name}</span>
                {active && <Check size={12} className="text-primary shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ── Theme toggle inside dock ── */
function ThemeDockItem() {
  const { theme, toggleTheme } = useTheme();
  const t = useTranslations('Header');

  return (
    <DockItem className="aspect-square rounded-full bg-surface border border-border/40 hover:border-primary/50 transition-all">
      <DockLabel>{theme === 'dark' ? t('themeLight') : t('themeDark')}</DockLabel>
      <DockIcon>
        <button
          onClick={toggleTheme}
          className="w-full h-full flex items-center justify-center cursor-pointer"
          aria-label={theme === 'dark' ? t('themeLight') : t('themeDark')}
        >
          <div className="relative w-5 h-5 flex items-center justify-center">
            <motion.div
              animate={{ scale: theme === 'light' ? 1 : 0, opacity: theme === 'light' ? 1 : 0 }}
              transition={{ duration: 0.25 }}
              className="absolute"
            >
              <Sun size={18} className="text-foreground/80" />
            </motion.div>
            <motion.div
              animate={{ scale: theme === 'dark' ? 1 : 0, opacity: theme === 'dark' ? 1 : 0 }}
              transition={{ duration: 0.25 }}
              className="absolute"
            >
              <Moon size={18} className="text-foreground/80" />
            </motion.div>
          </div>
        </button>
      </DockIcon>
    </DockItem>
  );
}

/* ── CTA inside dock ── */
function CTADockItem() {
  const t = useTranslations('Header');
  return (
    <DockItem className="rounded-full bg-gradient-to-br from-primary to-secondary shadow-lg shadow-primary/30">
      <DockLabel>{t('cta')}</DockLabel>
      <DockIcon>
        <button
          onClick={() => {
            reachGoal('header_cta_click');
            document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="w-full h-full flex items-center justify-center cursor-pointer"
        >
          <ArrowRight size={18} className="text-white" />
        </button>
      </DockIcon>
    </DockItem>
  );
}

export default function Header() {
  const t = useTranslations('Header');

  const navItems = [
    { name: t('nav.services'),     url: '#services',     Icon: LayoutGrid },
    { name: t('nav.portfolio'),    url: '#portfolio',    Icon: Briefcase },
    { name: t('nav.pricing'),      url: '#calculator',   Icon: CreditCard },
    { name: t('nav.testimonials'), url: '#testimonials', Icon: MessageSquareQuote },
    { name: t('nav.faq'),          url: '#faq',          Icon: HelpCircle },
    { name: t('nav.contacts'),     url: '#contact',      Icon: Mail },
  ];

  return (
    <>
      <ScrollProgressBar />

      {/* Logo — top left (hidden on small screens where dock overlaps) */}
      <motion.div
        className="fixed top-4 left-6 z-50 hidden xl:flex items-center"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Logo variant="full" size="xl" />
      </motion.div>

      {/* Dock — top center */}
      <motion.div
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Dock
          magnification={68}
          panelHeight={56}
          distance={120}
          className="border border-border/20 bg-background/70 backdrop-blur-xl shadow-2xl shadow-black/20 pb-1"
        >
          {/* Nav items */}
          {navItems.map(({ name, url, Icon }) => (
            <DockItem
              key={url}
              className="aspect-square rounded-full bg-surface/80 border border-border/30 hover:border-primary/50 transition-all"
            >
              <DockLabel>{name}</DockLabel>
              <DockIcon>
                <button
                  onClick={() => document.querySelector(url)?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full h-full flex items-center justify-center cursor-pointer"
                  aria-label={name}
                >
                  <Icon className="w-full h-full text-foreground/70 p-0.5" />
                </button>
              </DockIcon>
            </DockItem>
          ))}

          {/* Divider */}
          <div className="w-px self-center h-8 bg-border/30 mx-1" />

          {/* Language */}
          <LangDockItem />

          {/* Theme */}
          <ThemeDockItem />

          {/* CTA */}
          <CTADockItem />
        </Dock>
      </motion.div>
    </>
  );
}
