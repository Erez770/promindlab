'use client';

import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  variant?: 'full' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  className?: string;
}

const sizes = {
  sm: { full: { w: 120, h: 30 }, icon: { w: 28, h: 28 } },
  md: { full: { w: 160, h: 40 }, icon: { w: 36, h: 36 } },
  lg: { full: { w: 200, h: 50 }, icon: { w: 48, h: 48 } },
};

export default function Logo({ variant = 'full', size = 'md', href = '/', className = '' }: LogoProps) {
  const dim = sizes[size][variant];

  const img = (
    <Image
      src={variant === 'full' ? '/branding/logo.png' : '/branding/icon.png'}
      alt="ProMindLab"
      width={dim.w}
      height={dim.h}
      priority
      className={`w-auto transition-transform duration-300 hover:scale-105 ${className}`}
      style={{ height: dim.h, width: 'auto' }}
    />
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex items-center">
        {img}
      </Link>
    );
  }

  return img;
}
