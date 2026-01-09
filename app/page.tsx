import { supabase } from '@/src/lib/supabase';
import WidgetGrid from '@/src/components/WidgetGrid';
import HeaderLottie from '@/src/components/HeaderLottie'; // Importamos tu nuevo Lottie del header

// DESACTIVAMOS EL CACHÉ (Revalidate = 0)
// Crucial para un panel de admin: asegura que siempre veas los datos más recientes.
export const revalidate = 0;

export default async function Home() {
  
  // 1. Fetch de datos en el servidor (Seguro y Rápido)
  const { data: widgets } = await supabase
    .from('widgets')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <main className="min-h-screen">
      
      {/* --- HERO SECTION OSCURO (Header) --- */}
      {/* - bg-slate-900: Fondo oscuro sólido (tapa el lottie de fondo).
          - z-10: Asegura que esté por encima del fondo.
          - rounded-b-[3rem]: La curva moderna inferior.
      */}
      <header className="bg-black text-white pt-32 pb-24 md:pt-40 md:pb-36 px-6 relative overflow-hidden rounded-b-[3rem] shadow-2xl shadow-slate-900/30 z-10">
        
        {/* Luces ambientales sutiles DENTRO del header oscuro para dar profundidad */}
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-teal-500/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-20">
            {/* Layout Flex: Columna invertida en móvil, Fila en escritorio */}
            <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 lg:gap-20">
                
                {/* COLUMNA IZQUIERDA: Texto */}
                <div className="flex-1 text-center md:text-left">
                    {/* Badge decorativo */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-teal-500/30 bg-teal-950/50 text-teal-300 text-xs font-bold mb-6 backdrop-blur-md shadow-sm">
                        <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                        </span>
                        Panel V2.0 Active
                    </div>

                    <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 text-white leading-tight">
                    Interactive <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-indigo-400 to-teal-400 animate-gradient bg-300%">
                        Widget Hub
                    </span>
                    </h1>
                    
                    <p className="font-body text-slate-400 max-w-xl mx-auto md:mx-0 text-lg md:text-xl leading-relaxed">
                    Gestión centralizada de recursos de desarrollo.
                    <span className="block mt-2 text-teal-400 font-medium">
                        Explora, edita y despliega tus componentes.
                    </span>
                    </p>
                </div>

                {/* COLUMNA DERECHA: Lottie Animation */}
                <div className="flex-1 w-full max-w-xl relative md:-mt-10">
                    {/* Efecto de "suelo" brillante debajo del Lottie */}
                    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-2/3 h-16 bg-teal-500/20 blur-[60px] -z-10 rounded-full" />
                    
                    {/* El componente Lottie */}
                    <HeaderLottie />
                </div>
            </div>
        </div>
      </header>

      {/* --- GRID INTERACTIVO --- */}
      {/* -mt-16: Margen negativo para subir el grid y que se superponga al header.
         relative z-20: Para que quede por encima del header.
      */}
      <div className="relative z-20 -mt-16 px-2">
        <WidgetGrid initialWidgets={widgets || []} />
      </div>
      
      <footer className="py-12 text-center text-slate-500 text-sm">
        <p className="flex items-center justify-center gap-2">
            © {new Date().getFullYear()} Dev System
            <span className="w-1 h-1 rounded-full bg-slate-400"></span>
            Versión 2.0
        </p>
      </footer>

    </main>
  );
}