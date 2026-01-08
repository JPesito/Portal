import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google"; // 1. Importamos fuentes pro
import "./globals.css";

// 2. Configuramos las fuentes
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: '--font-heading' });
const inter = Inter({ subsets: ["latin"], variable: '--font-body' });

export const metadata: Metadata = {
  title: "Dev_Interactive Widgets",
  description: "Librería de recursos premium para desarrolladores.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="bg-[#030014] text-slate-200 antialiased overflow-x-hidden selection:bg-indigo-500/90 selection:text-white">
        
        {/* 3. Fondo Ambiental (Spotlights) - Esto le da profundidad inmediata */}
        <div className="fixed inset-0 z-[-1]">
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-500/20 blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-500/20 blur-[120px]" />
        </div>

        {children}
      </body>
    </html>
  );
}