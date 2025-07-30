import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/blog");

export async function GET(_, { params }) {
  const { slug } = params;
  const filePath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return new Response(JSON.stringify({ error: "Article introuvable" }), {
      status: 404,
    });
  }

  const content = fs.readFileSync(filePath, "utf8");
  const { data, content: markdown } = matter(content);

  return new Response(JSON.stringify({ ...data, content: markdown }), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function PUT(req, { params }) {
  const { slug } = params;
  const body = await req.json();

  const { title, category, date, image, content } = body;

  const filePath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return new Response(JSON.stringify({ error: "Fichier non trouvé" }), {
      status: 404,
    });
  }

  const markdown = `---
title: "${title}"
slug: "${slug}"
category: "${category || ""}"
date: "${date || new Date().toISOString()}"
image: "${image || ""}"
---

${content || ""}
`;

  fs.writeFileSync(filePath, markdown, "utf8");

  return new Response(JSON.stringify({ success: true }));
}

export async function DELETE(_, { params }) {
  const { slug } = params;
  const filePath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return new Response(JSON.stringify({ error: "Fichier introuvable" }), {
      status: 404,
    });
  }

  fs.unlinkSync(filePath);

  return new Response(JSON.stringify({ success: true }));
}
