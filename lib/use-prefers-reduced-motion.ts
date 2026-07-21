import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

/**
 * SSR-safe prefers-reduced-motion check. Unlike reading window.matchMedia
 * directly (or framer-motion's own useReducedMotion, which does exactly
 * that in a lazy useState initializer), useSyncExternalStore is React's own
 * mechanism for a value that can legitimately differ between the server
 * snapshot and the client's — it re-renders after hydration instead of
 * producing a hydration mismatch.
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
