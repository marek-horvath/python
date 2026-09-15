import fs from "node:fs";
import path from "node:path";
import pptxgen from "pptxgenjs";
import { lectures } from "../shared/lectures";
import type { CodeBlock, Lecture, LectureSlide, LectureSlideTranslation } from "../shared/slide.types";

const outputDir = path.resolve(process.env.PPTX_OUTPUT_DIR ?? path.join(process.cwd(), "dist", "presentations"));
const requested = process.argv[2] ?? "1";
const selectedLectures = selectLectures(requested);
const locales = parseLocales(process.env.PPTX_LOCALES);

if (selectedLectures.length === 0) {
  console.error(`Prednáška "${requested}" neexistuje.`);
  process.exit(1);
}

fs.mkdirSync(outputDir, { recursive: true });

for (const lecture of selectedLectures) {
  for (const locale of locales) {
    const localizedLecture = localizeLecture(lecture, locale);
    const fileName = `${String(lecture.weekNumber).padStart(2, "0")}-${lecture.slug.replace(/^\d{2}-/, "")}.${locale}.pptx`;
    const filePath = path.join(outputDir, fileName);
    await exportLecture(localizedLecture, filePath, locale);
    console.log(`PPTX export: ${path.relative(process.cwd(), filePath)}`);
  }
}

function selectLectures(value: string) {
  if (value === "all") return lectures;

  const asNumber = Number(value);
  return lectures.filter((lecture) => lecture.weekNumber === asNumber || lecture.slug === value);
}

function parseLocales(value: string | undefined): Array<"sk" | "en"> {
  const requestedLocales = (value ?? "sk")
    .split(",")
    .map((locale) => locale.trim())
    .filter((locale): locale is "sk" | "en" => locale === "sk" || locale === "en");

  return requestedLocales.length > 0 ? requestedLocales : ["sk"];
}

function localizeLecture(lecture: Lecture, locale: "sk" | "en"): Lecture {
  if (locale === "sk") return lecture;

  const translation = lecture.translations?.en;
  const localizedSlides = lecture.slides.map((slide) => localizeSlide(slide, translation?.slides?.[slide.id]));

  return {
    ...lecture,
    title: translation?.title ?? lecture.title,
    description: translation?.description ?? lecture.description,
    duration: translation?.duration ?? lecture.duration,
    slides: localizedSlides
  };
}

function localizeSlide(slide: LectureSlide, translation: LectureSlideTranslation | undefined): LectureSlide {
  if (!translation) return slide;

  return {
    ...slide,
    section: translation.section ?? slide.section,
    title: translation.title ?? slide.title,
    subtitle: translation.subtitle ?? slide.subtitle,
    body: translation.body ?? slide.body,
    points: translation.points ?? slide.points,
    prompt: translation.prompt ?? slide.prompt,
    code: slide.code
      ? {
          ...slide.code,
          label: translation.code?.label ?? slide.code.label,
          code: translation.code?.code ?? slide.code.code
        }
      : undefined,
    codeBlocks: slide.codeBlocks?.map((block, index) => ({
      ...block,
      label: translation.codeBlocks?.[index]?.label ?? block.label,
      code: translation.codeBlocks?.[index]?.code ?? block.code
    })),
    columns: slide.columns?.map((column, index) => ({
      title: translation.columns?.[index]?.title ?? column.title,
      items: translation.columns?.[index]?.items ?? column.items
    })),
    table: slide.table
      ? {
          headers: translation.table?.headers ?? slide.table.headers,
          rows: translation.table?.rows ?? slide.table.rows
        }
      : undefined,
    diagramItems: translation.diagramItems ?? slide.diagramItems
  };
}

async function exportLecture(lecture: Lecture, filePath: string, locale: "sk" | "en") {
  const pptx = new pptxgen();
  pptx.layout = "LAYOUT_WIDE";
  pptx.author = "TUKE FEI";
  pptx.company = "Technická univerzita v Košiciach";
  pptx.subject = "Programovanie v Pythone";
  pptx.title = lecture.title;
  pptx.theme = {
    headFontFace: "Arial",
    bodyFontFace: "Arial"
  };

  lecture.slides.forEach((lectureSlide, index) => {
    const slide = pptx.addSlide();
    slide.background = { color: "FFFFFF" };
    renderSlide(pptx, slide, lecture, lectureSlide, index, locale);
  });

  await pptx.writeFile({ fileName: filePath });
}

function renderSlide(
  pptx: pptxgen,
  slide: pptxgen.Slide,
  lecture: Lecture,
  lectureSlide: LectureSlide,
  index: number,
  locale: "sk" | "en"
) {
  const lectureLabel = `${locale === "en" ? "Lecture" : "Prednáška"} ${String(lecture.weekNumber).padStart(2, "0")}`;
  const sectionLabel = locale === "en" ? "Part" : "Časť";
  const section = lectureSlide.section ? `${sectionLabel} ${lectureSlide.section}` : lectureLabel;
  const slideNumber = `${String(index + 1).padStart(2, "0")} / ${String(lecture.slides.length).padStart(2, "0")}`;

  addFooter(slide, slideNumber);

  if (lectureSlide.type === "title") {
    addEyebrow(slide, lectureLabel);
    addText(slide, lectureSlide.title, 0.75, 2.05, 11.6, 1.25, 39, true);
    if (lectureSlide.subtitle) addMuted(slide, lectureSlide.subtitle, 0.78, 3.55, 9.2, 0.35, 17);
    if (lectureSlide.body) addMuted(slide, lectureSlide.body, 0.78, 4.15, 8.8, 0.55, 15);
    return;
  }

  if (lectureSlide.type === "section") {
    addEyebrow(slide, section);
    addText(slide, lectureSlide.title, 0.75, 2.15, 10.4, 1.25, 38, true);
    if (lectureSlide.subtitle) addMuted(slide, lectureSlide.subtitle, 0.78, 3.7, 8.8, 0.45, 16);
    return;
  }

  addEyebrow(slide, section);
  addText(slide, lectureSlide.title, 0.75, 0.65, 11.1, 0.7, titleSize(lectureSlide), true);

  switch (lectureSlide.type) {
    case "statement":
    case "bullets":
    case "demo":
    case "takeaway":
      renderTextSlide(slide, lectureSlide);
      break;
    case "code":
    case "question":
      renderCodeSlide(pptx, slide, lectureSlide);
      break;
    case "split-code":
      renderSplitCodeSlide(pptx, slide, lectureSlide);
      break;
    case "compare":
      renderCompareSlide(slide, lectureSlide);
      break;
    case "table":
      renderTableSlide(slide, lectureSlide);
      break;
    case "diagram":
      renderDiagramSlide(pptx, slide, lectureSlide);
      break;
    case "semester-map":
      renderSemesterMap(slide, lectureSlide);
      break;
  }
}

function renderTextSlide(slide: pptxgen.Slide, lectureSlide: LectureSlide) {
  let y = 1.65;
  if (lectureSlide.body) {
    addMuted(slide, lectureSlide.body, 0.78, y, 9.7, 0.9, 18);
    y += 1.05;
  }
  if (lectureSlide.prompt) {
    addMuted(slide, lectureSlide.prompt, 0.78, y, 9.7, 0.6, 18);
    y += 0.75;
  }
  if (lectureSlide.points) addBullets(slide, lectureSlide.points, 0.95, y, 10.2, 4.6, 18);
}

function renderCodeSlide(pptx: pptxgen, slide: pptxgen.Slide, lectureSlide: LectureSlide) {
  let y = 1.58;
  if (lectureSlide.prompt) {
    addMuted(slide, lectureSlide.prompt, 0.78, y, 10.3, 0.45, 17);
    y += 0.6;
  }

  if (!lectureSlide.code) return;
  if (lectureSlide.body) {
    addCodeBlock(pptx, slide, lectureSlide.code, 0.78, y, 7.3, 4.95);
    addMuted(slide, lectureSlide.body, 8.45, y + 0.15, 3.8, 1.5, 16);
  } else {
    addCodeBlock(pptx, slide, lectureSlide.code, 0.78, y, 11.8, 4.95);
  }
}

function renderSplitCodeSlide(pptx: pptxgen, slide: pptxgen.Slide, lectureSlide: LectureSlide) {
  const blocks = lectureSlide.codeBlocks ?? [];
  addCodeBlock(pptx, slide, blocks[0], 0.78, 1.58, 5.72, 5.1);
  addCodeBlock(pptx, slide, blocks[1], 6.86, 1.58, 5.72, 5.1);
}

function renderCompareSlide(slide: pptxgen.Slide, lectureSlide: LectureSlide) {
  const columns = lectureSlide.columns ?? [];
  const width = 5.35;
  columns.slice(0, 2).forEach((column, index) => {
    const x = index === 0 ? 0.78 : 6.35;
    slide.addShape("line", { x, y: 1.6, w: width, h: 0, line: { color: "0B6B61", pt: 1.5 } });
    addText(slide, column.title, x, 1.82, width, 0.36, 17, true);
    addBullets(slide, column.items, x + 0.15, 2.35, width - 0.2, 3.5, 15);
  });
}

function renderTableSlide(slide: pptxgen.Slide, lectureSlide: LectureSlide) {
  if (!lectureSlide.table) return;
  const rows: pptxgen.TableRow[] = [lectureSlide.table.headers, ...lectureSlide.table.rows].map((row) =>
    row.map((cell) => ({ text: cleanInline(cell), options: { fontFace: "Arial", fontSize: 14, color: "111820" } }))
  );
  slide.addTable(rows, {
    x: 0.78,
    y: 1.62,
    w: 11.8,
    h: 4.8,
    fontFace: "Arial",
    fontSize: 14,
    color: "111820",
    border: { color: "D7D3C8", pt: 0.75 },
    margin: 0.08
  });
}

function renderDiagramSlide(pptx: pptxgen, slide: pptxgen.Slide, lectureSlide: LectureSlide) {
  const items = lectureSlide.diagramItems ?? [];
  const gap = 0.14;
  const x = 0.78;
  const y = 2.85;
  const width = (11.8 - gap * (items.length - 1)) / Math.max(items.length, 1);

  items.forEach((item, index) => {
    slide.addShape(pptx.ShapeType.rect, {
      x: x + index * (width + gap),
      y,
      w: width,
      h: 0.82,
      fill: { color: "FFFFFF" },
      line: { color: "D7D3C8", pt: 0.9 }
    });
    addText(slide, cleanInline(item), x + index * (width + gap) + 0.08, y + 0.18, width - 0.16, 0.35, 14, false, "center");
  });
}

function renderSemesterMap(slide: pptxgen.Slide, lectureSlide: LectureSlide) {
  const points = lectureSlide.points ?? [];
  const left = points.slice(0, Math.ceil(points.length / 2));
  const right = points.slice(Math.ceil(points.length / 2));
  addText(slide, left.join("\n"), 0.95, 1.75, 5.1, 4.6, 16, false, "left", "Consolas");
  addText(slide, right.join("\n"), 6.25, 1.75, 5.1, 4.6, 16, false, "left", "Consolas");
}

function addCodeBlock(pptx: pptxgen, slide: pptxgen.Slide, block: CodeBlock | undefined, x: number, y: number, w: number, h: number) {
  if (!block) return;
  const labelHeight = block.label ? 0.32 : 0;
  slide.addShape(pptx.ShapeType.rect, {
    x,
    y,
    w,
    h,
    fill: { color: "10151F" },
    line: { color: variantColor(block), pt: 0.9 }
  });
  if (block.label) {
    addText(slide, block.label, x + 0.16, y + 0.1, w - 0.32, 0.22, 8, true, "left", "Arial", "98A6B8");
  }
  addText(
    slide,
    block.code,
    x + 0.18,
    y + 0.26 + labelHeight,
    w - 0.36,
    h - 0.36 - labelHeight,
    codeSize(block),
    false,
    "left",
    "Consolas",
    "E8EDF4"
  );
}

function addFooter(slide: pptxgen.Slide, slideNumber: string) {
  addText(slide, slideNumber, 11.58, 7.05, 0.95, 0.2, 7, false, "right", "Consolas", "868E96");
}

function addEyebrow(slide: pptxgen.Slide, text: string) {
  addText(slide, text, 0.78, 0.38, 5.5, 0.25, 8, true, "left", "Consolas", "0B6B61");
}

function addBullets(slide: pptxgen.Slide, points: string[], x: number, y: number, w: number, h: number, fontSize: number) {
  slide.addText(points.map((point) => `• ${cleanInline(point)}`).join("\n"), {
    x,
    y,
    w,
    h,
    fontFace: "Arial",
    fontSize,
    color: "111820",
    breakLine: false,
    fit: "shrink",
    paraSpaceAfter: 8
  });
}

function addMuted(slide: pptxgen.Slide, text: string, x: number, y: number, w: number, h: number, fontSize: number) {
  addText(slide, cleanInline(text), x, y, w, h, fontSize, false, "left", "Arial", "5D6770");
}

function addText(
  slide: pptxgen.Slide,
  text: string,
  x: number,
  y: number,
  w: number,
  h: number,
  fontSize: number,
  bold: boolean,
  align: "left" | "center" | "right" = "left",
  fontFace = "Arial",
  color = "111820"
) {
  slide.addText(text, {
    x,
    y,
    w,
    h,
    fontFace,
    fontSize,
    color,
    bold,
    align,
    valign: "middle",
    fit: "shrink",
    breakLine: false
  });
}

function titleSize(slide: LectureSlide) {
  return slide.type === "statement" ? 35 : 28;
}

function codeSize(block: CodeBlock) {
  const lines = block.code.replace(/\r\n/g, "\n").split("\n").length;
  if (lines > 12) return 10;
  if (lines > 8) return 11;
  return 12;
}

function variantColor(block: CodeBlock) {
  if (block.variant === "bad") return "9F1D1D";
  if (block.variant === "good") return "0A6A3A";
  return "1C2635";
}

function cleanInline(value: string) {
  return value.replace(/<[^>]+>/g, "").replace(/`/g, "");
}
