'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { reachGoal } from '@/lib/metrika';

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero (600px) and hide near contact form
      const contactEl = document.querySelector('#contact');
      const contactTop = contactEl?.getBoundingClientRect().top ?? Infinity;
      setIsVisible(window.scrollY > 600 && contactTop > 200);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-30 sm:hidden"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <div className="glass border-t border-border/30 px-4 py-3">
            <button
              onClick={() => {
                reachGoal('sticky_cta_click');
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full py-3 rounded-xl font-semibold text-white text-sm bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/25 transition-all cursor-pointer"
            >
              Получить бесплатный расчёт
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
