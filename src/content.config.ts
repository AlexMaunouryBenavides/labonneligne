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
 *   updated: 2026-02-01       # optionnel (affiche « actualizado el »)
 *   category: 'seo'
 *   tags: ['seo', 'google']   # optionnel — active les pages /blog/tags/*
 *   image: './portada.jpg'    # optionnel
 *   draft: false              # optionnel (true = non publié)
 *   ---
 */
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      updated: z.coerce.date().optional(),
      category: z.string(),
      tags: z.array(z.string()).optional(),
      image: image().optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { blog };
