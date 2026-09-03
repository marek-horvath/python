import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { exercises } from "../shared/exercises";
import { lectures } from "../shared/lectures";
import type { CodeBlock, Lecture, LectureSlide } from "../shared/slide.types";
import { weeks } from "../shared/weeks";

type PythonCommand = {
  command: string;
  args: string[];
};

const errors: string[] = [];
const warnings: string[] = [];
const allPythonBlocks: Array<{ lecture: Lecture; slide: LectureSlide; block: CodeBlock; index: number }> = [];
const runnablePythonBlocks: Array<{ lecture: Lecture; slide: LectureSlide; block: CodeBlock; index: number }> = [];

validateWeeks();
validateLectures();
validateExercises();
validatePythonBlocks();
validatePythonExampleFiles();

for (const warning of warnings) {
  console.warn(`warning: ${warning}`);
}

if (errors.length > 0) {
  for (const error of errors) {
    console.error(`error: ${error}`);
  }
  process.exit(1);
}

console.log(
  `Validácia prešla: ${weeks.length} týždňov, ${lectures.length} publikované prednášky, ${exercises.length} cvičenie, ${allPythonBlocks.length} Python blokov skompilovaných, ${runnablePythonBlocks.length} spustených.`
);

function validateWeeks() {
  const numbers = new Set<number>();
  const slugs = new Set<string>();

  if (weeks.length !== 10) {
    errors.push(`Očakáva sa 10 týždňov, nájdené: ${weeks.length}`);
  }

  for (const week of weeks) {
    if (numbers.has(week.number)) errors.push(`Duplicitné číslo týždňa: ${week.number}`);
    numbers.add(week.number);

    if (slugs.has(week.slug)) errors.push(`Duplicitný slug týždňa: ${week.slug}`);
    slugs.add(week.slug);

    if (!/^\d{2}-[a-z0-9-]+$/.test(week.slug)) {
      errors.push(`Slug týždňa ${week.number} nemá formát 01-nazov: ${week.slug}`);
    }

    const folder = path.join(process.cwd(), week.folder);
    if (!fs.existsSync(folder)) {
      errors.push(`Chýba adresár ${folder}`);
      continue;
    }

    for (const fileName of ["week.config.ts", "outline.md", "resources.md"]) {
      const filePath = path.join(folder, fileName);
      if (!fs.existsSync(filePath)) errors.push(`Chýba ${filePath}`);
    }

    for (const dirName of ["examples", "assets", "output"]) {
      const dirPath = path.join(folder, dirName);
      if (!fs.existsSync(dirPath)) errors.push(`Chýba ${dirName}/ pre týždeň ${week.number}`);
    }

    const lecture = lectures.find((candidate) => candidate.weekNumber === week.number);
    if (week.lectureAvailable && !lecture) {
      errors.push(`Týždeň ${week.number} má lectureAvailable=true, ale nemá lecture.ts v shared/lectures.ts`);
    }

    const exercise = exercises.find((candidate) => candidate.weekNumber === week.number);
    if (week.exerciseAvailable && !exercise) {
      errors.push(`Týždeň ${week.number} má exerciseAvailable=true, ale nemá cvičenie v shared/exercises.ts`);
    }

    for (const material of week.materials) {
      if (material.public && material.type === "viewer" && !material.href.startsWith("/prednasky/")) {
        errors.push(`Verejný viewer materiál v týždni ${week.number} má nesprávnu URL: ${material.href}`);
      }
    }
  }
}

function validateExercises() {
  const numbers = new Set<number>();
  const slugs = new Set<string>();
  const staticRoot = path.join(process.cwd(), "web", "static");

  for (const exercise of exercises) {
    if (numbers.has(exercise.number)) errors.push(`Duplicitné číslo cvičenia: ${exercise.number}`);
    numbers.add(exercise.number);

    if (slugs.has(exercise.slug)) errors.push(`Duplicitný slug cvičenia: ${exercise.slug}`);
    slugs.add(exercise.slug);

    if (!/^\d{2}-[a-z0-9-]+$/.test(exercise.slug)) {
      errors.push(`Slug cvičenia ${exercise.number} nemá formát 01-nazov: ${exercise.slug}`);
    }

    const week = weeks.find((candidate) => candidate.number === exercise.weekNumber);
    if (!week) errors.push(`Cvičenie ${exercise.number} odkazuje na neexistujúci týždeň ${exercise.weekNumber}`);

    if (exercise.status === "published") {
      const pagePath = path.join(process.cwd(), "web", "src", "pages", "cvicenia", `${exercise.slug}.astro`);
      if (!fs.existsSync(pagePath)) errors.push(`Publikované cvičenie nemá stránku: ${pagePath}`);
    }

    if (exercise.starterPath && !fs.existsSync(path.join(process.cwd(), exercise.starterPath))) {
      errors.push(`Cvičenie ${exercise.number} nemá starter files: ${exercise.starterPath}`);
    }

    if (exercise.status === "published") {
      const zipPath = path.join(staticRoot, "downloads", `exercise-${String(exercise.number).padStart(2, "0")}-starter.zip`);
      if (!fs.existsSync(zipPath)) errors.push(`Cvičenie ${exercise.number} nemá verejný starter ZIP: ${zipPath}`);
    }

    if (exercise.solutionPath) {
      const solutionPath = path.resolve(process.cwd(), exercise.solutionPath);
      if (!fs.existsSync(solutionPath)) errors.push(`Cvičenie ${exercise.number} nemá referenčné riešenia: ${exercise.solutionPath}`);
      if (solutionPath.startsWith(path.resolve(staticRoot))) {
        errors.push(`Referenčné riešenia cvičenia ${exercise.number} sú vo verejnom static adresári`);
      }
    }
  }
}

function validateLectures() {
  const lectureSlugs = new Set<string>();

  for (const lecture of lectures) {
    const week = weeks.find((candidate) => candidate.number === lecture.weekNumber);
    if (!week) {
      errors.push(`Prednáška ${lecture.slug} odkazuje na neexistujúci týždeň ${lecture.weekNumber}`);
      continue;
    }

    if (lectureSlugs.has(lecture.slug)) errors.push(`Duplicitný slug prednášky: ${lecture.slug}`);
    lectureSlugs.add(lecture.slug);

    if (lecture.slug !== week.slug) {
      errors.push(`Prednáška ${lecture.weekNumber} má slug ${lecture.slug}, ale týždeň má ${week.slug}`);
    }

    if (lecture.title !== week.title) {
      warnings.push(`Prednáška ${lecture.weekNumber} má iný názov ako week.config.ts`);
    }

    if (week.status === "published" && (lecture.slides.length < 35 || lecture.slides.length > 45)) {
      errors.push(`Publikovaná prednáška ${lecture.weekNumber} má mať približne 35-45 slajdov, teraz má ${lecture.slides.length}`);
    }

    const slideIds = new Set<string>();
    for (const [index, slide] of lecture.slides.entries()) {
      validateSlide(lecture, slide, index + 1, slideIds);
    }
  }
}

function validateSlide(lecture: Lecture, slide: LectureSlide, slideNumber: number, slideIds: Set<string>) {
  const prefix = `${lecture.slug} slide ${slideNumber} (${slide.id})`;

  if (slideIds.has(slide.id)) errors.push(`${prefix}: duplicitné id slajdu`);
  slideIds.add(slide.id);

  if (!/^\d{2}-[a-z0-9-]+$/.test(slide.id)) warnings.push(`${prefix}: id nemá očakávaný formát`);
  if (!slide.title.trim()) errors.push(`${prefix}: chýba title`);
  if (slide.title.length > 72) warnings.push(`${prefix}: veľmi dlhý nadpis (${slide.title.length} znakov)`);
  if (slide.body && slide.body.length > 230) warnings.push(`${prefix}: dlhý body text (${slide.body.length} znakov)`);
  if (slide.type !== "semester-map" && slide.points && slide.points.length > 6) {
    warnings.push(`${prefix}: veľa odrážok (${slide.points.length})`);
  }

  switch (slide.type) {
    case "code":
      if (!slide.code) errors.push(`${prefix}: code slide nemá code block`);
      break;
    case "split-code":
      if (!slide.codeBlocks || slide.codeBlocks.length !== 2) errors.push(`${prefix}: split-code má mať presne dva code blocky`);
      break;
    case "question":
      if (!slide.prompt && !slide.code) warnings.push(`${prefix}: otázka nemá prompt ani code block`);
      break;
    case "compare":
      if (!slide.columns || slide.columns.length < 2) errors.push(`${prefix}: compare slide potrebuje aspoň dva stĺpce`);
      break;
    case "table":
      if (!slide.table) {
        errors.push(`${prefix}: table slide nemá table`);
      } else {
        for (const row of slide.table.rows) {
          if (row.length !== slide.table.headers.length) errors.push(`${prefix}: riadok tabuľky má nesprávny počet buniek`);
        }
      }
      break;
    case "diagram":
      if (!slide.diagramItems || slide.diagramItems.length < 2) errors.push(`${prefix}: diagram potrebuje aspoň dva prvky`);
      break;
  }

  for (const [index, block] of getCodeBlocks(slide).entries()) {
    validateCodeBlock(lecture, slide, block, index, prefix);
  }
}

function validateCodeBlock(lecture: Lecture, slide: LectureSlide, block: CodeBlock, index: number, prefix: string) {
  const lines = block.code.replace(/\r\n/g, "\n").split("\n");
  if (lines.length > 15) warnings.push(`${prefix}: code block ${index + 1} má ${lines.length} riadkov`);
  if (lines.some((line) => line.length > 92)) warnings.push(`${prefix}: code block ${index + 1} má veľmi dlhý riadok`);

  for (const lineNumber of block.highlightLines ?? []) {
    if (lineNumber < 1 || lineNumber > lines.length) {
      warnings.push(`${prefix}: highlight line ${lineNumber} je mimo code blocku`);
    }
  }

  if (block.language === "python") {
    const item = { lecture, slide, block, index };
    allPythonBlocks.push(item);
    if (block.runnable !== false) runnablePythonBlocks.push(item);
  }
}

function validatePythonBlocks() {
  const python = resolvePython();
  if (!python) {
    warnings.push("Python interpreter nebol nájdený, spustiteľné ukážky sa neoverili");
    return;
  }

  const tempDir = path.join(process.cwd(), ".tmp", "python-code-check");
  fs.mkdirSync(tempDir, { recursive: true });

  for (const item of allPythonBlocks) {
    const fileName = `${item.lecture.slug}-${item.slide.id}-${item.index + 1}.py`;
    const filePath = path.join(tempDir, fileName);
    fs.writeFileSync(filePath, `${item.block.code}\n`, "utf8");

    const compileResult = checkPythonSyntax(python, filePath);

    if (compileResult.error) {
      errors.push(`${item.lecture.slug} ${item.slide.id}: Python ukážka sa nedá kompilovať (${compileResult.error.message})`);
      continue;
    }

    if (compileResult.status !== 0) {
      errors.push(`${item.lecture.slug} ${item.slide.id}: Python ukážka má syntaktickú chybu\n${compileResult.stderr || compileResult.stdout}`);
      continue;
    }

    if (item.block.runnable === false) continue;

    const result = spawnSync(python.command, [...python.args, filePath], {
      cwd: process.cwd(),
      encoding: "utf8",
      timeout: 5000
    });

    if (result.error) {
      errors.push(`${item.lecture.slug} ${item.slide.id}: Python ukážka sa nedá spustiť (${result.error.message})`);
    } else if (result.status !== 0) {
      errors.push(`${item.lecture.slug} ${item.slide.id}: Python ukážka zlyhala\n${result.stderr || result.stdout}`);
    }
  }
}

function validatePythonExampleFiles() {
  const python = resolvePython();
  if (!python) return;

  for (const rootName of ["weeks", "exercises", "solutions"]) {
    for (const filePath of findFiles(path.join(process.cwd(), rootName), ".py")) {
      const result = checkPythonSyntax(python, filePath);

      if (result.error) {
        errors.push(`${filePath}: py_compile sa nedá spustiť (${result.error.message})`);
      } else if (result.status !== 0) {
        errors.push(`${filePath}: py_compile zlyhal\n${result.stderr || result.stdout}`);
      }
    }
  }
}

function getCodeBlocks(slide: LectureSlide) {
  const blocks: CodeBlock[] = [];
  if (slide.code) blocks.push(slide.code);
  if (slide.codeBlocks) blocks.push(...slide.codeBlocks);
  return blocks;
}

function resolvePython(): PythonCommand | undefined {
  const candidates: PythonCommand[] = [
    { command: "python", args: [] },
    { command: "py", args: ["-3"] }
  ];

  for (const candidate of candidates) {
    const result = spawnSync(candidate.command, [...candidate.args, "--version"], {
      encoding: "utf8",
      timeout: 3000
    });

    if (!result.error && result.status === 0) return candidate;
  }

  return undefined;
}

function checkPythonSyntax(python: PythonCommand, filePath: string) {
  const syntaxCheck = [
    "import ast",
    "import pathlib",
    "import sys",
    "path = pathlib.Path(sys.argv[1])",
    "ast.parse(path.read_text(encoding='utf-8'), filename=str(path))"
  ].join("\n");

  return spawnSync(python.command, [...python.args, "-c", syntaxCheck, filePath], {
    cwd: process.cwd(),
    encoding: "utf8",
    timeout: 5000
  });
}

function findFiles(root: string, extension: string): string[] {
  if (!fs.existsSync(root)) return [];

  const found: string[] = [];
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const fullPath = path.join(root, entry.name);
    if (entry.isDirectory()) found.push(...findFiles(fullPath, extension));
    if (entry.isFile() && entry.name.endsWith(extension)) found.push(fullPath);
  }
  return found;
}
