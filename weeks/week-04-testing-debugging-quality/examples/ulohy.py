from typing import TypedDict


class Uloha(TypedDict):
    text: str
    hotova: bool


def pocet_nesplnenych(ulohy: list[Uloha]) -> int:
    return sum(not uloha["hotova"] for uloha in ulohy)


def pridaj_ulohu(ulohy: list[Uloha], text: str) -> bool:
    text = text.strip()
    if not text:
        return False

    ulohy.append({"text": text, "hotova": False})
    return True


def prepni_ulohu(ulohy: list[Uloha], index: int) -> bool:
    if not 0 <= index < len(ulohy):
        return False

    ulohy[index]["hotova"] = not ulohy[index]["hotova"]
    return True


def odstran_ulohu(ulohy: list[Uloha], index: int) -> bool:
    if not 0 <= index < len(ulohy):
        return False

    del ulohy[index]
    return True
