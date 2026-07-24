export type ThemeDefinition = {
  id: string;
  key: string;
  name: string;
  blurb: string;
  swatches: [string, string, string, string];
};

export const THEMES: ThemeDefinition[] = [
  {
    id: "pine-fog",
    key: "1",
    name: "Pine Fog",
    blurb: "Forest restrained: pine darks, cool bone, amber CTAs",
    swatches: ["#0d1612", "#f7f8f7", "#1a2920", "#c4924a"],
  },
  {
    id: "slate-studio",
    key: "2",
    name: "Slate Studio",
    blurb: "Cold luxury: steel darks, silver lights, cobalt CTAs",
    swatches: ["#141c2c", "#f6f7f9", "#2a3548", "#3a6fb5"],
  },
  {
    id: "ink-brass",
    key: "3",
    name: "Ink & Brass",
    blurb: "Gallery committed: near-black with brass on every CTA",
    swatches: ["#0e0e0c", "#f7f7f5", "#1c1b18", "#d4a84a"],
  },
  {
    id: "harbour-blue",
    key: "4",
    name: "Harbour Blue",
    blurb: "Cobalt committed: navy surfaces, saturated blue CTAs",
    swatches: ["#122848", "#f6f8fb", "#1e3a6e", "#2f5fd4"],
  },
  {
    id: "cedar-ember",
    key: "5",
    name: "Cedar Ember",
    blurb: "Black and tan: charcoal ink, near-white body, ember CTAs",
    swatches: ["#241810", "#f7f5f2", "#3a2a1c", "#c45a28"],
  },
  {
    id: "snowfield",
    key: "6",
    name: "Snowfield",
    blurb: "Light-first winter: pale hero, ice accent, charcoal darks",
    swatches: ["#e4ecf4", "#f7fafc", "#1e2836", "#3d8fb5"],
  },
  {
    id: "oxblood",
    key: "7",
    name: "Oxblood",
    blurb: "Drenched red-black darks, cool stone body, blood CTAs",
    swatches: ["#4a1820", "#f7f6f5", "#6a2430", "#a83232"],
  },
  {
    id: "volt-night",
    key: "8",
    name: "Volt Night",
    blurb: "Full palette: near-black with chartreuse on CTAs and badges",
    swatches: ["#0e1410", "#f6f8f5", "#182018", "#b8f000"],
  },
  {
    id: "stone-clay",
    key: "9",
    name: "Stone Clay",
    blurb: "Slate and brick: cool gray body, terracotta CTAs",
    swatches: ["#2e333c", "#f6f7f8", "#3d4450", "#b05a32"],
  },
  {
    id: "northern-teal",
    key: "0",
    name: "Northern Teal",
    blurb: "Teal committed: teal-black darks, mint CTAs",
    swatches: ["#0c2428", "#f6f9f9", "#163840", "#3ecfb0"],
  },
];

export const THEME_STORAGE_KEY = "mivialab-color-system";
export const DEFAULT_THEME_ID = "pine-fog";

export function getThemeById(id: string): ThemeDefinition {
  return THEMES.find((t) => t.id === id) ?? THEMES[0];
}
