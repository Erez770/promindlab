'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-50 p-4"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <div className="max-w-4xl mx-auto glass rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted text-center sm:text-left">
              Мы используем cookie для улучшения работы сайта.{' '}
              <button className="text-primary hover:underline cursor-pointer">
                Подробнее
              </button>
            </p>
            <div className="flex gap-3 shrink-0">
              <button
                onClick={accept}
                className="px-5 py-2 rounded-xl text-sm font-medium bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 transition-opacity cursor-pointer"
              >
                Принять
              </button>
              <button
                onClick={accept}
                className="px-5 py-2 rounded-xl text-sm font-medium glass-light hover:bg-foreground/5 transition-colors cursor-pointer"
              >
                Отклонить
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
