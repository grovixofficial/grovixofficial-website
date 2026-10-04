import React from 'react';
import { ArrowUpRight, CheckCircle2, ShieldCheck, Zap } from '../common/Icons';

const AboutSection = ({ onOpenContact }) => {
  return (
    <section
      id="about"
      className="py-28 md:py-36 bg-[#F5F4EF] border-b border-black/[0.06] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Label */}
        <span className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#2F4FD2] mb-3.5 block">
          / ABOUT GROVIX
        </span>

        {/* Editorial Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Big Editorial Statement */}
          <div className="lg:col-span-6">
            <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-[#111418] tracking-tight leading-[1.1] font-heading">
              Technology should make business simpler.
            </h2>
            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#2F4FD2] shrink-0 mt-0.5" />
                <p className="text-sm sm:text-base text-[#4A4840] font-body leading-relaxed">
                  <strong className="text-[#111418] font-semibold">Engineered around your team:</strong> We study how your staff actually works rather than forcing generic workflows on them.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#2F4FD2] shrink-0 mt-0.5" />
                <p className="text-sm sm:text-base text-[#4A4840] font-body leading-relaxed">
                  <strong className="text-[#111418] font-semibold">No rip-and-replace:</strong> We bridge legacy platforms like Tally and SAP directly into modern automated pipelines.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#2F4FD2] shrink-0 mt-0.5" />
                <p className="text-sm sm:text-base text-[#4A4840] font-body leading-relaxed">
                  <strong className="text-[#111418] font-semibold">Senior engineers, not salespeople:</strong> You collaborate directly with practitioners who understand system architecture.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative + Architectural System Visual */}
          <div className="lg:col-span-6 space-y-6">
            <p className="text-sm sm:text-base text-[#4A4840] leading-relaxed font-body">
              Grovix builds practical digital systems for businesses that want to reduce manual work, connect their systems and operate more efficiently. From automation and AI to custom software and integrations, we focus on solving real operational problems with technology.
            </p>

            {/* Architectural System Schematic Widget */}
            <div className="rounded-2xl bg-white border border-[#E5E1D8] shadow-[0_8px_30px_rgba(17,20,24,0.04)] p-6 sm:p-7 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 font-mono text-xs text-[#6D6B5F]">
                <span className="flex items-center gap-1.5 font-bold uppercase text-[#111418]">
                  <Zap className="w-4 h-4 text-[#2F4FD2]" />
                  Grovix Architecture Manifesto
                </span>
                <span className="text-[#2F4FD2] font-semibold text-[11px] bg-[#EEF2FF] px-2 py-0.5 rounded border border-[#2F4FD2]/30">EST. 2024</span>
              </div>

              {/* 3 Pillars */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-xl bg-[#FAF9F6] border border-[#E5E1D8]">
                  <div className="text-lg sm:text-xl font-black text-[#111418] font-mono tabular-nums tracking-tight">Zero</div>
                  <div className="text-[10px] font-mono text-[#6D6B5F] mt-0.5">Unused Bloat</div>
                </div>
                <div className="p-3 rounded-xl bg-[#EEF2FF] border border-[#2F4FD2]/30">
                  <div className="text-lg sm:text-xl font-black text-[#2F4FD2] font-mono tabular-nums tracking-tight">3.4x</div>
                  <div className="text-[10px] font-mono text-[#111418] mt-0.5">Dispatch Speed</div>
                </div>
                <div className="p-3 rounded-xl bg-[#FAF9F6] border border-[#E5E1D8]">
                  <div className="text-lg sm:text-xl font-black text-[#111418] font-mono tabular-nums tracking-tight">14–21d</div>
                  <div className="text-[10px] font-mono text-[#6D6B5F] mt-0.5">Sprint Cycle</div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-[#6D6B5F] font-mono flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#2F4FD2]" />
                  <span>Private database &bull; Granular RBAC</span>
                </span>
                <button
                  onClick={onOpenContact}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2F4FD2] hover:text-[#233FA8] transition-colors cursor-pointer uppercase tracking-wider font-mono"
                >
                  <span>Connect With Us</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
