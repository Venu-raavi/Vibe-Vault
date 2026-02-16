import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart, removeFromCart, updateQty, setQty, clearCart,
  openCart, closeCart, toggleCart,
  selectCartItems, selectCartCount, selectSubtotal, selectTax, selectTotal, selectIsInCart,
} from '../store/cartSlice';

/**
 * useCart — convenience hook that bundles all cart state + actions.
 */
export function useCart() {
  const dispatch = useDispatch();

  return {
    // State
    items:    useSelector(selectCartItems),
    count:    useSelector(selectCartCount),
    subtotal: useSelector(selectSubtotal),
    tax:      useSelector(selectTax),
    total:    useSelector(selectTotal),

    // Actions
    add:    (product)       => dispatch(addToCart(product)),
    remove: (id)            => dispatch(removeFromCart(id)),
    incr:   (id)            => dispatch(updateQty({ id, delta: +1 })),
    decr:   (id)            => dispatch(updateQty({ id, delta: -1 })),
    setQty: (id, qty)       => dispatch(setQty({ id, qty })),
    clear:  ()              => dispatch(clearCart()),
    open:   ()              => dispatch(openCart()),
    close:  ()              => dispatch(closeCart()),
    toggle: ()              => dispatch(toggleCart()),

    // Per-item check
    isInCart: (id)          => useSelector(selectIsInCart(id)),
  };
}
