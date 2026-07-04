import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Collection blog — câblée mais VIDE au lancement (blog spec). Ajouter un
 * fichier Markdown conforme dans `src/content/blog/` suffit à publier un
 * article, sans toucher au code.
 *
 * Modèle de frontmatter :
 *   ---
 *   title: 'Titre de l’article'
 *   description: 'Résumé pour le SEO et la liste.'
 *   date: 2026-01-15
 *   category: 'seo'
 *   image: './portada.jpg'   # optionnel
 *   draft: false             # optionnel (true = non publié)
 *   ---
 */
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      category: z.string(),
      image: image().optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { blog };
