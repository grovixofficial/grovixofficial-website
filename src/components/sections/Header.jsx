import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X } from '../common/Icons';
import { handleAnchorClick } from '../../utils/scrollToSection';

const Header = ({ onOpenContact }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const navLinks = [
    { label: 'Services', href: '#services', id: 'services', num: '01' },
    { label: 'Solutions', href: '#problem', id: 'problem', num: '02' },
    { label: 'Work', href: '#work', id: 'work', num: '03' },
    { label: 'Approach', href: '#approach', id: 'approach', num: '04' },
    { label: 'About', href: '#about', id: 'about', num: '05' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 30);

      // Scroll Progress Calculation (0% -> 100%)
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? (currentY / maxScroll) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));

      // Active Section Tracking (using getBoundingClientRect for 100% viewport accuracy)
      if (currentY < 450) {
        // At the top of the page (Hero section) -> No sub-link is active at all
        setActiveSection('');
        return;
      }

      const sections = ['problem', 'services', 'work', 'approach', 'about'];
      let currentActive = '';
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Active if section top is in upper viewport area and bottom hasn't scrolled past
          if (rect.top <= 240 && rect.bottom >= 140) {
            currentActive = sectionId;
            break;
          }
        }
      }
      setActiveSection(currentActive);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e, href) => {
    if (e) e.preventDefault();
    setMobileMenuOpen(false);
    handleAnchorClick(e, href);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F5F4EF]/92 backdrop-blur-md border-b border-black/[0.06] shadow-[0_2px_16px_rgba(17,20,24,0.04)] py-3 sm:py-3.5'
            : 'bg-transparent py-5 sm:py-6 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Grovix Brand Logo with Interactive Hover */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 group cursor-pointer select-none"
            aria-label="Grovix Home"
          >
            <div className="relative w-8 h-8 rounded-lg bg-[#111418] flex items-center justify-center text-white font-mono font-bold text-sm tracking-tight transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_15px_rgba(47,79,210,0.4)] group-hover:bg-[#1A2230] border border-white/10 overflow-hidden shrink-0">
              <span className="relative z-10 transition-transform duration-300 group-hover:scale-110">G</span>
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
            </div>

            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl text-[#111418] tracking-tight font-heading group-hover:text-[#2F4FD2] transition-colors duration-200">
                grovix
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links with Interactive Hover Pills & Active Dot */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-1.5 bg-black/[0.03] p-1 rounded-full border border-black/[0.04]">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`relative px-3.5 lg:px-4 py-1.5 text-xs lg:text-[13px] font-semibold tracking-wide rounded-full transition-all duration-200 select-none flex items-center gap-1.5 active:scale-95 ${
                    isActive
                      ? 'bg-white text-[#111418] shadow-[0_2px_8px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] border border-black/[0.06]'
                      : 'text-[#5C5A52] hover:text-[#111418] hover:bg-black/[0.04]'
                  }`}
                >
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2F4FD2] shadow-[0_0_6px_rgba(47,79,210,0.8)] animate-pulse" />
                  )}
                  <span>{link.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Right Action: Let's Talk Button with Shimmer & Magnetic feel */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onOpenContact}
              data-magnetic
              className="relative inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 rounded-full bg-[#111418] hover:bg-black text-white active:scale-[0.98] transition-all duration-200 text-xs font-bold tracking-wider uppercase group shadow-xs hover:shadow-md cursor-pointer whitespace-nowrap overflow-hidden border border-white/10 min-w-[128px]"
            >
              {/* Micro light shimmer sweep on hover */}
              <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-700 ease-out pointer-events-none" />

              <span className="w-1.5 h-1.5 rounded-full bg-[#2F4FD2] group-hover:scale-125 transition-transform shrink-0" />
              <span className="relative z-10 font-bold text-white tracking-wider">Let's Talk</span>
              <ArrowUpRight className="relative z-10 w-3.5 h-3.5 text-[#2F4FD2] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-[#111418] hover:bg-black/5 active:scale-95 transition-all cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Real-Time Scroll Progress Indicator Line */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-[2px] bg-black/[0.04] transition-opacity duration-300 ${
            isScrolled ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="h-full bg-gradient-to-r from-[#2F4FD2] via-[#3B66F5] to-[#7292FF] transition-all duration-75 ease-out shadow-[0_0_8px_rgba(47,79,210,0.6)]"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </header>

      {/* Mobile Fullscreen Navigation Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#F5F4EF]/96 backdrop-blur-2xl pt-24 px-8 pb-12 flex flex-col justify-between md:hidden animate-in fade-in duration-200">
          <nav className="flex flex-col gap-6 pt-4">
            <div className="flex items-center justify-between pb-3 border-b border-black/[0.08]">
              <span className="text-[11px] font-mono font-semibold text-[#6D6B5F] uppercase tracking-widest">
                / NAVIGATION
              </span>
              <span className="flex items-center gap-1.5 text-[10px] font-mono text-[#2F4FD2]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2F4FD2] animate-pulse" />
                ONLINE
              </span>
            </div>

            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`text-2xl font-bold flex items-center justify-between py-2 transition-all font-heading ${
                    isActive ? 'text-[#2F4FD2] translate-x-1' : 'text-[#111418] hover:text-[#2F4FD2]'
                  }`}
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs text-[#9E9B8F] font-normal">{link.num}</span>
                    <span>{link.label}</span>
                  </div>
                  {isActive && <span className="w-2 h-2 rounded-full bg-[#2F4FD2]" />}
                </a>
              );
            })}
          </nav>

          <div className="pt-8 border-t border-[#E5E1D8] space-y-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full py-3.5 rounded-full bg-[#111418] text-white text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-98 transition-all"
            >
              <span>Let's Talk</span>
              <ArrowUpRight className="w-4 h-4 text-[#2F4FD2]" />
            </button>
            <p className="text-xs text-[#6D6B5F] text-center font-mono">
              grovixoffical@gmail.com
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
