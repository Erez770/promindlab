# SEO Чеклист — ProMindLab

## 1. Отправка в Google Search Console

1. Открой https://search.google.com/search-console
2. Нажми «Добавить ресурс» → «Префикс URL-адреса»
3. Введи `https://promindlab.ru`
4. Подтверди владение одним из способов:
   - **HTML-тег** (рекомендуемый): скопируй содержимое `content` из мета-тега и вставь в `layout.tsx` → `metadata.other["google-site-verification"]`
   - Или загрузи HTML-файл в `public/`
5. После подтверждения:
   - Перейди в «Файлы Sitemap» → добавь `sitemap.xml`
   - Перейди в «Проверка URL» → проверь главную страницу
   - Запроси индексацию главной страницы

## 2. Отправка в Яндекс.Вебмастер

1. Открой https://webmaster.yandex.ru
2. Нажми «Добавить сайт» → введи `https://promindlab.ru`
3. Подтверди владение:
   - **Мета-тег**: скопируй значение и вставь в `layout.tsx` → `metadata.other["yandex-verification"]`
4. После подтверждения:
   - Перейди в «Индексирование» → «Файлы Sitemap» → добавь `sitemap.xml`
   - В разделе «Индексирование» → «Переобход страниц» → добавь главную

## 3. Проверка индексации

### Google:
- Поисковый запрос: `site:promindlab.ru`
- Через Search Console: «Покрытие» → проверь статус страниц

### Яндекс:
- Поисковый запрос: `site:promindlab.ru`
- Через Вебмастер: «Индексирование» → «Страницы в поиске»

### AI-поисковики:
- Спроси в ChatGPT: «Что ты знаешь о ProMindLab?»
- Спроси в Perplexity: «ProMindLab разработка сайтов на AI»
- Для индексации AI-ботами файл `robots.txt` уже разрешает доступ GPTBot, Claude-Web, PerplexityBot

## 4. Запросы для мониторинга позиций

### Основные (высокий приоритет):
- `разработка сайтов на AI`
- `создание сайтов с искусственным интеллектом`
- `AI агентство разработки`
- `быстрая разработка сайтов`
- `разработка MVP`
- `ProMindLab`

### Услуги:
- `заказать лендинг пейдж`
- `разработка SaaS платформы`
- `создание Telegram бота на заказ`
- `разработка интернет магазина`
- `создание корпоративного сайта`
- `разработка веб-приложений`

### Технологические:
- `разработка на Claude AI`
- `сайты на GPT-4`
- `разработка на Next.js`
- `разработка на React`

### Ценовые:
- `дешевая разработка сайтов`
- `лендинг пейдж цена`
- `сколько стоит разработка SaaS`
- `разработка бота цена`

### Географические:
- `разработка сайтов Москва`
- `веб-студия Россия`
- `заказать сайт удалённо`

## 5. Что уже внедрено

- [x] Расширенные meta-теги (title, description, keywords, robots)
- [x] Open Graph разметка (для соцсетей)
- [x] Twitter Card разметка
- [x] Canonical URL
- [x] JSON-LD: Organization
- [x] JSON-LD: WebSite
- [x] JSON-LD: Service с OfferCatalog (6 услуг с ценами)
- [x] JSON-LD: FAQPage (6 вопросов-ответов)
- [x] JSON-LD: AggregateRating
- [x] JSON-LD: BreadcrumbList
- [x] robots.txt (Google, Yandex, GPTBot, Claude-Web, PerplexityBot)
- [x] sitemap.xml
- [x] SEO-контент секция с ключевыми словами
- [x] Security headers (X-Content-Type-Options, X-Frame-Options, etc.)
- [x] Image optimization (AVIF/WebP, cache)
- [x] Gzip/Brotli compression

## 6. Что нужно сделать вручную

- [ ] Подтвердить сайт в Google Search Console
- [ ] Подтвердить сайт в Яндекс.Вебмастер
- [ ] Вставить коды верификации в `layout.tsx` → `metadata.other`
- [ ] Заменить `https://promindlab.ru` на реальный домен (во всех файлах)
- [ ] Создать OG-image (1200x630px) и добавить в `public/og-image.jpg`
- [ ] Зарегистрировать Google My Business (для локального SEO)
- [ ] Создать страницу в Яндекс.Справочнике
- [ ] Добавить сайт в Яндекс.Каталог

## 7. Инструменты для проверки

- **Google Rich Results Test**: https://search.google.com/test/rich-results — проверка JSON-LD
- **Schema Validator**: https://validator.schema.org — валидация структурированных данных
- **Google PageSpeed Insights**: https://pagespeed.web.dev — скорость загрузки
- **Яндекс Вебмастер → Инструменты**: проверка robots.txt и микроразметки
- **Ahrefs/Serpstat**: мониторинг позиций по запросам
