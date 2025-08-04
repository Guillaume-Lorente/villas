const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const POSTS_DIR = path.join(process.cwd(), "content", "blog");
const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");

// S’assurer que le dossier uploads existe
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// ✅ GET – Liste tous les articles
router.get("/", (req, res) => {
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

  res.json(posts);
});

// ✅ POST – Crée un article
router.post("/", async (req, res) => {
  const formData = req.body;
  const { title, slug, date, category, body, image } = formData;

  let imagePath = image || "";

  const markdown = matter.stringify(body, {
    title,
    date,
    category,
    image: imagePath,
  });

  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  fs.writeFileSync(filePath, markdown, "utf8");

  res.status(201).json({ message: "Article créé." });
});

// ✅ PUT – Met à jour
router.put("/", (req, res) => {
  const slug = req.query.slug;
  if (!slug) return res.status(400).json({ error: "Slug requis" });

  const { title, date, category, body, image } = req.body;

  let imagePath = image || "";

  const existingPath = path.join(POSTS_DIR, `${slug}.md`);
  if (fs.existsSync(existingPath)) {
    const existingContent = fs.readFileSync(existingPath, "utf8");
    const { data } = matter(existingContent);
    imagePath = image || data.image || "";
  }

  const markdown = matter.stringify(body, {
    title,
    date,
    category,
    image: imagePath,
  });

  fs.writeFileSync(existingPath, markdown, "utf8");

  res.json({ message: "Article mis à jour." });
});

// ✅ DELETE – Supprime
router.delete("/", (req, res) => {
  const slug = req.query.slug;
  if (!slug) return res.status(400).json({ error: "Slug requis" });

  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "Fichier introuvable" });
  }

  fs.unlinkSync(filePath);
  res.json({ message: "Article supprimé." });
});

module.exports = router;
