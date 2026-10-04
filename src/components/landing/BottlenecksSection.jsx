import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BottlenecksSection = () => {
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const badge1Ref = useRef(null);
    const badge2Ref = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // ScrollTrigger Pin: Locks section dead-center in the viewport while scrolling.
            // Guarantees text NEVER gets cut off or disappears off-screen.
            // Animates elements strictly one-by-one: 1 -> 2 -> 3.
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: '+=160%',
                    pin: true,
                    pinSpacing: true,
                    scrub: 0.6,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            });

            // ═══ STEP 1: First show "Eliminate the bottlenecks that hold you back" ═══
            // Smooth popup + fade + slight upward movement
            tl.fromTo(
                titleRef.current,
                { opacity: 0, y: 55, scale: 0.94 },
                { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'power2.out' }
            )
            // Hold Step 1 in center alone
            .to({}, { duration: 0.25 })

            // ═══ STEP 2: Then show "Outdated workflows" at its proper position (Left) ═══
            // Smooth popup + fade + slight upward movement
            .fromTo(
                badge1Ref.current,
                { opacity: 0, y: 35, scale: 0.88 },
                { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'back.out(1.4)' }
            )
            // Hold Step 2
            .to({}, { duration: 0.25 })

            // ═══ STEP 3: Then show "Scaling requires more people..." at its proper position (Right) ═══
            // Smooth popup + fade + slight upward movement
            .fromTo(
                badge2Ref.current,
                { opacity: 0, y: 35, scale: 0.88 },
                { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'back.out(1.4)' }
            )
            // Hold final state before smoothly unpinning into next section
            .to({}, { duration: 0.3 });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Warning Triangle Icon (amber outline with exclamation)
    const WarningIcon = () => (
        <svg 
            className="w-4 h-4 text-[#F59E0B] shrink-0 transition-transform duration-300 group-hover:scale-110" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <path d="M12 9v4" />
            <path d="M12 17h.01" />
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        </svg>
    );

    return (
        <section 
            ref={containerRef} 
            className="relative z-10 w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden selection:bg-[#00B67A]/20"
            id="bottlenecks"
        >
            {/* Subtle Multi-Color Atmospheric Glow */}
            <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[320px] bg-[#06B6D4]/7 rounded-full blur-[130px] pointer-events-none" />
            <div className="absolute top-1/2 right-1/3 translate-x-1/2 -translate-y-1/2 w-[450px] h-[320px] bg-[#F59E0B]/7 rounded-full blur-[130px] pointer-events-none" />

            <div className="relative w-full max-w-5xl mx-auto px-6 sm:px-8 flex flex-col items-center justify-center">
                
                {/* ═══ 1. First Text: Center Bold Heading ═══ */}
                <div className="relative z-10 text-center max-w-3xl lg:max-w-4xl mx-auto">
                    <h2 
                        ref={titleRef}
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-[4rem] font-extrabold text-[#0B192C] tracking-[-0.035em] leading-[1.08] select-none font-heading"
                        style={{ 
                            willChange: 'opacity, transform',
                        }}
                    >
                        Eliminate the bottlenecks <br className="hidden sm:inline" />
                        that hold you back
                    </h2>
                </div>

                {/* ═══ Badges Container: Dedicated Layout Slots (ZERO Overlap) ═══ */}
                <div className="w-full mt-10 sm:mt-14 md:mt-16 flex flex-col md:flex-row items-center justify-between gap-5 md:gap-12 max-w-4xl px-2">
                    
                    {/* ═══ 2. Second Text: "Outdated workflows" (Left Position) ═══ */}
                    <div 
                        ref={badge1Ref} 
                        className="w-full md:w-auto flex justify-center md:justify-start"
                        style={{ willChange: 'opacity, transform' }}
                    >
                        <div className="group flex items-center gap-3 px-5 py-3 rounded-xl bg-[#F4F4F6]/90 hover:bg-white border border-black/[0.04] hover:border-black/10 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 cursor-default">
                            <WarningIcon />
                            <span className="text-[14px] sm:text-[15px] font-medium text-[#18181B] tracking-normal whitespace-nowrap">
                                Outdated workflows hurt customer experience.
                            </span>
                        </div>
                    </div>

                    {/* ═══ 3. Third Text: "Scaling requires more people and higher costs." (Right Position) ═══ */}
                    <div 
                        ref={badge2Ref} 
                        className="w-full md:w-auto flex justify-center md:justify-end md:mt-6"
                        style={{ willChange: 'opacity, transform' }}
                    >
                        <div className="group flex items-center gap-3 px-5 py-3 rounded-xl bg-[#F4F4F6]/90 hover:bg-white border border-black/[0.04] hover:border-black/10 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 cursor-default">
                            <WarningIcon />
                            <span className="text-[14px] sm:text-[15px] font-medium text-[#18181B] tracking-normal whitespace-nowrap">
                                Scaling requires more people and higher costs.
                            </span>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default BottlenecksSection;
