'use client';

const items = [
  { label: 'Next.js 16' },
  { label: 'React 19' },
  { label: 'TypeScript' },
  { label: 'Claude AI' },
  { label: 'GPT-4o' },
  { label: 'Tailwind CSS' },
  { label: 'Framer Motion' },
  { label: 'Supabase' },
  { label: 'PostgreSQL' },
  { label: 'Stripe' },
  { label: 'Docker' },
  { label: 'Vercel' },
  { label: 'Telegram API' },
  { label: 'Node.js' },
  { label: 'Python' },
];

const Dot = () => (
  <span className="w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />
);

export default function TechStrip() {
  return (
    <div className="relative w-full py-5 overflow-hidden border-y border-border/20 bg-surface/30">
      {/* fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />

      {/* Accessible list for screen readers */}
      <ul className="sr-only" aria-label="Технологии, которые мы используем">
        {items.map((item) => (
          <li key={item.label}>{item.label}</li>
        ))}
      </ul>

      <div className="flex gap-8 animate-marquee whitespace-nowrap" aria-hidden="true">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="inline-flex items-center gap-3 text-[0.8125rem] font-medium text-muted">
            <Dot />
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}
