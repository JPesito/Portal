"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const password = formData.get("password");
  const correctPassword = process.env.ACCESS_PASSWORD;

  // Pequeña pausa de seguridad
  await new Promise((resolve) => setTimeout(resolve, 800));

  if (password === correctPassword) {
    
    // --- AQUÍ ESTABA EL ERROR ---
    // Agregamos 'await' antes de cookies()
    const cookieStore = await cookies(); 
    
    cookieStore.set("session_access", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 días
      path: "/",
    });
    
    redirect("/"); 
  } else {
    return { error: "Código de acceso incorrecto" };
  }
}