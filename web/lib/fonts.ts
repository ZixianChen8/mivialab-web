export type FontCategory = "sans" | "serif" | "slab";

export type FontDefinition = {
  id: string;
  name: string;
  category: FontCategory;
  family: string;
  source: "google" | "self";
};

export const FONT_GROUPS: { label: string; category: FontCategory }[] = [
  { label: "Sans", category: "sans" },
  { label: "Serif", category: "serif" },
  { label: "Slab serif", category: "slab" },
];

export const FONTS: FontDefinition[] = [
  { id: "inter", name: "Inter", category: "sans", family: "Inter", source: "google" },
  { id: "josefin-sans", name: "Josefin Sans", category: "sans", family: "Josefin Sans", source: "google" },
  { id: "roboto", name: "Roboto", category: "sans", family: "Roboto", source: "google" },
  { id: "open-sans", name: "Open Sans", category: "sans", family: "Open Sans", source: "google" },
  { id: "rubik", name: "Rubik", category: "sans", family: "Rubik", source: "google" },
  { id: "dm-sans", name: "DM Sans", category: "sans", family: "DM Sans", source: "google" },
  { id: "poppins", name: "Poppins", category: "sans", family: "Poppins", source: "google" },
  { id: "lato", name: "Lato", category: "sans", family: "Lato", source: "google" },
  { id: "nunito", name: "Nunito", category: "sans", family: "Nunito", source: "google" },
  { id: "ubuntu", name: "Ubuntu", category: "sans", family: "Ubuntu", source: "google" },
  { id: "ranade", name: "Ranade", category: "sans", family: "Ranade", source: "self" },
  { id: "source-sans-pro", name: "Source Sans Pro", category: "sans", family: "Source Sans Pro", source: "google" },
  { id: "work-sans", name: "Work Sans", category: "sans", family: "Work Sans", source: "google" },
  { id: "manrope", name: "Manrope", category: "sans", family: "Manrope", source: "google" },
  { id: "object-sans", name: "Object Sans", category: "sans", family: "Object Sans", source: "self" },
  { id: "raleway", name: "Raleway", category: "sans", family: "Raleway", source: "google" },
  { id: "montserrat", name: "Montserrat", category: "sans", family: "Montserrat", source: "google" },
  { id: "playfair-display", name: "Playfair Display", category: "serif", family: "Playfair Display", source: "google" },
  { id: "libre-baskerville", name: "Libre Baskerville", category: "serif", family: "Libre Baskerville", source: "google" },
  { id: "soria", name: "Soria", category: "serif", family: "Soria", source: "self" },
  { id: "neuton", name: "Neuton", category: "serif", family: "Neuton", source: "google" },
  { id: "lora", name: "Lora", category: "serif", family: "Lora", source: "google" },
  { id: "sreda", name: "Sreda", category: "slab", family: "Sreda", source: "self" },
  { id: "arvo", name: "Arvo", category: "slab", family: "Arvo", source: "google" },
];

export const FONT_STORAGE_KEY = "mivialab-font-system";
export const DEFAULT_FONT_ID = "manrope";

const SERIF_ACCENT = `"Libre Baskerville", Georgia, serif`;

export function getFontById(id: string): FontDefinition {
  return FONTS.find((f) => f.id === id) ?? FONTS.find((f) => f.id === DEFAULT_FONT_ID)!;
}

export function getFontsByCategory(category: FontCategory): FontDefinition[] {
  return FONTS.filter((f) => f.category === category);
}

export function getFontPreviewStack(font: FontDefinition): string {
  const generic =
    font.category === "sans" ? "system-ui, sans-serif" : "Georgia, serif";
  return `"${font.family}", ${generic}`;
}

export function getFontStacks(font: FontDefinition): {
  display: string;
  body: string;
  serif: string;
} {
  const stack = getFontPreviewStack(font);

  if (font.category === "sans") {
    return {
      display: stack,
      body: stack,
      serif: SERIF_ACCENT,
    };
  }

  return {
    display: stack,
    body: stack,
    serif: stack,
  };
}

const GOOGLE_FONT_PARAMS: Record<string, string> = {
  Inter: "family=Inter:wght@400;500;600;700",
  "Josefin Sans": "family=Josefin+Sans:wght@400;500;600;700",
  Roboto: "family=Roboto:wght@400;500;700",
  "Open Sans": "family=Open+Sans:wght@400;500;600;700",
  Rubik: "family=Rubik:wght@400;500;600;700",
  "DM Sans": "family=DM+Sans:wght@400;500;600;700",
  Poppins: "family=Poppins:wght@400;500;600;700",
  Lato: "family=Lato:wght@400;700",
  Nunito: "family=Nunito:wght@400;500;600;700",
  Ubuntu: "family=Ubuntu:wght@400;500;700",
  "Source Sans Pro": "family=Source+Sans+Pro:wght@400;600;700",
  "Work Sans": "family=Work+Sans:wght@400;500;600;700",
  Manrope: "family=Manrope:wght@400;500;600;700",
  Raleway: "family=Raleway:wght@400;500;600;700",
  Montserrat: "family=Montserrat:wght@400;500;600;700",
  "Playfair Display": "family=Playfair+Display:wght@400;500;600;700",
  "Libre Baskerville": "family=Libre+Baskerville:wght@400;700",
  Neuton: "family=Neuton:wght@400;700",
  Lora: "family=Lora:wght@400;500;600;700",
  Arvo: "family=Arvo:wght@400;700",
};

export const GOOGLE_FONTS_HREF = `https://fonts.googleapis.com/css2?${[
  ...new Set(
    FONTS.filter((font) => font.source === "google").map((font) => GOOGLE_FONT_PARAMS[font.family])
  ),
]
  .filter(Boolean)
  .join("&")}&display=swap`;
