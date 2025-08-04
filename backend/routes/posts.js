const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const matter = require("gray-matter");
const { verifyAdminToken } = require("../middleware/auth");

const router = express.Router();

const POSTS_DIR = path.join(process.cwd(), "content", "blog");
const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");

// Multer pour gérer les fichiers
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ✅ GET tous les articles
router.get("/", (req, res) => {
  try {
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
  } catch (err) {
    res.status(500).json({ error: "Erreur récupération posts." });
  }
});

// ✅ GET article par slug
router.get("/:slug", (req, res) => {
  const { slug } = req.params;
  const filePath = path.join(POSTS_DIR, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "Article introuvable" });
  }

  try {
    const content = fs.readFileSync(filePath, "utf8");
    const { data, content: markdown } = matter(content);
    res.json({ ...data, content: markdown });
  } catch (err) {
    res.status(500).json({ error: "Erreur récupération post." });
  }
});

// ✅ POST – Créer un article
router.post("/", verifyAdminToken, upload.single("image"), (req, res) => {
  const { title, slug, date, category, body } = req.body;

  let imagePath = "";
  if (req.file) {
    const ext = path.extname(req.file.originalname);
    const filename = `${slug}${ext}`;
    const fullPath = path.join(UPLOADS_DIR, filename);
    fs.writeFileSync(fullPath, req.file.buffer);
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

  res.status(201).json({ message: "Article créé." });
});

// ✅ PUT – Mettre à jour un article
router.put("/:slug", upload.single("image"), (req, res) => {
  const { slug } = req.params;
  const { title, category, date, body } = req.body;

  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "Fichier non trouvé" });
  }

  let imagePath = req.body.image || "";
  if (req.file) {
    const ext = path.extname(req.file.originalname);
    const filename = `${slug}${ext}`;
    const fullPath = path.join(UPLOADS_DIR, filename);
    fs.writeFileSync(fullPath, req.file.buffer);
    imagePath = `/uploads/${filename}`;
  }

  const markdown = matter.stringify(body, {
    title,
    slug,
    category: category || "",
    date: date || new Date().toISOString(),
    image: imagePath,
  });

  fs.writeFileSync(filePath, markdown, "utf8");

  res.json({ success: true });
});

// ✅ DELETE – Supprimer un article
router.delete("/:slug", verifyAdminToken, (req, res) => {
  const { slug } = req.params;
  const filePath = path.join(POSTS_DIR, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "Fichier introuvable" });
  }

  fs.unlinkSync(filePath);
  res.json({ success: true });
});

module.exports = router;
