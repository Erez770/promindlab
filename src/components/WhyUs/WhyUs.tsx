'use client';

import { motion } from 'framer-motion';
import ComparisonTable from './ComparisonTable';
import TeamCards from './TeamCards';
import BigStat from './BigStat';
import ProcessTimeline from './ProcessTimeline';
import FinalCTA from './FinalCTA';

export default function WhyUs() {
  return (
    <section id="why-us" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 grid-lines opacity-50 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.015] to-transparent pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-[1.875rem] sm:text-[2.5rem] lg:text-[3rem] font-bold tracking-[-0.025em] leading-[1.15] mb-4">
            Почему <span className="gradient-text">профессионалы</span> лучше,
            <br className="hidden sm:block" />
            чем <span className="text-muted">ChatGPT сам по себе</span>
          </h2>
          <p className="text-muted text-[1.0625rem] leading-[1.65] tracking-[-0.01em] max-w-2xl mx-auto">
            Вы можете попробовать сделать сайт через AI самостоятельно. Мы знаем, чем это обычно заканчивается.
          </p>
        </motion.div>

        {/* Block 1: Comparison Table */}
        <div className="mb-20">
          <ComparisonTable />
        </div>

        {/* Block 2: Team Cards */}
        <div className="mb-20">
          <TeamCards />
        </div>

        {/* Block 3: Big Stat */}
        <div className="mb-20">
          <BigStat />
        </div>

        {/* Block 4: Process Timeline */}
        <div className="mb-20">
          <ProcessTimeline />
        </div>

        {/* Block 5: Final CTA */}
        <FinalCTA />
      </div>
    </section>

  );
}
