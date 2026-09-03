import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const root = process.cwd();
const astroPackagePath = path.join(root, "node_modules", "astro", "package.json");
const astroPackage = JSON.parse(fs.readFileSync(astroPackagePath, "utf-8"));
const astroBinPath = typeof astroPackage.bin === "string" ? astroPackage.bin : astroPackage.bin.astro;
const astroBin = path.join(root, "node_modules", "astro", astroBinPath);
const webRoot = path.join(root, "web");

const child = spawn(process.execPath, [astroBin, ...args], {
  stdio: "inherit",
  cwd: webRoot,
  env: {
    ...process.env,
    ASTRO_TELEMETRY_DISABLED: "1",
    CHECKPOINT_DISABLE: "1"
  }
});

child.on("exit", (code) => {
  process.exit(code ?? 1);
});

child.on("error", (error) => {
  console.error(error);
  process.exit(1);
});
