import React from 'react';

const technologies = [
  { name: 'React', desc: 'Interactive Interfaces', category: 'Frontend' },
  { name: 'TypeScript', desc: 'Type-Safe Architecture', category: 'Language' },
  { name: 'Node.js', desc: 'High-Concurrency Runtime', category: 'Backend' },
  { name: 'Python', desc: 'Data & Automation', category: 'Core' },
  { name: 'PostgreSQL', desc: 'ACID Relational Core', category: 'Database' },
  { name: 'MongoDB', desc: 'Document Storage', category: 'Database' },
  { name: 'SAP Integration', desc: 'RFC / BAPI Connectors', category: 'Enterprise' },
  { name: 'REST & GraphQL APIs', desc: 'Unified Webhooks', category: 'Integration' },
  { name: 'AI / LLMs & OCR', desc: 'Intelligent Parsing', category: 'Intelligence' },
  { name: 'WhatsApp Cloud API', desc: 'Automated Messaging', category: 'Communications' },
  { name: 'AWS & Cloudflare', desc: 'Edge Infrastructure', category: 'Cloud' },
  { name: 'Docker & Microservices', desc: 'Isolated Services', category: 'DevOps' },
];

const TechnologySection = () => {
  return (
    <section
      id="tech"
      className="py-24 md:py-32 bg-[#F5F4EF] border-b border-black/[0.06] overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-12">
        <span className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#2F4FD2] mb-3.5 block">
          / TECHNOLOGY
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-[#111418] tracking-tight leading-[1.1] font-heading">
          Technology that fits the problem.
        </h2>
        <p className="mt-4 text-base sm:text-lg text-[#4A4840] max-w-xl font-body">
          We select proven, maintainable technologies that run reliably without vendor lock-in or fragile dependencies.
        </p>
      </div>

      {/* Row 1 — Moving Left */}
      <div className="mask-marquee-edges overflow-hidden mb-4">
        <div className="flex items-center gap-4 whitespace-nowrap animate-tech-row1 py-1 marquee-track">
          {[...technologies, ...technologies].map((tech, idx) => (
            <div
              key={`t1-${idx}`}
              className="flex items-center gap-3 px-5 py-3.5 rounded-xl bg-white border border-[#E5E1D8] shadow-[0_1px_4px_rgba(17,20,24,0.03)] hover:border-[#2F4FD2]/50 transition-all duration-200 cursor-default shrink-0 group"
            >
              <div className="w-2 h-2 rounded-full bg-[#2F4FD2] group-hover:scale-125 transition-transform" />
              <div>
                <div className="text-xs sm:text-sm font-bold text-[#111418] font-heading">
                  {tech.name}
                </div>
                <div className="text-[10px] font-mono text-[#6D6B5F]">
                  {tech.desc}
                </div>
              </div>
              <span className="ml-2 px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 text-[#4A4840]">
                {tech.category}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 — Moving Right */}
      <div className="mask-marquee-edges overflow-hidden">
        <div className="flex items-center gap-4 whitespace-nowrap animate-tech-row2 py-1 marquee-track">
          {[...technologies.slice().reverse(), ...technologies.slice().reverse()].map((tech, idx) => (
            <div
              key={`t2-${idx}`}
              className="flex items-center gap-3 px-5 py-3.5 rounded-xl bg-white border border-[#E5E1D8] shadow-[0_1px_4px_rgba(17,20,24,0.03)] hover:border-[#3B66F5]/50 transition-all duration-200 cursor-default shrink-0 group"
            >
              <div className="w-2 h-2 rounded-full bg-[#3B66F5] group-hover:scale-125 transition-transform" />
              <div>
                <div className="text-xs sm:text-sm font-bold text-[#111418] font-heading">
                  {tech.name}
                </div>
                <div className="text-[10px] font-mono text-[#6D6B5F]">
                  {tech.desc}
                </div>
              </div>
              <span className="ml-2 px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 text-[#4A4840]">
                {tech.category}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scrollRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-tech-row1 {
          display: flex;
          width: max-content;
          animation: scrollLeft 36s linear infinite;
        }
        .animate-tech-row2 {
          display: flex;
          width: max-content;
          animation: scrollRight 38s linear infinite;
        }
        .animate-tech-row1:hover, .animate-tech-row2:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default TechnologySection;
