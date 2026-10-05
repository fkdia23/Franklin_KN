/**
 * Types de posts — source unique pour le schéma (content.config.ts),
 * les badges des cartes et les filtres de la page Posts.
 */
export const CATEGORY_KEYS = [
  "projet",
  "hackathon",
  "kaggle",
  "article",
] as const;

export type Category = (typeof CATEGORY_KEYS)[number];

export const CATEGORIES: Record<Category, { label: string; plural: string }> = {
  projet: { label: "Projet", plural: "Projets" },
  hackathon: { label: "Hackathon", plural: "Hackathons" },
  kaggle: { label: "Kaggle", plural: "Kaggle" },
  article: { label: "Article", plural: "Articles" },
};

/** Libellés anglais (pages /en/…). */
export const CATEGORIES_EN: Record<
  Category,
  { label: string; plural: string }
> = {
  projet: { label: "Project", plural: "Projects" },
  hackathon: { label: "Hackathon", plural: "Hackathons" },
  kaggle: { label: "Kaggle", plural: "Kaggle" },
  article: { label: "Article", plural: "Articles" },
};

/** Libellés des catégories dans la langue de la page. */
export const categoriesFor = (lang: "fr" | "en") =>
  lang === "en" ? CATEGORIES_EN : CATEGORIES;
