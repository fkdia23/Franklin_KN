import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import { remarkReadingTime } from "./src/plugins/remark-reading-time";
import { remarkAlerts } from "./src/plugins/remark-alerts";
import { remarkKnowledgeFiles } from "./src/plugins/remark-knowledge-files";
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from "@shikijs/transformers";
import { transformerFileName } from "./src/utils/transformers/fileName";
import { SITE } from "./src/config";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  redirects: {
    // L'onglet Certifications a rejoint la page À propos
    "/certifications": "/about/#certifications",
  },
  integrations: [
    sitemap({
      filter: page => SITE.showArchives || !page.endsWith("/archives"),
      // Pages françaises à la racine, anglaises sous /en/ (balises hreflang)
      i18n: { defaultLocale: "fr", locales: { fr: "fr-FR", en: "en-US" } },
    }),
    react(),
  ],
  markdown: {
    remarkPlugins: [remarkReadingTime, remarkAlerts, remarkKnowledgeFiles],
    shikiConfig: {
      // For more themes, visit https://shiki.style/themes
      themes: { light: "min-light", dark: "night-owl" },
      defaultColor: false,
      wrap: false,
      transformers: [
        transformerFileName({ style: "v2", hideDot: false }),
        transformerNotationHighlight(),
        transformerNotationWordHighlight(),
        transformerNotationDiff({ matchAlgorithm: "v3" }),
      ],
    },
  },
  vite: {
    // eslint-disable-next-line
    // @ts-ignore
    // This will be fixed in Astro 6 with Vite 7 support
    // See: https://github.com/withastro/astro/issues/14030
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
  image: {
    responsiveStyles: true,
    layout: "constrained",
  },
  env: {
    schema: {
      // Thème de couleurs : "ambre" (charbon + ambre) ou "classique" (blanc + bleu nuit).
      // À définir dans .env (local) ou dans le workflow de déploiement — voir src/utils/theme.ts.
      PUBLIC_THEME: envField.enum({
        context: "client",
        access: "public",
        values: ["ambre", "classique"],
        default: "ambre",
      }),
      PUBLIC_GOOGLE_SITE_VERIFICATION: envField.string({
        access: "public",
        context: "client",
        optional: true,
      }),
    },
  },
  experimental: {
    preserveScriptOrder: true,
  },
});
