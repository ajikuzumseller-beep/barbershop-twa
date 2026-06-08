import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Multi-Barbershop Booking",
  description: "Premium Barbershop booking and business management ecosystem",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col items-center bg-background text-foreground">
        <main className="w-full max-w-md min-h-screen relative shadow-2xl bg-background overflow-hidden flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
