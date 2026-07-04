/** Ouvre les liens externes dans un nouvel onglet, en sécurité (rel). */
import { visit } from 'unist-util-visit';
import type { Root, Link, Data } from 'mdast';

interface HastData extends Data {
  hProperties?: Record<string, unknown>;
}

export function remarkExternalLinks() {
  return (tree: Root) => {
    visit(tree, 'link', (node: Link) => {
      const isExternal = /^https?:\/\//.test(node.url);
      if (!isExternal) return;

      const data: HastData = (node.data ??= {});
      data.hProperties = {
        ...(data.hProperties ?? {}),
        target: '_blank',
        rel: 'noopener noreferrer',
      };
    });
  };
}

export default remarkExternalLinks;
