# Cvičenie 02 - bezpečný organizátor súborov

Starter nadväzuje priamo na druhú prednášku. Pracujte postupne podľa verejnej stránky cvičenia a používajte iba testovací priečinok `subory/`.

Pred skutočným presunom si `subory/` skopírujte. Predvolený príkaz je dry-run:

```bash
python organizer.py subory
python organizer.py subory --vykonat
```

Požadované pravidlá:

- spracovať iba bezprostredné súbory;
- normalizovať prípony na lowercase;
- súbory bez prípony zaradiť do `bez_pripony/`;
- neprechádzať do `podklady/`;
- neprepísať existujúci cieľ;
- bez `--vykonat` nič na disku nezmeniť.
