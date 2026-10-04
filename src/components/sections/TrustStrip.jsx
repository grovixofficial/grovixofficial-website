import React from 'react';

const categories = [
  'Manufacturing',
  'Retail & Omnichannel',
  'Field Services',
  'Supply Chain & Operations',
  'B2B Wholesale',
  'Finance & Accounting',
  'Enterprise Logistics',
  'Multi-Store Networks',
];

const TrustStrip = () => {
  return (
    <div className="py-7 bg-[#F5F4EF] border-b border-black/[0.06] overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-3.5 flex items-center justify-between">
        <span className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#6D6B5F]">
          / BUILT FOR MODERN BUSINESSES
        </span>
        <span className="hidden sm:inline text-[11px] font-mono text-[#6D6B5F] uppercase tracking-wider">
          Operational Systems Across Key Sectors
        </span>
      </div>

      {/* Marquee Ticker */}
      <div className="relative overflow-hidden w-full mask-marquee-edges">
        <div className="flex items-center gap-4 sm:gap-5 whitespace-nowrap animate-marquee py-1 marquee-track">
          {[...categories, ...categories, ...categories].map((item, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-2.5 px-5 sm:px-6 py-2.5 rounded-full bg-white border border-[#E5E1D8] shadow-[0_1px_4px_rgba(17,20,24,0.03)] transition-colors duration-200 hover:border-[#2F4FD2]/40 cursor-default shrink-0 whitespace-nowrap"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#2F4FD2] shrink-0" />
              <span className="text-xs sm:text-[13px] font-semibold text-[#111418] tracking-tight font-heading">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marqueeScroll 34s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default TrustStrip;
