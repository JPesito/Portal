import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Verificar si el usuario tiene la cookie de sesión
  const hasSession = request.cookies.has('session_access');
  
  // Si NO tiene sesión y NO está intentando entrar al login...
  if (!hasSession && !request.nextUrl.pathname.startsWith('/login')) {
    // ...lo mandamos a la página de login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Si YA tiene sesión y trata de entrar al login, lo mandamos al home
  if (hasSession && request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// Configuración: A qué rutas afecta
export const config = {
  matcher: [
    /*
     * Afecta a todas las rutas EXCEPTO:
     * - api (rutas API)
     * - _next/static (archivos estáticos)
     * - _next/image (imágenes optimizadas)
     * - favicon.ico, lotties, etc (archivos públicos)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|lotties|.*\\..*).*)',
  ],
};