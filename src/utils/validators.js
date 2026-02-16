/**
 * utils/validators.js
 * Pure validation helpers — each returns an error string or null.
 * Designed for use with validateForm() below.
 */

export const required = (value, label = 'Field') =>
  !String(value).trim() ? `${label} is required` : null;

export const minLength = (value, min, label = 'Field') =>
  String(value).length < min ? `${label} must be at least ${min} characters` : null;

export const isEmail = (value) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : 'Enter a valid email address';

/** Indian 6-digit PIN code */
export const isPinCode = (value) =>
  /^\d{6}$/.test(value) ? null : 'Enter a valid 6-digit PIN code';

/** Indian mobile number — 10 digits, optionally prefixed with +91 */
export const isMobile = (value) =>
  /^(\+91[\s-]?)?[6-9]\d{9}$/.test(value.replace(/\s/g, ''))
    ? null
    : 'Enter a valid 10-digit Indian mobile number';

export const isCardNumber = (value) => {
  const clean = value.replace(/\s/g, '');
  return /^\d{16}$/.test(clean) ? null : 'Enter a valid 16-digit card number';
};

export const isExpiry = (value) =>
  /^(0[1-9]|1[0-2])\/\d{2}$/.test(value) ? null : 'Use MM/YY format';

export const isCvv = (value) =>
  /^\d{3,4}$/.test(value) ? null : 'CVV must be 3 or 4 digits';

/**
 * Run a map of validators against a form values object.
 *
 * @param {object} fields  — { fieldName: value }
 * @param {object} rules   — { fieldName: [validatorFn, ...] }
 * @returns {object}       — { fieldName: errorString } (only failing fields)
 */
export function validateForm(fields, rules) {
  const errors = {};
  for (const [key, validators] of Object.entries(rules)) {
    for (const validate of validators) {
      const error = validate(fields[key] ?? '');
      if (error) { errors[key] = error; break; }
    }
  }
  return errors;
}

/** True when errors object has no entries */
export const isFormValid = (errors) => Object.keys(errors).length === 0;
