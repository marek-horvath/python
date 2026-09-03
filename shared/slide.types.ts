export type CodeLanguage = "python" | "c" | "bash" | "text";

export type CodeBlock = {
  language: CodeLanguage;
  code: string;
  label?: string;
  highlightLines?: number[];
  variant?: "default" | "bad" | "good";
  runnable?: boolean;
};

export type TextColumn = {
  title: string;
  items: string[];
};

export type TableData = {
  headers: string[];
  rows: string[][];
};

export type CodeBlockTranslation = {
  label?: string;
  code?: string;
};

export type TextColumnTranslation = {
  title?: string;
  items?: string[];
};

export type TableDataTranslation = {
  headers?: string[];
  rows?: string[][];
};

export type LectureSlideTranslation = {
  section?: string;
  title?: string;
  subtitle?: string;
  body?: string;
  points?: string[];
  code?: CodeBlockTranslation;
  codeBlocks?: CodeBlockTranslation[];
  columns?: TextColumnTranslation[];
  table?: TableDataTranslation;
  diagramItems?: string[];
  prompt?: string;
};

export type LectureTranslation = {
  title?: string;
  description?: string;
  duration?: string;
  slides?: Record<string, LectureSlideTranslation>;
};

export type LectureSlide = {
  id: string;
  type:
    | "title"
    | "section"
    | "statement"
    | "bullets"
    | "code"
    | "split-code"
    | "question"
    | "compare"
    | "table"
    | "diagram"
    | "demo"
    | "takeaway"
    | "semester-map";
  section?: string;
  title: string;
  subtitle?: string;
  body?: string;
  points?: string[];
  code?: CodeBlock;
  codeBlocks?: CodeBlock[];
  columns?: TextColumn[];
  table?: TableData;
  diagramItems?: string[];
  prompt?: string;
};

export type Lecture = {
  weekNumber: number;
  slug: string;
  title: string;
  description: string;
  duration: string;
  slides: LectureSlide[];
  translations?: {
    en?: LectureTranslation;
  };
};
