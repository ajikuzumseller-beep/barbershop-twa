import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  // Protect cron endpoint (Vercel sets x-vercel-cron header)
  // In a real prod env, uncomment the check below:
  // if (req.headers.get('x-vercel-cron') !== '1') {
  //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  // }

  try {
    const botToken = process.env.BOT_TOKEN;
    if (!botToken) {
      return NextResponse.json({ error: 'BOT_TOKEN is missing' }, { status: 500 });
    }

    // Get today's date in YYYY-MM-DD
    const today = new Date().toISOString().split('T')[0];

    // Find bookings that are confirmed, today, and not yet notified
    const upcomingBookings = await prisma.booking.findMany({
      where: {
        date: today,
        status: "CONFIRMED",
        notified: false
      },
      include: {
        user: true,
        barbershop: true
      }
    });

    let count = 0;
    for (const booking of upcomingBookings) {
      // Very basic logic: we just send a reminder. 
      // In production, we'd check if `booking.time` is within the next 1-2 hours.
      
      const payload = {
        chat_id: booking.user.telegramId,
        text: `Esletpe! Búgin saat ${booking.time} de "${booking.barbershop.name}" filialında shash alıwıńız belgilengen. Mánzil: ${booking.barbershop.address}`
      };

      try {
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        // Mark as notified
        await prisma.booking.update({
          where: { id: booking.id },
          data: { notified: true }
        });
        count++;
      } catch (err) {
        console.error(`Failed to send reminder to ${booking.user.telegramId}`);
      }
    }

    return NextResponse.json({ success: true, notifiedCount: count });
  } catch (error) {
    console.error('Cron error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
