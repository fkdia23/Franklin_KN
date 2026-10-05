/**
 * Knowledge Hub — chargement, règles de publication, URLs et progression.
 *
 * Toutes les pages du hub passent par ici : c'est le seul endroit qui décide
 * de ce qui est publié. En production, un contenu non public n'est jamais
 * chargé dans une page, une liste, un aperçu ou le sitemap (filtrage au build,
 * pas en CSS). En développement (`npm run dev`), tout reste visible avec un
 * badge « Non publié » pour pouvoir écrire et relire en local.
 */
import { getCollection, type CollectionEntry } from "astro:content";
import { KNOWLEDGE, type Status, type TrackConfig } from "@/knowledge.config";
import {
  DEFAULT_LANG,
  formatDate as formatLocalDate,
  localizePath,
  type Lang,
} from "@/i18n/utils";

export const PREVIEW = import.meta.env.DEV;

export type Section =
  | "notes"
  | "experiments"
  | "projects"
  | "papers"
  | "references"
  | "journal";

const SECTION_TEXTS: Record<
  Lang,
  Record<Section, { label: string; intro: string }>
> = {
  fr: {
    notes: {
      label: "Notes",
      intro: "Notes d'apprentissage hors cours : concepts, synthèses, fiches.",
    },
    experiments: {
      label: "Expériences",
      intro:
        "Expériences menées : objectif, configuration, résultats, conclusions.",
    },
    projects: {
      label: "Projets",
      intro: "Implémentations et projets liés à ce track.",
    },
    papers: {
      label: "Papers",
      intro: "Articles de recherche lus, avec mes notes.",
    },
    references: {
      label: "Références",
      intro: "Livres, cours, vidéos, dépôts et articles de référence.",
    },
    journal: {
      label: "Journal",
      intro: "Le journal chronologique de ma progression.",
    },
  },
  en: {
    notes: {
      label: "Notes",
      intro:
        "Learning notes outside courses: concepts, summaries, cheat sheets.",
    },
    experiments: {
      label: "Experiments",
      intro: "Experiments I ran: objective, setup, results, conclusions.",
    },
    projects: {
      label: "Projects",
      intro: "Implementations and projects related to this track.",
    },
    papers: {
      label: "Papers",
      intro: "Research papers I read, with my notes.",
    },
    references: {
      label: "References",
      intro: "Reference books, courses, videos, repositories and articles.",
    },
    journal: {
      label: "Journal",
      intro: "The chronological journal of my progress.",
    },
  },
};

/** Libellés et introductions des sections, dans la langue de la page. */
export const sectionsFor = (lang: Lang) => SECTION_TEXTS[lang];
/** Rétrocompatibilité : libellés français. */
export const SECTIONS = SECTION_TEXTS.fr;

export const SECTION_KEYS = Object.keys(SECTIONS) as Section[];

const STATUS_TEXTS: Record<Lang, Record<Status, string>> = {
  fr: {
    planned: "Planifié",
    "in-progress": "En cours",
    completed: "Terminé",
    paused: "En pause",
    abandoned: "Abandonné",
  },
  en: {
    planned: "Planned",
    "in-progress": "In progress",
    completed: "Completed",
    paused: "Paused",
    abandoned: "Abandoned",
  },
};

/** Libellés des statuts, dans la langue de la page. */
export const statusLabelsFor = (lang: Lang) => STATUS_TEXTS[lang];

export type KnowledgeDoc = CollectionEntry<"knowledge">;
type Visibility = "public" | "private";

export interface ProgressRow {
  label: string;
  percent: number;
  /** Éléments terminés / éléments comptés. */
  done: number;
  total: number;
}

export interface ModuleItem {
  entry: KnowledgeDoc;
  slug: string;
  /** « 04 » — tiré du nom de dossier ou de `order`. */
  number: string;
  order: number;
  title: string;
  status: Status;
  url: string;
  published: boolean;
}

export interface CourseItem {
  entry: KnowledgeDoc;
  track: TrackConfig;
  slug: string;
  title: string;
  status: Status;
  url: string;
  published: boolean;
  /** Modules affichés (publiés en production, tous en développement). */
  modules: ModuleItem[];
  /** Calculée sur tous les modules du cours, hors abandonnés. */
  progress: ProgressRow;
}

export interface EntryItem {
  entry: KnowledgeDoc;
  track: TrackConfig;
  section: Section;
  slug: string;
  title: string;
  status?: Status;
  date?: Date;
  /** Page interne ; absente pour une référence sans notes. */
  url?: string;
  /** Lien des listes : page interne, sinon lien externe. */
  href?: string;
  published: boolean;
}

export interface TrackData {
  track: TrackConfig;
  overview?: KnowledgeDoc;
  description: string;
  courses: CourseItem[];
  sections: Record<Section, EntryItem[]>;
  /** Progression par domaine (champ `area`, sinon par cours). */
  progress: ProgressRow[];
  overall?: ProgressRow;
  isEmpty: boolean;
}

/* ===== Tracks ===== */

let validated = false;
function validateConfig() {
  if (validated) return;
  validated = true;
  const seen = { id: new Set<string>(), slug: new Set<string>() };
  for (const track of KNOWLEDGE.tracks) {
    for (const key of ["id", "slug"] as const) {
      const value = track[key];
      if (!/^[a-z0-9][a-z0-9-]*$/.test(value)) {
        throw new Error(
          `knowledge.config.ts : ${key} « ${value} » invalide (minuscules, chiffres et tirets).`
        );
      }
      if (seen[key].has(value)) {
        throw new Error(`knowledge.config.ts : ${key} « ${value} » en double.`);
      }
      seen[key].add(value);
    }
  }
}

/** Tracks consultables : activés en production, tous en développement. */
export function getTracks(): TrackConfig[] {
  validateConfig();
  return KNOWLEDGE.tracks
    .filter(track => track.enabled || PREVIEW)
    .sort((a, b) => a.order - b.order);
}

export const hubUrl = (lang: Lang = DEFAULT_LANG) =>
  localizePath(`${KNOWLEDGE.basePath}/`, lang);
export const trackUrl = (track: TrackConfig, lang: Lang = DEFAULT_LANG) =>
  localizePath(`${KNOWLEDGE.basePath}/${track.slug}/`, lang);

/* ===== Type d'un fichier, d'après son chemin ===== */

type Located =
  | { kind: "overview"; track: string }
  | { kind: "course"; track: string; course: string }
  | { kind: "module"; track: string; course: string; slug: string }
  | { kind: "entry"; track: string; section: Section; slug: string };

function locate(id: string): Located | null {
  const [track, second, ...rest] = id.split("/");
  if (second === "overview" && rest.length === 0) {
    return { kind: "overview", track };
  }
  if (second === "courses" && rest.length === 1) {
    return { kind: "course", track, course: rest[0] };
  }
  if (second === "courses" && rest.length === 3 && rest[1] === "modules") {
    return { kind: "module", track, course: rest[0], slug: rest[2] };
  }
  if (SECTION_KEYS.includes(second as Section) && rest.length > 0) {
    return {
      kind: "entry",
      track,
      section: second as Section,
      slug: rest.join("/"),
    };
  }
  return null;
}

/* ===== Publication ===== */

/**
 * Règle commune : le statut, s'il existe, doit être public
 * (KNOWLEDGE.publicStatuses) et la visibilité, si elle existe, « public ».
 */
export function isPublic(state: { status?: Status; visibility?: Visibility }) {
  if (state.visibility === "private") return false;
  return (
    state.status === undefined ||
    KNOWLEDGE.publicStatuses.includes(state.status)
  );
}

// Valeurs par défaut : rien n'est public sans le décider explicitement
const courseState = (d: KnowledgeDoc["data"]) => ({
  status: d.status ?? ("planned" as Status),
  visibility: d.visibility,
});
const moduleState = (d: KnowledgeDoc["data"]) => ({
  status: d.status ?? ("planned" as Status),
  visibility: d.visibility ?? ("private" as Visibility),
});
const entryState = (d: KnowledgeDoc["data"]) => ({
  status: d.status,
  visibility: d.visibility ?? ("private" as Visibility),
});

/* ===== Progression ===== */

/** Avancement entre 0 et 1 : `progress`, sinon déduit du statut. */
function completion(item: { status?: Status; progress?: number }) {
  if (item.progress !== undefined) return item.progress / 100;
  if (item.status === "completed") return 1;
  if (item.status === "in-progress") return 0.5;
  return 0;
}

function progressRow(
  label: string,
  items: { status?: Status; progress?: number }[]
): ProgressRow {
  const counted = items.filter(item => item.status !== "abandoned");
  const score = counted.reduce((sum, item) => sum + completion(item), 0);
  return {
    label,
    percent: counted.length ? Math.round((score / counted.length) * 100) : 0,
    done: counted.filter(item => completion(item) === 1).length,
    total: counted.length,
  };
}

/* ===== Chargement ===== */

const DATE_IN_SLUG = /(\d{4}-\d{2}-\d{2})/;

export const formatDate = (date: Date, lang: Lang = DEFAULT_LANG) =>
  formatLocalDate(date, lang);

const humanize = (slug: string) => {
  const text = slug
    .split("/")
    .at(-1)!
    .replace(/^\d+[-_]/, "")
    .replace(/[-_]+/g, " ");
  return text.charAt(0).toUpperCase() + text.slice(1);
};

function toModule(
  entry: KnowledgeDoc,
  slug: string,
  courseUrl: string
): ModuleItem {
  const prefix = slug.match(/^(\d+)/)?.[1];
  const { order: explicit } = entry.data;
  const state = moduleState(entry.data);
  return {
    entry,
    slug,
    number:
      prefix?.padStart(2, "0") ??
      (explicit !== undefined ? String(explicit).padStart(2, "0") : ""),
    order: explicit ?? (prefix ? Number(prefix) : Number.MAX_SAFE_INTEGER),
    title: entry.data.title ?? humanize(slug),
    status: state.status,
    url: `${courseUrl}${slug}/`,
    published: isPublic(state),
  };
}

async function buildTracks(lang: Lang): Promise<TrackData[]> {
  const docs = (await getCollection("knowledge"))
    .map(entry => ({ entry, at: locate(entry.id) }))
    .filter(
      (doc): doc is { entry: KnowledgeDoc; at: Located } => doc.at !== null
    );

  return getTracks().map(track => {
    const base = trackUrl(track, lang);
    const own = docs.filter(doc => doc.at.track === track.id);
    const overview = own.find(doc => doc.at.kind === "overview")?.entry;

    // Cours et modules (tous les modules gardés à part pour la progression)
    const allModules = new Map<string, ModuleItem[]>();
    const courses: CourseItem[] = own
      .flatMap(doc =>
        doc.at.kind === "course" ? [{ ...doc, at: doc.at }] : []
      )
      .map(({ entry, at }) => {
        const url = `${base}courses/${at.course}/`;
        const state = courseState(entry.data);
        const published = isPublic(state);
        const all = own
          .flatMap(doc =>
            doc.at.kind === "module" && doc.at.course === at.course
              ? [toModule(doc.entry, doc.at.slug, url)]
              : []
          )
          .sort((a, b) => a.order - b.order || a.slug.localeCompare(b.slug));
        allModules.set(at.course, all);
        return {
          entry,
          track,
          slug: at.course,
          title: entry.data.title ?? humanize(at.course),
          status: state.status,
          url,
          published,
          modules: all.filter(m => PREVIEW || (published && m.published)),
          progress: progressRow(
            entry.data.title ?? humanize(at.course),
            all.map(m => ({
              status: m.status,
              progress: m.entry.data.progress,
            }))
          ),
        };
      })
      .filter(course => PREVIEW || course.published)
      .sort(
        (a, b) =>
          (a.entry.data.order ?? Infinity) - (b.entry.data.order ?? Infinity) ||
          a.title.localeCompare(b.title)
      );

    // Notes, expériences, projets, papers, références, journal
    const sections = Object.fromEntries(
      SECTION_KEYS.map(key => [key, [] as EntryItem[]])
    ) as Record<Section, EntryItem[]>;

    for (const { entry, at } of own) {
      if (at.kind !== "entry") continue;
      const state = entryState(entry.data);
      const published = isPublic(state);
      if (!published && !PREVIEW) continue;

      const dateMatch = at.slug.match(DATE_IN_SLUG)?.[1];
      const date =
        entry.data.date ?? (dateMatch ? new Date(dateMatch) : undefined);
      const title =
        entry.data.title ??
        (at.section === "journal" && date
          ? formatDate(date, lang)
          : humanize(at.slug));
      // Une référence sans notes n'a pas de page : la liste pointe vers son URL
      const hasPage =
        at.section !== "references" || Boolean(entry.body?.trim());
      const url = hasPage ? `${base}${at.section}/${at.slug}/` : undefined;

      sections[at.section].push({
        entry,
        track,
        section: at.section,
        slug: at.slug,
        title,
        status: state.status,
        date,
        url,
        href: url ?? entry.data.url,
        published,
      });
    }

    for (const key of SECTION_KEYS) {
      sections[key].sort((a, b) =>
        key === "journal"
          ? (b.date?.getTime() ?? 0) - (a.date?.getTime() ?? 0)
          : (a.entry.data.order ?? Infinity) -
              (b.entry.data.order ?? Infinity) ||
            (b.date?.getTime() ?? 0) - (a.date?.getTime() ?? 0) ||
            a.title.localeCompare(b.title)
      );
    }

    // Progression : modules des cours affichés (hors cours abandonnés)
    // + expériences affichées qui ont un statut
    const items = [
      ...courses
        .filter(course => course.status !== "abandoned")
        .flatMap(course =>
          (allModules.get(course.slug) ?? []).map(m => ({
            area: m.entry.data.area ?? course.title,
            status: m.status,
            progress: m.entry.data.progress,
          }))
        ),
      ...sections.experiments
        .filter(item => item.status)
        .map(item => ({
          area: item.entry.data.area ?? "Experiments",
          status: item.status,
          progress: item.entry.data.progress,
        })),
    ];
    const areaOrder = [
      ...(overview?.data.areas ?? []),
      ...items.map(item => item.area),
    ].filter((area, i, list) => list.indexOf(area) === i);
    const progress = areaOrder
      .map(area =>
        progressRow(
          area,
          items.filter(item => item.area === area)
        )
      )
      .filter(row => row.total > 0);

    return {
      track,
      overview,
      description: overview?.data.description ?? "",
      courses,
      sections,
      progress,
      overall: items.length ? progressRow("Global", items) : undefined,
      isEmpty:
        courses.length === 0 &&
        SECTION_KEYS.every(key => sections[key].length === 0),
    };
  });
}

const cache = new Map<Lang, Promise<TrackData[]>>();

/** Tous les tracks consultables, avec leur contenu visible (URLs dans `lang`). */
export function loadKnowledge(lang: Lang = DEFAULT_LANG): Promise<TrackData[]> {
  // En dev, on relit à chaque requête pour refléter les modifications
  if (PREVIEW) return buildTracks(lang);
  if (!cache.has(lang)) cache.set(lang, buildTracks(lang));
  return cache.get(lang)!;
}

/* ===== Routes ===== */

export type KnowledgeRoute =
  | { kind: "courses"; data: TrackData }
  | { kind: "course"; data: TrackData; course: CourseItem }
  | {
      kind: "module";
      data: TrackData;
      course: CourseItem;
      module: ModuleItem;
    }
  | { kind: "section"; data: TrackData; section: Section }
  | { kind: "entry"; data: TrackData; item: EntryItem };

/** Toutes les pages sous /knowledge/<track>/… (hors page du track). */
export async function getKnowledgeRoutes(lang: Lang = DEFAULT_LANG) {
  const routes: { track: string; path: string; route: KnowledgeRoute }[] = [];
  for (const data of await loadKnowledge(lang)) {
    const track = data.track.slug;
    if (data.courses.length) {
      routes.push({ track, path: "courses", route: { kind: "courses", data } });
    }
    for (const course of data.courses) {
      routes.push({
        track,
        path: `courses/${course.slug}`,
        route: { kind: "course", data, course },
      });
      for (const module of course.modules) {
        routes.push({
          track,
          path: `courses/${course.slug}/${module.slug}`,
          route: { kind: "module", data, course, module },
        });
      }
    }
    for (const section of SECTION_KEYS) {
      const items = data.sections[section];
      if (!items.length) continue;
      routes.push({
        track,
        path: section,
        route: { kind: "section", data, section },
      });
      for (const item of items) {
        if (!item.url) continue;
        routes.push({
          track,
          path: `${section}/${item.slug}`,
          route: { kind: "entry", data, item },
        });
      }
    }
  }
  return routes;
}

/** Documents affichés (pour les fichiers joints et les aperçus de liens). */
export async function getPublishedDocuments(): Promise<KnowledgeDoc[]> {
  const docs: KnowledgeDoc[] = [];
  for (const data of await loadKnowledge()) {
    if (data.overview) docs.push(data.overview);
    for (const course of data.courses) {
      docs.push(course.entry, ...course.modules.map(m => m.entry));
    }
    for (const section of SECTION_KEYS) {
      docs.push(...data.sections[section].map(item => item.entry));
    }
  }
  return docs;
}
