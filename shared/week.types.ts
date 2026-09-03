export type WeekStatus = "planned" | "in-progress" | "published";

export type MaterialLink = {
  label: string;
  href: string;
  type: "presentation" | "pdf" | "viewer" | "source" | "resource" | "assignment" | "exercise";
  public: boolean;
};

export type WeekConfig = {
  number: number;
  slug: string;
  folder: string;
  title: string;
  shortTitle: string;
  description: string;
  status: WeekStatus;
  lectureAvailable: boolean;
  exerciseAvailable: boolean;
  materials: MaterialLink[];
  plannedFocus: string[];
  learningOutcomes: string[];
};

export const statusLabels: Record<WeekStatus, string> = {
  planned: "Plánované",
  "in-progress": "Pripravuje sa",
  published: "Publikované"
};
