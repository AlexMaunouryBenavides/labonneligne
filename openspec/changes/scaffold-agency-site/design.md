## Context

Vitrine de l'agence « La Bonne Ligne », ciblant les PME chiliennes en es-CL sur
Google.cl. Tout le cadrage est figé dans `docs/agence-web-decisions.md` : Astro
statique, hébergement Cloudflare Pages, formulaire serverless via Resend, design
épuré noir/blanc + orange, GSAP en accent. C'est un projet neuf à la racine de
`monoweb` ; `kit/` (règles eng-kit) et `docs/` (cadrage) sont des dossiers de
travail à exclure du suivi Git. Les règles UX du kit (`kit/rules/frontend/ux.md`)
font autorité sur les choix d'interface, dont deux guardrails : `ux.r11`
(accessibilité) et `ux.r13` (honnêteté / pas de dark pattern).

## Goals / Non-Goals

**Goals:**
- Site Astro statique, performant et SEO-ready dès le départ.
- Pattern formulaire serverless **codé une fois, recopiable** sur les futurs
  sites clients (coût marginal ≈ 0).
- Blog câblé mais vide, prêt à recevoir du contenu sans refonte.
- Design system centralisé (tokens) cohérent avec la direction visuelle décidée.
- Respect des guardrails UX (contraste, honnêteté) et des règles front du kit.

**Non-Goals:**
- Aucun CMS, back-office, base de données ou authentification.
- Pas de prise de RDV (Cal.com écarté), pas de e-commerce.
- Pas de contenu d'articles de blog réel, pas de vraie image de logo (placeholder).
- Pas d'achat de domaine ni de configuration DNS de production à ce stade.
- Pas d'i18n multilingue (es-CL uniquement).

## Decisions

### Astro statique + une seule Pages Function
Tout le site est pré-rendu en statique. La **seule** partie dynamique est la
route du formulaire, implémentée en Cloudflare Pages Function (`functions/`).
Alternative écartée : un endpoint Astro en SSR (« server island ») — viable, mais
la Pages Function isole proprement le secret Resend et reste réutilisable
verbatim d'un site client à l'autre, ce qui est l'objectif business.

### Resend pour l'email, secret en variable d'environnement
Envoi via Resend depuis la fonction serverless ; `RESEND_API_KEY` lue depuis
l'environnement Cloudflare, jamais bundlée côté client. Alternative écartée :
service tiers type Web3Forms — gardé en secours/one-shot, mais pas comme pattern
principal car moins maîtrisé et non réutilisable « maison ».

### Design system par tokens CSS
Couleurs (noir, blanc, orange-accent, orange-texte assombri), typographie et
espacements définis comme tokens centraux (CSS custom properties). Deux nuances
d'orange : une vive pour les gros accents, une assombrie validée WCAG AA pour le
texte (résout `ux.r11`). Alternative écartée : valeurs codées en dur — rejetée
pour cohérence et maintenabilité (`ux.r5`).

### GSAP en accent, chargé de façon ciblée
GSAP pilote des animations qui **servent la lecture** (tracé de « la ligne » au
hero, transitions de section, micro-feedback), pas de la décoration (`ux.r12`).
Chargement non bloquant pour préserver la performance perçue (`ux.r10`).

### Layout unique + composants partagés
Un layout Astro commun porte `<html lang="es-CL">`, header/nav, footer NAP,
métadonnées SEO et le bouton WhatsApp sticky. Les pages ne définissent que leur
contenu. La grille d'offres et les cartes de projet sont des composants
réutilisables.

### Contenu es-CL au plus près des pages
Pas de système i18n : le site est mono-langue es-CL, le contenu vit directement
dans les pages/composants. Le nom de marque reste en français.

## Risks / Trade-offs

- **Contraste orange (`ux.r11`, guardrail)** → définir dès les tokens une nuance
  d'orange-texte validée AA ; réserver l'orange vif aux surfaces/accents.
- **Honnêteté des « conceptos » (`ux.r13`, guardrail)** → les montrer comme
  templates/démos, sans aucun faux témoignage ni nom de client fictif.
- **Tension minimalisme vs audace GSAP** → critère de tri : toute animation
  retirable sans perte d'information est candidate à la suppression.
- **Dépendance Cloudflare Pages Functions** → le pattern est spécifique à
  Cloudflare ; acceptable car c'est l'hébergement retenu et le secours Web3Forms
  existe.
- **Délivrabilité email Resend** (domaine non encore acheté) → en attendant le
  domaine, utiliser un expéditeur de test Resend ; basculer sur le domaine
  vérifié au moment de la mise en ligne.
- **Données fictives de contact** (tél/email/WhatsApp placeholders) →
  centraliser ces valeurs en config pour un remplacement trivial.

## Migration Plan

Projet neuf : pas de migration de données. Déploiement = build Astro publié sur
Cloudflare Pages, avec `RESEND_API_KEY` et l'adresse de contact configurées en
variables d'environnement. Rollback = redéploiement du commit précédent
(déploiements immuables Cloudflare Pages).

## Open Questions

- Coordonnées réelles (tél/email/WhatsApp chiliens) et nom de domaine `.cl` :
  placeholders centralisés pour l'instant, à remplacer plus tard.
- Banque d'images : sourcing des visuels (concepts + hero) à prévoir.
- Modèle de tarif SEA (« sobre cotización » affiché) : formule exacte à arrêter
  avec le cousin, sans impact sur le code à ce stade.
