import type { CollectionEntry } from "astro:content";
import postFilter from "./postFilter";
import getSortedPosts from "./getSortedPosts";
import { getPath } from "./getPath";
import { DEFAULT_LANG, type Lang } from "@/i18n/utils";

type Post = CollectionEntry<"blog">;

/**
 * Posts et langues.
 *
 * Chaque post vit sous l'URL de sa langue : /posts/<slug>/ (français) ou
 * /en/posts/<slug>/ (anglais). Une traduction déclare
 * `translationOf: <slug de l'original>` et partage son slug :
 *   /posts/kaggle-aimo-numinamath/  ↔  /en/posts/kaggle-aimo-numinamath/
 * Les listes affichent une seule version de chaque post : celle de la langue
 * de la page si elle existe, sinon l'original.
 */
export const isTranslation = (post: Post) => Boolean(post.data.translationOf);

/** Identifiant commun à un post et à ses traductions. */
export const postGroup = (post: Post) => post.data.translationOf ?? post.id;

/** Version publiée du même post dans l'autre langue, s'il y en a une. */
export function getTranslation(post: Post, posts: Post[]) {
  const { translationOf } = post.data;
  return posts
    .filter(postFilter)
    .find(p =>
      translationOf ? p.id === translationOf : p.data.translationOf === post.id
    );
}

/**
 * Chemin d'un post. `includeBase: false` donne le paramètre de route
 * (sans « /posts » ni préfixe de langue).
 */
export function getPostPath(post: Post, includeBase = true) {
  const path = getPath(postGroup(post), post.filePath, includeBase);
  return includeBase && post.data.lang !== DEFAULT_LANG
    ? `/${post.data.lang}${path}`
    : path;
}

/** Posts publiés et triés, une version par post, dans la langue voulue. */
export function getLocalizedPosts(posts: Post[], lang: Lang) {
  const sorted = getSortedPosts(posts);
  const groups = new Map<string, Post[]>();
  for (const post of sorted) {
    const key = postGroup(post);
    groups.set(key, [...(groups.get(key) ?? []), post]);
  }
  const chosen = new Set(
    [...groups.values()].map(
      versions =>
        versions.find(p => p.data.lang === lang) ??
        versions.find(p => !isTranslation(p)) ??
        versions[0]
    )
  );
  // Garde l'ordre chronologique de la liste triée
  return sorted.filter(post => chosen.has(post));
}
