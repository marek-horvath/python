"""Lex technical prose before TeX escaping, never rewrite generated LaTeX/code."""
from __future__ import annotations

import json
from pathlib import Path
import re
from typing import Callable


class Terminology:
    def __init__(self, path: Path):
        data = json.loads(path.read_text(encoding="utf-8"))
        branches = []
        self.terms = []
        for key, insensitive in [("caseSensitive", False), ("caseInsensitive", True)]:
            values = data[key]
            if not isinstance(values, list) or any(not isinstance(value, str) or not value.strip() for value in values):
                raise ValueError(f"{path.name}: {key} musí byť zoznam neprázdnych výrazov.")
            self.terms.extend(values)
            for value in values:
                escaped = r"\s+".join(re.escape(word) for word in value.split())
                branches.append((len(value), "(?i:" + escaped + ")" if insensitive else escaped))
        alternatives = "|".join(value for _, value in sorted(set(branches), reverse=True))
        self.pattern = re.compile(r"(?<![\w])(?:" + alternatives + r")(?![\w])")

    def render(self, value: str, escape: Callable[[str], str]) -> str:
        output, end = [], 0
        for match in self.pattern.finditer(value):
            output.extend([escape(value[end:match.start()]), r"\textit{" + escape(match[0]) + "}"])
            end = match.end()
        output.append(escape(value[end:]))
        return "".join(output)
