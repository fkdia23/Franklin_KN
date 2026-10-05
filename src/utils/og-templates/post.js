import satori from "satori";
import { SITE } from "@/config";
import { categoriesFor } from "../categories";
import loadGoogleFonts from "../loadGoogleFont";
import {
  OG,
  background,
  brand,
  wordmark,
  coverDataUri,
  h,
  img,
  photoDataUri,
  truncate,
} from "./shared";

const HOST = new URL(SITE.website).hostname;
const COVER = { width: 440, height: 248 }; // 16:9

/** Aperçu d'un post du blog. */
export default async post => {
  const { title, description, category, lang, cover } = post.data;
  return articleOgImage({
    label: categoriesFor(lang)[category].label,
    lang,
    title,
    description,
    cover,
  });
};

/**
 * Aperçu générique d'une page « article » : pastille, langue, titre,
 * description, couverture facultative. Sert aux posts et au Knowledge Hub.
 * @param {{ label: string, title: string, description?: string, lang?: string, cover?: unknown }} options
 */
export async function articleOgImage({
  label: rawLabel,
  lang,
  title,
  description = "",
  cover,
}) {
  const label = rawLabel.toUpperCase();
  const coverSrc = await coverDataUri(cover, COVER.width * 2, COVER.height * 2);
  const photo = await photoDataUri(112);

  // Sans couverture, le texte occupe toute la largeur : on l'agrandit
  const titleText = truncate(title, 90);
  const descText = truncate(description, coverSrc ? 120 : 220);
  const titleSize = coverSrc
    ? titleText.length <= 40
      ? 52
      : titleText.length <= 70
        ? 44
        : 38
    : titleText.length <= 50
      ? 60
      : 50;

  const header = h(
    "div",
    {
      position: "absolute",
      top: 52,
      left: 64,
      right: 64,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    h(
      "div",
      { display: "flex", alignItems: "center" },
      h(
        "div",
        {
          padding: "6px 14px",
          borderRadius: 6,
          backgroundColor: OG.band,
          color: OG.bandFg,
          fontSize: 17,
          fontWeight: 700,
          letterSpacing: 2,
        },
        label
      ),
      ...(lang
        ? [
            h(
              "div",
              {
                marginLeft: 12,
                padding: "4px 12px",
                borderRadius: 6,
                border: `2px solid ${OG.border}`,
                color: OG.muted,
                fontSize: 17,
                fontWeight: 600,
              },
              lang.toUpperCase()
            ),
          ]
        : [])
    ),
    brand(40, 22)
  );

  const body = h(
    "div",
    {
      position: "absolute",
      top: 136,
      left: 64,
      right: 64,
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
    },
    h(
      "div",
      {
        display: "flex",
        flexDirection: "column",
        width: coverSrc ? 610 : 1072,
      },
      h(
        "div",
        {
          fontSize: titleSize,
          fontWeight: 700,
          lineHeight: 1.15,
          letterSpacing: -0.5,
          color: OG.fg,
        },
        titleText
      ),
      h(
        "div",
        { marginTop: 22, fontSize: 24, lineHeight: 1.4, color: OG.muted },
        descText
      )
    ),
    coverSrc
      ? img(coverSrc, COVER.width, COVER.height, {
          borderRadius: 12,
          border: `2px solid ${OG.border}`,
          objectFit: "cover",
        })
      : h("div", {})
  );

  const footer = h(
    "div",
    {
      position: "absolute",
      left: 64,
      right: 64,
      bottom: 48,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    h(
      "div",
      { display: "flex", alignItems: "center" },
      h(
        "div",
        {
          display: "flex",
          padding: 3,
          borderRadius: 999,
          backgroundColor: OG.band,
        },
        img(photo, 56, 56, { borderRadius: 999 })
      ),
      h(
        "div",
        { display: "flex", flexDirection: "column", marginLeft: 16 },
        wordmark({ fontSize: 22, fontWeight: 700, color: OG.fg }),
        h("div", { fontSize: 18, color: OG.muted }, SITE.role)
      )
    ),
    h("div", { fontSize: 20, color: OG.muted }, HOST)
  );

  const text = [
    label,
    lang ? lang.toUpperCase() : "",
    titleText,
    descText,
    SITE.title,
    SITE.role,
    HOST,
  ].join("");

  return satori(
    h(
      "div",
      {
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        ...background,
        fontFamily: "Inter",
        color: OG.fg,
      },
      header,
      body,
      footer
    ),
    {
      width: 1200,
      height: 630,
      embedFont: true,
      fonts: await loadGoogleFonts(text),
    }
  );
}
