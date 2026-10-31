# Cvičenie 07: audit výsledkov úloh

Desať úloh je na webe v cvičení 07. Všetky záznamy sú syntetické; nejde o skutočné hodnotenia študentov. Pracujete s výsledkami úloh, nie s bikesharingom z prednášky.

- `programming_results.csv`: jedno odovzdanie konkrétnej úlohy; ID študenta nie je kľúč riadka.
- `students.csv`: register programov a ročníkov, jeden riadok na ID.
- `analysis_starter.py`: iba vstupné cesty a miesto pre vlastnú implementáciu.

Súbory obsahujú duplicity, chýbajúce údaje, neplatné hodnoty, ďalšiu úlohu rovnakého študenta a platné ID bez zhody v registri. Pri oprave nemeníte vstupné CSV. Pravidlá čistenia a menovatele sú presne určené na webe.

Vytvorte a aktivujte virtuálne prostredie podľa návodu predmetu. Potom:

```bash
python -m pip install numpy pandas matplotlib
python analysis_starter.py
```

Starter končí `NotImplementedError`, kým ho nedoplníte. Nie sú v ňom hotové transformácie.

Odovzdajte riešenie, audit čistenia, súhrnné CSV, tri grafy, `analysis_notes.md` a presný postup spustenia. Ak používate notebook, overte čistý beh od prvej bunky.
