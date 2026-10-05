import type { APIRoute, GetStaticPaths } from "astro";
import { generateOgImageForArticle } from "@/utils/generateOgImages";
import {
  getKnowledgeRoutes,
  getTracks,
  loadKnowledge,
  sectionsFor,
} from "@/utils/knowledge";
import { KNOWLEDGE } from "@/knowledge.config";
import { UI } from "@/i18n/ui";

// Une seule image par page, partagée par /knowledge/… et /en/knowledge/… :
// libellés en anglais, comme les noms des tracks.
const SECTIONS = sectionsFor("en");

/**
 * Aperçus de liens (WhatsApp, LinkedIn…) des pages du Knowledge Hub :
 *   /knowledge/og.jpg, /knowledge/<track>/og.jpg, /knowledge/<track>/<…>/og.jpg
 * Générés uniquement pour les pages publiées.
 */
type Preview = {
  label: string;
  title: string;
  description?: string;
  cover?: unknown;
};

export const getStaticPaths = (async () => {
  const pages: { params: { page?: string }; props: Preview }[] = [];

  if (getTracks().length) {
    pages.push({
      params: { page: undefined },
      props: {
        label: KNOWLEDGE.title,
        title: KNOWLEDGE.title,
        description: UI.en["k.description"],
      },
    });
  }

  for (const data of await loadKnowledge("fr")) {
    pages.push({
      params: { page: data.track.slug },
      props: {
        label: KNOWLEDGE.title,
        title: data.track.title,
        description: data.description,
      },
    });
  }

  for (const { track, path, route } of await getKnowledgeRoutes("fr")) {
    const page = `${track}/${path}`;
    const trackTitle = route.data.track.title;
    switch (route.kind) {
      case "courses":
        pages.push({
          params: { page },
          props: { label: trackTitle, title: `Courses · ${trackTitle}` },
        });
        break;
      case "section":
        pages.push({
          params: { page },
          props: {
            label: trackTitle,
            title: `${SECTIONS[route.section].label} · ${trackTitle}`,
            description: SECTIONS[route.section].intro,
          },
        });
        break;
      case "course":
        pages.push({
          params: { page },
          props: {
            label: `Course · ${trackTitle}`,
            title: route.course.title,
            description: route.course.entry.data.description,
            cover: route.course.entry.data.cover,
          },
        });
        break;
      case "module":
        pages.push({
          params: { page },
          props: {
            label: route.module.number
              ? `Module ${route.module.number}`
              : "Module",
            title: route.module.title,
            description:
              route.module.entry.data.description ?? route.course.title,
          },
        });
        break;
      case "entry":
        pages.push({
          params: { page },
          props: {
            label: `${SECTIONS[route.item.section].label} · ${trackTitle}`,
            title: route.item.title,
            description: route.item.entry.data.description,
            cover: route.item.entry.data.cover,
          },
        });
        break;
    }
  }

  return pages;
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const buffer = await generateOgImageForArticle(props as Preview);
  return new Response(new Uint8Array(buffer), {
    headers: { "Content-Type": "image/jpeg" },
  });
};
