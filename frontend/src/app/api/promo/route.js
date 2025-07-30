import fs from "fs";
import path from "path";

const promoPath = path.join(process.cwd(), "data", "promoConfig.json");

export async function GET() {
  try {
    const json = fs.readFileSync(promoPath, "utf-8");
    const data = JSON.parse(json);
    return Response.json(data);
  } catch (err) {
    console.error("Erreur lecture promoConfig:", err);
    return Response.json(
      { error: "Impossible de lire les données" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();

    fs.writeFileSync(promoPath, JSON.stringify(body, null, 2), "utf-8");

    return Response.json({ success: true });
  } catch (err) {
    console.error("Erreur écriture promoConfig:", err);
    return Response.json(
      { error: "Impossible d'enregistrer les données" },
      { status: 500 }
    );
  }
}
