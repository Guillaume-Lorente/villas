import { NextResponse } from "next/server";
import { SignJWT } from "jose";

// Clé secrète JWT depuis .env
const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function POST(req) {
  const { password } = await req.json();

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: "Mot de passe incorrect" },
      { status: 401 }
    );
  }

  // Générer un JWT valable 7 jours
  const token = await new SignJWT({ admin: true })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(secret);

  // Définir le cookie dans la réponse
  const res = NextResponse.json({ success: true });
  res.cookies.set("admin-auth", token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 jours
  });

  return res;
}
