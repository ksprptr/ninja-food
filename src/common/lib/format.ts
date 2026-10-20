/**
 * Function to format a price in CZK
 */
export const formatPrice = (value: number): string =>
  `${Math.round(value).toLocaleString('cs-CZ')} Kč`;

/**
 * Function to format a date
 */
export const formatDate = (value: Date): string =>
  value.toLocaleDateString('cs-CZ', { day: 'numeric', month: 'long', year: 'numeric' });
