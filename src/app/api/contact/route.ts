import { NextResponse } from 'next/server';

const TELEGRAM_API = 'https://api.telegram.org/bot';

export async function POST(request: Request) {
  try {
    const { name, email, phone, projectType, message } = await request.json();

    // Basic validation
    if (!name || !email || !phone || !projectType) {
      return NextResponse.json(
        { error: 'Заполните все обязательные поля' },
        { status: 400 }
      );
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error('TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not configured');
      return NextResponse.json(
        { error: 'Сервер не настроен для отправки уведомлений' },
        { status: 500 }
      );
    }

    const text = [
      `📩 *Новая заявка с сайта*`,
      ``,
      `👤 *Имя:* ${escapeMarkdown(name)}`,
      `📧 *Email:* ${escapeMarkdown(email)}`,
      `📞 *Телефон:* ${escapeMarkdown(phone)}`,
      `📋 *Тип проекта:* ${escapeMarkdown(projectType)}`,
      message ? `💬 *Сообщение:* ${escapeMarkdown(message)}` : '',
      ``,
      `🕐 _${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}_`,
    ]
      .filter(Boolean)
      .join('\n');

    const res = await fetch(`${TELEGRAM_API}${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'Markdown',
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('Telegram API error:', err);
      return NextResponse.json(
        { error: 'Не удалось отправить уведомление' },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact form error:', err);
    return NextResponse.json(
      { error: 'Произошла ошибка при обработке заявки' },
      { status: 500 }
    );
  }
}

function escapeMarkdown(text: string): string {
  return text.replace(/[_*`[]/g, '\\$&');
}
