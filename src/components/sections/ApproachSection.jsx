import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, PenTool, Terminal, Rocket, LineChart, CheckCircle } from '../common/Icons';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: '01',
    title: 'Discover',
    headline: 'Understand the business process, users, systems and bottlenecks.',
    desc: 'Before writing a single line of code, our engineers shadow your actual team workflow. We audit where spreadsheets fail, where WhatsApp messages get lost, and where data entry stalls.',
    deliverable: 'Process Flow Audit & Bottleneck Architecture Map',
    icon: Search,
    color: '#2F4FD2',
  },
  {
    num: '02',
    title: 'Design',
    headline: 'Define the workflow, architecture and user experience.',
    desc: 'We map out the exact data schemas, database models, and API integrations needed. We design simple, distraction-free screens that ground staff and managers can understand intuitively.',
    deliverable: 'Interactive Prototype & Integration Specification',
    icon: PenTool,
    color: '#3B66F5',
  },
  {
    num: '03',
    title: 'Build',
    headline: 'Develop the automation, software, integrations or AI system.',
    desc: 'Our senior developers write clean, robust code connecting your existing tools (Tally, SAP, spreadsheets) with automated triggers, cloud APIs, and specialized web/mobile interfaces.',
    deliverable: 'Production-Grade Software & Automated Webhooks',
    icon: Terminal,
    color: '#2F4FD2',
  },
  {
    num: '04',
    title: 'Deploy',
    headline: 'Launch, test and integrate into the real business environment.',
    desc: 'We stage the software on secure infrastructure, perform end-to-end stress testing with real company data, and conduct hands-on staff onboarding to guarantee frictionless adoption.',
    deliverable: 'Live Deployment, User Training & Zero Downtime Handoff',
    icon: Rocket,
    color: '#3B66F5',
  },
  {
    num: '05',
    title: 'Improve',
    headline: 'Monitor usage, fix issues and continuously improve the system.',
    desc: 'Software is a living operational asset. We provide continuous uptime monitoring, performance tuning, and iterate features as your order volume and business expand.',
    deliverable: 'Proactive SLA Support & Feature Scaling Iterations',
    icon: LineChart,
    color: '#2F4FD2',
  },
];

const ApproachSection = () => {
  const containerRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const totalSteps = steps.length;
      const mm = gsap.matchMedia();

      // Pinning on desktop screens for cinematic scroll feel
      mm.add("(min-width: 1024px)", () => {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top top',
          end: () => `+=${totalSteps * 380}`,
          pin: true,
          scrub: 0.4,
          anticipatePin: 1,
          onUpdate: (self) => {
            const index = Math.min(
              totalSteps - 1,
              Math.floor(self.progress * totalSteps)
            );
            setActiveStep(index);
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const current = steps[activeStep] || steps[0];
  const StepIcon = current.icon;

  return (
    <section
      ref={containerRef}
      id="approach"
      className="min-h-[100dvh] py-20 lg:py-0 w-full bg-[#111418] text-white flex items-center justify-center relative overflow-hidden select-none"
    >
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 grovix-grid-dark opacity-40 pointer-events-none" />

      {/* Dynamic Ambient Glow matching step color */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full blur-[160px] opacity-20 pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: current.color }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full relative z-10">
        {/* Section Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/10 pb-6 mb-12">
          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#2F4FD2] mb-3 block">
              / OUR APPROACH
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-heading">
              From business problem to working system.
            </h2>
          </div>

          <div className="mt-4 sm:mt-0 font-mono text-xs text-slate-400">
            PHASE <span className="text-white font-bold text-base">{current.num}</span> OF 05
          </div>
        </div>

        {/* Dynamic 2-Column Pinned Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Interactive Step Navigation List */}
          <div className="lg:col-span-5 space-y-3">
            {steps.map((s, idx) => {
              const isActive = activeStep === idx;
              return (
                <div
                  key={s.num}
                  onClick={() => setActiveStep(idx)}
                  className={`p-4 sm:p-5 rounded-2xl transition-all duration-300 cursor-pointer flex items-center justify-between border ${
                    isActive
                      ? 'bg-white/10 border-white/20 shadow-lg translate-x-2'
                      : 'bg-transparent border-transparent hover:bg-white/[0.03] text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`font-mono text-sm sm:text-base font-bold ${
                        isActive ? 'text-[#2F4FD2]' : 'text-slate-500'
                      }`}
                    >
                      {s.num}
                    </span>
                    <span className="text-base sm:text-lg font-bold font-heading text-white">
                      {s.title}
                    </span>
                  </div>

                  {isActive && (
                    <div
                      className="w-2.5 h-2.5 rounded-full animate-pulse"
                      style={{ backgroundColor: s.color }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Detailed Architectural Stage Card */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-[#0D1117]/85 backdrop-blur-xl border border-white/10 p-8 sm:p-10 shadow-2xl relative overflow-hidden transition-all duration-500 min-h-[380px] flex flex-col justify-between">
              
              {/* Step Top Bar */}
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-5 mb-6">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{
                        backgroundColor: `${current.color}20`,
                        border: `1.5px solid ${current.color}40`,
                      }}
                    >
                      <StepIcon className="w-6 h-6" style={{ color: current.color }} />
                    </div>
                    <div>
                      <div className="font-mono text-[11px] text-slate-400 uppercase tracking-widest">
                        PHASE {current.num} ARCHITECTURE
                      </div>
                      <div className="text-lg font-bold text-white font-heading">
                        {current.title}
                      </div>
                    </div>
                  </div>

                  <span
                    className="font-mono text-xs font-bold px-3 py-1 rounded-full uppercase"
                    style={{
                      backgroundColor: `${current.color}15`,
                      color: current.color,
                      border: `1px solid ${current.color}35`,
                    }}
                  >
                    IN PROGRESS
                  </span>
                </div>

                {/* Main Headline */}
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight leading-snug mb-4 font-heading">
                  {current.headline}
                </h3>

                {/* Description */}
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-body">
                  {current.desc}
                </p>
              </div>

              {/* Bottom Deliverable Guarantee */}
              <div className="pt-6 border-t border-white/10 mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-2 text-slate-200">
                  <CheckCircle className="w-4 h-4 text-[#2F4FD2]" />
                  <span>Deliverable: {current.deliverable}</span>
                </span>
                <span className="text-[11px] text-slate-400">
                  Scroll down to advance
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ApproachSection;
