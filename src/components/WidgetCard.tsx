import { ArrowDownTrayIcon, PencilSquareIcon } from '@heroicons/react/24/outline';

// Agregamos una prop 'onEdit' para abrir el modal
interface WidgetProps {
  id: string; // Necesitamos el ID para editar
  title: string;
  description: string;
  gif_url: string;
  download_url: string;
  category: string;
}

export default function WidgetCard({ data, onEdit }: { data: WidgetProps, onEdit?: (widget: any) => void }) {
  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200 transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/10 hover:-translate-y-1">
      
      {/* Botón de Edición (Solo visible si pasamos la función onEdit) */}
      {onEdit && (
        <button 
          onClick={(e) => { e.preventDefault(); onEdit(data); }}
          className="absolute top-3 right-3 z-30 p-2 bg-white/90 backdrop-blur text-slate-500 hover:text-teal-600 rounded-full shadow-sm border border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <PencilSquareIcon className="w-5 h-5" />
        </button>
      )}

      {/* Contenedor GIF */}
      <div className="aspect-video w-full overflow-hidden relative bg-slate-100">
        <div className="absolute inset-0 bg-teal-900/0 group-hover:bg-teal-900/10 transition-colors z-10" />
        <img 
          src={data.gif_url} 
          alt={data.title} 
          className="w-full h-full object-cover"
        />
        <span className="absolute bottom-2 left-2 z-20 bg-white/90 text-xs font-semibold px-2 py-1 rounded text-teal-700 shadow-sm">
            {data.category}
        </span>
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-teal-600 transition-colors">
          {data.title}
        </h3>
        <p className="text-sm text-slate-500 mb-4 line-clamp-2 leading-relaxed">
          {data.description}
        </p>
        
        <a 
          href={data.download_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2.5 bg-teal-50 hover:bg-teal-100 text-teal-700 text-sm font-medium rounded-xl transition-all border border-teal-100"
        >
          <ArrowDownTrayIcon className="w-5 h-5" />
          Descargar
        </a>
      </div>
    </div>
  );
}