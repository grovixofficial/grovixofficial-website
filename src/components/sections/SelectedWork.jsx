import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ArrowLeft, ArrowRight, CheckCircle2, Layers } from '../common/Icons';

gsap.registerPlugin(ScrollTrigger);

const caseStudies = [
  {
    id: 0,
    num: '01',
    category: 'Industrial Manufacturing & Heavy Fabrication ERP',
    title: 'Neeta Engineering Industrial ERP & Stock Telemetry Suite',
    desc: 'An enterprise-grade manufacturing ERP and logistics management platform digitizing real-time inventory balances, material inward (CR Register), outward delivery challans with automated stock deduction, GST invoicing, stamp-paper aligned Indemnity Bonds, and a Google Gemini AI assistant.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Gemini AI', 'Tailwind CSS'],
    accent: '#2F4FD2',
    accentBg: '#EEF2FF',
    accentBorder: 'rgba(47, 79, 210, 0.25)',
    status: 'PRODUCTION DEPLOYED • ACTIVE CLIENT ERP',
    metrics: [
      { label: 'Inward / Outward Sync', val: '100% Automated', sub: 'Real-time CR & Challan ledger' },
      { label: 'Legal & GST Paperwork', val: 'Print-Ready A4', sub: 'Instant stamp-paper bonds' },
      { label: 'AI Operations Assist', val: 'Gemini AI Powered', sub: 'Natural language search & assist' },
    ],
    pipeline: [
      { step: '01', label: 'Material Inward (CR)', desc: 'Supplier invoice & raw stock intake' },
      { step: '02', label: 'Stock Allocation', desc: 'Division-wise job-work allocation' },
      { step: '03', label: 'Delivery Challan', desc: 'Auto stock deduction upon dispatch' },
      { step: '04', label: 'GST & Bond Generation', desc: 'Print-ready invoices & legal bonds' },
    ],
    systemSpec: {
      protocol: 'MERN Stack / RESTful APIs / JWT Auth',
      frequency: 'Instant Transactional Stock Deduction',
      deployment: 'Cloud Backend + Multi-Tab Desktop UI Wrapper',
    },
  },
  {
    id: 1,
    num: '02',
    category: 'Cloud ERP, GST Automation & Supply Chain Platform',
    title: 'BillGenie: AI-Powered Multi-Module ERP & Automated GST Platform',
    desc: 'A comprehensive MSME business management suite combining GST tax invoices, delivery challans, Bill of Materials (BOM) manufacturing workflows, double-entry ledgers, and intelligent AI assistance for smart HSN suggestions and invoice compliance validation.',
    tech: ['React.js', 'Node.js', 'Express', 'MongoDB', 'Framer Motion', 'REST APIs'],
    accent: '#059669',
    accentBg: '#ECFDF5',
    accentBorder: 'rgba(5, 150, 105, 0.25)',
    status: 'OPEN ARCHITECTURE • MSME READY',
    metrics: [
      { label: 'GST Compliance Engine', val: '1-Click GSTR-1 & JSON', sub: 'Automated ITC & tax validation' },
      { label: 'Manufacturing & BOM', val: 'Live Production Track', sub: 'Raw material to finished goods' },
      { label: 'Financial Accounting', val: 'Real-Time Ledgers & P&L', sub: 'Double-entry audit reconciliation' },
    ],
    pipeline: [
      { step: '01', label: 'Order & Quotation', desc: '1-click convert to Tax Invoice' },
      { step: '02', label: 'BOM Production', desc: 'Material consumption & costing' },
      { step: '03', label: 'GST & SAP-B1', desc: 'HSN validation & JSON export' },
      { step: '04', label: 'Ledger & Aging Sync', desc: 'Automated receivables & audit' },
    ],
    systemSpec: {
      protocol: 'RESTful JSON API / RBAC Security',
      frequency: 'Real-Time Ledger & Inventory Stream',
      deployment: 'Cloud Cluster + Print-Optimized Engine',
    },
  },
  {
    id: 2,
    num: '03',
    category: 'Operations & Process Orchestration',
    title: 'Multi-Department Logistics & Real-Time Tally Prime Bridge',
    desc: 'A unified operations backbone connecting warehouse dispatch manifests, government GST billing, and accounts. Completely eliminates duplicate spreadsheets and maintains 2-way ledger balance with Tally Prime.',
    tech: ['TypeScript', 'FastAPI', 'PostgreSQL', 'Tally XML', 'SAP-B1 API'],
    accent: '#1D4ED8',
    accentBg: '#EFF6FF',
    accentBorder: 'rgba(29, 78, 216, 0.25)',
    status: 'TWO-WAY LEDGER SYNC ACTIVE',
    metrics: [
      { label: 'Daily Shipments', val: '450+ Manifests', sub: 'Automated dispatch tracking' },
      { label: 'Ledger Accuracy', val: 'Zero Discrepancies', sub: 'Reconciled upon dispatch' },
      { label: 'Sync Latency', val: '< 85ms Bridge', sub: 'Direct XML socket bridge' },
    ],
    pipeline: [
      { step: '01', label: 'Dispatch Manifest', desc: 'Store clerk entry' },
      { step: '02', label: 'Stock Reservation', desc: 'Live inventory deduction' },
      { step: '03', label: 'SAP-B1 Sync', desc: '1-click API generation' },
      { step: '04', label: 'Tally XML Write', desc: 'Balanced journal entry' },
    ],
    systemSpec: {
      protocol: 'Direct XML Socket / REST API',
      frequency: 'Instant Transactional Sync',
      deployment: 'Hybrid Cloud + Local Tally Agent',
    },
  },
  {
    id: 3,
    num: '04',
    category: 'Practical Artificial Intelligence & OCR',
    title: 'Intelligent Invoice Extraction & Purchase Order Intake Engine',
    desc: 'An AI-driven intake pipeline extracting line items, GSTIN breakdowns, and tax rates from vendor PDF bills and paper receipts, validating each item against open purchase orders before ERP posting.',
    tech: ['Python', 'FastAPI', 'Document OCR', 'Vector Search', 'SAP BAPI'],
    accent: '#7C3AED',
    accentBg: '#F5F3FF',
    accentBorder: 'rgba(124, 58, 237, 0.25)',
    status: 'DOCUMENT INTAKE PIPELINE ACTIVE',
    metrics: [
      { label: 'Field Accuracy', val: '99.4% Extraction', sub: 'Verified line-item accuracy' },
      { label: 'Processing Speed', val: '3.8s Per Invoice', sub: 'From inbox to verified draft' },
      { label: 'Duplicate Prevention', val: '100% PO Check', sub: 'Flags price variances instantly' },
    ],
    pipeline: [
      { step: '01', label: 'Invoice Intake', desc: 'PDF / Scanned bill inbox' },
      { step: '02', label: 'OCR Extraction', desc: 'Line items, GSTIN, HSN' },
      { step: '03', label: 'PO Reconciliation', desc: 'Price & quantity match' },
      { step: '04', label: 'ERP Ingestion', desc: 'Approved voucher creation' },
    ],
    systemSpec: {
      protocol: 'Async REST Pipeline / Webhook',
      frequency: 'Immediate Document Processing',
      deployment: 'Private GPU Worker + Secure Storage',
    },
  },
];

const SelectedWork = ({ onOpenContact }) => {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const cardsRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [stageHeight, setStageHeight] = useState(500);
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= 768 : true
  );

  // Measure card heights to give stageRef exact non-zero height on desktop
  // Prevents stage from collapsing and eliminates dead space.
  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 768;
      setIsDesktop(desktop);

      if (desktop) {
        let maxH = 0;
        cardsRef.current.forEach((card) => {
          if (card) {
            const h = card.offsetHeight || card.scrollHeight;
            if (h > maxH) maxH = h;
          }
        });
        if (maxH > 100) {
          setStageHeight(maxH);
          ScrollTrigger.refresh();
        }
      } else {
        setStageHeight(null);
      }
    };

    const t = setTimeout(handleResize, 150);
    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean);
      const total = cards.length;
      if (total < 2) return;

      const mm = gsap.matchMedia();

      // Desktop & Tablet Pinning Experience (Pinned Scroll Stack):
      // The section sticks in place. As you scroll, cards slide up smoothly one by one!
      mm.add('(min-width: 768px)', () => {
        // Initial setup:
        // Card 0 sits at natural position (y: 0, scale: 1)
        // Cards 1, 2, 3 start pushed completely below the viewport so they never peek prematurely
        cards.forEach((card, i) => {
          if (i === 0) {
            gsap.set(card, {
              y: 0,
              scale: 1,
              zIndex: 10,
              opacity: 1,
              filter: 'brightness(1)',
              transformOrigin: '50% 0%',
            });
          } else {
            gsap.set(card, {
              y: () => Math.max(window.innerHeight, 900),
              scale: 0.98,
              zIndex: 10 + i * 2,
              opacity: 1,
              filter: 'brightness(1)',
              transformOrigin: '50% 0%',
            });
          }
        });

        // Scrubbed GSAP Timeline pinned to section
        // Designed with explicit holding buffers so Card 01 stays stationary when pinned
        // and subsequent cards glide up smoothly only when scrolling deliberately.
        const tl = gsap.timeline({
          scrollTrigger: {
            id: 'selected-work-pin',
            trigger: sectionRef.current,
            start: 'top top+=64',      // 64px clearance for fixed navbar — heading never cut off
            end: () => `+=${total * 750}`,
            pin: true,
            pinSpacing: true,
            scrub: 0.65,
            anticipatePin: 1,
            onUpdate: (self) => {
              const p = self.progress;
              let currentStep = 0;
              if (p >= 0.80) {
                currentStep = 3;
              } else if (p >= 0.52) {
                currentStep = 2;
              } else if (p >= 0.23) {
                currentStep = 1;
              } else {
                currentStep = 0;
              }
              setActiveIndex(currentStep);
            },
          },
        });

        // initialHold: scroll distance before Card 02 starts; longer = more reading time on Card 01
        const initialHold = 1.5;
        const slideDuration = 1.0;
        const holdDuration = 1.2;

        for (let i = 1; i < total; i++) {
          const stepStartTime = initialHold + (i - 1) * (slideDuration + holdDuration);
          const prevCard = cards[i - 1];
          const currCard = cards[i];

          // Previous card scales down slightly and dims to add depth
          tl.to(
            prevCard,
            {
              scale: 0.95,
              filter: 'brightness(0.92)',
              duration: slideDuration,
              ease: 'power1.inOut',
            },
            stepStartTime
          );

          // Current card slides up from below viewport to cleanly cover previous card
          tl.fromTo(
            currCard,
            {
              y: () => Math.max(window.innerHeight, 900),
              scale: 0.98,
            },
            {
              y: 0,
              scale: 1,
              duration: slideDuration,
              ease: 'power2.out',
            },
            stepStartTime
          );
        }
      });

      // Mobile setup: ZERO PINNING, natural smooth scrolling.
      // Lightly track activeIndex as cards scroll past to keep header indicators in sync.
      mm.add('(max-width: 767px)', () => {
        cards.forEach((card, i) => {
          gsap.set(card, { clearProps: 'transform,opacity,filter,zIndex' });
          ScrollTrigger.create({
            trigger: card,
            start: 'top 55%',
            end: 'bottom 45%',
            onEnter: () => setActiveIndex(i),
            onEnterBack: () => setActiveIndex(i),
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Jump to specific card when clicking navigation buttons or step pills
  const handleSelectCard = (targetIdx) => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    if (isMobile) {
      const el = document.getElementById(`work-card-${targetIdx}`);
      if (el) {
        if (window.__lenis) {
          window.__lenis.scrollTo(el, { offset: -70, duration: 0.7 });
        } else {
          const y = el.getBoundingClientRect().top + window.scrollY - 70;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
      setActiveIndex(targetIdx);
      return;
    }

    const total = caseStudies.length;
    const st = ScrollTrigger.getById('selected-work-pin');

    if (st) {
      // Center of each card's hold phase in progress (0 to 1)
      const cardProgresses = [0.06, 0.36, 0.65, 0.93];
      const targetProgress = cardProgresses[targetIdx] ?? (targetIdx / (total - 1));
      const scrollPos = st.start + targetProgress * (st.end - st.start);
      if (window.__lenis) {
        window.__lenis.scrollTo(scrollPos, { duration: 0.85 });
      } else {
        window.scrollTo({ top: scrollPos, behavior: 'smooth' });
      }
    }
    setActiveIndex(targetIdx);
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      handleSelectCard(activeIndex - 1);
    }
  };

  const handleNext = () => {
    if (activeIndex < caseStudies.length - 1) {
      handleSelectCard(activeIndex + 1);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="work"
      className="pt-6 sm:pt-8 pb-8 sm:pb-10 bg-[#F5F4EF] border-b border-black/[0.06] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-5 sm:mb-6">
          <div className="max-w-2xl">
            <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-[#2F4FD2] mb-1.5 block">
              / SELECTED WORK &bull; CASE STUDIES
            </span>
            <h2 className="text-xl sm:text-3xl lg:text-[34px] font-extrabold text-[#111418] tracking-tight leading-[1.15] font-heading">
              Systems that solve real business problems.
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-[#4A4840] leading-relaxed font-body max-w-xl">
              Real architectural blueprints engineered to eliminate friction in production, logistics, and back-office operations.
            </p>
          </div>

          {/* Navigation Controls & Index Counter */}
          <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E5E1D8]/60">
            {/* Step Indicator Pills */}
            <div className="flex items-center gap-1.5 mr-1 sm:mr-2">
              {caseStudies.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleSelectCard(i)}
                  aria-label={`Jump to case study ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    activeIndex === i ? 'w-8 bg-[#2F4FD2]' : 'w-2 bg-[#D4D0C5] hover:bg-[#A8A497]'
                  }`}
                />
              ))}
            </div>

            <div className="text-xs font-mono font-semibold text-[#6D6B5F]">
              <span className="text-[#111418] font-bold text-sm sm:text-base">0{activeIndex + 1}</span>
              <span className="mx-1 text-slate-400">/</span>
              <span>0{caseStudies.length}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                disabled={activeIndex === 0}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#E5E1D8] bg-white hover:bg-slate-50 active:scale-95 text-[#111418] flex items-center justify-center transition-all disabled:opacity-30 disabled:pointer-events-none shadow-xs cursor-pointer"
                aria-label="Previous project"
              >
                <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
              <button
                onClick={handleNext}
                disabled={activeIndex === caseStudies.length - 1}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#111418] hover:bg-black active:scale-95 text-white flex items-center justify-center transition-all disabled:opacity-30 disabled:pointer-events-none shadow-xs cursor-pointer"
                aria-label="Next project"
              >
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2F4FD2]" />
              </button>
            </div>
          </div>
        </div>

        {/* 
          STAGE CONTAINER:
          - Desktop (md+): Pinned scroll stack where cards slide smoothly over each other
          - Mobile: Clean, natural vertical layout with zero scroll pinning/hijacking
        */}
        <div
          ref={stageRef}
          className="relative w-full max-w-6xl mx-auto md:min-h-[500px]"
          style={isDesktop && stageHeight ? { minHeight: `${stageHeight}px` } : undefined}
        >
          {caseStudies.map((project, idx) => {
            return (
              <div
                key={project.id}
                id={`work-card-${idx}`}
                ref={(el) => (cardsRef.current[idx] = el)}
                className="work-card-deck relative md:absolute md:inset-x-0 md:top-0 mb-6 last:mb-0 md:mb-0 will-change-transform"
                style={isDesktop ? { zIndex: 10 + idx * 2 } : undefined}
              >
                <div className="rounded-2xl sm:rounded-[24px] bg-white border border-[#E5E1D8] shadow-[0_4px_20px_rgba(17,20,24,0.06)] md:shadow-[0_-8px_32px_rgba(17,20,24,0.08),0_24px_64px_-12px_rgba(17,20,24,0.14)] overflow-hidden transition-shadow duration-300">
                  
                  {/* Card Header Rim */}
                  <div className="px-4 sm:px-7 py-2.5 sm:py-3 bg-[#FAF9F5] border-b border-[#E5E1D8] flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                      <span
                        className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono font-bold tracking-wider uppercase border shrink-0"
                        style={{
                          backgroundColor: project.accentBg,
                          color: project.accent,
                          borderColor: project.accentBorder,
                        }}
                      >
                        CASE STUDY {project.num}
                      </span>
                      <span className="text-[11px] sm:text-xs font-mono font-semibold text-[#6D6B5F] uppercase truncate">
                        {project.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 sm:gap-2 font-mono text-[10px] sm:text-[11px] font-semibold shrink-0" style={{ color: project.accent }}>
                      <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: project.accent }} />
                      <span className="hidden sm:inline">{project.status}</span>
                      <span className="sm:hidden">ACTIVE</span>
                    </div>
                  </div>

                  {/* Card Main Body Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                    
                    {/* Left Column: Editorial & Impact Story */}
                    <div className="lg:col-span-7 p-4 sm:p-6 lg:p-7 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#E5E1D8]">
                      <div>
                        <h3 className="text-lg sm:text-2xl lg:text-[23px] font-extrabold text-[#111418] tracking-tight font-heading leading-snug mb-2">
                          {project.title}
                        </h3>

                        <p className="text-xs sm:text-[13px] text-[#4A4840] leading-relaxed font-body mb-4">
                          {project.desc}
                        </p>

                        {/* Concrete Real-World Metrics Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5 mb-4">
                          {project.metrics.map((m, mIdx) => (
                            <div
                              key={mIdx}
                              className="p-2.5 sm:p-3 rounded-xl bg-[#FAF9F6] border border-[#E5E1D8] flex sm:flex-col justify-between sm:justify-start items-center sm:items-start gap-1"
                            >
                              <div>
                                <div className="text-[9px] font-mono uppercase font-bold text-[#6D6B5F] tracking-wider">
                                  {m.label}
                                </div>
                                <div className="text-[9px] font-mono text-[#8C887B] hidden sm:block">
                                  {m.sub}
                                </div>
                              </div>
                              <div className="text-xs sm:text-[13px] font-extrabold text-[#111418] tracking-tight font-heading leading-tight text-right sm:text-left">
                                {m.val}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        {/* Architecture Stack Pills */}
                        <div className="mb-4">
                          <div className="text-[9px] font-mono uppercase font-bold text-[#6D6B5F] tracking-wider mb-1.5">
                            Engineered Stack
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {project.tech.map((t, tIdx) => (
                              <span
                                key={tIdx}
                                className="px-2.5 py-0.5 rounded-md bg-[#FAF9F6] border border-[#E5E1D8] text-[10px] sm:text-[11px] font-mono font-medium text-[#4A4840]"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* CTA Button */}
                        <button
                          onClick={onOpenContact}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#111418] hover:bg-black text-white text-xs font-semibold tracking-wider uppercase transition-all shadow-xs hover:-translate-y-0.5 active:scale-[0.98] group cursor-pointer"
                        >
                          <span>Discuss Similar Architecture</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-[#2F4FD2] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </button>
                      </div>
                    </div>

                    {/* Right Column: Architectural Flow Canvas */}
                    <div className="lg:col-span-5 bg-[#FAF9F5] p-4 sm:p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-[#E5E1D8] font-mono text-xs text-[#6D6B5F]">
                          <span className="font-bold uppercase text-[#111418] flex items-center gap-1.5 text-[11px]">
                            <Layers className="w-3.5 h-3.5 text-[#2F4FD2]" />
                            System Blueprint
                          </span>
                          <span className="text-[10px] font-mono text-slate-500">v2.4 Spec</span>
                        </div>

                        {/* Vertical Stepped Process Flow */}
                        <div className="space-y-1.5 relative">
                          <div className="absolute left-[13px] top-3 bottom-3 w-[1.5px] bg-[#E5E1D8]" />

                          {project.pipeline.map((step, sIdx) => (
                            <div
                              key={sIdx}
                              className="relative flex items-center gap-2.5 sm:gap-3 p-2 rounded-xl bg-white border border-[#E5E1D8] shadow-2xs"
                            >
                              <div
                                className="w-6 h-6 rounded-lg flex items-center justify-center font-mono text-[10px] font-bold shrink-0 z-10 border"
                                style={{
                                  backgroundColor: project.accentBg,
                                  color: project.accent,
                                  borderColor: project.accentBorder,
                                }}
                              >
                                {step.step}
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="text-xs font-bold text-[#111418] font-heading leading-tight truncate">
                                  {step.label}
                                </div>
                                <div className="text-[9px] font-mono text-[#6D6B5F] truncate">
                                  {step.desc}
                                </div>
                              </div>
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#059669] shrink-0" />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Technical Specs Footer */}
                      <div className="pt-2.5 mt-3 border-t border-[#E5E1D8] space-y-1 text-[10px] font-mono text-[#6D6B5F]">
                        <div className="flex items-center justify-between">
                          <span className="text-[#8C887B]">Integration Protocol:</span>
                          <span className="font-semibold text-[#111418]">{project.systemSpec.protocol}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[#8C887B]">Throughput:</span>
                          <span className="font-semibold text-[#111418]">{project.systemSpec.frequency}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[#8C887B]">Deployment:</span>
                          <span className="font-semibold text-[#111418]">{project.systemSpec.deployment}</span>
                        </div>
                      </div>

                    </div>

                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default SelectedWork;
