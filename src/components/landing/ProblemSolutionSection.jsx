import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { rows } from './landingData';

gsap.registerPlugin(ScrollTrigger);

const ProblemSolutionSection = () => {
    const sectionRef = useRef(null);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header
            gsap.fromTo('.ps-header',
                { opacity: 0, y: 35 },
                {
                    opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 78%',
                        toggleActions: 'play none none none',
                    },
                }
            );

            // Column headers
            gsap.fromTo('.ps-col-header',
                { opacity: 0, y: 20 },
                {
                    opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
                    stagger: 0.15,
                    delay: 0.2,
                    scrollTrigger: {
                        trigger: '.ps-col-header',
                        start: 'top 85%',
                        toggleActions: 'play none none none',
                    },
                }
            );

            // Each row — problem cell then solution cell
            const rowEls = gsap.utils.toArray('.ps-row');
            rowEls.forEach((row, i) => {
                const problemCell = row.querySelector('.ps-problem');
                const arrowEl    = row.querySelector('.ps-arrow');
                const solutionCell = row.querySelector('.ps-solution');

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: row,
                        start: 'top 84%',
                        toggleActions: 'play none none none',
                    },
                });

                // Problem cell slides in from left
                tl.fromTo(problemCell,
                    { opacity: 0, x: -28, scale: 0.98 },
                    { opacity: 1, x: 0, scale: 1, duration: 0.45, ease: 'power2.out' }
                )
                // Arrow pulse
                .fromTo(arrowEl,
                    { opacity: 0, scale: 0.5 },
                    { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(2)' },
                    '-=0.15'
                )
                // Solution cell slides in from right
                .fromTo(solutionCell,
                    { opacity: 0, x: 28, scale: 0.98 },
                    { opacity: 1, x: 0, scale: 1, duration: 0.45, ease: 'power2.out' },
                    '-=0.2'
                )
                // Green cell glow flash
                .fromTo(solutionCell,
                    { boxShadow: '0 0 0 0 rgba(16,185,129,0)' },
                    { boxShadow: '0 0 28px 4px rgba(16,185,129,0.18)', duration: 0.4, ease: 'power2.out', yoyo: true, repeat: 1 },
                    '-=0.1'
                );
            });

            // Bottom CTA strip
            gsap.fromTo('.ps-cta',
                { opacity: 0, y: 24 },
                {
                    opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.ps-cta',
                        start: 'top 88%',
                        toggleActions: 'play none none none',
                    },
                }
            );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const solutionBadges = [
        'Instant Auto-Sync',
        '24/7 Automated',
        'Tailored Architecture',
        'Zero Data Silos',
        '1-Click Instant',
        'Adopted on Day 1'
    ];

    return (
        <section ref={sectionRef} className="relative z-10 py-28 overflow-hidden" id="comparison">

            <style>{`
                .ps-problem, .ps-solution, .ps-arrow { opacity: 0; }
                .ps-header { opacity: 0; }
                .ps-col-header { opacity: 0; }
                .ps-cta { opacity: 0; }

                .ps-problem-cell {
                    background: rgba(255, 245, 245, 0.9);
                    border: 1.5px solid rgba(239, 68, 68, 0.18);
                    backdrop-filter: blur(10px);
                    transition: all 0.3s ease;
                }
                .ps-problem-cell:hover {
                    border-color: rgba(239, 68, 68, 0.4);
                    background: rgba(255, 240, 240, 0.98);
                }
                .ps-solution-cell {
                    background: rgba(240, 253, 244, 0.9);
                    border: 1.5px solid rgba(16, 185, 129, 0.2);
                    backdrop-filter: blur(10px);
                    transition: all 0.3s ease;
                }
                .ps-solution-cell:hover {
                    border-color: rgba(16, 185, 129, 0.45);
                    box-shadow: 0 8px 30px rgba(16,185,129,0.15);
                }

                @keyframes laserSlice {
                    0% {
                        width: 0%;
                        box-shadow: 0 0 0px #ef4444;
                    }
                    50% {
                        box-shadow: 0 0 10px #ef4444;
                    }
                    100% {
                        width: 100%;
                        box-shadow: 0 0 3px #ef4444;
                    }
                }
                .laser-strike {
                    position: absolute;
                    top: 50%;
                    left: 0;
                    height: 2px;
                    background: linear-gradient(90deg, #ef4444, #f87171);
                    animation: laserSlice 0.5s ease-out forwards;
                    animation-delay: 0.4s;
                    width: 0;
                    border-radius: 9999px;
                }
            `}</style>

            {/* Header */}
            <div className="ps-header max-w-7xl mx-auto px-6 text-center mb-16">
                <span className="inline-flex items-center gap-2 bg-[#E6F7F0] border border-[#00B67A]/30 text-[#0B192C] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6 shadow-xs">
                    <span className="material-symbols-outlined text-[14px] text-[#00B67A]">compare_arrows</span>
                    Manual Operations vs The Grovix Way
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B192C] tracking-tight leading-tight mb-4 font-heading">
                    Tired of Repetitive Chaos?{' '}
                    <span className="text-[#00B67A]">
                        We Automate the Right Way.
                    </span>
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg font-medium leading-relaxed">
                    Generic software forces you to adapt to rigid menus, while manual tools create human error. Grovix connects systems and builds automations around how your business actually runs.
                </p>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6">

                {/* Column headers (Desktop only) */}
                <div className="hidden md:grid grid-cols-[1fr_48px_1fr] gap-4 mb-4 px-1">
                    <div className="ps-col-header flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-red-50/80 border border-red-200/60 shadow-sm">
                        <span className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-black flex-shrink-0">✕</span>
                        <span className="text-red-700 font-bold text-xs uppercase tracking-wider">Manual &amp; Disconnected Tools</span>
                    </div>
                    <div className="flex items-center justify-center">
                        <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">FLOW</span>
                    </div>
                    <div className="ps-col-header flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-[#E6F7F0] border border-[#00B67A]/30 shadow-sm">
                        <span className="w-5 h-5 rounded-full bg-[#00B67A] flex items-center justify-center text-white text-xs font-black flex-shrink-0">✓</span>
                        <span className="text-[#0B192C] font-bold text-xs uppercase tracking-wider">Grovix Connected Automation</span>
                    </div>
                </div>

                {/* Rows */}
                <div className="flex flex-col gap-3 sm:gap-4">
                    {rows.map((row, i) => {
                        const isHovered = hoveredIndex === i;
                        return (
                            <div 
                                key={i} 
                                className="ps-row grid grid-cols-1 md:grid-cols-[1fr_48px_1fr] gap-2.5 sm:gap-4 items-center"
                                onMouseEnter={() => setHoveredIndex(i)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >

                                {/* ── Problem Cell ── */}
                                <div className="ps-problem">
                                    <div className={`ps-problem-cell rounded-2xl p-4 sm:p-5 flex items-center gap-3.5 ${
                                        isHovered ? 'ring-2 ring-red-400/20 shadow-md' : ''
                                    }`}>
                                        <div className="w-8 h-8 rounded-full bg-red-100 border border-red-200 flex items-center justify-center flex-shrink-0">
                                            <span className="text-red-500 font-black text-xs leading-none">✕</span>
                                        </div>
                                        <div className="flex items-center gap-2.5 min-w-0 flex-1">
                                            <span
                                                className="material-symbols-outlined text-[19px] flex-shrink-0 text-red-500 opacity-70"
                                            >
                                                {row.problem.icon}
                                            </span>
                                            <span className="relative text-gray-600 text-xs sm:text-sm font-medium leading-snug">
                                                {row.problem.text}
                                                <span className="laser-strike" />
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* ── Arrow / Connector ── */}
                                <div className="ps-arrow flex items-center justify-center my-0.5 md:my-0">
                                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border shadow-sm flex items-center justify-center transition-all duration-300 ${
                                        isHovered 
                                            ? 'border-[#00B67A] text-[#00B67A] bg-[#E6F7F0] scale-110 shadow-sm' 
                                            : 'border-gray-200 text-gray-400 bg-white'
                                    }`}>
                                        <span className="material-symbols-outlined text-[18px] md:rotate-0 rotate-90">
                                            arrow_forward
                                        </span>
                                    </div>
                                </div>

                                {/* ── Solution Cell ── */}
                                <div className="ps-solution">
                                    <div className={`ps-solution-cell rounded-2xl p-4 sm:p-5 flex items-center gap-3.5 relative overflow-hidden ${
                                        isHovered ? 'ring-2 ring-[#00B67A]/30 shadow-lg scale-[1.01]' : ''
                                    }`}>
                                        <div
                                            className="w-8 h-8 rounded-full bg-[#00B67A] flex items-center justify-center flex-shrink-0 shadow-md shadow-[#00B67A]/25"
                                        >
                                            <span className="text-white font-black text-xs leading-none">✓</span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2.5">
                                                <span
                                                    className="material-symbols-outlined text-[19px] flex-shrink-0 text-[#00B67A]"
                                                >
                                                    {row.solution.icon}
                                                </span>
                                                <span className="text-gray-900 text-xs sm:text-sm font-bold leading-snug">
                                                    {row.solution.text}
                                                </span>
                                            </div>
                                            <div className="mt-1 ml-7">
                                                <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-[#0B192C] bg-[#E6F7F0] border border-[#00B67A]/30 px-2 py-0.5 rounded-full">
                                                    {solutionBadges[i] || 'Automated Flow'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        );
                    })}
                </div>

                {/* Bottom CTA strip */}
                <div className="ps-cta mt-12 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl"
                    style={{
                        background: 'linear-gradient(135deg, #FFFFFF 0%, #E6F7F0 100%)',
                        border: '1.5px solid rgba(0, 182, 122, 0.25)',
                    }}
                >
                    <div className="text-center md:text-left">
                        <div className="text-[#0B192C] font-extrabold text-lg sm:text-xl mb-1.5">
                            Identify your primary operational bottleneck in 30 minutes
                        </div>
                        <div className="text-gray-600 text-xs sm:text-sm font-medium max-w-xl">
                            Talk directly with our automation engineers to review your existing workflow and pinpoint immediate time-saving opportunities.
                        </div>
                    </div>
                    <a
                        href="#cta"
                        className="flex-shrink-0 px-8 py-4 bg-[#0B192C] hover:bg-[#07101E] text-white font-bold text-xs sm:text-sm rounded-2xl transition-all duration-200 hover:-translate-y-0.5 shadow-lg flex items-center gap-2 group w-full md:w-auto justify-center border border-[#0B192C]"
                    >
                        <span>Schedule Free Workflow Review</span>
                        <span className="material-symbols-outlined text-[16px] text-[#00B67A] transition-transform group-hover:translate-x-1">arrow_forward</span>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default ProblemSolutionSection;
