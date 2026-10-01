const text = (sk, en) => ({ sk, en });

const task = (label, done = false, selected = false) => ({ label, done, selected });
const state = (input, tasks, options = {}) => ({ input, tasks, ...options });

const submit = text("Poslať zadanie", "Submit assignment");
const slides = text("Pripraviť slidy", "Prepare slides");
const mixedTasks = [task(submit, true), task(slides, false)];

export const lecture04Detailed = {
  slug: "04-testovanie-debugging-kvalita",
  title: text("Testovanie, debugging a kvalita kódu", "Testing, debugging and code quality"),
  deck: [
    {
      kind: "title",
      title: text("Testovanie, debugging a kvalita kódu", "Testing, debugging and code quality"),
      subtitle: text("Od zvláštneho čísla v GUI k overenej oprave", "From a suspicious GUI number to a verified fix")
    },
    {
      kind: "guiStates",
      title: text("Aplikácia ukazuje nesprávny počet", "The application shows the wrong count"),
      states: [
        { label: text("POZOROVANÉ", "OBSERVED"), state: state("", mixedTasks, { countOverride: 2 }) },
        { label: text("OČAKÁVANÉ", "EXPECTED"), state: state("", mixedTasks) }
      ],
      note: text("Dve úlohy sú v zozname, ale nesplnená je iba jedna.", "There are two tasks, but only one is incomplete.")
    },
    {
      kind: "diagram",
      title: text("Najprv chybu spoľahlivo zopakujeme", "First, reproduce the bug reliably"),
      body: text("Reprodukčný postup musí vedieť zopakovať aj človek, ktorý aplikáciu nepozná.", "Someone unfamiliar with the application must be able to follow the reproduction steps."),
      items: [
        text("pridaj dve úlohy", "add two tasks"),
        text("prvú označ ako hotovú", "mark the first as done"),
        text("pozri počítadlo", "inspect the counter"),
        text("vidíš hodnotu 2", "observe value 2")
      ]
    },
    {
      kind: "table",
      title: text("Expected a actual musia byť konkrétne", "Expected and actual must be concrete"),
      headers: [text("Stav", "State"), text("Očakávané", "Expected"), text("Skutočné", "Actual")],
      rows: [
        [text("2 úlohy, 1 hotová", "2 tasks, 1 done"), text("Nesplnené: 1", "Incomplete: 1"), text("Nesplnené: 2", "Incomplete: 2")],
        [text("prázdny zoznam", "empty list"), text("Nesplnené: 0", "Incomplete: 0"), text("Nesplnené: 0", "Incomplete: 0")],
        [text("2 úlohy, obe hotové", "2 tasks, both done"), text("Nesplnené: 0", "Incomplete: 0"), text("Nesplnené: 2", "Incomplete: 2")]
      ]
    },
    {
      kind: "compare",
      title: text("Výnimka a logická chyba nie sú to isté", "An exception and a logic bug are not the same"),
      columns: [
        {
          title: text("Výnimka", "Exception"),
          items: [
            text("program preruší bežný tok", "interrupts the normal flow"),
            text("dostaneme typ chyby a traceback", "provides an error type and traceback"),
            text("príklad: IndexError", "example: IndexError")
          ]
        },
        {
          title: text("Logická chyba", "Logic bug"),
          items: [
            text("program pokračuje", "the program keeps running"),
            text("výsledok je nesprávny", "the result is wrong"),
            text("potrebujeme poznať očakávanie", "we need a known expectation")
          ]
        }
      ]
    },
    {
      kind: "diagram",
      title: text("Tri rozdielne činnosti", "Three different activities"),
      items: [
        text("testovanie\ndokazuje rozdiel", "testing\nproves the mismatch"),
        text("debugging\nhľadá príčinu", "debugging\nfinds the cause"),
        text("oprava\nmení kód", "fixing\nchanges the code")
      ]
    },
    {
      kind: "codeGui",
      title: text("Podozrivý je výpočet pri obnove GUI", "The GUI refresh calculation is suspicious"),
      label: "app.py",
      code: text(
        "def obnov_zobrazenie():\n    listbox.delete(0, tk.END)\n    for uloha in ulohy:\n        znacka = \"[x]\" if uloha[\"hotova\"] else \"[ ]\"\n        listbox.insert(tk.END, f\"{znacka} {uloha['text']}\")\n\n    pocitadlo.config(text=f\"Nesplnené: {len(ulohy)}\")",
        "def refresh_view():\n    listbox.delete(0, tk.END)\n    for task in tasks:\n        mark = \"[x]\" if task[\"done\"] else \"[ ]\"\n        listbox.insert(tk.END, f\"{mark} {task['text']}\")\n\n    counter.config(text=f\"Incomplete: {len(tasks)}\")"
      ),
      state: state("", mixedTasks, { countOverride: 2 }),
      note: text("GUI vypíše presne to, čo mu výpočet odovzdá.", "The GUI displays exactly what the calculation gives it.")
    },
    {
      kind: "codeFull",
      title: text("Aké dáta má program v okamihu chyby?", "What data does the program hold when the bug occurs?"),
      label: "python",
      code: text(
        "ulohy = [\n    {\"text\": \"Poslať zadanie\", \"hotova\": True},\n    {\"text\": \"Pripraviť slidy\", \"hotova\": False},\n]",
        "tasks = [\n    {\"text\": \"Submit assignment\", \"done\": True},\n    {\"text\": \"Prepare slides\", \"done\": False},\n]"
      ),
      note: text("Jeden záznam je hotový a druhý nie. Informáciu už v dátach máme.", "One record is done and the other is not. The data already contains the distinction.")
    },
    {
      kind: "code",
      title: text("len() odpovedá na inú otázku", "len() answers a different question"),
      label: "python",
      code: text("print(len(ulohy))", "print(len(tasks))"),
      output: "2",
      note: text("Počet všetkých položiek nie je počet nesplnených položiek.", "The number of all items is not the number of incomplete items.")
    },
    {
      kind: "code",
      title: text("Krátky diagnostický výpis overí predpoklad", "A short diagnostic print checks the assumption"),
      label: "python",
      code: text(
        "print([(u[\"text\"], u[\"hotova\"]) for u in ulohy])\nprint(\"všetky:\", len(ulohy))",
        "print([(t[\"text\"], t[\"done\"]) for t in tasks])\nprint(\"all:\", len(tasks))"
      ),
      output: text(
        "[('Poslať zadanie', True), ('Pripraviť slidy', False)]\nvšetky: 2",
        "[('Submit assignment', True), ('Prepare slides', False)]\nall: 2"
      ),
      note: text("Výpis je dočasný nástroj na potvrdenie jednej hypotézy.", "The print is a temporary tool for checking one hypothesis.")
    },
    {
      kind: "codeFull",
      title: text("Traceback čítame od posledného riadku", "Read a traceback from the final line"),
      label: "terminal",
      code: text(
        "Traceback (most recent call last):\n  File \"app.py\", line 48, in oznac_hotovu\n    index = listbox.curselection()[0]\n            ~~~~~~~~~~~~~~~~~~~~~~^^^\nIndexError: tuple index out of range",
        "Traceback (most recent call last):\n  File \"app.py\", line 48, in mark_done\n    index = listbox.curselection()[0]\n            ~~~~~~~~~~~~~~~~~~~~~~^^^\nIndexError: tuple index out of range"
      ),
      note: text("Posledný riadok pomenúva chybu; riadky nad ním ukazujú cestu k nej.", "The final line names the error; the lines above show how execution reached it.")
    },
    {
      kind: "codeFull",
      title: text("Breakpoint zastaví program pri podozrivom stave", "A breakpoint pauses at the suspicious state"),
      label: "pdb",
      code: text(
        "def obnov_zobrazenie():\n    breakpoint()\n    pocet = len(ulohy)\n\n(Pdb) p ulohy\n[{'text': 'Poslať zadanie', 'hotova': True},\n {'text': 'Pripraviť slidy', 'hotova': False}]\n(Pdb) p len(ulohy)\n2\n(Pdb) continue",
        "def refresh_view():\n    breakpoint()\n    count = len(tasks)\n\n(Pdb) p tasks\n[{'text': 'Submit assignment', 'done': True},\n {'text': 'Prepare slides', 'done': False}]\n(Pdb) p len(tasks)\n2\n(Pdb) continue"
      ),
      note: text("Debugger umožní prezerať reálny stav bez pridávania ďalších printov.", "The debugger lets us inspect real state without adding more prints.")
    },
    {
      kind: "statement",
      title: text("Príčina: zamieňame počet všetkých za počet nesplnených", "Cause: total count is mistaken for incomplete count"),
      body: text("Dáta sú správne a GUI ich vie zobraziť. Nesprávna je jedna doménová otázka ukrytá vo funkcii, ktorá zároveň obsluhuje widgety.", "The data is correct and the GUI can display it. One domain question is wrong and hidden inside a function that also manages widgets.")
    },
    {
      kind: "table",
      title: text("Najprv pomenujeme kontrakt výpočtu", "First, name the calculation contract"),
      headers: [text("Vstup", "Input"), text("Význam", "Meaning"), text("Výsledok", "Result")],
      rows: [
        ["[]", text("žiadne úlohy", "no tasks"), "0"],
        [text("[hotová, nesplnená]", "[done, incomplete]"), text("zmiešaný stav", "mixed state"), "1"],
        [text("[hotová, hotová]", "[done, done]"), text("všetky hotové", "all done"), "0"]
      ]
    },
    {
      kind: "beforeAfter",
      title: text("Výpočet oddelíme a zachytíme testom", "Separate the calculation and capture it in a test"),
      leftLabel: text("CHYBNÁ FUNKCIA", "BUGGY FUNCTION"),
      leftCode: text(
        "def pocet_nesplnenych(ulohy):\n    return len(ulohy)",
        "def incomplete_count(tasks):\n    return len(tasks)"
      ),
      rightLabel: "test_ulohy.py",
      rightCode: text(
        "class TestPocet(unittest.TestCase):\n    def test_zmiesany_stav(self):\n        ulohy = [\n            {\"hotova\": True},\n            {\"hotova\": False},\n        ]\n        self.assertEqual(\n            pocet_nesplnenych(ulohy), 1\n        )",
        "class TestCount(unittest.TestCase):\n    def test_mixed_state(self):\n        tasks = [\n            {\"done\": True},\n            {\"done\": False},\n        ]\n        self.assertEqual(\n            incomplete_count(tasks), 1\n        )"
      ),
      note: text("Test opisuje požadované správanie ešte pred opravou.", "The test describes required behaviour before the fix.")
    },
    {
      kind: "codeFull",
      title: text("Arrange, act, assert je spôsob čítania testu", "Arrange, act, assert is a way to read a test"),
      label: "test_ulohy.py",
      code: text(
        "def test_zmiesany_stav(self):\n    # arrange\n    ulohy = [{\"hotova\": True}, {\"hotova\": False}]\n\n    # act\n    vysledok = pocet_nesplnenych(ulohy)\n\n    # assert\n    self.assertEqual(vysledok, 1)",
        "def test_mixed_state(self):\n    # arrange\n    tasks = [{\"done\": True}, {\"done\": False}]\n\n    # act\n    result = incomplete_count(tasks)\n\n    # assert\n    self.assertEqual(result, 1)"
      ),
      note: text("Komentáre nie sú povinné; tri fázy však majú byť v teste jasne rozpoznateľné.", "The comments are optional, but the three phases should remain easy to recognise.")
    },
    {
      kind: "codeFull",
      title: text("Najprv musí test naozaj zlyhať", "The test must fail first"),
      label: "python -m unittest -v test_ulohy.py",
      code: text(
        "test_zmiesany_stav (test_ulohy.TestPocet) ... FAIL\n\nFAIL: test_zmiesany_stav (test_ulohy.TestPocet)\n----------------------------------------------------------------------\nTraceback (most recent call last):\n  File \"test_ulohy.py\", line 14, in test_zmiesany_stav\n    self.assertEqual(vysledok, 1)\nAssertionError: 2 != 1\n\nFAILED (failures=1)",
        "test_mixed_state (test_tasks.TestCount) ... FAIL\n\nFAIL: test_mixed_state (test_tasks.TestCount)\n----------------------------------------------------------------------\nTraceback (most recent call last):\n  File \"test_tasks.py\", line 14, in test_mixed_state\n    self.assertEqual(result, 1)\nAssertionError: 2 != 1\n\nFAILED (failures=1)"
      ),
      note: text("Ak test s chybným kódom prejde, netestuje správny problém.", "If the test passes with buggy code, it is not testing the right problem.")
    },
    {
      kind: "statement",
      title: text("2 != 1 je symptóm, nie vysvetlenie príčiny", "2 != 1 is a symptom, not the cause"),
      body: text("Assertion ukazuje rozdiel medzi skutočnosťou a očakávaním. Príčinu sme našli až preskúmaním dát a výrazu len(ulohy).", "The assertion shows the difference between reality and expectation. We found the cause by inspecting the data and the len(tasks) expression.")
    },
    {
      kind: "splitCode",
      title: text("Oprava filtruje podľa stavu každej úlohy", "The fix filters by each task's state"),
      items: [
        text("not True je False, teda 0", "not True is False, therefore 0"),
        text("not False je True, teda 1", "not False is True, therefore 1"),
        text("sum spočíta iba nesplnené", "sum counts incomplete tasks only")
      ],
      label: "ulohy.py",
      code: text(
        "def pocet_nesplnenych(ulohy):\n    return sum(\n        not uloha[\"hotova\"]\n        for uloha in ulohy\n    )\n\n# False + True -> 0 + 1 -> 1",
        "def incomplete_count(tasks):\n    return sum(\n        not task[\"done\"]\n        for task in tasks\n    )\n\n# False + True -> 0 + 1 -> 1"
      )
    },
    {
      kind: "codeFull",
      title: text("Po oprave ten istý test prejde", "After the fix, the same test passes"),
      label: "python -m unittest -v test_ulohy.py",
      code: text(
        "test_zmiesany_stav (test_ulohy.TestPocet) ... ok\n\n----------------------------------------------------------------------\nRan 1 test in 0.000s\n\nOK",
        "test_mixed_state (test_tasks.TestCount) ... ok\n\n----------------------------------------------------------------------\nRan 1 test in 0.000s\n\nOK"
      ),
      note: text("Nemenili sme očakávanie. Zmenili sme implementáciu tak, aby ho splnila.", "We did not change the expectation. We changed the implementation to satisfy it.")
    },
    {
      kind: "table",
      title: text("Jeden príklad nestačí: pridáme hranice", "One example is not enough: add boundaries"),
      headers: [text("Prípad", "Case"), text("Prečo je dôležitý", "Why it matters"), text("Očakávanie", "Expected")],
      rows: [
        [text("prázdny zoznam", "empty list"), text("žiadna iterácia", "no iteration"), "0"],
        [text("všetky hotové", "all done"), text("žiadne True z not", "no True values from not"), "0"],
        [text("všetky nesplnené", "all incomplete"), text("každá položka sa ráta", "every item is counted"), text("dĺžka zoznamu", "list length")]
      ]
    },
    {
      kind: "guiStates",
      title: text("Pridanie úlohy má vlastný kontrakt", "Adding a task has its own contract"),
      states: [
        { label: text("VSTUP", "INPUT"), state: state("  Zavolať školiteľovi  ", []) },
        { label: text("PO PRIDANÍ", "AFTER ADDING"), state: state("", [task(text("Zavolať školiteľovi", "Call supervisor"))]) }
      ],
      code: text("text = text.strip()", "text = text.strip()"),
      note: text("Uloží sa orezaný text a nová úloha začína ako nesplnená.", "The stripped text is stored and a new task starts incomplete.")
    },
    {
      kind: "codeFull",
      title: text("Test pridania kontroluje návrat aj zmenu dát", "The add test checks the return value and data mutation"),
      label: "test_ulohy.py",
      code: text(
        "def test_pridanie_oreze_text(self):\n    ulohy = []\n\n    pridana = pridaj_ulohu(ulohy, \"  Zavolať školiteľovi  \")\n\n    self.assertTrue(pridana)\n    self.assertEqual(ulohy, [\n        {\"text\": \"Zavolať školiteľovi\", \"hotova\": False}\n    ])",
        "def test_add_strips_text(self):\n    tasks = []\n\n    added = add_task(tasks, \"  Call supervisor  \")\n\n    self.assertTrue(added)\n    self.assertEqual(tasks, [\n        {\"text\": \"Call supervisor\", \"done\": False}\n    ])"
      ),
      note: text("Presný obsah zoznamu je dôležitejší než iba kontrola jeho dĺžky.", "The exact list contents matter more than checking its length alone.")
    },
    {
      kind: "compare",
      title: text("Prázdny vstup má dve podoby", "Empty input has two forms"),
      columns: [
        { title: "\"\"", items: [text("nulová dĺžka", "zero length"), text("nesmie pridať úlohu", "must not add a task"), text("funkcia vráti False", "function returns False")] },
        { title: "\"   \"", items: [text("obsahuje iba whitespace", "contains whitespace only"), text("po strip() je prázdny", "empty after strip()"), text("rovnaký výsledok ako \"\"", "same result as \"\"")] }
      ]
    },
    {
      kind: "codeColumns",
      title: text("Bežný a whitespace vstup testujeme oddelene", "Test normal and whitespace input separately"),
      leftLabel: text("BEŽNÝ VSTUP", "NORMAL INPUT"),
      leftCode: text(
        "def test_pridanie_oreze_text(self):\n    ulohy = []\n    self.assertTrue(\n        pridaj_ulohu(ulohy, \"  Návrh  \")\n    )\n    self.assertEqual(ulohy[0][\"text\"], \"Návrh\")",
        "def test_add_strips_text(self):\n    tasks = []\n    self.assertTrue(\n        add_task(tasks, \"  Draft  \")\n    )\n    self.assertEqual(tasks[0][\"text\"], \"Draft\")"
      ),
      rightLabel: text("IBA WHITESPACE", "WHITESPACE ONLY"),
      rightCode: text(
        "def test_prazdny_text_sa_ignoruje(self):\n    ulohy = []\n    self.assertFalse(\n        pridaj_ulohu(ulohy, \"   \t\")\n    )\n    self.assertEqual(ulohy, [])",
        "def test_blank_text_is_ignored(self):\n    tasks = []\n    self.assertFalse(\n        add_task(tasks, \"   \t\")\n    )\n    self.assertEqual(tasks, [])"
      )
    },
    {
      kind: "codeFull",
      title: text("Prepnutie musí fungovať v oboch smeroch", "Toggling must work in both directions"),
      label: "test_ulohy.py",
      code: text(
        "def test_prepnutie_v_oboch_smeroch(self):\n    ulohy = [{\"text\": \"Návrh\", \"hotova\": False}]\n\n    self.assertTrue(prepni_ulohu(ulohy, 0))\n    self.assertTrue(ulohy[0][\"hotova\"])\n\n    self.assertTrue(prepni_ulohu(ulohy, 0))\n    self.assertFalse(ulohy[0][\"hotova\"])",
        "def test_toggle_in_both_directions(self):\n    tasks = [{\"text\": \"Draft\", \"done\": False}]\n\n    self.assertTrue(toggle_task(tasks, 0))\n    self.assertTrue(tasks[0][\"done\"])\n\n    self.assertTrue(toggle_task(tasks, 0))\n    self.assertFalse(tasks[0][\"done\"])"
      ),
      note: text("Testujeme prechod stavu, nie iba výsledok jedného smeru.", "We test a state transition, not just one direction.")
    },
    {
      kind: "codeColumns",
      title: text("Neplatný index nesmie poškodiť dáta", "An invalid index must not damage data"),
      leftLabel: "ulohy.py",
      leftCode: text(
        "def prepni_ulohu(ulohy, index):\n    if not 0 <= index < len(ulohy):\n        return False\n\n    ulohy[index][\"hotova\"] = not ulohy[index][\"hotova\"]\n    return True",
        "def toggle_task(tasks, index):\n    if not 0 <= index < len(tasks):\n        return False\n\n    tasks[index][\"done\"] = not tasks[index][\"done\"]\n    return True"
      ),
      rightLabel: "test_ulohy.py",
      rightCode: text(
        "def test_neplatne_prepnutie_nemeni_data(self):\n    povodne = [\n        {\"text\": \"Návrh\", \"hotova\": False}\n    ]\n    ulohy = [povodne[0].copy()]\n\n    self.assertFalse(prepni_ulohu(ulohy, 5))\n    self.assertEqual(ulohy, povodne)",
        "def test_invalid_toggle_keeps_data(self):\n    original = [\n        {\"text\": \"Draft\", \"done\": False}\n    ]\n    tasks = [original[0].copy()]\n\n    self.assertFalse(toggle_task(tasks, 5))\n    self.assertEqual(tasks, original)"
      )
    },
    {
      kind: "codeFull",
      title: text("Odstránenie overíme na presnom vybranom prvku", "Verify deletion of the exact selected item"),
      label: "test_ulohy.py",
      code: text(
        "def test_odstrani_vybranu_ulohu(self):\n    ulohy = [\n        {\"text\": \"Prvá\", \"hotova\": False},\n        {\"text\": \"Druhá\", \"hotova\": True},\n    ]\n\n    self.assertTrue(odstran_ulohu(ulohy, 1))\n    self.assertEqual(ulohy, [\n        {\"text\": \"Prvá\", \"hotova\": False}\n    ])",
        "def test_delete_selected_task(self):\n    tasks = [\n        {\"text\": \"First\", \"done\": False},\n        {\"text\": \"Second\", \"done\": True},\n    ]\n\n    self.assertTrue(delete_task(tasks, 1))\n    self.assertEqual(tasks, [\n        {\"text\": \"First\", \"done\": False}\n    ])"
      ),
      note: text("Kontrola len(ulohy) == 1 by neodhalila odstránenie nesprávnej položky.", "Checking len(tasks) == 1 would not detect deletion of the wrong item.")
    },
    {
      kind: "beforeAfter",
      title: text("Každý test potrebuje izolovaný počiatočný stav", "Every test needs isolated initial state"),
      leftLabel: text("ZDIEĽANÝ MUTABLE STAV", "SHARED MUTABLE STATE"),
      leftCode: text(
        "class TestUlohy(unittest.TestCase):\n    ulohy = []\n\n    def test_a(self):\n        self.ulohy.append(...)\n\n    def test_b(self):\n        # vidí zmenu z test_a",
        "class TestTasks(unittest.TestCase):\n    tasks = []\n\n    def test_a(self):\n        self.tasks.append(...)\n\n    def test_b(self):\n        # sees mutation from test_a"
      ),
      rightLabel: "setUp()",
      rightCode: text(
        "class TestUlohy(unittest.TestCase):\n    def setUp(self):\n        self.ulohy = []\n\n    def test_a(self):\n        self.ulohy.append(...)\n\n    def test_b(self):\n        # dostane nový zoznam",
        "class TestTasks(unittest.TestCase):\n    def setUp(self):\n        self.tasks = []\n\n    def test_a(self):\n        self.tasks.append(...)\n\n    def test_b(self):\n        # receives a fresh list"
      ),
      note: text("Poradie testov nesmie meniť ich výsledok.", "Test order must not affect the result.")
    },
    {
      kind: "table",
      title: text("Bez GUI vieme testovať väčšinu pravidiel", "Most rules can be tested without the GUI"),
      headers: [text("Pravidlo", "Rule"), text("Vstup", "Input"), text("Assertion", "Assertion")],
      rows: [
        [text("počet nesplnených", "incomplete count"), text("list slovníkov", "list of dictionaries"), text("číselný výsledok", "numeric result")],
        [text("pridanie", "adding"), text("list + text", "list + text"), text("návrat + presné dáta", "return + exact data")],
        [text("prepnutie", "toggling"), text("list + index", "list + index"), text("zmenený boolean", "changed boolean")],
        [text("odstránenie", "deletion"), text("list + index", "list + index"), text("presný zostávajúci list", "exact remaining list")]
      ]
    },
    {
      kind: "compare",
      title: text("Dátové testy a GUI kontrola chránia iné vrstvy", "Data tests and GUI checks protect different layers"),
      columns: [
        { title: text("Automatické dátové testy", "Automated data tests"), items: [text("rýchle a opakovateľné", "fast and repeatable"), text("presne lokalizujú pravidlo", "localise the rule precisely"), text("nepotrebujú okno ani kliknutia", "need no window or clicks")] },
        { title: text("Manuálna GUI kontrola", "Manual GUI check"), items: [text("overí prepojenie widgetov", "checks widget wiring"), text("odhalí vizuálne a interakčné problémy", "finds visual and interaction issues"), text("zostáva potrebná, ale menšia", "is still needed, but smaller")] }
      ]
    },
    {
      kind: "table",
      title: text("Štyri krátke kontroly v reálnom okne", "Four short checks in the real window"),
      headers: [text("Akcia", "Action"), text("Čo sledujeme", "What to observe"), text("Očakávanie", "Expected")],
      rows: [
        [text("pridať text", "add text"), text("Listbox + Entry", "Listbox + Entry"), text("položka pribudne, Entry sa vyčistí", "item appears, Entry clears")],
        [text("označiť hotovú", "mark done"), text("výber + počítadlo", "selection + counter"), text("[x] a počet klesne", "[x] and count decreases")],
        [text("odstrániť vybranú", "delete selected"), text("správny riadok", "correct row"), text("zmizne vybraná položka", "selected item disappears")],
        [text("klik bez výberu", "click without selection"), text("stabilita callbacku", "callback stability"), text("žiadny pád", "no crash")]
      ]
    },
    {
      kind: "codeFull",
      title: text("Pôvodný callback mieša priveľa zodpovedností", "The original callback mixes too many responsibilities"),
      label: "app.py",
      code: text(
        "def pridaj_z_gui():\n    text = entry.get().strip()\n    if text:\n        ulohy.append({\"text\": text, \"hotova\": False})\n        listbox.delete(0, tk.END)\n        for uloha in ulohy:\n            listbox.insert(tk.END, format_ulohy(uloha))\n        pocitadlo.config(text=f\"Nesplnené: {len(ulohy)}\")\n        entry.delete(0, tk.END)",
        "def add_from_gui():\n    text = entry.get().strip()\n    if text:\n        tasks.append({\"text\": text, \"done\": False})\n        listbox.delete(0, tk.END)\n        for task in tasks:\n            listbox.insert(tk.END, format_task(task))\n        counter.config(text=f\"Incomplete: {len(tasks)}\")\n        entry.delete(0, tk.END)"
      ),
      note: text("Číta widget, validuje, mení dáta, renderuje zoznam aj počítadlo.", "It reads a widget, validates, mutates data, and renders both list and counter.")
    },
    {
      kind: "codeColumns",
      title: text("Doménová funkcia a GUI callback dostanú jasné úlohy", "Domain function and GUI callback get clear roles"),
      leftLabel: "ulohy.py",
      leftCode: text(
        "def pridaj_ulohu(ulohy, text):\n    text = text.strip()\n    if not text:\n        return False\n\n    ulohy.append({\n        \"text\": text,\n        \"hotova\": False,\n    })\n    return True",
        "def add_task(tasks, text):\n    text = text.strip()\n    if not text:\n        return False\n\n    tasks.append({\n        \"text\": text,\n        \"done\": False,\n    })\n    return True"
      ),
      rightLabel: "app.py",
      rightCode: text(
        "def pridaj_z_gui():\n    if pridaj_ulohu(ulohy, entry.get()):\n        entry.delete(0, tk.END)\n        obnov_zobrazenie()",
        "def add_from_gui():\n    if add_task(tasks, entry.get()):\n        entry.delete(0, tk.END)\n        refresh_view()"
      )
    },
    {
      kind: "stateProjection",
      title: text("Zoznam úloh je jediný zdroj pravdy", "The task list is the single source of truth"),
      source: text("ulohy", "tasks"),
      functionName: text("obnov_zobrazenie()", "refresh_view()"),
      targets: ["Listbox", text("Label: Nesplnené", "Label: Incomplete")],
      note: text("Widgety sú projekcia dát. Po každej úspešnej zmene sa obe časti GUI obnovia z toho istého zoznamu.", "Widgets are a projection of data. After every successful mutation, both GUI elements refresh from the same list.")
    },
    {
      kind: "compare",
      title: text("Názov funkcie má povedať, čo vracia", "A function name should say what it returns"),
      columns: [
        { title: "spocitaj()", items: [text("čo počíta?", "what does it count?"), text("z akých dát?", "from which data?"), text("význam sa hľadá v tele", "meaning is hidden in the body")] },
        { title: "pocet_nesplnenych()", items: [text("výsledkom je počet", "the result is a count"), text("počíta nesplnené úlohy", "it counts incomplete tasks"), text("test sa číta ako veta", "the test reads like a sentence")] }
      ]
    },
    {
      kind: "beforeAfter",
      title: text("Komentár nemá klamať ani prepisovať kód", "A comment must not lie or restate code"),
      leftLabel: text("ZASTARANÝ KOMENTÁR", "STALE COMMENT"),
      leftCode: text(
        "# Spočíta všetky úlohy\ndef pocet_nesplnenych(ulohy):\n    return sum(\n        not u[\"hotova\"] for u in ulohy\n    )",
        "# Count all tasks\ndef incomplete_count(tasks):\n    return sum(\n        not t[\"done\"] for t in tasks\n    )"
      ),
      rightLabel: text("ČITATEĽNÝ KÓD", "READABLE CODE"),
      rightCode: text(
        "def pocet_nesplnenych(ulohy):\n    return sum(\n        not uloha[\"hotova\"]\n        for uloha in ulohy\n    )",
        "def incomplete_count(tasks):\n    return sum(\n        not task[\"done\"]\n        for task in tasks\n    )"
      ),
      note: text("Komentár pridávame tam, kde vysvetľuje dôvod alebo nečakané obmedzenie.", "Add a comment when it explains a reason or an unexpected constraint.")
    },
    {
      kind: "beforeAfter",
      title: text("Konkrétne ošetrenie chráni očakávaný stav", "Specific handling protects an expected state"),
      leftLabel: text("SKRYTIE VŠETKÉHO", "HIDE EVERYTHING"),
      leftCode: text(
        "def odstran_z_gui():\n    try:\n        index = listbox.curselection()[0]\n        odstran_ulohu(ulohy, index)\n    except:\n        pass",
        "def delete_from_gui():\n    try:\n        index = listbox.curselection()[0]\n        delete_task(tasks, index)\n    except:\n        pass"
      ),
      rightLabel: text("EXPLICITNÝ STAV", "EXPLICIT STATE"),
      rightCode: text(
        "def odstran_z_gui():\n    vyber = listbox.curselection()\n    if not vyber:\n        return\n\n    odstran_ulohu(ulohy, vyber[0])\n    obnov_zobrazenie()",
        "def delete_from_gui():\n    selection = listbox.curselection()\n    if not selection:\n        return\n\n    delete_task(tasks, selection[0])\n    refresh_view()"
      ),
      note: text("Žiadny výber je bežný stav používateľského rozhrania, nie neznáma chyba.", "No selection is a normal UI state, not an unknown error.")
    },
    {
      kind: "beforeAfter",
      title: text("Malý diff opravuje presnú príčinu", "A small diff fixes the exact cause"),
      leftLabel: text("PRED", "BEFORE"),
      leftCode: text(
        "pocitadlo.config(\n    text=f\"Nesplnené: {len(ulohy)}\"\n)",
        "counter.config(\n    text=f\"Incomplete: {len(tasks)}\"\n)"
      ),
      rightLabel: text("PO", "AFTER"),
      rightCode: text(
        "pocitadlo.config(\n    text=(\n        f\"Nesplnené: \"\n        f\"{pocet_nesplnenych(ulohy)}\"\n    )\n)",
        "counter.config(\n    text=(\n        f\"Incomplete: \"\n        f\"{incomplete_count(tasks)}\"\n    )\n)"
      ),
      note: text("Refaktoring môže byť väčší, ale samotná oprava má zostať ľahko kontrolovateľná.", "The refactor may be larger, but the fix itself should remain easy to review.")
    },
    {
      kind: "diagram",
      title: text("Opakovateľný workflow pri ďalšej chybe", "A repeatable workflow for the next bug"),
      items: [
        text("reprodukcia", "reproduce"),
        text("hypotéza", "hypothesis"),
        text("pozorovanie", "observe"),
        text("zlyhávajúci test", "failing test"),
        text("malá oprava", "small fix"),
        text("celá sada", "full suite")
      ]
    },
    {
      kind: "codeFull",
      title: text("Celá sada má desať testov", "The full suite has ten tests"),
      label: "python -m unittest -v test_ulohy.py",
      code: text(
        "test_neplatne_odstranenie_nemeni_data ... ok\ntest_neplatne_prepnutie_nemeni_data ... ok\ntest_odstrani_vybranu_ulohu ... ok\ntest_pocet_prazdny ... ok\ntest_pocet_vsetky_hotove ... ok\ntest_pocet_vsetky_nesplnene ... ok\ntest_pocet_zmiesany ... ok\ntest_prazdny_text_sa_ignoruje ... ok\ntest_prepnutie_v_oboch_smeroch ... ok\ntest_pridanie_oreze_text ... ok\n\nRan 10 tests in 0.001s\nOK",
        "test_invalid_delete_keeps_data ... ok\ntest_invalid_toggle_keeps_data ... ok\ntest_delete_selected_task ... ok\ntest_count_empty ... ok\ntest_count_all_done ... ok\ntest_count_all_incomplete ... ok\ntest_count_mixed ... ok\ntest_blank_text_is_ignored ... ok\ntest_toggle_in_both_directions ... ok\ntest_add_strips_text ... ok\n\nRan 10 tests in 0.001s\nOK"
      ),
      note: text("Skrátený verbose výstup ukazuje, ktoré správanie každý test chráni.", "The shortened verbose output shows which behaviour each test protects.")
    },
    {
      kind: "compare",
      title: text("Čo táto sada dokazuje a čo nie", "What this suite proves and what it does not"),
      columns: [
        { title: text("Dokazuje", "It proves"), items: [text("pravidlá nad zoznamom úloh", "rules over the task list"), text("edge cases pre text a index", "text and index edge cases"), text("regresiu pôvodného počítadla", "the original counter regression")] },
        { title: text("Nedokazuje", "It does not prove"), items: [text("že tlačidlo volá správny callback", "that a button calls the right callback"), text("že layout vyzerá správne", "that layout looks correct"), text("že aplikácia funguje na každom OS", "that the app works on every OS")] }
      ]
    },
    {
      kind: "question",
      title: text("Ktorý test odhalí túto chybu?", "Which test catches this bug?"),
      prompt: text("Funkcia ignoruje index a vždy odstráni prvú položku. Vyberte najsilnejší test.", "The function ignores the index and always removes the first item. Choose the strongest test."),
      label: text("PREDIKCIA", "PREDICTION"),
      code: text(
        "def odstran_ulohu(ulohy, index):\n    if not 0 <= index < len(ulohy):\n        return False\n    del ulohy[0]  # bug\n    return True\n\nA  kontrola návratovej hodnoty\nB  kontrola len(ulohy) == 1\nC  odstráň index 1 a porovnaj presný zostávajúci list",
        "def delete_task(tasks, index):\n    if not 0 <= index < len(tasks):\n        return False\n    del tasks[0]  # bug\n    return True\n\nA  check the return value\nB  check len(tasks) == 1\nC  delete index 1 and compare the exact remaining list"
      )
    },
    {
      kind: "recap",
      title: text("Od bugu ku kvalitnejšiemu návrhu", "From a bug to a better design"),
      items: [
        text("Popíšte reprodukciu, expected a actual.", "Describe reproduction, expected and actual."),
        text("Skúmajte reálne dáta cez print, traceback alebo debugger.", "Inspect real data with print, traceback or debugger."),
        text("Najprv napíšte test, ktorý reprodukuje chybu.", "First write a test that reproduces the bug."),
        text("Oddeľte pravidlá nad dátami od GUI callbackov.", "Separate data rules from GUI callbacks."),
        text("Po malej oprave spustite celú testovaciu sadu.", "Run the full test suite after a small fix.")
      ]
    }
  ]
};
