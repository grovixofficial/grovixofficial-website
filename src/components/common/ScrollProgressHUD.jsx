import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollProgressHUD = () => {
  const topBarRef = useRef(null);

  useEffect(() => {
    // Ultra-smooth scroll progress trigger for top royal blue laser bar
    const trigger = ScrollTrigger.create({
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        if (topBarRef.current) {
          gsap.set(topBarRef.current, { scaleX: self.progress });
        }
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2.5px] z-[60] pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      <div
        ref={topBarRef}
        className="h-full w-full bg-gradient-to-r from-[#2F4FD2] via-[#3B66F5] to-[#7292FF] origin-left shadow-[0_0_12px_rgba(47,79,210,0.85)] will-change-transform"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
};

export default ScrollProgressHUD;
