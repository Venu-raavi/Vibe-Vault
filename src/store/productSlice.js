import { createSlice } from '@reduxjs/toolkit';
import { PRODUCTS } from '../services/api';

const savedWishlist = localStorage.getItem('vibevault-wishlist');

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items:       PRODUCTS,
    category:    'All',
    sort:        'featured',
    maxPrice:    50000,
    searchQuery: '',
    wishlist:    savedWishlist ? JSON.parse(savedWishlist) : [],
    selectedId:  null,
  },
  reducers: {
    setCategory(state, action)   { state.category    = action.payload; },
    setSort(state, action)       { state.sort         = action.payload; },
    setMaxPrice(state, action)   { state.maxPrice     = action.payload; },
    setSearchQuery(state, action){ state.searchQuery  = action.payload; },
    setSelectedId(state, action) { state.selectedId   = action.payload; },

    toggleWishlist(state, action) {
      const id = action.payload;
      const idx = state.wishlist.indexOf(id);
      if (idx === -1) {
        state.wishlist.push(id);
      } else {
        state.wishlist.splice(idx, 1);
      }
      localStorage.setItem('vibevault-wishlist', JSON.stringify(state.wishlist));
    },

    resetFilters(state) {
      state.category    = 'All';
      state.sort        = 'featured';
      state.maxPrice    = 50000;
      state.searchQuery = '';
    },
  },
});

// ---- Selectors ----
export const selectAllProducts = s => s.products.items;
export const selectCategory    = s => s.products.category;
export const selectSort        = s => s.products.sort;
export const selectMaxPrice    = s => s.products.maxPrice;
export const selectSearchQuery = s => s.products.searchQuery;
export const selectWishlist    = s => s.products.wishlist;
export const selectSelectedId  = s => s.products.selectedId;

export const selectProductById = id => s =>
  s.products.items.find(p => p.id === id);

export const selectIsWishlisted = id => s =>
  s.products.wishlist.includes(id);

// Derive filtered + sorted product list
export const selectFilteredProducts = s => {
  const { items, category, sort, maxPrice, searchQuery } = s.products;
  let list = [...items];

  if (category !== 'All') {
    list = list.filter(p => p.category === category);
  }
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    list = list.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.desc.toLowerCase().includes(q)
    );
  }
  list = list.filter(p => p.price <= maxPrice);

  switch (sort) {
    case 'price-asc':  return list.sort((a, b) => a.price - b.price);
    case 'price-desc': return list.sort((a, b) => b.price - a.price);
    case 'rating':     return list.sort((a, b) => b.rating - a.rating);
    case 'newest':     return list.sort((a, b) => b.id - a.id);
    default:           return list;
  }
};

// Autocomplete suggestions
export const selectSuggestions = query => s => {
  if (!query || query.length < 2) return [];
  const q = query.toLowerCase();
  return s.products.items
    .filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
    .slice(0, 6);
};

export const {
  setCategory, setSort, setMaxPrice, setSearchQuery,
  setSelectedId, toggleWishlist, resetFilters,
} = productSlice.actions;

export default productSlice.reducer;
