import path from "node:path";
import sharp from "sharp";
import { SITE } from "@/config";
import { THEME } from "../theme";

/** Palette des aperçus du thème choisi (src/utils/theme.ts), figée pour Satori. */
const og = THEME.og;
export const OG = {
  bg: og.background,
  card: og.card,
  border: og.border,
  fg: og.foreground,
  muted: og.muted,
  accent: og.accent,
  band: og.band,
  bandFg: og.bandForeground,
};

/** Fond commun (charbon + halo ambre, ou blanc + filet bleu nuit selon le thème). */
export const background = {
  backgroundColor: og.background,
  ...(og.backgroundImage && { backgroundImage: og.backgroundImage }),
  ...(og.borderTop && { borderTop: og.borderTop }),
};

/**
 * Élément Satori : h("div", { ...style }, ...enfants).
 * Sans enfant, `children` reste indéfini : Satori exige `display: flex` dès que
 * `children` n'est pas une chaîne, même pour un tableau vide.
 */
export const h = (type, style, ...children) => ({
  type,
  props: {
    style,
    children: children.length > 1 ? children : children[0],
  },
});

export const img = (src, width, height, style = {}) => ({
  type: "img",
  props: { src, width, height, style },
});

/** « Franklin_KN » : tiret bas en couleur d'accent, comme sur le site. */
export const wordmark = (style = {}) => {
  // « Franklin KN » : le premier mot dans la couleur du texte, la suite en
  // couleur d'accent (comme le header du site)
  const match = SITE.title.match(/^(.+?)([ _])(.+)$/);
  if (!match) return h("div", { display: "flex", ...style }, SITE.title);
  const [, first, sep, rest] = match;
  // Satori ignore l'espace en début d'élément : l'écart devient une marge
  const gap = sep === " " ? Math.round((style.fontSize ?? 24) * 0.27) : 0;
  return h(
    "div",
    { display: "flex", ...style },
    first,
    h(
      "span",
      { color: OG.accent, marginLeft: gap },
      sep === "_" ? `_${rest}` : rest
    )
  );
};

/** Nom du site en deux couleurs, sans logo (comme le header du site). */
export const brand = (_logoSize, fontSize) =>
  wordmark({ fontSize, fontWeight: 400, letterSpacing: -0.5, color: OG.fg });

/* Portrait : carré tête-et-épaules dans public/profile.jpeg, en proportions
 * de l'image (centre x/y, côté relatif à la largeur) — à ajuster si la photo change. */
const PHOTO = path.join(process.cwd(), "public", "profile.jpeg");
const FOCUS = { x: 0.596, y: 0.52, size: 0.46 };
const photos = new Map();

/** Portrait recadré en data URI (Satori n'accepte que des images inline). */
export function photoDataUri(size) {
  if (!photos.has(size)) {
    const task = sharp(PHOTO)
      .metadata()
      .then(({ width = 0, height = 0 }) => {
        const side = Math.min(Math.round(width * FOCUS.size), width, height);
        const clamp = (v, max) => Math.min(Math.max(0, Math.round(v)), max);
        return sharp(PHOTO)
          .extract({
            left: clamp(width * FOCUS.x - side / 2, width - side),
            top: clamp(height * FOCUS.y - side / 2, height - side),
            width: side,
            height: side,
          })
          .resize(size, size)
          .jpeg({ quality: 88 })
          .toBuffer();
      })
      .then(buf => `data:image/jpeg;base64,${buf.toString("base64")}`);
    photos.set(size, task);
  }
  return photos.get(size);
}

/**
 * Couverture d'un post en data URI. Au build, Astro expose le chemin disque de
 * l'image via `fsPath` ; en dev, on le retrouve dans l'URL `/@fs/…`.
 */
export async function coverDataUri(cover, width, height) {
  let file = cover?.fsPath;
  if (!file && cover?.src?.startsWith("/@fs/")) {
    file = decodeURIComponent(cover.src.slice(4).split("?")[0]);
    if (/^\/[A-Za-z]:\//.test(file)) file = file.slice(1); // /C:/… -> C:/…
  }
  if (!file) return undefined;
  try {
    const buf = await sharp(file)
      .resize(width, height, { fit: "cover", position: "top" })
      .jpeg({ quality: 85 })
      .toBuffer();
    return `data:image/jpeg;base64,${buf.toString("base64")}`;
  } catch {
    return undefined; // l'aperçu reste valide sans la couverture
  }
}

/** Coupe un texte trop long au dernier mot entier, avec une ellipse. */
export function truncate(text, max) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.lastIndexOf(" ", max);
  return clean.slice(0, cut > 0 ? cut : max).replace(/[\s,;:.—-]+$/, "") + "…";
}
