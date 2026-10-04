import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, X } from '../common/Icons';

gsap.registerPlugin(ScrollTrigger);

const comparisons = [
  {
    id: 0,
    grovix: {
      title: 'Business-Specific Architecture',
      desc: 'Custom software mapped strictly around your team’s existing workflows and party ledger rules.',
      highlight: '100% Bespoke Fit',
    },
    traditional: {
      title: 'Rigid Generic Templates',
      desc: 'Bloated off-the-shelf software forcing your company to adapt to inflexible, confusing menus.',
      highlight: 'Rigid & Bloated',
    },
    metric: {
      label: 'Operational Workflow Fit',
      grovixValue: '99.4%',
      traditionalValue: '32.0%',
      unit: 'Adoption Rate',
      summary: 'Grovix adapts to your team; generic software forces your team to adapt to it.',
    },
  },
  {
    id: 1,
    grovix: {
      title: 'Unified Automation + Software',
      desc: 'Seamlessly link workflows, forms, triggers, and accounting without separate siloed subscriptions.',
      highlight: 'Zero Re-entry',
    },
    traditional: {
      title: 'Disconnected Fragmented Tools',
      desc: 'Siloed tools that cannot communicate, causing lost context, delay, and hours of copy-pasting.',
      highlight: '5+ Fragmented Apps',
    },
    metric: {
      label: 'Manual Re-Entry Overhead',
      grovixValue: '0 hrs',
      traditionalValue: '3.5 hrs/day',
      unit: 'Daily Staff Wastage',
      summary: 'Automated data pipelines eliminate human error and repetitive double-entry.',
    },
  },
  {
    id: 2,
    grovix: {
      title: 'Native System Integrations',
      desc: 'Bridge legacy Tally, SAP, spreadsheets, and modern APIs into unified real-time pipelines.',
      highlight: 'Bi-directional Sync',
    },
    traditional: {
      title: 'Locked Proprietary Islands',
      desc: 'Expensive connectors or closed databases that lock your operational data inside proprietary walls.',
      highlight: 'Data Silos',
    },
    metric: {
      label: 'Ledger & Database Sync Latency',
      grovixValue: '< 85 ms',
      traditionalValue: 'Manual Export',
      unit: 'Sync Frequency',
      summary: 'Direct REST and BAPI bridges synchronize stock and accounts in real-time.',
    },
  },
  {
    id: 3,
    grovix: {
      title: 'Pragmatic AI When Useful',
      desc: 'Practical, high-accuracy OCR for invoices, smart email parsing, and automated document ingestion.',
      highlight: '99.8% Precision',
    },
    traditional: {
      title: 'Speculative Gimmicks & Hype',
      desc: 'Generic chatbots and unverified AI plugins that hallucinate data and disrupt critical billing.',
      highlight: 'High Error Rate',
    },
    metric: {
      label: 'Invoice & PO Processing Speed',
      grovixValue: '4.2 sec',
      traditionalValue: '25 min/batch',
      unit: 'Document Turnaround',
      summary: 'AI targeted specifically at repetitive data extraction with deterministic verification.',
    },
  },
  {
    id: 4,
    grovix: {
      title: 'Continuous Long-Term Evolution',
      desc: 'Proactive engineering iterations and continuous tuning as your operational volumes grow.',
      highlight: 'Long-Term Partner',
    },
    traditional: {
      title: 'One-Time Vendor Departure',
      desc: 'Contractors vanish immediately after basic delivery, leaving your staff with zero ongoing support.',
      highlight: 'Abandoned Post-Launch',
    },
    metric: {
      label: 'System Uptime & Support SLA',
      grovixValue: '99.95%',
      traditionalValue: 'Unmanaged',
      unit: 'Continuous Care',
      summary: 'Your workflows evolve as you scale; Grovix keeps your digital infrastructure aligned.',
    },
  },
  {
    id: 5,
    grovix: {
      title: 'Rapid Modular Deployment',
      desc: 'Focused, working digital modules deployed in weeks rather than multi-year enterprise overhauls.',
      highlight: '2–4 Weeks Live',
    },
    traditional: {
      title: 'Protracted Multi-Year Delay',
      desc: 'Endless scope creep, consultant billing cycles, and months of delay before seeing a working tool.',
      highlight: '6–14 Months Lag',
    },
    metric: {
      label: 'Average Time to Production',
      grovixValue: '2–4 Wks',
      traditionalValue: '8–14 Mos',
      unit: 'Time to Value',
      summary: 'Agile milestone sprints get working tools into staff hands in weeks, not quarters.',
    },
  },
];

const DifferentiationSection = () => {
  const [activeRow, setActiveRow] = useState(0);
  const sectionRef = useRef(null);
  const grovixCardRef = useRef(null);
  const traditionalCardRef = useRef(null);
  const metricBarRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        '.diff-header',
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // Comparative Cards Entrance
      gsap.fromTo(
        grovixCardRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: grovixCardRef.current,
            start: 'top 82%',
          },
        }
      );

      gsap.fromTo(
        traditionalCardRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: traditionalCardRef.current,
            start: 'top 82%',
          },
        }
      );

      // Rows stagger in
      gsap.fromTo(
        '.diff-row',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.06,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: grovixCardRef.current,
            start: 'top 78%',
          },
        }
      );

      // Metric bar slide up
      gsap.fromTo(
        metricBarRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: metricBarRef.current,
            start: 'top 88%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate metric update when hovering rows
  const handleRowHover = (index) => {
    if (activeRow === index) return;
    setActiveRow(index);

    if (metricBarRef.current) {
      gsap.fromTo(
        '.metric-value-grovix',
        { scale: 0.9, opacity: 0.6 },
        { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(1.8)' }
      );
      gsap.fromTo(
        '.metric-value-traditional',
        { scale: 0.9, opacity: 0.6 },
        { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(1.8)' }
      );
    }
  };

  const currentComparison = comparisons[activeRow] || comparisons[0];

  return (
    <section
      ref={sectionRef}
      id="difference"
      className="py-24 md:py-32 bg-[#F5F4EF] border-b border-[#E5E1D8] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="diff-header text-center max-w-3xl mx-auto mb-14 md:mb-18">
          <span className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#2F4FD2] mb-3.5 block">
            / THE DIFFERENCE
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-[#111418] tracking-tight leading-[1.1] font-heading">
            Built around your business, not a generic template.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-body">
            Hover over any capability to see how Grovix’s workflow-first engineering directly eliminates the friction of traditional software packages.
          </p>
        </div>

        {/* 2-Column Comparative Table with Synchronized Row Hover */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 lg:gap-9">
          
          {/* Left Column: The Grovix Way */}
          <div
            ref={grovixCardRef}
            className="rounded-2xl bg-white border border-[#2F4FD2]/30 shadow-[0_12px_36px_rgba(17,20,24,0.05)] p-6 sm:p-9 relative overflow-hidden flex flex-col justify-between transition-all duration-200"
          >
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#2F4FD2]" />
            
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-5 mb-6 sm:mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#111418] flex items-center justify-center text-white font-mono font-bold text-sm shadow-xs">
                    G
                  </div>
                  <div>
                    <span className="font-extrabold text-2xl text-[#111418] font-heading block leading-tight">
                      Grovix Architecture
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">Workflow-first engineered</span>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#EEF2FF] text-[#2F4FD2] border border-[#D1DDFF] text-xs font-mono font-bold uppercase tracking-wider">
                  Engineered For You
                </span>
              </div>

              {/* Rows List */}
              <div className="space-y-4">
                {comparisons.map((item, idx) => {
                  const isActive = activeRow === idx;
                  return (
                    <div
                      key={item.id}
                      onMouseEnter={() => handleRowHover(idx)}
                      className={`diff-row p-4 rounded-2xl transition-all duration-300 cursor-pointer flex items-start gap-4 relative border ${
                        isActive
                          ? 'bg-[#EEF2FF]/60 border-[#2F4FD2]/40 shadow-xs translate-x-1'
                          : 'bg-transparent border-transparent hover:bg-slate-50/70'
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-all duration-300 ${
                          isActive
                            ? 'bg-[#2F4FD2] text-white shadow-xs scale-110'
                            : 'bg-[#EEF2FF] border border-[#D1DDFF] text-[#2F4FD2]'
                        }`}
                      >
                        <Check className="w-4 h-4 stroke-[2.5]" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h4
                            className={`text-sm sm:text-base font-bold font-heading transition-colors duration-200 ${
                              isActive ? 'text-[#111418]' : 'text-slate-800'
                            }`}
                          >
                            {item.grovix.title}
                          </h4>
                          <span
                            className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-md transition-all duration-200 ${
                              isActive
                                ? 'bg-[#2F4FD2] text-white'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {item.grovix.highlight}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 font-body leading-relaxed">
                          {item.grovix.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Accent */}
            <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between font-mono text-xs text-[#2F4FD2] font-semibold">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#2F4FD2] animate-ping" />
                Zero workflow friction
              </span>
              <span>100% Code Ownership</span>
            </div>
          </div>

          {/* Right Column: Traditional Approach */}
          <div
            ref={traditionalCardRef}
            className="rounded-2xl bg-white/70 border border-[#E5E1D8] p-6 sm:p-9 relative overflow-hidden flex flex-col justify-between transition-all duration-200"
          >
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-slate-200/80 pb-5 mb-6 sm:mb-8">
                <div>
                  <span className="font-bold text-2xl text-slate-700 font-heading block leading-tight">
                    Traditional Approach
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">Off-the-shelf software packages</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-slate-200/70 text-slate-600 text-xs font-mono font-semibold uppercase tracking-wider">
                  Generic Package
                </span>
              </div>

              {/* Rows List (Mirrored hover state) */}
              <div className="space-y-4">
                {comparisons.map((item, idx) => {
                  const isActive = activeRow === idx;
                  return (
                    <div
                      key={item.id}
                      onMouseEnter={() => handleRowHover(idx)}
                      className={`diff-row p-3.5 sm:p-4 rounded-xl transition-all duration-200 cursor-pointer flex items-start gap-4 border ${
                        isActive
                          ? 'bg-red-50/50 border-red-200/80 shadow-xs'
                          : 'bg-transparent border-transparent opacity-65 hover:opacity-100'
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-all duration-300 ${
                          isActive
                            ? 'bg-red-500 text-white shadow-xs scale-110'
                            : 'bg-red-50 border border-red-200/80 text-red-500'
                        }`}
                      >
                        <X className="w-4 h-4 stroke-[2.5]" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h4
                            className={`text-sm sm:text-base font-bold font-heading transition-colors duration-200 ${
                              isActive ? 'text-red-900 line-through decoration-red-400/80' : 'text-slate-600'
                            }`}
                          >
                            {item.traditional.title}
                          </h4>
                          <span
                            className={`text-[10px] font-mono font-semibold uppercase px-2 py-0.5 rounded-md ${
                              isActive
                                ? 'bg-red-100 text-red-700'
                                : 'bg-slate-200 text-slate-500'
                            }`}
                          >
                            {item.traditional.highlight}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-500 font-body leading-relaxed">
                          {item.traditional.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Accent */}
            <div className="mt-8 pt-5 border-t border-slate-200/80 font-mono text-xs text-slate-400 flex items-center justify-between">
              <span>&bull; High staff churn</span>
              <span>Stagnant data silos</span>
            </div>
          </div>

        </div>

        {/* 
          ANIMATED METRIC COMPARISON PANEL:
          Dynamically animates values and insights based on the currently hovered row!
        */}
        <div
          ref={metricBarRef}
          className="mt-10 rounded-2xl bg-[#111418] text-white p-6 sm:p-8 lg:p-9 shadow-[0_16px_40px_-15px_rgba(17,20,24,0.4)] relative overflow-hidden"
        >
          {/* Subtle background glow */}
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#2F4FD2]/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Metric Overview */}
            <div className="lg:col-span-4 space-y-2">
              <span className="text-[11px] font-mono text-[#3B66F5] uppercase tracking-wider font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#2F4FD2] animate-ping" />
                Live Operational Benchmark
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
                {currentComparison.metric.label}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 font-body leading-relaxed">
                {currentComparison.metric.summary}
              </p>
            </div>

            {/* Side-by-Side Value Contrast */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              {/* Grovix Metric Value */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono text-slate-400 block mb-1">
                    Grovix Advantage
                  </span>
                  <div className="metric-value-grovix text-3xl sm:text-4xl font-black font-heading text-[#3B66F5]">
                    {currentComparison.metric.grovixValue}
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2.5 py-1 rounded-md bg-[#2F4FD2]/25 text-[#7292FF] text-[10px] font-mono font-bold uppercase">
                    Optimal
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 block mt-1">
                    {currentComparison.metric.unit}
                  </span>
                </div>
              </div>

              {/* Traditional Metric Value */}
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono text-slate-400 block mb-1">
                    Traditional Package
                  </span>
                  <div className="metric-value-traditional text-3xl sm:text-4xl font-black font-heading text-red-400 line-through decoration-red-500/50">
                    {currentComparison.metric.traditionalValue}
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2.5 py-1 rounded-md bg-red-500/20 text-red-400 text-[10px] font-mono font-bold uppercase">
                    Bottleneck
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 block mt-1">
                    {currentComparison.metric.unit}
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default DifferentiationSection;
