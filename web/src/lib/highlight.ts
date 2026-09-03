import type { CodeBlock } from "../../../shared/slide.types";

const pythonKeywords = new Set([
  "False",
  "None",
  "True",
  "and",
  "as",
  "class",
  "def",
  "elif",
  "else",
  "except",
  "finally",
  "for",
  "from",
  "if",
  "import",
  "in",
  "is",
  "not",
  "or",
  "pass",
  "return",
  "try",
  "while",
  "with"
]);

const cKeywords = new Set(["for", "int", "printf", "return"]);
const bashKeywords = new Set(["python", "pip"]);

export function highlightedCode(block: CodeBlock) {
  const highlighted = new Set(block.highlightLines ?? []);
  return block.code
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((line, index) => {
      const lineNumber = index + 1;
      const className = highlighted.has(lineNumber) ? "code-line is-highlighted" : "code-line";
      return `<span class="${className}">${highlightLine(line, block.language)}</span>`;
    })
    .join("");
}

function highlightLine(line: string, language: CodeBlock["language"]) {
  if (language === "text") return escapeHtml(line);
  if (language === "bash") return highlightShellLine(line);
  if (language === "python") return highlightCodeLine(line, pythonKeywords, true);
  if (language === "c") return highlightCodeLine(line, cKeywords, false);
  return escapeHtml(line);
}

function highlightShellLine(line: string) {
  return line
    .split(/(\s+)/)
    .map((part) => {
      if (bashKeywords.has(part)) return `<span class="tok-keyword">${escapeHtml(part)}</span>`;
      return escapeHtml(part);
    })
    .join("");
}

function highlightCodeLine(line: string, keywords: Set<string>, pythonComments: boolean) {
  let output = "";
  let index = 0;

  while (index < line.length) {
    const char = line[index];

    if (pythonComments && char === "#") {
      output += `<span class="tok-comment">${escapeHtml(line.slice(index))}</span>`;
      break;
    }

    if (char === `"` || char === "'") {
      const end = readString(line, index, char);
      output += `<span class="tok-string">${escapeHtml(line.slice(index, end))}</span>`;
      index = end;
      continue;
    }

    if (isDigit(char)) {
      const end = readWhile(line, index, (value) => isDigit(value) || value === ".");
      output += `<span class="tok-number">${escapeHtml(line.slice(index, end))}</span>`;
      index = end;
      continue;
    }

    if (isIdentifierStart(char)) {
      const end = readWhile(line, index, isIdentifierPart);
      const word = line.slice(index, end);
      output += keywords.has(word) ? `<span class="tok-keyword">${escapeHtml(word)}</span>` : escapeHtml(word);
      index = end;
      continue;
    }

    output += escapeHtml(char);
    index += 1;
  }

  return output;
}

function readString(line: string, start: number, quote: string) {
  let index = start + 1;
  while (index < line.length) {
    if (line[index] === "\\") {
      index += 2;
      continue;
    }
    if (line[index] === quote) return index + 1;
    index += 1;
  }
  return line.length;
}

function readWhile(line: string, start: number, predicate: (value: string) => boolean) {
  let index = start;
  while (index < line.length && predicate(line[index])) index += 1;
  return index;
}

function isDigit(value: string) {
  return value >= "0" && value <= "9";
}

function isIdentifierStart(value: string) {
  return /[A-Za-z_]/.test(value);
}

function isIdentifierPart(value: string) {
  return /[A-Za-z0-9_]/.test(value);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
