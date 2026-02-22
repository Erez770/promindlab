'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import { useTheme } from './ThemeProvider';
import { NavBar } from '@/components/ui/tubelight-navbar';
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
} from 'lucide-react';
import { reachGoal } from '@/lib/metrika';

const navItems = [
  { name: 'Услуги', url: '#services', icon: LayoutGrid },
  { name: 'Портфолио', url: '#portfolio', icon: Briefcase },
  { name: 'Цены', url: '#pricing', icon: CreditCard },
  { name: 'Отзывы', url: '#testimonials', icon: MessageSquareQuote },
  { name: 'FAQ', url: '#faq', icon: HelpCircle },
  { name: 'Контакты', url: '#contact', icon: Mail },
];

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

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-9 h-9 rounded-full flex items-center justify-center hover:bg-primary/10 transition-all duration-300 cursor-pointer ml-1"
      aria-label={theme === 'dark' ? 'Светлая тема' : 'Тёмная тема'}
    >
      <motion.div
        initial={false}
        animate={{
          scale: theme === 'light' ? 1 : 0,
          rotate: theme === 'light' ? 0 : -90,
          opacity: theme === 'light' ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        <Sun size={16} strokeWidth={2.5} className="text-foreground/80" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{
          scale: theme === 'dark' ? 1 : 0,
          rotate: theme === 'dark' ? 0 : 90,
          opacity: theme === 'dark' ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        <Moon size={16} strokeWidth={2.5} className="text-foreground/80" />
      </motion.div>
    </button>
  );
}

function HeaderCTA() {
  return (
    <button
      onClick={() => {
        reachGoal('header_cta_click');
        document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
      }}
      className="btn-shimmer hidden md:inline-flex items-center gap-1.5 ml-1 px-5 py-2 rounded-full text-[0.8125rem] font-semibold text-white bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 cursor-pointer"
    >
      Получить расчёт
      <ArrowRight size={14} />
    </button>
  );
}

export default function Header() {
  return (
    <>
      <ScrollProgressBar />

      {/* Fixed logo — top left, desktop only */}
      <motion.div
        className="fixed top-4 left-6 z-50 hidden lg:flex items-center"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Logo variant="full" size="xl" />
      </motion.div>

      <NavBar
        items={navItems}
        trailing={
          <>
            <HeaderCTA />
            <ThemeToggle />
          </>
        }
      />
    </>
  );
}
