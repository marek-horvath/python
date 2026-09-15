import fs from "node:fs";
import path from "node:path";

export type RenderedDeck = {
  slideCount: number;
  slides: string[];
};

export type PresentationRender = {
  sk: RenderedDeck;
  en?: RenderedDeck;
};

type PresentationManifest = {
  presentations: Record<string, PresentationRender>;
};

const manifestPath = path.join(process.cwd(), "static", "generated", "presentations", "manifest.json");

export function getPresentationRender(slug: string): PresentationRender {
  if (!fs.existsSync(manifestPath)) {
    throw new Error("Chýba manifest prezentácií. Spustite npm run presentations:render.");
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8")) as PresentationManifest;
  const presentation = manifest.presentations[slug];

  if (!presentation?.sk?.slides?.length) {
    throw new Error(`Prezentácia ${slug} nemá vyrenderované slajdy.`);
  }

  return presentation;
}
