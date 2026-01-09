"use client";
import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/src/lib/supabase';
import { useRouter } from 'next/navigation';
import { CloudArrowUpIcon, PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useLottie } from "lottie-react";
import catAnimation from "../../public/lotties/cat.json";

export default function AdminModal({ isOpen, onClose, editingWidget }: any) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '', description: '', category: 'General', gif_url: '', download_url: ''
  });

  const catOptions = {
    animationData: catAnimation,
    loop: true,
    autoplay: true,
  };
  const { View: CatView } = useLottie(catOptions);

  useEffect(() => {
    if (isOpen) {
      setShowModal(true);
      if (editingWidget) {
        setFormData(editingWidget);
      } else {
        setFormData({ title: '', description: '', category: 'General', gif_url: '', download_url: '' });
      }
    } else {
      const timer = setTimeout(() => setShowModal(false), 300); 
      return () => clearTimeout(timer);
    }
  }, [isOpen, editingWidget]);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploadingImage(true);
      if (!event.target.files || event.target.files.length === 0) throw new Error('Selecciona imagen.');
      const file = event.target.files[0];
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${file.name.split('.').pop()}`;
      const { error } = await supabase.storage.from('media').upload(fileName, file);
      if (error) throw error;
      const { data } = supabase.storage.from('media').getPublicUrl(fileName);
      setFormData(prev => ({ ...prev, gif_url: data.publicUrl }));
    } catch (error: any) { alert(error.message); } finally { setUploadingImage(false); }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const query = editingWidget ? supabase.from('widgets').update(formData).eq('id', editingWidget.id) : supabase.from('widgets').insert([formData]);
    const { error } = await query;
    if (error) alert(error.message);
    setLoading(false); router.refresh(); onClose();
  }

  async function handleDelete() {
    if (!confirm('¿Borrar?')) return;
    setLoading(true); await supabase.from('widgets').delete().eq('id', editingWidget.id);
    setLoading(false); router.refresh(); onClose();
  }

  const inputStyle = "w-full p-2.5 text-sm rounded-lg bg-slate-50 border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none transition-all font-medium text-slate-700 placeholder-slate-400";
  const labelStyle = "block text-[0.7rem] font-bold text-slate-500 uppercase tracking-wider mb-1.5";

  return (
    <div className={`fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 transition-all duration-300 ${
      isOpen ? 'bg-slate-950/70 backdrop-blur-md opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
    }`}>
      <div className="absolute inset-0" onClick={onClose}></div>

      <div className={`bg-white w-full max-w-5xl rounded-[2rem] shadow-2xl border border-white/20 relative z-10 transition-all duration-500 ease-out transform overflow-hidden flex flex-col md:flex-row ${
        showModal ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-[100%] opacity-0 scale-95'
      }`}>
        
        <button onClick={onClose} className="absolute top-4 right-4 z-50 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors">
            <XMarkIcon className="w-6 h-6" />
        </button>

        {/* === COLUMNA IZQUIERDA: GATO === */}
        {/* Ancho reducido a md:w-[30%] (Angosta) */}
        <div className="w-full md:w-[30%] bg-teal-50/50 border-b-2 md:border-b-0 md:border-r-2 border-dashed border-slate-300 flex justify-center items-start overflow-hidden relative">
            
            {/* LOTTIE: 
                - md:w-[45rem]: Tamaño GIGANTE (no disminuido).
                - md:-mt-4: Bajado considerablemente (antes era -mt-24). 
                  Al ser menos negativo, baja hacia el centro.
            */}
            <div className="w-96 h-96 md:w-[45rem] md:h-[35rem] -mt-10 md:-mt-4 drop-shadow-xl pointer-events-none transform scale-150 origin-top">
                 {CatView}
            </div>
        </div>

        {/* === COLUMNA DERECHA: FORMULARIO === */}
        <div className="flex-1 p-6 sm:p-8 overflow-y-auto max-h-[70vh] md:max-h-[85vh]">
            <h2 className="text-xl font-bold text-slate-800 mb-6">
              {editingWidget ? 'Editar Widget' : 'Crear Nuevo Recurso'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* 1. NOMBRE */}
                <div>
                    <label className={labelStyle}>Nombre del Widget</label>
                    <input required className={inputStyle} value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="Ej: Menú Flotante 3D" />
                </div>

                {/* 2. FILA DIVIDIDA */}
                <div className="grid grid-cols-1 md:grid-cols-6 gap-5">
                    {/* Upload Imagen - Compacto */}
                    <div className="md:col-span-2">
                        <label className={labelStyle}>Vista Previa</label>
                        <div className="relative group w-full h-32 bg-slate-50 rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center cursor-pointer hover:border-teal-500 hover:bg-teal-50/30 transition-all overflow-hidden" onClick={() => fileInputRef.current?.click()}>
                            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploadingImage} />
                            {uploadingImage ? (
                                <div className="text-teal-600 animate-pulse font-bold text-xs">Subiendo...</div>
                            ) : formData.gif_url ? (
                                <><img src={formData.gif_url} alt="Preview" className="w-full h-full object-cover absolute inset-0" /><div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"><span className="text-white font-medium flex gap-1 text-xs"><PhotoIcon className="w-4 h-4"/> Cambiar</span></div></>
                            ) : (
                                <div className="flex flex-col items-center gap-1 p-2 text-center">
                                    <CloudArrowUpIcon className="w-5 h-5 text-teal-500" />
                                    <span className="text-[0.65rem] font-bold text-teal-700 leading-tight">Subir Img</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Inputs Apilados */}
                    <div className="md:col-span-4 flex flex-col gap-3">
                        <div>
                            <label className={labelStyle}>Categoría</label>
                            <select className={inputStyle} value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                                <option>Menús</option><option>Botones</option><option>Cursores</option><option>3D</option><option>General</option>
                            </select>
                        </div>
                        <div>
                            <label className={labelStyle}>Link Descarga</label>
                            <input required placeholder="https://..." className={inputStyle} value={formData.download_url} onChange={e => setFormData({...formData, download_url: e.target.value})} />
                        </div>
                    </div>
                </div>

                {/* 3. DESCRIPCIÓN */}
                <div>
                    <label className={labelStyle}>Descripción</label>
                    <textarea required rows={4} className={`${inputStyle} resize-none`} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                </div>

                {/* BOTONES */}
                <div className="flex gap-3 pt-5 mt-6 border-t border-slate-100">
                    {editingWidget && <button type="button" onClick={handleDelete} className="px-4 py-2 text-red-500 bg-red-50 hover:bg-red-100 rounded-lg font-bold text-xs transition-colors">Eliminar</button>}
                    <div className="flex-1 flex gap-3 justify-end">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-slate-500 hover:bg-slate-100 rounded-lg font-bold text-sm transition-colors">Cancelar</button>
                        <button type="submit" disabled={loading || uploadingImage} className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-bold text-sm shadow-md shadow-teal-500/20 transition-all hover:scale-105 disabled:opacity-50 disabled:scale-100">{loading ? '...' : 'Guardar Widget'}</button>
                    </div>
                </div>

            </form>
        </div>
      </div>
    </div>
  );
}