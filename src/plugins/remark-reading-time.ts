import type { Root, RootContent } from "mdast";

interface FrontmatterFile {
  data: {
    astro?: {
      frontmatter?: Record<string, unknown>;
    };
  };
}

const WORDS_PER_MINUTE = 200;

/** Concatène le texte de tous les nœuds (texte, code inline, blocs de code). */
function collectText(nodes: RootContent[]): string {
  let out = "";
  for (const node of nodes) {
    if ("value" in node && typeof node.value === "string") {
      out += node.value + " ";
    }
    if ("children" in node && Array.isArray(node.children)) {
      out += collectText(node.children as RootContent[]);
    }
  }
  return out;
}

/**
 * Injecte `readingTime` (minutes) et `words` dans le frontmatter,
 * accessibles via `remarkPluginFrontmatter` après `render()`.
 */
export function remarkReadingTime() {
  return function (tree: Root, file: FrontmatterFile) {
    const text = collectText(tree.children);
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const readingTime = Math.max(1, Math.round(words / WORDS_PER_MINUTE));

    const frontmatter = file.data.astro?.frontmatter;
    if (frontmatter) {
      frontmatter.readingTime = readingTime;
      frontmatter.words = words;
    }
  };
}
