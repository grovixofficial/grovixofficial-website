import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
    {
        num: '01',
        title: 'Discover',
        heading: 'Deep Bottleneck & Workflow Audit',
        desc: 'You show us your manual daily headaches—repetitive Excel copy-pasting, chaotic WhatsApp order threads, paper slips, or disconnected accounting. We analyze the root causes and quantify the hours lost.',
        timeframe: 'Days 1 – 3',
        deliverable: 'Comprehensive Workflow Bottleneck Audit',
        icon: 'search',
        metric: '10+ Hours/Wk',
        metricLabel: 'Identified manual friction to automate',
        details: [
            'Shadowing your ground team and office coordinators',
            'Pinpointing redundant double-entry bottlenecks',
            'Evaluating existing Tally, SAP, and spreadsheet data',
            'Defining clear, measurable automation ROI benchmarks'
        ]
    },
    {
        num: '02',
        title: 'Plan',
        heading: 'Architecture & Integration Blueprint',
        desc: 'We map out your data flows, API connections, role-based controls, and database schemas before writing code. We ensure the new automations fit your exact team workflow—never the other way around.',
        timeframe: 'Days 4 – 7',
        deliverable: 'System Architecture & Schema Blueprint',
        icon: 'account_tree',
        metric: '100% Fit',
        metricLabel: 'Adapts to your tools—no rip & replace',
        details: [
            'Trigger & webhook event logic mapping',
            'Data synchronization models between accounts & sales',
            'WhatsApp Business API webhook structure',
            'Role-based permission & security controls'
        ]
    },
    {
        num: '03',
        title: 'Build',
        heading: 'Modular Automation & Custom Engineering',
        desc: 'Our engineers build your custom WhatsApp triggers, AI document OCR pipelines, and bespoke ERP/CRM modules with weekly progress demos so you see working software immediately.',
        timeframe: 'Weeks 2 – 3',
        deliverable: 'Tested Automation Engine & Tailored Portals',
        icon: 'code',
        metric: '2 - 3 Weeks',
        metricLabel: 'Rapid modular delivery cycle',
        details: [
            'Custom AI document parser & bill OCR pipelines',
            'Official WhatsApp Business API integration',
            'Bespoke ERP / CRM screens designed for non-tech staff',
            'Rigorous end-to-end integration testing'
        ]
    },
    {
        num: '04',
        title: 'Deploy',
        heading: 'Phased Zero-Disruption Rollout',
        desc: 'We launch your system alongside existing operations without disrupting business hours. We run simple, hands-on onboarding sessions so your ground staff and managers adopt it comfortably on day one.',
        timeframe: 'Week 4',
        deliverable: 'Production Deployment & Team Training',
        icon: 'rocket_launch',
        metric: 'Zero Downtime',
        metricLabel: 'Smooth transition while operations continue',
        details: [
            'Parallel testing with live production orders & invoices',
            'Intuitive, jargon-free video & on-site staff guides',
            'Instant fallbacks & automated transaction audits',
            '1-Click executive dashboard activation'
        ]
    },
    {
        num: '05',
        title: 'Support',
        heading: 'Direct Engineering Partnership & Scaling',
        desc: 'You work directly with the developers who engineered your system, not disconnected support desks. We monitor system health, implement new workflow requests, and scale capacity as your business grows.',
        timeframe: 'Ongoing Partnership',
        deliverable: 'Continuous Optimization & Priority SLA',
        icon: 'support_agent',
        metric: '< 15 Mins',
        metricLabel: 'Direct engineer response window',
        details: [
            'Direct WhatsApp / Slack engineering support channel',
            'Automated daily database backups & cloud maintenance',
            'Regular workflow enhancements as business expands',
            'Proactive performance & exception monitoring'
        ]
    }
];

const StickyProcessSection = () => {
    const [activeStep, setActiveStep] = useState(0);
    const containerRef = useRef(null);

    // Scroll-driven active step observer
    useEffect(() => {
        const handleScroll = () => {
            const container = containerRef.current;
            if (!container) return;

            const rect = container.getBoundingClientRect();
            const totalHeight = rect.height - window.innerHeight;
            
            // Only update when inside container view
            if (rect.top <= 100 && rect.bottom >= window.innerHeight * 0.5) {
                const scrolled = Math.max(0, -rect.top);
                const progress = Math.min(0.999, scrolled / Math.max(1, totalHeight));
                const stepIndex = Math.floor(progress * steps.length);
                setActiveStep(stepIndex);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const current = steps[activeStep] || steps[0];

    return (
        <section 
            ref={containerRef} 
            id="process" 
            className="relative bg-[#F8FAFC] border-y border-gray-200/80"
            style={{ minHeight: '320vh' }}
        >
            {/* Architectural Grid pattern */}
            <div className="absolute inset-0 grovix-grid-bg opacity-50 pointer-events-none"></div>

            {/* Pinned / Sticky Viewport Container */}
            <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden py-12 px-4 sm:px-6">
                <div className="w-full max-w-7xl mx-auto">
                    
                    <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                        
                        {/* ── Left Column: Sticky Narrative & Step Indicators ── */}
                        <div className="lg:col-span-5 space-y-6">
                            
                            {/* Eyebrow Badge */}
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F7F0] border border-[#00B67A]/30 text-[#0B192C] text-xs font-bold uppercase tracking-widest shadow-xs">
                                <span className="w-2 h-2 rounded-full bg-[#00B67A]"></span>
                                <span>Our Approach • 5-Step Process</span>
                            </div>

                            {/* Section Heading */}
                            <div>
                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B192C] tracking-tight leading-[1.12]">
                                    How We Turn Chaos Into{' '}
                                    <span className="text-[#00B67A]">
                                        Automated Flow
                                    </span>
                                </h2>
                                <div className="w-14 h-1 bg-[#00B67A] rounded-full mt-3"></div>
                            </div>

                            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                                A disciplined, engineering-first methodology that delivers working automations in weeks without disrupting your day-to-day business.
                            </p>

                            {/* Giant Active Step Number Display (Sadewa signature pattern) */}
                            <div className="pt-2 flex items-baseline gap-3">
                                <div className="text-5xl sm:text-6xl font-black text-[#0B192C] tracking-tight font-mono">
                                    /{current.num}
                                </div>
                                <div className="text-base sm:text-lg font-bold text-[#00B67A]">
                                    {current.title} Phase
                                </div>
                                <div className="ml-auto text-xs font-semibold text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200 shadow-xs">
                                    {current.timeframe}
                                </div>
                            </div>

                            {/* Step Progress Bar Track */}
                            <div className="w-full bg-gray-200/80 h-1.5 rounded-full overflow-hidden">
                                <motion.div 
                                    className="h-full bg-[#00B67A]"
                                    animate={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                                    transition={{ duration: 0.35, ease: "easeOut" }}
                                />
                            </div>

                            {/* Clickable Step Pills */}
                            <div className="flex flex-wrap gap-2 pt-2">
                                {steps.map((st, i) => {
                                    const isActive = activeStep === i;
                                    return (
                                        <button
                                            key={i}
                                            type="button"
                                            onClick={() => {
                                                setActiveStep(i);
                                                const container = containerRef.current;
                                                if (container) {
                                                    const top = container.offsetTop;
                                                    const height = container.offsetHeight - window.innerHeight;
                                                    const targetScroll = top + (height * (i / (steps.length - 1)));
                                                    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
                                                }
                                            }}
                                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
                                                isActive
                                                    ? 'bg-[#0B192C] text-white border-[#0B192C] shadow-md scale-105'
                                                    : 'bg-white/90 text-gray-600 border-gray-200/90 hover:border-[#00B67A]/40 hover:text-[#0B192C]'
                                            }`}
                                        >
                                            <span className={isActive ? 'text-[#00B67A]' : 'text-gray-400'}>
                                                {st.num}
                                            </span>
                                            <span>{st.title}</span>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Bottom note */}
                            <div className="pt-2 flex items-center gap-2 text-xs text-gray-500 font-medium">
                                <span className="material-symbols-outlined text-[16px] text-[#00B67A]">sync</span>
                                <span>Scroll to step through each operational phase</span>
                            </div>

                        </div>

                        {/* ── Right Column: Dynamic Transition Card ── */}
                        <div className="lg:col-span-7">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeStep}
                                    initial={{ opacity: 0, y: 20, scale: 0.98 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -20, scale: 0.98 }}
                                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                    className="bg-white rounded-3xl p-7 sm:p-9 shadow-xl border border-gray-200/90 relative overflow-hidden"
                                >
                                    {/* Architectural watermark curve */}
                                    <div className="absolute top-0 right-0 w-56 h-56 rounded-full border border-gray-100/80 -mr-20 -mt-20 pointer-events-none"></div>
                                    
                                    {/* Top Row with Icon, Number and Metric */}
                                    <div className="flex items-start justify-between gap-4 mb-6 relative z-10">
                                        <div className="flex items-center gap-3.5">
                                            <div className="w-13 h-13 rounded-2xl bg-[#E6F7F0] border border-[#00B67A]/30 flex items-center justify-center text-[#00B67A] shadow-sm p-3">
                                                <span className="material-symbols-outlined text-[28px]">
                                                    {current.icon}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#00B67A] block">
                                                    PHASE {current.num}
                                                </span>
                                                <h3 className="text-xl sm:text-2xl font-black text-[#0B192C]">
                                                    {current.heading}
                                                </h3>
                                            </div>
                                        </div>

                                        {/* Metric Badge */}
                                        <div className="bg-[#F8FAFC] border border-gray-200/80 rounded-2xl p-3 text-right hidden sm:block shrink-0 shadow-xs">
                                            <div className="text-lg font-black text-[#00B67A] leading-none">
                                                {current.metric}
                                            </div>
                                            <div className="text-[10px] text-gray-500 font-semibold mt-1 max-w-[130px]">
                                                {current.metricLabel}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Paragraph Description */}
                                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6 font-normal relative z-10">
                                        {current.desc}
                                    </p>

                                    {/* Deliverable Pill Chip */}
                                    <div className="mb-6 p-3 rounded-2xl bg-[#E6F7F0]/60 border border-[#00B67A]/25 flex items-center gap-2.5 relative z-10">
                                        <span className="w-2 h-2 rounded-full bg-[#00B67A]"></span>
                                        <span className="text-xs font-bold text-[#0B192C]">
                                            Deliverable:
                                        </span>
                                        <span className="text-xs font-medium text-gray-700 truncate">
                                            {current.deliverable}
                                        </span>
                                    </div>

                                    {/* Checklist Details */}
                                    <div className="grid sm:grid-cols-2 gap-3 mb-6 relative z-10">
                                        {current.details.map((detail, idx) => (
                                            <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-700 bg-gray-50/70 p-3 rounded-xl border border-gray-100 font-medium">
                                                <span className="material-symbols-outlined text-[16px] text-[#00B67A] shrink-0 mt-0.5">
                                                    check_circle
                                                </span>
                                                <span>{detail}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Footer strip of the card */}
                                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between relative z-10">
                                        <div className="text-xs font-semibold text-gray-500 flex items-center gap-1.5">
                                            <span className="material-symbols-outlined text-[15px] text-[#00B67A]">schedule</span>
                                            <span>Timeline: {current.timeframe}</span>
                                        </div>
                                        <a 
                                            href="#cta"
                                            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B192C] hover:text-[#00B67A] transition-colors"
                                        >
                                            <span>Start with Phase 01</span>
                                            <span className="material-symbols-outlined text-[15px] text-[#00B67A]">arrow_forward</span>
                                        </a>
                                    </div>

                                </motion.div>
                            </AnimatePresence>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
};

export default StickyProcessSection;
