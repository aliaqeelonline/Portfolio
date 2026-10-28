// Applied before CSS to avoid a flash of the wrong theme. Works on file:// too.
(() => {
  let preference;
  try { preference = localStorage.getItem('ali-aqeel-theme'); } catch { /* Storage may be blocked. */ }
  // A first visit uses the site's black identity; explicit choices persist.
  document.documentElement.dataset.theme = ['light', 'dark'].includes(preference)
    ? preference : 'dark';
})();
