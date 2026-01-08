"use client"; 
import { useState } from 'react';
import WidgetCard from './WidgetCard';
import AdminModal from './AdminModal'; // Importamos el modal
import { PlusIcon } from '@heroicons/react/24/solid';

export default function WidgetGrid({ initialWidgets }: { initialWidgets: any[] }) {
  const [search, setSearch] = useState('');
  
  // Estados para el modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWidget, setEditingWidget] = useState(null);

  const filtered = initialWidgets.filter(w => 
    w.title.toLowerCase().includes(search.toLowerCase()) ||
    w.category.toLowerCase().includes(search.toLowerCase())
  );

  // Función para abrir el modal en modo Crear
  const openCreateModal = () => {
    setEditingWidget(null);
    setIsModalOpen(true);
  };

  // Función para abrir el modal en modo Editar
  const openEditModal = (widget: any) => {
    setEditingWidget(widget);
    setIsModalOpen(true);
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      
      {/* Cabecera con Buscador y Botón Crear */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-12">
        
        {/* Buscador Estilo Light */}
        <div className="relative w-full max-w-lg">
            <input 
              type="text"
              placeholder="Buscar..."
              className="w-full pl-5 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              onChange={(e) => setSearch(e.target.value)}
            />
        </div>

        {/* Botón Flotante de Crear */}
        <button 
            onClick={openCreateModal}
            className="flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-lg shadow-teal-500/20 transition-transform hover:scale-105"
        >
            <PlusIcon className="w-5 h-5" />
            Nuevo Widget
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((widget) => (
          <WidgetCard 
            key={widget.id} 
            data={widget} 
            onEdit={openEditModal} // Pasamos la función de editar
          />
        ))}
      </div>

      {/* El Modal Renderizado */}
      <AdminModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        editingWidget={editingWidget}
      />
    </section>
  );
}