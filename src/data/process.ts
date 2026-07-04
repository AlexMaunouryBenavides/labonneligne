/** Étapes de travail — séquence réelle, réutilisée (accueil + /nosotros). */
export interface ProcessStep {
  title: string;
  text: string;
}

export const processSteps: ProcessStep[] = [
  { title: 'Conversamos', text: 'Nos cuentas tu negocio y qué necesitas. Sin tecnicismos.' },
  { title: 'Propuesta', text: 'Te enviamos una propuesta clara, con plazo y precio en CLP.' },
  { title: 'Diseño', text: 'Creamos tu sitio y lo ajustamos contigo hasta dejarlo bien.' },
  { title: 'En línea', text: 'Publicamos y nos encargamos de que siga funcionando.' },
];
