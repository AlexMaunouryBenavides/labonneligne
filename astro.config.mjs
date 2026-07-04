// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import remarkCallouts from './src/plugins/remark-callouts.ts';
import remarkExternalLinks from './src/plugins/remark-external-links.ts';

// NOTE: domaine non encore acheté → `site` est un placeholder à remplacer
// au moment de la mise en ligne (impacte sitemap + URLs canoniques).
export default defineConfig({
  site: 'https://labonnelinea.cl',
  // Rendu statique : seul le formulaire de contact est dynamique, traité par
  // une Cloudflare Pages Function (dossier `functions/`), pas par un adaptateur SSR.
  output: 'static',
  integrations: [sitemap()],
  markdown: {
    // Processeur remark/rehype classique (requis pour nos plugins remark maison :
    // callouts + liens externes, cf. src/plugins/).
    processor: unified({
      remarkPlugins: [remarkCallouts, remarkExternalLinks],
    }),
  },
});
