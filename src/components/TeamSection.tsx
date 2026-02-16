'use client';

import { motion } from 'framer-motion';
import { Send, Linkedin } from 'lucide-react';
import Image from 'next/image';

const teamMembers = [
  {
    name: 'Дмитрий Кравцов',
    role: 'Fullstack-разработчик',
    image: '/team/full stack.jpeg',
  },
  {
    name: 'Артём Белоусов',
    role: 'AI-инженер',
    image: '/team/Ai .jpeg',
  },
];

export default function TeamSection() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-[1.875rem] sm:text-[2.5rem] lg:text-[3rem] font-bold tracking-[-0.025em] leading-[1.15] mb-4">
            Люди, которые стоят{' '}
            <span className="gradient-text">за ProMindLab</span>
          </h2>
          <p className="text-muted text-[1.0625rem] leading-[1.65] tracking-[-0.01em] max-w-2xl mx-auto">
            Не анонимное агентство — реальная команда с реальным опытом
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Founder card — large */}
          <motion.div
            className="lg:col-span-1 glass rounded-2xl p-8 flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-32 h-32 rounded-2xl overflow-hidden mb-6">
              <Image
                src="/team/Director.jpeg"
                alt="Максим Тарасов"
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-heading text-xl font-bold mb-1">Максим Тарасов</h3>
            <p className="text-primary text-sm font-medium mb-4">Основатель ProMindLab</p>
            <p className="text-muted text-sm leading-relaxed mb-6">
              Опыт в разработке и AI-технологиях. Основал ProMindLab, чтобы сделать
              качественную разработку доступной для бизнеса любого масштаба.
            </p>
            <div className="flex gap-3">
              <a
                href="https://t.me/ProMindLabAdmin"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl glass-light flex items-center justify-center hover:bg-foreground/5 transition-colors"
                aria-label="Telegram"
              >
                <Send size={16} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl glass-light flex items-center justify-center hover:bg-foreground/5 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
            </div>
          </motion.div>

          {/* Team members */}
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
            {teamMembers.map((member, i) => (
              <motion.div
                key={i}
                className="glass rounded-2xl p-6 flex items-center gap-5"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * (i + 1) }}
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-heading text-base font-semibold mb-1">{member.name}</h4>
                  <p className="text-muted text-sm">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
