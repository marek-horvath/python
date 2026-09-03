from dataclasses import dataclass
from pathlib import Path
from urllib.parse import urljoin

from bs4 import BeautifulSoup

BASE_URL = "https://example.com/catalog/"
CATALOG_DIR = Path(__file__).parent / "catalog"


@dataclass
class Product:
    product_id: str
    name: str
    price: float
    url: str
    rating: float | None = None


def parse_products(html: str, base_url: str = BASE_URL) -> list[Product]:
    # Úlohy 2-4: nájdite produkty a postupne doplňte robustný parser.
    return []


def load_local_page(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def main() -> None:
    html = load_local_page(CATALOG_DIR / "page1.html")
    products = parse_products(html)
    for product in products:
        print(product)


if __name__ == "__main__":
    main()
