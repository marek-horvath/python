import { weeks } from "./weeks";
import type { Lecture } from "./slide.types";
import { lecture01 } from "../weeks/week-01-modern-python/lecture";
import { lecture02 } from "../weeks/week-02-scripting-automation/lecture";
import { lecture03 } from "../weeks/week-03-gui-event-driven/lecture";
import { lecture04 } from "../weeks/week-04-testing-debugging-quality/lecture";
import { lecture05 } from "../weeks/week-05-http-api/lecture";
import { lecture06 } from "../weeks/week-06-databases/lecture";
import { lecture07 } from "../weeks/week-07-data-science/lecture";
import { lecture08 } from "../weeks/week-08-web-scraping-browser/lecture";
import { lecture09 } from "../weeks/week-09-security/lecture";
import { lecture10 } from "../weeks/week-10-web-backend/lecture";

export const lectures: Lecture[] = [
  lecture01,
  lecture02,
  lecture03,
  lecture04,
  lecture05,
  lecture06,
  lecture07,
  lecture08,
  lecture09,
  lecture10
];

export function getLectureBySlug(slug: string) {
  return lectures.find((lecture) => lecture.slug === slug);
}

export function getLectureSummary() {
  return weeks.map((week) => ({
    week,
    lecture: lectures.find((lecture) => lecture.weekNumber === week.number)
  }));
}
