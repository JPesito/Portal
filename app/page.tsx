import { supabase } from '@/src/lib/supabase';
import WidgetGrid from '@/src/components/WidgetGrid';
import HeaderLottie from '@/src/components/HeaderLottie';
// Importamos iconos y la acción de logout
import { BeakerIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { logoutAction } from './login/actions';

export const revalidate = 0;

export default async function Home() {
  const { data: widgets } = await supabase
    .from('widgets')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <main className="min-h-screen bg-[#F0F0F0]">
      
      <header 
        style={{ backgroundColor: '#0B1120' }} 
        className="text-white pt-32 pb-24 md:pt-40 md:pb-36 px-6 relative overflow-hidden rounded-b-[3rem] shadow-2xl shadow-slate-900/40 z-10"
      >
        
        {/* === ZONA DE BOTONES SUPERIOR DERECHA === */}
        {/* Usamos 'flex' para ponerlos uno al lado del otro */}
        <div className="absolute top-6 right-6 md:top-10 md:right-10 z-50 flex items-center gap-3">
            
            {/* 1. Botón Laboratorio (Existente) */}
            <a 
                href="/test/Graphic.html" 
                target="_blank"
                className="p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-slate-300 hover:bg-teal-500 hover:text-white hover:border-teal-400 hover:scale-105 transition-all duration-300 shadow-lg group"
                title="Ir al Laboratorio"
            >
                <BeakerIcon className="w-6 h-6 group-hover:animate-pulse" />
            </a>

            {/* 2. NUEVO Botón Cerrar Sesión */}
            {/* Usamos un form para llamar a la Server Action */}
            <form action={logoutAction}>
                <button 
                    type="submit"
                    className="p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-slate-300 hover:bg-red-500/80 hover:text-white hover:border-red-400 hover:scale-105 transition-all duration-300 shadow-lg group flex items-center justify-center"
                    title="Cerrar Sesión"
                >
                    <ArrowRightOnRectangleIcon className="w-6 h-6" />
                </button>
            </form>
        </div>

        {/* ... (El resto del header sigue exactamente igual) ... */}
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-teal-500/20 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-500/20 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-20">
            <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 lg:gap-20">
                <div className="flex-1 text-center md:text-left">
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
                    <p className="font-body text-slate-300 max-w-xl mx-auto md:mx-0 text-lg md:text-xl leading-relaxed">
                    Gestión centralizada de recursos de desarrollo.
                    <span className="block mt-2 text-teal-400 font-medium">
                        Explora, edita y despliega tus componentes.
                    </span>
                    </p>
                </div>
                <div className="flex-1 w-full max-w-xl relative md:-mt-10">
                    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-2/3 h-16 bg-teal-500/20 blur-[60px] -z-10 rounded-full" />
                    <HeaderLottie />
                </div>
            </div>
        </div>
      </header>

      <div className="relative z-20 -mt-16 px-2">
        <WidgetGrid initialWidgets={widgets || []} />
      </div>
      <footer className="py-12 text-center text-slate-500 text-sm">
        <p>© {new Date().getFullYear()} Dev System v2.0</p>
      </footer>
    </main>
  );
}