"use client"; // Obligatorio para interactividad
import { useState } from 'react';
import WidgetCard from './WidgetCard';

export default function WidgetGrid({ initialWidgets }: { initialWidgets: any[] }) {
  const [search, setSearch] = useState('');
  
  // Filtrado eficiente en tiempo real
  const filtered = initialWidgets.filter(w => 
    w.title.toLowerCase().includes(search.toLowerCase()) ||
    w.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      {/* Buscador Moderno */}
      <div className="relative max-w-xl mx-auto mb-16">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        <input 
          type="text"
          placeholder="Busca por nombre o categoría..."
          className="w-full pl-12 pr-4 py-4 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all shadow-lg"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Grid Responsivo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((widget) => (
          <WidgetCard key={widget.id} data={widget} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
            <p className="text-slate-500">No encontramos widgets con ese nombre.</p>
        </div>
      )}
    </section>
  );
}