import { ACTIVE_THEME_ID } from "@/lib/themes";

/** Inline before paint to avoid theme/font flash. */
export const themeInitScript = `
(function () {
  try {
    document.documentElement.setAttribute('data-theme', '${ACTIVE_THEME_ID}');
    localStorage.removeItem('mivialab-color-system');
    var font = localStorage.getItem('mivialab-font-system');
    if (font) document.documentElement.setAttribute('data-font', font);
  } catch (e) { /* ignore */ }
})();
`;
