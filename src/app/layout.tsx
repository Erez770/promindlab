import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/JsonLd";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://promindlab.ru"),
  title: "ProMindLab — Разработка Сайтов, SaaS и Ботов на AI за 3-7 Дней | от 25,000₽",
  description:
    "Создаём премиум сайты, SaaS-платформы и Telegram-боты с помощью AI (Claude, GPT-4) за 3-7 дней. Качество как за $15,000, цена в 10 раз ниже. Лендинги от 25,000₽, интернет-магазины от 80,000₽, SaaS от 150,000₽. Гарантия результата.",
  keywords:
    "разработка сайтов на AI, создание SaaS с искусственным интеллектом, AI агентство разработки, разработка на Claude, GPT-4 разработка, Telegram боты на заказ, быстрая разработка MVP, дешевая разработка сайтов, создание лендингов, веб-приложения на AI, автоматизация бизнеса, ProMindLab",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://promindlab.ru",
  },
  openGraph: {
    type: "website",
    url: "https://promindlab.ru",
    title: "ProMindLab — Разработка Сайтов на AI за 3-7 Дней | от 25,000₽",
    description:
      "Создаём премиум сайты, SaaS и боты с AI (Claude, GPT-4) за неделю. В 10 раз дешевле обычной разработки. 50+ запущенных проектов. Гарантия качества.",
    locale: "ru_RU",
    siteName: "ProMindLab",
  },
  twitter: {
    card: "summary_large_image",
    title: "ProMindLab — Разработка на AI за 3-7 Дней",
    description:
      "Сайты, SaaS, боты на Claude/GPT-4. От 25,000₽. Готово за неделю.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${inter.variable} scroll-smooth`}>
      <body className="antialiased w-full min-h-screen overflow-x-hidden">
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
