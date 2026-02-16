import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchQuery, selectSuggestions } from '../../store/productSlice';
import styles from './Header.module.css';

export default function SearchBar() {
  const [query, setQuery]   = useState('');
  const [open, setOpen]     = useState(false);
  const dispatch            = useDispatch();
  const navigate            = useNavigate();
  const suggestions         = useSelector(selectSuggestions(query));
  const wrapperRef          = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (!wrapperRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleChange = (e) => {
    setQuery(e.target.value);
    dispatch(setSearchQuery(e.target.value));
    setOpen(true);
  };

  const handleSelect = (product) => {
    setQuery(product.name);
    setOpen(false);
    navigate(`/products/${product.id}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(false);
    navigate(`/products?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className={styles.searchWrapper} ref={wrapperRef}>
      <form onSubmit={handleSubmit}>
        <input
          className={styles.searchInput}
          placeholder="Search products…"
          value={query}
          onChange={handleChange}
          onFocus={() => setOpen(true)}
          aria-label="Search products"
        />
        <span className={styles.searchIcon} aria-hidden>⌕</span>
      </form>

      {open && suggestions.length > 0 && (
        <ul className={styles.dropdown} role="listbox">
          {suggestions.map(p => (
            <li
              key={p.id}
              className={styles.dropdownItem}
              role="option"
              onMouseDown={() => handleSelect(p)}
            >
              <span>{p.emoji}</span>
              <span className={styles.dropdownDot} />
              <span>{p.name}</span>
              <span className={styles.dropdownCategory}>{p.category}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
