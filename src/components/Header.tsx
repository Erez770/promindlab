'use client';

import { motion } from 'framer-motion';
import { useTheme } from './ThemeProvider';
import { NavBar } from '@/components/ui/tubelight-navbar';
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
      className="hidden md:inline-flex items-center gap-1.5 ml-1 px-5 py-2 rounded-full text-[0.8125rem] font-semibold text-white bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 cursor-pointer"
    >
      Получить расчёт
      <ArrowRight size={14} />
    </button>
  );
}

export default function Header() {
  return (
    <NavBar
      items={navItems}
      trailing={
        <>
          <HeaderCTA />
          <ThemeToggle />
        </>
      }
    />
  );
}
