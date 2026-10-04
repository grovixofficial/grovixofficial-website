import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { aiFeatures } from './landingData';

gsap.registerPlugin(ScrollTrigger);

const AIFeaturesSection = () => {
    const sectionRef = useRef(null);
    const cardRefs = useRef([]);
    const [flippedCards, setFlippedCards] = useState({});

    const toggleFlip = (idx) => {
        setFlippedCards(prev => ({ ...prev, [idx]: !prev[idx] }));
    };

    useEffect(() => {
        const ctx = gsap.context(() => {

            // Header entrance
            gsap.fromTo('.ai-title-block',
                { opacity: 0, y: 40 },
                {
                    opacity: 1, y: 0,
                    duration: 0.9,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 78%',
                        toggleActions: 'play reverse play reverse',
                    }
                }
            );

            // Stagger entrance of cards
            cardRefs.current.forEach((card, i) => {
                if (!card) return;

                gsap.fromTo(card,
                    { opacity: 0, y: 35 },
                    {
                        opacity: 1, y: 0,
                        duration: 0.7,
                        ease: 'power3.out',
                        delay: (i % 3) * 0.12,
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 82%',
                            toggleActions: 'play reverse play reverse',
                        },
                    }
                );
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 bg-[#07101E] text-white relative overflow-hidden" id="ai-features">

            <style>{`
                .flip-card {
                    perspective: 1200px;
                }
                .flip-inner {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
                    transform-style: preserve-3d;
                }
                .flip-card.is-flipped .flip-inner {
                    transform: rotateY(180deg);
                }
                .flip-front,
                .flip-back {
                    position: absolute;
                    inset: 0;
                    backface-visibility: hidden;
                    -webkit-backface-visibility: hidden;
                    border-radius: 24px;
                }
                .flip-back {
                    transform: rotateY(180deg);
                }

                @keyframes laserScanVertical {
                    0% { top: 0%; opacity: 0.2; }
                    50% { opacity: 1; }
                    100% { top: 96%; opacity: 0.2; }
                }
                .ocr-laser-beam {
                    position: absolute;
                    left: 0;
                    right: 0;
                    height: 2px;
                    background: linear-gradient(90deg, transparent, #00B67A, #34D399, #00B67A, transparent);
                    box-shadow: 0 0 12px #00B67A;
                    animation: laserScanVertical 2.4s ease-in-out infinite;
                }
            `}</style>

            {/* Background Multi-Color Aurora */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-[#8B5CF6]/12 rounded-full blur-[140px] translate-x-1/3 -translate-y-1/3" />
                <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-[#00B67A]/8 rounded-full blur-[130px]" />
                <div className="absolute bottom-0 left-0 w-[550px] h-[550px] bg-[#06B6D4]/10 rounded-full blur-[140px] -translate-x-1/3 translate-y-1/3" />
                <div
                    className="absolute inset-0 opacity-[0.035]"
                    style={{
                        backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                        backgroundSize: '32px 32px',
                    }}
                />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* Header */}
                <div className="ai-title-block text-center mb-16" style={{ opacity: 0 }}>
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#8B5CF6]/15 via-[#06B6D4]/15 to-[#00B67A]/15 border border-[#8B5CF6]/30 text-white text-xs font-bold uppercase tracking-widest mb-4 shadow-xs">
                        <span className="material-symbols-outlined text-[14px] text-[#A78BFA]">auto_awesome</span>
                        Practical AI for Business Workflows
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 tracking-tight font-heading">
                        AI Automation &amp;{' '}
                        <span className="text-gradient-aurora">
                            Smart Workflows
                        </span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg font-medium leading-relaxed">
                        Automate repetitive manual entries with document OCR, intelligent WhatsApp query bots, and proactive operational alerts.
                    </p>
                </div>

                {/* 3D Flip Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {aiFeatures.map((feature, idx) => {
                        const isFlipped = !!flippedCards[idx];
                        const isOcrCard = idx === 0;

                        return (
                            <div
                                key={idx}
                                ref={el => cardRefs.current[idx] = el}
                                className={`flip-card ${isFlipped ? 'is-flipped' : ''}`}
                                style={{ minHeight: '300px' }}
                            >
                                <div className="flip-inner h-full">

                                    {/* ── FRONT FACE ── */}
                                    <div
                                        onClick={() => toggleFlip(idx)}
                                        className="flip-front flex flex-col justify-between p-7 group cursor-pointer transition-all duration-300 border hover:border-white/20 bg-white/[0.04] backdrop-blur-xl"
                                        style={{
                                            borderColor: 'rgba(255,255,255,0.08)',
                                            boxShadow: `0 8px 32px ${feature.color}10`,
                                        }}
                                    >
                                        {/* Hover spotlight glow */}
                                        <div
                                            className="absolute inset-0 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                            style={{ background: `radial-gradient(circle at 50% 0%, ${feature.color}20, transparent 70%)` }}
                                        />

                                        <div>
                                            {/* Top row */}
                                            <div className="flex items-start justify-between mb-5">
                                                <div
                                                    className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                                                    style={{
                                                        background: `${feature.color}18`,
                                                        border: `1.5px solid ${feature.color}35`,
                                                    }}
                                                >
                                                    <span className="material-symbols-outlined text-[24px]" style={{ color: feature.color }}>
                                                        {feature.icon}
                                                    </span>
                                                </div>

                                                {/* Stat badge */}
                                                <div
                                                    className="text-right px-3 py-1.5 rounded-xl"
                                                    style={{ background: `${feature.color}15`, border: `1px solid ${feature.color}25` }}
                                                >
                                                    <div className="text-base font-black leading-none" style={{ color: feature.color }}>{feature.stat}</div>
                                                    <div className="text-[10px] text-gray-400 font-medium mt-0.5">{feature.statLabel}</div>
                                                </div>
                                            </div>

                                            {/* Title */}
                                            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#00B67A] transition-colors">{feature.title}</h3>

                                            {/* Desc */}
                                            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-4">{feature.desc}</p>

                                            {/* Special Animated Miniature Visual for OCR Card */}
                                            {isOcrCard && (
                                                <div className="relative mt-2 p-2.5 rounded-xl bg-gray-950/60 border border-[#00B67A]/30 overflow-hidden font-mono text-[10px]">
                                                    <div className="ocr-laser-beam"></div>
                                                    <div className="flex justify-between text-gray-400 mb-1">
                                                        <span>DOCUMENT: INV_9042.PDF</span>
                                                        <span className="text-[#00B67A] font-bold">OCR: 99.4%</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5 text-gray-300">
                                                        <span className="text-[#00B67A]">✓</span> GSTIN &amp; 14 items parsed to ERP
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-4">
                                            <span className="text-[11px] font-mono text-gray-400">
                                                Click to view verification
                                            </span>
                                            <span className="material-symbols-outlined text-[16px] text-gray-400 group-hover:translate-x-1 transition-transform">
                                                sync
                                            </span>
                                        </div>
                                    </div>

                                    {/* ── BACK FACE ── */}
                                    <div
                                        onClick={() => toggleFlip(idx)}
                                        className="flip-back flex flex-col items-center justify-center gap-4 p-7 cursor-pointer border"
                                        style={{
                                            background: `linear-gradient(135deg, #07101E 0%, #0B192C 60%, ${feature.color}15 100%)`,
                                            borderColor: `${feature.color}40`,
                                            boxShadow: `inset 0 0 40px ${feature.color}15, 0 8px 32px ${feature.color}20`,
                                        }}
                                    >
                                        <div
                                            className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
                                            style={{
                                                background: `${feature.color}20`,
                                                border: `2px solid ${feature.color}50`,
                                            }}
                                        >
                                            <span className="material-symbols-outlined text-[36px]" style={{ color: feature.color }}>
                                                {feature.backIcon}
                                            </span>
                                        </div>

                                        <div className="text-center">
                                            <div className="text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: feature.color }}>
                                                {feature.backLabel}
                                            </div>
                                            <div className="text-white font-bold text-base mb-2">{feature.title}</div>
                                            <p className="text-gray-300 text-xs leading-relaxed max-w-xs">
                                                Configured specifically to your company's data formats with human-in-the-loop review safeguards.
                                            </p>
                                        </div>

                                        <span className="text-[11px] font-medium text-gray-400 hover:text-white mt-1">
                                            Click to flip back ↺
                                        </span>
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

export default AIFeaturesSection;
