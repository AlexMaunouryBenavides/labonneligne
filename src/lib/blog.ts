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

export interface TagEntry {
  name: string;
  slug: string;
  count: number;
}

/** Tags distincts présents dans les articles, triés par nom. */
export function collectTags(posts: Post[]): TagEntry[] {
  const byslug = new Map<string, TagEntry>();
  for (const post of posts) {
    for (const name of post.data.tags ?? []) {
      const slug = slugify(name);
      const existing = byslug.get(slug);
      if (existing) existing.count += 1;
      else byslug.set(slug, { name, slug, count: 1 });
    }
  }
  return [...byslug.values()].sort((a, b) => a.name.localeCompare(b.name, 'es'));
}

/** Voisins chronologiques d'un article (plus récent / plus ancien). */
export function getAdjacentPosts(
  posts: Post[],
  current: Post,
): { prev: Post | null; next: Post | null } {
  const index = posts.findIndex((p) => p.id === current.id);
  if (index === -1) return { prev: null, next: null };
  return {
    // Liste triée du plus récent au plus ancien : « prev » = publié avant (plus ancien).
    prev: posts[index + 1] ?? null,
    next: posts[index - 1] ?? null,
  };
}

/** Articles proches par tags/catégorie partagés (score décroissant). */
export function getRelatedPosts(current: Post, posts: Post[], limit = 3): Post[] {
  const currentTags = current.data.tags ?? [];
  return posts
    .filter((p) => p.id !== current.id)
    .map((post) => {
      const sharedTags = currentTags.filter((tag) => post.data.tags?.includes(tag)).length;
      const sameCategory = post.data.category === current.data.category ? 1 : 0;
      return { post, score: sharedTags * 10 + sameCategory * 3 };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.post);
}

/** Temps de lecture estimé (200 mots/min), à partir du corps Markdown brut. */
export function readingTime(body: string | undefined): string {
  const plainText = (body ?? '')
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/`{1,3}.*?`{1,3}/gs, '')
    .replace(/#{1,6}\s+/g, '')
    .replace(/[*_~`]/g, '')
    .trim();
  const words = plainText.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min de lectura`;
}
