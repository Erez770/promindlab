'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { reachGoal } from '@/lib/metrika';

export default function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem('exit_popup_dismissed');
    if (dismissed) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setIsOpen(true);
        reachGoal('exit_intent_shown');
        document.removeEventListener('mouseout', handleMouseLeave);
      }
    };

    // Delay adding the listener so it doesn't fire immediately
    const timeout = setTimeout(() => {
      document.addEventListener('mouseout', handleMouseLeave);
    }, 5000);

    return () => {
      clearTimeout(timeout);
      document.removeEventListener('mouseout', handleMouseLeave);
    };
  }, []);

  const close = () => {
    setIsOpen(false);
    sessionStorage.setItem('exit_popup_dismissed', '1');
  };

  const handleCTA = () => {
    reachGoal('exit_intent_click');
    close();
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={close} />

          {/* Modal */}
          <motion.div
            className="relative glass rounded-2xl p-8 sm:p-10 max-w-md w-full text-center"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <button
              onClick={close}
              className="absolute top-4 right-4 w-8 h-8 rounded-full glass-light flex items-center justify-center text-muted hover:text-foreground transition-colors cursor-pointer"
              aria-label="Закрыть"
            >
              &times;
            </button>

            <div className="text-5xl mb-4">🎁</div>
            <h3 className="font-heading text-xl sm:text-2xl font-bold tracking-[-0.02em] mb-3">
              Подождите! У нас есть <span className="gradient-text">подарок</span>
            </h3>
            <p className="text-sm text-muted mb-6 leading-relaxed">
              Оставьте заявку сейчас и получите бесплатный аудит вашего текущего сайта + скидку 10% на первый проект
            </p>

            <button
              onClick={handleCTA}
              className="w-full py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/25 transition-all cursor-pointer mb-3"
            >
              Получить подарок
            </button>
            <button
              onClick={close}
              className="text-xs text-muted hover:text-foreground transition-colors cursor-pointer"
            >
              Нет, спасибо
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
