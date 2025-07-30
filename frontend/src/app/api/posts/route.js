import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { NextResponse } from "next/server";

const POSTS_DIR = path.join(process.cwd(), "content", "blog");
const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");

// S'assurer que le dossier uploads existe
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// ✅ GET – Liste tous les articles
export async function GET() {
  const files = fs.readdirSync(POSTS_DIR);
  const posts = files.map((filename) => {
    const filePath = path.join(POSTS_DIR, filename);
    const content = fs.readFileSync(filePath, "utf8");
    const { data } = matter(content);

    return {
      slug: filename.replace(/\.md$/, ""),
      ...data,
    };
  });

  return NextResponse.json(posts);
}

// ✅ POST – Crée un nouvel article
export async function POST(req) {
  const formData = await req.formData();

  const title = formData.get("title");
  const slug = formData.get("slug");
  const date = formData.get("date");
  const category = formData.get("category");
  const body = formData.get("body");
  const imageFile = formData.get("image");

  let imagePath = "";

  if (imageFile && imageFile.name) {
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const ext = imageFile.name.split(".").pop();
    const filename = `${slug}.${ext}`;
    const fullPath = path.join(UPLOADS_DIR, filename);
    fs.writeFileSync(fullPath, buffer);
    imagePath = `/uploads/${filename}`;
  }

  const markdown = matter.stringify(body, {
    title,
    date,
    category,
    image: imagePath,
  });

  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  fs.writeFileSync(filePath, markdown, "utf8");

  return NextResponse.json({ message: "Article créé." }, { status: 201 });
}

// ✅ PUT – Met à jour un article existant
export async function PUT(req) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "Slug requis" }, { status: 400 });
  }

  const formData = await req.formData();

  const title = formData.get("title");
  const date = formData.get("date");
  const category = formData.get("category");
  const body = formData.get("body");
  const imageFile = formData.get("image");

  let imagePath = "";

  if (imageFile && imageFile.name) {
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const ext = imageFile.name.split(".").pop();
    const filename = `${slug}.${ext}`;
    const fullPath = path.join(UPLOADS_DIR, filename);
    fs.writeFileSync(fullPath, buffer);
    imagePath = `/uploads/${filename}`;
  } else {
    // Préserver l'image existante
    const existingPath = path.join(POSTS_DIR, `${slug}.md`);
    if (fs.existsSync(existingPath)) {
      const existingContent = fs.readFileSync(existingPath, "utf8");
      const { data } = matter(existingContent);
      imagePath = data.image || "";
    }
  }

  const markdown = matter.stringify(body, {
    title,
    date,
    category,
    image: imagePath,
  });

  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  fs.writeFileSync(filePath, markdown, "utf8");

  return NextResponse.json({ message: "Article mis à jour." });
}

// ✅ DELETE – Supprime un article
export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "Slug requis" }, { status: 400 });
  }

  const filePath = path.join(POSTS_DIR, `${slug}.md`);

  try {
    fs.unlinkSync(filePath);
    return NextResponse.json({ message: "Article supprimé." });
  } catch (err) {
    return NextResponse.json(
      { error: "Erreur lors de la suppression." },
      { status: 500 }
    );
  }
}
