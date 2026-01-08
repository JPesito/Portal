import { supabase } from '@/src/lib/supabase';
import WidgetGrid from '@/src/components/WidgetGrid';

// Revalidar datos cada 60 segundos (Incremental Static Regeneration)
// Esto hace que la web vuele, pero si añades un widget nuevo, tarda 1 min en aparecer.
export const revalidate = 60; 

export default async function Home() {
  // 1. Fetch de datos en el servidor
  const { data: widgets } = await supabase
    .from('widgets')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-indigo-500/30">
      
      {/* Hero Section Minimalista */}
      <header className="pt-24 pb-12 text-center px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-white via-slate-200 to-slate-500 bg-clip-text text-transparent">
          Widget Library
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          Colección curada de componentes interactivos para desarrollo web.
          <span className="block mt-2 text-indigo-400 text-sm font-mono">Hecho por un Dev para Clientes</span>
        </p>
      </header>

      {/* Grid Interactivo */}
      <WidgetGrid initialWidgets={widgets || []} />
      
    </main>
  );
}