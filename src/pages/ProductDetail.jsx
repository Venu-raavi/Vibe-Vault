import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectProductById, toggleWishlist, selectIsWishlisted } from '../store/productSlice';
import { addToCart, openCart } from '../store/cartSlice';
import { useToast } from '../hooks/useToast';
import { fmt } from '../utils/formatters';
import Badge from '../components/common/Badge';
import Rating from '../components/common/Rating';
import styles from './pages.module.css';

export default function ProductDetail() {
  const { id }    = useParams();
  const navigate  = useNavigate();
  const dispatch  = useDispatch();
  const toast     = useToast();

  const product   = useSelector(selectProductById(Number(id)));
  const isWished  = useSelector(selectIsWishlisted(Number(id)));

  if (!product) {
    return (
      <div className={`container ${styles.notFound}`}>
        <p>Product not found.</p>
        <button className={styles.backLink} onClick={() => navigate('/products')}>
          ← Back to catalog
        </button>
      </div>
    );
  }

  const handleAdd = () => {
    dispatch(addToCart(product));
    dispatch(openCart());
    toast(`${product.name} added to cart`, 'success');
  };

  const handleWishlist = () => {
    dispatch(toggleWishlist(product.id));
    toast(isWished ? 'Removed from wishlist' : 'Saved to wishlist', 'info');
  };

  return (
    <main className="container">
      <button className={styles.backLink} onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className={styles.detailGrid}>
        {/* Left: image */}
        <div className={styles.detailImg}>
          <span className={styles.detailEmoji}>{product.emoji}</span>
          {product.badge && (
            <div className={styles.detailBadge}>
              <Badge type={product.badge}>{product.badge}</Badge>
            </div>
          )}
        </div>

        {/* Right: info */}
        <div className={styles.detailInfo}>
          <p className={styles.detailCategory}>{product.category}</p>
          <h1 className={styles.detailName}>{product.name}</h1>

          <Rating value={product.rating} count={product.reviews} size="lg" />

          <div className={styles.detailPrice}>
            {fmt(product.price)}
            {product.originalPrice && (
              <span className={styles.detailOriginal}>{fmt(product.originalPrice)}</span>
            )}
          </div>

          <p className={styles.detailDesc}>{product.desc}</p>

          {/* Product details list */}
          {product.details && (
            <ul className={styles.detailsList}>
              {product.details.map((d, i) => (
                <li key={i} className={styles.detailItem}>
                  <span className={styles.detailBullet}>◆</span> {d}
                </li>
              ))}
            </ul>
          )}

          <div className={styles.detailActions}>
            <button className={styles.addToCartBtn} onClick={handleAdd}>
              Add to Cart
            </button>
            <button
              className={`${styles.wishBtn} ${isWished ? styles.wished : ''}`}
              onClick={handleWishlist}
              aria-label={isWished ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              {isWished ? '♥' : '♡'}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
