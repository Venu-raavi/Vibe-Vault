import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, closeAuthModal, setAuthMode, selectAuthMode } from '../../store/userSlice';
import { signIn, signUp } from '../../services/api';
import { useToast } from '../../hooks/useToast';
import { validateForm, required, minLength, isEmail } from '../../utils/validators';
import Modal from './Modal';
import styles from './common.module.css';

export default function AuthModal() {
  const dispatch = useDispatch();
  const toast    = useToast();
  const mode     = useSelector(selectAuthMode);
  const isSignUp = mode === 'signup';

  const [form,    setForm]    = useState({ name: '', email: '', password: '' });
  const [errors,  setErrors]  = useState({});
  const [loading, setLoading] = useState(false);

  const update = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async () => {
    const rules = {
      email:    [isEmail],
      password: [(v) => minLength(v, 6, 'Password')],
      ...(isSignUp ? { name: [(v) => required(v, 'Name')] } : {}),
    };
    const errs = validateForm(form, rules);
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    try {
      const { data } = isSignUp
        ? await signUp(form)
        : await signIn(form);
      dispatch(setUser(data));
      toast(`Welcome${data.name ? `, ${data.name}` : ''}!`, 'success');
    } catch (err) {
      toast(err.message || 'Authentication failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal onClose={() => dispatch(closeAuthModal())}>
      <div className={styles.authModal}>
        <h2 className={styles.authTitle}>
          {isSignUp ? 'Create Account' : 'Welcome Back'}
        </h2>
        <p className={styles.authSub}>
          {isSignUp ? 'Join the Vibe Vault community.' : 'Sign in to your account.'}
        </p>

        {isSignUp && (
          <div className={styles.formGroup}>
            <label className={styles.label}>Full Name</label>
            <input
              className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
              placeholder="Your name"
              value={form.name}
              onChange={update('name')}
            />
            {errors.name && <span className={styles.errorMsg}>{errors.name}</span>}
          </div>
        )}

        <div className={styles.formGroup}>
          <label className={styles.label}>Email Address</label>
          <input
            type="email"
            className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
            placeholder="arjun@gmail.com"
            value={form.email}
            onChange={update('email')}
          />
          {errors.email && <span className={styles.errorMsg}>{errors.email}</span>}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Password</label>
          <input
            type="password"
            className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
            placeholder="••••••••"
            value={form.password}
            onChange={update('password')}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          />
          {errors.password && <span className={styles.errorMsg}>{errors.password}</span>}
        </div>

        <button
          className={styles.authSubmit}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Please wait…' : (isSignUp ? 'Create Account →' : 'Sign In →')}
        </button>

        <p className={styles.authToggle}>
          {isSignUp ? 'Already have an account? ' : 'New here? '}
          <button
            className={styles.authToggleBtn}
            onClick={() => { dispatch(setAuthMode(isSignUp ? 'signin' : 'signup')); setErrors({}); }}
          >
            {isSignUp ? 'Sign in' : 'Create account'}
          </button>
        </p>
      </div>
    </Modal>
  );
}
