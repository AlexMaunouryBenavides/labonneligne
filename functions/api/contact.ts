/**
 * Route serverless du formulaire de contact — Cloudflare Pages Function
 * (POST /api/contact). Envoie l'email via Resend.
 *
 * `RESEND_API_KEY` et `CONTACT_INBOX` sont lus depuis l'environnement Cloudflare
 * (`context.env`) et ne sont JAMAIS bundlés côté client — ce fichier vit hors de
 * `src/`, donc rien ici n'atteint le bundle du navigateur (contact-form :
 * « Secret protégé »). Pattern pensé pour être recopié verbatim d'un site à
 * l'autre (objectif business, cf. design.md).
 */
import { Resend } from 'resend';
import {
  HONEYPOT_FIELD,
  isEmail,
  validateContactForm,
  type ContactPayload,
} from '../../src/lib/contact-form';
import { site } from '../../src/config/site';

interface Env {
  /** Clé d'API Resend — secret serveur, injecté par Cloudflare. */
  RESEND_API_KEY: string;
  /** Adresse de réception des messages du formulaire. */
  CONTACT_INBOX: string;
}

interface PagesContext {
  request: Request;
  env: Env;
}

const GENERIC_ERROR = 'No pudimos enviar el mensaje. Intenta más tarde.';

const json = (body: unknown, status = 200): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });

export const onRequestPost = async ({ request, env }: PagesContext): Promise<Response> => {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ ok: false, error: 'Solicitud inválida.' }, 400);
  }

  const field = (name: string): string => (form.get(name) ?? '').toString();

  // Honeypot : si le champ leurre est rempli, c'est un bot → on abandonne
  // silencieusement en renvoyant un « succès » (ne pas renseigner le bot),
  // sans envoyer d'email.
  if (field(HONEYPOT_FIELD).trim() !== '') {
    return json({ ok: true });
  }

  const payload: ContactPayload = {
    nombre: field('nombre'),
    contacto: field('contacto'),
    mensaje: field('mensaje'),
  };

  const errors = validateContactForm(payload);
  if (Object.keys(errors).length > 0) {
    return json({ ok: false, errors }, 422);
  }

  // Mauvaise config serveur : ne pas fuiter le détail à l'utilisateur (ux.r8).
  if (!env.RESEND_API_KEY || !env.CONTACT_INBOX) {
    return json({ ok: false, error: GENERIC_ERROR }, 500);
  }

  const nombre = payload.nombre.trim();
  const contacto = payload.contacto.trim();
  const mensaje = payload.mensaje.trim();
  const resend = new Resend(env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    // Expéditeur de test tant que le domaine n'est pas vérifié (cf. design.md) ;
    // basculer sur une adresse du domaine au moment de la mise en ligne.
    from: `${site.name} <onboarding@resend.dev>`,
    to: [env.CONTACT_INBOX],
    // Répondre directement au prospect si le contacto est un email.
    ...(isEmail(contacto) ? { replyTo: contacto } : {}),
    subject: `Nuevo contacto — ${nombre}`,
    text: `Nombre: ${nombre}\nContacto: ${contacto}\n\nMensaje:\n${mensaje}\n`,
  });

  if (error) {
    return json({ ok: false, error: GENERIC_ERROR }, 502);
  }

  return json({ ok: true });
};
