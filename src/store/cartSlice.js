import { createSlice } from '@reduxjs/toolkit';

const TAX_RATE = 0.085;

// Rehydrate cart from localStorage
const saved = localStorage.getItem('vibevault-cart');
const initialItems = saved ? JSON.parse(saved) : [];

function persist(items) {
  localStorage.setItem('vibevault-cart', JSON.stringify(items));
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items:  initialItems,
    isOpen: false,
  },
  reducers: {
    // Add a product or increment its qty
    addToCart(state, action) {
      const product = action.payload;
      const existing = state.items.find(i => i.id === product.id);
      if (existing) {
        existing.qty += 1;
      } else {
        state.items.push({ ...product, qty: 1 });
      }
      persist(state.items);
    },

    // Remove an item entirely
    removeFromCart(state, action) {
      state.items = state.items.filter(i => i.id !== action.payload);
      persist(state.items);
    },

    // Increment or decrement qty (delta: +1 | -1), remove if qty reaches 0
    updateQty(state, action) {
      const { id, delta } = action.payload;
      const item = state.items.find(i => i.id === id);
      if (!item) return;
      item.qty = Math.max(0, item.qty + delta);
      if (item.qty === 0) {
        state.items = state.items.filter(i => i.id !== id);
      }
      persist(state.items);
    },

    // Set qty directly (for input fields)
    setQty(state, action) {
      const { id, qty } = action.payload;
      const item = state.items.find(i => i.id === id);
      if (!item) return;
      if (qty <= 0) {
        state.items = state.items.filter(i => i.id !== id);
      } else {
        item.qty = qty;
      }
      persist(state.items);
    },

    // Empty the cart
    clearCart(state) {
      state.items = [];
      persist(state.items);
    },

    openCart(state)  { state.isOpen = true; },
    closeCart(state) { state.isOpen = false; },
    toggleCart(state) { state.isOpen = !state.isOpen; },
  },
});

// ---- Selectors ----
export const selectCartItems    = s => s.cart.items;
export const selectCartIsOpen   = s => s.cart.isOpen;
export const selectCartCount    = s => s.cart.items.reduce((acc, i) => acc + i.qty, 0);
export const selectSubtotal     = s => s.cart.items.reduce((acc, i) => acc + i.price * i.qty, 0);
export const selectTax          = s => selectSubtotal(s) * TAX_RATE;
export const selectTotal        = s => selectSubtotal(s) + selectTax(s);
export const selectIsInCart     = (id) => s => s.cart.items.some(i => i.id === id);

export const {
  addToCart, removeFromCart, updateQty, setQty, clearCart,
  openCart, closeCart, toggleCart,
} = cartSlice.actions;

export default cartSlice.reducer;
