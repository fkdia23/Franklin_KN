/**
 * Monogramme "f_kn" — source unique du logo.
 *
 * Consommé par :
 *  - src/pages/favicon.svg.ts  (favicon, couleurs via prefers-color-scheme)
 *  - src/components/Logo.astro (header + page À propos, couleurs via variables CSS)
 *  - src/utils/og-templates/*  (images Open Graph, couleurs figées pour Satori)
 *
 * Les lettres sont tracées au trait (centre-ligne + stroke), pas en contour :
 * une seule épaisseur à ajuster via LOGO_STROKE.
 */

export const LOGO_VIEWBOX = "0 0 128 128";
export const LOGO_RADIUS = 26;
export const LOGO_STROKE = 9;

export const LOGO_PATHS = [
  "M29 37C22.5 37 19 42 19 49V91", // f — crosse + fût
  "M9 57H30", // f — barre
  "M36 88H56", // underscore
  "M66 37V91", // k — fût
  "M66 72L84 54", // k — bras haut
  "M73 65L85 91", // k — bras bas
  "M97 91V64Q97 55 106 55Q115 55 115 64V91", // n
] as const;

/** Reprend --accent / --background de src/styles/global.css. */
export const LOGO_COLORS = {
  light: { badge: "#8a5e12", mark: "#faf9f6" },
  dark: { badge: "#d4a843", mark: "#18181b" },
} as const;

const paths = LOGO_PATHS.map(d => `<path d="${d}"/>`).join("");

const group = (mark: string) =>
  `<g fill="none" stroke="${mark}" stroke-width="${LOGO_STROKE}" stroke-linejoin="round">${paths}</g>`;

/** SVG autonome à couleurs figées — pour les contextes sans CSS (Satori / resvg). */
export function logoSvg(theme: keyof typeof LOGO_COLORS = "light") {
  const { badge, mark } = LOGO_COLORS[theme];
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${LOGO_VIEWBOX}"><rect width="128" height="128" rx="${LOGO_RADIUS}" fill="${badge}"/>${group(mark)}</svg>`;
}

/** SVG autonome qui suit le thème du système — pour le favicon. */
export function logoAdaptiveSvg() {
  const { light, dark } = LOGO_COLORS;
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${LOGO_VIEWBOX}">`,
    `<rect class="badge" width="128" height="128" rx="${LOGO_RADIUS}"/>`,
    `<g class="mark" fill="none" stroke-width="${LOGO_STROKE}" stroke-linejoin="round">${paths}</g>`,
    `<style>`,
    `.badge{fill:${light.badge}}.mark{stroke:${light.mark}}`,
    `@media(prefers-color-scheme:dark){.badge{fill:${dark.badge}}.mark{stroke:${dark.mark}}}`,
    `</style>`,
    `</svg>`,
  ].join("");
}

/** Data URI base64 — Satori n'accepte le SVG que sous cette forme. */
export function logoDataUri(theme: keyof typeof LOGO_COLORS = "light") {
  const base64 = Buffer.from(logoSvg(theme), "utf-8").toString("base64");
  return `data:image/svg+xml;base64,${base64}`;
}
