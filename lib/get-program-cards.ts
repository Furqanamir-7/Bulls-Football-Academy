import fs from "node:fs";
import path from "node:path";
import type { ProgramCard } from "@/lib/site-data";
import { PROGRAM_CARDS_FALLBACK } from "@/lib/site-data";

/** Maps program slug -> folder under `public/images/programs/`. */
const PROGRAM_GALLERY_RULES: Record<string, { folder: string; filePrefix?: string }> = {
  "senior-pro-squad": { folder: "senior-pro" },
  "junior-pro-squad": { folder: "junior-pro" },
  "all-girls-squad": { folder: "all-girls" },
  "game-changers-development": { folder: "game-changers" },
};

const IMAGE_EXT = /\.(jpe?g|png|webp|gif|avif)$/i;

function listGalleryUrlsForFolder(programFolder: string, filePrefix?: string): string[] {
  const abs = path.join(process.cwd(), "public", "images", "programs", programFolder);
  if (!fs.existsSync(abs) || !fs.statSync(abs).isDirectory()) return [];

  const prefix = filePrefix?.toLowerCase() ?? "";

  const files = fs
    .readdirSync(abs, { withFileTypes: true })
    .filter((ent) => ent.isFile())
    .map((ent) => ent.name)
    .filter((name) => IMAGE_EXT.test(name) && !(name.startsWith(".") || name === ".gitkeep"))
    .filter((name) => {
      if (!prefix) return true;
      return name.toLowerCase().startsWith(prefix);
    })
    .sort((a, b) =>
      a.localeCompare(b, undefined, {
        numeric: true,
        sensitivity: "base",
      }),
    );

  return files.map((name) => `/images/programs/${programFolder}/${encodeURIComponent(name)}`);
}

/** Local images override Unsplash fallback when `/public/images/programs/...` has files. */
export function getProgramCards(): ProgramCard[] {
  return PROGRAM_CARDS_FALLBACK.map((card) => {
    const rule = PROGRAM_GALLERY_RULES[card.slug];
    if (!rule) return card;

    const urls = listGalleryUrlsForFolder(rule.folder, rule.filePrefix);
    if (urls.length === 0) return card;

    const [previewImage, ...galleryImages] = urls;
    return {
      ...card,
      previewImage,
      galleryImages: galleryImages.length > 0 ? galleryImages : undefined,
    };
  });
}
