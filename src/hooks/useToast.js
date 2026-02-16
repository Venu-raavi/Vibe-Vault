import { useCallback } from 'react';

// Global toast event bus (avoids needing a Redux slice for transient UI)
const TOAST_EVENT = 'nox:toast';

/**
 * Dispatch a toast notification from anywhere in the tree.
 * @param {string} message
 * @param {'info'|'success'|'error'} type
 * @param {number} duration  milliseconds before auto-dismiss
 */
export function useToast() {
  return useCallback((message, type = 'info', duration = 3000) => {
    window.dispatchEvent(
      new CustomEvent(TOAST_EVENT, { detail: { message, type, duration } })
    );
  }, []);
}

export { TOAST_EVENT };
