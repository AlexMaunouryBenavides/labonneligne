## ADDED Requirements

### Requirement: Structure de blog via content collections

Le site SHALL définir une content collection Astro pour les articles de blog,
avec un schéma typé (titre, description, date, catégorie, image optionnelle). Le
blog MUST être vide au lancement mais entièrement câblé.

#### Scenario: Collection câblée et vide

- **WHEN** on inspecte le projet au lancement
- **THEN** la content collection du blog existe avec son schéma, sans article
  publié

#### Scenario: Ajout d'un article

- **WHEN** un fichier d'article conforme au schéma est ajouté
- **THEN** il apparaît automatiquement dans le blog sans modification de code

### Requirement: Page liste du blog

La page `/blog` SHALL lister les articles publiés, triés par date décroissante,
et afficher un état vide explicite tant qu'aucun article n'existe.

#### Scenario: État vide

- **WHEN** aucun article n'est publié
- **THEN** `/blog` affiche un message d'état vide plutôt qu'une page cassée

#### Scenario: Liste des articles

- **WHEN** des articles existent
- **THEN** ils sont listés du plus récent au plus ancien

### Requirement: Page article et catégories

Le blog SHALL fournir une page d'article individuelle et un regroupement par
catégorie, chaque article disposant de ses propres métadonnées SEO (titre,
description).

#### Scenario: Rendu d'un article

- **WHEN** un visiteur ouvre un article
- **THEN** la page affiche son contenu et expose ses métadonnées SEO propres

#### Scenario: Filtrage par catégorie

- **WHEN** un visiteur sélectionne une catégorie
- **THEN** seuls les articles de cette catégorie sont affichés
