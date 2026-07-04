/**
 * Constructeurs d'URLs de contact — source unique (clean-code.r13).
 * Garde la logique de présentation hors des composants (clean-archi-front.r2).
 */
import { site } from '../config/site';

const DEFAULT_WA_MESSAGE = 'Hola, quiero información sobre un sitio web.';

/** Lien WhatsApp (wa.me) avec message pré-rempli pour réduire la friction (ux.r8). */
export function whatsappUrl(message: string = DEFAULT_WA_MESSAGE): string {
  return `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function telHref(): string {
  return `tel:${site.contact.phone.replace(/\s/g, '')}`;
}

export function mailtoHref(): string {
  return `mailto:${site.contact.email}`;
}
