export function formatCurrency(value: any) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  }).format(value);
}

export function capitalize(text: string): string {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

/**
 * Calcula el porcentaje de descuento entre un precio original y un precio actual.
 * @param originalPrice - Precio original (antes del descuento)
 * @param currentPrice - Precio actual (descontado)
 * @returns El porcentaje de descuento redondeado, o 0 si los valores no son válidos
 */
export function getDiscountPercentage(
  originalPrice: number,
  currentPrice: number
): number {
  if (!originalPrice || originalPrice <= 0 || currentPrice < 0) return 0;

  const discount = ((currentPrice - originalPrice) / originalPrice) * 100;
  return Math.round(discount);
}

/**
 * Verifica si un producto es nuevo basado en su fecha de creación.
 * @param createdAt - Fecha de creación del producto en formato ISO 8601
 * @param daysRange - Rango de días para considerar el producto como nuevo (por defecto 30 días)
 * @returns true si el producto es nuevo, false de lo contrario
 */
export function isNewProduct(
  createdAt: string,
  daysRange: number = 30
): boolean {
  const createdDate = new Date(createdAt);
  const currentDate = new Date();

  const diffInMs = currentDate.getTime() - createdDate.getTime();
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

  return diffInDays <= daysRange;
}

/**
 * Genera un slug a partir de un texto dado.
 * @param texto - Texto a convertir en slug
 * @returns El slug generado
 */
export const generarSlug = (texto: string): string => {
  return texto
    .normalize("NFD") // Quita acentos/diacríticos
    .replace(/[\u0300-\u036f]/g, "") // Elimina los caracteres acentuados
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Espacios por guiones
    .replace(/[^\w\-]+/g, "") // Elimina caracteres no alfanuméricos (excepto guiones)
    .replace(/\-\-+/g, "-"); // Sustituye múltiples guiones por uno
};

/**
 * Convierte un slug en texto legible.
 * @param slug - El slug a convertir
 * @returns El texto convertido (capitalizado)
 */
export const slugATexto = (slug: string): string => {
  return slug
    .replace(/-/g, " ") // Guiones por espacios
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitaliza cada palabra
};

/**
 * Calcula la fecha estimada de entrega sumando 3 días hábiles a partir de hoy.
 * Se omiten los fines de semana (sábado y domingo).
 * @returns {string} La fecha estimada formateada como DD/MM/YYYY
 */
export function obtenerFechaEntregaEstimada() {
  const fecha = new Date();
  const diasHabiles = 3;
  let diasHabilesAgregados = 0;

  while (diasHabilesAgregados < diasHabiles) {
    fecha.setDate(fecha.getDate() + 1);
    const diaSemana = fecha.getDay();
    if (diaSemana !== 0 && diaSemana !== 6) {
      diasHabilesAgregados++;
    }
  }

  const dia = String(fecha.getDate()).padStart(2, "0");
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const anio = fecha.getFullYear();

  return `${dia}/${mes}/${anio}`;
}
