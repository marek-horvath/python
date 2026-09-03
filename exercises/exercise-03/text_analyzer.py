import tkinter as tk
from dataclasses import dataclass
from tkinter import ttk


@dataclass
class TextStats:
    characters: int
    words: int
    lines: int


def analyze_text(text: str) -> TextStats:
    # TODO: implement in task 4
    return TextStats(characters=0, words=0, lines=0)


def main() -> None:
    root = tk.Tk()
    root.title("Text Analyzer")
    root.geometry("520x420")

    message = ttk.Label(root, text="Doplňte aplikáciu podľa zadania.")
    message.grid(row=0, column=0, padx=12, pady=12, sticky="w")

    root.mainloop()


if __name__ == "__main__":
    main()

