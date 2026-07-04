// Couche d'enforcement « zéro token » (kit/AGENTS.kit.md §4).
// Encode ici les règles `Vérifié par: eslint` pour les retirer de la revue manuelle.
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';

export default tseslint.config(
  { ignores: ['dist/', '.astro/', 'node_modules/', 'kit/', 'docs/'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  {
    rules: {
      // typescript.r4 — unknown, jamais any
      '@typescript-eslint/no-explicit-any': 'error',
      // clean-code.r4 — peu d'arguments
      'max-params': ['warn', 4],
      // clean-code.r3 — fonctions petites, peu complexes
      complexity: ['warn', 12],
      // clean-code — égalité stricte, pas de var, pas de console oublié
      eqeqeq: ['error', 'smart'],
      'no-var': 'error',
      'prefer-const': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
);
