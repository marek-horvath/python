# Cvičenie 09 — Bezpečné programovanie v Pythone

Starter projekt obsahuje zámerne problematický kód. Úlohou je identifikovať riziká a opraviť ich bezpečnejším spôsobom.

Súbory:

- `app.py` — ukážkový integračný skript;
- `database.py` — SQL prístup s chybami;
- `commands.py` — subprocess ukážky;
- `files.py` — práca s cestami;
- `tokens.py` — tokeny a serializácia;
- `.env.example` — ukážka potrebnej konfigurácie bez reálnej secret hodnoty;
- `.gitignore` — pravidlá pre `.env`, databázu a lokálne súbory.

Inštalácia voliteľného nástroja:

```bash
python -m pip install bandit
```

Výstupom má byť opravený projekt a krátky `security_notes.md` alebo README sekcia s prehľadom nájdených a opravených rizík.
