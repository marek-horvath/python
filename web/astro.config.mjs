import { defineConfig } from "astro/config";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const isGithubPages = process.env.GITHUB_PAGES === "true";
const base = process.env.PUBLIC_BASE_PATH ?? (isGithubPages ? "/python" : "/");
const site = process.env.PUBLIC_SITE_URL ?? (isGithubPages ? "https://marek-horvath.github.io" : undefined);

export default defineConfig({
  output: "static",
  outDir: "../dist/web",
  publicDir: "./static",
  ...(base !== "/" ? { base } : {}),
  ...(site ? { site } : {}),
  vite: {
    resolve: {
      alias: {
        "@shared": fileURLToPath(new URL("../shared", import.meta.url))
      }
    },
    server: {
      fs: {
        allow: [root]
      }
    }
  }
});
