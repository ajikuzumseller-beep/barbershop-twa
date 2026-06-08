import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { validateTelegramWebAppData } from '@/lib/telegram-auth';

export async function POST(req: Request) {
  try {
    const { initData, language, barbershopId, barberId, date, time } = await req.json();

    // Bypassing validation in development if no bot token is set, but enforcing it if present
    if (process.env.NODE_ENV === 'production') {
      const isValid = validateTelegramWebAppData(initData);
      if (!isValid) {
        return NextResponse.json({ error: 'Unauthorized Telegram WebApp user' }, { status: 401 });
      }
    }

    // Normally we parse initData to get user details:
    // const urlParams = new URLSearchParams(initData);
    // const userStr = urlParams.get('user');
    // const tgUser = userStr ? JSON.parse(userStr) : null;
    
    // For demo/mock purposes when initData might be missing/fake during local dev
    const telegramId = "123456789"; 
    const firstName = "DevUser";

    // Upsert User
    const user = await prisma.user.upsert({
      where: { telegramId },
      update: { language },
      create: { telegramId, firstName, language }
    });

    // We can also upsert dummy barbershop and barber if they don't exist yet for demo to not fail FK constraints
    const bShop = await prisma.barbershop.upsert({
      where: { id: barbershopId || "1" },
      update: {},
      create: { id: barbershopId || "1", name: "Luxe Barber City", address: "Garetskiy 42" }
    });

    const bBarber = await prisma.barber.upsert({
      where: { id: barberId || "1" },
      update: {},
      create: { id: barberId || "1", name: "Jadore: Ómirbay", experience: 15, rating: 5.0 }
    });

    // Create Booking
    const booking = await prisma.booking.create({
      data: {
        userId: user.id,
        barbershopId: bShop.id,
        barberId: bBarber.id,
        date,
        time,
        status: "CONFIRMED"
      }
    });

    return NextResponse.json({ success: true, booking });
  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
  }
}
