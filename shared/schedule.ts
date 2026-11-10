// Shared by the static page and its live countdown. Visibility does not affect dates.
export function getNextScheduledWeek<T extends { number: number; lectureAt: string | null }>(
  schedule: readonly T[],
  now = Date.now()
): T | undefined {
  return schedule
    .filter((week) => week.lectureAt && Date.parse(week.lectureAt) > now)
    .sort((a, b) => Date.parse(a.lectureAt!) - Date.parse(b.lectureAt!))[0];
}

export const selfStudyNotice = {
  sk: "Samostatné štúdium — bez online hovoru. Pozrite si slajdy a vypracujte cvičenie.",
  en: "Independent study — no online call. Review the slides and complete the exercise."
};
