import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, selectCartItems, selectTotal } from '../store/cartSlice';
import { selectIsLoggedIn } from '../store/userSlice';
import { placeOrder } from '../services/api';
import {
  validateForm, required, isEmail,
  isPinCode, isMobile, isCardNumber, isExpiry, isCvv,
} from '../utils/validators';
import { useToast } from '../hooks/useToast';
import { fmt } from '../utils/formatters';
import ShippingForm from '../components/Checkout/ShippingForm';
import PaymentForm  from '../components/Checkout/PaymentForm';
import OrderSummary from '../components/Checkout/OrderSummary';
import styles from './pages.module.css';

/** Validation rule maps — kept at module level (pure config, no side-effects) */
const SHIPPING_RULES = {
  firstName: [(v) => required(v, 'First name')],
  lastName:  [(v) => required(v, 'Last name')],
  address:   [(v) => required(v, 'Address')],
  city:      [(v) => required(v, 'City')],
  state:     [(v) => required(v, 'State')],
  pincode:   [isPinCode],
  phone:     [isMobile],
  email:     [isEmail],
};

const PAYMENT_RULES = {
  cardNum: [isCardNumber],
  expiry:  [isExpiry],
  cvv:     [isCvv],
};

export default function CheckoutPage() {
  const navigate  = useNavigate();
  const dispatch  = useDispatch();
  const toast     = useToast();

  const loggedIn  = useSelector(selectIsLoggedIn);
  const items     = useSelector(selectCartItems);
  const total     = useSelector(selectTotal);

  const [form,    setForm]    = useState({});
  const [errors,  setErrors]  = useState({});
  const [loading, setLoading] = useState(false);

  // Guard — redirect if user is not signed in or cart is empty
  if (!loggedIn)        { navigate('/'); return null; }
  if (items.length === 0) { navigate('/products'); return null; }

  /** Immutable field update — returns new form object */
  const handleFieldChange = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async () => {
    const allErrors = {
      ...validateForm(form, SHIPPING_RULES),
      ...validateForm(form, PAYMENT_RULES),
    };

    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      toast('Please fix the highlighted errors', 'error');
      return;
    }

    setLoading(true);
    try {
      await placeOrder({ items, shipping: form, total });
      dispatch(clearCart());
      navigate('/success');
    } catch {
      toast('Order could not be placed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container">
      <button className={styles.backLink} onClick={() => navigate(-1)}>
        ← Back to cart
      </button>
      <h1 className={styles.pageTitle}>Checkout</h1>

      <div className={styles.checkoutLayout}>
        {/* Left — forms */}
        <div className={styles.checkoutForms}>
          <ShippingForm values={form} errors={errors} onChange={handleFieldChange} />
          <PaymentForm  values={form} errors={errors} onChange={handleFieldChange} />
        </div>

        {/* Right — summary + CTA */}
        <div className={styles.checkoutSide}>
          <OrderSummary />
          <button
            className={styles.placeOrderBtn}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Placing order…' : `Place Order — ${fmt(total)}`}
          </button>
        </div>
      </div>
    </main>
  );
}
