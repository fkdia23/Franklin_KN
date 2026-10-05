import path from "node:path";
import { visit } from "unist-util-visit";
import type { Definition, Html, Link, Root } from "mdast";

/**
 * Fichiers joints du Knowledge Hub (PDF, notebooks, vidéos, CSV…).
 *
 * Dans une note de src/data/knowledge/, un lien relatif comme
 *   [Télécharger le notebook](./assets/files/example.ipynb)
 *   <video src="./assets/videos/demo.mp4" controls></video>
 * est réécrit vers /knowledge-files/<chemin>, servi par
 * src/pages/knowledge-files/[...file].ts — qui ne publie que les fichiers
 * cités par des notes publiques.
 *
 * Les images en syntaxe Markdown (![alt](./assets/images/x.png)) ne sont pas
 * touchées : Astro les optimise lui-même.
 */

export const KNOWLEDGE_DIR = "src/data/knowledge";
export const KNOWLEDGE_FILES_BASE = "/knowledge-files";

const RELATIVE = /^\.{1,2}\//;
const IMAGE = /\.(png|jpe?g|gif|webp|avif|svg)$/i;
const MARKDOWN = /\.md$/i;

const splitSuffix = (url: string) => {
  const at = url.search(/[?#]/);
  return at === -1 ? [url, ""] : [url.slice(0, at), url.slice(at)];
};

/**
 * Chemin d'un fichier joint relatif à src/data/knowledge, ou null s'il sort
 * de ce dossier ou désigne une note Markdown.
 */
export function resolveKnowledgeFile(docDir: string, url: string) {
  const [file] = splitSuffix(url);
  if (!RELATIVE.test(file) || MARKDOWN.test(file)) return null;
  const resolved = path.posix.normalize(
    path.posix.join(docDir, decodeURI(file))
  );
  return resolved.startsWith("../") || resolved.startsWith("/")
    ? null
    : resolved;
}

/** Dossier d'une note, relatif à src/data/knowledge (null hors du hub). */
export function knowledgeDocDir(filePath: string) {
  const normalized = filePath.replace(/\\/g, "/");
  const at = normalized.indexOf(`${KNOWLEDGE_DIR}/`);
  if (at === -1) return null;
  return path.posix.dirname(normalized.slice(at + KNOWLEDGE_DIR.length + 1));
}

/** Liens relatifs d'une note qui pointent vers des fichiers joints. */
export function findKnowledgeFiles(body: string) {
  const links = /(?<!!)\[[^\]]*\]\((\.{1,2}\/[^)\s]+)/g;
  const attributes = /\b(?:src|href|poster)=["'](\.{1,2}\/[^"']+)["']/g;
  return [
    ...[...body.matchAll(links)].map(m => m[1]),
    ...[...body.matchAll(attributes)].map(m => m[1]),
  ];
}

export function remarkKnowledgeFiles() {
  return function (tree: Root, file: { path?: string; history?: string[] }) {
    const docDir = knowledgeDocDir(file.path ?? file.history?.[0] ?? "");
    if (docDir === null) return;

    const rewrite = (url: string) => {
      const target = resolveKnowledgeFile(docDir, url);
      if (!target) return url;
      const [, suffix] = splitSuffix(url);
      return `${KNOWLEDGE_FILES_BASE}/${encodeURI(target)}${suffix}`;
    };

    visit(tree, "link", (node: Link) => {
      node.url = rewrite(node.url);
    });
    // Une définition peut servir à une image : on ne réécrit que les autres fichiers
    visit(tree, "definition", (node: Definition) => {
      if (!IMAGE.test(splitSuffix(node.url)[0])) node.url = rewrite(node.url);
    });
    // HTML brut (<video>, <img>, <a>, <iframe>…) : Astro ne le traite pas
    visit(tree, "html", (node: Html) => {
      node.value = node.value.replace(
        /\b(src|href|poster)=(["'])(\.{1,2}\/[^"']+)\2/g,
        (_, attr, quote, url) => `${attr}=${quote}${rewrite(url)}${quote}`
      );
    });
  };
}
