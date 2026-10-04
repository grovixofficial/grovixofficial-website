import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * CinematicIntroScreen
 * 
 * Recreates the exact user-specified cinematic brand reveal sequence:
 * 1. Pure Black: Starts with a 100% black screen, completely dark.
 * 2. Focused Light: A small, concentrated focused light wakes up in the center.
 * 3. Flicker / Blinking: The focused light performs a subtle, organic, cinematic flicker.
 * 4. GROVIX Appears: The wordmark GROVIX emerges from the center of the light with the signature glowing emerald green dot on the "I".
 * 5. Short Hold: Brand mark holds in pristine clarity for a moment.
 * 6. Smooth Transition: Dissolves seamlessly into the Hero Section, triggering the Hero entrance animations.
 */
const CinematicIntroScreen = ({ onComplete }) => {
    // Phases: 'black' -> 'light_appear' -> 'light_flicker' -> 'text_reveal' -> 'hold' -> 'dissolve' -> 'finished'
    const [phase, setPhase] = useState('black');

    useEffect(() => {
        // Lock body scrolling during intro sequence
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        // Timeline Schedule:
        // 0.0s - 0.7s: Pure Black Screen (nothing visible)
        // 0.7s - 1.7s: Small focused light wakes up in center
        // 1.7s - 2.6s: Light flickers / blinks subtly & organically
        // 2.6s - 3.7s: GROVIX reveals from center of light with glowing green dot
        // 3.7s - 4.6s: Short hold for clear brand appreciation
        // 4.6s - 5.4s: Smooth transition into Hero Section
        // 5.5s: Fully unmounts from DOM

        const timer1 = setTimeout(() => setPhase('light_appear'), 700);
        const timer2 = setTimeout(() => setPhase('light_flicker'), 1700);
        const timer3 = setTimeout(() => setPhase('text_reveal'), 2600);
        const timer4 = setTimeout(() => setPhase('hold'), 3700);
        const timer5 = setTimeout(() => {
            setPhase('dissolve');
            // Trigger Hero section entrance right as the black curtain begins its smooth exit
            if (onComplete) onComplete();
        }, 4600);
        const timer6 = setTimeout(() => {
            setPhase('finished');
            document.body.style.overflow = originalOverflow || 'auto';
        }, 5500);

        // Escape key allows instant skip during development testing
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setPhase('dissolve');
                if (onComplete) onComplete();
                setTimeout(() => {
                    setPhase('finished');
                    document.body.style.overflow = originalOverflow || 'auto';
                }, 500);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
            clearTimeout(timer4);
            clearTimeout(timer5);
            clearTimeout(timer6);
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = originalOverflow || 'auto';
        };
    }, [onComplete]);

    if (phase === 'finished') return null;

    return (
        <AnimatePresence>
            {phase !== 'finished' && (
                <motion.div
                    key="cinematic-intro-overlay"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: phase === 'dissolve' ? 0 : 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed inset-0 z-[999999] bg-black flex items-center justify-center select-none overflow-hidden"
                    aria-label="Grovix Brand Reveal"
                >
                    {/* ═══ 1. Small Focused Light Effect in Center ═══ */}
                    {phase !== 'black' && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            {/* Outer Soft Ambient Halo (Concentrated in center, does not flood the screen) */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.2 }}
                                animate={{
                                    opacity: phase === 'light_appear' 
                                        ? 0.45 
                                        : phase === 'light_flicker'
                                        ? [0.45, 0.15, 0.6, 0.25, 0.7, 0.5, 0.65]
                                        : phase === 'dissolve'
                                        ? 0
                                        : 0.6,
                                    scale: phase === 'light_appear'
                                        ? 1
                                        : phase === 'light_flicker'
                                        ? [1, 0.9, 1.08, 0.95, 1.05, 1]
                                        : phase === 'dissolve'
                                        ? 1.15
                                        : 1.05,
                                }}
                                transition={{
                                    opacity: {
                                        duration: phase === 'light_flicker' ? 0.9 : 0.8,
                                        ease: phase === 'light_flicker' ? 'easeInOut' : [0.16, 1, 0.3, 1],
                                    },
                                    scale: {
                                        duration: phase === 'light_flicker' ? 0.9 : 0.8,
                                        ease: 'easeInOut',
                                    }
                                }}
                                className="w-[280px] sm:w-[380px] md:w-[480px] h-[280px] sm:h-[380px] md:h-[480px] rounded-full"
                                style={{
                                    background: 'radial-gradient(circle, rgba(0, 182, 122, 0.32) 0%, rgba(255, 255, 255, 0.15) 25%, rgba(0, 182, 122, 0.05) 50%, transparent 70%)',
                                    filter: 'blur(35px)',
                                }}
                            />

                            {/* Concentrated Intense Core Spotlight Beam */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.1 }}
                                animate={{
                                    opacity: phase === 'light_appear' 
                                        ? 0.75 
                                        : phase === 'light_flicker'
                                        ? [0.75, 0.2, 0.95, 0.35, 1, 0.7, 0.9]
                                        : phase === 'dissolve'
                                        ? 0
                                        : 0.85,
                                    scale: phase === 'light_appear'
                                        ? 1
                                        : phase === 'light_flicker'
                                        ? [1, 0.85, 1.12, 0.9, 1.06, 1]
                                        : phase === 'dissolve'
                                        ? 1.2
                                        : 1.02,
                                }}
                                transition={{
                                    opacity: {
                                        duration: phase === 'light_flicker' ? 0.9 : 0.7,
                                        ease: phase === 'light_flicker' ? 'easeInOut' : [0.16, 1, 0.3, 1],
                                    },
                                    scale: {
                                        duration: phase === 'light_flicker' ? 0.9 : 0.7,
                                        ease: 'easeInOut',
                                    }
                                }}
                                className="w-[100px] sm:w-[140px] md:w-[180px] h-[100px] sm:h-[140px] md:h-[180px] rounded-full absolute"
                                style={{
                                    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(0, 182, 122, 0.55) 45%, transparent 70%)',
                                    filter: 'blur(20px)',
                                }}
                            />
                        </div>
                    )}

                    {/* ═══ 2. GROVIX Typography Revealed from Center of Light ═══ */}
                    {(phase === 'text_reveal' || phase === 'hold' || phase === 'dissolve') && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.92, filter: 'blur(8px)' }}
                            animate={{
                                opacity: phase === 'dissolve' ? 0 : 1,
                                scale: phase === 'dissolve' ? 1.03 : 1,
                                filter: phase === 'dissolve' ? 'blur(4px)' : 'blur(0px)',
                            }}
                            transition={{
                                opacity: { duration: phase === 'dissolve' ? 0.45 : 0.8, ease: [0.16, 1, 0.3, 1] },
                                scale: { duration: phase === 'dissolve' ? 0.45 : 0.9, ease: [0.16, 1, 0.3, 1] },
                                filter: { duration: phase === 'dissolve' ? 0.45 : 0.7, ease: 'easeOut' },
                            }}
                            className="relative z-10 flex items-center justify-center pointer-events-none"
                        >
                            <h1 
                                className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white uppercase text-center flex items-center justify-center tracking-[0.14em] sm:tracking-[0.18em] drop-shadow-[0_0_35px_rgba(255,255,255,0.22)]"
                                style={{
                                    fontFamily: "'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif",
                                    fontWeight: 900,
                                }}
                            >
                                <span>GROV</span>

                                {/* Letter "I" with Emerald Green Glowing Dot on Top */}
                                <span className="relative inline-flex flex-col items-center">
                                    <motion.span 
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ 
                                            scale: [0, 1.25, 1], 
                                            opacity: 1,
                                        }}
                                        transition={{ 
                                            duration: 0.6, 
                                            delay: 0.15,
                                            ease: [0.16, 1, 0.3, 1],
                                        }}
                                        className="absolute -top-3 sm:-top-5 md:-top-6 lg:-top-8.5 left-1/2 -translate-x-1/2 w-2.5 sm:w-3.5 md:w-4.5 lg:w-5.5 h-2.5 sm:h-3.5 md:h-4.5 lg:h-5.5 rounded-full bg-[#00B67A]"
                                        style={{
                                            boxShadow: '0 0 12px #00B67A, 0 0 24px rgba(0, 182, 122, 0.85), 0 0 40px rgba(0, 182, 122, 0.5)',
                                        }}
                                    />
                                    <span>I</span>
                                </span>

                                <span>X</span>
                            </h1>
                        </motion.div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CinematicIntroScreen;
