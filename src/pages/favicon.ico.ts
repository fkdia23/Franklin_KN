import type { APIRoute } from "astro";
import { Resvg } from "@resvg/resvg-js";
import { logoSvg } from "@/utils/logo";

/**
 * favicon.ico (16, 32 et 48 px) : demandé d'office par les navigateurs et les
 * outils qui ne lisent pas l'icône SVG. Format ICO contenant des images PNG.
 */
const SIZES = [16, 32, 48];

export const GET: APIRoute = () => {
  const images = SIZES.map(size =>
    new Resvg(logoSvg(), { fitTo: { mode: "width", value: size } })
      .render()
      .asPng()
  );

  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // réservé
  header.writeUInt16LE(1, 2); // type : icône
  header.writeUInt16LE(images.length, 4);

  let offset = 6 + 16 * images.length;
  const entries = images.map((png, i) => {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(SIZES[i] % 256, 0); // largeur (0 = 256)
    entry.writeUInt8(SIZES[i] % 256, 1); // hauteur
    entry.writeUInt8(0, 2); // palette
    entry.writeUInt8(0, 3); // réservé
    entry.writeUInt16LE(1, 4); // plans
    entry.writeUInt16LE(32, 6); // bits par pixel
    entry.writeUInt32LE(png.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += png.length;
    return entry;
  });

  const ico = Buffer.concat([header, ...entries, ...images]);
  return new Response(new Uint8Array(ico), {
    headers: { "Content-Type": "image/x-icon" },
  });
};
