import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { features } from './landingData';

gsap.registerPlugin(ScrollTrigger);

const FeaturesSection = () => {
    const sectionRef = useRef(null);
    const pinWrapRef = useRef(null);
    const trackRef = useRef(null);
    const progressBarRef = useRef(null);
    const headingRef = useRef(null);
    const subheadRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        const pinWrap = pinWrapRef.current;
        const track = trackRef.current;
        const progressBar = progressBarRef.current;

        if (!section || !pinWrap || !track) return;

        const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);

        const ctx = gsap.context(() => {

            gsap.fromTo(
                [headingRef.current, subheadRef.current],
                { opacity: 0, y: 40 },
                {
                    opacity: 1, y: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 75%',
                        toggleActions: 'play none none none',
                    }
                }
            );

            const horizontalTween = gsap.to(track, {
                x: getScrollAmount,
                ease: 'none',
                scrollTrigger: {
                    trigger: pinWrap,
                    start: 'top top',
                    end: () => `+=${track.scrollWidth - window.innerWidth + 200}`,
                    pin: true,
                    scrub: 1.2,
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                        if (progressBar) {
                            gsap.set(progressBar, { scaleX: self.progress });
                        }
                    }
                }
            });

            const cards = track.querySelectorAll('.feature-card');
            cards.forEach((card, i) => {
                gsap.fromTo(
                    card,
                    { opacity: 0, y: 60, scale: 0.92 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.7,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: pinWrap,
                            start: 'top top',
                            containerAnimation: horizontalTween,
                            scrub: false,
                            toggleActions: 'play none none none',
                        },
                        delay: i * 0.06,
                    }
                );
            });

        }, section);

        const handleResize = () => ScrollTrigger.refresh();
        window.addEventListener('resize', handleResize);

        return () => {
            ctx.revert();
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <section ref={sectionRef} id="features" className="relative z-10">

            {/* ── Section Header ── */}
            <div className="max-w-7xl mx-auto px-6 pt-28 pb-16 text-center">
                <div
                    ref={headingRef}
                    className="inline-flex items-center gap-2 bg-[#E6F7F0] border border-[#00B67A]/30 text-[#0B192C] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6 shadow-xs"
                    style={{ opacity: 0 }}
                >
                    <span className="material-symbols-outlined text-[16px] text-[#00B67A]">build_circle</span>
                    Automation &amp; Software Capabilities
                </div>
                <h2
                    ref={subheadRef}
                    className="text-4xl md:text-6xl font-extrabold text-[#0B192C] tracking-tight leading-tight font-heading"
                    style={{ opacity: 0 }}
                >
                    Modular Capabilities<br />
                    <span className="text-gradient-tech">
                        Tailored For Your Operations
                    </span>
                </h2>
                <p className="text-slate-600 max-w-2xl mx-auto text-base sm:text-lg mt-5 font-normal leading-relaxed">
                    Explore our core building blocks—from WhatsApp automated notifications to custom ERP tools and SAP add-ons. Combine only what solves your bottleneck.
                </p>
            </div>

            {/* ── Progress Bar ── */}
            <div className="sticky top-0 z-50 h-[3px] bg-slate-200/60 w-full overflow-hidden" style={{ marginBottom: '-3px' }}>
                <div
                    ref={progressBarRef}
                    className="h-full origin-left rounded-full"
                    style={{
                        background: 'linear-gradient(90deg, #00B67A, #06B6D4, #6366F1, #8B5CF6, #F59E0B)',
                        scaleX: 0,
                        transformOrigin: 'left center'
                    }}
                />
            </div>

            {/* ── Pinned Horizontal Scroll Zone ── */}
            <div
                ref={pinWrapRef}
                className="overflow-hidden"
                style={{ height: '100vh' }}
            >
                <div className="absolute top-1/2 right-8 -translate-y-1/2 z-20 flex flex-col items-center gap-2 opacity-50 pointer-events-none">
                    <span className="material-symbols-outlined text-slate-400 animate-bounce-x text-[32px]">chevron_right</span>
                </div>

                <div
                    ref={trackRef}
                    className="flex items-center gap-7 h-full"
                    style={{ paddingLeft: '10vw', paddingRight: '10vw', width: 'max-content' }}
                >
                    {features.map((feature, idx) => (
                        <FeatureCard key={idx} feature={feature} index={idx} />
                    ))}
                </div>
            </div>

            <style>{`
                @keyframes bounce-x {
                    0%, 100% { transform: translateX(0); }
                    50% { transform: translateX(8px); }
                }
                .animate-bounce-x {
                    animation: bounce-x 1.2s ease-in-out infinite;
                }
                .feature-card {
                    flex-shrink: 0;
                }
                .stat-pill {
                    transition: all 0.3s ease;
                }
                .feature-card:hover .card-icon-wrap {
                    transform: scale(1.08) rotate(-3deg);
                }
                .feature-card:hover .card-shine {
                    opacity: 1;
                }
                .card-shine {
                    opacity: 0;
                    transition: opacity 0.4s ease;
                }
            `}</style>
        </section>
    );
};

const FeatureCard = ({ feature, index }) => {
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;

        gsap.to(card, {
            rotateX,
            rotateY,
            scale: 1.02,
            duration: 0.3,
            ease: 'power2.out',
            transformPerspective: 900,
        });
    };

    const handleMouseLeave = () => {
        gsap.to(cardRef.current, {
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.5,
            ease: 'power2.out',
        });
    };

    return (
        <div
            ref={cardRef}
            className="feature-card group relative cursor-pointer glass-card"
            style={{
                width: '350px',
                height: '430px',
                borderRadius: '28px',
                border: '1px solid rgba(226, 232, 240, 0.9)',
                boxShadow: '0 8px 32px -4px rgba(11, 25, 44, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
                padding: '34px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
                willChange: 'transform',
                opacity: 0,
                transform: 'translateY(60px) scale(0.92)',
                animation: `cardEntrance 0.6s ${index * 0.07}s forwards ease-out`,
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div
                className="card-shine absolute inset-0 rounded-[28px] pointer-events-none"
                style={{
                    background: `radial-gradient(circle at 30% 30%, ${feature.accent}14, transparent 70%)`,
                }}
            />

            <div className="flex items-center justify-between mb-4">
                <span
                    className="text-[11px] font-mono font-bold tracking-widest uppercase"
                    style={{ color: feature.accent }}
                >
                    MODULE {String(index + 1).padStart(2, '0')}
                </span>
                <span
                    className="text-[11px] font-semibold px-3 py-1 rounded-full font-mono"
                    style={{
                        background: feature.lightAccent,
                        color: feature.accent,
                        border: `1px solid ${feature.accent}30`
                    }}
                >
                    {feature.tag}
                </span>
            </div>

            <div
                className="card-icon-wrap w-15 h-15 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300"
                style={{
                    background: `linear-gradient(135deg, ${feature.lightAccent}, white)`,
                    border: `1.5px solid ${feature.accent}25`,
                    boxShadow: `0 4px 20px ${feature.accent}18`
                }}
            >
                <span
                    className="material-symbols-outlined text-[28px]"
                    style={{ color: feature.accent }}
                >
                    {feature.icon}
                </span>
            </div>

            <div className="flex-1">
                <h3
                    className="text-xl font-bold text-[#0B192C] mb-2.5 leading-snug font-heading"
                >
                    {feature.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed font-normal">
                    {feature.desc}
                </p>
            </div>

            <div
                className="stat-pill mt-6 flex items-center gap-3 px-4 py-3 rounded-2xl border"
                style={{
                    background: feature.lightAccent,
                    borderColor: `${feature.accent}25`
                }}
            >
                <span
                    className="text-2xl font-black font-heading tabular-nums"
                    style={{ color: feature.accent }}
                >
                    {feature.stat}
                </span>
                <span className="text-slate-600 text-xs font-medium leading-tight">
                    {feature.statLabel}
                </span>
                <span
                    className="ml-auto material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform"
                    style={{ color: feature.accent }}
                >
                    arrow_forward
                </span>
            </div>

            <style>{`
                @keyframes cardEntrance {
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
            `}</style>
        </div>
    );
};

export default FeaturesSection;
