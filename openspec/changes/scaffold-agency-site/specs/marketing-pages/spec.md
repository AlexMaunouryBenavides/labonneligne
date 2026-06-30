## ADDED Requirements

### Requirement: Page d'accueil orientée conversion
La page `/` (inicio) SHALL être structurée autour de l'objectif du prospect
(juger la crédibilité de l'agence et la contacter), avec un hero portant le nom
« La Bonne Ligne », le descripteur espagnol (`diseño web para pymes`), le slogan
et un CTA de contact visible sans scroll (`ux.r2`).

#### Scenario: Compréhension immédiate
- **WHEN** un visiteur arrive sur la page d'accueil
- **THEN** il comprend sans scroller ce que propose l'agence et voit un CTA de
  contact

#### Scenario: Sections de soutien
- **WHEN** le visiteur fait défiler l'accueil
- **THEN** il rencontre, dans cet ordre, l'accroche de valeur, un aperçu des
  plans, un aperçu des réalisations, le « pourquoi nous » et le processus, puis
  un CTA final

### Requirement: Grille d'offres chiffrée avec toggle achat / arriendo
La page `/planes` SHALL présenter les trois niveaux (Vitrine, Standard, Sur
mesure) avec un toggle entre **compra única** et **arriendo 12-24 meses**. Les
prix affichés MUST être en CLP. Le niveau Sur mesure SHALL être présenté comme
« a conversar ». La page MUST rester transparente sur ce qui est affiché et NE
PAS révéler le rachat à 80 % (`ux.r13`).

#### Scenario: Prix affichés en CLP
- **WHEN** un visiteur consulte les plans
- **THEN** Vitrine (250.000 / 29.000·mes), Standard (350.000 / 45.000·mes) et
  Sur mesure (« a conversar ») sont affichés en pesos chiliens

#### Scenario: Bascule des modes de paiement
- **WHEN** le visiteur active le toggle
- **THEN** l'affichage bascule entre prix d'achat unique et prix mensuel d'arriendo

#### Scenario: Inclusions communes
- **WHEN** un plan est affiché
- **THEN** les inclusions communes (HTTPS, SEO básico, hébergement et maintenance
  en arriendo) sont indiquées, et le SEA est présenté « sobre cotización »

### Requirement: Page réalisations
La page `/proyectos` SHALL présenter un portfolio de projets : les réalisations
réelles (`occi-innovess.fr`, `madame-blasee`) et des projets concepts exposés
comme templates réutilisables. La page MUST NE PAS comporter de faux témoignages
ni de faux noms de clients (`ux.r13`).

#### Scenario: Affichage des projets
- **WHEN** un visiteur consulte les réalisations
- **THEN** chaque projet est présenté avec un visuel et une courte description,
  sans témoignage ni attribution de client fictif

### Requirement: Page à propos
La page `/nosotros` SHALL raconter le positionnement « technologie française,
présence chilienne » (le duo), la méthode et les garanties (délai, nombre de
révisions, satisfaction).

#### Scenario: Présentation du duo et des garanties
- **WHEN** un visiteur consulte la page à propos
- **THEN** il y trouve le positionnement du duo et les garanties offertes

### Requirement: Hiérarchie et minimalisme du contenu
Chaque page marketing SHALL exposer un H1 unique, une hiérarchie d'information
claire (du général au détail) et rester épurée, sans éléments décoratifs
superflus (`ux.r3`, `ux.r12`). Les animations GSAP MUST servir la lecture
(guider l'œil, feedback) et non décorer.

#### Scenario: Un H1 par page
- **WHEN** une page marketing est rendue
- **THEN** elle comporte exactement un `<h1>` décrivant son sujet principal

#### Scenario: Animations au service de la lecture
- **WHEN** une animation GSAP est présente
- **THEN** elle appuie la hiérarchie ou le feedback et peut être retirée sans
  perdre d'information essentielle
