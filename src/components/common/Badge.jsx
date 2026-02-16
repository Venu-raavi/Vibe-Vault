import React from 'react';
import styles from './common.module.css';

const typeMap = {
  new:  styles.badgeNew,
  sale: styles.badgeSale,
  hot:  styles.badgeHot,
};

export default function Badge({ type, children }) {
  return (
    <span className={`${styles.badge} ${typeMap[type] || ''}`}>
      {children}
    </span>
  );
}
