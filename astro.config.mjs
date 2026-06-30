// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// NOTE: domaine non encore acheté → `site` est un placeholder à remplacer
// au moment de la mise en ligne (impacte sitemap + URLs canoniques).
export default defineConfig({
  site: 'https://labonnelinea.cl',
  // Rendu statique : seul le formulaire de contact est dynamique, traité par
  // une Cloudflare Pages Function (dossier `functions/`), pas par un adaptateur SSR.
  output: 'static',
  integrations: [sitemap()],
});
