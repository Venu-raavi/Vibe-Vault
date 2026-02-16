import React from 'react';
import styles from './Checkout.module.css';

/**
 * ShippingForm — collects Indian delivery address details.
 * Renders labelled inputs via a reusable helper to keep JSX DRY.
 */
export default function ShippingForm({ values, errors, onChange }) {
  /** Reusable field renderer — avoids repetitive JSX blocks */
  const field = (key, label, placeholder, type = 'text') => (
    <div className={styles.formGroup}>
      <label className={styles.label} htmlFor={key}>{label}</label>
      <input
        id={key}
        type={type}
        className={`${styles.input} ${errors[key] ? styles.inputError : ''}`}
        placeholder={placeholder}
        value={values[key] || ''}
        onChange={(e) => onChange(key, e.target.value)}
        autoComplete={key}
      />
      {errors[key] && <span className={styles.errorMsg} role="alert">{errors[key]}</span>}
    </div>
  );

  return (
    <section className={styles.section}>
      <h3 className={styles.sectionTitle}>Shipping Information</h3>

      <div className={styles.row}>
        {field('firstName', 'First Name', 'Arjun')}
        {field('lastName',  'Last Name',  'Sharma')}
      </div>

      {field('address', 'Flat / House No. & Street', '12B, MG Road, Koramangala')}

      <div className={styles.row}>
        {field('city',  'City',        'Bengaluru')}
        {field('state', 'State',       'Karnataka')}
      </div>

      <div className={styles.row}>
        {field('pincode', 'PIN Code', '560034')}
        {field('phone',   'Mobile Number', '+91 98765 43210', 'tel')}
      </div>

      {field('email', 'Email Address', 'arjun@gmail.com', 'email')}
    </section>
  );
}
