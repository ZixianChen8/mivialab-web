/** Inline before paint to avoid theme/font flash (matches design/main). */
export const themeInitScript = `
(function () {
  try {
    var theme = localStorage.getItem('mivialab-color-system');
    if (theme) document.documentElement.setAttribute('data-theme', theme);
    var font = localStorage.getItem('mivialab-font-system');
    if (font) document.documentElement.setAttribute('data-font', font);
  } catch (e) { /* ignore */ }
})();
`;
