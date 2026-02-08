'use client';

import InteractiveSelector from '@/components/ui/interactive-selector';

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-24" style={{ position: 'relative', zIndex: 10, isolation: 'isolate' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-heading text-[1.875rem] sm:text-[2.5rem] lg:text-[3rem] font-bold tracking-[-0.025em] leading-[1.15] mb-4">
            Наши <span className="gradient-text">кейсы</span>
          </h2>
          <p className="text-muted text-[1.0625rem] leading-[1.65] tracking-[-0.01em] max-w-2xl mx-auto">
            Реальные проекты, реальные результаты
          </p>
        </div>

        <InteractiveSelector />
      </div>
    </section>
  );
}
