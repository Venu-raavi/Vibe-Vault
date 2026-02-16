import React from 'react';
import styles from './Checkout.module.css';

// ── Pure formatting helpers (no side-effects) ──

/** Insert spaces every 4 digits: 4242424242424242 → 4242 4242 4242 4242 */
const formatCardNumber = (value) =>
  value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();

/** Auto-insert slash: 1225 → 12/25 */
const formatExpiry = (value) => {
  const clean = value.replace(/\D/g, '').slice(0, 4);
  return clean.length >= 3 ? `${clean.slice(0, 2)}/${clean.slice(2)}` : clean;
};

/**
 * PaymentForm — card payment details with inline formatting.
 * Accepts values, errors, and onChange from the parent CheckoutPage.
 */
export default function PaymentForm({ values, errors, onChange }) {
  return (
    <section className={styles.section}>
      <h3 className={styles.sectionTitle}>Payment Details</h3>
      <p className={styles.testNote}>
        Test card: 4111 1111 1111 1111 · 12/26 · 123 (Visa Sandbox)
      </p>

      {/* Card Number */}
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="cardNum">Card Number</label>
        <input
          id="cardNum"
          className={`${styles.input} ${errors.cardNum ? styles.inputError : ''}`}
          placeholder="4111 1111 1111 1111"
          value={values.cardNum || ''}
          onChange={(e) => onChange('cardNum', formatCardNumber(e.target.value))}
          inputMode="numeric"
          maxLength={19}
          autoComplete="cc-number"
        />
        {errors.cardNum && <span className={styles.errorMsg} role="alert">{errors.cardNum}</span>}
      </div>

      <div className={styles.row}>
        {/* Expiry */}
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="expiry">Expiry (MM/YY)</label>
          <input
            id="expiry"
            className={`${styles.input} ${errors.expiry ? styles.inputError : ''}`}
            placeholder="MM/YY"
            value={values.expiry || ''}
            onChange={(e) => onChange('expiry', formatExpiry(e.target.value))}
            inputMode="numeric"
            maxLength={5}
            autoComplete="cc-exp"
          />
          {errors.expiry && <span className={styles.errorMsg} role="alert">{errors.expiry}</span>}
        </div>

        {/* CVV */}
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="cvv">CVV</label>
          <input
            id="cvv"
            className={`${styles.input} ${errors.cvv ? styles.inputError : ''}`}
            placeholder="123"
            value={values.cvv || ''}
            onChange={(e) => onChange('cvv', e.target.value.replace(/\D/g, '').slice(0, 4))}
            inputMode="numeric"
            maxLength={4}
            autoComplete="cc-csc"
          />
          {errors.cvv && <span className={styles.errorMsg} role="alert">{errors.cvv}</span>}
        </div>
      </div>

      {/* Indian payment note */}
      <p className={styles.upiNote}>
        💡 UPI & NetBanking support coming soon. RuPay cards accepted.
      </p>
    </section>
  );
}
