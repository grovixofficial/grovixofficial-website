import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import Header from '../components/sections/Header';
import Hero from '../components/sections/Hero';
import ProblemSection from '../components/sections/ProblemSection';
import ServicesSection from '../components/sections/ServicesSection';
import SelectedWork from '../components/sections/SelectedWork';
import ApproachSection from '../components/sections/ApproachSection';
import TechnologySection from '../components/sections/TechnologySection';
import AboutSection from '../components/sections/AboutSection';
import DifferentiationSection from '../components/sections/DifferentiationSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import CTASection from '../components/sections/CTASection';
import Footer from '../components/sections/Footer';
import ContactModal from '../components/sections/ContactModal';
import GrovixIntro from '../components/intro/GrovixIntro';
import ScrollProgressHUD from '../components/common/ScrollProgressHUD';
import CustomCursor from '../components/common/CustomCursor';
import SiteAnimations from '../components/common/SiteAnimations';
import InfiniteMarquee from '../components/common/InfiniteMarquee';
gsap.registerPlugin(ScrollTrigger);

const LandingPage = () => {
  const containerRef = useRef(null);
  const liveSiteRef = useRef(null);
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Initialize smooth scroll with Lenis (Sadewa premium feel)
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1.0,
      smoothTouch: false,
      touchMultiplier: 2.0,
    });

    lenis.on('scroll', ScrollTrigger.update);
    window.__lenis = lenis;

    const tickerCallback = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // Smooth anchor navigation
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (target) {
        const id = target.getAttribute('href');
        if (id && id !== '#') {
          const el = document.querySelector(id);
          if (el) {
            e.preventDefault();
            lenis.scrollTo(el, { offset: -70 });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    // Refresh triggers once layout settles
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 600);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleAnchorClick);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="landing-wrapper min-h-screen text-[#111418] bg-[#F5F4EF] font-body selection:bg-[#2F4FD2]/15 selection:text-[#111418] relative overflow-x-hidden"
    >
      {/* Kinetic Brand Opening Experience (Inspired by Sadu Media for Grovix) */}
      <GrovixIntro
        liveSiteRef={liveSiteRef}
        onComplete={() => {
          ScrollTrigger.refresh();
        }}
      />

      {/* Brand Themed Animated Custom Cursor (Desktop Only) */}
      <CustomCursor />

      {/* Global scroll + hover animations (heading reveal, counters, spotlight, magnetic) */}
      <SiteAnimations />

      {/* Skip to Content for Screen Readers & Keyboard Access */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Subtle Tactile Film Grain Texture (Desktop only to guarantee 120fps/60fps on phones) */}
      <div className="fixed inset-0 pointer-events-none grain-overlay z-40 opacity-40 mix-blend-multiply hidden md:block" />

      {/* Live Website Content (Directly animated from small frame to full screen during intro) */}
      <div ref={liveSiteRef} className="live-site-wrapper w-full relative">
        <ScrollProgressHUD />
        <Header onOpenContact={() => setIsContactOpen(true)} />
        <main id="main-content">
          <Hero onOpenContact={() => setIsContactOpen(true)} />
          {/* Infinite Services Horizontal Marquee Ticker */}
          <InfiniteMarquee />
          <ProblemSection />
          <ServicesSection onOpenContact={() => setIsContactOpen(true)} />
          <SelectedWork onOpenContact={() => setIsContactOpen(true)} />
          <ApproachSection />
          <TechnologySection />
          <AboutSection onOpenContact={() => setIsContactOpen(true)} />
          <DifferentiationSection />
          <TestimonialsSection />
          <CTASection onOpenContact={() => setIsContactOpen(true)} />
        </main>
        <Footer onOpenContact={() => setIsContactOpen(true)} />
      </div>

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
};

export default LandingPage;
