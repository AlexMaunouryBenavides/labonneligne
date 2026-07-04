/**
 * Bénéfices « Qué obtienes » — valeur livrée, bénéfices PARALLÈLES (pas une
 * séquence : donc pas de numérotation 01/02/03). Partagé accueil + atelier.
 * `icon` sert aux directions à pictogrammes tracés (« la ligne »).
 */
export type BenefitIcon = 'design' | 'search' | 'shield';

export interface Benefit {
  title: string;
  text: string;
  icon: BenefitIcon;
}

export const benefits: Benefit[] = [
  {
    title: 'Diseño que convence',
    text: 'Un sitio claro y moderno que da confianza desde el primer segundo.',
    icon: 'design',
  },
  {
    title: 'Te encuentran en Google',
    text: 'SEO pensado para que tus clientes te encuentren en Chile.',
    icon: 'search',
  },
  {
    title: 'Sin complicaciones',
    text: 'Nos encargamos del hospedaje y la mantención. Tú, de tu negocio.',
    icon: 'shield',
  },
];
