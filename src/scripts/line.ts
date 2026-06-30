/**
 * « La ligne » qui se trace — animation signature (GSAP).
 * Trace au chargement tous les <path class="js-draw"> (monogramme du logo,
 * futurs traits de hero/séparateurs). Sert la lecture, ne décore pas (ux.r12).
 * Respecte prefers-reduced-motion (ux.r11) : aucun mouvement, logo plein.
 */
import { gsap } from 'gsap';

export function initLineDraw(): void {
  const paths = document.querySelectorAll<SVGPathElement>('.js-draw');
  if (paths.length === 0) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  paths.forEach((path) => {
    const length = path.getTotalLength();
    // État initial : trait « non encore tracé ».
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
  });

  if (prefersReduced) {
    // Pas d'animation : on révèle directement.
    gsap.set(paths, { strokeDashoffset: 0 });
    return;
  }

  gsap.to(paths, {
    strokeDashoffset: 0,
    duration: 0.9,
    ease: 'power2.out',
    stagger: 0.18,
  });
}
