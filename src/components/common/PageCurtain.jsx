import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * PageCurtain — Elegant brand wipe that plays once on first load
 * A dark panel sweeps down then retracts up revealing the site
 */
const PageCurtain = () => {
  const curtainRef = useRef(null);

  useEffect(() => {
    const curtain = curtainRef.current;
    if (!curtain) return;

    // Ensure curtain is full height, covering everything
    gsap.set(curtain, { yPercent: 0 });

    const tl = gsap.timeline({ delay: 0.1 });

    // Hold briefly then sweep up to reveal site
    tl.to(curtain, {
      yPercent: -100,
      duration: 1.1,
      ease: 'power4.inOut',
      delay: 0.3,
      onComplete: () => {
        curtain.style.display = 'none';
      },
    });

    return () => tl.kill();
  }, []);

  return (
    <div
      ref={curtainRef}
      className="fixed inset-0 z-[9998] pointer-events-none flex flex-col items-center justify-center"
      style={{ background: '#0D1117' }}
    >
      {/* Brand mark centered while curtain holds */}
      <div className="flex flex-col items-center gap-3 opacity-90">
        <span
          className="font-extrabold font-heading text-white uppercase tracking-[-0.03em]"
          style={{ fontSize: 'clamp(40px, 8vw, 96px)' }}
        >
          grovix
        </span>
        <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest">
          Business Systems & Automation
        </span>
        {/* Thin loading line */}
        <div className="mt-4 w-32 h-[1.5px] bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#2F4FD2] rounded-full"
            style={{
              animation: 'curtain-progress 1.1s ease-out forwards',
            }}
          />
        </div>
      </div>
      <style>{`
        @keyframes curtain-progress {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default PageCurtain;
