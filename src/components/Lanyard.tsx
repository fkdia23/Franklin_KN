// @ts-nocheck
import * as THREE from "three";
import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, extend, useThree, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, Lightformer } from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import QRCode from "qrcode";
import { LOGO_GLYPHS } from "@/utils/logo";
import { THEME } from "@/utils/theme";
import { SITE } from "@/config";

extend({ MeshLineGeometry, MeshLineMaterial });

const GLB_URL = "/badge/tag.glb";
useGLTF.preload(GLB_URL);

// Couleurs du thème choisi (PUBLIC_THEME, src/utils/theme.ts)
const C = THEME.badge;

const FONT = '"Inter", system-ui, sans-serif';
const font = (weight: number, size: number) => `${weight} ${size}px ${FONT}`;

/** Inter est servie par le site : on redessine les textures une fois chargée. */
const fontsReady = () =>
  Promise.all(
    [500, 600, 700, 800].map(w =>
      document.fonts?.load(font(w, 32)).catch(() => undefined)
    )
  );

function newCanvas(width: number, height: number) {
  const c = document.createElement("canvas");
  c.width = width;
  c.height = height;
  return [c, c.getContext("2d")!] as const;
}

function toTexture(c: HTMLCanvasElement) {
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 16;
  return tex;
}

/** « Franklin_KN » centré, tiret bas en couleur d'accent. */
function drawWordmark(
  ctx: CanvasRenderingContext2D,
  cx: number,
  y: number,
  size: number
) {
  // « Franklin KN » : premier mot en encre, la suite en couleur d'accent
  const match = SITE.title.match(/^(.+?)([ _])(.+)$/);
  const parts: [string, string][] = match
    ? [
        [match[1], C.ink],
        [`${match[2]}${match[3]}`, C.accent],
      ]
    : [[SITE.title, C.ink]];
  ctx.font = font(800, size);
  ctx.textAlign = "left";
  const width = parts.reduce((w, [t]) => w + ctx.measureText(t).width, 0);
  let x = cx - width / 2;
  for (const [text, color] of parts) {
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
    x += ctx.measureText(text).width;
  }
}

/** Textes imprimés sur le badge, selon la langue de la page. */
const LABELS = {
  fr: { scan: "SCANNEZ POUR ENREGISTRER LE CONTACT" },
  en: { scan: "SCAN TO SAVE THE CONTACT" },
};

/** Face avant : badge de conférence (photo, nom, rôle). */
function makeCardTexture(photoUrl: string) {
  const [c, ctx] = newCanvas(512, 720);
  const tex = toTexture(c);
  const PHOTO = { cx: 256, cy: 304, r: 142 };
  let photo: HTMLImageElement | null = null;

  const draw = () => {
    ctx.fillStyle = C.card;
    ctx.fillRect(0, 0, 512, 720);

    // Bandeau supérieur : icône « Franklin » inversée + adresse du site
    ctx.fillStyle = C.band;
    ctx.fillRect(0, 0, 512, 112);
    ctx.beginPath();
    ctx.roundRect(36, 28, 56, 56, 9);
    ctx.fillStyle = C.bandInk;
    ctx.fill();
    ctx.save();
    ctx.translate(36, 28);
    ctx.scale(56 / 128, 56 / 128);
    ctx.fillStyle = C.band;
    ctx.fill(new Path2D(LOGO_GLYPHS));
    ctx.restore();
    ctx.fillStyle = C.bandInk;
    ctx.textAlign = "right";
    ctx.textBaseline = "alphabetic";
    ctx.font = font(700, 17);
    ctx.letterSpacing = "3px";
    ctx.fillText("PORTFOLIO", 476, 52);
    ctx.letterSpacing = "0px";
    ctx.font = font(600, 19);
    ctx.globalAlpha = 0.85;
    ctx.fillText("fkdia23.github.io", 476, 80);
    ctx.globalAlpha = 1;

    // Photo ronde avec liseré
    ctx.save();
    ctx.beginPath();
    ctx.arc(PHOTO.cx, PHOTO.cy, PHOTO.r, 0, Math.PI * 2);
    ctx.clip();
    ctx.fillStyle = C.surface;
    ctx.fillRect(0, 0, 512, 720);
    if (photo) {
      const side = PHOTO.r * 2;
      const scale = Math.max(side / photo.width, side / photo.height);
      const dw = photo.width * scale;
      const dh = photo.height * scale;
      ctx.drawImage(photo, PHOTO.cx - dw / 2, PHOTO.cy - dh / 2, dw, dh);
    }
    ctx.restore();
    ctx.beginPath();
    ctx.arc(PHOTO.cx, PHOTO.cy, PHOTO.r + 4, 0, Math.PI * 2);
    ctx.lineWidth = 7;
    ctx.strokeStyle = C.band;
    ctx.stroke();

    // Identité
    drawWordmark(ctx, 256, 540, 54);
    ctx.textAlign = "center";
    ctx.fillStyle = C.accent;
    ctx.font = font(700, 26);
    ctx.fillText("Data & AI Engineer", 256, 592);

    // Filet + bande basse
    ctx.fillStyle = C.line;
    ctx.fillRect(56, 636, 400, 2);
    ctx.fillStyle = C.band;
    ctx.fillRect(0, 688, 512, 32);

    tex.needsUpdate = true;
  };

  draw();
  fontsReady().then(draw);
  const img = new Image();
  img.onload = () => {
    photo = img;
    draw();
  };
  img.src = photoUrl;

  return tex;
}

/** Dos du badge : coordonnées + QR code vCard. */
function makeBackTexture(lang: "fr" | "en") {
  const [c, ctx] = newCanvas(512, 720);
  const tex = toTexture(c);
  let qr: HTMLImageElement | null = null;

  const entries: [string, string][] = [
    ["EMAIL", "fknguedia@gmail.com"],
    ["GITHUB", "@fkdia23"],
    ["LINKEDIN", "in/franklin-kana-nguedia"],
    ["HUGGING FACE", "@fknguedia"],
  ];

  const draw = () => {
    ctx.fillStyle = C.card;
    ctx.fillRect(0, 0, 512, 720);

    ctx.fillStyle = C.band;
    ctx.fillRect(0, 0, 512, 84);
    ctx.fillStyle = C.bandInk;
    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";
    ctx.font = font(800, 24);
    ctx.letterSpacing = "4px";
    ctx.fillText("CONTACT", 44, 54);
    ctx.letterSpacing = "0px";

    let y = 132;
    for (const [label, value] of entries) {
      ctx.fillStyle = C.accent;
      ctx.font = font(700, 15);
      ctx.letterSpacing = "1.5px";
      ctx.fillText(label, 44, y);
      ctx.letterSpacing = "0px";
      ctx.fillStyle = C.ink;
      ctx.font = font(600, 23);
      ctx.fillText(value, 44, y + 30);
      ctx.fillStyle = C.line;
      ctx.fillRect(44, y + 48, 424, 2);
      y += 72;
    }

    // QR code sur un cartouche clair (zone de silence pour la lecture)
    const size = 168;
    const qx = (512 - size) / 2;
    const qy = 432;
    ctx.fillStyle = C.qrLight;
    ctx.fillRect(qx - 12, qy - 12, size + 24, size + 24);
    if (qr) ctx.drawImage(qr, qx, qy, size, size);
    ctx.fillStyle = C.muted;
    ctx.textAlign = "center";
    ctx.font = font(700, 14);
    ctx.letterSpacing = "1.5px";
    ctx.fillText(LABELS[lang].scan, 256, 664);
    ctx.letterSpacing = "0px";

    ctx.fillStyle = C.band;
    ctx.fillRect(0, 688, 512, 32);
    tex.needsUpdate = true;
  };

  draw();
  fontsReady().then(draw);

  // QR code (vCard) — ajoute le contact en un scan
  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "N:KANA NGUEDIA;Franklin",
    "FN:Franklin KANA NGUEDIA",
    "TITLE:Data & AI Engineer",
    "EMAIL:fknguedia@gmail.com",
    "URL:https://fkdia23.github.io",
    "URL:https://github.com/fkdia23",
    "URL:https://www.linkedin.com/in/franklin-kana-nguedia",
    "URL:https://huggingface.co/fknguedia",
    "END:VCARD",
  ].join("\n");

  try {
    QRCode.toDataURL(
      vcard,
      { width: 336, margin: 1, color: { dark: C.qrDark, light: C.qrLight } },
      (err: unknown, url: string) => {
        if (err || !url) return;
        const img = new Image();
        img.onload = () => {
          qr = img;
          draw();
        };
        img.src = url;
      }
    );
  } catch {
    /* le QR est optionnel : on n'empêche jamais le badge de s'afficher */
  }

  return tex;
}

/** Sangle aux couleurs du thème, avec le nom répété. */
function makeBandTexture() {
  const [c, ctx] = newCanvas(1024, 64);
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;

  const draw = () => {
    ctx.fillStyle = C.band;
    ctx.fillRect(0, 0, 1024, 64);
    ctx.fillStyle = C.bandInk;
    ctx.font = font(800, 22);
    ctx.letterSpacing = "3px";
    ctx.textBaseline = "middle";
    const label = `${SITE.title.toUpperCase()}   •   DATA & AI ENGINEER   •   `;
    const step = ctx.measureText(label).width;
    for (let x = 0; x < 1024 + step; x += step) ctx.fillText(label, x, 34);
    tex.needsUpdate = true;
  };

  draw();
  fontsReady().then(draw);
  return tex;
}

function Band({ photo, lang, maxSpeed = 50, minSpeed = 10 }) {
  const band = useRef(),
    fixed = useRef(),
    j1 = useRef(),
    j2 = useRef(),
    j3 = useRef(),
    card = useRef();
  const vec = new THREE.Vector3(),
    ang = new THREE.Vector3(),
    rot = new THREE.Vector3(),
    dir = new THREE.Vector3();
  const segmentProps = {
    type: "dynamic",
    canSleep: true,
    colliders: false,
    angularDamping: 2,
    linearDamping: 2,
  };
  const { nodes, materials } = useGLTF(GLB_URL);
  const { width, height } = useThree(state => state.size);
  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ])
  );
  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);

  const cardTexture = useMemo(() => makeCardTexture(photo), [photo]);
  const backTexture = useMemo(() => makeBackTexture(lang), [lang]);
  const bandTexture = useMemo(() => makeBandTexture(), []);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.885, 0],
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? "grabbing" : "grab";
      return () => void (document.body.style.cursor = "auto");
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }
    if (fixed.current) {
      [j1, j2].forEach(ref => {
        if (!ref.current.lerped)
          ref.current.lerped = new THREE.Vector3().copy(
            ref.current.translation()
          );
        const clampedDistance = Math.max(
          0.1,
          Math.min(1, ref.current.lerped.distanceTo(ref.current.translation()))
        );
        // Facteur borné à 1 : après un onglet en arrière-plan, `delta` peut
        // valoir plusieurs secondes et l'interpolation partirait hors cadre.
        ref.current.lerped.lerp(
          ref.current.translation(),
          Math.min(
            1,
            delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
          )
        );
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(32));
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  curve.curveType = "chordal";

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        {/* Départ légèrement décalé : petit balancement qui reste dans le cadre */}
        <RigidBody position={[0.2, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[0.4, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[0.6, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[0.8, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? "kinematicPosition" : "dynamic"}
        >
          <CuboidCollider args={[1.04, 1.4625, 0.01]} />
          <group
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={e => (
              e.target.releasePointerCapture(e.pointerId),
              drag(false)
            )}
            onPointerDown={e => (
              e.target.setPointerCapture(e.pointerId),
              drag(
                new THREE.Vector3()
                  .copy(e.point)
                  .sub(vec.copy(card.current.translation()))
              )
            )}
          >
            {/* Ferrures métal (clip + attache) */}
            <group scale={2.925} position={[0, -1.56, -0.065]}>
              <mesh
                geometry={nodes.clip.geometry}
                material={materials.metal}
                material-roughness={0.3}
              />
              <mesh
                geometry={nodes.clamp.geometry}
                material={materials.metal}
              />
            </group>
            {/* Face avant imprimée */}
            <mesh position={[0, 0, 0.025]}>
              <planeGeometry args={[1.95, 2.756]} />
              <meshPhysicalMaterial
                map={cardTexture}
                clearcoat={1}
                clearcoatRoughness={0.2}
                roughness={0.4}
                metalness={0.3}
              />
            </mesh>
            {/* Dos — informations de contact (plan dos-à-dos) */}
            <mesh position={[0, 0, -0.025]} rotation={[0, Math.PI, 0]}>
              <planeGeometry args={[1.95, 2.756]} />
              <meshPhysicalMaterial
                map={backTexture}
                clearcoat={1}
                clearcoatRoughness={0.2}
                roughness={0.4}
                metalness={0.3}
              />
            </mesh>
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={[width, height]}
          useMap
          map={bandTexture}
          repeat={[-3, 1]}
          lineWidth={1}
        />
      </mesh>
    </>
  );
}

export default function Lanyard({
  photo = "/profile.jpeg",
  alt = "",
  lang = "fr",
}: {
  /** URL du portrait imprimé sur le badge. */
  photo?: string;
  /** Texte alternatif du portrait affiché si WebGL est indisponible. */
  alt?: string;
  /** Langue des textes imprimés sur le badge. */
  lang?: "fr" | "en";
}) {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ alpha: true }}
      // Caméra rapprochée et abaissée : le badge remplit une colonne étroite
      camera={{ position: [0, -0.45, 10.5], fov: 25 }}
      fallback={
        <img
          src={photo}
          alt={alt}
          style={{ width: "100%", aspectRatio: "1", objectFit: "cover" }}
        />
      }
    >
      <ambientLight intensity={Math.PI} />
      <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
        <Band photo={photo} lang={lang} />
      </Physics>
      <Environment blur={0.75}>
        <Lightformer
          intensity={2}
          color="white"
          position={[0, -1, 5]}
          rotation={[0, 0, Math.PI / 3]}
          scale={[100, 0.1, 1]}
        />
        <Lightformer
          intensity={3}
          color="white"
          position={[-1, -1, 1]}
          rotation={[0, 0, Math.PI / 3]}
          scale={[100, 0.1, 1]}
        />
        <Lightformer
          intensity={3}
          color="white"
          position={[1, 1, 1]}
          rotation={[0, 0, Math.PI / 3]}
          scale={[100, 0.1, 1]}
        />
        <Lightformer
          intensity={10}
          color="white"
          position={[-10, 0, 14]}
          rotation={[0, Math.PI / 2, Math.PI / 3]}
          scale={[100, 10, 1]}
        />
      </Environment>
    </Canvas>
  );
}
