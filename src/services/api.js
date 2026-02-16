/**
 * services/api.js
 *
 * Simulated async API layer — Indian product catalogue.
 * Replace with real fetch / axios calls when connecting a backend.
 */

// ----------------------------------------------------------------
// Product Data — prices in INR, Indian brand & detail references
// ----------------------------------------------------------------
export const PRODUCTS = [
  {
    id: 1, name: 'Titan Edge Slimline', category: 'Watches',
    price: 8995, originalPrice: 12500, rating: 4.8, reviews: 342,
    emoji: '⌚', badge: 'hot',
    desc: 'Ultra-slim quartz movement in a brushed stainless-steel case. Water-resistant to 30m. Mineral glass dial. India\'s thinnest everyday watch.',
    details: ['Titan quartz movement', '37mm stainless-steel case', 'Mineral glass', '30m water resistance', 'Leather & metal strap options'],
  },
  {
    id: 2, name: 'Forest Essentials Oudh Attar', category: 'Beauty',
    price: 2100, originalPrice: null, rating: 4.7, reviews: 189,
    emoji: '🖤', badge: 'new',
    desc: 'Pure Kashmiri oud blended with sandalwood and saffron. 10ml concentrated attar. Cold-pressed, alcohol-free. Crafted in Lucknow.',
    details: ['10ml Concentrated Attar', 'Base: Kashmiri Oud', 'Heart: Sandalwood, Saffron', 'Alcohol-free formula', 'Crafted in Lucknow, UP'],
  },
  {
    id: 3, name: 'Hidesign Leather Briefcase', category: 'Bags',
    price: 6499, originalPrice: 8500, rating: 4.6, reviews: 94,
    emoji: '👜', badge: 'sale',
    desc: 'Full-grain vegetable-tanned cowhide from Pondicherry. Fits 15" laptop. Solid brass fittings. Handcrafted to age beautifully.',
    details: ['Full-grain cowhide leather', 'Fits 15" laptop', 'Solid brass hardware', 'Hand-stitched by artisans', '3 roomy compartments'],
  },
  {
    id: 4, name: 'boAt Rockerz 550 Pro', category: 'Tech',
    price: 2499, originalPrice: 3999, rating: 4.5, reviews: 5820,
    emoji: '🎧', badge: 'hot',
    desc: 'Signature ENx™ environmental noise cancellation. 80hr playback. Super-bass 40mm drivers. Foldable design. Made for India\'s streets.',
    details: ['80hr battery life', 'ENx™ Noise Cancellation', '40mm Super-Bass drivers', 'Foldable travel design', 'Type-C fast charging'],
  },
  {
    id: 5, name: 'Fabindia Khadi Silk Dupatta', category: 'Apparel',
    price: 1850, originalPrice: null, rating: 4.9, reviews: 67,
    emoji: '🧣', badge: 'new',
    desc: 'Hand-woven khadi silk from Varanasi. Rich natural zari border. 2.5m length. Block-printed floral motif. Naturally dyed with indigo.',
    details: ['100% Khadi Silk', '2.5m length, 55cm width', 'Natural indigo dye', 'Varanasi zari border', 'Hand-woven by cooperative'],
  },
  {
    id: 6, name: 'Nicobar Terracotta Chai Set', category: 'Home',
    price: 1299, originalPrice: 1800, rating: 4.4, reviews: 143,
    emoji: '🫖', badge: 'sale',
    desc: 'Traditional Rajasthani terracotta chai cups and kettle. Set of 4 kullads + 1 kettle. Unglazed, food-safe clay. Keeps chai warm longer.',
    details: ['Set of 4 kullads + kettle', 'Unglazed Rajasthani clay', 'Food-safe, heat-resistant', 'Dishwasher safe', 'Handmade in Jaipur'],
  },
  {
    id: 7, name: 'Camlin Gold Calligraphy Kit', category: 'Stationery',
    price: 895, originalPrice: null, rating: 4.6, reviews: 58,
    emoji: '✒️', badge: 'new',
    desc: '24k gold nib calligraphy pen with 3 flex grades. 6 ink cartridges in traditional Indian ink colours. Includes brass nib holder.',
    details: ['3 nib flex grades', '24k gold-tipped steel nib', '6 Indian ink colour cartridges', 'Brass nib holder', 'Handmade in Kolkata'],
  },
  {
    id: 8, name: 'Sarita Handa Marble Vase', category: 'Home',
    price: 3499, originalPrice: null, rating: 4.7, reviews: 38,
    emoji: '🏺', badge: null,
    desc: 'Hand-carved Makrana marble from Rajasthan. Pietra dura inlay with semi-precious stones. 28cm tall. Each piece a unique heirloom.',
    details: ['Makrana marble, Rajasthan', 'Pietra dura stone inlay', '28cm height', 'Each piece unique', 'Certificate of authenticity'],
  },
  {
    id: 9, name: 'Biba Anarkali Kurta', category: 'Apparel',
    price: 2199, originalPrice: 3200, rating: 4.8, reviews: 215,
    emoji: '👗', badge: 'sale',
    desc: 'Lightweight rayon anarkali with mirror-work embroidery. Flared silhouette. Printed with hand-block technique from Sanganer, Jaipur.',
    details: ['100% Viscose Rayon', 'Mirror-work embroidery', 'Hand-block Sanganer print', 'Flared anarkali silhouette', 'Machine washable'],
  },
  {
    id: 10, name: 'Classmate Premium Fountain Pen', category: 'Stationery',
    price: 649, originalPrice: null, rating: 4.5, reviews: 302,
    emoji: '🖊️', badge: null,
    desc: 'IIT-designed ergonomic grip. German-imported iridium tip for smooth flow. Cartridge + converter compatible. Ideal for Hindi & English script.',
    details: ['Iridium-tipped steel nib', 'Ergonomic rubber grip', 'Cartridge + converter', 'Hindi & English script ready', '2-year warranty'],
  },
  {
    id: 11, name: 'Bellroy Card Sleeve — India Ed.', category: 'Bags',
    price: 3499, originalPrice: null, rating: 4.7, reviews: 412,
    emoji: '💼', badge: 'hot',
    desc: 'Premium full-grain leather. Holds up to 8 cards + bills. RFID blocking for UPI cards. Engraved with India-exclusive lotus motif.',
    details: ['Full-grain leather', 'Holds 8 cards + bills', 'RFID blocking', 'India-exclusive lotus motif', 'Comes in gift box'],
  },
  {
    id: 12, name: 'Kama Ayurveda Soy Dhoop', category: 'Home',
    price: 595, originalPrice: null, rating: 4.9, reviews: 489,
    emoji: '🕯️', badge: 'new',
    desc: '150hr burn time. Blend of pure jasmine, vetiver, and rose. Soy-beeswax base. Hand-poured in earthen pots. Kerala jasmine harvest.',
    details: ['150hr burn time', 'Kerala jasmine + vetiver', 'Pure soy-beeswax blend', 'Hand-poured in earthen pot', 'Sulphur-free wicks'],
  },
];

export const CATEGORIES = ['All', 'Watches', 'Beauty', 'Bags', 'Tech', 'Apparel', 'Home', 'Stationery'];

export const SORT_OPTIONS = [
  { value: 'featured',   label: 'Featured' },
  { value: 'price-asc',  label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
  { value: 'rating',     label: 'Top Rated' },
  { value: 'newest',     label: 'Newest' },
];

// ----------------------------------------------------------------
// Simulated async API calls — swap with real endpoints as needed
// ----------------------------------------------------------------

/** Simulate network latency */
const delay = (ms = 300) => new Promise((res) => setTimeout(res, ms));

/**
 * Fetch all products, optionally filtered and sorted.
 * @param {{ category?: string, sort?: string, maxPrice?: number, query?: string }} params
 */
export async function fetchProducts(params = {}) {
  await delay();
  let list = [...PRODUCTS];
  const { category, sort, maxPrice, query } = params;

  if (category && category !== 'All') list = list.filter((p) => p.category === category);
  if (query) {
    const q = query.toLowerCase();
    list = list.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
  }
  if (maxPrice) list = list.filter((p) => p.price <= maxPrice);

  switch (sort) {
    case 'price-asc':  list.sort((a, b) => a.price - b.price); break;
    case 'price-desc': list.sort((a, b) => b.price - a.price); break;
    case 'rating':     list.sort((a, b) => b.rating - a.rating); break;
    case 'newest':     list.sort((a, b) => b.id - a.id); break;
    default: break;
  }
  return { data: list, total: list.length };
}

/**
 * Fetch a single product by ID.
 * @param {number} id
 */
export async function fetchProductById(id) {
  await delay(200);
  const product = PRODUCTS.find((p) => p.id === Number(id));
  if (!product) throw new Error(`Product ${id} not found`);
  return { data: product };
}

/**
 * Simulate user sign-in.
 * @param {{ email: string, password: string }} credentials
 */
export async function signIn({ email, password }) {
  await delay(500);
  if (!email.includes('@') || password.length < 6) throw new Error('Invalid credentials');
  return { data: { id: Math.random().toString(36).slice(2), name: email.split('@')[0], email } };
}

/**
 * Simulate user sign-up.
 * @param {{ name: string, email: string, password: string }} payload
 */
export async function signUp({ name, email, password }) {
  await delay(600);
  if (!name || !email.includes('@') || password.length < 6) throw new Error('Invalid registration data');
  return { data: { id: Math.random().toString(36).slice(2), name, email } };
}

/**
 * Simulate order placement.
 * @param {{ items: Array, shipping: object, total: number }} orderData
 */
export async function placeOrder(orderData) {
  await delay(800);
  return {
    data: {
      orderId: `VV-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
      status: 'confirmed',
      estimatedDelivery: '3–5 business days',
      ...orderData,
    },
  };
}
