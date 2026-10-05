/**
 * Thèmes de couleurs du site — source unique des couleurs.
 *
 * Le thème est choisi au build par la variable d'environnement PUBLIC_THEME
 * (déclarée dans astro.config.ts) :
 *   PUBLIC_THEME=ambre      charbon + ambre (par défaut)
 *   PUBLIC_THEME=classique  blanc + bleu nuit
 *
 * Chaque thème a un mode clair et un mode sombre (bouton du header). Les
 * couleurs servent aux variables CSS (Layout.astro), au logo, aux images
 * d'aperçu (Open Graph) et au badge 3D de la page À propos.
 */
import { PUBLIC_THEME } from "astro:env/client";

export type Mode = "light" | "dark";

interface ModeColors {
  background: string;
  foreground: string;
  accent: string;
  muted: string;
  mutedForeground: string;
  border: string;
  /** Bouton principal (fond / texte). */
  primary: string;
  primaryForeground: string;
  /** Icône « Franklin » (fond / lettres). */
  logoBadge: string;
  logoMark: string;
}

interface Theme {
  label: string;
  light: ModeColors;
  dark: ModeColors;
  /** Images d'aperçu (WhatsApp, LinkedIn…) : un seul mode, figé. */
  og: {
    mode: Mode;
    background: string;
    backgroundImage?: string;
    borderTop?: string;
    card: string;
    border: string;
    foreground: string;
    muted: string;
    accent: string;
    /** Bandeau du badge, pastille de catégorie, sangle. */
    band: string;
    bandForeground: string;
  };
  /** Badge 3D de la page À propos. */
  badge: {
    card: string;
    surface: string;
    ink: string;
    accent: string;
    muted: string;
    line: string;
    band: string;
    bandInk: string;
    qrDark: string;
    qrLight: string;
  };
}

export const THEMES = {
  ambre: {
    label: "Charbon + ambre",
    light: {
      background: "#faf9f6",
      foreground: "#1c1b19",
      accent: "#8a5e12",
      muted: "#efece4",
      mutedForeground: "#6b6a63",
      border: "#e3e0d7",
      primary: "#8a5e12",
      primaryForeground: "#faf9f6",
      logoBadge: "#8a5e12",
      logoMark: "#faf9f6",
    },
    dark: {
      background: "#18181b",
      foreground: "#e8e6e1",
      accent: "#d4a843",
      muted: "#27272a",
      mutedForeground: "#a1a09a",
      border: "#3a3a40",
      primary: "#d4a843",
      primaryForeground: "#18181b",
      logoBadge: "#d4a843",
      logoMark: "#18181b",
    },
    og: {
      mode: "dark",
      background: "#18181b",
      backgroundImage:
        "radial-gradient(circle at 18% 22%, rgba(212, 168, 67, 0.20), rgba(24, 24, 27, 0) 58%)",
      card: "#232326",
      border: "#3a3a40",
      foreground: "#e8e6e1",
      muted: "#a1a09a",
      accent: "#d4a843",
      band: "#d4a843",
      bandForeground: "#18181b",
    },
    badge: {
      card: "#18181b",
      surface: "#27272a",
      ink: "#e8e6e1",
      accent: "#d4a843",
      muted: "#a1a09a",
      line: "#3a3a40",
      band: "#d4a843",
      bandInk: "#18181b",
      qrDark: "#18181b",
      qrLight: "#f4f2ec",
    },
  },
  classique: {
    label: "Blanc + bleu nuit",
    light: {
      background: "#ffffff",
      foreground: "#1f2328",
      accent: "#1a5fb4",
      muted: "#f5f6f8",
      mutedForeground: "#5b6470",
      border: "#e2e5e9",
      primary: "#1b365d",
      primaryForeground: "#ffffff",
      logoBadge: "#1b365d",
      logoMark: "#ffffff",
    },
    dark: {
      background: "#0f1216",
      foreground: "#e6e8eb",
      accent: "#6ea8fe",
      muted: "#171b21",
      mutedForeground: "#9aa3ae",
      border: "#2a3038",
      primary: "#6ea8fe",
      primaryForeground: "#0f1216",
      logoBadge: "#1b365d",
      logoMark: "#ffffff",
    },
    og: {
      mode: "light",
      background: "#ffffff",
      borderTop: "10px solid #1b365d",
      card: "#ffffff",
      border: "#e2e5e9",
      foreground: "#1f2328",
      muted: "#5b6470",
      accent: "#1a5fb4",
      band: "#1b365d",
      bandForeground: "#ffffff",
    },
    badge: {
      card: "#ffffff",
      surface: "#f5f6f8",
      ink: "#1f2328",
      accent: "#1a5fb4",
      muted: "#5b6470",
      line: "#e2e5e9",
      band: "#1b365d",
      bandInk: "#ffffff",
      qrDark: "#1f2328",
      qrLight: "#ffffff",
    },
  },
} as const satisfies Record<string, Theme>;

export type ThemeName = keyof typeof THEMES;

export const THEME_NAME: ThemeName = PUBLIC_THEME;
export const THEME: Theme = THEMES[THEME_NAME];

const cssVars = (c: ModeColors) =>
  [
    `--background:${c.background}`,
    `--foreground:${c.foreground}`,
    `--accent:${c.accent}`,
    `--muted:${c.muted}`,
    `--muted-foreground:${c.mutedForeground}`,
    `--border:${c.border}`,
    `--primary:${c.primary}`,
    `--primary-foreground:${c.primaryForeground}`,
    `--logo-badge:${c.logoBadge}`,
    `--logo-mark:${c.logoMark}`,
  ].join(";");

/** Variables CSS du thème, injectées dans le <head> par Layout.astro. */
export const themeCss = [
  `:root,html[data-theme="light"]{${cssVars(THEME.light)}}`,
  `html[data-theme="dark"]{${cssVars(THEME.dark)}}`,
].join("");
