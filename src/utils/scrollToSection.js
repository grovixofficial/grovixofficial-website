/**
 * Consolidated anchor-scroll utility.
 *
 * All internal section navigation on the Grovix landing page should go
 * through this helper instead of duplicating Lenis / scrollIntoView logic
 * across components.
 *
 * Behaviour:
 *   - Uses the global Lenis instance (window.__lenis) when available.
 *   - Falls back to a native smooth scroll when Lenis is not initialised
 *     (e.g. during SSR, reduced-motion, or after cleanup).
 *   - Applies a consistent vertical offset so fixed elements (navbar)
 *     do not cover the target.
 *   - Silently no-ops when the target element does not exist.
 */

const SECTION_OFFSET = -70;

/**
 * Scroll to a DOM element by reference.
 *
 * @param {HTMLElement} el
 * @param {object} [options]
 * @param {number} [options.offset] - vertical offset in px (negative = scroll down)
 * @param {number} [options.duration] - Lenis duration override
 */
export function scrollToElement(el, options = {}) {
  if (!el) return;

  const offset = options.offset ?? SECTION_OFFSET;
  const lenis = window.__lenis;

  if (lenis && typeof lenis.scrollTo === 'function') {
    lenis.scrollTo(el, {
      offset,
      duration: options.duration ?? 1.0,
    });
    return;
  }

  // Fallback for environments without Lenis
  const y = el.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top: y, behavior: 'smooth' });
}

/**
 * Scroll to a section by its CSS id (e.g. "#services").
 *
 * @param {string} id - CSS selector, with or without leading "#"
 * @param {object} [options]
 */
export function scrollToId(id, options = {}) {
  if (!id) return;

  const selector = id.startsWith('#') ? id : `#${id}`;
  const el = document.querySelector(selector);
  if (!el) return;

  scrollToElement(el, options);
}

/**
 * React-friendly handler for anchor links. Use as:
 *
 *   <a href="#services" onClick={(e) => handleAnchorClick(e, '#services')}>
 */
export function handleAnchorClick(e, id, options = {}) {
  if (!id || id === '#') return;
  e.preventDefault();
  scrollToId(id, options);
}