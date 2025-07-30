import { NextResponse } from "next/server";

export async function GET() {
  // Supprime le cookie admin-auth
  const response = NextResponse.redirect(
    new URL("/admin/login", process.env.NEXT_PUBLIC_API_BASE_URL)
  );
  response.cookies.set("admin-auth", "", {
    httpOnly: true,
    path: "/",
    expires: new Date(0),
  });
  return response;
}
