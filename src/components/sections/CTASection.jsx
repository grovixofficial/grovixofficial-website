import React from 'react';
import { ArrowUpRight, ArrowDown, Mail, ShieldCheck } from '../common/Icons';
import { handleAnchorClick } from '../../utils/scrollToSection';

const CTASection = ({ onOpenContact }) => {
  return (
    <section className="py-28 md:py-36 bg-[#111418] text-white relative overflow-hidden">
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 grovix-grid-dark opacity-35 pointer-events-none" />

      {/* Ambient Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-[#2F4FD2]/18 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 sm:px-8 text-center relative z-10">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[#3B66F5] text-[11px] font-mono font-semibold uppercase tracking-wider mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2F4FD2] animate-pulse" />
          Start Your Automation Journey
        </span>

        <h2 className="text-3xl sm:text-4xl lg:text-[52px] font-extrabold tracking-tight leading-[1.1] mb-6 font-heading text-white">
          Have a business process worth automating?
        </h2>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-body mb-9 font-normal">
          Tell us what is slowing your business down. We'll help turn it into a practical digital system.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-10">
          <button
            onClick={onOpenContact}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#2F4FD2] hover:bg-[#233FA8] text-white text-xs sm:text-sm font-semibold tracking-wider uppercase shadow-md shadow-[#2F4FD2]/25 transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] group cursor-pointer"
          >
            <span>Let's Talk</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>

          <a
            href="#services"
            onClick={(e) => handleAnchorClick(e, '#services')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/15 text-xs sm:text-sm font-semibold transition-all duration-200 active:scale-[0.98] cursor-pointer group"
          >
            <span>Explore Services</span>
            <ArrowDown className="w-4 h-4 text-slate-400 group-hover:translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Micro Guarantees */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm font-mono text-slate-400">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#3B66F5]" />
            <span>Free 30-min workflow analysis</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Mail className="w-4 h-4 text-[#3B66F5]" />
            <span>Direct contact: grovixoffical@gmail.com</span>
          </span>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
