import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AlertCircle, Layers, Unlink, TrendingDown } from '../common/Icons';

gsap.registerPlugin(ScrollTrigger);

const problems = [
  {
    number: '01',
    icon: AlertCircle,
    title: 'Manual processes slow teams down.',
    desc: 'Staff spend hours daily copying data between spreadsheets, emails, and accounting software instead of focusing on revenue-generating work.',
    impact: 'Time Lost: 3.5 hrs/day in manual re-entry',
  },
  {
    number: '02',
    icon: Unlink,
    title: 'Disconnected systems create unnecessary work.',
    desc: 'When sales, inventory, and billing operate in separate silos, manual handoffs fail and customers wait for basic status updates.',
    impact: 'Friction: Broken handoffs & delayed orders',
  },
  {
    number: '03',
    icon: Layers,
    title: 'Important data gets trapped across tools.',
    desc: 'Decision-makers lack real-time operational visibility when critical numbers are buried across personal inboxes and legacy software.',
    impact: 'Risk: Blind decisions & stale reporting',
  },
  {
    number: '04',
    icon: TrendingDown,
    title: 'Scaling operations shouldn’t mean adding headcount.',
    desc: 'Growing your order volume should not exponentially increase your administrative overhead or make your team drown in paperwork.',
    impact: 'Cost: Linear overhead inflation',
  },
];

const ProblemSection = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance
      gsap.fromTo(
        '.problem-header',
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Problem cards stagger
      gsap.fromTo(
        '.problem-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: trackRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="problem"
      className="pt-14 sm:pt-16 pb-20 sm:pb-24 bg-[#F5F4EF] border-b border-black/[0.06] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="problem-header max-w-3xl mb-10 sm:mb-12">
          <span className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#2F4FD2] mb-3.5 block">
            / OPERATIONAL AUDIT
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-[#111418] tracking-tight leading-[1.1] font-heading">
            Your business shouldn't depend on repetitive work.
          </h2>
          <p className="mt-5 text-base sm:text-lg text-[#4A4840] leading-relaxed max-w-2xl font-body">
            Growing enterprises often reach a bottleneck where operational friction outpaces growth. The answer isn't working longer hours—it's connecting your workflow.
          </p>
        </div>

        {/* 4 Arranged Problem Cards */}
        <div
          ref={trackRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
        >
          {problems.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="problem-card group rounded-xl bg-white border border-[#E5E1D8] p-6 sm:p-7 flex flex-col justify-between hover:border-[#2F4FD2]/40 hover:shadow-[0_12px_30px_-8px_rgba(17,20,24,0.06)] transition-all duration-200 relative overflow-hidden"
              >
                {/* Top indicator */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xs font-semibold text-[#6D6B5F] group-hover:text-[#2F4FD2] transition-colors">
                    {p.number}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-slate-50 border border-[#E5E1D8] flex items-center justify-center text-[#6D6B5F] group-hover:bg-[#EEF2FF] group-hover:text-[#2F4FD2] transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#111418] mb-2.5 leading-snug font-heading">
                    {p.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#4A4840] leading-relaxed font-body">
                    {p.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3.5 border-t border-slate-100 flex items-center gap-2 text-[11px] font-mono text-[#6D6B5F]">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400/80 shrink-0" />
                  <span className="truncate">{p.impact}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
