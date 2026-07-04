/**
 * Accès et dérivations de la collection blog — logique hors des composants
 * (clean-archi-front.r2), source unique pour la liste, les articles et les
 * catégories (clean-code.r13).
 */
import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

/** Articles publiés (hors brouillons), du plus récent au plus ancien. */
export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/** Slug d'URL sûr à partir d'un libellé de catégorie (accents/espaces gérés). */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export interface CategoryEntry {
  name: string;
  slug: string;
  count: number;
}

/** Catégories distinctes présentes dans les articles, triées par nom. */
export function collectCategories(posts: Post[]): CategoryEntry[] {
  const byslug = new Map<string, CategoryEntry>();
  for (const post of posts) {
    const name = post.data.category;
    const slug = slugify(name);
    const existing = byslug.get(slug);
    if (existing) existing.count += 1;
    else byslug.set(slug, { name, slug, count: 1 });
  }
  return [...byslug.values()].sort((a, b) => a.name.localeCompare(b.name, 'es'));
}
