# Overenie digitálnej sadzby — 10. november 2026

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
