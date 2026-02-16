'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { BarChart3, GraduationCap, Bot, Palette, ShoppingCart, ExternalLink } from 'lucide-react';

const projects = [
  {
    title: "FinTech",
    category: "SaaS платформа",
    description: "Финтех-платформа с аналитикой портфеля, графиками и транзакциями в реальном времени",
    image: "/portfolio-fintrack.png",
    icon: BarChart3,
    tags: ["React", "Node.js", "PostgreSQL"],
    url: "#", // TODO: Заменить на реальную ссылку
    timeline: "7 дней",
  },
  {
    title: "Education Platform",
    category: "Онлайн-школа",
    description: "Платформа онлайн-курсов с видеоуроками, прогрессом и адаптивным дизайном",
    image: "/portfolio-eduplatform.png",
    icon: GraduationCap,
    tags: ["Next.js", "Stripe", "AI"],
    url: "#", // TODO: Заменить на реальную ссылку
    timeline: "5 дней",
  },
  {
    title: "Telegram / WhatsApp Bot",
    category: "Telegram/WhatsApp бот",
    description: "AI-платформа для автоматизации чатов в Telegram и WhatsApp с визуальным конструктором",
    image: "/portfolio-shopbot.png",
    icon: Bot,
    tags: ["Node.js", "Telegram API", "WhatsApp API"],
    url: "#", // TODO: Заменить на реальную ссылку
    timeline: "3 дня",
  },
  {
    title: "Luxury Landing Page",
    category: "Премиум лендинг",
    description: "Премиальный лендинг для консалтингового агентства с 3D-элементами и анимациями",
    image: "/portfolio-landing.png",
    icon: Palette,
    tags: ["Next.js", "Framer Motion", "3D"],
    url: "#", // TODO: Заменить на реальную ссылку
    timeline: "3 дня",
  },
  {
    title: "E-Commerce",
    category: "Интернет-магазин",
    description: "Премиальный магазин одежды с каталогом, фильтрами и мобильной версией",
    image: "/portfolio-ecommerce.png",
    icon: ShoppingCart,
    tags: ["React", "ЮKassa", "CRM"],
    url: "#", // TODO: Заменить на реальную ссылку
    timeline: "5 дней",
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = project.icon;

  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl cursor-pointer aspect-[4/3]"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <Image
        src={project.image}
        alt={project.title}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />

      {/* Always-visible gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />

      {/* Hover overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px] transition-opacity duration-500"
        style={{ opacity: isHovered ? 1 : 0 }}
      />

      {/* Category badge - always visible */}
      <div className="absolute top-4 left-4 z-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-xs font-medium text-white">
          <Icon size={14} />
          {project.category}
        </span>
      </div>

      {/* Bottom info - always visible */}
      <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
        <h3 className="font-heading text-lg sm:text-xl font-bold text-white mb-1">
          {project.title}
        </h3>

        {/* Description - shows on hover */}
        <div
          className="transition-all duration-500 overflow-hidden"
          style={{
            maxHeight: isHovered ? '80px' : '0px',
            opacity: isHovered ? 1 : 0,
          }}
        >
          <p className="text-white/80 text-sm mb-3">{project.description}</p>
          <div className="flex items-center gap-3 mb-3">
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md bg-white/10 text-xs text-white/90 font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
            <span className="text-xs text-white/50 shrink-0">
              {project.timeline}
            </span>
          </div>
          {project.url !== '#' && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={12} />
              Открыть сайт
            </a>
          )}
        </div>
      </div>

      {/* View icon on hover */}
      <div
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          transform: isHovered ? 'scale(1)' : 'scale(0.5)',
        }}
      >
        <ExternalLink size={18} className="text-white" />
      </div>
    </motion.div>
  );
}

export default function InteractiveSelector() {
  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Row 1: 2 cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        <ProjectCard project={projects[0]} index={0} />
        <ProjectCard project={projects[1]} index={1} />
      </div>
      {/* Row 2: 3 cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        <ProjectCard project={projects[2]} index={2} />
        <ProjectCard project={projects[3]} index={3} />
        <ProjectCard project={projects[4]} index={4} />
      </div>
    </div>
  );
}
