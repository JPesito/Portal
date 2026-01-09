import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
// ELIMINADO: import FixedBackgroundLottie from "@/components/FixedBackgroundLottie";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: '--font-heading' });
const inter = Inter({ subsets: ["latin"], variable: '--font-body' });

export const metadata: Metadata = {
  title: "Dev_Interactive Hub v2",
  description: "Librería de recursos premium para desarrolladores.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="bg-[#F0F0F0] text-slate-800 antialiased overflow-x-hidden selection:bg-teal-500/90 selection:text-white relative">
        
        {/* ELIMINADO: <FixedBackgroundLottie /> */}

        {children}
      </body>
    </html>
  );
}