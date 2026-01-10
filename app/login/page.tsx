"use client";
import { useState } from "react";
import { loginAction } from "./actions";
import { LockClosedIcon, FingerPrintIcon } from "@heroicons/react/24/outline";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError("");
    
    const result = await loginAction(formData);
    
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B1120] relative overflow-hidden px-4">
      
      {/* --- FONDO ANIMADO --- */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-teal-500/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px] pointer-events-none" />
      
      {/* --- TARJETA GLASSMORPHISM --- */}
      <div className="max-w-md w-full bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative z-10 overflow-hidden">
        
        {/* Brillo superior en la tarjeta */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-teal-500/50 to-transparent opacity-50" />

        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-white/10 shadow-[0_0_30px_-10px_rgba(20,184,166,0.3)] transform rotate-3 hover:rotate-0 transition-all duration-500 group">
            <LockClosedIcon className="w-8 h-8 text-teal-400 group-hover:text-teal-300 transition-colors" />
          </div>
          
          <h1 className="text-3xl font-black text-white mb-2 tracking-tight">
            Restricted <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">Area</span>
          </h1>
          <p className="text-slate-400 text-sm font-medium">
            Sistema de gestión protegido.
          </p>
        </div>

        <form action={handleSubmit} className="space-y-6">
          <div className="relative group">
            {/* Icono dentro del input */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-teal-400 transition-colors">
                <FingerPrintIcon className="w-6 h-6" />
            </div>
            
            <input 
              name="password"
              type="password" 
              required
              autoFocus
              placeholder="Ingresa tu Clave Maestra"
              className="w-full pl-12 pr-4 py-4 bg-slate-950/50 border border-slate-700/50 rounded-2xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all text-lg tracking-wide shadow-inner"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center font-bold animate-shake">
              {error}
            </div>
          )}

          <button 
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-bold rounded-2xl shadow-lg shadow-teal-500/20 transition-all transform hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed border border-white/10"
          >
            {loading ? (
                <span className="flex items-center justify-center gap-2">
                    <span className="w-2 h-2 bg-white rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-100"></span>
                    <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-200"></span>
                </span>
            ) : "Desbloquear Acceso"}
          </button>
        </form>
        
        <div className="mt-10 pt-6 border-t border-white/5 text-center">
            <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold">
                Secure Connection v2.0
            </p>
        </div>
      </div>
    </div>
  );
}