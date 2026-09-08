import type { APIRoute } from "astro";
import { logoAdaptiveSvg } from "@/utils/logo";

export const GET: APIRoute = async () => {
  return new Response(logoAdaptiveSvg(), {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
