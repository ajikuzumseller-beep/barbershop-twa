import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Respond to message with Web App button
    if (body.message && body.message.text) {
      const chatId = body.message.chat.id;
      const botToken = process.env.BOT_TOKEN;

      if (!botToken) {
        return NextResponse.json({ error: 'BOT_TOKEN is missing' }, { status: 500 });
      }

      // We use simple fetch to telegram bot API
      const webAppUrl = process.env.WEBAPP_URL || 'https://your-vercel-domain.vercel.app';
      
      const payload = {
        chat_id: chatId,
        text: 'Salám! Ustaǵa waqıt belgilew ushın tómendegi knopkanı basıń:',
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Kiriw / Ashıw', web_app: { url: webAppUrl } }]
          ]
        }
      };

      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
