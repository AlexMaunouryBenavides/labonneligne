/**
 * Offres « La Bonne Ligne » — source unique (cf. docs/agence-web-decisions.md §4).
 * Prix en CLP. Deux modes de paiement : compra única / arriendo 12-24 meses.
 * Le rachat à 80 % du cumul N'EST PAS exposé ici (levier de négociation — ux.r13).
 */
export interface Plan {
  id: string;
  name: string;
  tagline: string;
  /** Prix d'achat unique (CLP) ; null pour le sur-mesure. */
  priceOnce: number | null;
  /** Prix mensuel en arriendo (CLP) ; null pour le sur-mesure. */
  priceMonth: number | null;
  features: string[];
  /** Mention discrète sous les features (ce qui n'est pas inclus). */
  note?: string;
  /** Plan mis en avant visuellement. */
  highlighted?: boolean;
  /** Sur-mesure : prix « a conversar » au lieu de chiffres. */
  custom?: boolean;
}

export const plans: Plan[] = [
  {
    id: 'vitrina',
    name: 'Vitrina',
    tagline: 'Tu presencia esencial, lista para convencer.',
    priceOnce: 250000,
    priceMonth: 29000,
    features: ['Hasta 5 páginas', 'Diseño a medida', 'SEO básico', 'HTTPS y hospedaje incluidos'],
    note: 'Sin back-end ni nombre de dominio.',
  },
  {
    id: 'estandar',
    name: 'Estándar',
    tagline: 'Más páginas y un formulario que trae clientes.',
    priceOnce: 350000,
    priceMonth: 45000,
    features: [
      'Hasta 10 páginas',
      'Formulario de contacto',
      'SEO básico',
      'HTTPS y hospedaje incluidos',
    ],
    note: 'Sin back-end ni nombre de dominio.',
    highlighted: true,
  },
  {
    id: 'a-medida',
    name: 'A medida',
    tagline: 'Sin límites. Lo construimos a tu medida.',
    priceOnce: null,
    priceMonth: null,
    features: ['Páginas ilimitadas', 'Funcionalidades a medida', 'Tiendas online y back-end'],
    custom: true,
  },
];

/** Inclus dans toutes les offres (rappel transversal). */
export const includedEverywhere: string[] = [
  'HTTPS',
  'SEO básico',
  'Hospedaje (en arriendo)',
  'Mantención (en arriendo)',
];
