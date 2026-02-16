import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCartItems, selectSubtotal, selectTax, selectTotal,
  removeFromCart, updateQty, clearCart,
} from '../store/cartSlice';
import { selectIsLoggedIn, openAuthModal } from '../store/userSlice';
import { useToast } from '../hooks/useToast';
import { fmt } from '../utils/formatters';
import styles from './pages.module.css';

export default function CartPage() {
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
      dispatch(openAuthModal('signin'));
      toast('Please sign in to checkout', 'error');
      return;
    }
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className={`container ${styles.cartEmpty}`}>
        <span className={styles.cartEmptyIcon}>▦</span>
        <h2 className={styles.cartEmptyTitle}>Your cart is empty</h2>
        <button className={styles.heroCta} onClick={() => navigate('/products')}>
          Browse Collection →
        </button>
      </div>
    );
  }

  return (
    <main className="container">
      <h1 className={styles.pageTitle}>Your Cart</h1>

      <div className={styles.cartLayout}>
        {/* Items */}
        <div className={styles.cartItems}>
          {items.map(item => (
            <div key={item.id} className={styles.cartRow}>
              <div className={styles.cartRowEmoji}>{item.emoji}</div>
              <div className={styles.cartRowDetails}>
                <span className={styles.cartRowName}>{item.name}</span>
                <span className={styles.cartRowCat}>
                  {item.category} · {fmt(item.price)} each
                </span>
              </div>
              <div className={styles.cartRowQty}>
                <button
                  className={styles.qtyBtn}
                  onClick={() => dispatch(updateQty({ id: item.id, delta: -1 }))}
                >−</button>
                <span>{item.qty}</span>
                <button
                  className={styles.qtyBtn}
                  onClick={() => dispatch(updateQty({ id: item.id, delta: +1 }))}
                >+</button>
              </div>
              <span className={styles.cartRowPrice}>{fmt(item.price * item.qty)}</span>
              <button
                className={styles.cartRowRemove}
                onClick={() => { dispatch(removeFromCart(item.id)); toast('Item removed', 'info'); }}
              >✕</button>
            </div>
          ))}

          <button
            className={styles.clearBtn}
            onClick={() => { dispatch(clearCart()); toast('Cart cleared', 'info'); }}
          >
            Clear cart
          </button>
        </div>

        {/* Summary */}
        <div className={styles.cartSummary}>
          <h3 className={styles.summaryTitle}>Order Summary</h3>
          <div className={styles.summaryLine}><span>Subtotal</span><span>{fmt(subtotal)}</span></div>
          <div className={styles.summaryLine}><span>Tax (8.5%)</span><span>{fmt(tax)}</span></div>
          <div className={styles.summaryTotal}><span>Total</span><span>{fmt(total)}</span></div>
          <button className={styles.checkoutBtn} onClick={handleCheckout}>
            Proceed to Checkout →
          </button>
        </div>
      </div>
    </main>
  );
}
