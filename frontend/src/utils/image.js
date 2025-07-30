export async function resizeAndConvertImage(
  file,
  size = 1200,
  slug = "blog-image"
) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = document.createElement("canvas");

      // CROP au centre pour carré ou ratio fixe (ex: 3:2 ici)
      const targetRatio = 3 / 2;
      let sx = 0,
        sy = 0,
        sw = img.width,
        sh = img.height;

      const currentRatio = img.width / img.height;

      if (currentRatio > targetRatio) {
        // Trop large
        sw = img.height * targetRatio;
        sx = (img.width - sw) / 2;
      } else {
        // Trop haut
        sh = img.width / targetRatio;
        sy = (img.height - sh) / 2;
      }

      canvas.width = size;
      canvas.height = size / targetRatio;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        (blob) => {
          const timestamp = new Date().toISOString().slice(0, 10); // ex: 2025-07-23
          const fileName = `${slug}-${timestamp}.webp`;

          const newFile = new File([blob], fileName, {
            type: "image/webp",
            lastModified: Date.now(),
          });
          resolve(newFile);
        },
        "image/webp",
        0.8
      );
    };
  });
}
