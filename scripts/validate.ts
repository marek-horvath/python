import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { exercises } from "../shared/exercises";
import { presentations } from "../shared/presentations";
import { weeks } from "../shared/weeks";

type PythonCommand = {
  command: string;
  args: string[];
};

const errors: string[] = [];
const warnings: string[] = [];

validateWeeks();
validatePresentations();
validateExercises();
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

console.log(`Validácia prešla: ${weeks.length} týždňov, ${presentations.length} PPTX prednášok, ${exercises.length} cvičení.`);

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

    const presentation = presentations.find((candidate) => candidate.weekNumber === week.number);
    if (week.lectureAvailable && !presentation) {
      errors.push(`Týždeň ${week.number} má lectureAvailable=true, ale nemá PPTX prezentáciu v shared/presentations.ts`);
    }

    const exercise = exercises.find((candidate) => candidate.weekNumber === week.number);
    if (week.exerciseAvailable && !exercise) {
      errors.push(`Týždeň ${week.number} má exerciseAvailable=true, ale nemá cvičenie v shared/exercises.ts`);
    }
  }
}

function validatePresentations() {
  const slugs = new Set<string>();

  for (const presentation of presentations) {
    if (slugs.has(presentation.slug)) errors.push(`Duplicitný slug prezentácie: ${presentation.slug}`);
    slugs.add(presentation.slug);

    const week = weeks.find((candidate) => candidate.number === presentation.weekNumber);
    if (!week) {
      errors.push(`Prednáška ${presentation.slug} odkazuje na neexistujúci týždeň ${presentation.weekNumber}`);
      continue;
    }

    if (presentation.slug !== week.slug) {
      errors.push(`Prednáška ${presentation.weekNumber} má slug ${presentation.slug}, ale týždeň má ${week.slug}`);
    }

    for (const [language, source] of Object.entries(presentation.source)) {
      const sourcePath = path.join(process.cwd(), source);
      if (!fs.existsSync(sourcePath)) {
        errors.push(`Chýba ${language} PPTX pre prednášku ${presentation.weekNumber}: ${source}`);
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
      if (!fs.existsSync(solutionPath)) {
        warnings.push(`Cvičenie ${exercise.number} nemá lokálne referenčné riešenia: ${exercise.solutionPath}`);
      } else if (solutionPath.startsWith(path.resolve(staticRoot))) {
        errors.push(`Referenčné riešenia cvičenia ${exercise.number} sú vo verejnom static adresári`);
      }
    }
  }
}

function validatePythonExampleFiles() {
  const python = resolvePython();
  if (!python) {
    warnings.push("Python interpreter nebol nájdený, ukážkové súbory sa neoverili");
    return;
  }

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
