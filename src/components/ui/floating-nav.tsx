'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export type FloatingNavItem = {
  id: string;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
};

type FloatingNavProps = {
  items: FloatingNavItem[];
  activeId?: string;
  className?: string;
};

export function FloatingNav({ items, activeId, className = '' }: FloatingNavProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });

  const activeIndex = items.findIndex((item) => item.id === activeId);

  useEffect(() => {
    const updateIndicator = () => {
      const btn = btnRefs.current[activeIndex];
      const container = containerRef.current;
      if (!btn || !container || activeIndex < 0) return;
      const btnRect = btn.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      setIndicatorStyle({
        width: btnRect.width,
        left: btnRect.left - containerRect.left,
      });
    };

    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [activeIndex]);

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center ${className}`}
    >
      {items.map((item, index) => (
        <button
          key={item.id}
          ref={(el) => { btnRefs.current[index] = el; }}
          onClick={item.onClick}
          className="relative flex flex-col items-center justify-center px-3 py-2 text-sm font-medium text-foreground/60 hover:text-foreground transition-colors cursor-pointer z-10"
        >
          <div className="z-10">{item.icon}</div>
          <span className="text-[10px] mt-0.5 hidden sm:block leading-none font-medium">{item.label}</span>
        </button>
      ))}

      {/* Sliding indicator */}
      {activeIndex >= 0 && (
        <motion.div
          animate={indicatorStyle}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="absolute top-1 bottom-1 rounded-xl bg-primary/10 dark:bg-primary/15 pointer-events-none"
        />
      )}
    </div>
  );
}
