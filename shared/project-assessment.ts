import { courseConfig } from "./course.config";
import type { LocalizedString } from "./i18n";

const deadline = new Date(courseConfig.project.finalSubmissionAt);
const date = (locale: string, month: "numeric" | "long") => new Intl.DateTimeFormat(locale, {
  timeZone: courseConfig.timezone, day: "numeric", month, year: "numeric"
}).format(deadline);
const time = new Intl.DateTimeFormat("en-GB", {
  timeZone: courseConfig.timezone, hour: "2-digit", minute: "2-digit", hourCycle: "h23"
}).format(deadline);

export const finalAssessment = {
  title: { sk: "Finálne odovzdanie a obhajoba", en: "Final submission and defence" },
  deadline: {
    sk: `Termín: ${date("sk-SK", "numeric")} o ${time} · koniec 12. týždňa · časové pásmo ${courseConfig.timezone}`,
    en: `Deadline: ${date("en-GB", "long")} at ${time} · end of week 12 · time zone: ${courseConfig.timezone}`
  },
  summary: {
    sk: `Finálny projekt odovzdajte do ${date("sk-SK", "numeric")} o ${time}. Po kontrole dostanete návrh bodov, ktorý si musíte obhájiť osobne v škole v skúškovom období (${courseConfig.project.defencePeriod.sk}). Termíny obhajob budú vypísané v MAIS-e.`,
    en: `Submit your final project by ${date("en-GB", "long")} at ${time}. After review, you will receive a provisional score that you must defend in person at the university during the examination period (${courseConfig.project.defencePeriod.en}). Defence dates will be listed in MAIS.`
  },
  submission: {
    sk: "Do termínu odovzdajte finálnu verziu projektu do svojho prideleného Git repozitára. Skontrolujte miesto odovzdania, požadovanú štruktúru priečinkov a úplnosť súborov, dokumentácie a videa podľa pokynov. V README zachovajte pôvodné zadanie, pravidlá a hodnotiace kritériá; doplňte požadované údaje o svojom projekte a aktuálny návod na inštaláciu a spustenie.",
    en: "Submit the final version of your project to your assigned Git repository by the deadline. Check the submission location, required folder structure, and completeness of files, documentation and video according to the instructions. Keep the original assignment, rules and grading criteria in the README; fill in the required project information and up-to-date installation and running instructions."
  },
  review: {
    sk: "Po odovzdaní projekty skontrolujeme a podobne ako pri MVP navrhneme body za jednotlivé hodnotené časti. Ide o predbežné hodnotenie, ktoré ešte nie je konečné.",
    en: "After submission, we will review the projects and propose a score for each assessed component, as we did for the MVP. This is a provisional assessment, not the final grade."
  },
  defence: {
    sk: `Navrhnuté body si musíte obhájiť na povinnej prezenčnej obhajobe v škole v skúškovom období (${courseConfig.project.defencePeriod.sk}). Termíny budú vypísané v MAIS-e; prihláste sa na jeden z nich. Budeme sa rozprávať o vašom kóde, technických rozhodnutiach a fungovaní projektu. Po obhajobe vám navrhnuté body zostanú alebo sa pri zistení nedostatkov znížia.`,
    en: `You must defend the proposed score at a mandatory in-person project defence at the university during the examination period (${courseConfig.project.defencePeriod.en}). Dates will be listed in MAIS; register for one of them. We will discuss your code, technical decisions and how the project works. Your proposed score will either be confirmed or reduced if shortcomings are identified.`
  },
  integrity: {
    sk: "AI nástroje sú povolené, ale za odovzdané riešenie zodpovedáte vy a musíte mu rozumieť. Ak sa preukáže plagiátorstvo, že projekt vytvoril niekto iný, alebo že ide iba o kompletne AI vygenerovaný projekt bez vlastnej práce a porozumenia, môžete prísť o všetky body, nesplniť podmienky predmetu a musieť ho opakovať.",
    en: "AI tools are permitted, but you are responsible for the submitted solution and must understand it. If plagiarism is established, if someone else created the project, or if it is entirely AI-generated without your own work and understanding, you may lose all points, fail the course and have to retake it."
  }
} satisfies Record<string, LocalizedString>;

export const courseCountdownText = {
  lecture: {
    label: { sk: "Najbližšia prednáška", en: "Next lecture" }
  },
  submission: {
    label: { sk: "Najbližší termín", en: "Next deadline" },
    title: { sk: "Odovzdanie finálneho projektu", en: "Final project submission" },
    note: { sk: "Prednášková časť sa skončila. Materiály zostávajú dostupné.", en: "The lecture series has ended. All materials remain available." }
  },
  defence: {
    label: { sk: "Obhajoby projektov", en: "Project defences" },
    title: { sk: "Prezenčná obhajoba v škole", en: "In-person defence at the university" },
    note: { sk: "Termín odovzdania uplynul. Prihláste sa na obhajobu cez MAIS; konkrétne termíny tam budú vypísané.", en: "The submission deadline has passed. Register for your defence in MAIS, where the dates will be listed." }
  }
};
