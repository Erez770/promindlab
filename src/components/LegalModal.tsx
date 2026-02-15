'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function LegalModal({ isOpen, onClose, title, children }: LegalModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-2xl max-h-[85vh] rounded-2xl border border-[var(--glass-border)] bg-[var(--background)] shadow-2xl flex flex-col overflow-hidden"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-border/30">
              <h2 className="font-heading text-[1.25rem] sm:text-[1.5rem] font-bold tracking-[-0.02em] gradient-text">
                {title}
              </h2>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-xl glass-light flex items-center justify-center hover:bg-foreground/10 transition-colors cursor-pointer"
                aria-label="Закрыть"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6">
              <div className="text-[0.875rem] text-muted leading-relaxed space-y-4">
                {children}
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 sm:px-8 py-4 border-t border-border/30">
              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl bg-primary text-white font-medium text-[0.9375rem] hover:opacity-90 transition-opacity cursor-pointer"
              >
                Понятно
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export function PrivacyContent() {
  return (
    <>
      <p className="text-foreground font-semibold text-[1rem]">
        Политика конфиденциальности ProMindLab
      </p>
      <p className="text-muted text-[0.8125rem]">Дата публикации: 1 февраля 2025 г.</p>

      <h3 className="text-foreground font-semibold mt-6">1. Общие положения</h3>
      <p>
        Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных
        пользователей сайта promindlab.ru (далее — Сайт), принадлежащего ProMindLab (далее — Компания).
      </p>
      <p>
        Используя Сайт, вы соглашаетесь с условиями данной Политики. Если вы не согласны с условиями,
        пожалуйста, не используйте Сайт.
      </p>

      <h3 className="text-foreground font-semibold mt-6">2. Какие данные мы собираем</h3>
      <p>Мы можем собирать следующие данные:</p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Имя и фамилия</li>
        <li>Адрес электронной почты</li>
        <li>Номер телефона</li>
        <li>Описание проекта и тип услуги</li>
        <li>Техническая информация: IP-адрес, тип браузера, время посещения</li>
      </ul>

      <h3 className="text-foreground font-semibold mt-6">3. Цели обработки данных</h3>
      <ul className="list-disc pl-5 space-y-1">
        <li>Обработка заявок и связь с клиентами</li>
        <li>Подготовка коммерческих предложений</li>
        <li>Улучшение качества сервиса</li>
        <li>Выполнение договорных обязательств</li>
        <li>Отправка уведомлений о статусе проекта</li>
      </ul>

      <h3 className="text-foreground font-semibold mt-6">4. Защита данных</h3>
      <p>
        Мы применяем современные технические и организационные меры для защиты ваших данных от
        несанкционированного доступа, изменения, раскрытия или уничтожения. Данные передаются
        по защищённому протоколу HTTPS.
      </p>

      <h3 className="text-foreground font-semibold mt-6">5. Передача данных третьим лицам</h3>
      <p>
        Мы не передаём ваши персональные данные третьим лицам, за исключением случаев,
        предусмотренных законодательством РФ, а также при использовании сервисов аналитики
        (Яндекс.Метрика, Google Analytics) в обезличенном виде.
      </p>

      <h3 className="text-foreground font-semibold mt-6">6. Файлы cookie</h3>
      <p>
        Сайт использует файлы cookie для улучшения пользовательского опыта. Вы можете отключить
        cookie в настройках браузера, однако это может повлиять на функциональность Сайта.
      </p>

      <h3 className="text-foreground font-semibold mt-6">7. Ваши права</h3>
      <p>Вы имеете право:</p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Запросить информацию о хранимых данных</li>
        <li>Потребовать исправления неточных данных</li>
        <li>Потребовать удаления ваших данных</li>
        <li>Отозвать согласие на обработку данных</li>
      </ul>
      <p>Для этого свяжитесь с нами: hello@promindlab.ru</p>

      <h3 className="text-foreground font-semibold mt-6">8. Контактная информация</h3>
      <p>
        ProMindLab<br />
        Email: hello@promindlab.ru<br />
        Telegram: @ProMindLabAdmin<br />
        Телефон: +7 (926) 300-06-74
      </p>
    </>
  );
}

export function OfferContent() {
  return (
    <>
      <p className="text-foreground font-semibold text-[1rem]">
        Публичная оферта ProMindLab
      </p>
      <p className="text-muted text-[0.8125rem]">Дата публикации: 1 февраля 2025 г.</p>

      <h3 className="text-foreground font-semibold mt-6">1. Общие положения</h3>
      <p>
        Настоящий документ является публичной офертой ProMindLab (далее — Исполнитель) и содержит
        условия оказания услуг по разработке веб-сайтов, веб-приложений, SaaS-платформ, Telegram-ботов
        и иных цифровых продуктов.
      </p>
      <p>
        Оплата услуг Исполнителя является акцептом настоящей оферты и подтверждает согласие Заказчика
        с изложенными условиями.
      </p>

      <h3 className="text-foreground font-semibold mt-6">2. Предмет оферты</h3>
      <p>
        Исполнитель обязуется оказать Заказчику услуги по разработке цифровых продуктов в соответствии
        с согласованным техническим заданием, а Заказчик обязуется оплатить эти услуги.
      </p>

      <h3 className="text-foreground font-semibold mt-6">3. Порядок работы</h3>
      <ul className="list-disc pl-5 space-y-1">
        <li>Заказчик оставляет заявку через форму на сайте или мессенджер</li>
        <li>Исполнитель подготавливает коммерческое предложение</li>
        <li>После согласования Заказчик вносит предоплату 50%</li>
        <li>Исполнитель выполняет работу в оговорённые сроки</li>
        <li>После сдачи и приёмки Заказчик оплачивает оставшиеся 50%</li>
      </ul>

      <h3 className="text-foreground font-semibold mt-6">4. Сроки</h3>
      <p>
        Сроки выполнения работ определяются индивидуально для каждого проекта и фиксируются
        в коммерческом предложении. Ориентировочные сроки:
      </p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Лендинг пейдж — 2-3 рабочих дня</li>
        <li>Корпоративный сайт — 5-7 рабочих дней</li>
        <li>Интернет-магазин — 5-7 рабочих дней</li>
        <li>SaaS платформа (MVP) — 7-14 рабочих дней</li>
        <li>Telegram/WhatsApp бот — 3-5 рабочих дней</li>
      </ul>

      <h3 className="text-foreground font-semibold mt-6">5. Стоимость услуг</h3>
      <p>
        Стоимость услуг определяется в соответствии с прайс-листом на сайте и может быть
        скорректирована по результатам обсуждения проекта. Все цены указаны в рублях РФ.
      </p>

      <h3 className="text-foreground font-semibold mt-6">6. Оплата</h3>
      <p>Способы оплаты:</p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Банковская карта (Visa, MasterCard, МИР)</li>
        <li>Банковский перевод (для юридических лиц)</li>
        <li>ЮKassa</li>
        <li>Stripe (для международных клиентов, USD/EUR)</li>
      </ul>

      <h3 className="text-foreground font-semibold mt-6">7. Гарантии</h3>
      <ul className="list-disc pl-5 space-y-1">
        <li>Бесплатная техническая поддержка от 1 до 6 месяцев (зависит от пакета)</li>
        <li>Исправление багов в течение гарантийного периода</li>
        <li>Возврат 100% оплаты, если результат не соответствует согласованному ТЗ</li>
      </ul>

      <h3 className="text-foreground font-semibold mt-6">8. Права на результат</h3>
      <p>
        После полной оплаты все исключительные права на разработанный продукт переходят Заказчику.
        Исполнитель передаёт исходный код, доступы и документацию.
      </p>

      <h3 className="text-foreground font-semibold mt-6">9. Ответственность сторон</h3>
      <p>
        Стороны несут ответственность за неисполнение обязательств в соответствии с законодательством РФ.
        Исполнитель не несёт ответственности за убытки, вызванные действиями третьих лиц или обстоятельствами
        непреодолимой силы.
      </p>

      <h3 className="text-foreground font-semibold mt-6">10. Контактная информация</h3>
      <p>
        ProMindLab<br />
        Email: hello@promindlab.ru<br />
        Telegram: @ProMindLabAdmin<br />
        Телефон: +7 (926) 300-06-74
      </p>
    </>
  );
}
