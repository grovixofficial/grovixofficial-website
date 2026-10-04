import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

/**
 * Minimalist Brand Dot Cursor with Dynamic Morphing Badges
 * - Clean round dot in brand Royal Blue (#2F4FD2) at rest
 * - Over Service items or [data-cursor="view"]:
 *   Expands into an 82px circle with bold white "VIEW" text
 * - As soon as the cursor leaves the item, "VIEW" option is IMMEDIATELY removed
 * - Over interactive buttons/links: subtle scale expansion
 * - Zero trailing lines, zero extra clutter
 * - Mobile/touch safe
 */
const CustomCursor = () => {
  const dotRef = useRef(null);
  const textRef = useRef(null);
  const [cursorText, setCursorText] = useState('');

  useEffect(() => {
    // Only enable on desktop pointer devices
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const dot = dotRef.current;
    const textEl = textRef.current;
    if (!dot) return;

    // Enable custom cursor styling (hides default OS pointer on desktop)
    document.documentElement.classList.add('has-custom-cursor');

    // Ensure dot is centered exactly on mouse coordinates regardless of width/height
    gsap.set(dot, { xPercent: -50, yPercent: -50 });

    let isVisible = false;
    let currentMode = 'default'; // 'default' | 'hover' | 'view'
    let lastTarget = null;
    let lastClientX = 0;
    let lastClientY = 0;

    // Ultra-fast zero-latency tracking
    const xDot = gsap.quickTo(dot, 'x', { duration: 0.06, ease: 'power2.out' });
    const yDot = gsap.quickTo(dot, 'y', { duration: 0.06, ease: 'power2.out' });

    // Mode Controller: Smooth transitions between default, hover, and view
    const setMode = (mode) => {
      if (currentMode === mode) return;
      currentMode = mode;

      if (mode === 'view') {
        setCursorText('VIEW');
        gsap.to(dot, {
          width: 82,
          height: 82,
          backgroundColor: '#2F4FD2',
          borderColor: 'rgba(255, 255, 255, 0.45)',
          borderWidth: '1.5px',
          boxShadow: '0 12px 34px rgba(47, 79, 210, 0.55), 0 0 20px rgba(78, 113, 255, 0.4)',
          duration: 0.22,
          ease: 'power3.out',
          overwrite: 'auto',
        });

        if (textEl) {
          gsap.to(textEl, {
            opacity: 1,
            scale: 1,
            duration: 0.18,
            ease: 'back.out(2)',
            overwrite: 'auto',
          });
        }
      } else if (mode === 'hover') {
        if (textEl) {
          gsap.to(textEl, {
            opacity: 0,
            scale: 0,
            duration: 0.12,
            overwrite: 'auto',
            onComplete: () => setCursorText(''),
          });
        }

        gsap.to(dot, {
          width: 24,
          height: 24,
          backgroundColor: '#3B66F5',
          borderColor: 'rgba(255, 255, 255, 0.6)',
          borderWidth: '1px',
          boxShadow: '0 0 16px rgba(59, 102, 245, 0.7)',
          duration: 0.18,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      } else {
        // default state: clean 12px brand dot (instantly remove VIEW)
        if (textEl) {
          gsap.to(textEl, {
            opacity: 0,
            scale: 0,
            duration: 0.12,
            overwrite: 'auto',
            onComplete: () => setCursorText(''),
          });
        }

        gsap.to(dot, {
          width: 12,
          height: 12,
          backgroundColor: '#2F4FD2',
          borderColor: 'rgba(255, 255, 255, 0.5)',
          borderWidth: '1px',
          boxShadow: '0 0 10px rgba(47, 79, 210, 0.6)',
          duration: 0.18,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }
    };

    // Evaluate target under cursor immediately
    const evaluateTarget = (target) => {
      if (!target || !(target instanceof Element)) {
        setMode('default');
        return;
      }

      // Check strictly for VIEW targets (inside service rows, specific data-cursor="view" items)
      const isViewTarget = target.closest(
        '[data-cursor="view"], [data-cursor-text="VIEW"], .cursor-view, .service-row'
      );

      if (isViewTarget) {
        setMode('view');
        return;
      }

      // Check for clickable interactive buttons/links
      const isClickable = target.closest(
        'button, a, input, textarea, select, [role="button"], [data-cursor="hover"]'
      );

      if (isClickable) {
        setMode('hover');
        return;
      }

      // Default: clean 12px dot (remove VIEW instantly)
      setMode('default');
    };

    // Continuous Mouse Movement Tracking
    const onMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;
      lastClientX = x;
      lastClientY = y;

      if (!isVisible) {
        isVisible = true;
        gsap.to(dot, { opacity: 1, duration: 0.2, overwrite: 'auto' });
      }

      xDot(x);
      yDot(y);

      // Re-evaluate target on movement so leaving any item immediately removes VIEW!
      if (e.target !== lastTarget) {
        lastTarget = e.target;
        evaluateTarget(e.target);
      }
    };

    const onMouseOver = (e) => {
      lastTarget = e.target;
      evaluateTarget(e.target);
    };

    // On scroll, check if element under cursor changed
    const onScroll = () => {
      if (lastClientX || lastClientY) {
        const el = document.elementFromPoint(lastClientX, lastClientY);
        if (el && el !== lastTarget) {
          lastTarget = el;
          evaluateTarget(el);
        }
      }
    };

    // Click micro-press effect
    const onMouseDown = () => {
      gsap.to(dot, {
        scale: currentMode === 'view' ? 0.92 : 0.75,
        duration: 0.1,
        ease: 'power2.inOut',
      });
    };

    const onMouseUp = () => {
      gsap.to(dot, {
        scale: 1,
        duration: 0.2,
        ease: 'back.out(2)',
      });
    };

    const onMouseLeave = () => {
      isVisible = false;
      lastTarget = null;
      setMode('default');
      gsap.to(dot, { opacity: 0, duration: 0.2, overwrite: 'auto' });
    };

    const onMouseEnter = () => {
      isVisible = true;
      gsap.to(dot, { opacity: 1, duration: 0.2, overwrite: 'auto' });
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none hidden md:block"
    >
      {/* Dynamic Brand Dot with Smooth Badge Expansion */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none opacity-0 bg-[#2F4FD2] shadow-[0_0_10px_rgba(47,79,210,0.6)] border border-white/50 flex items-center justify-center select-none"
        style={{ willChange: 'transform, width, height, border-radius' }}
      >
        {/* Dynamic Context Text (e.g. 'VIEW') */}
        <span
          ref={textRef}
          className="font-mono text-[11px] font-extrabold tracking-widest text-white uppercase opacity-0 transform scale-0 whitespace-nowrap drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] select-none pointer-events-none"
        >
          {cursorText}
        </span>
      </div>
    </div>
  );
};

export default CustomCursor;
