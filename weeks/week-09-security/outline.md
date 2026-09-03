# Prednáška 09 — Bezpečné programovanie v Pythone

## Hlavná myšlienka

Bezpečnosť nie je samostatná funkcia aplikácie. Je to spôsob práce so vstupmi, súbormi, SQL, secrets, procesmi, závislosťami, chybami a logmi.

## Narrative flow

1. Threat mindset a attack surface v témach, ktoré už študenti poznajú.
2. Validácia, allowlist a nedôveryhodné vstupy.
3. SQL injection a command injection.
4. Nebezpečné vykonávanie a deserializácia: `eval`, `exec`, `pickle`, YAML.
5. Súbory a path traversal.
6. Secrets, `.env`, `random` vs. `secrets`.
7. Hashing, encryption, password storage a overené crypto API.
8. HTTPS, dependency security, tooling, logging a error messages.
9. Security cleanup live demo.

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

1. hardcoded secret -> environment variable;
2. SQL f-string -> parametrizovaný dotaz;
3. `shell=True` -> argument list;
4. `random` token -> `secrets`;
5. broad except -> konkrétna výnimka.
