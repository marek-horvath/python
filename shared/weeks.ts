import type { WeekConfig } from "./week.types";
import { courseConfig } from "./course.config";
import week01 from "../weeks/week-01-uvod-ku-pythonu/week.config";
import week02 from "../weeks/week-02-scripting-automation/week.config";
import week03 from "../weeks/week-03-gui-event-driven/week.config";
import week04 from "../weeks/week-04-testing-debugging-quality/week.config";
import week05 from "../weeks/week-05-http-api/week.config";
import week06 from "../weeks/week-06-databases/week.config";
import week07 from "../weeks/week-07-data-science/week.config";
import week08 from "../weeks/week-08-web-scraping-browser/week.config";
import week09 from "../weeks/week-09-security/week.config";
import week10 from "../weeks/week-10-web-backend/week.config";

export type CourseWeek = WeekConfig & {
  lectureAt: string | null;
};

const baseWeeks: WeekConfig[] = [
  week01,
  week02,
  week03,
  week04,
  week05,
  week06,
  week07,
  week08,
  week09,
  week10
].sort((a, b) => a.number - b.number);

export const weeks: CourseWeek[] = baseWeeks.map((week) => {
  const centralWeek = courseConfig.weeks.find((item) => item.number === week.number);

  return {
    ...week,
    title: centralWeek?.title ?? week.title,
    slug: centralWeek?.slug ?? week.slug,
    lectureAt: centralWeek?.lectureAt ?? null
  };
});

export function getWeekByNumber(number: number) {
  return weeks.find((week) => week.number === number);
}

export function getWeekBySlug(slug: string) {
  return weeks.find((week) => week.slug === slug);
}

export function getAdjacentWeeks(week: WeekConfig) {
  const index = weeks.findIndex((candidate) => candidate.number === week.number);
  return {
    previous: index > 0 ? weeks[index - 1] : undefined,
    next: index >= 0 && index < weeks.length - 1 ? weeks[index + 1] : undefined
  };
}
