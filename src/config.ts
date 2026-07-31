export const SITE = {
  website: "https://fkdia23.github.io", // replace this with your deployed domain
  base: "Franklin_KN", // replace this with your repo name for github pages deployment
  author: "Franklin_KN",
  profile: "https://www.linkedin.com/in/franklin-kana-nguedia",
  desc: "Portfolio de Franklin KANA NGUEDIA — Data Engineer & AI Engineer : pipelines Airflow, systèmes RAG, graphes Neo4j, FinOps et observabilité.",
  title: "Home",
  ogImage: "", // vide => image OG générée dynamiquement (/og.png)
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 4,
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
  lang: "en", // html lang code. Set this empty and default will be "en"
  timezone: "Asia/Bangkok", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
} as const;
