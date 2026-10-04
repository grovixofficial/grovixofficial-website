import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Mail } from '../common/Icons';

gsap.registerPlugin(ScrollTrigger);

const Footer = ({ onOpenContact }) => {
  const footerRef = useRef(null);
  const wordmarkRef = useRef(null);
  const lettersRef = useRef([]);

  useEffect(() => {
    const letters = lettersRef.current.filter(Boolean);
    if (!letters.length || !wordmarkRef.current) return;

    // Set initial hidden state
    gsap.set(letters, { yPercent: 110, opacity: 0 });

    // Fires exactly when the GROVIX wordmark div enters the bottom of the viewport
    gsap.to(letters, {
      yPercent: 0,
      opacity: 1,
      duration: 1.1,
      ease: 'power4.out',
      stagger: 0.08,
      scrollTrigger: {
        trigger: wordmarkRef.current,
        start: 'top bottom',
        toggleActions: 'play none none none',
      },
    });
  }, []);

  // Wave-lift hover: hovered letter stroke turns blue + lifts, neighbors ripple
  const handleLetterEnter = (i) => {
    lettersRef.current.forEach((el, j) => {
      if (!el) return;
      const dist = Math.abs(j - i);
      if (dist === 0) {
        gsap.to(el, { y: -18, WebkitTextStroke: '2px rgba(59,102,245,0.9)', duration: 0.32, ease: 'power3.out', overwrite: 'auto' });
      } else if (dist === 1) {
        gsap.to(el, { y: -9,  WebkitTextStroke: '1.5px rgba(255,255,255,0.25)', duration: 0.35, ease: 'power3.out', overwrite: 'auto' });
      } else if (dist === 2) {
        gsap.to(el, { y: -4,  WebkitTextStroke: '1.5px rgba(255,255,255,0.14)', duration: 0.4,  ease: 'power3.out', overwrite: 'auto' });
      }
    });
  };

  const handleLetterLeave = () => {
    lettersRef.current.forEach((el) => {
      if (!el) return;
      gsap.to(el, { y: 0, WebkitTextStroke: '1.5px rgba(255,255,255,0.09)', duration: 0.5, ease: 'power3.out', overwrite: 'auto' });
    });
  };

  return (
    <footer
      ref={footerRef}
      className="bg-[#0D1117] text-slate-300 border-t border-white/10 pt-20 pb-12 relative overflow-hidden"
    >
      {/* Background Architectural Mark */}
      <div className="absolute right-0 bottom-0 pointer-events-none opacity-[0.03] translate-x-12 translate-y-12 select-none">
        <svg width="400" height="400" viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="80" stroke="#FFFFFF" strokeWidth="8" />
          <line x1="100" y1="20" x2="100" y2="100" stroke="#FFFFFF" strokeWidth="8" />
          <line x1="100" y1="100" x2="180" y2="100" stroke="#FFFFFF" strokeWidth="8" />
          <circle cx="140" cy="60" r="14" fill="#2F4FD2" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-14 border-b border-white/10">
          
          {/* Brand Info Column */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <a href="#" className="inline-block group mb-4">
                <div className="flex items-baseline">
                  <span className="font-extrabold text-white text-2xl tracking-tight font-heading">
                    grovix
                  </span>
                </div>
                <div className="text-[11px] font-mono font-semibold text-slate-400 tracking-wider lowercase mt-1">
                  business systems &amp; automation
                </div>
              </a>

              <p className="text-sm text-slate-400 max-w-sm mt-3 leading-relaxed font-body">
                Grovix builds automation, AI systems and custom software that turn complex business processes into simple digital workflows.
              </p>

              <div className="mt-6 flex items-center gap-2 text-xs font-mono text-slate-400">
                <span className="w-2 h-2 rounded-full bg-[#2F4FD2] animate-pulse" />
                <span>Private &bull; Enterprise-Ready &bull; Scalable</span>
              </div>
            </div>

            {/* Direct Contact from Business Card */}
            <div className="mt-8 space-y-2">
              <div className="text-[11px] font-mono text-slate-500 uppercase tracking-widest mb-1.5">
                Direct Contact
              </div>
              <div>
                <a
                  href="mailto:grovixoffical@gmail.com"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-[#3B66F5] transition-colors font-mono"
                >
                  <Mail className="w-4 h-4 text-[#3B66F5]" />
                  <span>grovixoffical@gmail.com</span>
                </a>
              </div>
              <div>
                <a
                  href="tel:+919875003040"
                  className="inline-flex items-center gap-2 text-xs font-mono text-slate-300 hover:text-white transition-colors"
                >
                  <span className="text-slate-500">Mo.</span>
                  <span>+91 98750 03040</span>
                </a>
              </div>
            </div>
          </div>

          {/* Capabilities Column */}
          <div className="md:col-span-4">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-4">
              Core Capabilities
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Business Automation &amp; Workflows
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  WhatsApp Business Automation
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  AI Automation &amp; Document OCR
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Custom ERP &amp; CRM Systems
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  SAP &amp; API System Integrations
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Operational Business Dashboards
                </a>
              </li>
            </ul>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-3">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-4">
              Navigation
            </div>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="#work" className="hover:text-white transition-colors">Work</a></li>
              <li><a href="#approach" className="hover:text-white transition-colors">About</a></li>
              <li>
                <button
                  onClick={onOpenContact}
                  className="hover:text-[#3B66F5] transition-colors text-left cursor-pointer flex items-center gap-1.5"
                >
                  <span>Contact</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Massive GROVIX Brand Wordmark — Liquid Fill Hover */}
        <div ref={wordmarkRef} className="relative mt-10 mb-0 select-none -ml-1">
          <div
            className="flex items-end font-extrabold font-heading uppercase leading-none"
            style={{
              fontSize: 'clamp(72px, 16vw, 220px)',
              letterSpacing: '-0.03em',
            }}
          >
            {'GROVIX'.split('').map((letter, i) => (
              <div
                key={i}
                className="overflow-hidden cursor-default"
                onMouseEnter={() => handleLetterEnter(i)}
                onMouseLeave={handleLetterLeave}
              >
                <span
                  ref={(el) => (lettersRef.current[i] = el)}
                  className="inline-block"
                  style={{
                    color: 'transparent',
                    WebkitTextStroke: '1.5px rgba(255,255,255,0.09)',
                    willChange: 'transform',
                  }}
                >
                  {letter}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Copyright & Legal */}
        <div className="pt-5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-slate-500 border-t border-white/[0.06]">
          <div>
            &copy; {new Date().getFullYear()} Grovix. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="text-slate-400">grovixoffical@gmail.com</span>
            <span className="text-slate-700">&bull;</span>
            <a href="#about" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <span className="text-slate-700">&bull;</span>
            <a href="#about" className="hover:text-slate-300 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
