import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Quote } from '../common/Icons';

const testimonials = [
  {
    quote: "Standard ERP packages forced us to change our factory floor routines. Grovix mapped our job work and machine workflow, building tailored production tracking with automated WhatsApp dispatch alerts.",
    role: "Head of Operations",
    industry: "Manufacturing & Job Works",
  },
  {
    quote: "Managing stock across multiple warehouses and chasing overdue party payments by phone was consuming hours every week. Grovix connected our inventory ledgers and automated payment reminder sequences via WhatsApp.",
    role: "Managing Director",
    industry: "Wholesale & Logistics",
  },
  {
    quote: "We had critical inventory data trapped in SAP that field staff couldn't access on the road. Grovix built lightweight mobile apps and two-way connectors that gave our teams live stock visibility on day one.",
    role: "Supply Chain Director",
    industry: "Multi-Store Retail",
  },
];

const TestimonialsSection = () => {
  const [currentIdx, setCurrentIdx] = useState(0);

  const prev = () => {
    setCurrentIdx((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrentIdx((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const t = testimonials[currentIdx];

  return (
    <section className="py-24 md:py-32 bg-[#F5F4EF] border-b border-[#E5E1D8] relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Label */}
        <span className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#2F4FD2] mb-3.5 block">
          / CLIENT VOICES
        </span>

        {/* Editorial Testimonial Card */}
        <div className="rounded-2xl bg-white border border-[#E5E1D8] shadow-[0_8px_30px_rgba(17,20,24,0.04)] p-7 sm:p-12 relative overflow-hidden flex flex-col justify-between min-h-[360px]">
          {/* Subtle Quote Watermark */}
          <Quote className="absolute right-6 bottom-6 w-28 h-28 text-slate-100/80 pointer-events-none -z-0" />

          <div className="relative z-10 max-w-4xl">
            <div className="inline-block px-3 py-1 rounded-full bg-[#EEF2FF] text-[#2F4FD2] border border-[#D1DDFF] font-mono text-[11px] font-semibold uppercase tracking-wider mb-6">
              {t.industry}
            </div>

            <blockquote className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#111418] tracking-tight leading-[1.3] font-heading">
              "{t.quote}"
            </blockquote>
          </div>

          {/* Footer of Card: Role & Industry Info & Nav Arrows */}
          <div className="relative z-10 pt-8 mt-8 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <div className="text-base sm:text-lg font-bold text-[#111418] font-heading">
                {t.role}
              </div>
              <div className="text-xs sm:text-sm text-slate-500 font-body">
                {t.industry}
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-slate-400 mr-2">
                0{currentIdx + 1} / 0{testimonials.length}
              </span>
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full border border-[#E5E1D8] bg-white hover:bg-slate-50 active:scale-95 text-[#111418] flex items-center justify-center transition-all shadow-xs cursor-pointer"
                aria-label="Previous testimonial"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full bg-[#111418] hover:bg-[#1C2026] active:scale-95 text-white flex items-center justify-center transition-all shadow-xs cursor-pointer"
                aria-label="Next testimonial"
              >
                <ArrowRight className="w-4 h-4 text-[#2F4FD2]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
