export type WorksheetText = { sk: string; en: string };

export type WorksheetTask = {
  title: WorksheetText;
  context: WorksheetText;
  requirements: WorksheetText[];
  expected?: string;
};

export type Worksheet = {
  slug: string;
  introduction: WorksheetText;
  files: string[];
  commands: string;
  goals: WorksheetText[];
  tasks: WorksheetTask[];
  deliverables: WorksheetText[];
  references: { title: string; href: string }[];
};
