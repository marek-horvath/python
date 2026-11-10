# Automaticky zostavované skriptá

Generátor zostavuje slovenský rukopis **Programovanie v Pythone** priamo z materiálov predmetu a sadzí ho skutočným **ClassicThesis od Andrého Miedeho**. Nemení prezentácie, pracovné listy ani referenčné programy. Do knihy nevkladá obrázky slajdov. Výsledok je lokálny; web ani jeho GitHub Pages build knihu automaticky nepublikujú.

## Spustenie

Potrebujete existujúce závislosti projektu (`npm ci`), Python 3.10+, LibreOffice a Poppler z pôvodného webového renderovacieho workflow. Pre PDF nainštalujte TeX Live alebo MiKTeX s **XeLaTeX a Biber**. Sadzba používa KOMA-Script, fontspec, polyglossia (slovenčina), TikZ/PGF, biblatex, booktabs, longtable, fvextra, enumitem, microtype, scrlayer-scrpage, needspace, caption, hyperref a xurl spolu so závislosťami ClassicThesis (napríklad titlesec, tocloft a soul). Písma: TeX Gyre Pagella, TeX Gyre Heros, DejaVu Sans Mono a Euler pre čísla kapitol. Plná inštalácia TeX Live tieto balíky obsahuje.

V koreňovom adresári projektu:

```powershell
npm run book:build
```

Príkaz aktualizuje webové podklady, zostaví aktuálne Astro pracovné listy, načíta **priamo XML slovenských PPTX**, vygeneruje LaTeX a bibliografiu, potom spustí XeLaTeX → Biber → XeLaTeX. Odkazy a obsah sa stabilizujú ďalším priechodom; počet priechodov sa riadi skutočnými požiadavkami LaTeXu. Webový rendering sa používa pre existujúci web, jeho obrázky sa do knihy neimportujú. Po zmene materiálov spustite ten istý príkaz znova.

Výstup je v `dist/book/author/`:

- `programovanie-v-pythone.pdf` — posledná úspešne skompilovaná kniha;
- `main.tex`, `chapters/*.tex`, `classicthesis-config.tex` — prenositeľné zdroje sadzby;
- `classicthesis.sty`, `COPYING`, kompatibilitné súbory — pripnutý pôvodný štýl;
- `references.bib` — bibliografia odvodená z existujúcich názvov a URL v `resources.md`;
- `content-coverage.json` — kontrola všetkých textových objektov prezentácií vrátane buniek tabuliek;
- `report.md` — počty snímok, poznámok a úloh, chýbajúce alebo nerevidované podklady;
- `sources.json` — zahrnuté súbory, ich SHA-256 a zdrojová revízia;
- `main.log`, `xelatex-*.txt`, `biber.txt`, `layout-warnings.txt` — diagnostika kompilácie.

Bez nainštalovaného TeXu možno pripraviť samotné zdroje:

```powershell
npm run book:generate
```

Študentský variant vynechá Speaker Notes a referenčné implementácie. Má vlastný výstupný adresár `dist/book/student/`:

```powershell
npm run book:build -- --student
```

Rýchly náhľad vybraných kapitol, ak už máte aktuálny build webu:

```powershell
npm run book:build -- --skip-web --weeks 7,8
```

`--skip-web` zámerne používa posledný lokálny build HTML a obrázkov. Po zmene pracovných listov alebo PPTX ho nepoužívajte. V prostredí, ktoré zle odovzdáva npm argumenty, použite priamo `node node_modules/tsx/dist/cli.mjs scripts/build-book.ts --student`.

Interpreter a nástroje môžete nastaviť premennými `PYTHON`, `XELATEX` a `BIBER` na názov alebo úplnú cestu k programu. Žiadna cesta konkrétneho počítača nie je zapísaná v generátore. Kompilácia nepovoľuje `shell-escape`. Generátor nikdy nespúšťa kód zo zadania alebo riešení. Nepotrebuje ďalšie Python balíky.

## Čo sa skladá automaticky

Každý týždeň tvorí jednu kapitolu. Názvy, autor, univerzita, fakulta a výsledky vzdelávania pochádzajú z existujúcich centrálnych konfigurácií. Titulný list obsahuje aj miesto, rok a označenie vydania. Nasleduje predhovor, klikateľný obsah, kapitoly a prílohy.

V kapitole sú:

1. Text a kód zo skutočnej verejnej `.sk.pptx`, nie zo starších `lecture.ts`. Odseky a zoznamy sú priamo sadzený text, kód je označiteľný a zachováva odsadenie. Dlhšie ukážky majú čísla riadkov a všetky pomenované ukážky majú stabilné odkazy.
2. Dostupný výklad zo zodpovedajúcej lokálnej `*-commented.pptx`. Pred importom sa overuje poradie snímok, vizuálne XML a médiá. Samotné prečíslovanie interných identifikátorov tvarov je prípustné. Ak sa zmenila iba jedna snímka, jej poznámky sa vynechajú a ostatné sa zachovajú. Report vysvetlí dôvod.
3. Aktuálny pracovný list zo statického HTML Astro vrátane všetkých úloh, vstupov, očakávaných výstupov a odkazov. Anglická vetva a ovládanie webu sa vynechajú. Počet úloh sa overuje proti metadátam.
4. Lokálne súbory `solutions/exercise-XX/`, ak existujú, oddelené od zadania. Automatický import z nich nerobí overené riešenie aktuálneho cvičenia; bez revízie sú v rukopise výslovne označené ako pracovné implementácie.
5. Príklady z `weeks/*/examples/` a referencie z `resources.md`.

Tabuľky z PPTX sa čítajú z buniek aj samostatne kreslených hlavičiek a skladajú sa cez `longtable` a `booktabs`. Diagramy sú natívne TikZ, nie vložené obrázky. Dlhé vodorovné procesy sa zalomia do zvislého toku so zachovanými smermi šípok; viacvetvové diagramy zachovávajú vzťahy medzi uzlami. Ukážky GUI sa prevádzajú na tabuľky stavov a porovnania pred/po. Úlohy sa číslujú v rámci kapitol. Každý objekt je v `content-coverage.json` evidovaný ako prevedený alebo výslovne vylúčená hlavička, päta či číslo sekcie; chýbajúci alebo dvakrát spotrebovaný objekt zastaví generovanie.

Nový vložený obrázok alebo nepodporovaný grafický objekt vyvolá konkrétnu chybu s označením snímky. Automatický návrat k screenshotu neexistuje. Adaptéry v `scripts/book/presentation.py` sa dajú rozšíriť bez ručného upravovania vygenerovaných kapitol.

Prílohy obsahujú semestrálny projekt, návody a cheatsheet. Na konci je spoločná bibliografia; pôvodné referencie v kapitolách zostávajú zachované. Generátor nevymýšľa autorov ani dátumy zdrojov. Štartovacie dáta zostávajú v `exercises/` a ZIP súboroch, aby nezahlcovali tlačený text; manifest eviduje ich kontrolné súčty. Administratíva, analytika, študentské prezenčky a priečinok `paper/` sa do knihy neimportujú.

## Úprava vzhľadu a knižného textu

`book.config.json` nastavuje podtitul, rok, miesto, vydanie, poznámky, riešenia, doplnkové príklady a prílohy. `presentationMode: "semantic"` označuje natívny prevod prezentácií. Voliteľné `title`, `author`, `university`, `faculty` prepíšu hodnoty z konfigurácie predmetu. `sourceBaseUrl` môže zmeniť cieľ odkazov na materiály. Vlastnú konfiguráciu môžete odovzdať cez `--config book/local/my-book.json`.

`template.tex` určuje štruktúru knihy, `classicthesis-config.tex` jazyk, technické prostredia a monochromatickú tlač. Typografiu, rozloženie A4, kapitoly, obsah a záhlavia zabezpečuje priamo pôvodný ClassicThesis 4.1 z [požadovaného repozitára](https://github.com/ClassicThesis/ClassicThesis), revízia `f7ff17a17ab62abe24ce9434c4930b350aef91f2`. V `vendor/classicthesis/` je jeho nezmenený štýlový súbor, licencia, referenčná pôvodná konfigurácia a kontrolné súčty. Projekt nepreberá náhodnú verziu ClassicThesis z lokálnej inštalácie.

Odkázaný repozitár je starší fork. `compat/` preto obsahuje oddelený most na dnešné `scrlayer-scrpage` a Unicode sadzbu slovenčiny s pôvodným rozstupom písmen. Pôvodný `.sty` sa neupravuje. Aktuálny KOMA-Script môže vypísať upozornenia na staršie interné rozhranie nadpisov v ClassicThesis 4.1; tie sú oddelené od kontroly presahov, znakov, citácií a odkazov.

Neupravujte generované `dist/book/*/chapters/*.tex`. Zmenu urobte v zdroji, konfigurácii alebo adaptéri a znova spustite build.

Značka viditeľnej medzery `␠` zo štvrtého cvičenia sa v tlači zobrazuje ako `[SPACE]`, aby bola čitateľná aj s prenositeľným kódovým písmom. Pôvodné vstupné súbory sa nemenia.

Hovorený skript ešte nie je hotový knižný výklad. Ak chcete konkrétnu kapitolu redakčne prepísať, vložte súvislý Markdown do `book/local/chapters/01.md` až `10.md`. Tento text nahradí iba prednáškovú časť príslušnej kapitoly. Zadanie, príklady a riešenia sa naďalej načítajú automaticky. Podporované sú nadpisy, odseky, zoznamy, odkazy, inline kód, tučný text a bloky kódu. Náhrady sa používajú aj v študentskom variante; zahrňte do nich iba text, ktorý v ňom chcete mať. Priečinok `book/local/` je súkromný a ignorovaný Gitom.

## Príprava budúceho vydania

Predvolený výstup je pracovný rukopis. Staršie riešenia sa v tomto repozitári pri zmenách cvičení vždy neaktualizovali; generátor preto nič automaticky neoznačuje ako revidované. Chýbajúce poznámky nevymýšľa.

Po odbornej kontrole konkrétnej kapitoly alebo implementácie možno do súkromného `book/local/review.json` vložiť jej aktuálny kontrolný súčet z `report.md`:

```json
{
  "chapter-07": { "sha256": "hodnota z report.md", "reviewed": true },
  "solutions-07": { "sha256": "hodnota z report.md", "reviewed": true }
}
```

Zmena príslušnej prezentácie, poznámok, zadania, vstupných dát alebo riešenia zneplatní starý záznam. Parameter `--release` odmietne zostavenie s nevyriešenými redakčnými položkami. Nevykonáva publikovanie:

```powershell
npm run book:build -- --release
```

Kontrolné súčty slúžia na evidenciu revízie; nenahrádzajú odbornú recenziu. Pre skutočné publikovanie bude potrebná úprava hovorených pasáží do knižného jazyka, zosúladenie a testovanie všetkých riešení, bibliografia podľa požiadaviek vydavateľa a doplnenie skutočných vydavateľských údajov. Šablóna nevymýšľa ISBN ani recenzentov.

Overenie generátora: `npm run book:test`. Použité sadzobné nástroje: [KOMA-Script](https://ctan.org/pkg/koma-script), [fontspec](https://ctan.org/pkg/fontspec), [fvextra](https://ctan.org/pkg/fvextra).
