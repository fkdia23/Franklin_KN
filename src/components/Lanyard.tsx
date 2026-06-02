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

extend({ MeshLineGeometry, MeshLineMaterial });

const GLB_URL = "/badge/tag.glb";
useGLTF.preload(GLB_URL);

// Couleurs du thème (charbon + ambre)
const AMBER = "#d4a843";
const CHARCOAL = "#18181b";
const SURFACE = "#27272a";
const OFFWHITE = "#e8e6e1";

/** Face du badge dessinée sur un canvas (photo + nom + rôle, sans marque externe). */
function makeCardTexture() {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 720;
  const ctx = c.getContext("2d")!;

  const PHOTO = { cx: 256, cy: 288, r: 172 };

  const drawBase = () => {
  

    // Fond
    ctx.fillStyle = CHARCOAL;
    ctx.fillRect(0, 0, 512, 720);

    // Cadre photo (placeholder le temps du chargement)
    ctx.beginPath();
    ctx.arc(PHOTO.cx, PHOTO.cy, PHOTO.r, 0, Math.PI * 2);
    ctx.fillStyle = SURFACE;
    ctx.fill();
    ctx.lineWidth = 6;
    ctx.strokeStyle = AMBER;
    ctx.stroke();

    // Nom
    ctx.textAlign = "center";
    ctx.fillStyle = OFFWHITE;
    ctx.font = "800 50px monospace";
    ctx.fillText("Franklin", 256, 538);
    ctx.font = "800 44px monospace";
    ctx.fillText("KANA NGUEDIA", 256, 584);

    // Rôle
    ctx.fillStyle = AMBER;
    ctx.font = "500 28px monospace";
    ctx.fillText("Data & AI Engineer", 256, 628);

    // Faux code-barres
    ctx.fillStyle = "#3a3a40";
    let x = 86;
    while (x < 426) {
      const w = 3 + Math.round(Math.random() * 6);
      ctx.fillRect(x, 664, w, 42);
      x += w + 3 + Math.round(Math.random() * 4);
    }
  };

  drawBase();

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 16;

  // Charge la photo et la dessine dans le cadre rond
  const img = new Image();
  img.onload = () => {
    ctx.save();
    ctx.beginPath();
    ctx.arc(PHOTO.cx, PHOTO.cy, PHOTO.r - 4, 0, Math.PI * 2);
    ctx.clip();
    const side = (PHOTO.r - 4) * 2;
    const scale = Math.max(side / img.width, side / img.height);
    const dw = img.width * scale;
    const dh = img.height * scale;
    ctx.drawImage(img, PHOTO.cx - dw / 2, PHOTO.cy - dh / 2, dw, dh);
    ctx.restore();
    // Anneau ambre par-dessus
    ctx.beginPath();
    ctx.arc(PHOTO.cx, PHOTO.cy, PHOTO.r, 0, Math.PI * 2);
    ctx.lineWidth = 6;
    ctx.strokeStyle = AMBER;
    ctx.stroke();
    tex.needsUpdate = true;
  };
  img.src = "/profile.jpeg";

  return tex;
}

/** Dos du badge : informations de contact. */
function makeBackTexture() {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 720;
  const ctx = c.getContext("2d")!;

  ctx.fillStyle = CHARCOAL;
  ctx.fillRect(0, 0, 512, 720);

  // Bandeau ambre (réduit)
  ctx.fillStyle = AMBER;
  ctx.fillRect(0, 0, 512, 66);
  ctx.fillStyle = CHARCOAL;
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.font = "800 30px monospace";
  ctx.fillText("CONTACT", 44, 45);

  const entries: [string, string][] = [
    ["EMAIL", "fknguedia@gmail.com"],
    ["GITHUB", "@fkdia23"],
    ["LINKEDIN", "in/franklin-kana-nguedia"],
    ["HUGGING FACE", "@fknguedia"],
  ];

  let y = 124;
  for (const [label, value] of entries) {
    ctx.fillStyle = AMBER;
    ctx.font = "700 18px monospace";
    ctx.fillText(label, 44, y);
    ctx.fillStyle = OFFWHITE;
    ctx.font = "600 24px monospace";
    ctx.fillText(value, 44, y + 30);
    // séparateur
    ctx.strokeStyle = "#3a3a40";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(44, y + 52);
    ctx.lineTo(468, y + 52);
    ctx.stroke();
    y += 70;
  }

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 16;

  // QR code (vCard) — ajoute le contact en un scan
  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "N:KANA NGUEDIA;Franklin",
    "FN:Franklin KANA NGUEDIA",
    "TITLE:Data & AI Engineer",
    "EMAIL:fknguedia@gmail.com",
    "URL:https://github.com/fkdia23",
    "URL:https://www.linkedin.com/in/franklin-kana-nguedia",
    "URL:https://huggingface.co/fknguedia",
    "END:VCARD",
  ].join("\n");

  const qrSize = 220;
  const qx = (512 - qrSize) / 2;
  const qy = 426;
  try {
    QRCode.toDataURL(
      vcard,
      { width: qrSize, margin: 1, color: { dark: CHARCOAL, light: "#f4f2ec" } },
      (err: unknown, url: string) => {
        if (err || !url) return;
        const qrImg = new Image();
        qrImg.onload = () => {
          // Cartouche clair (zone de silence pour la lisibilité)
          ctx.fillStyle = "#f4f2ec";
          ctx.fillRect(qx - 14, qy - 14, qrSize + 28, qrSize + 28);
          ctx.drawImage(qrImg, qx, qy, qrSize, qrSize);
          // Légende
          ctx.fillStyle = AMBER;
          ctx.textAlign = "center";
          ctx.font = "700 20px monospace";
          ctx.fillText("SCAN POUR ME CONTACTER", 256, 698);
          tex.needsUpdate = true;
        };
        qrImg.src = url;
      }
    );
  } catch {
    /* le QR est optionnel : on n'empêche jamais le badge de s'afficher */
  }

  return tex;
}

/** Sangle ambre avec le nom répété. */
function makeBandTexture() {
  const c = document.createElement("canvas");
  c.width = 1024;
  c.height = 64;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = AMBER;
  ctx.fillRect(0, 0, 1024, 64);
  ctx.fillStyle = CHARCOAL;
  ctx.font = "700 26px monospace";
  ctx.textBaseline = "middle";
  const label = "FRANKLIN  KANA  NGUEDIA   •   ";
  const step = ctx.measureText(label).width;
  for (let x = 0; x < 1024 + step; x += step) ctx.fillText(label, x, 36);

  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function Band({ maxSpeed = 50, minSpeed = 10 }) {
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

  const cardTexture = useMemo(() => makeCardTexture(), []);
  const backTexture = useMemo(() => makeBackTexture(), []);
  const bandTexture = useMemo(() => makeBandTexture(), []);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.885, 0]]);

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
          ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(
          0.1,
          Math.min(1, ref.current.lerped.distanceTo(ref.current.translation()))
        );
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
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
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? "kinematicPosition" : "dynamic"}
        >
          <CuboidCollider args={[1.04, 1.4625, 0.01]} />
          <group
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={e => (
              e.target.releasePointerCapture(e.pointerId), drag(false)
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
              <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
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

export default function Lanyard() {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ alpha: true }}
      camera={{ position: [0, 0, 13], fov: 25 }}
    >
      <ambientLight intensity={Math.PI} />
      <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
        <Band />
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
