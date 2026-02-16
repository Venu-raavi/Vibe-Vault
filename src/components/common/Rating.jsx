import React from 'react';
import { toStars } from '../../utils/formatters';
import styles from './common.module.css';

export default function Rating({ value, count, size = 'sm' }) {
  return (
    <div className={`${styles.rating} ${styles[`rating-${size}`]}`}>
      <span className={styles.stars}>{toStars(value)}</span>
      {count !== undefined && (
        <span className={styles.ratingCount}>({count})</span>
      )}
    </div>
  );
}
