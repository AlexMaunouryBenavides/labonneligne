## ADDED Requirements

### Requirement: Formulaire de contact minimal

La page `/contacto` SHALL exposer un formulaire à **3 champs** (nombre, contacto,
mensaje). Chaque champ demandé MUST être justifié ; aucun champ superflu (`ux.r8`).

#### Scenario: Champs du formulaire

- **WHEN** un visiteur ouvre la page contact
- **THEN** le formulaire ne demande que nombre, contacto et mensaje

### Requirement: Validation et messages d'erreur en clair

Le formulaire SHALL valider les saisies côté client avant envoi et afficher des
messages d'erreur en langage clair, situés près du champ fautif, indiquant quoi
corriger (`ux.r8`). Aucun code d'erreur brut MUST être présenté à l'utilisateur.

#### Scenario: Champ requis manquant

- **WHEN** un visiteur tente d'envoyer sans remplir un champ requis
- **THEN** un message clair s'affiche près du champ concerné et l'envoi est bloqué

#### Scenario: Format invalide

- **WHEN** un contacto au format invalide est saisi
- **THEN** un message explique le format attendu (ex. `nombre@dominio.cl`)

### Requirement: États de feedback visibles

Le formulaire SHALL afficher un retour visible et immédiat aux états d'envoi :
en cours, succès et erreur (`ux.r6`).

#### Scenario: Envoi en cours puis succès

- **WHEN** un visiteur envoie un formulaire valide
- **THEN** le bouton passe à un état « Enviando… » puis à un état de succès
  « Enviado ✓ »

#### Scenario: Échec d'envoi

- **WHEN** l'envoi échoue côté serveur
- **THEN** un message d'erreur compréhensible invite à réessayer, sans perdre la
  saisie

### Requirement: Route serverless d'envoi d'email

Le formulaire SHALL être traité par une **Cloudflare Pages Function** qui envoie
l'email via **Resend** vers l'adresse de contact configurée. La clé d'API Resend
MUST être lue depuis une variable d'environnement et NE JAMAIS être exposée côté
client.

#### Scenario: Email transmis

- **WHEN** un formulaire valide est soumis
- **THEN** la fonction serverless envoie via Resend un email contenant les
  informations saisies à l'adresse de contact

#### Scenario: Secret protégé

- **WHEN** on inspecte le bundle client
- **THEN** la clé d'API Resend n'y figure pas

### Requirement: Protection anti-spam de base

La route de formulaire SHALL inclure une protection anti-spam minimale (par
exemple honeypot) sans ajouter de friction pour l'utilisateur légitime.

#### Scenario: Soumission honeypot

- **WHEN** un bot remplit le champ honeypot caché
- **THEN** la soumission est rejetée silencieusement sans envoi d'email
