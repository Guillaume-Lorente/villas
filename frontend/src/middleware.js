import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

// 🔑 Clé secrète JWT, lisible depuis .env
const secret = new TextEncoder().encode(process.env.JWT_SECRET);

// 🔐 Fonction utilitaire pour vérifier le token JWT
async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (e) {
    return null;
  }
}

export async function middleware(request) {
  // ✅ Utilise maintenant le bon nom de cookie : admin-token
  const token = request.cookies.get("admin-auth")?.value;

  const protectedPaths = ["/admin", "/admin/create", "/admin/edit"];
  const pathname = request.nextUrl.pathname;
  const pathIsProtected = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );

  // 🚪 Laisse passer les pages publiques ou la page de login
  if (!pathIsProtected || pathname === "/admin/login") {
    return NextResponse.next();
  }

  // 🔐 Vérification du token
  const isValid = token && (await verifyToken(token));

  if (!isValid) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
