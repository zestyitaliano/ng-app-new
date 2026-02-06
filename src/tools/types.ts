export type ToolCategory =
  | "Text"
  | "Images"
  | "URLs"
  | "SEO"
  | "Design"
  | "Other";

export type ToolMeta = {
  slug: string;
  title: string;
  description: string;
  category: ToolCategory;
};
