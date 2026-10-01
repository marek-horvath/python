# Weather CLI

Ukážka z prednášky prepája Open-Meteo Geocoding API a Forecast API. Živý program spustíte takto:

```bash
python -m pip install -r requirements.txt
python weather_cli.py
```

Po zadaní názvu mesta program nájde prvý geocoding výsledok a vypíše aktuálnu teplotu a rýchlosť vetra. Vyžaduje internetové pripojenie.

Adresár `fixtures/` obsahuje relevantné časti odpovedí zachytené 1. októbra 2026 pre Košice. Slúžia ako stabilný podklad prezentácie; živé hodnoty sa budú meniť.
