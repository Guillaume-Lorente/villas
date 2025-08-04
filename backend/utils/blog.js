const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const { remark } = require("remark");
const html = require("remark-html");

const postsDirectory = path.join(process.cwd(), "content/blog");

async function getPostBySlug(slug) {
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

function getAllPosts() {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const { data, content } = matter(fileContents);

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

module.exports = {
  getPostBySlug,
  getAllPosts,
};
