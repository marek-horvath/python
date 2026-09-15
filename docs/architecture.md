# Architektúra

## Rozhodnutie po prerobení

Projekt používa jednoduchú architektúru vhodnú pre jeden univerzitný predmet a jedného správcu:

- statický web v Astro;
- spoločné metadata v `shared/`;
- izolované adresáre týždňov v `weeks/`;
- editovateľné PowerPoint prezentácie v jednom priečinku;
- rovnaký webový viewer nad odvodenými obrázkami slajdov.

Prednáška na webe zostáva primárny formát pre študenta. Študent po otvorení konkrétnej prednášky vidí priamo slajd, nie stránku s metadátami, kartami alebo dodatočnou navigáciou.

## Tok dát

```text
weeks/week-XX-*/week.config.ts
  -> shared/weeks.ts
  -> /prednasky, /cvicenia a navigácia obsahu

presentations/01-uvod-ku-pythonu.sk.pptx
  -> scripts/render-presentations.mjs
  -> web/static/generated/presentations/
  -> shared/presentations.ts
  -> /prednasky/01-uvod-ku-pythonu/
```

## Zdroje pravdy

- `shared/course.config.ts`: názov predmetu, univerzita, fakulta, program, základná navigácia.
- `weeks/*/week.config.ts`: číslo, slug, názov, anotácia, status a dostupnosť materiálov.
- `presentations/*.sk.pptx` a `presentations/*.en.pptx`: editovateľné zdroje slajdov.
- `scripts/render-presentations.mjs`: vytvára odvodené PNG náhľady pre webový viewer.
- `web/src/styles/global.css`: spoločný vizuálny systém webu a slajdov.

## Čo tu zámerne nie je

Nie je tu backend, databáza, admin rozhranie, CMS, autentifikácia, serverové vyhľadávanie ani komplexný prezentačný framework. Projekt má zostať priamo editovateľný a ľahko pochopiteľný.

## Výstupy

Statický web sa builduje do:

```text
dist/web/
```

Zdrojové PPTX súbory sú v:

```text
presentations/
```

PDF a obrázkové preview sú odvodené build artefakty a necommitujú sa. Renderovanie používa LibreOffice a `pdftoppm`.
