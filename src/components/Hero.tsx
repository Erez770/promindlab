'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Zap, ShieldCheck, Headphones } from 'lucide-react';
import { WavyBackground } from '@/components/ui/wavy-background';
import { useTheme } from './ThemeProvider';
import { reachGoal } from '@/lib/metrika';

const trustBadges = [
  { Icon: Zap, text: 'Старт за 24 часа' },
  { Icon: ShieldCheck, text: 'Гарантия качества' },
  { Icon: Headphones, text: 'Поддержка 24/7' },
];

const codeLines = [
  { indent: 0, text: 'import { AI } from "promindlab";', color: 'text-[#818CF8]' },
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
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
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
        colors={['#6366F1', '#8B5CF6', '#A78BFA', '#06B6D4', '#3B82F6']}
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
              {/* Status badge */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-light mb-8"
              >
                <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-[13px] font-medium tracking-[0.01em] text-muted">Принимаем заказы — старт через 24 часа</span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                className="font-heading text-[2.5rem] sm:text-[3.25rem] lg:text-[4rem] xl:text-[4.75rem] font-extrabold leading-[1.08] tracking-[-0.03em] mb-6"
                style={{ textWrap: 'balance' } as React.CSSProperties}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                Сайт уровня топ-студии{' '}
                <span className="gradient-text">за 3–7 дней</span>
              </motion.h1>

              {/* Description with price highlight */}
              <motion.div
                className="mb-10"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
              >
                <p className="text-[1.125rem] sm:text-[1.25rem] text-muted max-w-xl leading-[1.65] tracking-[-0.01em] mb-4">
                  AI-автоматизация 80% рутины позволяет делать за дни то, что другие делают месяцами.
                </p>
                {/* Price comparison pill */}
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl glass-light border border-success/20">
                  <span className="text-muted/50 line-through text-sm tabular-nums">300 000₽</span>
                  <span className="text-[0.75rem] text-muted/40">→</span>
                  <span className="font-heading font-bold text-success text-[1rem] tabular-nums">от 25 000₽</span>
                  <span className="text-[11px] font-medium text-success/70 bg-success/10 px-2 py-0.5 rounded-full">−92%</span>
                </div>
              </motion.div>

              {/* CTA buttons */}
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
                    onClick={() => {
                      reachGoal('hero_cta_click');
                      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="btn-shimmer relative px-8 py-4 rounded-2xl text-[15px] font-semibold tracking-[0.01em] text-white bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/25 transition-shadow duration-300 cursor-pointer group"
                    whileTap={{ scale: 0.97 }}
                  >
                    <span className="relative z-10">Получить расчёт — бесплатно</span>
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
                  </motion.button>
                </div>

                {/* Secondary CTA — gradient border */}
                <button
                  onClick={() =>
                    document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' })
                  }
                  className="relative px-8 py-4 rounded-2xl text-[15px] font-semibold tracking-[0.01em] cursor-pointer group overflow-hidden"
                >
                  {/* gradient border via pseudo-overlay */}
                  <span className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-r from-primary/50 via-secondary/50 to-tertiary/50" style={{ WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }} />
                  <span className="absolute inset-[1px] rounded-[14px] bg-background group-hover:bg-foreground/5 transition-colors duration-300" />
                  <span className="relative z-10">Посмотреть портфолио</span>
                </button>
              </motion.div>

              {/* Social proof + rating */}
              <motion.div
                className="flex flex-wrap items-center gap-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.0 }}
              >
                {/* Avatars */}
                <div className="flex -space-x-2">
                  {[
                    'from-violet-500 to-blue-500',
                    'from-blue-500 to-cyan-500',
                    'from-cyan-500 to-emerald-500',
                    'from-emerald-500 to-yellow-500',
                  ].map((g, i) => (
                    <div key={i} className={`w-8 h-8 rounded-full bg-gradient-to-br ${g} border-2 border-background`} />
                  ))}
                </div>
                <span className="text-[13px] text-muted">50+ проектов запущено</span>

                {/* Divider */}
                <span className="hidden sm:block w-px h-4 bg-border/40" />

                {/* Star rating */}
                <div className="flex items-center gap-1.5">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#F59E0B">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </div>
                  <span className="text-[13px] font-semibold">4.9</span>
                  <span className="text-[12px] text-muted">средняя оценка</span>
                </div>
              </motion.div>

              {/* Trust badges — mini cards */}
              <motion.div
                className="flex flex-wrap gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.2 }}
              >
                {trustBadges.map((badge, i) => (
                  <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-xl glass-light text-[12px] font-medium text-muted">
                    <badge.Icon size={14} className="text-primary shrink-0" />
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
                  {/* Code lines */}
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

                {/* Floating badge — top right */}
                <div className="absolute -top-8 -right-6 float glass rounded-2xl px-4 py-3 shadow-xl min-w-[170px]">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                    <span className="text-[11px] font-semibold text-success uppercase tracking-wider">Deploy complete</span>
                  </div>
                  <p className="text-[13px] font-medium">Лендинг — 2 дня</p>
                  <p className="text-[11px] text-muted mt-0.5">Конверсия +38%</p>
                </div>

                {/* Floating badge — bottom left */}
                <div className="absolute -bottom-6 -left-6 float float-delay-2 glass rounded-2xl px-4 py-3 shadow-xl min-w-[155px]">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[13px]">⚡</span>
                    <span className="text-[11px] font-semibold text-warning uppercase tracking-wider">AI-ускорение</span>
                  </div>
                  <p className="text-[13px] font-medium">в 10× быстрее</p>
                  <p className="text-[11px] text-muted mt-0.5">чем обычная студия</p>
                </div>

                {/* Floating badge — bottom right (new: satisfaction) */}
                <div className="absolute -bottom-2 -right-4 float float-delay-3 glass rounded-2xl px-3 py-2.5 shadow-xl">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} width="10" height="10" viewBox="0 0 24 24" fill="#F59E0B">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </div>
                  <p className="text-[12px] font-semibold">4.9 / 5.0</p>
                  <p className="text-[10px] text-muted">50+ клиентов</p>
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
