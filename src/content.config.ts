import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { SITE } from "@/config";
import { CATEGORY_KEYS } from "@/utils/categories";
import { STATUSES } from "@/knowledge.config";

export const BLOG_PATH = "src/data/blog";
export const KNOWLEDGE_PATH = "src/data/knowledge";

const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: `./${BLOG_PATH}` }),
  schema: ({ image }) =>
    z.object({
      author: z.string().default(SITE.author),
      pubDatetime: z.date(),
      modDatetime: z.date().optional().nullable(),
      title: z.string(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default(["others"]),
      ogImage: image().or(z.string()).optional(),
      description: z.string(),
      canonicalURL: z.string().optional(),
      hideEditPost: z.boolean().optional(),
      timezone: z.string().optional(),
      // Type de post : badge des cartes + filtres de la page Posts
      category: z.enum(CATEGORY_KEYS).default("projet"),
      // Langue du post ; une traduction pointe vers le slug de l'original
      lang: z.enum(["fr", "en"]).default("fr"),
      translationOf: z.string().optional(),
      // Couverture (16:9 conseillé) : cartes, en-tête du post, aperçu de lien
      cover: image().optional(),
      coverAlt: z.string().optional(),
      // Liens projet affichés sur les cartes
      github: z.string().url().optional(),
      huggingface: z.string().url().optional(),
      kaggle: z.string().url().optional(),
      demo: z.string().url().optional(),
    }),
});

/* ===== Knowledge Hub (src/data/knowledge/<track>/…) =====
 * Une seule collection ; le type de chaque fichier (overview, cours, module,
 * note, expérience, projet, paper, référence, journal) est déduit de son
 * chemin — voir src/utils/knowledge.ts et src/data/knowledge/README.md.
 * Les fichiers et dossiers qui commencent par « _ » (modèles) sont ignorés.
 * Par défaut, rien n'est public : les règles de publication sont appliquées
 * au build par src/utils/knowledge.ts.
 */
const SECTIONS = "{notes,experiments,projects,papers,references,journal}";

const knowledge = defineCollection({
  loader: glob({
    pattern: [
      "[^_]*/overview.md",
      "[^_]*/courses/[^_]*/course.md",
      "[^_]*/courses/[^_]*/modules/[^_]*/note.md",
      "[^_]*/courses/[^_]*/modules/[^_]*.md",
      `[^_]*/${SECTIONS}/[^_]*.md`,
      `[^_]*/${SECTIONS}/[^_]*/{note,index}.md`,
    ],
    base: `./${KNOWLEDGE_PATH}`,
    // Identifiant = chemin relatif sans extension ni fichier note / index / course
    generateId: ({ entry }) =>
      entry.replace(/\.md$/, "").replace(/\/(note|index|course)$/, ""),
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      /** planned | in-progress | completed | paused | abandoned */
      status: z.enum(STATUSES).optional(),
      /** public | private — private par défaut pour les modules et entrées. */
      visibility: z.enum(["public", "private"]).optional(),
      order: z.number().optional(),
      /** Domaine de progression (Foundation, Architecture…). */
      area: z.string().optional(),
      /** Avancement 0-100 ; sinon déduit du statut. */
      progress: z.number().min(0).max(100).optional(),
      date: z.coerce.date().optional(),
      started: z.coerce.date().optional(),
      completed: z.coerce.date().optional(),
      // Cours, papers, références
      provider: z.string().optional(),
      authors: z.string().optional(),
      year: z.number().optional(),
      url: z.string().url().optional(),
      // Expériences et projets
      objective: z.string().optional(),
      hypothesis: z.string().optional(),
      dataset: z.string().optional(),
      github: z.string().url().optional(),
      demo: z.string().url().optional(),
      tags: z.array(z.string()).default([]),
      cover: image().optional(),
      // overview.md
      areas: z.array(z.string()).optional(),
      related: z.array(z.string()).default([]),
    }),
});

export const collections = { blog, knowledge };
