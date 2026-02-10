'use client';

import { Mail, Phone } from 'lucide-react';
import { ReactNode, useState } from 'react';
import Image from 'next/image';
import LegalModal, { PrivacyContent, OfferContent } from './LegalModal';

const TelegramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0h-.056zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
);

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
  </svg>
);

const footerLinks = [
  { label: 'Услуги', href: '#services' },
  { label: 'Цены', href: '#pricing' },
  { label: 'Портфолио', href: '#portfolio' },
  { label: 'Отзывы', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Контакты', href: '#contact' },
];

const socialLinks: { label: string; href: string; icon: ReactNode }[] = [
  { label: 'Telegram', href: 'https://t.me/ProMindLabAdmin', icon: <TelegramIcon className="w-5 h-5" /> },
  { label: 'WhatsApp', href: 'https://wa.me/79104666668', icon: <WhatsAppIcon className="w-5 h-5" /> },
  { label: 'Email', href: 'mailto:hello@promindlab.ru', icon: <Mail size={20} /> },
];

export default function Footer() {
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [offerOpen, setOfferOpen] = useState(false);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-border/30 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Image
              src="/branding/logo.png"
              alt="ProMindLab"
              width={420}
              height={105}
              className="mb-4"
              style={{ width: '220px', height: 'auto' }}
            />
            <p className="text-muted text-[0.8125rem] leading-relaxed mb-6">
              Создаём сайты, SaaS, боты и веб-приложения с помощью AI-технологий за 3-7 дней.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl glass-light flex items-center justify-center hover:bg-foreground/5 transition-colors"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-heading text-[0.9375rem] font-semibold tracking-[-0.01em] mb-4">Навигация</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-[0.8125rem] text-muted hover:text-foreground transition-colors cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading text-[0.9375rem] font-semibold tracking-[-0.01em] mb-4">Услуги</h4>
            <ul className="space-y-2 text-[0.8125rem] text-muted">
              <li>Лендинг пейдж</li>
              <li>Корпоративный сайт</li>
              <li>SaaS платформа</li>
              <li>Telegram боты</li>
              <li>Интернет-магазин</li>
              <li>UI/UX дизайн</li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="font-heading text-[0.9375rem] font-semibold tracking-[-0.01em] mb-4">Контакты</h4>
            <ul className="space-y-3 text-[0.8125rem] text-muted">
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <a
                  href="mailto:hello@promindlab.ru"
                  className="hover:text-foreground transition-colors"
                >
                  hello@promindlab.ru
                </a>
              </li>
              <li className="flex items-center gap-2">
                <TelegramIcon className="w-4 h-4" />
                <a href="https://t.me/ProMindLabAdmin" className="hover:text-foreground transition-colors">
                  @ProMindLabAdmin
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <a href="tel:+79104666668" className="hover:text-foreground transition-colors">
                  +7 (910) 466-66-68
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border/30 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[0.75rem] text-muted">&copy; 2025 ProMindLab. Все права защищены.</p>
          <div className="flex gap-6">
            <button
              onClick={() => setPrivacyOpen(true)}
              className="text-[0.75rem] text-muted hover:text-foreground transition-colors cursor-pointer"
            >
              Политика конфиденциальности
            </button>
            <button
              onClick={() => setOfferOpen(true)}
              className="text-[0.75rem] text-muted hover:text-foreground transition-colors cursor-pointer"
            >
              Оферта
            </button>
          </div>
        </div>
      </div>

      <LegalModal isOpen={privacyOpen} onClose={() => setPrivacyOpen(false)} title="Политика конфиденциальности">
        <PrivacyContent />
      </LegalModal>

      <LegalModal isOpen={offerOpen} onClose={() => setOfferOpen(false)} title="Публичная оферта">
        <OfferContent />
      </LegalModal>
    </footer>
  );
}
