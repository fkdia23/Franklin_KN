import satori from "satori";
import { SITE } from "@/config";
import loadGoogleFonts from "../loadGoogleFont";
import { LOGO_GLYPHS } from "../logo";
import { OG, background, h, img, photoDataUri, wordmark } from "./shared";

const TAGLINE = "Pipelines de données · RAG · agents LLM · fine-tuning";
const SKILLS = ["Airflow", "Spark", "Azure", "Databricks", "Neo4j", "Docker"];
const HOST = new URL(SITE.website).hostname;

/** Icône « Franklin » inversée pour le bandeau du badge. */
const inverseMark = `data:image/svg+xml;base64,${Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><rect width="128" height="128" rx="16" fill="${OG.bandFg}"/><path fill="${OG.band}" d="${LOGO_GLYPHS}"/></svg>`
).toString("base64")}`;

/** Badge de conférence en 2D — reprend le badge 3D de la page À propos. */
async function badge() {
  const photo = await photoDataUri(320);
  return [
    // Sangle (décalée de la rotation du badge pour tomber sur l'attache)
    h("div", {
      position: "absolute",
      left: 196,
      top: 0,
      width: 54,
      height: 120,
      backgroundColor: OG.band,
      borderLeft: "3px solid rgba(0, 0, 0, 0.18)",
      borderRight: "3px solid rgba(0, 0, 0, 0.18)",
    }),
    // Attache métallique
    h("div", {
      position: "absolute",
      left: 201,
      top: 100,
      width: 44,
      height: 36,
      borderRadius: 9,
      backgroundImage: "linear-gradient(180deg, #e4e4e7, #8b8b93)",
    }),
    // Carte
    h(
      "div",
      {
        position: "absolute",
        left: 90,
        top: 124,
        width: 300,
        height: 446,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
        borderRadius: 22,
        backgroundColor: OG.card,
        border: `2px solid ${OG.border}`,
        boxShadow: "0 24px 50px rgba(0, 0, 0, 0.35)",
        transform: "rotate(-4deg)",
      },
      // Bandeau supérieur
      h(
        "div",
        {
          width: "100%",
          height: 76,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 22px",
          backgroundColor: OG.band,
        },
        img(inverseMark, 42, 42),
        h(
          "div",
          {
            fontSize: 15,
            fontWeight: 700,
            letterSpacing: 3,
            color: OG.bandFg,
          },
          "PORTFOLIO"
        )
      ),
      h(
        "div",
        {
          display: "flex",
          marginTop: 28,
          padding: 5,
          borderRadius: 999,
          backgroundColor: OG.band,
        },
        img(photo, 168, 168, {
          borderRadius: 999,
          border: `4px solid ${OG.card}`,
        })
      ),
      wordmark({
        marginTop: 24,
        fontSize: 36,
        fontWeight: 700,
        color: OG.fg,
      }),
      h(
        "div",
        { marginTop: 6, fontSize: 19, fontWeight: 600, color: OG.accent },
        "Data & AI Engineer"
      ),
      h("div", {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 22,
        backgroundColor: OG.band,
      })
    ),
  ];
}

function intro() {
  return h(
    "div",
    {
      position: "absolute",
      left: 480,
      top: 0,
      width: 670,
      height: 620,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    // Nom en graisse normale, comme le header (style sebastianraschka.com)
    wordmark({
      fontSize: 76,
      fontWeight: 400,
      letterSpacing: -2.5,
      lineHeight: 1.05,
      color: OG.fg,
    }),
    h(
      "div",
      { marginTop: 14, fontSize: 30, fontWeight: 600, color: OG.accent },
      "Data Engineer & AI Engineer"
    ),
    h(
      "div",
      { marginTop: 18, fontSize: 23, lineHeight: 1.4, color: OG.muted },
      TAGLINE
    ),
    h(
      "div",
      { display: "flex", flexWrap: "wrap", marginTop: 22 },
      ...SKILLS.map(skill =>
        h(
          "div",
          {
            marginTop: 10,
            marginRight: 10,
            padding: "6px 14px",
            borderRadius: 8,
            border: `2px solid ${OG.border}`,
            fontSize: 18,
            color: OG.fg,
          },
          skill
        )
      )
    ),
    h(
      "div",
      {
        display: "flex",
        alignItems: "center",
        marginTop: 34,
        fontSize: 22,
        fontWeight: 600,
        color: OG.fg,
      },
      h("div", { marginRight: 12, color: OG.accent }, "→"),
      HOST
    )
  );
}

export default async () => {
  const text = [
    SITE.title,
    "Data Engineer & AI Engineer",
    "Data & AI Engineer",
    "PORTFOLIO",
    TAGLINE,
    ...SKILLS,
    HOST,
    "→",
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
      ...(await badge()),
      intro()
    ),
    {
      width: 1200,
      height: 630,
      embedFont: true,
      fonts: await loadGoogleFonts(text),
    }
  );
};
