/**
 * utils/formatters.js
 * Currency, string, and display helpers — INR locale.
 */

/** Format a number as Indian Rupee currency (e.g. ₹1,23,456.00) */
export const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

/** Shorthand rupee format: ₹1,499 */
export const fmt = (n) =>
  `₹${Number(n).toLocaleString('en-IN')}`;

/** Generate star string from rating (1–5) */
export const toStars = (rating) =>
  '★'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating));

/** Truncate a string to maxLen with ellipsis */
export const truncate = (str, maxLen = 80) =>
  str.length > maxLen ? str.slice(0, maxLen).trimEnd() + '…' : str;

/** Format a discount percentage */
export const discountPct = (original, sale) =>
  original ? Math.round(((original - sale) / original) * 100) : 0;

/** Convert camelCase to Title Case */
export const titleCase = (str) =>
  str.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase());

/** Generate a short order ID with VV prefix */
export const generateOrderId = () =>
  `VV-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

/** Format a date to Indian locale string */
export const formatDate = (date = new Date()) =>
  new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium' }).format(date);
