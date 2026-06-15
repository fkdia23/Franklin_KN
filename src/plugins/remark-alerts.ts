import { visit } from "unist-util-visit";
import type { Root, Paragraph } from "mdast";
import type { Properties } from "hast";

/**
 * Transforme les blockquotes GitHub-style en « callouts » :
 *
 *   > [!NOTE]
 *   > Contenu de la note.
 *
 * Types supportés : NOTE, TIP, IMPORTANT, WARNING, CAUTION.
 * Le rendu produit <div class="callout callout-note" data-callout="note">…</div>.
 */

const ALERT_RE = /^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*/i;

const LABELS: Record<string, string> = {
  note: "Note",
  tip: "Astuce",
  important: "Important",
  warning: "Attention",
  caution: "Prudence",
};

interface HastData {
  hName?: string;
  hProperties?: Properties;
}

export function remarkAlerts() {
  return function (tree: Root) {
    visit(tree, "blockquote", node => {
      const first = node.children[0];
      if (!first || first.type !== "paragraph") return;

      const lead = first.children[0];
      if (!lead || lead.type !== "text") return;

      const match = lead.value.match(ALERT_RE);
      if (!match) return;

      const type = match[1].toLowerCase();

      // Retire le marqueur « [!TYPE] » du texte de tête
      lead.value = lead.value.slice(match[0].length);

      // Nettoie un saut de ligne / texte vide laissé derrière
      if (lead.value === "") {
        first.children.shift();
        if (first.children[0]?.type === "break") {
          first.children.shift();
        }
      }
      // Retire le paragraphe s'il est devenu vide
      if (first.children.length === 0) {
        node.children.shift();
      }

      // Titre du callout
      const titleNode: Paragraph = {
        type: "paragraph",
        children: [{ type: "text", value: LABELS[type] }],
        data: {
          hName: "p",
          hProperties: { className: ["callout-title"] },
        } as HastData,
      };
      node.children.unshift(titleNode);

      const data = (node.data ?? (node.data = {})) as HastData;
      data.hName = "div";
      data.hProperties = {
        className: ["callout", `callout-${type}`],
        "data-callout": type,
      };
    });
  };
}
