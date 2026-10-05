import { DEFAULT_LANG, LANGS, UI, type Lang, type UiKey } from "./ui";

export { DEFAULT_LANG, LANGS, type Lang };

/** Langue d'une page d'après son URL : /en/… = anglais, sinon français. */
export function getLangFromUrl(url: URL): Lang {
  return /^\/en(\/|$)/.test(url.pathname) ? "en" : DEFAULT_LANG;
}

/** Fonction de traduction de l'interface : t("nav.posts"). */
export function useTranslations(lang: Lang) {
  return (key: UiKey) => UI[lang][key] ?? UI[DEFAULT_LANG][key];
}

/** Chemin sans préfixe de langue : /en/posts/ → /posts/ */
export function stripLang(path: string) {
  return path.replace(/^\/en(?=\/|$)/, "") || "/";
}

/** Chemin dans une langue : localizePath("/posts/", "en") → /en/posts/ */
export function localizePath(path: string, lang: Lang) {
  const base = stripLang(path);
  return lang === DEFAULT_LANG ? base : `/${lang}${base}`;
}

export const otherLang = (lang: Lang): Lang => (lang === "fr" ? "en" : "fr");

/** Format court des dates : « 4 oct. 2026 » / « Oct 4, 2026 ». */
export function formatDate(date: Date, lang: Lang) {
  return date.toLocaleDateString(lang === "fr" ? "fr-FR" : "en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
