import { spawnSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const outputDir = path.join(root, "dist", "web");
const tempRoot = path.join(root, ".tmp");
const worktreeDir = path.join(tempRoot, "gh-pages");

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: root,
    stdio: "inherit",
    shell: process.platform === "win32",
    ...options
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

function check(command, args) {
  return spawnSync(command, args, {
    cwd: root,
    stdio: "ignore",
    shell: process.platform === "win32"
  }).status === 0;
}

function removeDirectoryContents(directory) {
  const resolved = path.resolve(directory);
  const expectedRoot = path.resolve(tempRoot);

  if (!resolved.startsWith(expectedRoot + path.sep)) {
    throw new Error(`Refusing to clean directory outside ${expectedRoot}: ${resolved}`);
  }

  for (const entry of readdirSync(resolved, { withFileTypes: true })) {
    if (entry.name === ".git") {
      continue;
    }

    rmSync(path.join(resolved, entry.name), { recursive: true, force: true });
  }
}

function copyDirectoryContents(source, destination) {
  for (const entry of readdirSync(source)) {
    cpSync(path.join(source, entry), path.join(destination, entry), {
      recursive: true,
      force: true
    });
  }
}

run("node", ["scripts/build-pages.mjs"]);

if (!existsSync(outputDir)) {
  throw new Error(`Build output does not exist: ${outputDir}`);
}

mkdirSync(tempRoot, { recursive: true });

if (existsSync(worktreeDir)) {
  run("git", ["worktree", "remove", "--force", worktreeDir]);
}

run("git", ["worktree", "prune"]);

const hasLocalBranch = check("git", ["show-ref", "--verify", "--quiet", "refs/heads/gh-pages"]);
const hasRemoteBranch = check("git", ["ls-remote", "--exit-code", "--heads", "origin", "gh-pages"]);

if (hasLocalBranch) {
  run("git", ["worktree", "add", worktreeDir, "gh-pages"]);
} else if (hasRemoteBranch) {
  run("git", ["worktree", "add", "-B", "gh-pages", worktreeDir, "origin/gh-pages"]);
} else {
  run("git", ["worktree", "add", "--detach", worktreeDir, "HEAD"]);
  run("git", ["checkout", "--orphan", "gh-pages"], { cwd: worktreeDir });
}

removeDirectoryContents(worktreeDir);
copyDirectoryContents(outputDir, worktreeDir);
writeFileSync(path.join(worktreeDir, ".nojekyll"), "", "utf8");

run("git", ["add", "-A"], { cwd: worktreeDir });

const hasChanges = !check("git", ["-C", worktreeDir, "diff", "--cached", "--quiet"]);

if (hasChanges) {
  run("git", ["commit", "-m", "Deploy GitHub Pages"], { cwd: worktreeDir });
  run("git", ["push", "-u", "origin", "gh-pages"], { cwd: worktreeDir });
} else {
  console.log("gh-pages branch is already up to date.");
}

run("git", ["worktree", "remove", worktreeDir]);
