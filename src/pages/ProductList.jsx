import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectFilteredProducts,
  selectCategory, selectSort, selectMaxPrice,
  setCategory, setSort, setMaxPrice, resetFilters,
} from '../store/productSlice';
import { CATEGORIES, SORT_OPTIONS } from '../services/api';
import ProductCard from '../components/ProductCard/ProductCard';
import { fmt } from '../utils/formatters';
import styles from './pages.module.css';

const PRICE_MIN = 500;
const PRICE_MAX = 50000;

export default function ProductList() {
  const dispatch  = useDispatch();
  const [params]  = useSearchParams();
  const products  = useSelector(selectFilteredProducts);
  const category  = useSelector(selectCategory);
  const sort      = useSelector(selectSort);
  const maxPrice  = useSelector(selectMaxPrice);

  // Sync URL params → store on mount; reset on unmount
  useEffect(() => {
    const cat = params.get('category');
    if (cat) dispatch(setCategory(cat));
    return () => dispatch(resetFilters());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const pricePercent = ((maxPrice - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;

  return (
    <main className="container">
      <div className={styles.sectionHeader} style={{ paddingTop: '2rem' }}>
        <h1 className={styles.sectionTitle}>The Catalogue</h1>
        <span className={styles.countLabel}>{products.length} products</span>
      </div>

      {/* ── Filter Bar ── */}
      <div className={styles.filterBar}>
        {/* Category chips */}
        <div className={styles.chipGroup}>
          {CATEGORIES.map((c) => (
            <button
              key={c}
              className={`${styles.chip} ${category === c ? styles.chipActive : ''}`}
              onClick={() => dispatch(setCategory(c))}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Price range slider */}
        <div className={styles.priceFilter}>
          <span>Max</span>
          <input
            type="range"
            className={styles.slider}
            min={PRICE_MIN}
            max={PRICE_MAX}
            step={500}
            value={maxPrice}
            style={{ '--val': `${pricePercent}%` }}
            onChange={(e) => dispatch(setMaxPrice(Number(e.target.value)))}
            aria-label="Maximum price filter"
          />
          <span className={styles.priceLabel}>{fmt(maxPrice)}</span>
        </div>

        {/* Sort select */}
        <select
          className={styles.sortSelect}
          value={sort}
          onChange={(e) => dispatch(setSort(e.target.value))}
          aria-label="Sort products"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      {/* ── Product Grid ── */}
      {products.length > 0 ? (
        <div className={styles.grid}>
          {products.map((product, i) => (
            <div key={product.id} style={{ animationDelay: `${i * 0.04}s` }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <span>No products match your current filters.</span>
          <button className={styles.resetBtn} onClick={() => dispatch(resetFilters())}>
            Clear all filters
          </button>
        </div>
      )}
    </main>
  );
}
