import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQty } from '../../store/cartSlice';
import { useToast } from '../../hooks/useToast';
import { fmt } from '../../utils/formatters';
import styles from './Cart.module.css';

export default function CartItem({ item }) {
  const dispatch = useDispatch();
  const toast    = useToast();

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
    toast('Item removed', 'info');
  };

  return (
    <div className={styles.cartItem}>
      <div className={styles.cartItemEmoji}>{item.emoji}</div>

      <div className={styles.cartItemDetails}>
        <div className={styles.cartItemName}>{item.name}</div>
        <div className={styles.cartItemPrice}>{fmt(item.price * item.qty)}</div>

        <div className={styles.cartItemControls}>
          <button
            className={styles.qtyBtn}
            onClick={() => dispatch(updateQty({ id: item.id, delta: -1 }))}
            aria-label="Decrease quantity"
          >−</button>
          <span className={styles.qtyDisplay}>{item.qty}</span>
          <button
            className={styles.qtyBtn}
            onClick={() => dispatch(updateQty({ id: item.id, delta: +1 }))}
            aria-label="Increase quantity"
          >+</button>

          <button className={styles.removeBtn} onClick={handleRemove}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
