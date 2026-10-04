import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * StudioSpotlightIntro
 * 
 * Minimal, cinematic studio spotlight brand reveal strictly following the user's timeline:
 * 
 * 0.0s — Complete Black Screen (pitch black, nothing visible)
 * 0.5s — Spotlight ON
 * 0.8s — Spotlight OFF
 * 1.1s — Spotlight ON
 * 1.4s — Spotlight OFF
 * 1.7s — Spotlight ON (stays ON)
 * 2.0s–3.5s — GROVIX slowly becomes highlighted inside the spotlight
 * 3.5s–4.0s — Hold GROVIX
 * 4.0s+ — Smoothly open Hero Section
 */
const StudioSpotlightIntro = ({ onComplete }) => {
    const [spotlightOn, setSpotlightOn] = useState(false);
    const [textRevealing, setTextRevealing] = useState(false);
    const [exiting, setExiting] = useState(false);
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        // Lock body scrolling during the intro
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        // ── Exact Timeline (ms) ──
        // 0s: Complete Black Screen
        // 0.5s: Spotlight ON
        const t1 = setTimeout(() => setSpotlightOn(true), 500);

        // 0.8s: Spotlight OFF
        const t2 = setTimeout(() => setSpotlightOn(false), 800);

        // 1.1s: Spotlight ON
        const t3 = setTimeout(() => setSpotlightOn(true), 1100);

        // 1.4s: Spotlight OFF
        const t4 = setTimeout(() => setSpotlightOn(false), 1400);

        // 1.7s: Spotlight ON (remains on)
        const t5 = setTimeout(() => setSpotlightOn(true), 1700);

        // 2.0s - 3.5s: GROVIX slowly becomes highlighted
        const t6 = setTimeout(() => setTextRevealing(true), 2000);

        // 3.5s - 4.0s: Hold GROVIX (held in place)
        // 4.0s+: Smoothly open Hero Section
        const t7 = setTimeout(() => {
            setExiting(true);
            // Trigger Hero section opening animation
            if (onComplete) onComplete();
        }, 4000);

        // 4.8s: Fully unmount overlay and restore scrolling
        const t8 = setTimeout(() => {
            setFinished(true);
            document.body.style.overflow = originalOverflow || 'auto';
        }, 4800);

        // Escape key shortcut to skip during quick testing
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setExiting(true);
                if (onComplete) onComplete();
                setTimeout(() => {
                    setFinished(true);
                    document.body.style.overflow = originalOverflow || 'auto';
                }, 350);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
            clearTimeout(t4);
            clearTimeout(t5);
            clearTimeout(t6);
            clearTimeout(t7);
            clearTimeout(t8);
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = originalOverflow || 'auto';
        };
    }, [onComplete]);

    if (finished) return null;

    return (
        <AnimatePresence>
            {!finished && (
                <motion.div
                    key="studio-spotlight-overlay"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: exiting ? 0 : 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed inset-0 z-[999999] bg-black flex items-center justify-center select-none overflow-hidden"
                    aria-label="Grovix Brand Intro"
                >
                    {/* ═══ 1. Focused Studio Spotlight (Concentrated in center, rest of screen remains black) ═══ */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        {/* Outer Soft Light Edge */}
                        <motion.div
                            animate={{
                                opacity: spotlightOn ? 0.75 : 0,
                                scale: spotlightOn ? 1 : 0.94,
                            }}
                            transition={{
                                duration: 0.12,
                                ease: 'easeOut',
                            }}
                            className="w-[260px] h-[260px] sm:w-[340px] sm:h-[340px] md:w-[420px] md:h-[420px] rounded-full absolute"
                            style={{
                                background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.65) 0%, rgba(255, 255, 255, 0.3) 42%, rgba(255, 255, 255, 0.06) 65%, transparent 72%)',
                                filter: 'blur(16px)',
                            }}
                        />

                        {/* Concentrated Bright Center Core */}
                        <motion.div
                            animate={{
                                opacity: spotlightOn ? 0.95 : 0,
                                scale: spotlightOn ? 1 : 0.92,
                            }}
                            transition={{
                                duration: 0.1,
                                ease: 'easeOut',
                            }}
                            className="w-[130px] h-[130px] sm:w-[170px] sm:h-[170px] md:w-[210px] md:h-[210px] rounded-full absolute"
                            style={{
                                background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.45) 48%, transparent 75%)',
                                filter: 'blur(10px)',
                            }}
                        />
                    </div>

                    {/* ═══ 2. GROVIX Wordmark Slowly Highlighted Inside the Spotlight (2.0s - 3.5s) ═══ */}
                    <div className="relative z-10 flex items-center justify-center pointer-events-none">
                        <motion.h1
                            initial={{
                                opacity: 0,
                                filter: 'brightness(0.15)',
                            }}
                            animate={{
                                opacity: textRevealing ? 1 : 0,
                                filter: textRevealing ? 'brightness(1)' : 'brightness(0.15)',
                            }}
                            transition={{
                                duration: 1.5, // Exactly from 2.0s to 3.5s
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white uppercase text-center flex items-center justify-center tracking-[0.16em] sm:tracking-[0.2em]"
                            style={{
                                fontFamily: "'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif",
                                fontWeight: 900,
                            }}
                        >
                            <span>GROV</span>

                            {/* Letter "I" with signature Emerald Green Dot */}
                            <span className="relative inline-flex flex-col items-center">
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: textRevealing ? 1 : 0 }}
                                    transition={{
                                        duration: 1.5,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                    className="absolute -top-3 sm:-top-4.5 md:-top-6 lg:-top-7.5 left-1/2 -translate-x-1/2 w-2.5 sm:w-3.5 md:w-4.5 lg:w-5 h-2.5 sm:h-3.5 md:h-4.5 lg:h-5 rounded-full bg-[#00B67A]"
                                    style={{
                                        boxShadow: '0 0 10px #00B67A, 0 0 22px rgba(0, 182, 122, 0.85)',
                                    }}
                                />
                                <span>I</span>
                            </span>

                            <span>X</span>
                        </motion.h1>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default StudioSpotlightIntro;
