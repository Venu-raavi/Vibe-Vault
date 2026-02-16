import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAllProducts } from '../store/productSlice';
import ProductCard from '../components/ProductCard/ProductCard';
import styles from './pages.module.css';

/** Category config — label + emoji for visual interest */
const CATEGORY_TILES = [
  { label: 'Watches',     emoji: '⌚' },
  { label: 'Bags',        emoji: '👜' },
  { label: 'Tech',        emoji: '🎧' },
  { label: 'Apparel',     emoji: '👗' },
  { label: 'Home',        emoji: '🕯️' },
  { label: 'Stationery',  emoji: '✒️' },
  { label: 'Beauty',      emoji: '🖤' },
];

export default function Home() {
  const navigate = useNavigate();
  const products = useSelector(selectAllProducts);

  // Show 4 featured products — hot badge first, then by review count
  const featured = [...products]
    .sort((a, b) => {
      if (a.badge === 'hot' && b.badge !== 'hot') return -1;
      if (b.badge === 'hot' && a.badge !== 'hot') return  1;
      return b.reviews - a.reviews;
    })
    .slice(0, 4);

  return (
    <main>
      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <p className={styles.eyebrow}>// New Season Drop</p>
          <h1 className={styles.heroTitle}>
            Your Vibe,<br /><em>Your Vault</em>
          </h1>
          <p className={styles.heroSub}>
            Handpicked lifestyle essentials — from Jaipur artisans to Mumbai
            designers. Delivered across India with love.
          </p>
          <button className={styles.heroCta} onClick={() => navigate('/products')}>
            Shop the Collection <span>→</span>
          </button>
        </div>
      </section>

      {/* ── Shop by Category  (above Featured) ── */}
      <section className={`container ${styles.section}`}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Shop by Category</h2>
        </div>
        <div className={styles.categoryStrip}>
          {CATEGORY_TILES.map((cat) => (
            <button
              key={cat.label}
              className={styles.catPill}
              onClick={() => navigate(`/products?category=${cat.label}`)}
            >
              <span className={styles.catEmoji}>{cat.emoji}</span>
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* ── Featured Pieces ── */}
      <section className={`container ${styles.section}`}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Featured Pieces</h2>
          <button className={styles.seeAll} onClick={() => navigate('/products')}>
            View all →
          </button>
        </div>
        <div className={styles.grid}>
          {featured.map((product, i) => (
            <div key={product.id} style={{ animationDelay: `${i * 0.08}s` }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
