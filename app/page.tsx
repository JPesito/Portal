import { supabase } from '@/src/lib/supabase';
import WidgetGrid from '@/src/components/WidgetGrid';

// DESACTIVAMOS EL CACHÉ (Revalidate = 0)
// Esto es crucial para un panel de administración:
// Asegura que siempre veas la lista de widgets más reciente al recargar.
export const revalidate = 0;

export default async function Home() {
  
  // 1. Fetch de datos en el servidor (Seguro y Rápido)
  const { data: widgets } = await supabase
    .from('widgets')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <main className="min-h-screen relative">
      
      {/* Fondo decorativo sutil (Gradiente superior) */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-teal-50/80 to-transparent -z-10 pointer-events-none" />

      {/* --- HERO SECTION (Estilo Clean Tech) --- */}
      <header className="pt-28 pb-16 text-center px-6">
        
        {/* Badge "Admin Active" */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-teal-200 bg-white text-teal-700 text-xs font-bold mb-6 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
            </span>
            System Online
        </div>

        <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 text-slate-900">
          Widget <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-500 animate-gradient bg-300%">
            Database
          </span>
        </h1>
        
        <p className="font-body text-slate-500 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
          Panel de control para gestión de recursos de desarrollo.
          <span className="block mt-2 text-teal-700 font-medium">
            Previsualiza, edita y descarga tus componentes.
          </span>
        </p>
      </header>

      {/* --- GRID INTERACTIVO + MODAL (Cliente) --- */}
      {/* Pasamos los datos del servidor al componente interactivo */}
      <WidgetGrid initialWidgets={widgets || []} />
      
      <footer className="py-10 text-center text-slate-400 text-sm">
        <p>© {new Date().getFullYear()} Web Design Developer System.</p>
      </footer>

    </main>
  );
}