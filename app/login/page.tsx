"use client";
import { useState } from "react";
import { loginAction } from "./actions"; // Importaremos esto luego
import { LockClosedIcon } from "@heroicons/react/24/solid";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError("");
    
    // Llamamos a la acción del servidor
    const result = await loginAction(formData);
    
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
    // Si es exitoso, la acción hará el redirect automáticamente
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        
        {/* Decoración de fondo */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 via-purple-500 to-teal-500" />
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-700 shadow-inner">
            <LockClosedIcon className="w-8 h-8 text-teal-500" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Acceso Restringido</h1>
          <p className="text-slate-400 text-sm">Introduce el código de acceso para entrar a la biblioteca.</p>
        </div>

        <form action={handleSubmit} className="space-y-4">
          <div>
            <input 
              name="password"
              type="password" 
              required
              placeholder="Código de acceso..."
              className="w-full p-4 bg-slate-950 border border-slate-800 text-white rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all text-center tracking-widest text-lg placeholder:tracking-normal placeholder:text-slate-600"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-center font-medium animate-pulse">
              {error}
            </div>
          )}

          <button 
            disabled={loading}
            className="w-full py-4 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl shadow-lg shadow-teal-500/20 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Verificando..." : "Desbloquear Sistema"}
          </button>
        </form>
        
        <p className="text-center mt-8 text-xs text-slate-600 font-mono">
          SECURE SYSTEM v2.0
        </p>
      </div>
    </div>
  );
}