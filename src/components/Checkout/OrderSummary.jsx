import React from 'react';
import { useSelector } from 'react-redux';
import { selectCartItems, selectSubtotal, selectTax, selectTotal } from '../../store/cartSlice';
import { fmt } from '../../utils/formatters';
import styles from './Checkout.module.css';

export default function OrderSummary() {
  const items    = useSelector(selectCartItems);
  const subtotal = useSelector(selectSubtotal);
  const tax      = useSelector(selectTax);
  const total    = useSelector(selectTotal);

  return (
    <section className={styles.section}>
      <h3 className={styles.sectionTitle}>Order Summary</h3>

      {items.map(item => (
        <div key={item.id} className={styles.summaryLine}>
          <span>{item.emoji} {item.name} × {item.qty}</span>
          <span>{fmt(item.price * item.qty)}</span>
        </div>
      ))}

      <div className={`${styles.summaryLine} ${styles.summaryMuted}`}>
        <span>Subtotal</span><span>{fmt(subtotal)}</span>
      </div>
      <div className={`${styles.summaryLine} ${styles.summaryMuted}`}>
        <span>Tax (8.5%)</span><span>{fmt(tax)}</span>
      </div>

      <div className={styles.totalLine}>
        <span className={styles.totalLabel}>Total</span>
        <span className={styles.totalAmount}>{fmt(total)}</span>
      </div>
    </section>
  );
}
