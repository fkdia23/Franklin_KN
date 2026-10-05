import type { PaginateFunction } from "astro";
import { getCollection } from "astro:content";
import { SITE } from "@/config";
import type { Lang } from "@/i18n/utils";
import { CATEGORY_KEYS } from "./categories";
import getPostsByTag from "./getPostsByTag";
import getUniqueTags from "./getUniqueTags";
import { getLocalizedPosts, getPostPath } from "./translations";

/**
 * getStaticPaths partagés par les routes françaises (src/pages/…) et
 * anglaises (src/pages/en/…) : seule la langue change.
 */

const publishedPosts = () =>
  getCollection("blog", ({ data }) => import.meta.env.DEV || !data.draft);

/** Liste des posts (/posts/, /en/posts/), paginée, avec les comptes par catégorie. */
export async function postListPaths(paginate: PaginateFunction, lang: Lang) {
  const listed = getLocalizedPosts(await publishedPosts(), lang);

  // Comptes sur toute la liste, pas seulement sur la page courante
  const counts = Object.fromEntries(
    CATEGORY_KEYS.map(key => [
      key,
      listed.filter(post => post.data.category === key).length,
    ])
  ) as Record<(typeof CATEGORY_KEYS)[number], number>;

  return paginate(listed, { pageSize: SITE.postPerPage, props: { counts } });
}

/** Pages des posts écrits dans `lang`. */
export async function postPagePaths(lang: Lang) {
  const posts = await publishedPosts();
  return posts
    .filter(post => post.data.lang === lang)
    .map(post => ({
      params: { slug: getPostPath(post, false) },
      props: { post },
    }));
}

/** Pages des tags (/tags/<tag>/, /en/tags/<tag>/), paginées. */
export async function tagPaths(paginate: PaginateFunction, lang: Lang) {
  const listed = getLocalizedPosts(await getCollection("blog"), lang);
  return getUniqueTags(listed).flatMap(({ tag, tagName }) =>
    paginate(getPostsByTag(listed, tag), {
      params: { tag },
      props: { tagName },
      pageSize: SITE.postPerPage,
    })
  );
}
