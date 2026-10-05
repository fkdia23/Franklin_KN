import { Resvg } from "@resvg/resvg-js";
import sharp from "sharp";
import { type CollectionEntry } from "astro:content";
import postOgImage, { articleOgImage } from "./og-templates/post";
import siteOgImage from "./og-templates/site";

/**
 * SVG (Satori) -> JPEG. Les aperçus contiennent une photo : en JPEG ils pèsent
 * ~100 Ko, loin du plafond (~300 Ko) au-delà duquel WhatsApp les ignore souvent.
 */
async function svgToJpeg(svg: string) {
  const png = new Resvg(svg).render().asPng();
  return sharp(png).jpeg({ quality: 82, mozjpeg: true }).toBuffer();
}

export async function generateOgImageForPost(post: CollectionEntry<"blog">) {
  const svg = await postOgImage(post);
  return svgToJpeg(svg);
}

export async function generateOgImageForSite() {
  const svg = await siteOgImage();
  return svgToJpeg(svg);
}

/** Aperçu d'une page du Knowledge Hub (track, cours, module, entrée). */
export async function generateOgImageForArticle(options: {
  label: string;
  title: string;
  description?: string;
  lang?: string;
  cover?: unknown;
}) {
  const svg = await articleOgImage(options);
  return svgToJpeg(svg);
}
