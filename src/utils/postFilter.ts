import type { CollectionEntry } from "astro:content";
import { SITE } from "@/config";

const postFilter = ({ data }: CollectionEntry<"blog">) => {
  // En local (dev), tout est visible — y compris les brouillons (draft: true)
  // et les posts planifiés, pour pouvoir travailler dessus.
  if (import.meta.env.DEV) return true;

  // En production, on masque les brouillons et les posts pas encore publiés.
  const isPublishTimePassed =
    Date.now() >
    new Date(data.pubDatetime).getTime() - SITE.scheduledPostMargin;
  return !data.draft && isPublishTimePassed;
};

export default postFilter;
