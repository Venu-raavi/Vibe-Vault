import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart, openCart } from '../../store/cartSlice';
import { toggleWishlist, selectIsWishlisted } from '../../store/productSlice';
import { useToast } from '../../hooks/useToast';
import { fmt, toStars } from '../../utils/formatters';
import Badge from '../common/Badge';
import styles from './ProductCard.module.css';

export default function ProductCard({ product }) {
  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const toast     = useToast();
  const isWished  = useSelector(selectIsWishlisted(product.id));

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart(product));
    dispatch(openCart());
    toast(`${product.name} added to cart`, 'success');
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    dispatch(toggleWishlist(product.id));
    toast(isWished ? 'Removed from wishlist' : 'Saved to wishlist', 'info');
  };

  const handleClick = () => navigate(`/products/${product.id}`);

  return (
    <article className={styles.card} onClick={handleClick} role="button" tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && handleClick()}
    >
      {/* Image */}
      <div className={styles.imgWrapper}>
        <div className={styles.emoji}>{product.emoji}</div>

        {product.badge && (
          <div className={styles.badgeWrapper}>
            <Badge type={product.badge}>{product.badge}</Badge>
          </div>
        )}

        <button
          className={`${styles.wishlistBtn} ${isWished ? styles.wished : ''}`}
          onClick={handleWishlist}
          aria-label={isWished ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          {isWished ? '♥' : '♡'}
        </button>
      </div>

      {/* Info */}
      <div className={styles.info}>
        <div className={styles.category}>{product.category}</div>
        <h3 className={styles.name}>{product.name}</h3>

        <div className={styles.rating}>
          <span className={styles.stars}>{toStars(product.rating)}</span>
          <span className={styles.reviewCount}>({product.reviews})</span>
        </div>

        <div className={styles.priceRow}>
          <div className={styles.price}>
            {fmt(product.price)}
            {product.originalPrice && (
              <span className={styles.original}>{fmt(product.originalPrice)}</span>
            )}
          </div>
          <button className={styles.addBtn} onClick={handleAddToCart}>
            + Cart
          </button>
        </div>
      </div>
    </article>
  );
}
