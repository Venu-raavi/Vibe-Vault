import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Header        from './components/Header/Header';
import CartDrawer    from './components/Cart/CartDrawer';
import AuthModal     from './components/common/AuthModal';
import ToastContainer from './components/common/ToastContainer';
import Footer        from './components/Footer/Footer';

import Home          from './pages/Home';
import ProductList   from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import CartPage      from './pages/CartPage';
import WishlistPage  from './pages/WishlistPage';
import CheckoutPage  from './pages/CheckoutPage';
import OrderSuccess  from './pages/OrderSuccess';

export default function App() {
  const cartOpen = useSelector((s) => s.cart.isOpen);
  const authOpen = useSelector((s) => s.user.isAuthModalOpen);

  return (
    <BrowserRouter>
      <div className="page-wrapper">
        <div className="ambient-bg" aria-hidden="true" />
        <Header />

        <Routes>
          <Route path="/"              element={<Home />} />
          <Route path="/products"      element={<ProductList />} />
          <Route path="/products/:id"  element={<ProductDetail />} />
          <Route path="/cart"          element={<CartPage />} />
          <Route path="/wishlist"      element={<WishlistPage />} />
          <Route path="/checkout"      element={<CheckoutPage />} />
          <Route path="/success"       element={<OrderSuccess />} />
        </Routes>

        <Footer />

        {/* Global overlays — rendered conditionally to avoid DOM waste */}
        {cartOpen && <CartDrawer />}
        {authOpen && <AuthModal />}
        <ToastContainer />
      </div>
    </BrowserRouter>
  );
}
