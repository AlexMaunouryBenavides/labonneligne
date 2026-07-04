/**
 * Portfolio « La Bonne Ligne ».
 * `url` présent = réalisation réelle (lien « Ver sitio »). Sans `url` = exemple /
 * plantilla par secteur, présenté tel quel (cf. docs §6 bis). AUCUN faux
 * témoignage ni faux nom de client (ux.r13).
 */
export interface Project {
  name: string;
  sector: string;
  description: string;
  /** Lien vers le site en ligne, pour les réalisations réelles. */
  url?: string;
}

export const projects: Project[] = [
  {
    name: 'Occi Innoves',
    sector: 'Institucional',
    description: 'Sitio institucional con diseño a medida y enfoque en credibilidad.',
    url: 'https://occi-innovess.fr/',
  },
  {
    name: 'Madame Blasée',
    sector: 'Tienda online',
    description: 'Tienda en línea para venta directa, clara y fácil de comprar.',
    url: 'https://madame-blasee.sumupstore.com/',
  },
  {
    name: 'Café & Restaurante',
    sector: 'Gastronomía',
    description: 'Carta, horarios y reservas — pensado para que te encuentren en Google.',
  },
  {
    name: 'Salón de belleza',
    sector: 'Servicios',
    description: 'Servicios, galería y contacto por WhatsApp en un solo lugar.',
  },
  {
    name: 'Constructora',
    sector: 'Construcción',
    description: 'Proyectos, confianza y formulario para cotizar en minutos.',
  },
];
