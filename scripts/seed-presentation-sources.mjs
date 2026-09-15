import { existsSync, mkdirSync, readdirSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const sourceDir = path.join(root, "presentations");
const replace = process.argv.includes("--replace");
const existingSources = existsSync(sourceDir)
  ? readdirSync(sourceDir).filter((file) => /^\d{2}-[a-z0-9-]+\.(sk|en)\.pptx$/.test(file))
  : [];

if (existingSources.length > 0 && !replace) {
  throw new Error("PPTX zdroje už existujú. Manuálne úpravy chráni npm run presentations:seed -- --replace.");
}

mkdirSync(sourceDir, { recursive: true });

const tsxCli = path.join(root, "node_modules", "tsx", "dist", "cli.mjs");
const result = spawnSync(process.execPath, [tsxCli, "scripts/export-pptx.ts", "all"], {
  cwd: root,
  stdio: "inherit",
  env: {
    ...process.env,
    PPTX_OUTPUT_DIR: sourceDir,
    PPTX_LOCALES: "sk,en"
  }
});

process.exit(result.status ?? 1);
