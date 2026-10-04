import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { stats, marqueeRow1 as row1, marqueeRow2 as row2 } from './landingData';

gsap.registerPlugin(ScrollTrigger);

const MarqueePill = ({ logo }) => (
    <div
        className="flex items-center gap-3 select-none cursor-default group shrink-0 transition-transform duration-200 hover:scale-105"
        style={{
            background: 'rgba(255,255,255,0.85)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            border: '1px solid rgba(0,0,0,0.07)',
            borderRadius: '999px',
            padding: '11px 22px',
            boxShadow: '0 4px 16px rgba(11,25,44,0.04)',
        }}
    >
        <div
            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-6deg]"
            style={{ 
                background: `${logo.color}15`, 
                border: `1.5px solid ${logo.color}35`,
                boxShadow: `0 2px 8px ${logo.color}20` 
            }}
        >
            <span
                className="material-symbols-outlined text-[17px]"
                style={{ color: logo.color }}
            >
                {logo.icon}
            </span>
        </div>

        <span className="text-gray-800 font-bold text-sm tracking-tight whitespace-nowrap group-hover:text-black transition-colors">
            {logo.name}
        </span>

        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: logo.color, opacity: 0.6 }} />
    </div>
);

const TrustedBySection = () => {
    const statsRef = useRef(null);
    const counterRefs = useRef([]);

    // Marquee Physics References
    const row1TrackRef = useRef(null);
    const row2TrackRef = useRef(null);
    const x1Ref = useRef(0);
    const x2Ref = useRef(0);
    const targetVelRef = useRef(0);
    const smoothVelRef = useRef(0);
    const [isRow1Hovered, setIsRow1Hovered] = useState(false);
    const [isRow2Hovered, setIsRow2Hovered] = useState(false);

    // ── 1. Counter Odometer GSAP Trigger ──
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                statsRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: statsRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none none',
                    },
                }
            );

            gsap.fromTo(
                '.stat-card',
                { opacity: 0, y: 40, scale: 0.94 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: 'back.out(1.4)',
                    scrollTrigger: {
                        trigger: statsRef.current,
                        start: 'top 78%',
                        toggleActions: 'play none none none',
                    },
                }
            );

            stats.forEach((stat, i) => {
                const el = counterRefs.current[i];
                if (!el) return;

                const obj = { val: 0 };

                gsap.to(obj, {
                    val: stat.value,
                    duration: 2.2,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: statsRef.current,
                        start: 'top 78%',
                        toggleActions: 'play none none none',
                    },
                    onUpdate: () => {
                        el.textContent =
                            stat.prefix +
                            (stat.decimals > 0
                                ? obj.val.toFixed(stat.decimals)
                                : Math.floor(obj.val).toLocaleString('en-IN')) +
                            stat.suffix;
                    },
                });
            });
        });

        return () => ctx.revert();
    }, []);

    // ── 2. Scroll-Velocity Responsive Marquee Engine (Lenis Powered) ──
    useEffect(() => {
        let animationFrameId;
        let lenisUnsub = null;

        // Velocity updater from Lenis or Native Scroll
        const handleScrollVelocity = (vel) => {
            targetVelRef.current = vel;
        };

        // Attach to Lenis instance
        const initLenis = () => {
            if (window.__lenis) {
                lenisUnsub = window.__lenis.on('scroll', (e) => {
                    handleScrollVelocity(e.velocity);
                });
                return true;
            }
            return false;
        };

        if (!initLenis()) {
            const timer = setInterval(() => {
                if (initLenis()) clearInterval(timer);
            }, 180);
            setTimeout(() => clearInterval(timer), 3000);
        }

        // Native fallback velocity estimator
        let lastScrollY = window.scrollY;
        let lastTime = performance.now();
        const onNativeScroll = () => {
            const now = performance.now();
            const dt = Math.max(now - lastTime, 16);
            const dy = window.scrollY - lastScrollY;
            const computedVel = (dy / dt) * 16;
            targetVelRef.current = computedVel;
            lastScrollY = window.scrollY;
            lastTime = now;
        };

        window.addEventListener('scroll', onNativeScroll, { passive: true });

        // 60FPS High-Performance Physics Ticker
        const tick = () => {
            // Smoothly decay target velocity towards zero when user stops scrolling
            targetVelRef.current *= 0.93;
            smoothVelRef.current += (targetVelRef.current - smoothVelRef.current) * 0.14;

            const vel = smoothVelRef.current;

            // Base idle drift speeds
            const base1 = isRow1Hovered ? -0.2 : -1.0;
            const base2 = isRow2Hovered ? 0.2 : 1.0;

            // Velocity boost factor (when user scrolls fast, speed surges 3x-5x)
            // When user scrolls up (vel < 0), direction reverses!
            const dynamicSpeed1 = base1 - vel * 0.38;
            const dynamicSpeed2 = base2 + vel * 0.38;

            // ── Update Row 1 (Moves Left default, accelerates on down, reverses on up) ──
            if (row1TrackRef.current) {
                const halfWidth = row1TrackRef.current.scrollWidth / 2;
                if (halfWidth > 0) {
                    x1Ref.current += dynamicSpeed1;
                    if (x1Ref.current <= -halfWidth) x1Ref.current += halfWidth;
                    if (x1Ref.current >= 0) x1Ref.current -= halfWidth;
                    row1TrackRef.current.style.transform = `translate3d(${x1Ref.current}px, 0, 0)`;
                }
            }

            // ── Update Row 2 (Moves Right default, accelerates on down, reverses on up) ──
            if (row2TrackRef.current) {
                const halfWidth = row2TrackRef.current.scrollWidth / 2;
                if (halfWidth > 0) {
                    x2Ref.current += dynamicSpeed2;
                    if (x2Ref.current >= 0) x2Ref.current -= halfWidth;
                    if (x2Ref.current <= -halfWidth) x2Ref.current += halfWidth;
                    row2TrackRef.current.style.transform = `translate3d(${x2Ref.current}px, 0, 0)`;
                }
            }

            animationFrameId = requestAnimationFrame(tick);
        };

        animationFrameId = requestAnimationFrame(tick);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('scroll', onNativeScroll);
            if (lenisUnsub) lenisUnsub();
        };
    }, [isRow1Hovered, isRow2Hovered]);

    // Duplicated items for infinite seamless wrapping
    const quadRow1 = [...row1, ...row1, ...row1, ...row1];
    const quadRow2 = [...row2, ...row2, ...row2, ...row2];

    return (
        <section className="relative z-10 overflow-hidden">

            {/* ── Marquee Strip (Lenis Velocity Responsive) ── */}
            <div className="py-12 border-y border-gray-200/50 bg-white/40 backdrop-blur-md relative">
                
                <style>{`
                    .mask-marquee-fade {
                        -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
                        mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
                    }
                    .marquee-hardware-track {
                        display: flex;
                        width: max-content;
                        will-change: transform;
                    }
                `}</style>

                <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
                    <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-[10px] sm:text-[11px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00B67A] animate-pulse" />
                        Dynamic Integration Ecosystem
                    </span>
                    <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-2">
                        Connect &amp; Automate Across Your Existing Business Tools
                    </p>
                </div>

                {/* Row 1 — Velocity Accelerated & Direction Responsive */}
                <div 
                    className="mask-marquee-fade w-full overflow-hidden flex mb-4 cursor-grab active:cursor-grabbing"
                    onMouseEnter={() => setIsRow1Hovered(true)}
                    onMouseLeave={() => setIsRow1Hovered(false)}
                >
                    <div 
                        ref={row1TrackRef}
                        className="marquee-hardware-track items-center gap-6 px-4"
                    >
                        {quadRow1.map((logo, idx) => (
                            <MarqueePill key={`r1-${idx}`} logo={logo} />
                        ))}
                    </div>
                </div>

                {/* Row 2 — Velocity Accelerated & Direction Responsive (Opposing direction) */}
                <div 
                    className="mask-marquee-fade w-full overflow-hidden flex cursor-grab active:cursor-grabbing"
                    onMouseEnter={() => setIsRow2Hovered(true)}
                    onMouseLeave={() => setIsRow2Hovered(false)}
                >
                    <div 
                        ref={row2TrackRef}
                        className="marquee-hardware-track items-center gap-6 px-4"
                    >
                        {quadRow2.map((logo, idx) => (
                            <MarqueePill key={`r2-${idx}`} logo={logo} />
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Odometer Stats ── */}
            <div
                ref={statsRef}
                className="max-w-6xl mx-auto px-6 py-20"
                style={{ opacity: 0 }}
            >
                <div className="text-center mb-12">
                    <span className="inline-flex items-center gap-2 bg-[#E6F7F0] border border-[#00B67A]/30 text-[#0B192C] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full shadow-xs">
                        <span className="material-symbols-outlined text-[14px] text-[#00B67A]">bolt</span>
                        Engineered For Measurable Impact
                    </span>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                    {stats.map((stat, i) => (
                        <div
                            key={i}
                            className="stat-card group relative rounded-3xl p-7 overflow-hidden cursor-default"
                            style={{
                                background: 'rgba(255,255,255,0.85)',
                                backdropFilter: 'blur(16px)',
                                border: '1px solid rgba(0,0,0,0.06)',
                                boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
                                opacity: 0,
                            }}
                        >
                            <div
                                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{
                                    background: `radial-gradient(circle at 30% 30%, ${stat.color}12, transparent 70%)`
                                }}
                            />

                            <div
                                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-6deg]"
                                style={{
                                    background: stat.bg,
                                    border: `1.5px solid ${stat.color}25`,
                                    boxShadow: `0 4px 16px ${stat.color}20`
                                }}
                            >
                                <span
                                    className="material-symbols-outlined text-[22px]"
                                    style={{ color: stat.color }}
                                >
                                    {stat.icon}
                                </span>
                            </div>

                            <div
                                ref={el => counterRefs.current[i] = el}
                                className="text-4xl font-black tracking-tight mb-1 tabular-nums"
                                style={{ color: stat.color }}
                            >
                                {stat.prefix}0{stat.suffix}
                            </div>

                            <p className="text-gray-500 text-sm font-medium leading-snug">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrustedBySection;
