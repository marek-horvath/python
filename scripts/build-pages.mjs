import { spawnSync } from "node:child_process";

const env = {
  ...process.env,
  GITHUB_PAGES: "true",
  PUBLIC_BASE_PATH: process.env.PUBLIC_BASE_PATH ?? "/python",
  PUBLIC_SITE_URL: process.env.PUBLIC_SITE_URL ?? "https://marek-horvath.github.io"
};

const result = spawnSync("npm", ["run", "build"], {
  env,
  stdio: "inherit",
  shell: process.platform === "win32"
});

if (result.error) {
  console.error(result.error.message);
}

process.exit(result.status ?? 1);
