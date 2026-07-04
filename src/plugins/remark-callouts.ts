/**
 * Callouts façon Obsidian, simplifiés — 4 types en espagnol (nota, tip,
 * importante, advertencia). Syntaxe : `> [!TIP] Titre optionnel`. Repris de
 * l'idée du template Lipi (docs/lipi-main), réduit à l'essentiel : pas
 * d'icônes ni de repli/dépli, juste un bloc bordé cohérent avec le système
 * de marque (bordure dure, libellé mono).
 */
import { visit } from 'unist-util-visit';
import type { Plugin } from 'unified';
import type { Root, RootContent, Blockquote, Paragraph, Text, Html } from 'mdast';

interface CalloutMapping {
  type: string;
  label: string;
}

const calloutMappings: Record<string, CalloutMapping> = {
  nota: { type: 'nota', label: 'Nota' },
  tip: { type: 'tip', label: 'Tip' },
  importante: { type: 'importante', label: 'Importante' },
  advertencia: { type: 'advertencia', label: 'Advertencia' },
};

export const remarkCallouts: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, 'blockquote', (node: Blockquote, index, parent) => {
      const firstChild = node.children[0];
      if (!firstChild || firstChild.type !== 'paragraph') return;

      const firstText = (firstChild as Paragraph).children[0];
      if (!firstText || firstText.type !== 'text') return;

      const text = (firstText as Text).value;
      const match = text.match(/^\[!([\w-]+)\](?:\s+(.+))?/);
      if (!match) return;

      const [fullMatch, calloutType, customTitle] = match;
      if (!calloutType) return;
      const mapping = calloutMappings[calloutType.toLowerCase()] ?? {
        type: 'nota',
        label: calloutType.charAt(0).toUpperCase() + calloutType.slice(1),
      };
      const label = customTitle || mapping.label;
      // Ne retire que l'espacement en tête (retour à la ligne après le marqueur) :
      // un espace/texte final doit être préservé, un nœud inline (gras, lien…)
      // peut suivre dans le même paragraphe (cf. callout multi-lignes).
      const remainingText = text.slice(fullMatch.length).replace(/^\s+/, '');

      let contentChildren: RootContent[] = [...node.children];
      if (remainingText) {
        (firstText as Text).value = remainingText;
      } else {
        contentChildren = contentChildren.slice(1);
      }

      const openHtml: Html = {
        type: 'html',
        value: `<div class="callout callout--${mapping.type}"><p class="callout__label">${label}</p><div class="callout__body">`,
      };
      const closeHtml: Html = { type: 'html', value: `</div></div>` };

      if (parent && typeof index === 'number') {
        parent.children.splice(index, 1, openHtml, ...contentChildren, closeHtml);
      }
    });
  };
};

export default remarkCallouts;
