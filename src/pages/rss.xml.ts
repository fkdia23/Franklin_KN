import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { getLocalizedPosts, getPostPath } from "@/utils/translations";
import { SITE } from "@/config";

export async function GET() {
  const posts = await getCollection("blog");
  // Une version par post (le français quand il existe), chacune à sa bonne URL
  const sortedPosts = getLocalizedPosts(posts, "fr");
  return rss({
    title: SITE.title,
    description: SITE.desc,
    site: SITE.website,
    items: sortedPosts.map(post => ({
      link: getPostPath(post),
      title: post.data.title,
      description: post.data.description,
      pubDate: new Date(post.data.modDatetime ?? post.data.pubDatetime),
    })),
  });
}
