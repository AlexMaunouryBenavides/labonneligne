## 1. Initialisation & hygiène du repo

- [x] 1.1 Initialiser le projet Astro à la racine de `monoweb` (rendu statique)
- [x] 1.2 Ajouter `kit/` et `docs/` (et `content/`, `node_modules`, build) au `.gitignore`
- [x] 1.3 Ajouter les dépendances : Astro, intégration sitemap, GSAP, client Resend
- [x] 1.4 Configurer l'adaptateur / build pour Cloudflare Pages
- [x] 1.5 Centraliser les coordonnées (tél, email, WhatsApp, NAP) dans un fichier de config

## 2. Design system & layout commun

- [x] 2.1 Définir les tokens (couleurs noir/blanc, orange-accent + orange-texte AA, typo, espacements)
- [x] 2.2 Vérifier le contraste WCAG AA du texte orange (`ux.r11`) — orange-ink 5.18:1 PASS
- [x] 2.3 Créer le layout commun `<html lang="es-CL">` avec métadonnées SEO par page
- [x] 2.4 Header + navigation (Inicio, Planes, Proyectos, Nosotros, Contacto, Blog)
- [x] 2.5 Footer avec NAP chilien + liens réseaux sociaux
- [x] 2.6 Bouton WhatsApp sticky (mobile) présent sur toutes les pages
- [x] 2.7 Intégrer le logo (recréé en SVG animable + lockup PNG) dans le header
- [x] 2.8 Câbler GSAP (chargement non bloquant) + animation de tracé « la ligne »

## 3. Pages marketing

- [x] 3.1 Page `/` : hero (nom + descripteur ES + slogan + CTA), un H1 unique
- [x] 3.2 Accueil : sections accroche, aperçu plans, aperçu proyectos, por qué, cómo, CTA final
- [x] 3.3 Composant carte d'offre + toggle compra única / arriendo (vérifié : $29.000/mes)
- [x] 3.4 Page `/planes` : 3 niveaux en CLP, inclusions communes, SEA « sobre cotización », FAQ courte (sans rachat 80 %)
- [x] 3.5 Composant carte de projet (visuel + description, sans faux témoignage)
- [x] 3.6 Page `/proyectos` : réalisations réelles + concepts/templates
- [x] 3.7 Page `/nosotros` : positionnement du duo, méthode, garanties

## 4. Formulaire de contact serverless

- [x] 4.1 Page `/contacto` : formulaire 3 champs (nombre, contacto, mensaje) + coordonnées + WhatsApp
- [x] 4.2 Validation inline + messages d'erreur en clair, situés près du champ (`ux.r8`)
- [x] 4.3 États de feedback « Enviando… → Enviado ✓ » + gestion de l'échec (`ux.r6`)
- [x] 4.4 Champ honeypot anti-spam
- [x] 4.5 Cloudflare Pages Function : envoi via Resend, `RESEND_API_KEY` en variable d'env
- [x] 4.6 Vérifier que le secret Resend n'apparaît pas dans le bundle client

## 5. Blog (câblé, vide)

- [x] 5.1 Définir la content collection blog + schéma typé (titre, description, date, catégorie, image?)
- [x] 5.2 Page `/blog` : liste triée par date décroissante + état vide explicite
- [x] 5.3 Page article individuelle avec métadonnées SEO propres
- [x] 5.4 Regroupement / filtrage par catégorie

## 6. SEO, accessibilité & finitions

- [x] 6.1 Données structurées d'organisation locale (NAP) sur l'accueil
- [x] 6.2 Générer le sitemap + titres/meta-descriptions par page
- [x] 6.3 Optimiser les images (compression + lazy-load hors écran) (`ux.r10`)
- [x] 6.4 Vérifier la navigation clavier complète + focus visible (`ux.r11`)
- [x] 6.5 Vérifier le responsive mobile-first (cibles ≥ 44 px, pas de scroll horizontal) (`ux.r9`)
- [x] 6.6 Passe finale règles `kit/` (ux, clean-archi-front, seo) + build de validation
