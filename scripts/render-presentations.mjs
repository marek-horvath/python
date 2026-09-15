import { existsSync, mkdirSync, readdirSync, renameSync, rmSync, statSync, writeFileSync, readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const sourceDir = path.join(root, "presentations");
const renderRoot = path.join(root, "web", "static", "generated", "presentations");
const temporaryRoot = path.join(root, ".tmp", "presentation-render");
const manifestPath = path.join(renderRoot, "manifest.json");
const filePattern = /^(\d{2}-[a-z0-9-]+)\.(sk|en)\.pptx$/;

function resolveCommand(command, candidates = []) {
  const lookup = spawnSync(process.platform === "win32" ? "where" : "which", [command], {
    encoding: "utf8",
    shell: false
  });
  const discovered = lookup.status === 0 ? lookup.stdout.trim().split(/\r?\n/)[0] : undefined;

  return [process.env[`${command.toUpperCase()}_PATH`], discovered, ...candidates].find((candidate) =>
    candidate && existsSync(candidate)
  );
}

function run(command, args, label) {
  const result = spawnSync(command, args, { cwd: root, encoding: "utf8" });

  if (result.status !== 0) {
    const details = [result.stdout, result.stderr].filter(Boolean).join("\n").trim();
    throw new Error(`${label} zlyhal.${details ? `\n${details}` : ""}`);
  }
}

function ensureSourceFiles() {
  if (!existsSync(sourceDir)) {
    throw new Error("Chýba priečinok presentations/. Spustite npm run presentations:seed.");
  }

  const files = readdirSync(sourceDir).filter((file) => filePattern.test(file));
  if (files.length === 0) {
    throw new Error("V presentations/ sa nenachádza žiadny .sk.pptx alebo .en.pptx súbor.");
  }

  return files;
}

function sourceDescriptor(fileName) {
  const match = fileName.match(filePattern);
  if (!match) throw new Error(`Neplatný názov prezentácie: ${fileName}`);
  return { slug: match[1], language: match[2] };
}

function renderPresentation(soffice, pdftoppm, fileName) {
  const { slug, language } = sourceDescriptor(fileName);
  const inputPath = path.join(sourceDir, fileName);
  const workDir = path.join(temporaryRoot, slug, language);
  const outputDir = path.join(renderRoot, slug, language);
  const pdfPath = path.join(workDir, fileName.replace(/\.pptx$/, ".pdf"));
  const libreOfficeProfile = path.join(workDir, "libreoffice-profile");

  rmSync(workDir, { recursive: true, force: true });
  rmSync(outputDir, { recursive: true, force: true });
  mkdirSync(workDir, { recursive: true });
  mkdirSync(outputDir, { recursive: true });
  mkdirSync(libreOfficeProfile, { recursive: true });

  // A separate profile prevents stale Windows LibreOffice locks between conversions.
  run(soffice, [`-env:UserInstallation=${pathToFileURL(libreOfficeProfile).href}`, "--headless", "--convert-to", "pdf", "--outdir", workDir, inputPath], `Konverzia ${fileName} do PDF`);

  if (!existsSync(pdfPath)) {
    throw new Error(`LibreOffice nevytvoril PDF pre ${fileName}.`);
  }

  const outputPrefix = path.join(outputDir, "slide");
  run(pdftoppm, ["-png", "-r", "160", pdfPath, outputPrefix], `Renderovanie slajdov ${fileName}`);

  const images = readdirSync(outputDir)
    .filter((file) => /^slide-\d+\.png$/.test(file))
    .sort((left, right) => Number(left.match(/\d+/)?.[0]) - Number(right.match(/\d+/)?.[0]));

  if (images.length === 0) {
    throw new Error(`PDF ${fileName} neobsahuje žiadny vyrenderovaný slajd.`);
  }

  const slides = images.map((file, index) => {
    const target = `${String(index + 1).padStart(3, "0")}.png`;
    renameSync(path.join(outputDir, file), path.join(outputDir, target));
    return `generated/presentations/${slug}/${language}/${target}`;
  });

  const sourceStats = statSync(inputPath);
  return {
    slug,
    language,
    slideCount: slides.length,
    slides,
    sourceSize: sourceStats.size,
    sourceModifiedAt: sourceStats.mtimeMs
  };
}

function sourceIsUnchanged(fileName, previousDeck) {
  if (!previousDeck?.slides?.length) return false;

  const sourceStats = statSync(path.join(sourceDir, fileName));
  const renderedSlidesExist = previousDeck.slides.every((slide) => existsSync(path.join(root, "web", "static", slide)));
  const hasSourceSignature = typeof previousDeck.sourceSize === "number" && typeof previousDeck.sourceModifiedAt === "number";
  const sourceMatches = !hasSourceSignature || (previousDeck.sourceSize === sourceStats.size && previousDeck.sourceModifiedAt === sourceStats.mtimeMs);

  return sourceMatches && renderedSlidesExist;
}

function readPreviousManifest() {
  if (!existsSync(manifestPath)) return { presentations: {} };

  try {
    return JSON.parse(readFileSync(manifestPath, "utf8"));
  } catch {
    return { presentations: {} };
  }
}

const sourceFiles = ensureSourceFiles();
const sourceSlugs = new Set(sourceFiles.map((fileName) => sourceDescriptor(fileName).slug));
const soffice = resolveCommand("soffice", [
  "C:\\Program Files\\LibreOffice\\program\\soffice.exe",
  "C:\\Program Files (x86)\\LibreOffice\\program\\soffice.exe"
]);
const pdftoppm = resolveCommand("pdftoppm");

if (!soffice) {
  throw new Error("LibreOffice sa nenašiel. Nainštalujte LibreOffice alebo nastavte SOFFICE_PATH.");
}

if (!pdftoppm) {
  throw new Error("pdftoppm sa nenašiel. Nainštalujte Poppler alebo nastavte PDFTOPPM_PATH.");
}

mkdirSync(renderRoot, { recursive: true });

for (const entry of readdirSync(renderRoot, { withFileTypes: true })) {
  if (entry.isDirectory() && !sourceSlugs.has(entry.name)) {
    rmSync(path.join(renderRoot, entry.name), { recursive: true, force: true });
  }
}

const previousManifest = readPreviousManifest();
const presentations = {};
for (const fileName of sourceFiles) {
  const { slug, language } = sourceDescriptor(fileName);
  const previousDeck = previousManifest.presentations?.[slug]?.[language];
  presentations[slug] ??= {};

  if (sourceIsUnchanged(fileName, previousDeck)) {
    const sourceStats = statSync(path.join(sourceDir, fileName));
    presentations[slug][language] = {
      ...previousDeck,
      sourceSize: sourceStats.size,
      sourceModifiedAt: sourceStats.mtimeMs
    };
    console.log(`Prezentácia bez zmeny: ${fileName}`);
    continue;
  }

  const rendered = renderPresentation(soffice, pdftoppm, fileName);
  presentations[rendered.slug][rendered.language] = {
    slideCount: rendered.slideCount,
    slides: rendered.slides,
    sourceSize: rendered.sourceSize,
    sourceModifiedAt: rendered.sourceModifiedAt
  };
  console.log(`Prezentácia: ${fileName} (${rendered.slideCount} slajdov)`);
}

for (const [slug, presentation] of Object.entries(presentations)) {
  if (!presentation.sk) {
    throw new Error(`Prezentácia ${slug} nemá povinnú slovenskú verziu (.sk.pptx).`);
  }
}

writeFileSync(
  manifestPath,
  `${JSON.stringify({ generatedAt: new Date().toISOString(), presentations }, null, 2)}\n`,
  "utf8"
);

console.log(`Vyrenderovaných ${Object.keys(presentations).length} prezentácií.`);
