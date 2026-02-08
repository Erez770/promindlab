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
} from 'lucide-react';

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

export default function Header() {
  return (
    <NavBar
      items={navItems}
      trailing={<ThemeToggle />}
    />
  );
}
