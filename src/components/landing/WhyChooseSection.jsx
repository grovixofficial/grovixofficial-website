import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { reasons } from './landingData';

gsap.registerPlugin(ScrollTrigger);

const WhyChooseSection = () => {
    const sectionRef = useRef(null);
    const spotlightRef = useRef(null);
    const cardRefs = useRef([]);
    const titleRef = useRef(null);
    const [mousePos, setMousePos] = useState({ x: -9999, y: -9999 });
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = (e) => {
        const rect = sectionRef.current?.getBoundingClientRect();
        if (!rect) return;
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => {
        setIsHovering(false);
        setMousePos({ x: -9999, y: -9999 });
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                titleRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1, y: 0,
                    duration: 0.9, ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                        toggleActions: 'play none none none',
                    },
                }
            );

            gsap.fromTo(
                cardRefs.current.filter(Boolean),
                { opacity: 0, y: 50, scale: 0.94 },
                {
                    opacity: 1, y: 0, scale: 1,
                    duration: 0.55,
                    stagger: 0.08,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 68%',
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
            id="whyus"
            className="relative py-28 overflow-hidden select-none"
            style={{ background: '#07101E', cursor: 'none' }}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <style>{`
                #whyus * { cursor: none !important; }

                #whyus::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background-image: radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px);
                    background-size: 28px 28px;
                    pointer-events: none;
                    z-index: 0;
                }

                @keyframes cursor-pulse {
                    0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
                    50%       { transform: translate(-50%, -50%) scale(1.15); opacity: 0.8; }
                }
                .torch-cursor {
                    animation: cursor-pulse 2s ease-in-out infinite;
                }

                @keyframes card-border-glow {
                    0%, 100% { border-color: rgba(255,255,255,0.06); }
                    50%       { border-color: rgba(0, 182, 122, 0.2); }
                }
                .why-card {
                    animation: card-border-glow 3s ease-in-out infinite;
                }
            `}</style>

            {/* ── Spotlight Layer ── */}
            <div
                ref={spotlightRef}
                className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300"
                style={{
                    background: `radial-gradient(
                        circle 340px at ${mousePos.x}px ${mousePos.y}px,
                        rgba(0, 182, 122, 0.12) 0%,
                        rgba(11, 25, 44, 0.08) 40%,
                        transparent 70%
                    )`,
                    opacity: isHovering ? 1 : 0,
                }}
            />

            {/* ── Torch cursor dot ── */}
            {isHovering && (
                <div
                    className="torch-cursor absolute pointer-events-none z-50 rounded-full border border-[#00B67A]/50"
                    style={{
                        width: '44px',
                        height: '44px',
                        left: `${mousePos.x}px`,
                        top: `${mousePos.y}px`,
                        transform: 'translate(-50%, -50%)',
                        background: 'radial-gradient(circle, rgba(0,182,122,0.25) 0%, transparent 70%)',
                        boxShadow: '0 0 24px rgba(0,182,122,0.4), 0 0 48px rgba(0,182,122,0.15)',
                        backdropFilter: 'blur(0px)',
                    }}
                >
                    <div
                        className="absolute inset-0 m-auto rounded-full shadow-[0_0_8px_#00B67A]"
                        style={{ width: '6px', height: '6px', background: '#00B67A' }}
                    />
                </div>
            )}

            {/* ── Content ── */}
            <div className="relative z-20 max-w-7xl mx-auto px-6">

                {/* Header */}
                <div
                    ref={titleRef}
                    className="text-center mb-20"
                    style={{ opacity: 0 }}
                >
                    <span className="inline-flex items-center gap-2 bg-[#00B67A]/10 border border-[#00B67A]/25 text-[#00B67A] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
                        <span className="material-symbols-outlined text-[14px]">emoji_objects</span>
                        Why Grovix
                    </span>
                    <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-5 font-heading">
                        Why Growing Businesses Choose{' '}
                        <span className="text-gradient-tech relative inline-block">
                            Grovix
                            <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-gradient-to-r from-[#00B67A] via-[#06B6D4] to-[#6366F1] rounded-full"></span>
                        </span>
                    </h2>
                    <p className="text-slate-400 max-w-xl mx-auto text-lg font-medium">
                        Move your cursor around — discover how workflow-first software and practical automations eliminate manual friction for SMEs.
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {reasons.map((reason, idx) => (
                        <ReasonCard
                            key={idx}
                            reason={reason}
                            idx={idx}
                            mousePos={mousePos}
                            sectionRef={sectionRef}
                            cardRef={el => cardRefs.current[idx] = el}
                        />
                    ))}
                </div>

                {/* Bottom CTA strip */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.7 }}
                    className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 border-t border-white/10 pt-12"
                >
                    <div className="flex items-center gap-2 text-slate-300 font-semibold text-sm">
                        <span className="material-symbols-outlined text-[20px] text-[#00B67A]">verified</span>
                        <span>Modular software &amp; automation engineered for how you actually operate</span>
                    </div>
                    <a href="#cta" className="px-6 py-3 bg-[#00B67A] hover:bg-[#009e69] text-white text-sm font-bold rounded-xl transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-[#00B67A]/30 flex items-center gap-2">
                        Talk to an Automation Engineer
                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

const ReasonCard = ({ reason, idx, mousePos, sectionRef, cardRef }) => {
    const innerRef = useRef(null);
    const [glowPos, setGlowPos] = useState({ x: 50, y: 50, opacity: 0 });

    useEffect(() => {
        const card = innerRef.current;
        const section = sectionRef.current;
        if (!card || !section) return;

        const cardRect = card.getBoundingClientRect();
        const sectionRect = section.getBoundingClientRect();

        const cardCenterX = cardRect.left - sectionRect.left + cardRect.width / 2;
        const cardCenterY = cardRect.top - sectionRect.top + cardRect.height / 2;

        const dist = Math.sqrt(
            Math.pow(mousePos.x - cardCenterX, 2) +
            Math.pow(mousePos.y - cardCenterY, 2)
        );

        const maxDist = 280;
        const proximity = Math.max(0, 1 - dist / maxDist);

        if (proximity > 0) {
            const relX = ((mousePos.x - (cardRect.left - sectionRect.left)) / cardRect.width) * 100;
            const relY = ((mousePos.y - (cardRect.top - sectionRect.top)) / cardRect.height) * 100;
            setGlowPos({ x: relX, y: relY, opacity: proximity });
        } else {
            setGlowPos(prev => ({ ...prev, opacity: 0 }));
        }
    }, [mousePos, sectionRef]);

    return (
        <div
            ref={el => {
                innerRef.current = el;
                if (cardRef) cardRef(el);
            }}
            className="why-card group relative rounded-2xl p-6 overflow-hidden flex flex-col gap-4"
            style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
                opacity: 0,
                transition: 'box-shadow 0.3s ease',
                boxShadow: glowPos.opacity > 0
                    ? `0 0 40px ${reason.color}${Math.round(glowPos.opacity * 25).toString(16).padStart(2, '0')}`
                    : 'none',
            }}
        >
            <div
                className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-200"
                style={{
                    background: `radial-gradient(circle 120px at ${glowPos.x}% ${glowPos.y}%, ${reason.color}22, transparent 70%)`,
                    opacity: glowPos.opacity,
                }}
            />

            <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                    background: `radial-gradient(circle 80px at ${glowPos.x}% ${glowPos.y}%, ${reason.color}40, transparent 60%)`,
                    opacity: glowPos.opacity * 0.6,
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                    padding: '1px',
                }}
            />

            <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-6deg]"
                style={{
                    background: `${reason.color}18`,
                    border: `1px solid ${reason.color}30`,
                    boxShadow: `0 4px 16px ${reason.color}20`,
                }}
            >
                <span
                    className="material-symbols-outlined text-[22px]"
                    style={{ color: reason.color }}
                >
                    {reason.icon}
                </span>
            </div>

            <div>
                <h3 className="text-white font-bold text-base mb-2 leading-snug">
                    {reason.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                    {reason.desc}
                </p>
            </div>

            <div
                className="absolute bottom-4 right-5 text-4xl font-black opacity-[0.04] select-none pointer-events-none"
                style={{ color: reason.color }}
            >
                {String(idx + 1).padStart(2, '0')}
            </div>
        </div>
    );
};

export default WhyChooseSection;
