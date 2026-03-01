'use client';

import { useLocale } from 'next-intl';
import { routing } from '@/i18n/routing';
import { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';

const localeConfig: Record<string, { label: string; flag: string; name: string }> = {
  en: { label: 'EN', flag: '🇬🇧', name: 'English' },
  ru: { label: 'RU', flag: '🇷🇺', name: 'Русский' },
  he: { label: 'עב', flag: '🇮🇱', name: 'עברית' },
  ar: { label: 'عر', flag: '🇸🇦', name: 'العربية' },
};

export default function LanguageSwitcher() {
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function switchLocale(loc: string) {
    if (loc === locale) { setOpen(false); return; }
    window.location.href = `/${loc}`;
  }

  const current = localeConfig[locale];

  return (
    <div ref={ref} className="relative">
      {/* Trigger button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={`
          flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[12px] font-semibold
          border transition-all duration-200 cursor-pointer select-none
          ${open
            ? 'border-primary/60 bg-primary/10 text-foreground'
            : 'border-foreground/10 bg-foreground/5 text-muted hover:border-primary/40 hover:text-foreground hover:bg-foreground/8'
          }
        `}
      >
        <Globe size={13} className="opacity-70" />
        <span>{current?.label ?? locale.toUpperCase()}</span>
        <ChevronDown
          size={11}
          className={`opacity-60 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="
          absolute right-0 top-[calc(100%+6px)] z-[200]
          min-w-[150px] rounded-2xl
          border border-foreground/10
          bg-background/90 backdrop-blur-xl
          shadow-2xl shadow-black/30
          overflow-hidden
          dropdown-appear
        ">
          {routing.locales.map((loc) => {
            const cfg = localeConfig[loc];
            const isActive = loc === locale;
            return (
              <button
                key={loc}
                onClick={() => switchLocale(loc)}
                className={`
                  w-full flex items-center gap-3 px-4 py-2.5 text-left
                  transition-colors duration-150 cursor-pointer
                  ${isActive
                    ? 'bg-primary/10 text-foreground'
                    : 'text-muted hover:bg-foreground/6 hover:text-foreground'
                  }
                `}
              >
                <span className="text-base leading-none">{cfg?.flag}</span>
                <span className="flex-1 text-[12px] font-medium">{cfg?.name}</span>
                {isActive && (
                  <Check size={12} className="text-primary shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
