/**
 * Textes de l'interface, en français (langue par défaut, à la racine du site)
 * et en anglais (/en/…). Les textes longs des pages (accueil, À propos) sont
 * dans les vues correspondantes (src/views/).
 */
export const LANGS = ["fr", "en"] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = "fr";

export const LANG_NAMES: Record<Lang, string> = {
  fr: "Français",
  en: "English",
};

const fr = {
  // Site
  "site.description":
    "Franklin KANA NGUEDIA, Data & AI Engineer. Projets, hackathons et analyses de solutions Kaggle : pipelines de données, systèmes RAG, agents LLM et fine-tuning.",
  "site.home": "accueil",

  // Header / navigation
  "nav.skip": "Aller au contenu",
  "nav.main": "Navigation principale",
  "nav.posts": "Posts",
  "nav.tags": "Tags",
  "nav.about": "À propos",
  "nav.more": "Plus",
  "nav.socials": "Réseaux",
  "nav.search": "Rechercher",
  "nav.archives": "Archives",
  "nav.theme": "Mode clair / sombre",
  "nav.language": "Langue",
  "nav.prevTabs": "Onglets précédents",
  "nav.nextTabs": "Onglets suivants",
  "nav.offline": "Désactivé en production (visible en local uniquement)",

  // Fil d'Ariane et pages communes
  "breadcrumb.label": "Fil d'Ariane",
  "breadcrumb.home": "Accueil",
  "breadcrumb.search": "Recherche",
  "page.of": "page",
  "pagination.label": "Pagination",
  "pagination.prev": "Précédent",
  "pagination.next": "Suivant",
  back: "Retour",
  backToTop: "Haut de page",
  "toc.title": "Sur cette page",
  "toc.label": "Sommaire",

  // Posts
  "posts.title": "Posts",
  "posts.description":
    "Projets, hackathons et analyses de solutions Kaggle gagnantes, en data engineering et en IA. Articles en français et en anglais.",
  "posts.filters": "Filtrer par catégorie",
  "posts.all": "Tout",
  "posts.empty": "Aucun post dans cette catégorie pour l'instant.",
  "posts.latest": "Derniers posts",
  "posts.seeAll": "Tous les posts",
  "post.minRead": "min de lecture",
  "post.prev": "Post précédent",
  "post.next": "Post suivant",
  "post.source": "code source",
  "post.writtenIn": "Écrit en français",
  "post.github": "Code sur GitHub",
  "post.huggingface": "Modèle Hugging Face",
  "post.kaggle": "Kaggle",
  "post.demo": "Démo",
  "date.updated": "Mis à jour le",

  // Tags, archives, recherche
  "tags.title": "Tags",
  "tags.description": "Les posts regroupés par technologie et par thème.",
  "tag.title": "Tag : ",
  "tag.description": "Tous les posts associés au tag",
  "archives.title": "Archives",
  "archives.description": "Tous les posts, classés par date de publication.",
  "search.title": "Recherche",
  "search.description": "Rechercher dans tous les posts.",
  "search.devWarning":
    "En mode dev, lancez au moins une fois le build pour voir les résultats de recherche.",

  // Pied de page
  "footer.rss": "RSS",

  // Knowledge Hub
  "k.description":
    "Mes parcours d'apprentissage et de recherche en IA : cours suivis, notes de modules, implémentations, expériences, papers et journal de progression.",
  "k.progress": "Progression",
  "k.overview": "Présentation",
  "k.courses": "Cours",
  "k.course": "Cours",
  "k.modules": "Modules",
  "k.module": "Module",
  "k.related": "Posts liés",
  "k.seeAll": "Tout voir",
  "k.empty": "Les premiers cours et notes de ce track arrivent bientôt.",
  "k.comingSoon": "Contenus à venir",
  "k.noTrack": "Aucun track publié pour l'instant.",
  "k.disabled": "Désactivé en production",
  "k.sections": "Sections du track",
  "k.started": "Commencé le",
  "k.completed": "Terminé le",
  "k.courseSource": "Source du cours",
  "k.readPaper": "Lire le paper",
  "k.link": "Lien",
  "k.demo": "Démo",
  "k.github": "Code sur GitHub",
  "k.objective": "Objectif",
  "k.hypothesis": "Hypothèse",
  "k.dataset": "Dataset",
  "k.modulesLater": "Les notes des modules seront publiées au fil du cours.",
  "k.prevModule": "Module précédent",
  "k.nextModule": "Module suivant",
  "k.prev": "Précédent",
  "k.next": "Suivant",
  "k.newer": "Entrée plus récente",
  "k.older": "Entrée plus ancienne",
  "k.pageNav": "Navigation entre les pages",
  "k.coursesIntro": "Les cours que je suis dans le track",
  "k.unpublished": "Non publié",
  "k.unpublishedHint": "Visible uniquement en local (npm run dev)",
  "k.devPreview": "Aperçu local",
  "k.devPage":
    "cette page n'est pas publiée (statut ou visibilité non publics, ou track désactivé).",
  "k.devTrack":
    "ce track est désactivé (enabled: false) : il n'existe pas en production.",
} as const;

export type UiKey = keyof typeof fr;

const en: Record<UiKey, string> = {
  "site.description":
    "Franklin KANA NGUEDIA, Data & AI Engineer. Projects, hackathons and analyses of winning Kaggle solutions: data pipelines, RAG systems, LLM agents and fine-tuning.",
  "site.home": "home",

  "nav.skip": "Skip to content",
  "nav.main": "Main navigation",
  "nav.posts": "Posts",
  "nav.tags": "Tags",
  "nav.about": "About",
  "nav.more": "More",
  "nav.socials": "Social links",
  "nav.search": "Search",
  "nav.archives": "Archives",
  "nav.theme": "Light / dark mode",
  "nav.language": "Language",
  "nav.prevTabs": "Previous tabs",
  "nav.nextTabs": "More tabs",
  "nav.offline": "Disabled in production (visible locally only)",

  "breadcrumb.label": "Breadcrumb",
  "breadcrumb.home": "Home",
  "breadcrumb.search": "Search",
  "page.of": "page",
  "pagination.label": "Pagination",
  "pagination.prev": "Previous",
  "pagination.next": "Next",
  back: "Back",
  backToTop: "Back to top",
  "toc.title": "On this page",
  "toc.label": "Table of contents",

  "posts.title": "Posts",
  "posts.description":
    "Projects, hackathons and analyses of winning Kaggle solutions in data engineering and AI. Articles in French and English.",
  "posts.filters": "Filter by category",
  "posts.all": "All",
  "posts.empty": "No posts in this category yet.",
  "posts.latest": "Latest posts",
  "posts.seeAll": "All posts",
  "post.minRead": "min read",
  "post.prev": "Previous post",
  "post.next": "Next post",
  "post.source": "source code",
  "post.writtenIn": "Written in English",
  "post.github": "Code on GitHub",
  "post.huggingface": "Hugging Face model",
  "post.kaggle": "Kaggle",
  "post.demo": "Demo",
  "date.updated": "Updated:",

  "tags.title": "Tags",
  "tags.description": "Posts grouped by technology and topic.",
  "tag.title": "Tag: ",
  "tag.description": "All posts tagged",
  "archives.title": "Archives",
  "archives.description": "All posts, sorted by publication date.",
  "search.title": "Search",
  "search.description": "Search all posts.",
  "search.devWarning":
    "In dev mode, run the build at least once to see search results.",

  "footer.rss": "RSS",

  "k.description":
    "My AI learning and research tracks: courses, module notes, implementations, experiments, papers and a progress journal.",
  "k.progress": "Progress",
  "k.overview": "Overview",
  "k.courses": "Courses",
  "k.course": "Course",
  "k.modules": "Modules",
  "k.module": "Module",
  "k.related": "Related posts",
  "k.seeAll": "See all",
  "k.empty": "The first courses and notes of this track are coming soon.",
  "k.comingSoon": "Coming soon",
  "k.noTrack": "No published track yet.",
  "k.disabled": "Disabled in production",
  "k.sections": "Track sections",
  "k.started": "Started",
  "k.completed": "Completed",
  "k.courseSource": "Course source",
  "k.readPaper": "Read the paper",
  "k.link": "Link",
  "k.demo": "Demo",
  "k.github": "Code on GitHub",
  "k.objective": "Objective",
  "k.hypothesis": "Hypothesis",
  "k.dataset": "Dataset",
  "k.modulesLater": "Module notes will be published as the course progresses.",
  "k.prevModule": "Previous module",
  "k.nextModule": "Next module",
  "k.prev": "Previous",
  "k.next": "Next",
  "k.newer": "Newer entry",
  "k.older": "Older entry",
  "k.pageNav": "Page navigation",
  "k.coursesIntro": "The courses I follow in the track",
  "k.unpublished": "Unpublished",
  "k.unpublishedHint": "Visible locally only (npm run dev)",
  "k.devPreview": "Local preview",
  "k.devPage":
    "this page is not published (non-public status or visibility, or disabled track).",
  "k.devTrack":
    "this track is disabled (enabled: false): it does not exist in production.",
};

export const UI: Record<Lang, Record<UiKey, string>> = { fr, en };
