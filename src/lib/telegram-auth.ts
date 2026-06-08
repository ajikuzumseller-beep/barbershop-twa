import crypto from 'crypto';

export function validateTelegramWebAppData(telegramInitData: string): boolean {
  if (!process.env.BOT_TOKEN) {
    console.error('BOT_TOKEN is not defined');
    return false;
  }

  try {
    const urlParams = new URLSearchParams(telegramInitData);
    const hash = urlParams.get('hash');
    
    if (!hash) return false;

    urlParams.delete('hash');
    urlParams.sort();

    let dataCheckString = '';
    for (const [key, value] of urlParams.entries()) {
      dataCheckString += `${key}=${value}\n`;
    }
    dataCheckString = dataCheckString.slice(0, -1);

    const secretKey = crypto.createHmac('sha256', 'WebAppData').update(process.env.BOT_TOKEN).digest();
    const calculatedHash = crypto.createHmac('sha256', secretKey).update(dataCheckString).digest('hex');

    return calculatedHash === hash;
  } catch (error) {
    console.error('Telegram validation error:', error);
    return false;
  }
}
