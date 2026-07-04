## ADDED Requirements

### Requirement: Projet Astro statique et hygiène du repo

Le projet SHALL être un site Astro en rendu **statique** initialisé à la racine
de `monoweb`. Les dossiers `kit/` et `docs/` MUST être exclus du suivi Git via
`.gitignore`.

#### Scenario: Build statique

- **WHEN** on exécute le build du projet
- **THEN** Astro produit un site entièrement statique (pré-rendu) sans serveur
  permanent requis pour les pages

#### Scenario: Dossiers internes ignorés

- **WHEN** on inspecte l'état Git du repo
- **THEN** `kit/` et `docs/` n'apparaissent pas comme fichiers suivis

### Requirement: Langue et localisation es-CL

Le site SHALL être servi en espagnol du Chili. La racine HTML MUST porter
`lang="es-CL"` et l'ensemble du contenu visible MUST être en espagnol (le nom
de marque « La Bonne Ligne » restant en français).

#### Scenario: Attribut de langue

- **WHEN** une page est rendue
- **THEN** la balise `<html>` expose `lang="es-CL"`

#### Scenario: Contenu en espagnol

- **WHEN** un visiteur charge n'importe quelle page
- **THEN** le contenu (titres, navigation, textes) est en espagnol, hormis le
  nom de marque affiché en français

### Requirement: Design system épuré noir / blanc / orange

Le site SHALL définir des tokens de design (couleurs, typographie, espacements)
exprimant une base épurée noir/blanc avec l'orange en accent. Toute utilisation
de l'orange pour du **texte** MUST respecter un contraste WCAG AA (`ux.r11`,
guardrail).

#### Scenario: Tokens centralisés

- **WHEN** un composant a besoin d'une couleur ou d'une taille de police
- **THEN** il consomme un token central plutôt qu'une valeur codée en dur

#### Scenario: Contraste du texte orange

- **WHEN** de l'orange est utilisé sur du texte
- **THEN** le ratio de contraste atteint au moins WCAG AA (4.5:1 pour le texte
  courant), l'orange vif étant réservé aux gros éléments et accents

### Requirement: Layout commun avec navigation et footer NAP

Chaque page SHALL partager un layout commun comprenant un header avec la
navigation (`Inicio`, `Planes`, `Proyectos`, `Nosotros`, `Contacto`, `Blog`) et
un footer affichant le **NAP chilien** (nom, adresse/ville, téléphone) pour le
SEO local, ainsi que les liens réseaux sociaux.

#### Scenario: Navigation cohérente

- **WHEN** un visiteur change de page
- **THEN** le header et le footer restent identiques et la navigation pointe vers
  les six pages avec les mêmes libellés (`ux.r5`)

#### Scenario: NAP présent partout

- **WHEN** une page quelconque est affichée
- **THEN** le footer expose le NAP chilien de l'agence

### Requirement: WhatsApp persistant

Toutes les pages SHALL exposer un accès WhatsApp persistant (bouton sticky sur
mobile) comme canal de conversion principal.

#### Scenario: Bouton sticky mobile

- **WHEN** un visiteur consulte le site sur mobile
- **THEN** un bouton WhatsApp reste accessible à l'écran sur toutes les pages

### Requirement: Base SEO et données structurées locales

Le site SHALL fournir, pour chaque page, un titre et une meta-description, un
sitemap, et des données structurées d'organisation locale (NAP) pour appuyer le
SEO local sur Google.cl.

#### Scenario: Métadonnées par page

- **WHEN** une page est rendue
- **THEN** elle possède un `<title>` et une `<meta name="description">` propres

#### Scenario: Données structurées d'organisation

- **WHEN** un moteur lit la page d'accueil
- **THEN** il trouve des données structurées décrivant l'organisation locale (NAP)

### Requirement: Performance et accessibilité de base

Les pages SHALL être mobile-first, avec des cibles tactiles ≥ 44 px, des images
compressées et chargées en lazy-load hors écran, et une navigation complète au
clavier (`ux.r9`, `ux.r10`, `ux.r11`).

#### Scenario: Images optimisées

- **WHEN** une page contient des images hors du premier écran
- **THEN** ces images sont chargées en lazy-load et servies compressées

#### Scenario: Navigation clavier

- **WHEN** un utilisateur navigue au clavier
- **THEN** tous les éléments interactifs sont atteignables avec un focus visible
