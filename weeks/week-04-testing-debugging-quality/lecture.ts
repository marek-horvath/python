import type { Lecture, LectureSlide } from "../../shared/slide.types";

type BilingualText = {
  sk: string;
  en: string;
};

type SlideSpec = {
  id: string;
  type: LectureSlide["type"];
  title: BilingualText;
  body?: BilingualText;
};

const text = (sk: string, en: string): BilingualText => ({ sk, en });

const specs: SlideSpec[] = [
  { id: "01-title", type: "title", title: text("Testovanie, debugging a kvalita kódu", "Testing, debugging and code quality"), body: text("Od zvláštneho čísla v GUI k overenej oprave.", "From a suspicious GUI number to a verified fix.") },
  { id: "02-wrong-counter", type: "statement", title: text("Aplikácia ukazuje nesprávny počet", "The application shows the wrong count"), body: text("Jedna z dvoch úloh je hotová, no GUI ukazuje Nesplnené: 2 namiesto 1.", "One of two tasks is done, yet the GUI shows Incomplete: 2 instead of 1.") },
  { id: "03-reproduction", type: "diagram", title: text("Najprv chybu spoľahlivo zopakujeme", "First, reproduce the bug reliably"), body: text("Pridáme dve úlohy, prvú dokončíme a skontrolujeme počítadlo.", "Add two tasks, complete the first, and inspect the counter.") },
  { id: "04-expected-actual", type: "table", title: text("Expected a actual musia byť konkrétne", "Expected and actual must be concrete"), body: text("Pre zmiešaný stav očakávame 1, aplikácia ukazuje 2.", "For mixed state we expect 1, while the application shows 2.") },
  { id: "05-exception-vs-logic", type: "compare", title: text("Výnimka a logická chyba nie sú to isté", "An exception and a logic bug are not the same"), body: text("Výnimka preruší tok; logická chyba nechá program pokračovať s nesprávnym výsledkom.", "An exception interrupts execution; a logic bug lets the program continue with a wrong result.") },
  { id: "06-three-activities", type: "diagram", title: text("Testovanie, debugging a oprava sú tri činnosti", "Testing, debugging and fixing are three activities"), body: text("Test dokazuje rozdiel, debugging hľadá príčinu a oprava mení kód.", "A test proves the mismatch, debugging finds the cause, and fixing changes the code.") },
  { id: "07-suspicious-refresh", type: "code", title: text("Podozrivý je výpočet pri obnove GUI", "The GUI refresh calculation is suspicious"), body: text("Počítadlo používa len(ulohy), teda počet všetkých položiek.", "The counter uses len(tasks), which is the number of all items.") },
  { id: "08-real-data", type: "code", title: text("Aké dáta má program v okamihu chyby?", "What data does the program hold when the bug occurs?"), body: text("Zoznam obsahuje jednu hotovú a jednu nesplnenú úlohu.", "The list contains one done and one incomplete task.") },
  { id: "09-len-question", type: "code", title: text("len() odpovedá na inú otázku", "len() answers a different question"), body: text("Počet všetkých položiek nie je počet nesplnených položiek.", "The number of all items is not the number of incomplete items.") },
  { id: "10-diagnostic-print", type: "code", title: text("Krátky diagnostický výpis overí predpoklad", "A short diagnostic print checks the assumption"), body: text("Výpis ukáže text, stav hotova a celkovú dĺžku zoznamu.", "The print shows text, done state and total list length.") },
  { id: "11-traceback", type: "code", title: text("Traceback čítame od posledného riadku", "Read a traceback from the final line"), body: text("Posledný riadok pomenúva chybu a predchádzajúce riadky ukazujú cestu k nej.", "The final line names the error and preceding lines show the path to it.") },
  { id: "12-breakpoint", type: "code", title: text("Breakpoint zastaví program pri podozrivom stave", "A breakpoint pauses at the suspicious state"), body: text("V pdb prezrieme ulohy, len(ulohy) a potom pokračujeme.", "In pdb we inspect tasks, len(tasks), then continue.") },
  { id: "13-cause", type: "statement", title: text("Príčina: zamieňame počet všetkých za počet nesplnených", "Cause: total count is mistaken for incomplete count"), body: text("Chybná je doménová otázka ukrytá vo funkcii obsluhujúcej widgety.", "The wrong domain question is hidden inside a widget-management function.") },
  { id: "14-contract", type: "table", title: text("Najprv pomenujeme kontrakt výpočtu", "First, name the calculation contract"), body: text("Prázdny, zmiešaný a úplne hotový zoznam majú jasné očakávania.", "Empty, mixed and all-done lists have explicit expectations.") },
  { id: "15-extract-and-test", type: "split-code", title: text("Výpočet oddelíme a zachytíme testom", "Separate the calculation and capture it in a test"), body: text("Chybná funkcia vracia len zoznamu, test očakáva jednu nesplnenú úlohu.", "The buggy function returns list length, while the test expects one incomplete task.") },
  { id: "16-arrange-act-assert", type: "code", title: text("Arrange, act, assert je spôsob čítania testu", "Arrange, act, assert is a way to read a test"), body: text("Pripravíme dáta, zavoláme funkciu a porovnáme výsledok.", "Prepare data, call the function, and compare the result.") },
  { id: "17-failing-output", type: "code", title: text("Najprv musí test naozaj zlyhať", "The test must fail first"), body: text("unittest vypíše AssertionError: 2 != 1.", "unittest reports AssertionError: 2 != 1.") },
  { id: "18-symptom-not-cause", type: "statement", title: text("2 != 1 je symptóm, nie vysvetlenie príčiny", "2 != 1 is a symptom, not the cause"), body: text("Príčinu ukázalo až preskúmanie dát a výrazu len(ulohy).", "Inspecting the data and len(tasks) expression revealed the cause.") },
  { id: "19-fix", type: "code", title: text("Oprava filtruje podľa stavu každej úlohy", "The fix filters by each task's state"), body: text("sum(not uloha[\"hotova\"] for uloha in ulohy) spočíta nesplnené.", "sum(not task[\"done\"] for task in tasks) counts incomplete tasks.") },
  { id: "20-passing-test", type: "code", title: text("Po oprave ten istý test prejde", "After the fix, the same test passes"), body: text("Očakávanie zostalo rovnaké; zmenila sa implementácia.", "The expectation stayed the same; the implementation changed.") },
  { id: "21-boundaries", type: "table", title: text("Jeden príklad nestačí: pridáme hranice", "One example is not enough: add boundaries"), body: text("Overíme prázdny zoznam, všetky hotové a všetky nesplnené úlohy.", "Check empty, all-done and all-incomplete task lists.") },
  { id: "22-add-contract", type: "statement", title: text("Pridanie úlohy má vlastný kontrakt", "Adding a task has its own contract"), body: text("Text sa oreže a nová úloha začína ako nesplnená.", "Text is stripped and a new task starts incomplete.") },
  { id: "23-add-test", type: "code", title: text("Test pridania kontroluje návrat aj zmenu dát", "The add test checks the return value and data mutation"), body: text("Porovnávame presný obsah výsledného zoznamu.", "We compare the exact contents of the resulting list.") },
  { id: "24-empty-input", type: "compare", title: text("Prázdny vstup má dve podoby", "Empty input has two forms"), body: text("Prázdny reťazec aj whitespace-only text sa musia ignorovať.", "Both an empty string and whitespace-only text must be ignored.") },
  { id: "25-whitespace-tests", type: "split-code", title: text("Bežný a whitespace vstup testujeme oddelene", "Test normal and whitespace input separately"), body: text("Jedna vetva pridáva orezaný text, druhá nemení dáta.", "One branch adds stripped text, while the other leaves data unchanged.") },
  { id: "26-toggle", type: "code", title: text("Prepnutie musí fungovať v oboch smeroch", "Toggling must work in both directions"), body: text("Test overí False -> True aj True -> False.", "The test verifies False -> True and True -> False.") },
  { id: "27-invalid-toggle", type: "split-code", title: text("Neplatný index nesmie poškodiť dáta", "An invalid index must not damage data"), body: text("Funkcia vráti False a zoznam zostane nezmenený.", "The function returns False and the list remains unchanged.") },
  { id: "28-delete", type: "code", title: text("Odstránenie overíme na presnom vybranom prvku", "Verify deletion of the exact selected item"), body: text("Po odstránení indexu 1 porovnáme presný zostávajúci zoznam.", "After deleting index 1, compare the exact remaining list.") },
  { id: "29-isolation", type: "split-code", title: text("Každý test potrebuje izolovaný počiatočný stav", "Every test needs isolated initial state"), body: text("setUp vytvorí čerstvé mutable dáta pred každým testom.", "setUp creates fresh mutable data before every test.") },
  { id: "30-without-gui", type: "table", title: text("Bez GUI vieme testovať väčšinu pravidiel", "Most rules can be tested without the GUI"), body: text("Počet, pridanie, prepnutie a odstránenie sú operácie nad listom.", "Counting, adding, toggling and deleting are list operations.") },
  { id: "31-data-vs-gui", type: "compare", title: text("Dátové testy a GUI kontrola chránia iné vrstvy", "Data tests and GUI checks protect different layers"), body: text("Automatické testy chránia pravidlá, manuálna kontrola prepojenie a vzhľad.", "Automated tests protect rules; manual checks protect wiring and appearance.") },
  { id: "32-manual-checks", type: "table", title: text("Štyri krátke kontroly v reálnom okne", "Four short checks in the real window"), body: text("Pridanie, prepnutie, odstránenie a klik bez výberu.", "Adding, toggling, deleting and clicking without a selection.") },
  { id: "33-fat-callback", type: "code", title: text("Pôvodný callback mieša priveľa zodpovedností", "The original callback mixes too many responsibilities"), body: text("Číta widget, validuje, mení dáta a renderuje celé GUI.", "It reads a widget, validates, mutates data and renders the whole GUI.") },
  { id: "34-separation", type: "split-code", title: text("Doménová funkcia a GUI callback dostanú jasné úlohy", "Domain function and GUI callback get clear roles"), body: text("Funkcia mení dáta; callback iba spája widgety s funkciou a obnovou.", "The function mutates data; the callback only connects widgets to the function and refresh.") },
  { id: "35-source-of-truth", type: "diagram", title: text("Zoznam úloh je jediný zdroj pravdy", "The task list is the single source of truth"), body: text("Listbox aj počítadlo sa obnovujú z rovnakých dát.", "Both Listbox and counter refresh from the same data.") },
  { id: "36-names", type: "compare", title: text("Názov funkcie má povedať, čo vracia", "A function name should say what it returns"), body: text("pocet_nesplnenych je presnejší názov než spocitaj.", "incomplete_count is more precise than count.") },
  { id: "37-comments", type: "split-code", title: text("Komentár nemá klamať ani prepisovať kód", "A comment must not lie or restate code"), body: text("Čitateľné názvy odstránia potrebu opisovať každý riadok.", "Readable names remove the need to narrate every line.") },
  { id: "38-specific-errors", type: "split-code", title: text("Konkrétne ošetrenie chráni očakávaný stav", "Specific handling protects an expected state"), body: text("Žiadny výber ošetríme explicitne namiesto broad except: pass.", "Handle no selection explicitly instead of broad except: pass.") },
  { id: "39-small-diff", type: "split-code", title: text("Malý diff opravuje presnú príčinu", "A small diff fixes the exact cause"), body: text("len(ulohy) nahradí pomenovaná a otestovaná funkcia.", "A named, tested function replaces len(tasks).") },
  { id: "40-workflow", type: "diagram", title: text("Opakovateľný workflow pri ďalšej chybe", "A repeatable workflow for the next bug"), body: text("Reprodukcia, hypotéza, pozorovanie, test, oprava a celá sada.", "Reproduce, hypothesise, observe, test, fix and run the full suite.") },
  { id: "41-full-suite", type: "code", title: text("Celá sada má desať testov", "The full suite has ten tests"), body: text("Verbose výstup ukazuje desať úspešných testov správania.", "Verbose output shows ten successful behavioural tests.") },
  { id: "42-limits", type: "compare", title: text("Čo táto sada dokazuje a čo nie", "What this suite proves and what it does not"), body: text("Dokazuje pravidlá nad dátami, nie vzhľad ani prepojenie widgetov.", "It proves data rules, not widget appearance or wiring.") },
  { id: "43-prediction", type: "question", title: text("Ktorý test odhalí chybu v odstránení?", "Which test catches the deletion bug?"), body: text("Najsilnejší test odstráni index 1 a porovná presný zostávajúci zoznam.", "The strongest test deletes index 1 and compares the exact remaining list.") },
  { id: "44-recap", type: "takeaway", title: text("Od bugu ku kvalitnejšiemu návrhu", "From a bug to a better design"), body: text("Presná reprodukcia, pozorovanie, zlyhávajúci test, malá oprava a oddelené zodpovednosti.", "Precise reproduction, observation, a failing test, a small fix and separated responsibilities.") }
];

const slides: LectureSlide[] = specs.map((spec) => ({
  id: spec.id,
  type: spec.type,
  title: spec.title.sk,
  body: spec.body?.sk
}));

const englishSlides = Object.fromEntries(
  specs.map((spec) => [
    spec.id,
    {
      title: spec.title.en,
      body: spec.body?.en
    }
  ])
);

export const lecture04 = {
  weekNumber: 4,
  slug: "04-testovanie-debugging-kvalita",
  title: "Testovanie, debugging a kvalita kódu",
  description: "Od reprodukovateľného bugu v TODO aplikácii cez unittest a debugger k overenej oprave a testovateľnému návrhu.",
  duration: "90 minút",
  slides,
  translations: {
    en: {
      title: "Testing, debugging and code quality",
      description: "From a reproducible bug in a TODO application through unittest and a debugger to a verified fix and testable design.",
      duration: "90 minutes",
      slides: englishSlides
    }
  }
} satisfies Lecture;
