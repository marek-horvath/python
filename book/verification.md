# Overenie digitálnej sadzby — 10. november 2026

Tento pôvodný záznam vizuálnej revízie zostáva zachovaný. Novší build s výkladom
z komentovaných prezentácií je zaznamenaný na konci dokumentu.

Overený výstup: `dist/book/author/programovanie-v-pythone.pdf`, 250 strán.
SHA-256: `04f7e77b41f5e65a4a4cd0721f453343e94dac610617d5c13a3d61fe08d95bc0`.
Tento záznam sa vzťahuje na uvedený PDF súbor; ďalší build môže mať iný hash.

## Prostredie a zostavenie

Pred zmenami boli prečítané šablóna, konfigurácia, kompatibilitné súbory,
pripnutý ClassicThesis, generátor, adaptéry prezentácií, testy a konfigurácia
webových vstupov. Kapitoly a bibliografia sa generujú, nie sú samostatným
ručne udržiavaným zdrojom. Kniha nevkladá rastrové obrázky prezentácií;
tabuľky a diagramy sú natívne LaTeX/TikZ.

Na tomto počítači neexistovali `node_modules`, build webu ani build knihy.
Závislosti sa obnovili cez `npm ci`; prvý nezmenený úplný build vrátane
LibreOffice/Poppler, Astro, XeLaTeXu a Biberu úspešne vytvoril 251-stranové PDF
bez presahov. Nebolo potrebné nahrádzať písma ani balíky.

Overené prostredie: Windows, Node.js 22.14.0, npm 10.9.1, Python 3.11.5,
TeX Live 2023, XeTeX 0.999995, Biber 2.19. Písma TeX Gyre Pagella,
TeX Gyre Heros, DejaVu Sans Mono a Euler sú dostupné. Generátor nepoužíva
absolútne cesty ani assety zo starého počítača. Postup a závislosti sú
v [README.md](README.md).

Finálny úspešný príkaz z koreňa repozitára:

```powershell
npm run book:build
```

Prešlo aj všetkých 22 testov cez `npm run book:test` a kontrola `git diff --check`.

## Zmeny

- `scrbook` používa `oneside`, `openany` a nulový väzbový posun. Jediné konečné
  nastavenie geometrie je načítané po ClassicThesis: A4, 30 mm vľavo aj vpravo,
  šírka textu 150 mm, horný okraj 23 mm a dolný 25 mm vrátane hlavičky a päty.
- Hlavičky a čísla strán sú centrované. Eulerove čísla kapitol majú pôvodné
  písmo a veľkosť, ale sú v textovom bloku: dvojciferné číslo sa neorezáva.
- Všetky blokové ukážky používajú spoločný štýl `listings`: svetlosivé pozadie
  aj pod číslami riadkov, rovné rohy, neviditeľný rám, jednotné odsadenie,
  mierne zvýraznenie syntaxe a zalamovanie riadkov aj strán.
- Rozšírená znaková tabuľka `listings` zachováva poradie slovenských znakov
  aj znakov stromových výpisov pri XeTeXu. Samotné mapovanie `literate`
  nestačilo; chyba bola odhalená kontrolou vyrenderovaného PDF.
- Titulný list je oddelený v `titlepage.tex`, s väčším názvom, pôvodnými
  metadátami a symetrickými jemnými vektorovými ornamentmi.
- Dlhé inline identifikátory môžu zalomiť riadok na hraniciach slov alebo
  argumentov bez pridania spojovníka a bez zmeny samotného textu.

Pôvodný `classicthesis.sty`, licencia aj referenčná konfigurácia zostali
nezmenené; ich kontrolné súčty z manifestu sú overené. Zostáva ClassicThesis
4.1, nie iná šablóna. Vstupné PPTX, pracovné listy, príklady, metadata,
referencie, labely a znenie kapitol sa nemenili.

## Technická a vizuálna kontrola

- Konečný build: 250 strán, bez chýb, bez `Overfull` boxov, chýbajúcich znakov,
  nevyriešených odkazov, duplicitných labelov a nevyriešených citácií.
- Všetkých 10 vygenerovaných kapitol a všetky prílohy boli porovnané
  s nezmeneným buildom po odstránení iba štýlových volieb ukážok a neviditeľných
  možností zalomenia. Obsah je zhodný. Bibliografia s 54 položkami a evidencia
  všetkých 415 snímok sú zhodné aj bajtovo.
- Text extrahovaný zo všetkých 445 kódových blokov PDF bol porovnaný
  so zdrojovými blokmi po vynechaní bielych znakov: **445 zhodných, 0 rozdielov**.
  Odsadenie sa navyše overilo v zdrojoch a vizuálne. Táto kontrola neznamená
  spustenie alebo odbornú revíziu samotných programov.
- Kontrola všetkých strán nenašla text mimo fyzickej stránky. Všetkých 248
  číslovaných strán má číslo vycentrované s odchýlkou pod 0,003 PDF bodu
  spôsobenou zaokrúhlením súradníc. Párne a nepárne strany používajú rovnakú
  geometriu. Sivé bloky majú na všetkých 203 stranách s kódom rovnaké krajné
  súradnice 85,039 a 510,237 PDF bodu.
- Všetkých 250 finálnych strán bolo vyrenderovaných a prezretých v 16
  kontaktných hárkoch. Podrobne boli kontrolované titulný list, obsah, začiatky
  kapitol vrátane desiatej, bežné textové strany, tabuľky, diagramy, prílohy
  a bibliografia. Osobitne boli kontrolované dlhé riadky, diakritika,
  77-riadkový `test_ulohy.py` a 91-riadkový `weather_cli.py` cez viac strán.

Renderovanie a extrakcia PDF sa vykonali cez lokálny PyMuPDF 1.24.14 a Pillow;
nie sú potrebné na zostavenie knihy. Diagnostika zostala v ignorovanom
`.tmp/book-audit/`: kontaktné hárky, detaily, `inspection.json` a
`code-comparison.json`. Pôvodný build zostal v `.tmp/book-before/`.

## Zostávajúce upozornenia a obmedzenia

- Tri mierne `Underfull \hbox`: badness 1028 v kapitole 6, 1048 v kapitole 10
  a 1496 v prílohe A. Ide o mierne voľnejšie medzery, nie o presah či orezanie.
- ClassicThesis 4.1 používa staré rozhrania pre hlavičky, `titlesec`, `tocloft`
  a nadpisy KOMA-Scriptu. Kompilátor na ne upozorňuje aj v pôvodnom projekte;
  štýl nebol nahradený ani upravený na potlačenie týchto hlásení.
- Biber v tejto Windows relácii upozorňuje na nepodporované systémové locale
  `C.UTF-8` a použije `C`. Bibliografiu úspešne zapíše v UTF-8; triedenie má
  explicitne nastavené `sk-SK`.
- Pri prirodzenom delení ukážok môže posledný riadok pokračovať na ďalšej
  strane, napríklad PDF strana 31 alebo 134. Celé dlhé ukážky sa nezamykajú
  do nezalomiteľných boxov, ktoré by vytvárali veľké prázdne plochy.
- Na tomto počítači chýbajú súkromné commented PPTX, lokálne riešenia aj
  redakčné záznamy. Existujúci `dist/book/author/report.md` eviduje 30 položiek;
  chýbajúci obsah nebol vymyslený. PDF zostáva pracovným vydaním s dostupnými
  verejnými materiálmi. Táto vizuálna revízia nenahrádza odbornú recenziu textu.

PDF a renderovaná diagnostika zostávajú lokálne v ignorovaných adresároch;
webový build knihu automaticky nepublikuje.

## Doplnenie: priebežný výklad z komentárov

Po návrate na počítač s lokálnymi autorskými podkladmi bol pridaný export
`book:commentary` a Markdown vrstva v `book/local/commentary/`. Z deviatich
dostupných komentovaných prezentácií sa zachovalo všetkých 389 poznámok,
spolu 38 153 slov. Pri každom slajde bolo programovo porovnané úplné poradie
slov v pôvodných Speaker Notes a exportovanom texte po vynechaní značiek
materiálov. Komentovaná šiesta prednáška chýba; jej súbor má 26 sekcií
s miestom na vlastný text. Tri neaktuálne komentáre (01/12, 04/4 a 05/7)
zostávajú v Markdown súboroch, ale kontrola vizuálnych súčtov ich nepripojí
k zmeneným slajdom. Oba varianty knihy preto používajú výklad k 386 slajdom.

| Variant | Strany | Presahy hbox/vbox | Rastrové obrázky | SHA-256 PDF |
|---|---:|---:|---:|---|
| Autorský | 369 | 0 | 0 | `8e06add26de38efb5fabaf153b0966d30d11789bbc6a342c51df28fae81b863a` |
| Študentský | 328 | 0 | 0 | `9358cc5e259f66f009f300cf80f905f4f515c6019c94580aae1a33c67e9f4ae7` |

Overenie zahŕňalo plný `npm run book:build` s aktuálnym buildom webu,
študentský build s `--skip-web --student`, 38 testov generátora a TypeScript
typecheck. Obe PDF úspešne prešli XeLaTeXom a Biberom bez chýb znakov,
duplicitných odkazov či nevyriešených citácií. Extrakcia textu zo študentského
PDF potvrdila poradie úvodného vysvetlenia, prvej ukážky, ďalšieho vysvetlenia,
druhej ukážky a záveru na PDF strane 8. Študentský manifest neobsahuje žiadnu
referenčnú implementáciu; autorský ich obsahuje 39 súborov.

Testy overujú zachovanie ručných úprav, aktualizovanie nedotknutého importu,
prípravu samostatného importu na porovnanie pri konflikte, zachovanie textu
odstránených slajdov, použitie Markdownu bez súkromného PPTX, zhodu vizuálnych
zdrojov, kontrolu úplnosti značiek a obe knižné verzie. Opakované generovanie
z rovnakých vstupov nezmenilo ani bajt v 26 Markdown/LaTeX/BibTeX súboroch.
Súkromné texty aj výsledné PDF sú naďalej ignorované Gitom.

Toto doplnenie overuje obsahový tok a technickú kompiláciu; nová screenshotová
revízia nebola vykonaná. Pôvodná centrovaná sadzba, titulný list, písma a štýl
kódových blokov sa nemenili. Redakčný report na tomto počítači obsahuje
24 položiek v autorskej a 14 v študentskej verzii; kontrolné súčty nenahrádzajú
odbornú revíziu hovoreného výkladu a referenčných implementácií.

## Doplnenie: záhlavie, nadpisy, odseky a odborné výrazy

Na základe dvoch ukážok problematickej sadzby bolo záhlavie zmenené na názov
kapitoly vpravo nad čiarou hrúbky 0,35 pt. Menšie nadpisy majú tučný rez
a rozlíšené veľkosti. Odseky majú nulové odsadenie a jednotné medzery;
zalomenia v jednom textovom objekte PPTX nevytvárajú nové odseky.
Priamy prevod porovnania prázdnych vstupov vytvára tabuľku, zachováva rovné
úvodzovky a presný počet medzier cez viditeľné značky. Žiadny pôvodný
textový objekt slajdu nie je vynechaný.

Slovník `book/terms.json` obsahuje 549 rôznych výrazov. Výrazy vo výklade,
zoznamoch, tabuľkách, popisoch a menších nadpisoch sa sadzia kurzívou.
Ukážky kódu, explicitný inline kód, adresy a názvy súborov sa týmto slovníkom
nemenia. Výrazy sa rozpoznávajú na hraniciach celých slov a viacslovné spojenia
majú prednosť pred jednotlivými slovami.

| Variant | Strany | Presahy hbox/vbox | Rastrové obrázky | SHA-256 PDF |
|---|---:|---:|---:|---|
| Autorský | 396 | 0 | 0 | `41a40beb68cef8247ad2e71c8a42e51d15787987e7ab30fa86a0453cda338685` |
| Študentský | 354 | 0 | 0 | `604aa88fdeb68d697e5e7cbbdf5823cf78867be82c24bde2abda3617ddf9ff31` |

Úspešne prešlo 46 testov a TypeScript typecheck. Obe knihy boli zostavené
s aktuálnymi podkladmi cez `--skip-web`, XeLaTeX a Biber; nebol potrebný nový
render nezmeneného webu. Výstupy obsahujú 62 natívnych tabuliek, 31 diagramov
a výklad k 386 aktuálnym slajdom. Pôvodné PPTX ani kódové programy sa nemenili.

Vykonaná bola cielená vizuálna kontrola miest z používateľových screenshotov:
prázdne vstupy na PDF strane 132 a neplatný index na strane 134 študentskej
verzie, plus dlhšie záhlavie a ukážky backendu na strane 298. Rovnaký nadpis
o neplatnom indexe bol skontrolovaný aj na strane 144 autorskej verzie.
Kontrolované boli rovné úvodzovky, tri viditeľné medzery vo vstupe, tabuľka,
tučný nadpis, medzery medzi odsekmi, kurzíva odborných výrazov a poloha
záhlavia s čiarou. Náhľady a merania zostávajú lokálne v
`.tmp/book-typography-audit/`. Staršie záznamy vyššie popisujú staršie PDF.

## Doplnenie: zoskupovanie samostatných prvkov a odstránenie projektu

Prevod samostatných textových polí bol rozšírený o zoskupovanie podľa polohy
a typu obsahu. Operátory a významy tvoria tabuľkové riadky, výrazy s výsledkami
majú vlastnú tabuľku, hodnoty pri unpackingu sú pod menami premenných a časti
jednej ukážky sa spájajú do kódového bloku. Popisy ukážok patria ku konkrétnemu
bloku, výstupy nemajú čísla riadkov. Náčrt Tkinter gridu zachováva spoločný
nadpis cez dva stĺpce. Semestrálny projekt bol odstránený z knižných príloh;
zostali návody a cheatsheet.

Kontrola všetkých 415 slovenských slajdov nenašla žiadne zostávajúce voľné
monospace textové pole. Pokrytie zahŕňa každý pôvodný textový objekt práve raz.
Výsledok obsahuje 336 sémantických blokov ukážok/výstupov, 70 natívnych tabuliek
zo slajdov a pôvodných 31 diagramov. Obe verzie naďalej používajú výklad
k 386 aktuálnym slajdom. V uloženom komentári k unpackingu bola tiež opravená
nesprávna veta: na jednej úrovni priradenia môže byť iba jeden hviezdičkový cieľ,
pri vnorenom zápise môže mať každá úroveň vlastný.

| Variant | Strany | Presahy hbox/vbox | Rastrové obrázky | SHA-256 PDF |
|---|---:|---:|---:|---|
| Autorský | 375 | 0 | 0 | `14ed88ea76408f423db69efa065caaf9d5be57d155c82b7d47b3fc32191dbdb4` |
| Študentský | 335 | 0 | 0 | `721a1741b8a2c469d93e442d43e2375d85fb4385ac1aef53d2b0014f4e99621a` |

Prešlo 54 testov a TypeScript typecheck. Regresné prípady overujú vzťahy
operátor/význam, pomenované hodnoty, oblasti s príslušnými knižnicami,
výraz/výsledok, skladanie kódu, oddelenie výstupu, zachovanie programového kódu
vedľa GUI gridu a migráciu Markdownu bez súkromného PPTX. Opakovaný export
nezmenil žiadny z desiatich uložených súborov komentárov. Obe PDF sa zostavili
cez XeLaTeX a Biber bez presahov, chýbajúcich znakov či nevyriešených odkazov.
Projektová príloha nie je v LaTeXu, v obsahu PDF ani v zdrojovom manifeste.

Vizuálne boli skontrolované porovnanie operátorov na PDF strane 8 a unpacking
na strane 16 študentskej verzie, navyše slicing na strane 15 a Tkinter grid
na strane 84. Náhľady a posledné kontrolné súčty sú lokálne v
`.tmp/book-structured-audit/`. Web, verejné PPTX a zdrojové programy sa nemenili.

## Doplnenie: medailón autora

Za predhovor bola vložená samostatná časť „O autorovi“, v oboch PDF na strane
iv (štvrtá strana súboru). Meno preberá centrálne metadata; medailón sa načítava
z `book/author.md` podľa položky `authorBiography` v knižnej konfigurácii.
Podkladom bolo lokálne CV a aktuálne [portfólio autora](https://marek-horvath.github.io/portfolio/).
Pri rozpore s CV bol použitý aktuálnejší údaj portfólia o ukončení doktorandského
štúdia a pôsobení ako odborný asistent v roku 2026. Build CV ani sieť nepotrebuje.

Prešlo 54 testov; obe PDF sa úspešne skompilovali bez presahov. Overená bola
položka v obsahu, stránka s medailónom, meno z metadát a evidencia zdroja
v `sources.json`. Vizuálny náhľad je v `.tmp/book-author-audit/author-page.png`.
Autorská verzia má 376 strán, SHA-256
`2ce2bf7a79dd3c431f4fe8da0d7c12007d4dbb9b7bf3db2f942a9c1a6d65f5fd`;
študentská 336 strán, SHA-256
`4e98b85e03c4e799b3b712ed98d98b5dec0fff8888d04902db0dc957e9719250`.

## Doplnenie: konkrétne názvy a tematické členenie

Opakovaný nadpis „Prednáška“ bol odstránený. Výklad desiatich kapitol teraz
obsahuje 45 tematických častí, napríklad „Objekty, identita a kopírovanie“,
„Od plánu k bezpečnému presunu“ alebo „Perzistencia, transakcie a životný cyklus
session“. Názvy úloh, implementácií, programových ukážok a dokumentácie opisujú
skutočný obsah každej kapitoly. Všeobecný prvý nadpis zdrojového resources.md
sa nezobrazuje opakovane pod novým konkrétnym nadpisom. Zhoda názvu úvodného
slajdu a kapitoly sa sadzí iba raz; výklad a materiály úvodného slajdu sa zachovali.

Členenie je v `book/chapters.json`, ukotvené na jednoznačné názvy snímok.
Vloženie snímky neposunie hranicu na inú tému; neplatné alebo premenované kotvy
zastavia generovanie s konkrétnou chybou. Profil je evidovaný v zdrojovom manifeste.
Názvy starších implementácií zostali verné ich obsahu, aj keď sa ich zadanie
odlišuje od aktuálneho pracovného listu.

| Variant | Strany | Položky častí v obsahu | Presahy hbox/vbox | SHA-256 PDF |
|---|---:|---:|---:|---|
| Autorský | 379 | 79 | 0 | `39eabc1e447476bae2611afd69763b94f30f717de98673df8c42bb370f2943ba` |
| Študentský | 339 | 69 | 0 | `82c44ae42ba8db8c48e36d70024d0511d9a45dc9cff88a7f5bcf0d290b7eb483` |

Prešlo 59 testov vrátane posunu kotiev po vložení slajdu, odmietnutia chýbajúcich,
duplicitných alebo nesprávne zoradených kotiev a zachovania odkazov po vynechaní
úvodného názvu resources.md. Obe PDF sa skompilovali cez XeLaTeX a Biber bez
presahov. Obsah ani knižné sekcie už neobsahujú pôvodných päť všeobecných názvov.
Počty 100 úloh, výkladu k 386 aktuálnym slajdom, 336 blokov a 70 tabuliek sa nezmenili.

Vizuálne bol skontrolovaný obsah na PDF strane 5, začiatok kapitoly o automatizácii
na strane 43 a prechod k organizátoru súborov na strane 70 študentského PDF.
Náhľady a kontrolné súčty sú v `.tmp/book-chapter-structure-audit/`.

## Doplnenie: nadpisy bez obsahu medzi nimi

Úvodný podnadpis slajdu bol zlúčený s tematickým nadpisom vo všetkých 45 častiach.
Výklad sa začína priamo pod názvom témy; zdrojový titul zostáva evidovaný
v pokrytí a pri príslušných ukážkach. Mená zdrojových súborov už netvoria
samostatné podnadpisy nad popisom tej istej ukážky. Úvodné nadpisy README
a dokumentácie sa zlúčili s knižným nadpisom. Osem všeobecných nadpisov „Úlohy“
nad prvou číslovanou úlohou sa pri knižnom importe vynecháva.

Pôvodná kontrola našla 54 párov bežných nadpisov; po zahrnutí makra číslovaných
úloh ďalších osem. Konečný audit oboch variantov nenašiel žiadny bezprostredný
pár nadpisov bez obsahu medzi nimi, vrátane číslovaných úloh a príloh.
Všetkých 100 číslovaných úloh, 336 blokov ukážok/výstupov, 70 tabuliek a výklad
k 386 aktuálnym slajdom zostali zachované.

| Variant | Strany | Susediace nadpisy bez obsahu | Presahy hbox/vbox | SHA-256 PDF |
|---|---:|---:|---:|---|
| Autorský | 371 | 0 | 0 | `88135ae5a13eb3987b1ebf97d22fa54c7effc24c1cc291bd35f03c2d7aaf0acd` |
| Študentský | 334 | 0 | 0 | `c2307537aefda014b2d21a660f9a930a8354cabf7234b830964edce579d7efeb` |

Prešlo 63 testov. Nové prípady overujú jediný nadpis na začiatku témy,
zachovanie jej výkladu a kotvy, súborových ciest, popisov, kódu, odkazov a neskorších
podnadpisov. Samostatný test chráni číslovanie a obsah úloh po odstránení
všeobecného nadpisu skupiny. Obe PDF sa úspešne skompilovali bez presahov.

Vizuálne sa kontrolovala téma plánovania súborov na strane 42, zdrojové ukážky
na strane 40, dokumentácia na strane 76 a prvá číslovaná úloha na strane 30
študentského PDF. Náhľady a posledné kontrolné súčty sú v
`.tmp/book-single-heading-audit/`.
