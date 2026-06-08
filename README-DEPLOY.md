# Vercel hám Telegram TWA Deploy Qollanbası

Bul qollanba joybardı jergilikli (local) kompyuterden internetke (Vercel) jaylastırıw hám Telegram bot penen baylanıstırıwdı qádeme-qádem túsindiredi.

## 1-Qádem: GitHub'qa júklew
1. VS Code terminalın ashiń.
2. Tómendegi buyırıqlardı kiritip, joybardıń hámme faylların GitHub repozitoriyasına júkleń:
```bash
git init
git add .
git commit -m "Initial commit - Full Stack TWA"
git branch -M main
git remote add origin https://github.com/SIZDIN_GITHUB_ATINIZ/twa-barbershop.git
git push -u origin main
```

## 2-Qádem: Vercel'ge jaylastırıw (Deploy)
1. [Vercel.com](https://vercel.com) saytına kiriń hám **"Add New Project"** knopkasın basıń.
2. Jańa júklegen `twa-barbershop` GitHub reponızdı tańlań (Import).
3. **Environment Variables** (Ortalıq ózgeriwshiler) bólimine hámme nárse qosıwdan aldın ápiwayı **"Deploy"** knopkasın basıń. (Birinshi deploy biraz qátesiz túsip alıwı ushın kerek).

## 3-Qádem: Vercel Postgres Bazan ashıw
1. Vercel dashboard'ıńızdan joybarǵa kiriń hám ústki menyudan **"Storage"** bólimine ótiń.
2. **"Create Database"** -> **"Postgres"** degenin tańlap, baza jaratıń.
3. Baza jaratılǵannan soń, onı usı joybarǵa jalǵań (Connect). Vercel avtomat túrde hámme `POSTGRES_...` ózgeriwshilerin joybarıńızǵa qosadı.

## 4-Qádem: API Giltlerin (Environment Variables) qosıw
1. Vercel joybarıńızdıń **Settings** -> **Environment Variables** bólimine ótiń.
2. Vercel bergen sıltelemeni (Mısalı, `https://twa-barbershop.vercel.app`) `NEXT_PUBLIC_APP_URL` hám `WEBAPP_URL` ataması menen qosıń.
3. Telegram BotFather'dan alǵan tokenińizdi `BOT_TOKEN` ataması menen qosıń.
4. **Vercel Storage** ózi qosıp qoyǵan `POSTGRES_PRISMA_URL` sıltelemesin tiykarınan `DATABASE_URL` atı menen qaytadan dublikat qılıp qosıń (Prisma túsiniwi ushın).

## 5-Qádem: Bazanı iske túsiriw hám qayta Deploy (Prisma db push)
1. Endi joybarıńız bazanı túsiniwi ushın Settings'degi ózgerislerden soń **Deployments** bólimine ótip, eń sońǵı deploydı **"Redeploy"** qılıń.
2. Vercel build etip atırǵanda avtomat túrde `prisma generate` orınlanadı. 
3. *Qosımsha (eger kesteler payda bolmasa):* Ózińizdiń VS Code terminalıńızǵa Vercel'degi `DATABASE_URL` sıltelemesin jergilikli `.env` faylǵa qoyıp, `npx prisma db push` buyırıǵın beriń. Bul sizdiń kompyuterińizden turıp Vercel'degi bazaǵa kestelerdi jazadı.

## 6-Qádem: Telegram Webhook'tı iske túsiriw
Barlıq logikalarımız `/api/bot/webhook` marshrutında (routes) turıptı. Endi botqa "Xat kelse usı jerge jiber" dep aytıwımız kerek.

1. VS Code terminalın ashiń.
2. Biz jaratqan scriptti tómendegishe iske túsiriń:
```bash
node scripts/set-webhook.js SIZDIN_BOT_TOKEN https://twa-barbershop.vercel.app
```
*(Mánziller hám tokenlerdi ózińizdiki menen almastırıń)*

3. Terminalda **"✅ Webhook tabıslı ornatıldı!"** degen jazıw shıqsa, boldı!

Hámme nárse tayın! Telegram'ǵa kirip botińizge `/start` yamasa qálegen xat jazsańız, ol sizge TWA-dı ashatuǵın knopka (Inline Keyboard) jiberiw kerek.
