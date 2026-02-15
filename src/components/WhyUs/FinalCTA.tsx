'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { reachGoal } from '@/lib/metrika';

export default function FinalCTA() {
  const scrollToContact = () => {
    reachGoal('whyus_cta_click');
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[#0a0a18]" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-secondary/8" />

      <div className="relative grid md:grid-cols-2 gap-0 border border-white/[0.06] rounded-2xl">
        {/* Left — Try yourself */}
        <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
          <h3 className="font-heading text-xl sm:text-2xl font-bold mb-4 text-white/60">
            Попробуйте сами
          </h3>
          <p className="text-white/35 text-sm leading-relaxed mb-6">
            Нет ничего плохого в экспериментах. Потратьте 2-3 недели, попробуйте ChatGPT. Если устанете — мы
            будем здесь.
          </p>
          <div>
            <button
              onClick={() => {
                reachGoal('whyus_try_self_click');
                window.open('https://chat.openai.com', '_blank');
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-sm font-medium text-white/40 hover:text-white/60 hover:border-white/20 transition-all duration-300 cursor-pointer"
            >
              Попробую сам
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="flex flex-col items-center gap-3">
            <div className="w-px h-12 bg-gradient-to-b from-transparent to-white/10" />
            <span className="text-xs text-white/40 font-medium bg-[#0a0a18] px-3 py-1 rounded-full border border-white/10">
              или
            </span>
            <div className="w-px h-12 bg-gradient-to-b from-white/10 to-transparent" />
          </div>
        </div>

        {/* Mobile divider */}
        <div className="md:hidden flex items-center gap-4 px-8">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-xs text-white/40 font-medium">или</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Right — Work with us */}
        <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
          <h3 className="font-heading text-xl sm:text-2xl font-bold mb-4">
            <span className="gradient-text">Доверьте профессионалам</span>
          </h3>
          <p className="text-white/60 text-sm leading-relaxed mb-6">
            Пока вы читаете это — мы уже могли бы сделать половину вашего сайта. Старт через 24 часа.
          </p>
          <div>
            <button
              onClick={scrollToContact}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-sm font-semibold text-white hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 cursor-pointer group"
            >
              <Sparkles size={16} />
              Начать проект
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
