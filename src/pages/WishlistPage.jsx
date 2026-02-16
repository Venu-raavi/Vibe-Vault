import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllProducts, selectWishlist, toggleWishlist } from '../store/productSlice';
import { addToCart, openCart } from '../store/cartSlice';
import { useToast } from '../hooks/useToast';
import { fmt, toStars } from '../utils/formatters';
import styles from './pages.module.css';

export default function WishlistPage() {
  const navigate  = useNavigate();
  const dispatch  = useDispatch();
  const toast     = useToast();

  const allProducts = useSelector(selectAllProducts);
  const wishlistIds = useSelector(selectWishlist);

  const wishlistItems = allProducts.filter((p) => wishlistIds.includes(p.id));

  const handleRemove = (product) => {
    dispatch(toggleWishlist(product.id));
    toast(`${product.name} removed from wishlist`, 'info');
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    dispatch(openCart());
    toast(`${product.name} added to cart`, 'success');
  };

  // ── Empty State ──
  if (wishlistItems.length === 0) {
    return (
      <div className={`container ${styles.cartEmpty}`}>
        <span className={styles.cartEmptyIcon}>♡</span>
        <h2 className={styles.cartEmptyTitle}>Your wishlist is empty</h2>
        <p style={{ color: 'var(--slate)', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', marginBottom: '2rem' }}>
          Save products you love and shop them later.
        </p>
        <button className={styles.heroCta} onClick={() => navigate('/products')}>
          Browse Catalogue →
        </button>
      </div>
    );
  }

  return (
    <main className="container">
      {/* ── Page Header ── */}
      <div className={styles.sectionHeader} style={{ paddingTop: '2rem' }}>
        <h1 className={styles.sectionTitle}>
          My Wishlist <span style={{ color: 'var(--gold)', fontFamily: 'var(--font-mono)', fontSize: '1rem' }}>({wishlistItems.length})</span>
        </h1>
        <button className={styles.seeAll} onClick={() => navigate('/products')}>
          Continue shopping →
        </button>
      </div>

      {/* ── Items Grid ── */}
      <div className={styles.wishlistGrid}>
        {wishlistItems.map((product) => (
          <article key={product.id} className={styles.wishCard}>
            {/* Emoji */}
            <div className={styles.wishCardImg} onClick={() => navigate(`/products/${product.id}`)}>
              <span className={styles.wishCardEmoji}>{product.emoji}</span>
            </div>

            {/* Info */}
            <div className={styles.wishCardBody}>
              <p className={styles.wishCardCategory}>{product.category}</p>
              <h3 className={styles.wishCardName} onClick={() => navigate(`/products/${product.id}`)}>
                {product.name}
              </h3>

              <div className={styles.wishCardRating}>
                <span className={styles.stars}>{toStars(product.rating)}</span>
                <span className={styles.ratingCount}>({product.reviews})</span>
              </div>

              <div className={styles.wishCardPrice}>
                {fmt(product.price)}
                {product.originalPrice && (
                  <span className={styles.wishCardOriginal}>{fmt(product.originalPrice)}</span>
                )}
              </div>

              {/* Actions */}
              <div className={styles.wishCardActions}>
                <button
                  className={styles.wishAddBtn}
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
                <button
                  className={styles.wishRemoveBtn}
                  onClick={() => handleRemove(product)}
                  aria-label="Remove from wishlist"
                >
                  ✕
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
