from dataclasses import dataclass


@dataclass
class Weather:
    city: str
    temperature: float
    wind_speed: float


LOCATIONS = {
    "kosice": (48.7164, 21.2611),
    "bratislava": (48.1486, 17.1077),
    "praha": (50.0755, 14.4378),
}


def fetch_weather(latitude: float, longitude: float) -> dict:
    # TODO: implement HTTPX request in tasks 1-2
    return {}


def parse_weather(city: str, data: dict) -> Weather:
    # TODO: implement JSON parsing in tasks 3-4
    return Weather(city=city, temperature=0.0, wind_speed=0.0)


def format_weather(weather: Weather) -> str:
    return (
        f"{weather.city}\n"
        f"Teplota: {weather.temperature} °C\n"
        f"Vietor: {weather.wind_speed} km/h"
    )


def main() -> None:
    city = "kosice"
    latitude, longitude = LOCATIONS[city]
    data = fetch_weather(latitude, longitude)
    weather = parse_weather(city.capitalize(), data)
    print(format_weather(weather))


if __name__ == "__main__":
    main()

