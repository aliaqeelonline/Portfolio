// Applied before CSS to avoid a flash of the wrong theme. Works on file:// too.
(() => {
  let preference;
  try { preference = localStorage.getItem('ali-aqeel-theme'); } catch { /* Storage may be blocked. */ }
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.dataset.theme = ['light', 'dark'].includes(preference)
    ? preference : (systemDark ? 'dark' : 'light');
})();
