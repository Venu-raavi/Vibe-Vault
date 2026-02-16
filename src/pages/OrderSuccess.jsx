import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateOrderId } from '../utils/formatters';
import styles from './pages.module.css';

export default function OrderSuccess() {
  const navigate = useNavigate();
  // Generate once on mount — useMemo prevents regeneration on re-renders
  const orderId  = useMemo(generateOrderId, []);

  return (
    <main className={`container ${styles.successScreen}`}>
      <div className={styles.successIcon}>◆</div>
      <h1 className={styles.successTitle}>Order Confirmed!</h1>
      <p className={styles.successSub}>
        Thank you for shopping with Vibe Vault. Your order is being processed and
        will be delivered within 3–5 business days.
      </p>
      <p className={styles.orderId}>Order #{orderId}</p>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--slate)', marginBottom: '2.5rem' }}>
        A confirmation will be sent to your registered email and mobile number.
      </p>
      <button className={styles.heroCta} onClick={() => navigate('/products')}>
        Continue Shopping
      </button>
    </main>
  );
}
