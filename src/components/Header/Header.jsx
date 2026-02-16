import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartCount, openCart } from '../../store/cartSlice';
import { selectCurrentUser, logout, openAuthModal } from '../../store/userSlice';
import { selectWishlist } from '../../store/productSlice';
import SearchBar from './SearchBar';
import styles from './Header.module.css';
import { useToast } from '../../hooks/useToast';

/** Top-level navigation links */
const NAV_LINKS = [
  { label: 'Catalogue', path: '/products' },
  { label: 'New Arrivals', path: '/products?badge=new' },
  { label: 'Sale', path: '/products?badge=sale' },
];

export default function Header() {
  const navigate     = useNavigate();
  const location     = useLocation();
  const dispatch     = useDispatch();
  const toast        = useToast();

  const cartCount    = useSelector(selectCartCount);
  const wishlist     = useSelector(selectWishlist);
  const user         = useSelector(selectCurrentUser);

  const isActivePath = (path) => location.pathname === path.split('?')[0];

  const handleLogout = () => {
    dispatch(logout());
    toast('Signed out successfully', 'info');
  };

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        {/* ── Brand ── */}
        <button className={styles.brand} onClick={() => navigate('/')} aria-label="Go to home">
          Vibe<span>Vault</span>
        </button>

        {/* ── Nav Links ── */}
        <nav className={styles.nav} aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <button
              key={link.path}
              className={`${styles.navLink} ${isActivePath(link.path) ? styles.active : ''}`}
              onClick={() => navigate(link.path)}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* ── Right Actions ── */}
        <div className={styles.actions}>
          <SearchBar />

          {/* Wishlist button */}
          <button
            className={styles.iconBtn}
            onClick={() => navigate('/wishlist')}
            aria-label={`Wishlist (${wishlist.length} items)`}
            title="My Wishlist"
          >
            ♡
            {wishlist.length > 0 && (
              <span className={styles.badgeCount}>{wishlist.length}</span>
            )}
          </button>

          {/* Auth */}
          {user ? (
            <>
              <span className={styles.userName}>◆ {user.name}</span>
              <button className={styles.authBtn} onClick={handleLogout}>Sign out</button>
            </>
          ) : (
            <button className={styles.authBtn} onClick={() => dispatch(openAuthModal('signin'))}>
              Sign in
            </button>
          )}

          {/* Cart */}
          <button
            className={styles.cartBtn}
            onClick={() => dispatch(openCart())}
            aria-label={`Cart (${cartCount} items)`}
          >
            ▦ Cart
            {cartCount > 0 && <span className={styles.cartCount}>{cartCount}</span>}
          </button>
        </div>
      </div>
    </header>
  );
}
