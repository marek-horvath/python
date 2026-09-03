import { spawnSync } from "node:child_process";

const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
const env = {
  ...process.env,
  GITHUB_PAGES: "true",
  PUBLIC_BASE_PATH: process.env.PUBLIC_BASE_PATH ?? "/python",
  PUBLIC_SITE_URL: process.env.PUBLIC_SITE_URL ?? "https://marek-horvath.github.io"
};

const result = spawnSync(npmCommand, ["run", "build"], {
  env,
  stdio: "inherit"
});

process.exit(result.status ?? 1);
