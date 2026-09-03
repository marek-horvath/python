# Týždeň 02 - Skriptovanie a automatizácia

Stav: publikované.

## Cieľ prednášky

Ukázať Python ako praktický nástroj na automatizáciu práce so súbormi, adresármi, textom, dátovými formátmi a operačným systémom. Prednáška nemá byť encyklopédiou modulov; má ukázať, ako z konkrétnej opakovanej úlohy vznikne rozumný script.

## Learning outcomes

Po prednáške má študent vedieť:

- navrhnúť jednoduchý script s funkciou `main()`;
- vysvetliť rozdiel medzi REPL experimentom, `.py` scriptom a väčšou aplikáciou;
- čítať a zapisovať textové súbory s explicitným `encoding="utf-8"`;
- použiť `pathlib.Path` na skladanie ciest, kontrolu existencie a vyhľadávanie súborov;
- rozdeliť automatizačnú úlohu na malé bezpečné kroky;
- spracovať jednoduchý JSON a CSV cez štandardnú knižnicu;
- použiť základné string metódy a zvoliť regex iba tam, kde dáva zmysel;
- použiť argumenty príkazového riadku, environment variables a `subprocess` v jednoduchom scripte.

## Narrative flow

1. Motivácia: opakovaná manuálna práca a riziko chýb.
2. Script ako malý program: `main()`, funkcie, output, chyby.
3. Práca so súbormi a `pathlib`.
4. Priebežný príklad: organizátor priečinka Downloads.
5. Dátové formáty: JSON a CSV.
6. Text, regex a vstupy scriptu.
7. Záver: ako písať script, ktorý je čitateľný a opatrný.

## Slajdy

Prednáška má 45 slajdov. Je plánovaná na približne 50-60 minút vrátane krátkych interakcií a jedného live dema.

## Interakcie

- Čo by ste zatiaľ neautomatizovali bez kontroly?
- Čo vráti `Path("report.final.pdf").suffix`?
- Čo sa stane, keď cieľový adresár už existuje?
- Použili by ste tu `split()` alebo regex?
- Čo je zlé na hardcoded absolútnej ceste?

## Live demo

Mini file organizer v dočasnom priečinku:

1. vytvoriť testovacie súbory;
2. prejsť adresár cez `Path.iterdir()`;
3. získať `suffix`;
4. pridať rozhodovanie kategórie;
5. vytvoriť cieľový adresár;
6. najprv vypísať `dry-run`;
7. až potom použiť `shutil.move`.
