/** Formatage monétaire es-CL (pesos chiliens, sans décimales). */
const clp = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
});

export function formatCLP(value: number): string {
  return clp.format(value);
}

/** Date longue es-CL (ex. « 15 de enero de 2026 »). */
const dateFmt = new Intl.DateTimeFormat('es-CL', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

export function formatDate(value: Date): string {
  return dateFmt.format(value);
}
