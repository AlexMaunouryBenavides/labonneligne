/**
 * Révèle au scroll tous les `.reveal` d'une section, avec un léger décalage
 * entre frères (stagger). Respecte prefers-reduced-motion (le CSS applique
 * directement l'état final via la media query — voir global.css).
 */
export function initReveal(): void {
  const reveals = document.querySelectorAll<HTMLElement>('.reveal');
  if (reveals.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const target = entry.target as HTMLElement;
        const siblings = Array.from(target.parentElement?.querySelectorAll('.reveal') ?? []);
        const index = siblings.indexOf(target);
        target.style.transitionDelay = `${index * 0.06}s`;
        target.classList.add('is-visible');
        observer.unobserve(target);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -30px 0px' },
  );

  reveals.forEach((el) => observer.observe(el));
}
