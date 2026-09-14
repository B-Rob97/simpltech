export const THEME_IDS = [
  "night-signal",
  "cupertino",
  "editorial",
  "swiss",
  "soft-product",
  "brutalist",
  "warm-craft",
  "neon-club",
  "newsprint",
  "playground",
] as const;

export type ThemeId = (typeof THEME_IDS)[number];

export type HeroTreatment =
  | "skyline"
  | "void"
  | "ruled"
  | "grid"
  | "mesh"
  | "paper"
  | "blocks"
  | "raw"
  | "glow";

export type ThemeDensity = "airy" | "regular" | "dense";
export type ThemeMotion = "still" | "calm" | "energetic";
export type ThemeColorScheme = "light" | "dark";
export type ThemeFontSlot = "unbounded" | "sora" | "grotesque" | "serif" | "mono";

export type ThemeDefinition = {
  id: ThemeId;
  label: string;
  pitch: string;
  hero: HeroTreatment;
  density: ThemeDensity;
  motion: ThemeMotion;
  showNightBackdrop: boolean;
  stackWork: boolean;
  colorScheme: ThemeColorScheme;
  fonts: {
    display: ThemeFontSlot;
    body: ThemeFontSlot;
  };
};

export const DEFAULT_THEME_ID: ThemeId = "night-signal";
export const THEME_COOKIE = "simpltech-theme";
export const THEME_STORAGE_KEY = "simpltech-theme";
export const THEME_REFRESH_MS = 640;
export const THEME_REFRESH_REDUCED_MS = 220;

export const THEMES: readonly ThemeDefinition[] = [
  {
    id: "night-signal",
    label: "Night Signal",
    pitch: "Navy, volt, and the Calgary skyline.",
    hero: "skyline",
    density: "regular",
    motion: "energetic",
    showNightBackdrop: true,
    stackWork: false,
    colorScheme: "dark",
    fonts: { display: "unbounded", body: "sora" },
  },
  {
    id: "cupertino",
    label: "Cupertino",
    pitch: "Near-white, black type, almost no chrome.",
    hero: "void",
    density: "airy",
    motion: "still",
    showNightBackdrop: false,
    stackWork: false,
    colorScheme: "light",
    fonts: { display: "grotesque", body: "grotesque" },
  },
  {
    id: "editorial",
    label: "Editorial",
    pitch: "Serif display on cream paper, rules and folio.",
    hero: "ruled",
    density: "regular",
    motion: "calm",
    showNightBackdrop: false,
    stackWork: true,
    colorScheme: "light",
    fonts: { display: "serif", body: "serif" },
  },
  {
    id: "swiss",
    label: "Swiss",
    pitch: "Grotesque type, red accent, poster grid.",
    hero: "grid",
    density: "dense",
    motion: "still",
    showNightBackdrop: false,
    stackWork: true,
    colorScheme: "light",
    fonts: { display: "grotesque", body: "grotesque" },
  },
  {
    id: "soft-product",
    label: "Soft Product",
    pitch: "Cool gray, one accent, soft product cards.",
    hero: "mesh",
    density: "regular",
    motion: "calm",
    showNightBackdrop: false,
    stackWork: false,
    colorScheme: "light",
    fonts: { display: "grotesque", body: "grotesque" },
  },
  {
    id: "brutalist",
    label: "Brutalist",
    pitch: "Mono, thick borders, no radius, raw type.",
    hero: "raw",
    density: "dense",
    motion: "still",
    showNightBackdrop: false,
    stackWork: true,
    colorScheme: "light",
    fonts: { display: "mono", body: "mono" },
  },
  {
    id: "warm-craft",
    label: "Warm Craft",
    pitch: "Terracotta, paper, humanist studio type.",
    hero: "paper",
    density: "regular",
    motion: "calm",
    showNightBackdrop: false,
    stackWork: false,
    colorScheme: "light",
    fonts: { display: "serif", body: "grotesque" },
  },
  {
    id: "neon-club",
    label: "Neon Club",
    pitch: "Magenta and cyan glow — no skyline.",
    hero: "glow",
    density: "regular",
    motion: "energetic",
    showNightBackdrop: true,
    stackWork: false,
    colorScheme: "dark",
    fonts: { display: "unbounded", body: "grotesque" },
  },
  {
    id: "newsprint",
    label: "Newsprint",
    pitch: "Utilitarian columns, high contrast, dense.",
    hero: "ruled",
    density: "dense",
    motion: "still",
    showNightBackdrop: false,
    stackWork: true,
    colorScheme: "light",
    fonts: { display: "serif", body: "grotesque" },
  },
  {
    id: "playground",
    label: "Playground",
    pitch: "Color-block studio portfolio, bold shapes.",
    hero: "blocks",
    density: "airy",
    motion: "energetic",
    showNightBackdrop: false,
    stackWork: false,
    colorScheme: "light",
    fonts: { display: "grotesque", body: "grotesque" },
  },
];

const THEME_BY_ID = Object.fromEntries(
  THEMES.map((theme) => [theme.id, theme]),
) as Record<ThemeId, ThemeDefinition>;

export function isThemeId(value: string | undefined | null): value is ThemeId {
  return value != null && THEME_IDS.includes(value as ThemeId);
}

export function parseThemeId(value: string | undefined | null): ThemeId {
  return isThemeId(value) ? value : DEFAULT_THEME_ID;
}

export function getTheme(id: string | undefined | null): ThemeDefinition {
  return THEME_BY_ID[parseThemeId(id)];
}

export function nextThemeId(id: ThemeId): ThemeId {
  const index = THEME_IDS.indexOf(id);
  return THEME_IDS[(index + 1) % THEME_IDS.length];
}

export function themeIndex(id: ThemeId): number {
  return THEME_IDS.indexOf(id) + 1;
}

export function applyThemeToDocument(theme: ThemeDefinition) {
  const root = document.documentElement;
  root.dataset.theme = theme.id;
  root.dataset.motion = theme.motion;
  root.dataset.density = theme.density;
  root.dataset.hero = theme.hero;
  root.style.colorScheme = theme.colorScheme;
}

export function persistTheme(id: ThemeId) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, id);
  } catch {
    // Private mode can block storage.
  }

  document.cookie = `${THEME_COOKIE}=${encodeURIComponent(id)}; path=/; max-age=31536000; SameSite=Lax`;
}

export const THEME_BOOTSTRAP_SCRIPT = buildThemeBootstrapScript();

function buildThemeBootstrapScript() {
  const map = THEMES.map((theme) => {
    return `"${theme.id}":["${theme.motion}","${theme.density}","${theme.hero}","${theme.colorScheme}"]`;
  }).join(",");

  return `(()=>{try{var m={${map}};var k=${JSON.stringify(THEME_STORAGE_KEY)};var id=null;try{id=localStorage.getItem(k)}catch(e){}if(!id){var match=document.cookie.match(/(?:^|; )simpltech-theme=([^;]*)/);if(match)id=decodeURIComponent(match[1])}if(!m[id])id=${JSON.stringify(DEFAULT_THEME_ID)};var t=m[id];var r=document.documentElement;r.setAttribute("data-theme",id);r.setAttribute("data-motion",t[0]);r.setAttribute("data-density",t[1]);r.setAttribute("data-hero",t[2]);r.style.colorScheme=t[3]}catch(e){}})()`;
}
