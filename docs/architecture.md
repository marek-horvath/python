# Architektúra

## Rozhodnutie po prerobení

Projekt používa jednoduchú architektúru vhodnú pre jeden univerzitný predmet a jedného správcu:

- statický web v Astro;
- spoločné metadata v `shared/`;
- izolované adresáre týždňov v `weeks/`;
- web-native slajdy v TypeScripte;
- voliteľný PPTX export iba ako sekundárny výstup.

Prednáška na webe je primárny formát. Študent po otvorení konkrétnej prednášky vidí priamo slajd, nie stránku s metadátami, kartami alebo dodatočnou navigáciou.

## Tok dát

```text
weeks/week-XX-*/week.config.ts
  -> shared/weeks.ts
  -> /prednasky, /cvicenia a navigácia obsahu

weeks/week-01-modern-python/lecture.ts
  -> shared/lectures.ts
  -> /prednasky/01-moderny-python/
  -> scripts/export-pptx.ts
```

## Zdroje pravdy

- `shared/course.config.ts`: názov predmetu, univerzita, fakulta, program, základná navigácia.
- `weeks/*/week.config.ts`: číslo, slug, názov, anotácia, status a dostupnosť materiálov.
- `weeks/*/lecture.ts`: iba pri publikovaných prednáškach; obsahuje webové slajdy.
- `web/src/styles/global.css`: spoločný vizuálny systém webu a slajdov.

## Čo tu zámerne nie je

Nie je tu backend, databáza, admin rozhranie, CMS, autentifikácia, serverové vyhľadávanie ani komplexný prezentačný framework. Projekt má zostať priamo editovateľný a ľahko pochopiteľný.

## Výstupy

Statický web sa builduje do:

```text
dist/web/
```

Voliteľný PPTX export sa ukladá do:

```text
dist/presentations/
```

PDF a obrázkové preview nie sú v tejto verzii súčasťou hlavného workflow. Dajú sa doplniť neskôr, ak bude existovať stabilný dôvod a nezvýšia zložitosť správy predmetu.
