import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const villaId = searchParams.get("villaId");

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/reservations?villaId=${villaId}`
    );
    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Erreur côté frontend API:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des réservations" },
      { status: 500 }
    );
  }
}
