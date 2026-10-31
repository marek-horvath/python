# Prednáška 09 — Bezpečné programovanie v Pythone

## Hlavná myšlienka

Slovenská prednáška má 45 slajdov a robí bezpečnostnú revíziu malého exportéra reportov. Téma nadväzuje na HTTP, SQL, subprocess a súbory z predchádzajúcich týždňov. Obsah pre generátor je v `deck.mjs`; verejným vizuálnym zdrojom zostáva PPTX. Anglická verzia sa nemení.

## Narrative flow

1. Threat mindset a attack surface v témach, ktoré už študenti poznajú.
2. Validácia, allowlist a nedôveryhodné vstupy.
3. SQL injection a command injection.
4. Nebezpečné vykonávanie a deserializácia: `eval`, `exec`, `pickle`, YAML.
5. Súbory a path traversal.
6. Secrets, konfigurácia, rotácia pri úniku, `random` vs. `secrets` a životnosť tokenu.
7. Encoding, hashing, Argon2 password hashing, HMAC a overené šifrovacie API.
8. HTTPS, dependency security, tooling, logging a error messages.
9. Revízia konkrétnych hraníc exportéra a testy odmietnutých aj povolených prípadov.

## Learning outcomes

Po prednáške má študent vedieť:

- rozpoznať nedôveryhodný vstup;
- vysvetliť rozdiel medzi syntaktickou a sémantickou validáciou;
- použiť parametrizovaný SQL dotaz;
- používať `subprocess` bez zbytočného `shell=True`;
- vysvetliť riziko `eval`, `exec` a pickle pri nedôveryhodných dátach;
- chrániť secrets mimo source code;
- rozlíšiť hashing, encryption a encoding;
- pomenovať základné riziká v dependencies, logoch a error messages.

## Live demo

Security cleanup:

1. validovať limit a formát exportu;
2. SQL f-string nahradiť parametrizovaným dotazom a samostatne overiť vlastníka;
3. shellový reťazec nahradiť pevným programom a zoznamom overených argumentov;
4. obmedziť výslednú cestu a pomenovať predpoklady ohľadom symlinkov;
5. načítať secret z konfigurácie a vytvoriť nepredvídateľný token;
6. overiť, že log neobsahuje citlivé hodnoty a testy kontrolujú hranice systému.
