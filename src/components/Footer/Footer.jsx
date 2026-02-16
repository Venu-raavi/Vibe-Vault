import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Footer.module.css';

/**
 * Footer — professional multi-column layout.
 * Sections: Brand info, Shop links, Help links, Contact, Legal strip.
 */

const SHOP_LINKS = [
  { label: 'All Products',  path: '/products' },
  { label: 'New Arrivals',  path: '/products?badge=new' },
  { label: 'Sale',          path: '/products?badge=sale' },
  { label: 'My Wishlist',   path: '/wishlist' },
  { label: 'My Cart',       path: '/cart' },
];

const HELP_LINKS = [
  { label: 'Track My Order',       path: '/' },
  { label: 'Returns & Exchanges',  path: '/' },
  { label: 'Shipping Policy',      path: '/' },
  { label: 'Size Guide',           path: '/' },
  { label: 'FAQs',                 path: '/' },
];

const PAYMENT_ICONS = ['UPI', 'Visa', 'MC', 'RuPay', 'NetBanking', 'EMI'];

const SOCIAL_LINKS = [
  { label: 'Instagram', icon: '📸', href: '#' },
  { label: 'Twitter',   icon: '𝕏',  href: '#' },
  { label: 'YouTube',   icon: '▶',  href: '#' },
  { label: 'Pinterest', icon: '📌', href: '#' },
];

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className={styles.footer}>
      {/* ── Newsletter Banner ── */}
      <div className={styles.newsletter}>
        <div className={`container ${styles.newsletterInner}`}>
          <div>
            <h3 className={styles.newsletterTitle}>Get Early Access & Deals</h3>
            <p className={styles.newsletterSub}>
              Join 50,000+ shoppers. No spam — only what's worth your attention.
            </p>
          </div>
          <div className={styles.newsletterForm}>
            <input
              className={styles.newsletterInput}
              type="email"
              placeholder="yourname@gmail.com"
              aria-label="Email for newsletter"
            />
            <button className={styles.newsletterBtn}>Subscribe</button>
          </div>
        </div>
      </div>

      {/* ── Main Footer Columns ── */}
      <div className={`container ${styles.main}`}>
        {/* Brand column */}
        <div className={styles.brandCol}>
          <button className={styles.brandName} onClick={() => navigate('/')} aria-label="Go home">
            Vibe<span>Vault</span>
          </button>
          <p className={styles.brandTagline}>
            India's curated lifestyle destination. Handpicked pieces from trusted artisans and brands across the country.
          </p>

          {/* Social icons */}
          <div className={styles.socialRow}>
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className={styles.socialIcon}
                aria-label={s.label}
                rel="noreferrer"
                target="_blank"
              >
                {s.icon}
              </a>
            ))}
          </div>

          {/* Trust badges */}
          <div className={styles.trustBadges}>
            <span className={styles.trustBadge}>🔒 Secure Payments</span>
            <span className={styles.trustBadge}>🔄 Easy Returns</span>
            <span className={styles.trustBadge}>🚚 Pan-India Delivery</span>
          </div>
        </div>

        {/* Shop links */}
        <div className={styles.linkCol}>
          <h4 className={styles.colHeading}>Shop</h4>
          <ul className={styles.linkList}>
            {SHOP_LINKS.map((l) => (
              <li key={l.label}>
                <button className={styles.footerLink} onClick={() => navigate(l.path)}>
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Help links */}
        <div className={styles.linkCol}>
          <h4 className={styles.colHeading}>Help</h4>
          <ul className={styles.linkList}>
            {HELP_LINKS.map((l) => (
              <li key={l.label}>
                <button className={styles.footerLink} onClick={() => navigate(l.path)}>
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact column */}
        <div className={styles.linkCol}>
          <h4 className={styles.colHeading}>Contact Us</h4>
          <ul className={styles.contactList}>
            <li className={styles.contactItem}>
              <span className={styles.contactIcon}>📍</span>
              <span>42, Linking Road, Bandra West<br />Mumbai, MH 400050</span>
            </li>
            <li className={styles.contactItem}>
              <span className={styles.contactIcon}>📞</span>
              <a href="tel:+918001234567" className={styles.contactLink}>+91 800 123 4567</a>
            </li>
            <li className={styles.contactItem}>
              <span className={styles.contactIcon}>✉️</span>
              <a href="mailto:hello@vibevault.in" className={styles.contactLink}>hello@vibevault.in</a>
            </li>
            <li className={styles.contactItem}>
              <span className={styles.contactIcon}>🕐</span>
              <span>Mon–Sat, 9 AM – 7 PM IST</span>
            </li>
          </ul>
        </div>
      </div>

      {/* ── Payment methods ── */}
      <div className={styles.paymentStrip}>
        <div className={`container ${styles.paymentInner}`}>
          <span className={styles.paymentLabel}>We accept:</span>
          <div className={styles.paymentIcons}>
            {PAYMENT_ICONS.map((icon) => (
              <span key={icon} className={styles.paymentPill}>{icon}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Legal strip ── */}
      <div className={styles.legal}>
        <div className={`container ${styles.legalInner}`}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Vibe Vault Private Limited. All rights reserved. 
            GST: 27AABCV1234M1Z5 · Made with ♥ in India
          </p>
          <div className={styles.legalLinks}>
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Sitemap'].map((label) => (
              <button key={label} className={styles.legalLink}>{label}</button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
