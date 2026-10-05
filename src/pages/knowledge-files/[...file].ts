import type { APIRoute, GetStaticPaths } from "astro";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { getPublishedDocuments } from "@/utils/knowledge";
import {
  KNOWLEDGE_DIR,
  findKnowledgeFiles,
  knowledgeDocDir,
  resolveKnowledgeFile,
} from "@/plugins/remark-knowledge-files";

/**
 * Fichiers joints du Knowledge Hub : seuls les fichiers cités par une note
 * publiée sont générés. Un fichier d'une note privée, d'un module planifié ou
 * d'un track désactivé n'est jamais copié dans le site.
 */

const ROOT = path.join(process.cwd(), KNOWLEDGE_DIR);

const isFile = (file: string) =>
  stat(file).then(
    s => s.isFile(),
    () => false
  );

export const getStaticPaths = (async () => {
  const files = new Set<string>();
  for (const doc of await getPublishedDocuments()) {
    const docDir = doc.filePath && knowledgeDocDir(doc.filePath);
    if (docDir === null || docDir === undefined || !doc.body) continue;
    for (const url of findKnowledgeFiles(doc.body)) {
      const target = resolveKnowledgeFile(docDir, url);
      if (target && (await isFile(path.join(ROOT, target)))) files.add(target);
    }
  }
  return [...files].map(file => ({ params: { file } }));
}) satisfies GetStaticPaths;

const TYPES: Record<string, string> = {
  pdf: "application/pdf",
  ipynb: "application/json",
  json: "application/json",
  csv: "text/csv; charset=utf-8",
  txt: "text/plain; charset=utf-8",
  md: "text/plain; charset=utf-8",
  py: "text/plain; charset=utf-8",
  mp4: "video/mp4",
  webm: "video/webm",
  mov: "video/quicktime",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  gif: "image/gif",
  webp: "image/webp",
  svg: "image/svg+xml",
  zip: "application/zip",
};

export const GET: APIRoute = async ({ params }) => {
  const file = params.file ?? "";
  const body = await readFile(path.join(ROOT, file));
  const ext = file.split(".").at(-1)?.toLowerCase() ?? "";
  return new Response(new Uint8Array(body), {
    headers: { "Content-Type": TYPES[ext] ?? "application/octet-stream" },
  });
};
