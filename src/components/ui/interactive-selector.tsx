'use client';

import React, { useState } from 'react';
import { BarChart3, GraduationCap, Bot, Palette, ShoppingCart } from 'lucide-react';

const options = [
  {
    title: "FinTrack SaaS",
    description: "Платформа для учёта финансов и аналитики",
    image: "/portfolio-fintrack.png",
    icon: <BarChart3 size={24} color="white" />,
  },
  {
    title: "EduPlatform",
    description: "Онлайн-школа с курсами и вебинарами",
    image: "/portfolio-eduplatform.webp",
    icon: <GraduationCap size={24} color="white" />,
  },
  {
    title: "ShopBot",
    description: "Telegram-бот для автоматизации продаж",
    image: "/portfolio-shopbot.webp",
    icon: <Bot size={24} color="white" />,
  },
  {
    title: "LuxeDesign Studio",
    description: "Премиум-лендинг с 3D-анимациями",
    image: "/portfolio-landing.webp",
    icon: <Palette size={24} color="white" />,
  },
  {
    title: "E-Commerce",
    description: "Интернет-магазин с ЮKassa и CRM",
    image: "/portfolio-ecommerce.webp",
    icon: <ShoppingCart size={24} color="white" />,
  },
];

export default function InteractiveSelector() {
  const [active, setActive] = useState(0);

  return (
    <>
      <style>{`
        .selector-wrap {
          display: flex;
          flex-direction: column;
          max-width: 900px;
          margin: 0 auto;
          border-radius: 12px;
          overflow: hidden;
          position: relative;
          z-index: 5;
        }
        .selector-panel {
          position: relative;
          cursor: pointer;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          border: 2px solid rgba(41,41,41,0.5);
          overflow: hidden;
          transition: flex-grow 0.7s ease-in-out, border-color 0.7s ease-in-out;
          -webkit-tap-highlight-color: transparent;
          height: 70px;
        }
        .selector-panel.active {
          height: 220px;
          border-color: rgba(255,255,255,0.3);
        }
        .selector-panel * {
          pointer-events: none;
        }
        .panel-gradient {
          position: absolute;
          left: 0; right: 0; bottom: 0;
          height: 80px;
          background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%);
        }
        .panel-label {
          position: absolute;
          left: 0; right: 0; bottom: 12px;
          display: flex;
          align-items: center;
          padding: 0 12px;
          gap: 10px;
          height: 40px;
        }
        .panel-icon {
          min-width: 36px; max-width: 36px; height: 36px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 50%;
          background: rgba(32,32,32,0.85);
          border: 2px solid #444;
          flex-shrink: 0;
        }
        .panel-title {
          font-weight: 700;
          font-size: 0.9rem;
          color: white;
          white-space: nowrap;
          opacity: 1;
          transition: opacity 0.5s ease-in-out;
        }
        .panel-desc {
          font-size: 0.75rem;
          color: #d1d5db;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          opacity: 0;
          transition: opacity 0.5s ease-in-out;
        }
        .selector-panel.active .panel-desc {
          opacity: 1;
        }

        /* Tablet (640px+) */
        @media (min-width: 640px) {
          .selector-wrap {
            flex-direction: row;
            height: 350px;
            border-radius: 16px;
          }
          .selector-panel {
            flex: 1 1 0%;
            min-width: 50px;
            height: auto;
            background-size: auto 120%;
            transition: flex-grow 0.7s ease-in-out, background-size 0.7s ease-in-out, border-color 0.7s ease-in-out;
          }
          .selector-panel.active {
            flex-grow: 6;
            height: auto;
            background-size: auto 100%;
          }
          .panel-gradient {
            height: 100px;
          }
          .panel-label {
            bottom: 16px;
            padding: 0 14px;
            gap: 10px;
            height: 44px;
          }
          .panel-icon {
            min-width: 40px; max-width: 40px; height: 40px;
          }
          .panel-title {
            font-size: 1rem;
            opacity: 0;
          }
          .panel-desc {
            font-size: 0.8rem;
          }
          .selector-panel.active .panel-title {
            opacity: 1;
          }
        }

        /* Desktop (1024px+) */
        @media (min-width: 1024px) {
          .selector-wrap {
            height: 400px;
          }
          .selector-panel {
            min-width: 60px;
          }
          .selector-panel.active {
            flex-grow: 7;
          }
          .panel-gradient {
            height: 120px;
          }
          .panel-label {
            bottom: 20px;
            padding: 0 16px;
            gap: 12px;
            height: 48px;
          }
          .panel-icon {
            min-width: 44px; max-width: 44px; height: 44px;
          }
          .panel-title {
            font-size: 1.125rem;
          }
          .panel-desc {
            font-size: 0.875rem;
          }
        }
      `}</style>
      <div className="selector-wrap">
        {options.map((opt, i) => (
          <div
            key={i}
            className={`selector-panel${active === i ? ' active' : ''}`}
            style={{ backgroundImage: `url('${opt.image}')` }}
            onClick={() => setActive(i)}
          >
            <div className="panel-gradient" />
            <div className="panel-label">
              <div className="panel-icon">{opt.icon}</div>
              <div>
                <div className="panel-title">{opt.title}</div>
                <div className="panel-desc">{opt.description}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
