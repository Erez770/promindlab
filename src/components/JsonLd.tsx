export default function JsonLd() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ProMindLab",
    alternateName: "ProMindLab — Разработка на Искусственном Интеллекте",
    url: "https://promindlab.ru",
    description:
      "Разработка сайтов, SaaS-платформ и Telegram-ботов с использованием AI (Claude, GPT-4). Быстро, качественно, доступно.",
    email: "hello@promindlab.ru",
    telephone: "+7-910-466-66-68",
    address: {
      "@type": "PostalAddress",
      addressCountry: "RU",
      addressLocality: "Москва",
    },
    sameAs: ["https://t.me/ProMindLabAdmin"],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+7-910-466-66-68",
      contactType: "Customer Service",
      availableLanguage: ["Russian", "English"],
    },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ProMindLab",
    url: "https://promindlab.ru",
  };

  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://promindlab.ru/#service",
    serviceType: "Разработка сайтов и веб-приложений на AI",
    provider: {
      "@type": "Organization",
      name: "ProMindLab",
    },
    areaServed: {
      "@type": "Country",
      name: "Россия",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Услуги разработки",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Разработка лендинг пейдж",
            description:
              "Одностраничный сайт с анимациями, адаптивным дизайном и SEO-оптимизацией за 2-3 дня",
          },
          price: "25000",
          priceCurrency: "RUB",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Корпоративный сайт",
            description:
              "Многостраничный сайт с CMS, интеграциями и системой управления контентом за 5-7 дней",
          },
          price: "60000",
          priceCurrency: "RUB",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Разработка интернет-магазина",
            description:
              "E-commerce решение с корзиной, оплатой, каталогом товаров и доставкой за 5-7 дней",
          },
          price: "80000",
          priceCurrency: "RUB",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Разработка SaaS платформы (MVP)",
            description:
              "Веб-приложение с личным кабинетом, авторизацией, базой данных и API за 7-14 дней",
          },
          price: "150000",
          priceCurrency: "RUB",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Разработка Telegram/WhatsApp ботов",
            description:
              "Автоматизация коммуникации, приём заказов, интеграция с CRM за 3-5 дней",
          },
          price: "30000",
          priceCurrency: "RUB",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Разработка веб-приложений",
            description:
              "Кастомные решения, дашборды, аналитика, автоматизация бизнес-процессов за 7-10 дней",
          },
          price: "100000",
          priceCurrency: "RUB",
        },
      ],
    },
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Как AI помогает в разработке сайтов?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Мы используем Claude AI и GPT-4 для автоматизации написания кода, создания дизайна и оптимизации. AI-инструменты генерируют до 80% кода, создают дизайн-макеты и автоматизируют тестирование. Это позволяет сократить время разработки в 5-10 раз при сохранении премиум-качества.",
        },
      },
      {
        "@type": "Question",
        name: "Почему разработка на AI такая быстрая и дешёвая?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "AI-инструменты автоматизируют рутинные задачи: написание кода, вёрстку, тестирование. Это экономит 80% времени разработчиков. Мы передаём эту экономию клиентам — цены в 5-10 раз ниже традиционной разработки при сохранении премиум-качества.",
        },
      },
      {
        "@type": "Question",
        name: "Какие гарантии качества вы предоставляете?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Гарантируем: код проходит code review, тестирование на всех устройствах, Lighthouse score 90+. Если результат не устроит — вернём 100% оплаты. После запуска предоставляем бесплатную поддержку от 1 до 6 месяцев.",
        },
      },
      {
        "@type": "Question",
        name: "Будет ли поддержка после запуска?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Да! В зависимости от пакета — от 1 до 6 месяцев бесплатной поддержки. Исправление багов, мелкие доработки, консультации. После окончания бесплатного периода — техподдержка по абонементу от 10,000₽/мес.",
        },
      },
      {
        "@type": "Question",
        name: "Какие способы оплаты принимаете?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Принимаем: банковские карты, расчётный счёт (для юрлиц), ЮKassa, Stripe (для международных клиентов). Оплата в 2 этапа: 50% предоплата + 50% после сдачи проекта.",
        },
      },
      {
        "@type": "Question",
        name: "Работаете ли вы с клиентами из СНГ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Да, работаем с клиентами из России, Казахстана, Беларуси, Узбекистана и других стран СНГ. Для международных клиентов принимаем оплату в USD/EUR через Stripe. Все процессы удалённые.",
        },
      },
    ],
  };

  const aggregateRating = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "ProMindLab — Разработка на AI",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      bestRating: "5",
      ratingCount: "127",
    },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Главная",
        item: "https://promindlab.ru/",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateRating) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </>
  );
}
