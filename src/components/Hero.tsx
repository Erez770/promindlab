'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { WavyBackground } from '@/components/ui/wavy-background';
import { useTheme } from './ThemeProvider';

const trustBadges = [
  { icon: '⚡', text: 'Первый проект за 7 дней' },
  { icon: '🛡️', text: 'Гарантия качества' },
  { icon: '📞', text: 'Поддержка 24/7' },
];

const codeLines = [
  { indent: 0, text: 'import { AI } from "promindlab";', color: 'text-[#60A5FA]' },
  { indent: 0, text: '', color: '' },
  { indent: 0, text: 'const project = await AI.create({', color: 'text-[#ededed]' },
  { indent: 1, text: 'type: "saas-platform",', color: 'text-[#10B981]' },
  { indent: 1, text: 'design: "premium",', color: 'text-[#10B981]' },
  { indent: 1, text: 'deadline: "7 days",', color: 'text-[#F59E0B]' },
  { indent: 1, text: 'budget: "affordable",', color: 'text-[#F59E0B]' },
  { indent: 0, text: '});', color: 'text-[#ededed]' },
  { indent: 0, text: '', color: '' },
  { indent: 0, text: '// Результат: wow-эффект ✨', color: 'text-[#6b7280]' },
  { indent: 0, text: 'await project.deploy();', color: 'text-[#A78BFA]' },
];

export default function Hero() {
  const { theme } = useTheme();
  const btnRef = useRef<HTMLButtonElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 });
  const moveX = useTransform(springX, [-100, 100], [-8, 8]);
  const moveY = useTransform(springY, [-100, 100], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section id="hero" className="relative overflow-hidden">
      <WavyBackground
        containerClassName="min-h-screen"
        className="w-full"
        colors={['#3B82F6', '#8B5CF6', '#A78BFA', '#6366F1', '#22D3EE']}
        waveWidth={50}
        backgroundFill={theme === 'dark' ? '#0a0a0f' : '#f8fafc'}
        blur={12}
        speed="slow"
        waveOpacity={theme === 'dark' ? 0.4 : 0.3}
      >
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-light mb-8"
              >
                <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-[13px] font-medium tracking-[0.01em] text-muted">AI-powered разработка нового поколения</span>
              </motion.div>

              <motion.h1
                className="font-heading text-[2.5rem] sm:text-[3.25rem] lg:text-[4rem] xl:text-[4.75rem] font-extrabold leading-[1.08] tracking-[-0.03em] mb-6"
                style={{ textWrap: 'balance' }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                Создаём сайты и SaaS на AI{' '}
                <span className="gradient-text">за 3-7 дней</span>
              </motion.h1>

              <motion.p
                className="text-[1.125rem] sm:text-[1.25rem] text-muted max-w-xl mb-10 leading-[1.65] tracking-[-0.01em]"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
              >
                Качество премиум-разработки за 1/10 цены. Используем Claude, GPT-4 и лучшие
                AI-инструменты для создания проектов мирового уровня.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.8 }}
              >
                <div onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
                  <motion.button
                    ref={btnRef}
                    style={{ x: moveX, y: moveY }}
                    onClick={() =>
                      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
                    }
                    className="relative px-8 py-4 rounded-2xl text-[15px] font-semibold tracking-[0.01em] text-white bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/25 transition-shadow duration-300 cursor-pointer group"
                    whileTap={{ scale: 0.97 }}
                  >
                    <span className="relative z-10">Получить расчёт</span>
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
                  </motion.button>
                </div>
                <button
                  onClick={() =>
                    document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' })
                  }
                  className="px-8 py-4 rounded-2xl text-[15px] font-semibold tracking-[0.01em] glass-light hover:bg-foreground/5 transition-colors duration-300 cursor-pointer"
                >
                  Посмотреть портфолио
                </button>
              </motion.div>

              <motion.div
                className="flex flex-wrap gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.0 }}
              >
                {trustBadges.map((badge, i) => (
                  <div key={i} className="flex items-center gap-2 text-[13px] font-medium text-muted">
                    <span className="text-lg">{badge.icon}</span>
                    <span>{badge.text}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right Column - Code Mockup */}
            <motion.div
              className="hidden lg:block"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="relative">
                <div className="rounded-2xl p-6 glow bg-[rgba(17,17,24,0.85)] backdrop-blur-xl border border-white/10">
                  {/* Window controls */}
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    <span className="ml-4 text-xs text-[#6b7280] font-mono">project.ts</span>
                  </div>
                  {/* Code lines — always dark */}
                  <div className="font-mono text-sm space-y-1 text-[#ededed]">
                    {codeLines.map((line, i) => (
                      <motion.div
                        key={i}
                        className={`${line.color}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.0 + i * 0.1, duration: 0.4 }}
                        style={{ paddingLeft: `${line.indent * 24}px` }}
                      >
                        {line.text || '\u00A0'}
                      </motion.div>
                    ))}
                    <motion.span
                      className="inline-block w-2.5 h-5 bg-primary"
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
                    />
                  </div>
                </div>
                {/* Floating elements */}
                <div className="absolute -top-6 -right-6 float glass rounded-xl px-4 py-2 text-sm">
                  <span className="text-success">+</span> Deploy complete
                </div>
                <div className="absolute -bottom-4 -left-4 float float-delay-2 glass rounded-xl px-4 py-2 text-sm">
                  <span className="text-warning">AI</span> в 10x быстрее
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-muted/30 flex items-start justify-center p-1.5">
            <div className="w-1.5 h-3 rounded-full bg-muted/50" />
          </div>
        </motion.div>
      </WavyBackground>
    </section>
  );
}
