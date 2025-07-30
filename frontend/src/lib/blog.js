import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "content/blog");

export async function getPostBySlug(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);
  const processedContent = await remark().use(html).process(content);

  return {
    slug,
    ...data,
    content: processedContent.toString(),
  };
}

export function getAllPosts() {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const { data, content } = matter(fileContents);

    // Si pas d'excerpt défini, on génère les 250 premiers caractères du contenu brut
    const excerpt = data.excerpt
      ? data.excerpt
      : content
          .replace(/[#_*>\[\]`>!-]/g, "")
          .slice(0, 250)
          .trim() + "...";

    return {
      slug,
      ...data,
      excerpt,
    };
  });
}
