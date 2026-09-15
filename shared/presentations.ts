import { weekTitleTranslations } from "./i18n";
import { weeks } from "./weeks";

export type Presentation = {
  weekNumber: number;
  slug: string;
  title: string;
  titleEn: string;
  description: string;
  duration: string;
  source: {
    sk: string;
    en: string;
  };
};

function presentationFileName(weekNumber: number, slug: string, language: "sk" | "en") {
  const prefix = `${String(weekNumber).padStart(2, "0")}-`;
  return `${prefix}${slug.replace(prefix, "")}.${language}.pptx`;
}

export const presentations: Presentation[] = weeks
  .filter((week) => week.lectureAvailable)
  .map((week) => ({
    weekNumber: week.number,
    slug: week.slug,
    title: week.title,
    titleEn: weekTitleTranslations[week.number as keyof typeof weekTitleTranslations]?.en ?? week.title,
    description: week.description,
    duration: "50-60 minút",
    source: {
      sk: `presentations/${presentationFileName(week.number, week.slug, "sk")}`,
      en: `presentations/${presentationFileName(week.number, week.slug, "en")}`
    }
  }));

export function getPresentationBySlug(slug: string) {
  return presentations.find((presentation) => presentation.slug === slug);
}

export function getPresentationSummary() {
  return weeks.map((week) => ({
    week,
    presentation: presentations.find((presentation) => presentation.weekNumber === week.number)
  }));
}
