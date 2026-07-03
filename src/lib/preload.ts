/**
 * Shared with Preloader and SynapseHero so the hero's intro sequence starts
 * at the same point in both cases: right after the preloader disappears
 * (first visit) or immediately (later navigations, once already preloaded).
 */

export const PRELOADER_SESSION_KEY = "preloaded";

// Count animation (1100ms) + hold (180ms) — how long the preloader stays
// opaque before it starts fading out. Its own 500ms exit fade is left out on
// purpose so it can crossfade with the hero's intro instead of gating it.
export const PRELOADER_VISIBLE_MS = 1100 + 180;

export function willShowPreloader(reduceMotion: boolean) {
  if (reduceMotion) return false;
  try {
    return !sessionStorage.getItem(PRELOADER_SESSION_KEY);
  } catch {
    return true;
  }
}
