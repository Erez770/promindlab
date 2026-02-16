'use client';

import { motion } from 'framer-motion';
import { Atom, Triangle, Code2, Server, Palette, Brain, Sparkles, Send, Zap, Flame, CreditCard, Wallet, FileCode2, Database, Container, Globe, type LucideIcon } from 'lucide-react';

const techs: { name: string; Icon: LucideIcon; color: string }[] = [
  { name: 'React', Icon: Atom, color: 'from-cyan-500/20 to-blue-500/20' },
  { name: 'Next.js', Icon: Triangle, color: 'from-white/10 to-gray-500/10' },
  { name: 'Python', Icon: Code2, color: 'from-yellow-500/20 to-green-500/20' },
  { name: 'Node.js', Icon: Server, color: 'from-green-500/20 to-emerald-500/20' },
  { name: 'Tailwind CSS', Icon: Palette, color: 'from-cyan-500/20 to-teal-500/20' },
  { name: 'Claude AI', Icon: Brain, color: 'from-orange-500/20 to-amber-500/20' },
  { name: 'GPT-4', Icon: Sparkles, color: 'from-emerald-500/20 to-green-500/20' },
  { name: 'Telegram API', Icon: Send, color: 'from-blue-500/20 to-sky-500/20' },
  { name: 'Supabase', Icon: Zap, color: 'from-green-500/20 to-emerald-500/20' },
  { name: 'Firebase', Icon: Flame, color: 'from-amber-500/20 to-orange-500/20' },
  { name: 'Stripe', Icon: CreditCard, color: 'from-purple-500/20 to-indigo-500/20' },
  { name: 'ЮKassa', Icon: Wallet, color: 'from-blue-500/20 to-indigo-500/20' },
  { name: 'TypeScript', Icon: FileCode2, color: 'from-blue-500/20 to-blue-700/20' },
  { name: 'PostgreSQL', Icon: Database, color: 'from-blue-500/20 to-indigo-500/20' },
  { name: 'Docker', Icon: Container, color: 'from-blue-400/20 to-cyan-500/20' },
  { name: 'Vercel', Icon: Globe, color: 'from-white/10 to-gray-400/10' },
];

export default function Technologies() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-[1.875rem] sm:text-[2.5rem] lg:text-[3rem] font-bold tracking-[-0.025em] leading-[1.15] mb-4">
            Современные <span className="gradient-text">технологии</span>
          </h2>
          <p className="text-muted text-[1.0625rem] leading-[1.65] tracking-[-0.01em] max-w-2xl mx-auto">
            Используем лучший стек для каждого проекта
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {techs.map((tech, i) => (
            <motion.div
              key={i}
              className={`float ${
                i % 4 === 0
                  ? ''
                  : i % 4 === 1
                  ? 'float-delay-1'
                  : i % 4 === 2
                  ? 'float-delay-2'
                  : 'float-delay-3'
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <div
                className={`glass rounded-2xl p-4 text-center hover:scale-110 transition-transform duration-300 cursor-default group`}
              >
                <div
                  className={`w-12 h-12 mx-auto rounded-xl bg-gradient-to-br ${tech.color} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}
                >
                  <tech.Icon size={22} className="text-foreground/70" />
                </div>
                <p className="text-[0.75rem] font-medium tracking-[0.01em] text-muted group-hover:text-foreground transition-colors">
                  {tech.name}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
