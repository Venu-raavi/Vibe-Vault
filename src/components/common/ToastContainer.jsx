import React, { useState, useEffect } from 'react';
import { TOAST_EVENT } from '../../hooks/useToast';
import styles from './common.module.css';

export default function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const handler = (e) => {
      const { message, type, duration = 3000 } = e.detail;
      const id = Date.now() + Math.random();

      setToasts(prev => [...prev, { id, message, type }]);
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, duration);
    };

    window.addEventListener(TOAST_EVENT, handler);
    return () => window.removeEventListener(TOAST_EVENT, handler);
  }, []);

  if (!toasts.length) return null;

  return (
    <div className={styles.toastContainer} aria-live="polite">
      {toasts.map(t => (
        <div key={t.id} className={`${styles.toast} ${styles[`toast-${t.type}`]}`}>
          <span className={styles.toastIcon}>
            {t.type === 'success' ? '✓' : t.type === 'error' ? '✕' : '◆'}
          </span>
          {t.message}
        </div>
      ))}
    </div>
  );
}
