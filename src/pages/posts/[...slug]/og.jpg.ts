import type { APIRoute } from "astro";
import type { CollectionEntry } from "astro:content";
import { generateOgImageForPost } from "@/utils/generateOgImages";
import { postPagePaths } from "@/utils/postRoutes";
import { SITE } from "@/config";

/** Aperçu de lien de chaque post écrit en français. */
export async function getStaticPaths() {
  if (!SITE.dynamicOgImage) return [];
  const paths = await postPagePaths("fr");
  return paths.filter(({ props }) => !props.post.data.ogImage);
}

export const GET: APIRoute = async ({ props }) => {
  const { post } = props as { post: CollectionEntry<"blog"> };
  const buffer = await generateOgImageForPost(post);
  return new Response(new Uint8Array(buffer), {
    headers: { "Content-Type": "image/jpeg" },
  });
};
