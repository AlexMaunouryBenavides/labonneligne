## Why

L'agence « La Bonne Ligne » a besoin de sa vitrine pour crédibiliser les prospects
amenés par le cousin et le SEA, et commencer à capter du SEO organique. Le cadrage
produit, business et UX est terminé (`docs/agence-web-decisions.md`) ; il faut
maintenant matérialiser le site en code. On câble dès le jour 1 la capacité
contenu/blog et le pattern formulaire serverless pour que le passage
« vitrine → capteur de leads » soit une montée en contenu, pas une refonte.

## What Changes

- Initialisation d'un projet **Astro statique** à la racine de `monoweb`, avec
  `kit/` et `docs/` placés en `.gitignore`.
- Mise en place du **design system** : palette épurée noir / blanc + orange en
  accent (contraste WCAG cadré, cf. `ux.r11`), typographie, layout commun
  (header avec nav `Planes`, footer porteur du **NAP chilien** pour le SEO local),
  WhatsApp sticky mobile sur toutes les pages.
- Création des **pages marketing** en es-CL : `/` (inicio), `/planes`,
  `/proyectos`, `/nosotros`, avec la grille d'offres chiffrée (CLP) et le toggle
  achat unique / arriendo.
- **Formulaire de contact serverless** (Cloudflare Pages Functions + Resend),
  3 champs, validation inline et états de feedback visibles.
- **Blog** vide mais câblé (Astro content collections, liste + structure
  d'article + catégories) prêt pour le SEO organique.
- **Base SEO/i18n** : `lang="es-CL"`, métadonnées, sitemap, données structurées
  d'organisation locale (NAP).
- Application des règles `kit/` pertinentes (front, ux, clean-archi-front, seo).

## Capabilities

### New Capabilities

- `site-foundation`: scaffold Astro statique, hygiène du repo (`.gitignore`),
  design system (palette, typo, tokens), layout commun (header/nav/footer/NAP),
  base SEO/i18n es-CL, WhatsApp sticky.
- `marketing-pages`: pages `inicio`, `planes`, `proyectos`, `nosotros` — contenu
  es-CL, grille d'offres avec prix CLP et toggle achat/arriendo, sections de
  crédibilité (réalisations réelles + concepts/templates, garanties).
- `contact-form`: route serverless (Cloudflare Functions + Resend), formulaire
  3 champs, validation, feedback « Enviando… → Enviado ✓ », accès WhatsApp.
- `blog`: structure de blog via content collections (liste, article, catégories),
  vide au lancement, prête à publier.

### Modified Capabilities

<!-- Aucune : projet neuf, pas de spec existante à modifier. -->

## Impact

- **Nouveau projet** : Astro à la racine de `monoweb` (config, `src/`, `public/`).
- **Dépendances** : `astro`, intégration GSAP (animations d'accent), client Resend
  côté fonction ; aucun CMS, aucune base de données.
- **Hébergement / runtime** : Cloudflare Pages (statique) + Pages Functions pour
  la seule route du formulaire ; secret d'API Resend en variable d'environnement.
- **Repo** : `kit/` et `docs/` exclus du suivi Git (`.gitignore`).
- **Hors périmètre** : vrai back-end / WooCommerce (sur-mesure facturé à part),
  prise de RDV (Cal.com écarté), achat de domaine, contenu réel des articles de blog,
  vraie image de logo (placeholder conservé).
