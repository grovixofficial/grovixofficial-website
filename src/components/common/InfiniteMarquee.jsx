import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  Zap,
  MessageSquare,
  Cpu,
  Database,
  Code,
  Globe,
  Smartphone,
  Server,
  Layers,
  BarChart3,
  ArrowUpRight,
} from './Icons';
import { handleAnchorClick } from '../../utils/scrollToSection';

/**
 * Services Infinite Horizontal Marquee Ticker
 * Seamlessly loops through all core services offered by Grovix with smooth GSAP animation.
 */
const servicesList = [
  {
    num: '01',
    title: 'Business Automation',
    tag: 'Workflow Orchestration',
    icon: Zap,
    highlight: 'Trigger-based operations',
  },
  {
    num: '02',
    title: 'WhatsApp Automation',
    tag: 'Official Meta APIs',
    icon: MessageSquare,
    highlight: 'Alerts, updates & chatbots',
  },
  {
    num: '03',
    title: 'AI Automation & OCR',
    tag: 'Document OCR & LLMs',
    icon: Cpu,
    highlight: 'Smart invoice & document parsing',
  },
  {
    num: '04',
    title: 'Custom ERP & CRM',
    tag: 'Bespoke Logic',
    icon: Database,
    highlight: 'Tailored factory & party ledgers',
  },
  {
    num: '05',
    title: 'Custom Software',
    tag: 'Scalable Architecture',
    icon: Code,
    highlight: 'Targeted bottleneck elimination',
  },
  {
    num: '06',
    title: 'Web Applications',
    tag: 'Cloud Platforms',
    icon: Globe,
    highlight: 'Secure portals & dashboards',
  },
  {
    num: '07',
    title: 'Mobile Applications',
    tag: 'Android & iOS Ground Ops',
    icon: Smartphone,
    highlight: 'Field sales & warehouse tools',
  },
  {
    num: '08',
    title: 'SAP Integration',
    tag: 'RFC & BAPI Bridges',
    icon: Server,
    highlight: 'Custom ALV & live sync',
  },
  {
    num: '09',
    title: 'Tally & API Sync',
    tag: 'Zero Data Silos',
    icon: Layers,
    highlight: 'Automated 2-way ledger balance',
  },
  {
    num: '10',
    title: 'Real-Time Dashboards',
    tag: 'Business Telemetry',
    icon: BarChart3,
    highlight: 'Live metrics & performance visibility',
  },
];

const InfiniteMarquee = ({ speed = 45, className = '' }) => {
  const trackRef = useRef(null);
  const animRef = useRef(null);

  // Duplicate the list so the infinite track is continuous and full
  const repeatedServices = [...servicesList, ...servicesList];
  // Duplicate the entire set for seamless 100% to -50% GSAP loop
  const loopItems = [...repeatedServices, ...repeatedServices];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Half of the scrollWidth is exactly one complete cycle
    const halfWidth = track.scrollWidth / 2;

    gsap.set(track, { x: 0 });

    animRef.current = gsap.to(track, {
      x: -halfWidth,
      duration: halfWidth / speed,
      ease: 'none',
      repeat: -1,
    });

    // Slow down on mouse hover for easy reading
    const onEnter = () => animRef.current?.timeScale(0.22);
    const onLeave = () => animRef.current?.timeScale(1);

    const container = track.parentElement;
    container?.addEventListener('mouseenter', onEnter);
    container?.addEventListener('mouseleave', onLeave);

    return () => {
      animRef.current?.kill();
      container?.removeEventListener('mouseenter', onEnter);
      container?.removeEventListener('mouseleave', onLeave);
    };
  }, [speed]);

  return (
    <section
      className={`border-y border-black/[0.08] bg-[#F5F4EF] py-4 sm:py-5 select-none relative overflow-hidden ${className}`}
      aria-label="Services We Provide"
    >
      {/* Header bar indicating SERVICES WE PROVIDE */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2F4FD2] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2F4FD2]" />
          </span>
          <span className="text-xs sm:text-sm font-mono font-bold uppercase tracking-[0.22em] text-[#111418]">
            SERVICES WE PROVIDE
          </span>
          <span className="text-slate-300 font-mono hidden sm:inline">|</span>
          <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider hidden sm:inline">
            End-to-End Enterprise Automation &amp; Custom Software
          </span>
        </div>

        <a
          href="#services"
          onClick={(e) => handleAnchorClick(e, '#services')}
          className="group inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold uppercase tracking-wider text-[#2F4FD2] hover:text-[#233FA8] bg-[#2F4FD2]/10 hover:bg-[#2F4FD2]/15 px-2.5 sm:px-3 py-1 rounded-full border border-[#2F4FD2]/20 transition-all cursor-pointer"
        >
          <span>10+ Capabilities</span>
          <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>

      {/* Masked Infinite Scrolling Track */}
      <div className="relative overflow-hidden w-full mask-marquee-edges">
        <div
          ref={trackRef}
          className="flex items-center gap-5 sm:gap-6 whitespace-nowrap w-max will-change-transform py-1.5"
        >
          {loopItems.map((service, index) => {
            const Icon = service.icon;
            return (
              <a
                key={index}
                href="#services"
                onClick={(e) => handleAnchorClick(e, '#services')}
                className="group flex items-center gap-5 sm:gap-6 shrink-0 cursor-pointer"
              >
                <div className="inline-flex items-center gap-3.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl bg-white border border-[#E5E1D8] shadow-[0_2px_8px_-2px_rgba(17,20,24,0.04)] group-hover:border-[#2F4FD2]/40 group-hover:shadow-md group-hover:-translate-y-0.5 transition-all duration-200">
                  {/* Icon Badge */}
                  <div className="w-9 h-9 rounded-xl bg-[#EEF2FF] border border-[#D1DDFF] flex items-center justify-center text-[#2F4FD2] shrink-0 group-hover:bg-[#2F4FD2] group-hover:text-white transition-colors duration-200">
                    <Icon className="w-4 h-4" />
                  </div>

                  {/* Service Info */}
                  <div className="flex flex-col text-left">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-[#2F4FD2]">
                        {service.num}
                      </span>
                      <span className="text-sm sm:text-base font-bold text-[#111418] font-heading tracking-tight group-hover:text-[#2F4FD2] transition-colors">
                        {service.title}
                      </span>
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                      {service.tag}
                    </span>
                  </div>

                  {/* Micro highlight pill */}
                  <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#FAF9F6] border border-[#E5E1D8] text-[10px] font-mono font-medium text-slate-600">
                    {service.highlight}
                  </span>
                </div>

                {/* Cobalt Diamond Divider */}
                <span className="text-[#2F4FD2] text-xs font-mono opacity-40 select-none">
                  ◆
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default InfiniteMarquee;
