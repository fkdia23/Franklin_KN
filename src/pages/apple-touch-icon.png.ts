import type { APIRoute } from "astro";
import { Resvg } from "@resvg/resvg-js";
import { logoSvg } from "@/utils/logo";

/** Icône iOS (écran d'accueil), aussi reprise par certains aperçus de liens. */
export const GET: APIRoute = () => {
  const png = new Resvg(logoSvg(undefined, 0), {
    fitTo: { mode: "width", value: 180 },
  })
    .render()
    .asPng();
  return new Response(new Uint8Array(png), {
    headers: { "Content-Type": "image/png" },
  });
};
