import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  selectCartItems, selectSubtotal, selectTax, selectTotal,
  closeCart,
} from '../../store/cartSlice';
import { selectIsLoggedIn, openAuthModal } from '../../store/userSlice';
import { useToast } from '../../hooks/useToast';
import CartItem from './CartItem';
import { fmt } from '../../utils/formatters';
import styles from './Cart.module.css';

export default function CartDrawer() {
  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const toast     = useToast();

  const items     = useSelector(selectCartItems);
  const subtotal  = useSelector(selectSubtotal);
  const tax       = useSelector(selectTax);
  const total     = useSelector(selectTotal);
  const loggedIn  = useSelector(selectIsLoggedIn);

  const handleCheckout = () => {
    if (!loggedIn) {
      toast('Please sign in to checkout', 'error');
      dispatch(openAuthModal('signin'));
      return;
    }
    dispatch(closeCart());
    navigate('/checkout');
  };

  return (
    <>
      <div className={styles.overlay} onClick={() => dispatch(closeCart())} />
      <aside className={styles.drawer}>
        <div className={styles.drawerHeader}>
          <h2 className={styles.drawerTitle}>Your Cart</h2>
          <button
            className={styles.closeBtn}
            onClick={() => dispatch(closeCart())}
            aria-label="Close cart"
          >✕</button>
        </div>

        <div className={styles.itemList}>
          {items.length === 0 ? (
            <div className={styles.empty}>
              <span className={styles.emptyIcon}>▦</span>
              <span>Your cart is empty</span>
            </div>
          ) : (
            items.map(item => <CartItem key={item.id} item={item} />)
          )}
        </div>

        {items.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.lineItem}>
              <span>Subtotal</span><span>{fmt(subtotal)}</span>
            </div>
            <div className={styles.lineItem}>
              <span>Tax (8.5%)</span><span>{fmt(tax)}</span>
            </div>
            <div className={styles.totalRow}>
              <span className={styles.totalLabel}>Total</span>
              <span className={styles.totalAmount}>{fmt(total)}</span>
            </div>
            <button className={styles.checkoutBtn} onClick={handleCheckout}>
              Proceed to Checkout →
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
