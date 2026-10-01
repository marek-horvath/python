from typing import Any

import requests
from requests.exceptions import HTTPError, RequestException, Timeout


GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search"
WEATHER_URL = "https://api.open-meteo.com/v1/forecast"
REQUEST_TIMEOUT = 10


def find_city(name: str) -> dict[str, Any] | None:
    """Return the first geocoding match, or None when no city matches."""
    if not name:
        return None

    response = requests.get(
        GEOCODING_URL,
        params={"name": name, "count": 3, "language": "sk"},
        timeout=REQUEST_TIMEOUT,
    )
    response.raise_for_status()

    data = response.json()
    results = data.get("results", [])
    if not isinstance(results, list) or not results:
        return None

    city = results[0]
    return city if isinstance(city, dict) else None


def get_weather(latitude: float, longitude: float) -> dict[str, Any]:
    """Fetch current temperature and wind speed for a coordinate pair."""
    response = requests.get(
        WEATHER_URL,
        params={
            "latitude": latitude,
            "longitude": longitude,
            "current": "temperature_2m,wind_speed_10m",
            "timezone": "Europe/Bratislava",
        },
        timeout=REQUEST_TIMEOUT,
    )
    response.raise_for_status()

    data = response.json()
    if not isinstance(data, dict):
        raise ValueError("Weather API did not return a JSON object.")
    return data


def print_weather(city: dict[str, Any], data: dict[str, Any]) -> None:
    current = data.get("current")
    units = data.get("current_units")
    if not isinstance(current, dict) or not isinstance(units, dict):
        raise ValueError("Weather response is missing current values or units.")

    city_name = city.get("name", "Neznáme mesto")
    country = city.get("country", "neznáma krajina")
    observation_time = str(current["time"]).replace("T", " ")

    print(f"\n{city_name}, {country}")
    print(f"Čas údajov: {observation_time}")
    print(f"Teplota: {current['temperature_2m']} {units['temperature_2m']}")
    print(f"Vietor: {current['wind_speed_10m']} {units['wind_speed_10m']}")


def main() -> None:
    name = input("Mesto: ").strip()

    try:
        city = find_city(name)
        if city is None:
            print("Mesto sa nepodarilo nájsť.")
            return

        data = get_weather(float(city["latitude"]), float(city["longitude"]))
        print_weather(city, data)
    except Timeout:
        print("Server neodpovedal včas.")
    except HTTPError as error:
        print(f"HTTP chyba: {error.response.status_code}")
    except RequestException:
        print("Nepodarilo sa spojiť so službou.")
    except (KeyError, TypeError, ValueError):
        print("Služba vrátila údaje v neočakávanom formáte.")


if __name__ == "__main__":
    main()
