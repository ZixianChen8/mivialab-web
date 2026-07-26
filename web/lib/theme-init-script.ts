import { ACTIVE_THEME_ID } from "@/lib/themes";

/** Inline before paint to avoid theme flash. */
export const themeInitScript = `
(function () {
  try {
    document.documentElement.setAttribute('data-theme', '${ACTIVE_THEME_ID}');
    localStorage.removeItem('mivialab-color-system');
    localStorage.removeItem('mivialab-font-system');
  } catch (e) { /* ignore */ }
})();
`;
