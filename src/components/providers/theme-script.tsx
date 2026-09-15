/**
 * Applies the persisted theme before first paint to avoid a flash.
 * Dark is the default; `light` is opt-in via the toggle.
 */
const script = `(function(){try{var t=localStorage.getItem("tr-theme");if(t==="light"||t==="dark"){document.documentElement.setAttribute("data-theme",t);}else{document.documentElement.setAttribute("data-theme","dark");}}catch(e){document.documentElement.setAttribute("data-theme","dark");}})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
