/**
 * Validation partagée du formulaire de contact — source unique côté client ET
 * côté Cloudflare Pages Function (clean-code.r13). Messages en clair es-CL, sans
 * code d'erreur brut (ux.r8). Aucune dépendance au DOM : le module est
 * réutilisable dans le navigateur comme dans la fonction serverless.
 */

export const CONTACT_FIELDS = ['nombre', 'contacto', 'mensaje'] as const;
export type ContactField = (typeof CONTACT_FIELDS)[number];

/** Champ leurre anti-spam : caché à l'humain, seul un bot le remplit. */
export const HONEYPOT_FIELD = 'empresa';

export interface ContactPayload {
  nombre: string;
  contacto: string;
  mensaje: string;
}

export type ContactErrors = Partial<Record<ContactField, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+()\d\s-]{8,20}$/;

export function isEmail(value: string): boolean {
  return EMAIL_RE.test(value.trim());
}

type FieldValidator = (value: string) => string | null;

/** Un validateur par champ ; garde chaque règle courte et testable. */
const VALIDATORS: Record<ContactField, FieldValidator> = {
  nombre(value) {
    if (!value) return 'Escribe tu nombre.';
    if (value.length < 2) return 'Tu nombre es demasiado corto.';
    if (value.length > 80) return 'Tu nombre es demasiado largo.';
    return null;
  },
  contacto(value) {
    if (!value) return 'Déjanos un email o teléfono para responderte.';
    if (!EMAIL_RE.test(value) && !PHONE_RE.test(value))
      return 'Escribe un email válido (nombre@dominio.cl) o un teléfono.';
    return null;
  },
  mensaje(value) {
    if (!value) return 'Cuéntanos qué necesitas.';
    if (value.length < 10) return 'Cuéntanos un poco más (mínimo 10 caracteres).';
    if (value.length > 2000) return 'Tu mensaje es demasiado largo.';
    return null;
  },
};

/** Valide un champ ; retourne le message d'erreur es-CL ou `null` si OK. */
export function validateField(field: ContactField, raw: string): string | null {
  return VALIDATORS[field](raw.trim());
}

/** Valide l'ensemble du formulaire ; map vide = aucune erreur. */
export function validateContactForm(data: ContactPayload): ContactErrors {
  const errors: ContactErrors = {};
  for (const field of CONTACT_FIELDS) {
    const message = validateField(field, data[field] ?? '');
    if (message) errors[field] = message;
  }
  return errors;
}
