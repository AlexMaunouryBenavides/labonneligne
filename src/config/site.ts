/**
 * Source unique des données de marque et de contact.
 * Les coordonnées sont des PLACEHOLDERS (cf. docs/agence-web-decisions.md) :
 * remplacer ces valeurs au moment de la mise en ligne.
 */
export const site = {
  // Marque
  name: 'La Bonne Ligne', // nom en français, affiché tel quel
  descriptor: 'diseño web para pymes', // sous-titre es-CL sous le logo
  tagline: 'Creamos la presencia web que tu empresa merece.', // accroche
  slogan: 'La buena línea para tu negocio.', // signature

  // Localisation
  lang: 'es-CL',
  locale: 'es_CL',

  // Contact (NAP chilien — placeholders)
  contact: {
    phone: '+56 9 0000 0000',
    whatsapp: '56900000000', // format international sans '+', pour wa.me
    email: 'contacto@labonnelinea.cl',
    /** Adresse de réception des messages du formulaire (Resend). */
    inboxTo: 'contacto@labonnelinea.cl',
    city: 'Chile',
    region: 'Chile',
  },

  // Réseaux sociaux (placeholders)
  social: {
    facebook: 'https://facebook.com/',
    instagram: 'https://instagram.com/',
    tiktok: 'https://tiktok.com/',
  },
} as const;

export type Site = typeof site;
