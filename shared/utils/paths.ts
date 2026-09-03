import path from "node:path";

export const rootDir = process.cwd();

export function fromRoot(...segments: string[]) {
  return path.join(rootDir, ...segments);
}

export function weekNumberLabel(number: number) {
  return String(number).padStart(2, "0");
}

export function weekOutputId(number: number) {
  return `week-${weekNumberLabel(number)}`;
}
