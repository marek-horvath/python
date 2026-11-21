import assert from "node:assert/strict";
import test from "node:test";
import { courseConfig } from "../shared/course.config";
import { getCourseCountdown, getNextScheduledWeek } from "../shared/schedule";

test("the next week follows real dates, independently of currentWeek", () => {
  assert.equal(getNextScheduledWeek(courseConfig.weeks, Date.parse("2026-11-10T12:00:00+01:00"))?.number, 9);
  assert.equal(getNextScheduledWeek(courseConfig.weeks, Date.parse("2026-11-16T09:09:59+01:00"))?.number, 9);
  assert.equal(getNextScheduledWeek(courseConfig.weeks, Date.parse("2026-11-16T09:10:00+01:00"))?.number, 10);
  assert.equal(getNextScheduledWeek(courseConfig.weeks, Date.parse("2026-11-23T09:10:00+01:00")), undefined);
});

test("schedule accepts DST offsets, unsorted dates, missing and invalid dates", () => {
  const schedule = [
    { number: 3, lectureAt: "2026-11-02T09:10:00+01:00" },
    { number: 2, lectureAt: "2026-10-26T09:10:00+01:00" },
    { number: 1, lectureAt: "2026-10-19T09:10:00+02:00" },
    { number: 4, lectureAt: null },
    { number: 5, lectureAt: "invalid" }
  ];
  assert.equal(getNextScheduledWeek(schedule, Date.parse("2026-10-25T12:00:00Z"))?.number, 2);
  assert.equal(getNextScheduledWeek([], 0), undefined);
  assert.deepEqual(schedule.map((week) => week.number), [3, 2, 1, 4, 5]);
});

test("the last lecture gives way to the submission deadline and then to defences", () => {
  const stateAt = (now: string) => getCourseCountdown(
    courseConfig.weeks, courseConfig.project.finalSubmissionAt, Date.parse(now)
  );
  const beforeLast = stateAt("2026-11-23T09:09:59+01:00");
  assert.equal(beforeLast.stage, "lecture");
  if (beforeLast.stage === "lecture") assert.equal(beforeLast.week.number, 10);
  assert.deepEqual(stateAt("2026-11-23T09:10:00+01:00"), { stage: "submission" });
  assert.deepEqual(stateAt("2026-12-13T23:59:59+01:00"), { stage: "submission" });
  assert.deepEqual(stateAt("2026-12-14T00:00:00+01:00"), { stage: "defence" });
  assert.deepEqual(stateAt("2027-01-15T12:00:00+01:00"), { stage: "defence" });
});
