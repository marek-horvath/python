# Workflow

## Lokálny web

```bash
npm run dev
```

Astro web číta metadata zo `shared/` a `weeks/`. Prednášky registrované v `shared/lectures.ts` sa renderujú ako webové slajdy.

## Validácia

```bash
npm run validate
npm run typecheck
```

Validácia kontroluje:

- počet a štruktúru týždňov;
- duplicity čísel a slugov;
- existenciu pracovných súborov;
- konzistenciu publikovaných prednášok;
- počet slajdov;
- dĺžku nadpisov, textov, odrážok a code blockov;
- spustiteľné Python ukážky v slajdoch;
- `py_compile` pre `.py` súbory v `weeks/`.

## Build webu

```bash
npm run build
```

Príkaz spustí validáciu a statický Astro build do `dist/web/`.

## Voliteľný PPTX export

```bash
npm run export:pptx -- 1
npm run export:pptx -- all
```

PPTX export sa ukladá do `dist/presentations/`. Je určený na sekundárne použitie, napríklad keď treba poslať PowerPoint súbor. Primárnym študentským formátom zostáva webová prezentácia.

## Rozpracovanie ďalšej prednášky

1. Prečítaj `week.config.ts`, `outline.md` a `resources.md`.
2. Navrhni learning outcomes.
3. Navrhni narrative flow.
4. Rozdeľ prednášku na 3-5 častí.
5. Odhadni počet slajdov.
6. Identifikuj kódové príklady, diagramy, otázky a live demo checkpointy.
7. Vytvor alebo rozšír `lecture.ts`.
8. Zaregistruj prednášku v `shared/lectures.ts`.
9. Spusti validáciu, typecheck a build.
10. Otvor web, preklikaj prednášku a oprav vizuálne problémy.
