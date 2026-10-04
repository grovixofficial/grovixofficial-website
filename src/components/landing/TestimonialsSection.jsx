import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { testimonials } from './landingData';

gsap.registerPlugin(ScrollTrigger);

const StarRating = ({ count, color }) => (
    <div className="flex gap-0.5">
        {Array.from({ length: count }).map((_, i) => (
            <span key={i} className="material-symbols-outlined text-[18px]" style={{ color }}>
                star
            </span>
        ))}
    </div>
);

const TestimonialsSection = () => {
    const sectionRef = useRef(null);
    const pinWrapRef = useRef(null);
    const stackRef = useRef(null);
    const progressRef = useRef(null);
    const [activeIdx, setActiveIdx] = useState(0);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray('.t-card');
            const total = cards.length;

            gsap.fromTo('.t-header', { opacity: 0, y: 40 }, {
                opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 78%',
                    toggleActions: 'play none none none',
                }
            });

            gsap.fromTo(cards, { opacity: 0, y: 80, scale: 0.88 }, {
                opacity: 1, y: 0, scale: (i) => 1 - i * 0.04,
                duration: 0.7,
                stagger: 0.1,
                ease: 'back.out(1.3)',
                scrollTrigger: {
                    trigger: pinWrapRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                }
            });

            cards.forEach((card, i) => {
                gsap.set(card, {
                    zIndex: total - i,
                    y: i * 10,
                    scale: 1 - i * 0.04,
                    opacity: i > 2 ? 0 : 1 - i * 0.15,
                });
            });

            const scrollPerCard = 500;
            const totalScrollLength = scrollPerCard * (total - 1);

            ScrollTrigger.create({
                trigger: pinWrapRef.current,
                start: 'top top',
                end: `+=${totalScrollLength}`,
                pin: true,
                scrub: false,
                onUpdate: (self) => {
                    const progress = self.progress;
                    const cardProgress = progress * (total - 1);
                    const currentCard = Math.floor(cardProgress);
                    const cardFrac = cardProgress - currentCard;

                    setActiveIdx(Math.min(currentCard, total - 1));

                    if (progressRef.current) {
                        gsap.set(progressRef.current, { scaleX: progress });
                    }

                    cards.forEach((card, i) => {
                        if (i < currentCard) {
                            gsap.set(card, {
                                y: -120, opacity: 0, scale: 1.05,
                                rotate: (i % 2 === 0 ? -8 : 8),
                            });
                        } else if (i === currentCard) {
                            gsap.set(card, {
                                y: gsap.utils.interpolate(0, -120, cardFrac),
                                opacity: gsap.utils.interpolate(1, 0, cardFrac),
                                scale: gsap.utils.interpolate(1, 1.05, cardFrac),
                                rotate: gsap.utils.interpolate(0, i % 2 === 0 ? -8 : 8, cardFrac),
                                zIndex: total - i + 1,
                            });
                        } else {
                            const behindIdx = i - currentCard;
                            const targetY = behindIdx * 10;
                            const prevY = (behindIdx + 1) * 10;
                            const targetScale = 1 - behindIdx * 0.04;
                            const prevScale = 1 - (behindIdx + 1) * 0.04;
                            const targetOpacity = behindIdx > 2 ? 0 : 1 - behindIdx * 0.15;
                            const prevOpacity = (behindIdx + 1) > 2 ? 0 : 1 - (behindIdx + 1) * 0.15;

                            gsap.set(card, {
                                y: gsap.utils.interpolate(prevY, targetY, cardFrac),
                                scale: gsap.utils.interpolate(prevScale, targetScale, cardFrac),
                                opacity: gsap.utils.interpolate(prevOpacity, targetOpacity, cardFrac),
                                rotate: 0,
                                zIndex: total - i,
                            });
                        }
                    });
                },
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="testimonials" className="relative z-10 bg-transparent">

            {/* ── Progress bar ── */}
            <div className="sticky top-0 z-50 h-[3px] bg-slate-200/60 w-full overflow-hidden">
                <div
                    ref={progressRef}
                    className="h-full origin-left rounded-full"
                    style={{
                        background: 'linear-gradient(90deg, #00B67A, #059669)',
                        scaleX: 0,
                        transformOrigin: 'left center',
                    }}
                />
            </div>

            {/* ── Section Header ── */}
            <div className="t-header max-w-7xl mx-auto px-6 pt-24 pb-12 text-center" style={{ opacity: 0 }}>
                <span className="inline-flex items-center gap-2 bg-[#E6F7F0] border border-[#00B67A]/30 text-[#00B67A] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
                    <span className="material-symbols-outlined text-[14px]">auto_stories</span>
                    Workflow Blueprints &amp; Scenarios
                </span>
                <h2 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight leading-tight mb-4">
                    Real Operational{' '}
                    <span className="text-[#00B67A] relative inline-block">
                        Transformation Scenarios
                        <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-[#00B67A] rounded-full"></span>
                    </span>
                </h2>
                <p className="text-gray-500 max-w-2xl mx-auto text-lg font-medium">
                    Scroll through practical operational scenarios showing how Grovix automates workflows, connects legacy tools, and saves team hours.
                </p>
            </div>

            {/* ── Pinned Stack Zone ── */}
            <div
                ref={pinWrapRef}
                className="overflow-hidden"
                style={{ height: '100vh' }}
            >
                <div className="h-full flex items-center justify-center px-6">
                    <div className="w-full max-w-2xl">

                        {/* Card counter */}
                        <div className="flex items-center justify-between mb-6 px-1">
                            <div className="flex gap-2">
                                {testimonials.map((_, i) => (
                                    <div
                                        key={i}
                                        className="rounded-full transition-all duration-300"
                                        style={{
                                            width: i === activeIdx ? '24px' : '8px',
                                            height: '8px',
                                            background: i === activeIdx
                                                ? testimonials[i].color
                                                : i < activeIdx ? '#d1d5db' : '#e5e7eb',
                                        }}
                                    />
                                ))}
                            </div>
                            <span className="text-sm text-gray-400 font-medium tabular-nums">
                                {String(activeIdx + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
                            </span>
                        </div>

                        {/* Stack */}
                        <div
                            ref={stackRef}
                            className="relative"
                            style={{ height: '380px' }}
                        >
                            {[...testimonials].reverse().map((t, reversedIdx) => {
                                const idx = testimonials.length - 1 - reversedIdx;
                                return (
                                    <div
                                        key={idx}
                                        className="t-card absolute inset-x-0 top-0"
                                        style={{ transformOrigin: 'top center', willChange: 'transform, opacity' }}
                                    >
                                        <div
                                            className="rounded-3xl p-8 relative overflow-hidden"
                                            style={{
                                                background: 'rgba(255,255,255,0.95)',
                                                backdropFilter: 'blur(20px)',
                                                border: `1.5px solid ${t.color}20`,
                                                boxShadow: `0 20px 60px rgba(0,0,0,0.10), 0 4px 16px ${t.color}15`,
                                            }}
                                        >
                                            <div
                                                className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none"
                                                style={{
                                                    background: `radial-gradient(circle, ${t.color}12, transparent 70%)`,
                                                    transform: 'translate(30%, -30%)',
                                                }}
                                            />

                                            <div className="flex items-start justify-between mb-6 relative z-10">
                                                <StarRating count={t.rating} color={t.color} />
                                                <span
                                                    className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full"
                                                    style={{ background: t.bg, color: t.color, border: `1px solid ${t.color}25` }}
                                                >
                                                    <span className="material-symbols-outlined text-[12px]">{t.tagIcon}</span>
                                                    {t.tag}
                                                </span>
                                            </div>

                                            <blockquote className="text-gray-800 text-lg leading-relaxed mb-6 relative z-10 font-medium">
                                                <span
                                                    className="text-5xl font-black leading-none mr-1"
                                                    style={{ color: t.color, opacity: 0.25 }}
                                                >
                                                    "
                                                </span>
                                                {t.quote}
                                            </blockquote>

                                            <div className="flex items-center justify-between relative z-10">
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-base shrink-0"
                                                        style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}cc)` }}
                                                    >
                                                        {t.initials}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-gray-900 text-base">{t.name}</div>
                                                        <div className="text-gray-500 text-xs">{t.role}</div>
                                                        <div className="flex items-center gap-1 text-gray-400 text-[10px] mt-0.5">
                                                            <span className="material-symbols-outlined text-[11px]">location_on</span>
                                                            {t.location}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div
                                                    className="px-3 py-2 rounded-xl text-xs font-bold text-right"
                                                    style={{ background: t.bg, color: t.color, border: `1px solid ${t.color}20` }}
                                                >
                                                    <span className="material-symbols-outlined text-[14px] block mb-0.5">{t.tagIcon}</span>
                                                    {t.stat}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="flex items-center justify-center gap-2 mt-8 text-gray-400 text-xs font-medium">
                            <span className="material-symbols-outlined text-[16px] animate-bounce">arrow_downward</span>
                            Scroll to view more scenarios
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .t-card { pointer-events: none; }
                .t-card:first-child { pointer-events: auto; }
            `}</style>
        </section>
    );
};

export default TestimonialsSection;
