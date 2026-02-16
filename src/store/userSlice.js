import { createSlice } from '@reduxjs/toolkit';

const savedUser = localStorage.getItem('vibevault-user');

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser:      savedUser ? JSON.parse(savedUser) : null,
    isAuthModalOpen:  false,
    authMode:         'signin', // 'signin' | 'signup'
  },
  reducers: {
    setUser(state, action) {
      state.currentUser = action.payload;
      localStorage.setItem('vibevault-user', JSON.stringify(action.payload));
      state.isAuthModalOpen = false;
    },

    logout(state) {
      state.currentUser = null;
      localStorage.removeItem('vibevault-user');
    },

    openAuthModal(state, action) {
      state.isAuthModalOpen = true;
      state.authMode = action.payload ?? 'signin';
    },

    closeAuthModal(state) {
      state.isAuthModalOpen = false;
    },

    setAuthMode(state, action) {
      state.authMode = action.payload;
    },
  },
});

// ---- Selectors ----
export const selectCurrentUser     = s => s.user.currentUser;
export const selectIsLoggedIn      = s => Boolean(s.user.currentUser);
export const selectIsAuthModalOpen = s => s.user.isAuthModalOpen;
export const selectAuthMode        = s => s.user.authMode;

export const {
  setUser, logout, openAuthModal, closeAuthModal, setAuthMode,
} = userSlice.actions;

export default userSlice.reducer;
