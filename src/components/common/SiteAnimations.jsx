import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * SiteAnimations — Global animation layer for Grovix landing page
 * Handles: Heading reveal, Counter, Spotlight, Magnetic buttons
 * Mount once inside LandingPage — zero extra markup needed.
 */
const SiteAnimations = () => {
  useEffect(() => {
    // Small delay so all components mount first
    const initTimer = setTimeout(() => {
      initHeadingReveal();
      initCounters();
      initSpotlight();
      initMagneticButtons();
    }, 700);

    return () => {
      clearTimeout(initTimer);
    };
  }, []);

  return null; // No DOM output — pure effect component
};

/* ─────────────────────────────────────────────
   1. SECTION HEADING SPLIT REVEAL
   All h2 elements animate word by word via
   clip-path / yPercent on scroll
───────────────────────────────────────────── */
function initHeadingReveal() {
  const headings = document.querySelectorAll('h2:not([data-no-reveal])');

  headings.forEach((h2) => {
    if (h2.dataset.revealDone) return;
    h2.dataset.revealDone = 'true';

    const html = h2.innerHTML;
    const words = html.split(/(\s+)/);

    h2.innerHTML = words
      .map((w) =>
        w.trim()
          ? `<span style="display:inline-block;overflow:hidden;vertical-align:bottom;"><span class="rv-word" style="display:inline-block;will-change:transform;">${w}</span></span>`
          : w
      )
      .join('');

    const wordEls = h2.querySelectorAll('.rv-word');
    gsap.set(wordEls, { yPercent: 110, opacity: 0 });

    gsap.to(wordEls, {
      yPercent: 0,
      opacity: 1,
      duration: 0.85,
      ease: 'power4.out',
      stagger: 0.07,
      scrollTrigger: {
        trigger: h2,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
    });
  });
}

/* ─────────────────────────────────────────────
   2. COUNTER ANIMATION
   Add data-count="99.98" data-count-suffix="%"
   to any element to get animated counting
───────────────────────────────────────────── */
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');

  counters.forEach((el) => {
    if (el.dataset.countDone) return;
    el.dataset.countDone = 'true';

    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.countSuffix || '';
    const decimals = parseInt(el.dataset.countDecimals || '0');
    const obj = { val: 0 };

    gsap.to(obj, {
      val: target,
      duration: 2.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      onUpdate() {
        el.textContent = obj.val.toFixed(decimals) + suffix;
      },
      onComplete() {
        el.textContent = target.toFixed(decimals) + suffix;
      },
    });
  });
}

/* ─────────────────────────────────────────────
   3. SPOTLIGHT / TORCH EFFECT
   Soft radial blue glow follows mouse on
   dark bg sections (footer, CTASection etc)
───────────────────────────────────────────── */
function initSpotlight() {
  const spotlight = document.createElement('div');
  spotlight.id = 'grovix-spotlight';
  spotlight.style.cssText = `
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 30;
    opacity: 0;
    transition: opacity 0.5s ease;
    background: radial-gradient(500px circle at var(--sx, 50%) var(--sy, 50%),
      rgba(47, 79, 210, 0.08) 0%,
      rgba(47, 79, 210, 0.03) 35%,
      transparent 70%
    );
  `;
  document.body.appendChild(spotlight);

  let rafId = null;
  let isOverDark = false;

  const onMouseMove = (e) => {
    const el = document.elementFromPoint(e.clientX, e.clientY);
    const overDark = !!(el && el.closest('footer, [data-dark="true"], .dark-section'));

    if (overDark !== isOverDark) {
      isOverDark = overDark;
      spotlight.style.opacity = overDark ? '1' : '0';
    }

    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      spotlight.style.setProperty('--sx', e.clientX + 'px');
      spotlight.style.setProperty('--sy', e.clientY + 'px');
    });
  };

  window.addEventListener('mousemove', onMouseMove, { passive: true });
}

/* ─────────────────────────────────────────────
   4. MAGNETIC BUTTONS
   Add data-magnetic to any button/link
   for cursor pull-toward effect on hover
───────────────────────────────────────────── */
function initMagneticButtons() {
  // Target the main CTA and nav buttons
  const buttons = document.querySelectorAll('[data-magnetic]');

  buttons.forEach((btn) => {
    if (btn.dataset.magneticDone) return;
    btn.dataset.magneticDone = 'true';

    const strength = parseFloat(btn.dataset.magneticStrength || '0.38');

    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const dx = (e.clientX - (rect.left + rect.width / 2)) * strength;
      const dy = (e.clientY - (rect.top + rect.height / 2)) * strength;
      gsap.to(btn, { x: dx, y: dy, duration: 0.28, ease: 'power2.out' });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.55, ease: 'elastic.out(1, 0.4)' });
    });
  });
}

export default SiteAnimations;
