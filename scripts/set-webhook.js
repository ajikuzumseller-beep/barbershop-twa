const https = require('https');

// Terminaldan script iske túsirilgende argumentlerdi oqıw
// Buyırıq: node scripts/set-webhook.js <BOT_TOKEN> <APP_URL>
const BOT_TOKEN = process.argv[2];
const APP_URL = process.argv[3];

if (!BOT_TOKEN || !APP_URL) {
  console.error("❌ Qátelik: BOT_TOKEN yamasa APP_URL kiritilmegen.");
  console.log("💡 Qollanılıwı: node scripts/set-webhook.js <SIZDIN_BOT_TOKEN> <https://your-project.vercel.app>");
  process.exit(1);
}

// Webhook urli
const webhookUrl = `${APP_URL}/api/bot/webhook`;
const apiUrl = `https://api.telegram.org/bot${BOT_TOKEN}/setWebhook?url=${webhookUrl}`;

console.log(`Telegram'ǵa webhook ornatılmaqta: ${webhookUrl}...`);

https.get(apiUrl, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    const response = JSON.parse(data);
    if (response.ok) {
      console.log("✅ Webhook tabıslı ornatıldı!");
      console.log("Túsindirme: ", response.description);
    } else {
      console.error("❌ Qátelik júz berdi:");
      console.error(response);
    }
  });
}).on('error', (err) => {
  console.error("❌ Serverge jalǵanıwda qátelik: ", err.message);
});
