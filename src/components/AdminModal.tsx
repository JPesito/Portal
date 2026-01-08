"use client";
import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/src/lib/supabase';
import { useRouter } from 'next/navigation';
import { CloudArrowUpIcon, PhotoIcon } from '@heroicons/react/24/outline';

export default function AdminModal({ isOpen, onClose, editingWidget }: any) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null); // Referencia oculta
  
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  // Estado del formulario
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'General',
    gif_url: '', // Aquí guardaremos la URL que nos devuelva Supabase
    download_url: ''
  });

  // Rellenar datos si editamos
  useEffect(() => {
    if (editingWidget) {
      setFormData(editingWidget);
    } else {
      setFormData({ title: '', description: '', category: 'General', gif_url: '', download_url: '' });
    }
  }, [editingWidget]);

  // --- LÓGICA DE SUBIDA DE IMAGEN ---
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploadingImage(true);
      
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('Debes seleccionar una imagen para subir.');
      }

      const file = event.target.files[0];
      // Creamos un nombre único para que no se sobreescriban archivos
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `${fileName}`;

      // 1. Subir al Bucket 'media'
      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // 2. Obtener la URL pública
      const { data } = supabase.storage.from('media').getPublicUrl(filePath);
      
      // 3. Guardar la URL en el formulario
      setFormData(prev => ({ ...prev, gif_url: data.publicUrl }));

    } catch (error: any) {
      alert('Error subiendo imagen: ' + error.message);
    } finally {
      setUploadingImage(false);
    }
  };

  // --- LÓGICA CRUD (Igual que antes) ---
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    if (editingWidget) {
      const { error } = await supabase.from('widgets').update(formData).eq('id', editingWidget.id);
      if (error) alert(error.message);
    } else {
      const { error } = await supabase.from('widgets').insert([formData]);
      if (error) alert(error.message);
    }

    setLoading(false);
    router.refresh();
    onClose();
  }

  // Lógica borrar...
  async function handleDelete() {
    if (!confirm('¿Borrar widget?')) return;
    setLoading(true);
    await supabase.from('widgets').delete().eq('id', editingWidget.id);
    setLoading(false);
    router.refresh();
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm transition-all">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 border border-slate-100 max-h-[90vh] overflow-y-auto">
        
        <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">
          {editingWidget ? 'Editar Widget' : 'Nuevo Recurso'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* --- INPUT DE NOMBRE --- */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Nombre</label>
            <input 
              required
              className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none transition-all"
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
            />
          </div>

          {/* --- UPLOAD DE IMAGEN (NUEVO) --- */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Vista Previa (GIF/Imagen)</label>
            
            <div 
                className="relative group w-full h-48 bg-slate-50 rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center cursor-pointer hover:border-teal-500 hover:bg-teal-50/30 transition-all overflow-hidden"
                onClick={() => fileInputRef.current?.click()}
            >
                {/* Input invisible */}
                <input 
                    type="file" 
                    ref={fileInputRef}
                    className="hidden" 
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploadingImage}
                />

                {uploadingImage ? (
                     <div className="text-teal-600 animate-pulse font-medium">Subiendo archivo...</div>
                ) : formData.gif_url ? (
                    <>
                        <img src={formData.gif_url} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-white font-medium flex gap-2"><PhotoIcon className="w-5 h-5"/> Cambiar Imagen</span>
                        </div>
                    </>
                ) : (
                    <div className="text-center p-4">
                        <CloudArrowUpIcon className="w-8 h-8 mx-auto text-slate-400 mb-2" />
                        <p className="text-sm text-slate-500">Haz clic para subir GIF o Imagen</p>
                    </div>
                )}
            </div>
          </div>

          {/* --- FILA DOBLE --- */}
          <div className="grid grid-cols-2 gap-4">
             <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Categoría</label>
                <select 
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-teal-500 outline-none"
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value})}
                >
                  <option>Menús</option>
                  <option>Botones</option>
                  <option>Cursores</option>
                  <option>3D</option>
                  <option>General</option>
                </select>
             </div>
             <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Link de Descarga</label>
                <input 
                  required
                  placeholder="https://drive..."
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-teal-500 outline-none"
                  value={formData.download_url}
                  onChange={e => setFormData({...formData, download_url: e.target.value})}
                />
             </div>
          </div>

          {/* --- DESCRIPCION --- */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Descripción</label>
            <textarea 
              required
              rows={3}
              className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-teal-500 outline-none resize-none"
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
            />
          </div>

          {/* --- BOTONES --- */}
          <div className="flex gap-3 pt-2 border-t border-slate-100 mt-4">
            {editingWidget && (
              <button 
                type="button"
                onClick={handleDelete}
                className="px-4 py-2 text-red-500 bg-red-50 hover:bg-red-100 rounded-lg font-medium text-sm transition-colors"
              >
                Eliminar
              </button>
            )}
            
            <div className="flex-1 flex gap-3 justify-end">
                <button 
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  disabled={loading || uploadingImage}
                  className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-bold shadow-md shadow-teal-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Guardando...' : 'Guardar'}
                </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}