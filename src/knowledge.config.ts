/**
 * Knowledge Hub — configuration centrale des tracks.
 *
 * Un track = un parcours d'apprentissage / de recherche indépendant. Son
 * contenu vit dans src/data/knowledge/<id>/ (voir src/data/knowledge/README.md).
 *
 * Modifier un track (titre, URL, ordre, activation) se fait ici, sans toucher
 * aux composants : le header, le hub et les pages sont générés à partir de
 * cette liste. Un track désactivé (`enabled: false`) n'a ni onglet, ni page,
 * ni entrée dans le sitemap en production ; son contenu reste dans le dépôt
 * et il réapparaît dès qu'on le réactive. En `npm run dev`, tous les tracks
 * restent consultables pour pouvoir écrire et relire en local.
 */

export const STATUSES = [
  "planned",
  "in-progress",
  "completed",
  "paused",
  "abandoned",
] as const;
export type Status = (typeof STATUSES)[number];

export interface TrackConfig {
  /** Nom du dossier dans src/data/knowledge/ — ne pas le changer après coup. */
  id: string;
  /** Titre de l'onglet et de la page. */
  title: string;
  /** URL publique : /knowledge/<slug>/ */
  slug: string;
  /** Publié en production ? */
  enabled: boolean;
  /** Position dans le header et le hub (croissant). */
  order: number;
  /** Couleur des barres de progression (sinon la couleur d'accent du thème). */
  color?: string;
}

export const KNOWLEDGE = {
  title: "Knowledge Hub",
  // Description du hub : src/i18n/ui.ts (clé « k.description », FR et EN)
  /** Préfixe des URLs des tracks. */
  basePath: "/knowledge",

  /**
   * Statuts visibles en production (cours, modules, expériences, projets,
   * papers). Ajouter "paused" ici pour publier aussi les cours en pause.
   */
  publicStatuses: ["in-progress", "completed"] as Status[],

  /**
   * Nombre maximal d'onglets de tracks dans le header. Au-delà, un onglet
   * « Plus » mène au hub qui liste tous les tracks.
   */
  headerLimit: 5,

  tracks: [
    {
      id: "llm-from-scratch",
      title: "LLM From Scratch",
      slug: "llm-from-scratch",
      enabled: true,
      order: 1,
    },
    {
      id: "llm-reasoning",
      title: "LLM Reasoning",
      slug: "llm-reasoning",
      enabled: true,
      order: 2,
    },
    {
      id: "llm-post-training",
      title: "LLM Post-Training",
      slug: "llm-post-training",
      enabled: true,
      order: 3,
    },
    {
      id: "llm-quantization",
      title: "LLM Quantization",
      slug: "llm-quantization",
      enabled: false,
      order: 4,
    },
    {
      id: "llm-stuff",
      title: "LLM Stuff",
      slug: "llm-stuff",
      enabled: false,
      order: 5,
    },
    {
      id: "graph-neural-networks",
      title: "Graph Neural Networks",
      slug: "graph-neural-networks",
      enabled: false,
      order: 6,
    },
    {
      id: "miscellaneous",
      title: "Miscellaneous",
      slug: "miscellaneous",
      enabled: false,
      order: 7,
    },
  ] satisfies TrackConfig[] as TrackConfig[],
};
