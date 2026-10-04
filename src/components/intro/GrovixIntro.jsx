import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';

// Development toggle: set to true so user can review the animation on every refresh
const SHOW_INTRO_ALWAYS = true;

const kickerWords = ['PRACTICAL', 'DIGITAL', 'SYSTEMS', 'FOR', 'GROWING', 'BUSINESSES'];
const weLetters = ['W', 'E'];
const buildLetters = ['B', 'U', 'I', 'L', 'D'];
const grovixLetters = ['G', 'R', 'O', 'V', 'I', 'X'];
const taglineWords = ['AUTOMATE', 'BETTER.', 'GROW', 'FASTER.'];

const GrovixIntro = ({ liveSiteRef, onComplete }) => {
  const [shouldRender, setShouldRender] = useState(true);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });

  const backdropRef = useRef(null);
  const introLayerRef = useRef(null);
  const centerAnchorRef = useRef(null);
  const mobileCardRef = useRef(null);
  const skipRef = useRef(null);
  const tlRef = useRef(null);

  // Pure Percentage Counter Ref (ONLY NUMBER)
  const counterBoxRef = useRef(null);
  const counterNumRef = useRef(null);

  // Mouse Interactive 3D Tilt & Parallax Refs
  const tiltWrapperRef = useRef(null);
  const mouseGlowRef = useRef(null);
  const isIntroActive = useRef(true);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Use useEffect so liveSiteRef.current DOM node is fully committed and available
  useEffect(() => {
    // Session check (only if SHOW_INTRO_ALWAYS is false)
    const hasSeen = sessionStorage.getItem('grovix_intro_seen');
    if (hasSeen && !SHOW_INTRO_ALWAYS) {
      setShouldRender(false);
      if (liveSiteRef?.current) {
        gsap.set(liveSiteRef.current, { clearProps: 'all' });
      }
      if (onComplete) onComplete();
      return;
    }

    // Prefers-reduced-motion check
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      sessionStorage.setItem('grovix_intro_seen', 'true');
      setShouldRender(false);
      if (liveSiteRef?.current) {
        gsap.set(liveSiteRef.current, { clearProps: 'all' });
      }
      if (onComplete) onComplete();
      return;
    }

    const ctx = gsap.context(() => {
      if (!backdropRef.current) return;

      const screenW = window.innerWidth;
      const screenH = window.innerHeight;
      const isMobileView = screenW < 768;

      // 1. DYNAMIC ANCHOR SIZING & PLACEMENT
      let anchorW, anchorH, targetScale, targetX, targetY;

      if (isMobileView) {
        // MOBILE ULTRA-PERFORMANCE ARCHITECTURE:
        // Never 3D-transform, scale, or clip the massive 15,000px live DOM tree on mobile phones.
        // Keep liveSite sitting normal and hidden until reveal, ensuring 60-120fps on any phone.
        if (liveSiteRef?.current) {
          gsap.set(liveSiteRef.current, {
            opacity: 0,
            pointerEvents: 'none',
          });
        }

        if (mobileCardRef.current) {
          gsap.set(mobileCardRef.current, {
            rotateY: -180,
            opacity: 0,
            scale: 0.82,
            transformPerspective: 800,
          });
        }
      } else {
        // Desktop dimensions (WE [CARD] BUILD)
        anchorW = Math.min(Math.max(screenW * 0.20, 180), 280);
        anchorH = anchorW * (screenH / screenW);

        if (centerAnchorRef.current) {
          centerAnchorRef.current.style.width = `${anchorW}px`;
          centerAnchorRef.current.style.height = `${anchorH}px`;
        }

        targetScale = anchorW / screenW;
        const rect = centerAnchorRef.current.getBoundingClientRect();
        const anchorCenterX = rect.left + rect.width / 2;
        const anchorCenterY = rect.top + rect.height / 2;

        targetX = anchorCenterX - screenW / 2;
        targetY = anchorCenterY - screenH / 2;

        if (liveSiteRef?.current) {
          gsap.set(liveSiteRef.current, {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            overflow: 'hidden',
            zIndex: 90,
            transformOrigin: 'center center',
            x: targetX,
            y: targetY,
            scale: targetScale * 0.7,
            rotateY: -180,
            transformPerspective: 1000,
            borderRadius: '16px',
            border: '2px solid rgba(255,255,255,0.35)',
            boxShadow: '0 25px 60px rgba(0,0,0,0.95), 0 0 40px rgba(47,79,210,0.25)',
            pointerEvents: 'none',
            opacity: 0,
          });
        }
      }

      // Initial States
      gsap.set(backdropRef.current, { autoAlpha: 1 });
      gsap.set('.gsap-kicker-word', {
        yPercent: 120,
        opacity: 0,
      });

      // Helper to initialize multi-directional letter positions (top, bottom, left, right)
      const setMultiDirectionalInitial = (selector) => {
        const els = document.querySelectorAll(selector);
        els.forEach((el) => {
          const dir = el.getAttribute('data-dir');
          const dist = isMobileView ? 40 : 70;
          let initVars = {
            opacity: 0,
            scale: 0.65,
            filter: 'blur(6px)',
            transformOrigin: '50% 50%',
          };
          if (dir === 'top') {
            initVars = { ...initVars, y: -dist, x: 0, rotateX: 55, rotateY: 0 };
          } else if (dir === 'bottom') {
            initVars = { ...initVars, y: dist, x: 0, rotateX: -55, rotateY: 0 };
          } else if (dir === 'left') {
            initVars = { ...initVars, x: -dist, y: 0, rotateY: -55, rotateX: 0 };
          } else if (dir === 'right') {
            initVars = { ...initVars, x: dist, y: 0, rotateY: 55, rotateX: 0 };
          }
          gsap.set(el, initVars);
        });
      };

      setMultiDirectionalInitial('.gsap-letter-we');
      setMultiDirectionalInitial('.gsap-letter-build');
      setMultiDirectionalInitial('.gsap-letter-grovix');

      gsap.set('.gsap-tagline-word', {
        yPercent: 120,
        opacity: 0,
      });
      if (skipRef.current) {
        gsap.set(skipRef.current, { opacity: 0 });
      }




      // Initialize Pure Percentage Counter
      if (counterBoxRef.current) {
        gsap.set(counterBoxRef.current, { opacity: 0, y: 15 });
      }

      // Initialize Mouse Interactive 3D Tilt & Parallax
      isIntroActive.current = true;
      if (mouseGlowRef.current) {
        gsap.set(mouseGlowRef.current, { x: screenW / 2, y: screenH / 2 });
      }
      if (tiltWrapperRef.current) {
        gsap.set(tiltWrapperRef.current, { rotateX: 0, rotateY: 0 });
      }

      const handleMouseMove = (e) => {
        if (!isIntroActive.current || isMobileView) return;
        const normX = (e.clientX / screenW - 0.5) * 2;
        const normY = (e.clientY / screenH - 0.5) * 2;

        if (tiltWrapperRef.current) {
          gsap.to(tiltWrapperRef.current, {
            rotateY: normX * 8, // subtle, refined 3D tilt
            rotateX: -normY * 7,
            duration: 0.75,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        }


        if (mouseGlowRef.current) {
          gsap.to(mouseGlowRef.current, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.6,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        }
      };

      window.addEventListener('mousemove', handleMouseMove, { passive: true });

      // NOW that all elements are at their exact hidden coordinates and card is initialized,
      // reveal the intro layer synchronously with zero flash or jerk!
      if (introLayerRef.current) {
        gsap.set(introLayerRef.current, { opacity: 1 });
      }

      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem('grovix_intro_seen', 'true');
          if (liveSiteRef?.current) {
            gsap.set(liveSiteRef.current, { clearProps: 'all' });
          }
          setShouldRender(false);
          if (onComplete) onComplete();
        },
      });

      tlRef.current = tl;

      // 1. Skip button reveals smoothly
      tl.to(skipRef.current, {
        opacity: 1,
        duration: 0.35,
        ease: 'power2.out',
        delay: 0.05,
      });

      // Pure Percentage Counter reveals smoothly
      if (counterBoxRef.current) {
        tl.to(
          counterBoxRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: 'power2.out',
          },
          0.05
        );
      }

      // Pure Percentage Counter Animation (0% -> 100%) - Snappy & dynamic
      const counterObj = { val: 0 };
      const updateCounter = () => {
        if (counterNumRef.current) {
          const num = Math.min(100, Math.round(counterObj.val));
          counterNumRef.current.textContent = `${num}%`;
        }
      };

      const cDur1 = isMobileView ? 0.32 : 0.55;
      const cDur2 = isMobileView ? 0.32 : 0.65;
      const cDur3 = isMobileView ? 0.22 : 0.5;
      const cDur4 = isMobileView ? 0.18 : 0.4;

      tl.to(
        counterObj,
        {
          val: 35,
          duration: cDur1,
          ease: 'power1.out',
          onUpdate: updateCounter,
        },
        0.05
      )
      .to(
        counterObj,
        {
          val: 72,
          duration: cDur2,
          ease: 'power2.inOut',
          onUpdate: updateCounter,
        },
        '+=0.04'
      )
      .to(
        counterObj,
        {
          val: 94,
          duration: cDur3,
          ease: 'power1.out',
          onUpdate: updateCounter,
        },
        '+=0.04'
      )
      .to(
        counterObj,
        {
          val: 100,
          duration: cDur4,
          ease: 'power3.out',
          onUpdate: updateCounter,
          onComplete: () => {
            if (counterNumRef.current) {
              counterNumRef.current.style.color = '#3B66F5';
            }
          },
        },
        '+=0.04'
      );


      // 2. Kicker words reveal with stagger
      tl.to(
        '.gsap-kicker-word',
        {
          yPercent: 0,
          opacity: 1,
          duration: isMobileView ? 0.35 : 0.5,
          stagger: isMobileView ? 0.025 : 0.035,
          ease: 'power3.out',
        },
        0.12
      )

      // 3. Letters of "WE" fly in from multi-directions
      .to(
        '.gsap-letter-we',
        {
          x: 0,
          y: 0,
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)',
          duration: isMobileView ? 0.45 : 0.65,
          stagger: 0.06,
          ease: 'back.out(1.5)',
        },
        '-=0.2'
      );

      // 4. Center Preview Card / Live Site 3D Flip
      if (isMobileView) {
        if (mobileCardRef.current) {
          tl.to(
            mobileCardRef.current,
            {
              rotateY: 0,
              opacity: 1,
              scale: 1,
              duration: 0.55,
              ease: 'back.out(1.4)',
            },
            '-=0.35'
          );
        }
      } else if (liveSiteRef?.current) {
        tl.to(
          liveSiteRef.current,
          {
            rotateY: 0, // 3D Card Flip from -180 to 0
            opacity: 1,
            scale: targetScale,
            duration: 0.85,
            ease: 'back.out(1.3)',
          },
          '-=0.55'
        );
      }

      // 5. Letters of "BUILD" fly in from multi-directions
      tl.to(
        '.gsap-letter-build',
        {
          x: 0,
          y: 0,
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)',
          duration: isMobileView ? 0.45 : 0.6,
          stagger: 0.035,
          ease: 'back.out(1.5)',
        },
        '-=0.55'
      )

      // 6. Letters of "GROVIX" fly in from multi-directions
      .to(
        '.gsap-letter-grovix',
        {
          x: 0,
          y: 0,
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)',
          duration: isMobileView ? 0.45 : 0.65,
          stagger: 0.04,
          ease: 'back.out(1.5)',
        },
        '-=0.45'
      )

      // 7. Bottom Tagline reveals word-by-word
      .to(
        '.gsap-tagline-word',
        {
          yPercent: 0,
          opacity: 1,
          duration: isMobileView ? 0.35 : 0.45,
          stagger: 0.04,
          ease: 'power3.out',
        },
        '-=0.3'
      )

      // 8. Hold moment for user appreciation (fast & crisp on mobile)
      .to({}, { duration: isMobileView ? 0.55 : 1.2 })

      // 9. Exit Animation:
      if (isMobileView) {
        // High-Performance Mobile Vertical Split Outro
        tl.to(
          ['.gsap-kicker-word', '.gsap-mobile-top-block'],
          {
            y: -35,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
          }
        )
        .to(
          mobileCardRef.current,
          {
            scale: 1.05,
            opacity: 0,
            duration: 0.28,
            ease: 'power2.in',
          },
          '<'
        )
        .to(
          ['.gsap-mobile-bottom-block', '.gsap-tagline-word'],
          {
            y: 35,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
          },
          '<'
        );
      } else {
        // Desktop Outro
        tl.to(
          '.gsap-kicker-word',
          {
            yPercent: -120,
            opacity: 0,
            duration: 0.35,
            stagger: 0.02,
            ease: 'power3.in',
          }
        )
        .to(
          ['.gsap-letter-we', '.gsap-letter-build'],
          {
            y: -55,
            opacity: 0,
            scale: 1.05,
            filter: 'blur(4px)',
            duration: 0.45,
            stagger: 0.03,
            ease: 'power3.in',
          },
          '-=0.3'
        )
        .to(
          '.gsap-letter-grovix',
          {
            y: -55,
            opacity: 0,
            scale: 1.05,
            filter: 'blur(4px)',
            duration: 0.45,
            stagger: 0.03,
            ease: 'power3.in',
          },
          '-=0.35'
        )
        .to(
          '.gsap-tagline-word',
          {
            yPercent: -120,
            opacity: 0,
            duration: 0.35,
            stagger: 0.02,
            ease: 'power3.in',
          },
          '-=0.35'
        );
      }

      tl.to(
        skipRef.current,
        {
          opacity: 0,
          duration: 0.2,
        },
        '-=0.35'
      );

      // 10. Live website frame reveal!
      isIntroActive.current = false;
      if (tiltWrapperRef.current) {
        tl.to(
          tiltWrapperRef.current,
          {
            rotateX: 0,
            rotateY: 0,
            duration: 0.35,
            ease: 'power2.out',
          },
          '-=0.35'
        );
      }

      // Dissolve Pure Percentage Counter
      if (counterBoxRef.current) {
        tl.to(
          counterBoxRef.current,
          {
            opacity: 0,
            y: 15,
            duration: 0.25,
            ease: 'power2.in',
          },
          '-=0.35'
        );
      }

      if (isMobileView) {
        // MOBILE: Seamlessly fade-in live site with zero DOM recalculation or layout jerk
        if (liveSiteRef?.current) {
          tl.to(
            liveSiteRef.current,
            {
              opacity: 1,
              duration: 0.4,
              ease: 'power2.out',
              onComplete: () => {
                if (liveSiteRef?.current) {
                  gsap.set(liveSiteRef.current, { clearProps: 'all' });
                }
              },
            },
            '-=0.2'
          );
        }
      } else {
        // DESKTOP: Expand from center window to full screen
        if (liveSiteRef?.current) {
          let expandVars = {
            x: 0,
            y: 0,
            scale: 1,
            rotateY: 0,
            borderRadius: '0px',
            borderWidth: '0px',
            boxShadow: 'none',
            duration: 0.85,
            ease: 'expo.inOut',
          };
          tl.to(liveSiteRef.current, expandVars, '-=0.35');
        }
      }

      // Backdrop fades away revealing real site
      tl.to(
        backdropRef.current,
        {
          opacity: 0,
          duration: 0.35,
          ease: 'power2.out',
        },
        '-=0.25'
      );
    });

    return () => ctx.revert();
  }, [liveSiteRef, onComplete, isMobile]);

  // Skip Handler
  const handleSkip = () => {
    isIntroActive.current = false;
    if (tlRef.current) tlRef.current.kill();

    if (counterBoxRef.current) {
      gsap.set(counterBoxRef.current, { opacity: 0 });
    }

    if (isMobile) {
      if (liveSiteRef?.current) {
        gsap.to(liveSiteRef.current, {
          opacity: 1,
          duration: 0.2,
          ease: 'power2.out',
          onComplete: () => {
            gsap.set(liveSiteRef.current, { clearProps: 'all' });
          },
        });
      }
    } else {
      if (liveSiteRef?.current) {
        gsap.to(liveSiteRef.current, {
          x: 0,
          y: 0,
          scale: 1,
          rotateY: 0,
          borderRadius: '0px',
          borderWidth: '0px',
          boxShadow: 'none',
          opacity: 1,
          duration: 0.25,
          ease: 'power2.inOut',
          onComplete: () => {
            gsap.set(liveSiteRef.current, { clearProps: 'all' });
          },
        });
      }
    }

    gsap.to(backdropRef.current, {
      opacity: 0,
      duration: 0.25,
      ease: 'power2.inOut',
      onComplete: () => {
        sessionStorage.setItem('grovix_intro_seen', 'true');
        setShouldRender(false);
        if (onComplete) onComplete();
      },
    });
  };

  if (!shouldRender) return null;

  return (
    <>
      {/* Pure Solid Black Intro Backdrop with Interactive Mouse Spotlight */}
      <div
        ref={backdropRef}
        aria-hidden="true"
        className="fixed inset-0 z-[80] bg-black pointer-events-none select-none overflow-hidden"
      >
        {/* Interactive Mouse Ambient Spotlight */}
        <div
          ref={mouseGlowRef}
          className="absolute -top-[250px] -left-[250px] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(47,79,210,0.18)_0%,rgba(59,102,245,0.06)_50%,transparent_70%)] blur-[50px] pointer-events-none will-change-transform"
        />
      </div>




      {/* Kinetic Typography Layer (starts with opacity: 0 in style to eliminate any FOUC / flash of text before JS initializes) */}
      <aside
        ref={introLayerRef}
        aria-label="Brand introduction"
        style={{ perspective: '1000px', opacity: 0 }}
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center select-none overflow-hidden pointer-events-none px-3 sm:px-4 md:px-6"
      >
        {/* Skip Button (Mobile safe position) */}
        <div ref={skipRef} className="absolute bottom-5 right-5 sm:bottom-8 sm:right-8 z-50 pointer-events-auto">
          <button
            onClick={handleSkip}
            className="group inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-slate-300 hover:text-white text-[10px] sm:text-[11px] font-mono tracking-wider transition-all duration-200 active:scale-95 cursor-pointer shadow-sm"
            aria-label="Skip introduction animation"
          >
            <span>SKIP INTRO</span>
            <span className="transition-transform duration-200 group-hover:translate-x-0.5 text-[#3B66F5]">&rarr;</span>
          </button>
        </div>

        {/* Pure Clean Percentage Counter (ONLY NUMBER) */}
        <div
          ref={counterBoxRef}
          className="absolute bottom-5 left-5 sm:bottom-8 sm:left-8 z-50 pointer-events-none select-none"
        >
          <span
            ref={counterNumRef}
            className="font-mono text-3xl sm:text-5xl font-black text-white/90 tracking-tighter tabular-nums drop-shadow-[0_4px_24px_rgba(255,255,255,0.15)]"
          >
            0%
          </span>
        </div>

        {/* Responsive Content Container */}
        {isMobile ? (
          /* MOBILE LAYOUT (Exactly as in Sadu Media reference video) */
          <div className="relative z-20 flex flex-col items-center justify-center w-full max-w-[94vw] mx-auto space-y-2">
            {/* Top Kicker Line */}
            <div className="flex items-center justify-center gap-1.5 flex-wrap text-center mb-1">
              {kickerWords.map((word, idx) => (
                <span key={idx} className="inline-block overflow-hidden py-0.5">
                  <span className="gsap-kicker-word inline-block font-mono text-[9px] uppercase tracking-widest text-[#3B66F5] font-semibold">
                    {word}
                  </span>
                </span>
              ))}
            </div>

            {/* TOP HEADING: WE BUILD (Individual letters with multi-directional animations) */}
            <div className="gsap-mobile-top-block flex items-center justify-center gap-2.5 sm:gap-3">
              {/* WE */}
              <div className="flex items-center gap-0.5 sm:gap-1">
                {weLetters.map((letter, idx) => (
                  <span
                    key={idx}
                    data-dir={idx === 0 ? 'left' : 'top'}
                    className="gsap-letter-we inline-block font-condensed font-black uppercase text-white leading-none tracking-normal text-4xl xs:text-5xl drop-shadow-[0_4px_20px_rgba(255,255,255,0.12)] select-none"
                  >
                    {letter}
                  </span>
                ))}
              </div>
              {/* BUILD */}
              <div className="flex items-center gap-0.5 sm:gap-1">
                {buildLetters.map((letter, idx) => {
                  const dirs = ['top', 'bottom', 'top', 'bottom', 'right'];
                  return (
                    <span
                      key={idx}
                      data-dir={dirs[idx]}
                      className="gsap-letter-build inline-block font-condensed font-black uppercase text-white leading-none tracking-normal text-4xl xs:text-5xl drop-shadow-[0_4px_20px_rgba(255,255,255,0.12)] select-none"
                    >
                      {letter}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* CENTER HARDWARE-ACCELERATED MOBILE PREVIEW CARD */}
            <div
              ref={mobileCardRef}
              className="gsap-mobile-preview-card w-[82vw] max-w-[320px] aspect-[16/10] my-2.5 rounded-2xl bg-gradient-to-br from-[#181D26] via-[#11141B] to-[#0A0D12] border border-white/20 p-3.5 sm:p-4 flex flex-col justify-between shadow-[0_16px_40px_rgba(0,0,0,0.85),0_0_25px_rgba(47,79,210,0.3)] relative overflow-hidden select-none"
              style={{ transformStyle: 'preserve-3d', willChange: 'transform, opacity' }}
            >
              {/* Subtle tech ambient glow */}
              <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-[#2F4FD2]/25 blur-2xl pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,102,245,0.18)_0%,transparent_65%)] pointer-events-none" />

              {/* Top Bar: OS Badge & Status */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#3B66F5] animate-ping" />
                  <span className="font-mono text-[9px] font-bold tracking-widest text-slate-300 uppercase">
                    GROVIX &bull; OS
                  </span>
                </div>
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#2F4FD2]/20 border border-[#2F4FD2]/40 text-[#82A2FF] font-mono text-[8px] font-bold tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  ONLINE
                </div>
              </div>

              {/* Middle: Monogram & Label */}
              <div className="relative z-10 flex items-center gap-3 my-auto">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2F4FD2] to-[#12151B] border border-white/25 flex items-center justify-center shadow-[0_4px_16px_rgba(47,79,210,0.6)] shrink-0">
                  <span className="font-heading font-black text-white text-lg tracking-tight">G</span>
                </div>
                <div>
                  <div className="text-white font-heading font-extrabold text-xs sm:text-sm tracking-tight leading-tight">
                    Business Automation
                  </div>
                  <div className="text-slate-400 font-mono text-[9px] tracking-wide mt-0.5">
                    Custom ERP &bull; AI Workflows
                  </div>
                </div>
              </div>

              {/* Bottom: Telemetry Bar */}
              <div className="relative z-10 flex items-center justify-between pt-2 border-t border-white/10 font-mono text-[8px] text-slate-400">
                <span>LATENCY &lt; 15MS</span>
                <span className="text-[#3B66F5] font-semibold">ALL SYSTEMS GO</span>
              </div>
            </div>

            {/* BOTTOM HEADING: GROVIX (Individual letters with multi-directional animations) */}
            <div className="gsap-mobile-bottom-block w-full flex justify-center items-center text-center mt-0.5">
              <div className="flex items-center justify-center gap-1.5 xs:gap-2">
                {grovixLetters.map((letter, idx) => {
                  const dirs = ['left', 'top', 'bottom', 'top', 'bottom', 'right'];
                  return (
                    <span
                      key={idx}
                      data-dir={dirs[idx]}
                      className="gsap-letter-grovix inline-block font-condensed font-black uppercase text-white leading-none tracking-normal text-5xl xs:text-6xl drop-shadow-[0_4px_24px_rgba(255,255,255,0.14)] select-none"
                    >
                      {letter}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* TAGLINE */}
            <div className="flex items-center justify-center gap-2 flex-wrap text-center mt-1 pt-0.5">
              {taglineWords.map((word, idx) => (
                <span key={idx} className="inline-block overflow-hidden py-0.5">
                  <span className="gsap-tagline-word inline-block font-mono text-[10px] xs:text-[11px] font-semibold tracking-wider text-slate-300">
                    {word}
                  </span>
                </span>
              ))}
            </div>
          </div>
        ) : (
          /* DESKTOP LAYOUT with 3D Tilt Wrapper */
          <div
            ref={tiltWrapperRef}
            style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
            className="relative z-20 flex flex-col items-center justify-center w-full max-w-[92vw] xl:max-w-6xl mx-auto space-y-3.5 md:space-y-4"
          >
            {/* Top Kicker Line */}
            <div className="flex items-center justify-center gap-2 flex-wrap text-center" style={{ transform: 'translateZ(10px)' }}>
              {kickerWords.map((word, idx) => (
                <span key={idx} className="inline-block overflow-hidden py-0.5">
                  <span className="gsap-kicker-word inline-block font-mono text-xs uppercase tracking-widest text-[#3B66F5] font-semibold">
                    {word}
                  </span>
                </span>
              ))}
            </div>

            {/* ROW 1: WE [CENTER CARD] BUILD */}
            <div className="grid grid-cols-[1fr_auto_1fr] items-center w-full max-w-full" style={{ transform: 'translateZ(25px)' }}>
              {/* LEFT: WE */}
              <div className="flex justify-end items-center pr-3 md:pr-6">
                <div className="flex items-center gap-1.5">
                  {weLetters.map((letter, idx) => (
                    <span
                      key={idx}
                      data-dir={idx === 0 ? 'left' : 'top'}
                      className="gsap-letter-we inline-block font-condensed font-black uppercase text-white leading-none tracking-normal text-5xl md:text-7xl lg:text-[6.5vw] xl:text-[7vw] drop-shadow-[0_4px_20px_rgba(255,255,255,0.12)] select-none"
                    >
                      {letter}
                    </span>
                  ))}
                </div>
              </div>

              {/* CENTER ANCHOR SPACER (Pre-dimensioned so it NEVER starts at 0px width and jerks open!) */}
              <div
                ref={centerAnchorRef}
                className="w-[20vw] min-w-[200px] max-w-[280px] aspect-[16/10] shrink-0 my-1"
                style={{ perspective: '1000px' }}
              />

              {/* RIGHT: BUILD */}
              <div className="flex justify-start items-center pl-3 md:pl-6">
                <div className="flex items-center gap-1 md:gap-1.5">
                  {buildLetters.map((letter, idx) => {
                    const dirs = ['top', 'bottom', 'top', 'bottom', 'right'];
                    return (
                      <span
                        key={idx}
                        data-dir={dirs[idx]}
                        className="gsap-letter-build inline-block font-condensed font-black uppercase text-white leading-none tracking-normal text-5xl md:text-7xl lg:text-[6.5vw] xl:text-[7vw] drop-shadow-[0_4px_20px_rgba(255,255,255,0.12)] select-none"
                      >
                        {letter}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ROW 2: GROVIX */}
            <div className="w-full flex justify-center items-center text-center mt-2 md:mt-3" style={{ transform: 'translateZ(45px)' }}>
              <div className="flex items-center justify-center gap-2.5 md:gap-4 lg:gap-5">
                {grovixLetters.map((letter, idx) => {
                  const dirs = ['left', 'top', 'bottom', 'top', 'bottom', 'right'];
                  return (
                    <span
                      key={idx}
                      data-dir={dirs[idx]}
                      className="gsap-letter-grovix inline-block font-condensed font-black uppercase text-white leading-none tracking-normal text-6xl md:text-8xl lg:text-[11vw] xl:text-[12vw] drop-shadow-[0_4px_24px_rgba(255,255,255,0.14)] select-none"
                    >
                      {letter}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* ROW 3: Bottom Tagline */}
            <div className="flex items-center justify-center gap-3 flex-wrap text-center mt-2" style={{ transform: 'translateZ(15px)' }}>
              {taglineWords.map((word, idx) => (
                <span key={idx} className="inline-block overflow-hidden py-0.5">
                  <span className="gsap-tagline-word inline-block font-mono text-xs md:text-sm font-semibold tracking-wider text-slate-300">
                    {word}
                  </span>
                </span>
              ))}
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default GrovixIntro;
