import { spawnSync } from "node:child_process";
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { courseConfig } from "../shared/course.config";
import { weeks } from "../shared/weeks";
import { presentations } from "../shared/presentations";
import { exercises } from "../shared/exercises";

const root = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const args = process.argv.slice(2);
if (args.includes("--help")) {
  console.log("npm run book:build -- [--student] [--generate-only] [--commentary-only] [--release] [--skip-web] [--weeks 7,8] [--config path.json]");
  console.log("Výstup: dist/book/author alebo dist/book/student. Predvolene ide o súkromný pracovný rukopis.");
  process.exit(0);
}
const flags = new Set(["--student", "--generate-only", "--commentary-only", "--release", "--skip-web"]);
for (let i = 0; i < args.length; i++) {
  if (flags.has(args[i])) continue;
  if (["--weeks", "--config"].includes(args[i]) && args[i + 1] && !args[i + 1].startsWith("--")) { i++; continue; }
  throw new Error(`Neznámy alebo neúplný parameter: ${args[i]}`);
}
function run(command: string, parameters: string[], label: string) {
  const result = spawnSync(command, parameters, { cwd: root, stdio: "inherit", shell: false, env: { ...process.env, PYTHONIOENCODING: "utf-8" } });
  if (result.error) throw new Error(`${label}: ${result.error.message}`);
  if (result.status !== 0) process.exit(result.status ?? 1);
}

// Render through the same production pipeline, including changes in Astro-only worksheets.
// No extra HTML/worksheet copy needs to be maintained for the book.
if (!args.includes("--skip-web") && !args.includes("--commentary-only")) {
  run(process.execPath, [path.join(root, "scripts/render-presentations.mjs")], "Rendering prezentácií");
  run(process.execPath, [path.join(root, "scripts/run-astro.mjs"), "build"], "Build pracovných listov");
} else if (!args.includes("--commentary-only") && !existsSync(path.join(root, "dist/web/index.html"))) {
  throw new Error("Chýba build webu. Spustite book:build bez --skip-web.");
}
const metadata = path.join(root, ".tmp/book-input.json");
mkdirSync(path.dirname(metadata), { recursive: true });
writeFileSync(metadata, JSON.stringify({ course: courseConfig, weeks, presentations, exercises }, null, 2));
const python = process.env.PYTHON ?? "python";
run(python, [path.join(root, "scripts/book/generate.py"), "--metadata", metadata, ...args], "Generovanie knihy");
