import type { APIRoute } from "astro";
import { logoAdaptiveSvg } from "@/utils/logo";

// Pas de cache longue durée : l'URL est versionnée dans Layout.astro
// (?v=<empreinte de l'icône>), c'est elle qui force la mise à jour.
export const GET: APIRoute = async () => {
  return new Response(logoAdaptiveSvg(), {
    headers: { "Content-Type": "image/svg+xml" },
  });
};
