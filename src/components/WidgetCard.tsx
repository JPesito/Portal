import { ArrowDownTrayIcon } from '@heroicons/react/24/solid';

interface WidgetProps {
  title: string;
  description: string;
  gif_url: string;
  download_url: string;
  category: string;
}

export default function WidgetCard({ data }: { data: WidgetProps }) {
  return (
    <div className="group relative bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(99,102,241,0.3)]">
      
      {/* Contenedor GIF */}
      <div className="aspect-video w-full overflow-hidden relative bg-slate-950">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent z-10 opacity-60" />
        <img 
          src={data.gif_url} 
          alt={data.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <span className="absolute top-2 right-2 z-20 bg-black/60 text-xs px-2 py-1 rounded-md text-slate-300 border border-white/10 backdrop-blur">
            {data.category}
        </span>
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors">
          {data.title}
        </h3>
        <p className="text-sm text-slate-400 mb-4 line-clamp-2 leading-relaxed">
          {data.description}
        </p>
        
        <a 
          href={data.download_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2.5 bg-white/5 hover:bg-indigo-600 text-white text-sm font-medium rounded-lg transition-all border border-white/5 hover:border-transparent"
        >
          <ArrowDownTrayIcon className="w-4 h-4" />
          Descargar Recurso
        </a>
      </div>
    </div>
  );
}