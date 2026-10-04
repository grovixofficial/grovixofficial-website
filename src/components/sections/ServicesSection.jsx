import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowUpRight,
  Cpu,
  MessageSquare,
  Zap,
  Database,
  Code,
  Globe,
  Smartphone,
  Server,
  Layers,
  BarChart3,
} from '../common/Icons';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    num: '01',
    title: 'Business Automation',
    desc: 'Eliminate repetitive manual tasks by linking spreadsheets, databases, and accounting tools with trigger-based automated workflows.',
    tag: 'Workflow Orchestration',
    icon: Zap,
    color: '#2F4FD2',
  },
  {
    num: '02',
    title: 'WhatsApp Automation',
    desc: 'Automate order confirmations, dispatch tracking, overdue payment reminders, and customer query handling directly inside WhatsApp.',
    tag: 'Official Meta APIs',
    icon: MessageSquare,
    color: '#2F4FD2',
  },
  {
    num: '03',
    title: 'AI Automation',
    desc: 'Deploy practical AI for intelligent document OCR, automated invoice extraction, smart email parsing, and 24/7 business assistance.',
    tag: 'Document OCR & LLMs',
    icon: Cpu,
    color: '#3B66F5',
  },
  {
    num: '04',
    title: 'ERP & CRM Software',
    desc: 'Build modular ERP and CRM tools engineered specifically around your sales pipeline, stock rules, and party accounting ledger workflows.',
    tag: 'Bespoke Business Logic',
    icon: Database,
    color: '#2F4FD2',
  },
  {
    num: '05',
    title: 'Custom Software',
    desc: 'Bespoke web and cloud applications designed to solve unique operational bottlenecks that off-the-shelf software fails to address.',
    tag: 'Tailored Architecture',
    icon: Code,
    color: '#3B66F5',
  },
  {
    num: '06',
    title: 'Web Applications',
    desc: 'High-performance cloud platforms and operational portals that your office staff and management can access securely anywhere.',
    tag: 'Cloud Applications',
    icon: Globe,
    color: '#2F4FD2',
  },
  {
    num: '07',
    title: 'Mobile Applications',
    desc: 'Lightweight mobile tools for ground personnel, field sales agents, delivery drivers, and warehouse inventory scanning.',
    tag: 'iOS & Android Ground Ops',
    icon: Smartphone,
    color: '#3B66F5',
  },
  {
    num: '08',
    title: 'SAP Integration & Add-ons',
    desc: 'Develop specialized SAP add-on modules, custom ALV reports, BAPI connectors, and lightweight mobile apps for SAP users.',
    tag: 'RFC & BAPI Bridges',
    icon: Server,
    color: '#2F4FD2',
  },
  {
    num: '09',
    title: 'API & System Integration',
    desc: 'Connect disparate systems—from Tally and legacy databases to modern payment gateways and SAP-B1 integrations—without data silos.',
    tag: 'Unified Data Sync',
    icon: Layers,
    color: '#3B66F5',
  },
  {
    num: '10',
    title: 'Business Dashboards',
    desc: 'Get real-time operational visibility into sales trends, pending dispatches, inventory shortages, and team performance in one unified view.',
    tag: 'Real-Time Telemetry',
    icon: BarChart3,
    color: '#2F4FD2',
  },
];

const ServicesSection = ({ onOpenContact }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const sectionRef = useRef(null);
  const listContainerRef = useRef(null);
  const floatingCardRef = useRef(null);
  const xTo = useRef(null);
  const yTo = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Per-row reveal: each row animates when IT enters the viewport
      // First row is visible immediately; subsequent rows animate as user scrolls
      gsap.utils.toArray('.service-row').forEach((row, i) => {
        gsap.fromTo(
          row,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 92%',   // fires when the row's top hits 92% of viewport
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // Setup quickTo for butter-smooth 60fps cursor following
      if (floatingCardRef.current) {
        xTo.current = gsap.quickTo(floatingCardRef.current, 'x', {
          duration: 0.28,
          ease: 'power3.out',
        });
        yTo.current = gsap.quickTo(floatingCardRef.current, 'y', {
          duration: 0.28,
          ease: 'power3.out',
        });

        // Initial hidden state
        gsap.set(floatingCardRef.current, {
          scale: 0.75,
          opacity: 0,
          pointerEvents: 'none',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const activeService = services[activeIdx] || services[0];
  const ActiveIcon = activeService.icon;

  // Mouse Enter Row Handler: Card appears right beside the cursor
  const handleMouseEnterRow = (idx, e) => {
    setActiveIdx(idx);

    if (floatingCardRef.current && listContainerRef.current) {
      const containerRect = listContainerRef.current.getBoundingClientRect();
      const clientX = e.clientX;
      const clientY = e.clientY;

      let targetX = clientX - containerRect.left + 24;
      let targetY = clientY - containerRect.top - 110;

      // Keep within bounds
      if (targetX + 380 > containerRect.width) {
        targetX = clientX - containerRect.left - 400;
      }
      if (targetY < 0) {
        targetY = 10;
      }

      gsap.to(floatingCardRef.current, {
        x: targetX,
        y: targetY,
        scale: 1,
        opacity: 1,
        duration: 0.35,
        ease: 'back.out(1.6)',
      });
    }
  };

  // Mouse Move Handler: Card floats smoothly with cursor over the list
  const handleMouseMove = (e) => {
    if (!floatingCardRef.current || !listContainerRef.current || !xTo.current || !yTo.current) return;

    const containerRect = listContainerRef.current.getBoundingClientRect();
    const clientX = e.clientX;
    const clientY = e.clientY;

    let targetX = clientX - containerRect.left + 24;
    let targetY = clientY - containerRect.top - 110;

    if (targetX + 380 > containerRect.width) {
      targetX = clientX - containerRect.left - 400;
    }
    if (targetY < 0) {
      targetY = 10;
    }

    xTo.current(targetX);
    yTo.current(targetY);
  };

  // Mouse Leave List Handler: Card shrinks and vanishes
  const handleMouseLeaveList = () => {
    if (floatingCardRef.current) {
      gsap.to(floatingCardRef.current, {
        scale: 0.75,
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in',
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-24 md:py-32 bg-[#F5F4EF] border-b border-black/[0.06] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 md:mb-18">
          <span className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#2F4FD2] mb-3.5 block">
            / SERVICES &amp; CAPABILITIES
          </span>
          <h2
            data-cursor="view"
            className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-[#111418] tracking-tight leading-[1.1] font-heading cursor-pointer inline-block"
          >
            Digital systems built around your business.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#4A4840] leading-relaxed max-w-2xl font-body">
            We don't sell bloated templates or force rigid subscription tiers. We engineer focused, modular systems that fit exactly into your day-to-day operations.
          </p>
        </div>

        {/* 
          Interactive Editorial Services List with GSAP Floating Hover Card:
          Hovering over ANY row triggers the floating preview card to appear and track smoothly!
        */}
        <div
          ref={listContainerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeaveList}
          className="relative max-w-5xl mx-auto"
        >
          {/* GSAP FLOATING HOVER CARD (Tracks smoothly with cursor) */}
          <div
            ref={floatingCardRef}
            aria-hidden="true"
            className="absolute top-0 left-0 z-50 pointer-events-none hidden md:block w-[360px] lg:w-[380px] rounded-2xl bg-white/95 backdrop-blur-xl border border-[#E5E1D8] shadow-[0_24px_60px_-15px_rgba(17,20,24,0.18)] p-6 select-none"
          >
            {/* Top Status */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full animate-pulse"
                  style={{ backgroundColor: activeService.color }}
                />
                <span className="font-mono text-xs font-semibold text-[#6D6B5F] uppercase tracking-wider">
                  CAPABILITY {activeService.num}
                </span>
              </div>
              <span className="text-[11px] font-mono font-bold text-[#2F4FD2] bg-[#EEF2FF] px-2.5 py-0.5 rounded-full">
                ACTIVE
              </span>
            </div>

            {/* Icon + Title */}
            <div className="flex items-center gap-3.5 mb-3">
              <div className="w-12 h-12 rounded-xl bg-slate-50 border border-[#E5E1D8] flex items-center justify-center shrink-0 shadow-xs">
                <ActiveIcon className="w-6 h-6" style={{ color: activeService.color }} />
              </div>
              <div>
                <h4 className="text-xl font-extrabold text-[#111418] tracking-tight font-heading leading-tight">
                  {activeService.title}
                </h4>
                <span className="text-[11px] font-mono text-[#6D6B5F] font-medium">{activeService.tag}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-[#4A4840] leading-relaxed font-body mb-4">
              {activeService.desc}
            </p>

            {/* Feature Telemetry Footer */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono">
              <span className="text-[#6D6B5F] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2F4FD2]" />
                Tailored Architecture
              </span>
              <span className="text-[#111418] font-bold uppercase tracking-wider flex items-center gap-1">
                Grovix Spec &rarr;
              </span>
            </div>
          </div>

          {/* List Rows */}
          <div className="services-list divide-y divide-black/[0.07] border-y border-black/[0.07]">
            {services.map((service, idx) => {
              const isSelected = activeIdx === idx;

              return (
                <div
                  key={service.num}
                  data-cursor="view"
                  onMouseEnter={(e) => handleMouseEnterRow(idx, e)}
                  onMouseLeave={handleMouseLeaveList}
                  onClick={() => {
                    setActiveIdx(idx);
                    if (onOpenContact) onOpenContact();
                  }}
                  className={`service-row group py-5 sm:py-6 transition-all duration-200 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 relative px-4 rounded-xl ${
                    isSelected ? 'bg-black/[0.03]' : 'hover:bg-black/[0.015]'
                  }`}
                >
                  <div className="flex items-start md:items-center gap-5 sm:gap-7 flex-1">
                    {/* Index Number */}
                    <span
                      className={`font-mono text-xs sm:text-sm font-semibold transition-all duration-200 shrink-0 ${
                        isSelected ? 'text-[#2F4FD2] translate-x-1 font-bold' : 'text-[#6D6B5F] group-hover:text-[#111418]'
                      }`}
                    >
                      {service.num}
                    </span>

                    {/* Service Title & Brief */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3
                          className={`text-base sm:text-xl font-bold tracking-tight font-heading transition-colors duration-200 ${
                            isSelected ? 'text-[#111418]' : 'text-[#2A2B2E] group-hover:text-[#111418]'
                          }`}
                        >
                          {service.title}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-[13px] text-[#4A4840] max-w-xl font-body leading-relaxed">
                        {service.desc}
                      </p>
                    </div>
                  </div>

                  {/* Right Meta Tag & Arrow */}
                  <div className="flex items-center justify-between md:justify-end gap-4 pl-9 md:pl-0 shrink-0">
                    <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-white border border-[#E5E1D8] text-[#4A4840] font-medium">
                      {service.tag}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                        isSelected
                          ? 'bg-[#111418] text-[#2F4FD2] rotate-45 scale-105'
                          : 'bg-white border border-[#E5E1D8] text-[#6D6B5F] group-hover:bg-[#111418] group-hover:text-white'
                      }`}
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
