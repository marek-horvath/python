export const languages = [
  { code: "sk", label: "SK", name: "Slovenčina" },
  { code: "en", label: "EN", name: "English" }
] as const;

export type Language = (typeof languages)[number]["code"];
export type LocalizedString = Record<Language, string>;
export type I18nDictionary = Record<string, LocalizedString>;
export type I18nValues = Record<string, string | number>;

export const defaultLanguage: Language = "sk";
export const languageStorageKey = "python-course.language";

export const localizedCourse = {
  title: {
    sk: "Programovanie v Pythone",
    en: "Programming in Python"
  },
  description: {
    sk: "Python ako praktický jazyk pre automatizáciu, aplikácie, dáta, webové služby, testovanie a ďalšie oblasti softvérového vývoja.",
    en: "Python as a practical language for automation, applications, data work, web services, testing and other areas of software development."
  },
  university: {
    sk: "Technická univerzita v Košiciach",
    en: "Technical University of Košice"
  },
  faculty: {
    sk: "Fakulta elektrotechniky a informatiky",
    en: "Faculty of Electrical Engineering and Informatics"
  }
} satisfies Record<string, LocalizedString>;

export const uiTranslations = {
  "course.title": localizedCourse.title,
  "course.description": localizedCourse.description,
  "course.university": localizedCourse.university,
  "course.faculty": localizedCourse.faculty,

  "nav.home": { sk: "Úvod", en: "Home" },
  "nav.lectures": { sk: "Prednášky", en: "Lectures" },
  "nav.exercises": { sk: "Cvičenia", en: "Exercises" },
  "nav.project": { sk: "Projekt", en: "Project" },
  "nav.guides": { sk: "Návody", en: "Guides" },
  "nav.cheatsheet": { sk: "Cheatsheet", en: "Cheatsheet" },
  "nav.aria": { sk: "Hlavná navigácia", en: "Main navigation" },

  "language.label": { sk: "Jazyk", en: "Language" },
  "language.sk": { sk: "Slovenčina", en: "Slovak" },
  "language.en": { sk: "Angličtina", en: "English" },

  "footer.separator": { sk: "·", en: "·" },

  "ui.copy": { sk: "Kopírovať", en: "Copy" },
  "ui.copied": { sk: "Skopírované", en: "Copied" },
  "ui.backHome": { sk: "← Späť na úvod", en: "← Back to home" },
  "ui.backLectures": { sk: "← Späť na prednášky", en: "← Back to lectures" },
  "ui.continueProject": { sk: "Pokračovať na stránku Projekt", en: "Continue to Project" },
  "ui.continueCheatsheet": { sk: "Pokračovať na Cheatsheet", en: "Continue to Cheatsheet" },
  "ui.unavailable": { sk: "zatiaľ nedostupné", en: "not available yet" },
  "ui.teacherPreview": { sk: "náhľad vyučujúceho", en: "teacher preview" },

  "preview.indicator": { sk: "Náhľad vyučujúceho", en: "Teacher preview" },
  "preview.exit": { sk: "Ukončiť", en: "Exit" },
  "admin.title": { sk: "Náhľad vyučujúceho", en: "Teacher Preview" },
  "admin.description": {
    sk: "Toto je iba lokálny preview režim pre kontrolu existujúcich materiálov pred zverejnením.",
    en: "This is only a local preview mode for checking existing materials before publication."
  },
  "admin.password": { sk: "Heslo", en: "Password" },
  "admin.unlock": { sk: "Odomknúť všetky materiály", en: "Unlock all materials" },
  "admin.active": {
    sk: "Náhľad je aktívny pre túto browser session.",
    en: "Preview is active for this browser session."
  },
  "admin.exitPreview": { sk: "Ukončiť náhľad", en: "Exit preview" },
  "admin.activeShort": { sk: "Náhľad je aktívny.", en: "Preview is active." },
  "admin.invalidPassword": { sk: "Nesprávne heslo.", en: "Incorrect password." },
  "admin.closed": { sk: "Náhľad bol ukončený.", en: "Preview has been closed." },

  "notFound.title": { sk: "Stránka sa nenašla.", en: "Page not found." },
  "notFound.description": {
    sk: "Požadovaná adresa neexistuje alebo bola presunutá.",
    en: "The requested address does not exist or has been moved."
  },

  "lecture.back": { sk: "← Prednášky", en: "← Lectures" },
  "lecture.fullscreen": { sk: "Celá obrazovka", en: "Fullscreen" },
  "lecture.neighbors": { sk: "Susedné prednášky", en: "Adjacent lectures" },
  "lecture.previousLabel": { sk: "← Prednáška {number}", en: "← Lecture {number}" },
  "lecture.nextLabel": { sk: "Prednáška {number} →", en: "Lecture {number} →" },
  "lecture.lockedTitle": { sk: "Materiál zatiaľ nie je zverejnený.", en: "This material is not published yet." },

  "exercise.done": { sk: "Hotovo", en: "Done" },
  "exercise.back": { sk: "← Cvičenia", en: "← Exercises" },
  "exercise.markDone": { sk: "Označiť ako hotové: {title}", en: "Mark as done: {title}" },
  "exercise.completedProgress": { sk: "{done} / {total} hotových", en: "{done} of {total} tasks completed" },
  "exercise.markAll": { sk: "Označiť všetko ako hotové", en: "Mark all as done" },
  "exercise.resetProgress": { sk: "Resetovať označenie", en: "Reset progress" },
  "exercise.resetTitle": { sk: "Resetovať označenie?", en: "Reset progress?" },
  "exercise.resetBody": {
    sk: "V tomto cvičení sa zruší označenie všetkých úloh ako hotových.",
    en: "This will clear all completed task marks in this exercise."
  },
  "exercise.cancel": { sk: "Zrušiť", en: "Cancel" },
  "exercise.resetConfirm": { sk: "Resetovať", en: "Reset" },
  "exercise.neighbors": { sk: "Susedné cvičenia", en: "Adjacent exercises" },
  "exercise.previousLabel": { sk: "← Cvičenie {number}", en: "← Exercise {number}" },
  "exercise.nextLabel": { sk: "Cvičenie {number} →", en: "Exercise {number} →" },
  "exercise.codeSample": { sk: "ukážka kódu", en: "code sample" },
  "exercise.expectedOutput": { sk: "očakávaný výstup", en: "expected output" }
} satisfies I18nDictionary;

export const weekTitleTranslations = {
  1: { sk: "Úvod ku Pythonu", en: "Introduction to Python" },
  2: { sk: "Skriptovanie a automatizácia", en: "Scripting and Automation" },
  3: { sk: "GUI a event-driven programovanie", en: "GUI and Event-Driven Programming" },
  4: { sk: "Testovanie, debugging a kvalita kódu", en: "Testing, Debugging and Code Quality" },
  5: { sk: "Internet, HTTP a API", en: "Internet, HTTP and APIs" },
  6: { sk: "Databázy v Pythone", en: "Databases in Python" },
  7: { sk: "Data Science v Pythone", en: "Data Science in Python" },
  8: { sk: "Web scraping a automatizácia prehliadača", en: "Web Scraping and Browser Automation" },
  9: { sk: "Bezpečné programovanie v Pythone", en: "Secure Programming in Python" },
  10: { sk: "Web backend v Pythone", en: "Web Backends in Python" }
} satisfies Record<number, LocalizedString>;

export const learningAreaTranslations = [
  { sk: "moderný Python", en: "modern Python" },
  { sk: "skriptovanie a automatizácia", en: "scripting and automation" },
  { sk: "GUI", en: "GUI" },
  { sk: "testovanie", en: "testing" },
  { sk: "HTTP a API", en: "HTTP and APIs" },
  { sk: "databázy", en: "databases" },
  { sk: "Data Science", en: "Data Science" },
  { sk: "web scraping", en: "web scraping" },
  { sk: "bezpečnosť", en: "security" },
  { sk: "web backend", en: "web backends" }
] satisfies LocalizedString[];

export const academicResourceTranslations = {
  "CS50's Introduction to Programming with Python": {
    sk: "Samostatný úvod do Pythonu s úlohami a praktickými príkladmi.",
    en: "A self-contained introduction to Python with assignments and practical examples."
  },
  "Introduction to Computer Science and Programming in Python": {
    sk: "MIT OpenCourseWare kurz k základom programovania a výpočtového myslenia v Pythone.",
    en: "An MIT OpenCourseWare course on programming fundamentals and computational thinking with Python."
  },
  "CS106A — Programming Methodology": {
    sk: "Kurz zameraný na metodiku programovania a riešenie problémov.",
    en: "A course focused on programming methodology and problem solving."
  },
  "15-112 — Fundamentals of Programming and Computer Science": {
    sk: "Rozsiahly kurz základov programovania a informatiky s dôrazom na prax.",
    en: "A broad programming and computer science fundamentals course with a strong practical focus."
  },
  "Python Programming MOOC": {
    sk: "Otvorený online kurz Pythonu s postupnými programátorskými úlohami.",
    en: "An open online Python course with incremental programming exercises."
  }
} satisfies Record<string, LocalizedString>;

export function isLanguage(value: string | null | undefined): value is Language {
  return value === "sk" || value === "en";
}

export function interpolate(value: string, values: I18nValues = {}) {
  return value.replace(/\{(\w+)\}/g, (match, key) => String(values[key] ?? match));
}

export function translate(dictionary: I18nDictionary, key: string, language: Language, values?: I18nValues) {
  const entry = dictionary[key];
  const value = entry?.[language] ?? entry?.[defaultLanguage] ?? key;
  return interpolate(value, values);
}

export function formatLocalizedDate(lectureAt: string | null | undefined, language: Language, timezone = "Europe/Bratislava") {
  if (!lectureAt) return "";

  return new Intl.DateTimeFormat(language === "en" ? "en-GB" : "sk-SK", {
    timeZone: timezone,
    day: "numeric",
    month: language === "en" ? "short" : "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23"
  })
    .format(new Date(lectureAt))
    .replace(", ", " · ");
}

export function formatLocalizedDay(lectureAt: string | null | undefined, language: Language, timezone = "Europe/Bratislava") {
  if (!lectureAt) return "";

  return new Intl.DateTimeFormat(language === "en" ? "en-GB" : "sk-SK", {
    timeZone: timezone,
    day: "numeric",
    month: language === "en" ? "short" : "numeric",
    year: "numeric"
  }).format(new Date(lectureAt));
}

export function formatLocalizedTime(lectureAt: string | null | undefined, language: Language, timezone = "Europe/Bratislava") {
  if (!lectureAt) return "";

  return new Intl.DateTimeFormat(language === "en" ? "en-GB" : "sk-SK", {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23"
  }).format(new Date(lectureAt));
}
