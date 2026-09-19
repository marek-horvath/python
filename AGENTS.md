# Pravidlá práce v tomto repozitári

Tento súbor je persistentná inštrukcia pre budúcu prácu na predmete **Programovanie v Pythone**.

Cieľom repozitára je vytvárať a udržiavať kvalitné materiály pre univerzitný predmet: web, prednášky, cvičenia, semestrálny projekt a doplnkové materiály.

Pri všetkých zmenách uprednostňuj:

1. odbornú správnosť;
2. čitateľnosť;
3. prirodzenú didaktickú postupnosť;
4. jednoduchosť technického riešenia;
5. konzistentný vizuálny systém.

Nevytváraj funkcie, vizuálne prvky ani text iba preto, aby projekt pôsobil „modernejšie“.

---

## Jazyk a publikum

- Obsah určený študentom píš primárne v slovenčine.
- Web podporuje `sk` a `en`.
- Slovenčina je default jazyk.
- Jazyk sa prepína cez existujúcu i18n vrstvu a `localStorage` kľúč `python-course.language`.
- Anglické preklady píš prirodzenou odbornou angličtinou, nie doslovným prekladom slovenských viet.
- SK a EN verzia tej istej prednášky alebo materiálu musia byť obsahovo ekvivalentné.
- Neprekladaj technické identifikátory, názvy Python API, commands, package names, filenames, HTTP methods ani SQL/Python keywords.
- Zdrojový kód, názvy premenných, funkcií, knižníc a API nechávaj prirodzene v angličtine.
- Ustálené odborné termíny ako `DataFrame`, `fixture`, `callback`, `event loop`, `endpoint`, `ORM`, `request`, `response` alebo `middleware` neprekladaj násilne.
- Publikum: študenti 2. ročníka Aplikovanej informatiky na TUKE FEI.
- Predpokladaj, že študenti už poznajú základy programovania.
- Predmet nemá znova vysvetľovať úplné základy ako premenné, `if`, cykly alebo všeobecnú definíciu funkcie, pokiaľ to nie je potrebné na vysvetlenie špecifického správania Pythonu.

---

## Hlavný smer projektu

- Projekt má byť jednoduchý univerzitný web predmetu, nie SaaS produkt.
- Web má primárne organizovať a publikovať študijné materiály.
- Nepoužívaj backend, databázu, autentifikáciu, CMS ani admin rozhranie, pokiaľ si to vyučujúci výslovne nevyžiada.
- Minimalizuj JavaScript a externé závislosti.
- Preferuj statické riešenia.
- Nepridávaj dashboardy, gamifikáciu, achievements, používateľské profily, cloudový progress ani LMS funkcionalitu bez explicitnej požiadavky.
- Stránka konkrétnej prednášky má byť samotná prezentácia.
- Stránka konkrétneho cvičenia má byť pracovný materiál pre študenta.
- Projekt má zostať jednoduchý na deployment cez GitHub Pages.

---

## Zdroj pravdy

- Globálne metadata predmetu sú v `shared/course.config.ts`.
- Metadata týždňa sú v `weeks/week-XX-*/week.config.ts`.
- Zoznam týždňov skladá `shared/weeks.ts`.
- Publikované prednášky registruje `shared/presentations.ts`.
- Publikované cvičenia registruje `shared/exercises.ts`.
- Editovateľný verejný zdroj každej prednášky je v `presentations/` ako `.sk.pptx` a `.en.pptx`.
- Základné i18n typy, shared UI preklady a centrálne anglické názvy týždňov sú v `shared/i18n.ts`.
- Veľké obsahové stránky používajú jeden layout a prepínajú text cez existujúcu i18n vrstvu, nie cez duplicitu samostatných SK/EN komponentov.
- Web nesmie ručne duplikovať zoznam týždňov, názvy, slugs, dátumy ani statusy.
- Ak údaj existuje v centrálnom configu, nepíš ho znova hardcoded do komponentov.
- Verejný PPTX je source of truth pre vizuálny obsah prednášky.
- Lokálne `*-commented.pptx` nikdy nie sú source of truth.

---

## Organizácia týždňov

Každý týždeň má vlastný izolovaný adresár:

```text
weeks/week-XX-topic/
  week.config.ts
  outline.md
  resources.md
  examples/
  assets/
  output/
```

- Nezasahuj do ostatných týždňov, pokiaľ to nevyžaduje zdieľaná infraštruktúra.
- Obsah jedného týždňa má byť čo najviac lokálny v jeho adresári.
- Shared komponenty vytváraj iba vtedy, ak ich reálne používajú viaceré týždne.

---

## Web

Hlavná navigácia je iba:

- `Úvod`
- `Prednášky`
- `Cvičenia`
- `Projekt`
- `Návody`
- `Cheatsheet`

Pravidlá:

- `/prednasky/` je jednoduchý typografický zoznam prednášok.
- `/prednasky/XX-slug/` je fullscreen webový viewer PPTX prezentácie.
- `/cvicenia/` je zoznam cvičení.
- `/cvicenia/XX-slug/` je pracovný list, nie prezentácia.
- `/projekt/` je verejne označená ako `Projekt` a obsahuje jedno semestrálne zadanie.
- `/zadania/` je iba spätné presmerovanie na `/projekt/`.
- `/cheatsheet/` je programátorská referencia, nie učebnica.
- Nevytváraj veľké marketingové hero sekcie, CTA, štatistiky ani landing-page bloky.
- Nepoužívaj grid veľkých kariet ako default layout.
- Nepridávaj text len preto, aby stránka vyzerala „plnšie“.
- Aktívna položka navigácie má byť jasne viditeľná.
- Layout musí byť použiteľný na desktope aj mobile.

---

# Prezentácie

## Zdroj a rendering

- Primárnym zdrojom verejnej prezentácie je editovateľný `.pptx` súbor v `presentations/`.
- Každá prednáška má:
  - `XX-slug.sk.pptx`
  - `XX-slug.en.pptx`
- Web podľa zvoleného jazyka použije správnu verziu.
- Build renderuje PPTX cez LibreOffice do PNG.
- Existujúci Astro viewer ich preklikáva cez kliknutie, klávesy, fullscreen a hash v URL.
- PPTX musí zostať kompatibilný s týmto rendering workflow.
- Nepoužívaj PowerPoint funkcie, ktorých význam závisí od animations alebo desktop-only efektov.
- Každý slide musí fungovať aj ako statický obrázok.

Po manuálnej úprave PPTX použi podľa potreby:

```bash
npm run presentations:render
```

alebo:

```bash
npm run build
```

Po pushi do `main` rovnaký proces vykoná GitHub Actions a aktualizuje `gh-pages`.

---

## Obsah prednášok

- Prednáška nemá byť katalóg izolovaných pojmov.
- Každá prednáška musí mať prirodzený narrative flow.
- Musí byť zrejmé, prečo jeden koncept nasleduje po druhom.
- Preferuj štruktúru podľa významu témy, nie podľa univerzálnej šablóny.

Používaj podľa situácie napríklad:

```text
problém
↓
koncept
↓
ukážka
↓
dôsledok
```

alebo:

```text
naivné riešenie
↓
problém
↓
lepší návrh
↓
ukážka
```

alebo:

```text
existujúca aplikácia
↓
nová požiadavka
↓
nový nástroj
↓
rozšírenie aplikácie
```

- Teóriu prirodzene striedaj s konkrétnymi príkladmi.
- Dôležitý technický koncept nemá zostať iba ako bullet list.
- Kód, diagram, výstup alebo porovnanie majú nasledovať dostatočne skoro po teoretickom vysvetlení.
- Nepoužívaj povinnú štruktúru `agenda → 5 sections → questions → summary → next`.
- Každá prednáška môže mať inú kompozíciu podľa témy.
- Section divider používaj iba pri skutočne významnom tematickom prechode.
- Otázkové slajdy používaj iba tam, kde majú pedagogický význam.
- Zhrnutie nie je povinné.
- „Ďalej“ slide nie je povinný.
- Title slide má byť jednoduchý a profesionálny.

Reálne 50–60 minútové prednášky plánuj typicky približne na:

```text
35–45 slajdov
```

Nie je to rigidný limit.

Dôležitejší je obsah a tempo.

---

## Odborná úroveň prednášok

- Technická správnosť má vyššiu prioritu než jednoduchosť sloganu.
- Nepoužívaj populárne zjednodušenia, ak sú technicky nesprávne.
- Rozlišuj napríklad:
  - Python vs CPython;
  - language vs implementation;
  - HTTP error response vs transport/network error;
  - authentication vs authorization;
  - encoding vs hashing vs encryption;
  - SQL vs ORM;
  - `async` vs paralelizmus;
  - `assert` vs runtime validation;
  - shallow copy vs deep copy;
  - equality vs identity.
- Ak je koncept zjednodušený pre výučbu, formuluj ho stále technicky korektne.
- Používaj aktuálne Python API a aktuálne štýly knižníc.
- Pri SQLAlchemy preferuj moderný 2.x štýl.
- Pri FastAPI/Pydantic používaj aktuálny spôsob API podľa verzií projektu.

---

## Vizuálny systém prezentácií

Prezentácie majú pôsobiť ako:

> profesionálne pripravené univerzitné technické prednášky

Nie ako:

> AI-generated slide deck alebo SaaS pitch deck.

Spoločná vizuálna identita:

- biele dominantné pozadie;
- modrá ako hlavný akcent;
- neutrálna sivá ako sekundárna farba;
- tmavý text;
- technický, akademický charakter;
- konzistentné margins;
- konzistentná typografia;
- konzistentný code styling.

Nepoužívaj:

- neon purple/blue gradienty;
- glow;
- glassmorphism;
- dekoratívne blobs;
- veľké rounded cards;
- pill badges;
- fake dashboardy;
- stock fotografie;
- generické ilustrácie;
- random icons;
- fake IDE window;
- macOS traffic-light bodky;
- card soup;
- marketingové quote slides;
- veľké dekoratívne frázy bez informačnej hodnoty.

---

## Anti-AI pravidlá pre slajdy

AI-generated vzhľad často vzniká tým, že sa rovnaké vizuálne rozhodnutie opakuje bez ohľadu na obsah.

Preto:

- Nepoužívaj `title + 3 bullets` ako default layout.
- Nepoužívaj tri alebo štyri rovnaké karty len preto, aby sa vyplnila plocha.
- Nepoužívaj šípky medzi položkami, ktoré netvoria proces.
- Nepoužívaj rovnaký split layout na každom druhom slide.
- Nepoužívaj ikonu pri každej myšlienke.
- Nepoužívaj generický slogan ako hlavný technický nadpis.
- Nepoužívaj mechanicky rovnaký počet section dividerov.
- Nepoužívaj rovnaký počet otázok v každej prednáške.
- Nepridávaj dekoráciu len preto, že na slide zostalo prázdne miesto.

Každý slide navrhni podľa typu informácie.

Príklady:

- vzťah objektov → diagram;
- správanie kódu → code + output;
- alternatívy → comparison;
- proces → flow;
- dátová štruktúra → table;
- architektúra → diagram;
- jedna zásadná myšlienka → veľký typografický statement;
- sekvencia transformácie → before/after alebo step-by-step.

---

## Whitespace

- Whitespace má byť zámerný.
- Veľká prázdna plocha nie je automaticky minimalistický dizajn.
- Ak polovica slajdu ostáva bez funkcie, najprv skontroluj, či:
  - text nemôže byť väčší;
  - code nemôže byť väčší;
  - koncept nepotrebuje diagram;
  - chýba output;
  - chýba comparison;
  - layout nevyužíva dostupnú plochu.
- Nezapĺňaj prázdne miesto dekoráciami.

---

## Typografia prezentácií

Text musí byť čitateľný z projektora.

Preferuj približne:

- hlavný title: výrazný a dominantný;
- slide title: približne 30–40+ pt podľa kompozície;
- hlavný statement: približne 28–36+ pt;
- body text: typicky približne 24–30 pt;
- sekundárny text: približne 20–24 pt;
- code: čo najväčší pri zachovaní formátovania.

Nie sú to rigidné hodnoty.

Ak slide obsahuje iba tri krátke body, nepoužívaj font dimenzovaný na desať bodov.

Ak sa obsah nezmestí:
- skráť ho;
- rozdeľ slide;
- zväčši code area.

Nepoužívaj font size odvodený od šírky viewportu.

---

## Layouty prezentácií

Je možné používať napríklad:

- concept slide;
- theory slide;
- full-code slide;
- theory + code split;
- code + output;
- before / after;
- comparison;
- process diagram;
- architecture diagram;
- terminal + output;
- table;
- chart/data slide;
- worked example;
- question slide.

Tieto layouty nie sú povinná sada.

Nepoužívaj všetky v každej prednáške.

Layout má reagovať na obsah.

---

## Kód v prezentáciách

- Kód má zostať text, nie screenshot IDE.
- Kódové slajdy drž typicky približne na 5–15 riadkoch.
- Dlhšie príklady rozdeľ na viac slajdov.
- Nezmenšuj code font kvôli príliš veľkému príkladu.
- Používaj konzistentný monospace font.
- Syntax highlighting má byť čitateľný, nie krikľavý.
- Nepridávaj Copy button do PPTX.
- Nepridávaj fake editor chrome.
- Ak je relevantný output, zobraz ho priamo na slide.
- Ak je code zámerne chybný, musí byť jasné, že ide o problematický príklad.

---

## Diagramy

- Diagram musí vysvetľovať technický vzťah alebo proces.
- Nepoužívaj diagram ako dekoráciu.
- Preferuj jednoduché shapes, text a šípky.
- Šípka má znamenať reálny tok, závislosť, transformáciu alebo referenciu.
- Neprepájaj šípkami paralelné kategórie.
- Diagramy majú používať jednotný vizuálny štýl.

---

## Tabuľky

- Tabuľku používaj iba pri skutočnom porovnaní.
- Nepoužívaj tabuľku ako náhradu bullet listu.
- Drž počet stĺpcov a riadkov primeraný projektoru.
- Preferuj veľký text a dostatočný spacing.
- Nepoužívaj hrubé bordery všade.

---

# Verejné a commented prezentácie

## Verejné PPTX

Verejné PPTX sú:

```text
XX-slug.sk.pptx
XX-slug.en.pptx
```

Tieto prezentácie:

- sú publikované;
- používa ich web;
- môžu byť commitnuté;
- NESMÚ obsahovať speaker notes;
- NESMÚ obsahovať presenter notes;
- NESMÚ obsahovať hidden lecturer-only text;
- NESMÚ obsahovať riešenia alebo interné komentáre pre vyučujúceho.

Verejný deck musí byť čistý študentský materiál.

---

## Commented PPTX

Je povolené vytvárať lokálne teaching copies:

```text
*-commented.pptx
```

Napríklad:

```text
01-uvod-ku-pythonu.sk-commented.pptx
```

Commented prezentácia:

- je určená výhradne vyučujúcemu;
- môže obsahovať PowerPoint Speaker Notes;
- musí mať rovnaké slajdy a vizuálny obsah ako príslušný verejný slovenský deck;
- nesmie byť publikovaná;
- nesmie byť routovaná;
- nesmie ju načítať presentation viewer;
- nesmie byť súčasťou buildu;
- nesmie byť commitnutá;
- nesmie byť pushnutá;
- musí byť ignorovaná Gitom.

`.gitignore` musí obsahovať pravidlo pre commented prezentácie, napríklad:

```gitignore
*-commented.pptx
```

Ak presentation loader používa glob discovery, musí `*-commented.pptx` explicitne ignorovať.

Commented PPTX nikdy nie je source of truth.

Ak sa verejný slovenský deck zmení, commented verzia sa musí regenerovať alebo aktualizovať.

---

## Speaker Notes v commented PPTX

Speaker Notes v commented prezentácii majú obsahovať:

> kompletný hovorený skript vyučujúceho

Nie meta-inštrukcie.

Zakázané:

```text
Vysvetli dynamické typovanie.
Spomeň CPython.
Ukáž diagram.
Povedz príklad.
```

Požadované:

```text
Na tomto slide je dôležité oddeliť samotný jazyk Python od jeho implementácie. Python definuje syntax a správanie jazyka, zatiaľ čo CPython je konkrétna implementácia, ktorú používame najčastejšie...
```

Notes majú byť:

- prirodzená hovorená slovenčina;
- profesionálne;
- technicky presné;
- dostatočne detailné;
- samostatne použiteľné pri Presenter View.

Vyučujúci musí byť schopný podľa notes prakticky celú prednášku odprezentovať.

Notes majú:

- vysvetľovať význam slajdu;
- dopĺňať kontext;
- vysvetľovať code;
- vysvetľovať diagram;
- uvádzať output;
- vytvárať prirodzený prechod medzi témami.

Nemajú iba opakovať text zo slajdu.

Orientačne:

- jednoduchý slide: približne 50–100 slov;
- bežný technický slide: približne 80–150 slov;
- náročný code/diagram slide: približne 120–200 slov.

Nie je to rigidný limit.

Celý script má zodpovedať reálnemu času prednášky.

---

# Cvičenia

- Cvičenie nie je prezentácia.
- Stránka cvičenia má byť samostatne riešiteľný worksheet pre študenta.
- Každé cvičenie má mať zmysluplnú zásobu práce približne na 90 minút.
- Úlohy nemajú byť triviálne syntax drills.
- Jedna hlavná úloha môže obsahovať viac krokov.
- Študent má pri riešení kombinovať viac konceptov.
- AI nástroje môžu riešenie urýchliť, preto majú úlohy obsahovať dostatok práce a rozhodovania.
- Každá úloha má mať podľa potreby:
  - kontext;
  - vstupné dáta;
  - konkrétne požiadavky;
  - edge cases;
  - očakávaný výstup.
- Nerob gamifikáciu.
- Nerob slider alebo carousel.
- Nerob veľké karty úloh.
- Existujúci expand/collapse a lokálny completion tracking sú povolené.
- Completion tracking zostáva iba v `localStorage`.
- Nevytváraj backend pre progress.

Starter súbory môžu byť v:

```text
exercises/exercise-XX/
```

Verejne stiahnuteľné ZIP súbory patria do:

```text
web/static/downloads/
```

Referenčné riešenia pre vyučujúceho patria do:

```text
solutions/exercise-XX/
```

a nesmú byť routované ani kopírované do `web/static`.

---

# Vizuálny systém webu

Spoločný webový štýl je v:

```text
web/src/styles/global.css
```

Farebný smer:

- biela ako dominantné pozadie;
- modrá ako hlavný accent;
- neutrálna sivá;
- tmavý text.

Nepoužívaj:

- krémovú paletu;
- zelenú ako hlavný accent;
- neon purple/blue gradienty;
- glow efekty;
- glassmorphism;
- dekoratívne blob tvary;
- veľké rounded cards;
- pill badges;
- fake dashboardy;
- AI/SaaS landing-page vizuál.

Preferuj:

- kvalitnú typografiu;
- čistý grid;
- presný spacing;
- asymetriu tam, kde pomáha kompozícii;
- minimum borderov;
- minimum horizontálnych čiar;
- konzistentné content widths;
- normálny akademický/technický charakter.

Nerieš zlú kompozíciu pridaním cards.

Nerieš prázdny priestor dekoráciou.

---

# Anti-AI pravidlá pre web

Vyhýbaj sa patternu:

```text
small eyebrow
HUGE HEADING
paragraph
```

na každej sekcii.

Vyhýbaj sa:

```text
card card card
card card card
```

ako univerzálnemu layoutu.

Nepoužívaj generické marketingové formulácie:

- „Objavte...“
- „Vaša cesta...“
- „Pripravení začať?“
- „Od základov po...“
- „Čo získate...“
- „Moderné riešenie...“

Predmetový web nemá študenta presviedčať, aby si predmet kúpil.

Text má byť vecný.

---

# Workflow rozpracovania prednášky

Keď príde požiadavka typu:

> Rozpracuj týždeň 2

postupuj takto:

1. Prečítaj `week.config.ts`, `outline.md` a `resources.md`.
2. Skontroluj, čo študenti už poznajú z predchádzajúcich týždňov.
3. Urči hlavnú otázku alebo problém prednášky.
4. Navrhni narrative flow.
5. Urči približný rozsah.
6. Identifikuj teoretické koncepty.
7. Identifikuj code examples.
8. Identifikuj diagramy.
9. Identifikuj worked examples.
10. Identifikuj otázky alebo demo checkpointy iba tam, kde dávajú zmysel.
11. Až potom vytvor alebo uprav PPTX.
12. Aktualizuj SK aj EN verziu.
13. Zaregistruj prednášku v `shared/presentations.ts`, ak ešte nie je registrovaná.
14. Spusti relevantnú validáciu.
15. Skontroluj presentation viewer.
16. Oprav zjavné vizuálne problémy.

Nevytváraj prednášku podľa pevnej univerzálnej šablóny.

---

# Workflow vizuálnej revízie prednášky

Pri vizuálnom polish pass:

1. Prejdi celý deck.
2. Identifikuj sparse slides.
3. Identifikuj príliš malé texty.
4. Identifikuj príliš malé code blocks.
5. Identifikuj zbytočné cards.
6. Identifikuj opakujúce sa layouty.
7. Skontroluj diagramy.
8. Skontroluj tabulky.
9. Skontroluj text overflow.
10. Skontroluj konzistentné margins.
11. Skontroluj viewer render.

Ak je slide dobrý, nemen ho len kvôli tomu, aby vznikol diff.

---

# Workflow commented prezentácie

Keď príde požiadavka na commented prezentáciu:

1. Najprv musí existovať finálna verejná slovenská PPTX.
2. Vytvor jej identickú lokálnu kópiu `*-commented.pptx`.
3. Zachovaj rovnaký počet a poradie slajdov.
4. Zachovaj identický vizuálny obsah.
5. Pridaj kompletný hovorený script do Speaker Notes každého slajdu.
6. Skontroluj, že commented PPTX je Git ignored.
7. Skontroluj, že ho web loader ignoruje.
8. Necommituj ho.
9. Nepushuj ho.

Ak sa verejný deck neskôr výrazne zmení, commented deck sa musí aktualizovať.

---

# Build a validácia

Použi:

```bash
npm run dev
```

na lokálny web.

Použi:

```bash
npm run validate
```

na kontrolu metadát, slajdov a Python ukážok.

Použi:

```bash
npm run typecheck
```

na TypeScript kontrolu.

Použi:

```bash
npm run build
```

na statický web.

Použi:

```bash
npm run presentations:render
```

na prevod PPTX do webového vieweru.

Nevykonávaj automaticky:

- Playwright;
- E2E;
- screenshot audit;
- visual regression testing;
- rozsiahle performance reporty;

pokiaľ si to vyučujúci výslovne nevyžiada.

Pri bežnej obsahovej úprave stačí relevantná technická validácia a build.

---

# Git workflow

- Nevykonávaj push bez explicitnej požiadavky.
- Pred commitom skontroluj `git status`.
- Necommituj temporary files.
- Necommituj `*-commented.pptx`.
- Necommituj render cache, pokiaľ nie je súčasťou existujúceho workflow.
- Pri väčšom sekvenčnom tasku neprerušuj prácu zbytočným reportom po každom malom kroku.
- Ak používateľ výslovne zadá viac prednášok naraz, považuj ich za jeden task a pokračuj podľa zadania.

---

# Stav týždňa

Používaj iba statusy:

- `planned`
- `in-progress`
- `published`

Na verejnom webe sa zobrazujú lokalizované labely.

Nepublikované materiály web nesmie prezentovať ako hotové študentské zdroje.

Viditeľnosť prednášky a cvičenia má vychádzať z existujúcej centrálnej konfigurácie.

Nevytváraj paralelnú visibility logiku.

---

# Záverečné pravidlo

Pri každej zmene sa pýtaj:

> Zlepšuje toto pochopenie, použiteľnosť alebo odbornú kvalitu materiálu?

Ak nie, pravdepodobne tú zmenu netreba.

Predmet má pôsobiť ako materiál pripravený vysokoškolským vyučujúcim pre študentov informatiky.

Nie ako:
- AI-generated kurz;
- marketingový web;
- SaaS aplikácia;
- generická PowerPoint šablóna.
