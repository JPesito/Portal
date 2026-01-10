"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const password = formData.get("password") as string;
  const correctPassword = process.env.ACCESS_PASSWORD;

  // --- DEBUGGING (Bórralo cuando ya funcione) ---
  console.log("------------------------------------------------");
  console.log("🔍 DEBUG LOGIN:");
  console.log("• Lo que escribiste:", `'${password}'`);
  console.log("• Lo que espera el .env:", `'${correctPassword}'`);
  console.log("¿Son iguales?:", password === correctPassword);
  console.log("------------------------------------------------");

  // Pequeña pausa de seguridad (sensación de proceso)
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Validación estricta (trim quita espacios accidentales al inicio/final)
  if (correctPassword && password.trim() === correctPassword.trim()) {
    
    const cookieStore = await cookies();
    
    cookieStore.set("session_access", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 días
      path: "/",
    });
    
    redirect("/"); 
  } else {
    return { error: "Acceso Denegado: Clave incorrecta" };
  }
}