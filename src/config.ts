export const SITE = {
  website: "https://fkdia23.github.io", // replace this with your deployed domain
  base: "Franklin_KN", // replace this with your repo name for github pages deployment
  author: "Franklin KANA NGUEDIA",
  /** Nom complet : réservé aux descriptions (meta, bio de la page À propos). */
  name: "Franklin KANA NGUEDIA",
  role: "Data & AI Engineer",
  profile: "https://www.linkedin.com/in/franklin-kana-nguedia",
  desc: "Franklin KANA NGUEDIA, Data & AI Engineer. Projets, hackathons et analyses de solutions Kaggle : pipelines de données, systèmes RAG, agents LLM et fine-tuning.",
  /** Nom affiché partout ailleurs : onglet du navigateur, header, pied de page, aperçus. */
  title: "Franklin KN",
  ogImage: "", // vide => image OG générée dynamiquement (/og.jpg)
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 24, // une seule page tant qu'il y a peu de posts : les filtres par catégorie s'appliquent à toute la liste
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: true,
    text: "Edit page",
    url: "https://github.com/fkdia23/Franklin_KN/edit/main/",
  },
  dynamicOgImage: true,
  dir: "ltr", // "rtl" | "auto"
  lang: "fr", // html lang code. Set this empty and default will be "en"
  timezone: "Europe/Paris", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
} as const;
