// Header: solid ground after the first scroll, the language menu, the mobile drawer, and the language cookie.
const header = document.querySelector<HTMLElement>('[data-nav]');
const onScroll = () => header?.toggleAttribute('data-scrolled', scrollY > 8);
addEventListener('scroll', onScroll, { passive: true });
onScroll();

const drawer = document.querySelector<HTMLDialogElement>('#drawer');
document.addEventListener('click', (e) => {
  const el = e.target as HTMLElement;
  const menu = el.closest<HTMLElement>('[data-menu]');
  document.querySelectorAll<HTMLElement>('[data-menu][data-open]').forEach((m) => { if (m !== menu) close(m); });
  if (el.closest('[data-menu-trigger]') && menu) (menu.hasAttribute('data-open') ? close : open)(menu);
  if (el.closest('[data-drawer-open]')) drawer?.showModal();
  if (el.closest('[data-drawer-close]') || el === drawer || el.closest('#drawer a')) drawer?.close();
  // The visitor's choice beats the browser language, at Netlify's edge and in the inline detector.
  const lang = el.closest<HTMLElement>('[data-set-lang]')?.dataset.setLang;
  if (lang) document.cookie = `nf_lang=${lang}; path=/; max-age=31536000; samesite=lax`;
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') document.querySelectorAll<HTMLElement>('[data-menu][data-open]').forEach(close); });
function open(m: HTMLElement) { m.setAttribute('data-open', ''); m.querySelector('[data-menu-trigger]')?.setAttribute('aria-expanded', 'true'); }
function close(m: HTMLElement) { m.removeAttribute('data-open'); m.querySelector('[data-menu-trigger]')?.setAttribute('aria-expanded', 'false'); }
