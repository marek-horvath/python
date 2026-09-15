# Workflow

## Lokálny web

```bash
npm run dev
```

Astro web číta metadata zo `shared/` a `weeks/`. Prednášky registrované v `shared/presentations.ts` sa renderujú z PPTX súborov v `presentations/`.

## Validácia

```bash
npm run validate
npm run typecheck
```

Validácia kontroluje:

- počet a štruktúru týždňov;
- duplicity čísel a slugov;
- existenciu pracovných súborov;
- existenciu oboch jazykových PPTX zdrojov publikovaných prednášok;
- `py_compile` pre `.py` súbory v `weeks/`.

## Build webu

```bash
npm run build
```

Príkaz najprv vyrenderuje PPTX prezentácie, potom spustí validáciu a statický Astro build do `dist/web/`.

## Renderovanie prezentácií

```bash
npm run presentations:render
```

Upravujte iba `.pptx` súbory v `presentations/`. Render vytvorí zmenené náhľady slajdov a web ich zobrazí v rovnakom vieweri. Prezentácie sa následne publikujú spolu s bežným statickým buildom.

## Rozpracovanie ďalšej prednášky

1. Prečítaj `week.config.ts`, `outline.md` a `resources.md`.
2. Navrhni learning outcomes.
3. Navrhni narrative flow.
4. Rozdeľ prednášku na 3-5 častí.
5. Odhadni počet slajdov.
6. Identifikuj kódové príklady, diagramy, otázky a live demo checkpointy.
7. Vytvor alebo rozšír `XX-slug.sk.pptx` a `XX-slug.en.pptx` v `presentations/`.
8. Zaregistruj prednášku v `shared/presentations.ts`.
9. Spusti validáciu, typecheck a build.
10. Otvor web, preklikaj prednášku a oprav vizuálne problémy.
