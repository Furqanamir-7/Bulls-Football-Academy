#!/usr/bin/env node
/**
 * Copies program photos from Bulls Media into public/images/programs/*
 * so they deploy with the site (Bulls Media stays out via .vercelignore).
 *
 * Sources (preferred first):
 * - Desktop/Senior(s) Real -> senior-pro
 * - Desktop/Juniors Real (fallback: Desktop/juniors) -> junior-pro
 * - Project folder "Girls Pro Squad Program" -> all-girls (after legacy rules; wins)
 * - Legacy root-name rules (SrPro_, JrPro_, AGirls_|Girls_, GC_) for compatibility
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const desktopDir = path.join(process.env.USERPROFILE ?? "", "Desktop");
const srcDir = path.join(root, "Bulls Media");
const destRoot = path.join(root, "public", "images", "programs");

const FOLDER_RULES = [
  {
    sourceCandidates: [
      path.join(desktopDir, "senior real"),
      path.join(desktopDir, "Senior Real"),
      path.join(desktopDir, "Seniors Real"),
      path.join(desktopDir, "seniors real"),
      path.join(srcDir, "seniors"),
    ],
    segment: "senior-pro",
    maxFiles: 25,
  },
  {
    sourceCandidates: [
      path.join(desktopDir, "juniors real"),
      path.join(desktopDir, "Juniors Real"),
      path.join(desktopDir, "juniors"),
      path.join(srcDir, "juniors"),
    ],
    segment: "junior-pro",
    maxFiles: 25,
  },
];
const GAME_CHANGERS_FROM_EACH = 12;

const ALL_GIRLS_SEGMENT = "all-girls";
const ALL_GIRLS_SOURCE_CANDIDATES = [path.join(root, "Girls Pro Squad Program")];
/** Total cap for All Girls (deployment size); includes digit-named finals 1–6 when present */
const ALL_GIRLS_MAX_TOTAL = 25;

const RULES = [
  { test: (n) => /^(AGirls|Girls)_/i.test(n), segment: "all-girls" },
  { test: (n) => /^GC_/i.test(n), segment: "game-changers" },
];

const IMAGE_EXT = /\.(jpe?g|png|webp|gif|avif)$/i;

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function copyFile(src, dest) {
  ensureDir(path.dirname(dest));
  fs.copyFileSync(src, dest);
}

function listImageFiles(absDir) {
  if (!fs.existsSync(absDir) || !fs.statSync(absDir).isDirectory()) return [];
  return fs
    .readdirSync(absDir, { withFileTypes: true })
    .filter((d) => d.isFile())
    .map((d) => d.name)
    .filter((name) => IMAGE_EXT.test(name))
    .sort((a, b) =>
      a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }),
    );
}

function uniqueNamesCaseInsensitive(names) {
  const seen = new Set();
  const out = [];
  for (const name of names) {
    const k = name.toLowerCase();
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(name);
  }
  return out;
}

function stableHash(input) {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (h * 31 + input.charCodeAt(i)) >>> 0;
  }
  return h;
}

function extractNumericToken(name) {
  const m = name.match(/(\d{2,})/);
  return m ? Number.parseInt(m[1], 10) : null;
}

/**
 * Spread similar capture sequences (often same person/action) apart:
 * - randomize first
 * - then round-robin filename-number buckets to avoid adjacent close shots
 */
function spreadSimilarShots(names) {
  const shuffled = [...names].sort((a, b) => {
    const ah = stableHash(a.toLowerCase());
    const bh = stableHash(b.toLowerCase());
    if (ah !== bh) return ah - bh;
    return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
  });
  const buckets = [[], [], [], [], []];
  for (const name of shuffled) {
    const token = extractNumericToken(name);
    const idx = token == null ? 0 : token % buckets.length;
    buckets[idx].push(name);
  }
  const out = [];
  let keepGoing = true;
  while (keepGoing) {
    keepGoing = false;
    for (const b of buckets) {
      if (b.length > 0) {
        out.push(b.shift());
        keepGoing = true;
      }
    }
  }
  return out;
}

function pickProgramFiles(absDir, limit) {
  const names = uniqueNamesCaseInsensitive(listImageFiles(absDir));
  return pickProgramFilesFromNameList(absDir, names, limit);
}

function pickProgramFilesFromNameList(absDir, nameList, limit) {
  const names = uniqueNamesCaseInsensitive(nameList);
  if (names.length === 0 || limit <= 0) return [];
  const lighter = names
    .map((name) => ({ name, size: fs.statSync(path.join(absDir, name)).size }))
    .sort((a, b) => a.size - b.size || a.name.localeCompare(b.name))
    .slice(0, Math.max(limit * 2, limit))
    .map((x) => x.name);
  return spreadSimilarShots(lighter).slice(0, limit);
}

/** Single-digit root names (1.jpeg … 6.png) used as “finale” picks for All Girls */
function pickRequiredDigitFilenames(allNames) {
  const required = [];
  const lowered = new Set();
  for (let n = 1; n <= 6; n += 1) {
    const pattern = new RegExp(`^${n}\\.(jpe?g|png|webp|gif|avif)$`, "i");
    const found = allNames.find((name) => pattern.test(name));
    if (!found) continue;
    const k = found.toLowerCase();
    if (lowered.has(k)) continue;
    lowered.add(k);
    required.push(found);
  }
  return required;
}

function resolveFirstExistingDir(candidates) {
  for (const dir of candidates) {
    if (fs.existsSync(dir) && fs.statSync(dir).isDirectory()) return dir;
  }
  return null;
}

function clearSegmentFolder(segment) {
  const dir = path.join(destRoot, segment);
  ensureDir(dir);
  const existing = fs.readdirSync(dir, { withFileTypes: true });
  for (const ent of existing) {
    if (!ent.isFile()) continue;
    if (ent.name === ".gitkeep") continue;
    fs.rmSync(path.join(dir, ent.name), { force: true });
  }
}

const hasBullsMedia = fs.existsSync(srcDir) && fs.statSync(srcDir).isDirectory();
if (!hasBullsMedia) {
  console.warn(
    "[sync-program-media] No ./Bulls Media folder — skipping senior/junior/game-changers/root-prefix sync.",
  );
}

let copied = 0;
let skippedOther = 0;

// 1) Preferred: dedicated seniors/juniors folders
if (hasBullsMedia) {
for (const rule of FOLDER_RULES) {
  const fromDir = resolveFirstExistingDir(rule.sourceCandidates);
  if (!fromDir) continue;
  const names = pickProgramFiles(fromDir, rule.maxFiles);
  if (names.length === 0) continue;

  clearSegmentFolder(rule.segment);
  const toDir = path.join(destRoot, rule.segment);
  for (const name of names) {
    const from = path.join(fromDir, name);
    const to = path.join(toDir, name);
    copyFile(from, to);
    console.log(`[sync-program-media] ${path.basename(fromDir)}/${name} -> public/images/programs/${rule.segment}/`);
  }
  console.log(`[sync-program-media] ${rule.segment}: synced ${names.length} unique image(s) from ${fromDir}`);
}

// 1b) Mixed Game Changers set from seniors + juniors
{
  const seniorDir = path.join(srcDir, "seniors");
  const juniorDir = path.join(srcDir, "juniors");
  const seniors = pickProgramFiles(seniorDir, GAME_CHANGERS_FROM_EACH);
  const juniors = pickProgramFiles(juniorDir, GAME_CHANGERS_FROM_EACH);
  const toSegment = "game-changers";
  clearSegmentFolder(toSegment);
  const toDir = path.join(destRoot, toSegment);

  for (const name of seniors) {
    const from = path.join(seniorDir, name);
    const to = path.join(toDir, `S_${name}`);
    copyFile(from, to);
  }
  for (const name of juniors) {
    const from = path.join(juniorDir, name);
    const to = path.join(toDir, `J_${name}`);
    copyFile(from, to);
  }
  const total = seniors.length + juniors.length;
  if (total > 0) {
    console.log(
      `[sync-program-media] ${toSegment}: mixed ${seniors.length} seniors + ${juniors.length} juniors (${total} total).`,
    );
  }
}

// 2) Legacy compatibility: files in Bulls Media root by filename prefix
{
  const names = fs.readdirSync(srcDir, { withFileTypes: true }).filter((d) => d.isFile());

  for (const ent of names) {
    const name = ent.name;
    if (!IMAGE_EXT.test(name)) continue;
    const rule = RULES.find((r) => r.test(name));
    if (!rule) {
      skippedOther++;
      continue;
    }
    const destDir = path.join(destRoot, rule.segment);
    ensureDir(destDir);
    const from = path.join(srcDir, name);
    const to = path.join(destDir, name);
    copyFile(from, to);
    copied += 1;
    console.log(`[sync-program-media] ${name} → public/images/programs/${rule.segment}/`);
  }

  if (skippedOther > 0) {
    console.log(
      `[sync-program-media] Ignored ${skippedOther} images (rename with SrPro_/JrPro_/AGirls_|Girls_/GC_ prefixes to sync).`,
    );
  }
}
}

// 3) All Girls: dedicated project folder (runs last; replaces all-girls outputs from step 2)
{
  const girlsDir = resolveFirstExistingDir(ALL_GIRLS_SOURCE_CANDIDATES);
  if (!girlsDir) {
    console.warn(
      `[sync-program-media] No "Girls Pro Squad Program" folder — leaving ${ALL_GIRLS_SEGMENT} as-is.`,
    );
  } else {
    const allImageNames = uniqueNamesCaseInsensitive(listImageFiles(girlsDir));
    const requiredDigit = pickRequiredDigitFilenames(allImageNames);
    const requiredLower = new Set(requiredDigit.map((n) => n.toLowerCase()));
    const remainder = allImageNames.filter((n) => !requiredLower.has(n.toLowerCase()));
    const bestLimit = Math.max(0, ALL_GIRLS_MAX_TOTAL - requiredDigit.length);
    const bestNames = pickProgramFilesFromNameList(girlsDir, remainder, bestLimit);

    clearSegmentFolder(ALL_GIRLS_SEGMENT);
    const toDir = path.join(destRoot, ALL_GIRLS_SEGMENT);
    ensureDir(toDir);

    let pickIdx = 0;
    for (const name of bestNames) {
      pickIdx += 1;
      const destName = `GP-PICK-${String(pickIdx).padStart(2, "0")}_${name}`;
      copyFile(path.join(girlsDir, name), path.join(toDir, destName));
      console.log(
        `[sync-program-media] Girls Pro Squad/${name} -> public/images/programs/${ALL_GIRLS_SEGMENT}/${destName}`,
      );
    }

    const digitOrder = ["1", "2", "3", "4", "5", "6"];
    for (const d of digitOrder) {
      const match = requiredDigit.find((fname) =>
        new RegExp(`^${d}\\.(jpe?g|png|webp|gif|avif)$`, "i").test(fname),
      );
      if (!match) continue;
      const destName = `GP-ZEND-${d}_${match}`;
      copyFile(path.join(girlsDir, match), path.join(toDir, destName));
      console.log(
        `[sync-program-media] Girls Pro Squad/${match} (finale ${d}) -> public/images/programs/${ALL_GIRLS_SEGMENT}/${destName}`,
      );
    }

    console.log(
      `[sync-program-media] ${ALL_GIRLS_SEGMENT}: ${bestNames.length} curated + ${requiredDigit.length} finale (1–6) from ${girlsDir}`,
    );
  }
}

console.log(`[sync-program-media] Done. Copied ${copied} legacy root file(s).`);
