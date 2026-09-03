import { courseConfig } from "./course.config";
import { formatLocalizedDate, type Language } from "./i18n";
import type { CourseWeek } from "./weeks";

export const previewStorageKey = "pythonCoursePreviewMode";

export function isWeekReleased(weekNumber: number) {
  return courseConfig.unlockAll || weekNumber <= courseConfig.currentWeek;
}

export function isMaterialReleased(weekNumber: number) {
  return isWeekReleased(weekNumber);
}

export function formatLectureDate(lectureAt: string | null | undefined, language: Language = "sk") {
  return formatLocalizedDate(lectureAt, language, courseConfig.timezone);
}

export function getScheduledWeeks(weeks: CourseWeek[]) {
  return weeks
    .filter((week): week is CourseWeek & { lectureAt: string } => typeof week.lectureAt === "string")
    .map((week) => ({
      number: week.number,
      title: week.title,
      lectureAt: week.lectureAt
    }));
}
