from dataclasses import dataclass


@dataclass
class TextStats:
    characters: int
    words: int
    lines: int


def analyze_text(text: str) -> TextStats:
    return TextStats(
        characters=len(text),
        words=len(text.split(" ")),
        lines=text.count("\n"),
    )

