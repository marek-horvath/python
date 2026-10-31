# Cvičenie 09: revízia registrácie dobrovoľníkov

Desať obranných úloh je na webe v cvičení 09. Tento starter obsahuje zámerné bezpečnostné chyby a neimplementované časti. Nie je určený na verejné nasadenie ani na skutočné osobné údaje.

- `app.py`: validácia a spracovanie prihlášky; bez argumentov iba vypíše zoznam operácií.
- `database.py`: lokálna SQLite a prístup k fiktívnym prihláškam.
- `commands.py`, `badge_worker.py`: tvorba menovky pomocou neškodného lokálneho procesu.
- `files.py`, `uploads/welcome.txt`: príloha prihlášky.
- `tokens.py`: pozvánky a pôvodný loader nastavení.
- `preferences.json`: neškodný dátový vstup pre nový kontrakt nastavení.
- `.env.example`: názov konfigurácie s neplatným placeholderom, nie skutočný kľúč.

Po vytvorení a aktivácii virtuálneho prostredia:

```bash
python -m pip install pytest bandit
python app.py
python app.py --init-demo
```

Inicializácia vytvorí `volunteers.db` iba ak chýba a doplní fiktívne seed záznamy bez prepisovania existujúcich ID. Testy používajú vlastnú dočasnú databázu, nie tento súbor. Do helpers je možné poslať testovaciu databázovú cestu.

Pre načítanie prílohy dostáva funkcia záznam s `owner_id` a `attachment`, overenú identitu poskytuje volajúci testovací kontext. Nesmie ju nahradiť klientom zvolený vlastník.

Worker iba vypíše JSON s prijatým menom. Nepotrebuje internet ani systémový konvertor. Pri testovaní nesprávneho spustenia použite kontrolovaný test double alebo vlastný worker; nespúšťajte cudzie príkazy. Nevytvárajte škodlivý pickle a neotvárajte neznáme binárne súbory.

Hodnota `DEMO-NOT-A-REAL-KEY` je verejná neplatná ukážka chyby. Pri riešení zaveďte `INVITATION_API_KEY` z lokálnej konfigurácie. Starter `.env` automaticky nenačítava: v README svojho riešenia uveďte použitý mechanizmus alebo nastavenie environment premennej. Reálne kľúče nepoužívajte.

Odovzdajte opravy, aspoň osem regresných testov a `security_notes.md` s mapou nálezov, opráv a testov. Pozvánky, databázy, lokálne nastavenia a citlivé dáta necommitujte.
