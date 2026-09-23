// Scroll-driven motion, declared in markup so any page can use it:
//   data-fill            words light up as the block crosses the viewport (scrubbed)
//   data-zoom            media grows from 86% with soft corners to full size (scrubbed)
//   data-parallax="0.2"  element drifts against the scroll (scrubbed)
//   data-reveal          children (or the element) settle in once, on first view
//   data-count="7209"    number counts up once, on first view
//   data-draw            SVG paths inside draw themselves (scrubbed)
//   data-exit            the section recedes (scales down, dims) as the next one scrolls over it (scrubbed)
//   data-scene="5"       a tall section with a sticky stage; gets data-step="0..4" from the scroll position,
//                        and CSS does the rest. Without this script the stage shows its final state.
//   data-focus-list      each child gets data-state="ahead|active|past" as it crosses the reading line;
//                        the list gets data-focus-ready, so CSS only dims items when this script is running
// Everything is skipped under prefers-reduced-motion; content is fully visible without JS.
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
const mm = gsap.matchMedia();

mm.add('(prefers-reduced-motion: no-preference)', () => {
  document.querySelectorAll<HTMLElement>('[data-fill]').forEach((el) => {
    // Japanese has no spaces between words, so ask the browser where the words are.
    const text = el.textContent!.trim().replace(/\s+/g, ' ');
    const lang = document.documentElement.lang;
    const words = 'Segmenter' in Intl && /^(ja|zh|th)/.test(lang)
      ? [...new Intl.Segmenter(lang, { granularity: 'word' }).segment(text)].map((s) => s.segment)
      : text.split(/(?<= )/);
    el.setAttribute('aria-label', text);
    el.innerHTML = words.map((w) => `<span aria-hidden="true" style="opacity:.16">${w}</span>`).join('');
    gsap.to(el.children, {
      opacity: 1, stagger: 0.1, ease: 'none',
      scrollTrigger: { trigger: el, start: 'top 82%', end: 'bottom 45%', scrub: 0.4 },
    });
  });

  document.querySelectorAll<HTMLElement>('[data-zoom]').forEach((el) => {
    gsap.fromTo(el, { scale: 0.86, borderRadius: '2.5rem', opacity: 0.6 }, {
      scale: 1, borderRadius: '1.25rem', opacity: 1, ease: 'none',
      scrollTrigger: { trigger: el, start: 'top 95%', end: 'top 35%', scrub: 0.5 },
    });
  });

  document.querySelectorAll<HTMLElement>('[data-exit]').forEach((el) => {
    gsap.to(el, {
      scale: 0.92, opacity: 0.25, borderRadius: '2.5rem', ease: 'none', transformOrigin: '50% 100%',
      scrollTrigger: { trigger: el, start: 'bottom 85%', end: 'bottom 10%', scrub: true },
    });
  });

  document.querySelectorAll<HTMLElement>('[data-scene]').forEach((el) => {
    const steps = Number(el.dataset.scene) || 1;
    const bar = el.querySelector<HTMLElement>('[data-scene-progress]');
    el.dataset.step = '0';
    ScrollTrigger.create({
      trigger: el, start: 'top top', end: 'bottom bottom',
      onUpdate: (self) => {
        el.dataset.step = String(Math.min(steps - 1, Math.floor(self.progress * steps)));
        if (bar) bar.style.transform = `scaleX(${self.progress})`;
      },
    });
    return () => delete el.dataset.step;
  });

  document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
    const amount = Number(el.dataset.parallax) || 0.15;
    gsap.fromTo(el, { yPercent: amount * 100 }, {
      yPercent: -amount * 100, ease: 'none',
      scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  });

  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    const targets = el.dataset.reveal === 'children' ? el.children : el;
    gsap.fromTo(targets, { y: 28, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.9, stagger: 0.08, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    });
  });

  document.querySelectorAll<SVGElement>('[data-draw]').forEach((svg) => {
    svg.querySelectorAll<SVGGeometryElement>('path,line,polyline').forEach((p) => {
      const len = p.getTotalLength();
      gsap.fromTo(p, { strokeDasharray: len, strokeDashoffset: len }, {
        strokeDashoffset: 0, ease: 'none',
        scrollTrigger: { trigger: svg, start: 'top 80%', end: 'bottom 55%', scrub: 0.6 },
      });
    });
  });

  document.querySelectorAll<HTMLElement>('[data-focus-list]').forEach((list) => {
    const items = [...list.children] as HTMLElement[];
    items.forEach((el) => (el.dataset.state = 'ahead'));
    list.setAttribute('data-focus-ready', '');
    items.forEach((el) => {
      ScrollTrigger.create({
        // One reading line at 58% of the viewport. The end reaches across the gap to the next item,
        // so exactly one item is active at a time.
        trigger: el, start: 'top 58%', end: () => `bottom+=${parseFloat(getComputedStyle(list).rowGap) || 0} 58%`,
        onEnter: () => (el.dataset.state = 'active'),
        onEnterBack: () => (el.dataset.state = 'active'),
        onLeave: () => (el.dataset.state = 'past'),
        onLeaveBack: () => (el.dataset.state = 'ahead'),
      });
    });
    return () => { list.removeAttribute('data-focus-ready'); items.forEach((el) => delete el.dataset.state); };
  });

  document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
    const end = Number(el.dataset.count);
    const fmt = (n: number) => Math.round(n).toLocaleString(document.documentElement.lang);
    const state = { n: 0 };
    gsap.to(state, {
      n: end, duration: 1.6, ease: 'power2.out', onUpdate: () => (el.textContent = fmt(state.n)),
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    });
  });
});

// Images decoding late change layout; keep trigger positions honest.
addEventListener('load', () => ScrollTrigger.refresh());
export { gsap, ScrollTrigger, mm };
