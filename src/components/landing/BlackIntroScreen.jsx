import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * BlackIntroScreen
 * 
 * Minimalist, intentional 5-second cinematic intro screen:
 * - Pure full-screen black background
 * - Centered word: "GROVIX"
 * - The letter "I" has a vibrant emerald green dot directly above it (#00B67A)
 * - Clean, ultra-premium, modern typography
 * - No logos, no icons, no navigation, no buttons, no additional text
 * - Finishes in exactly 5 seconds, smoothly transitioning into the Hero Section
 */
const BlackIntroScreen = ({ onComplete, duration = 5000 }) => {
    // 'display' -> 'fadingText' -> 'fadingOverlay' -> 'finished'
    const [state, setState] = useState('display');

    useEffect(() => {
        // Prevent background scrolling during the intro
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        // 1. Text begins fading out at (duration - 700ms) = 4.3s
        const textFadeTimer = setTimeout(() => {
            setState('fadingText');
        }, Math.max(duration - 700, 1000));

        // 2. Black curtain transition starts at exactly 5.0s, triggering hero section entrance
        const curtainTimer = setTimeout(() => {
            setState('fadingOverlay');
            if (onComplete) onComplete();
        }, duration);

        // 3. Fully unmount after curtain animation completes (~5.9s)
        const unmountTimer = setTimeout(() => {
            setState('finished');
            document.body.style.overflow = originalOverflow || 'auto';
        }, duration + 900);

        // Keyboard shortcut to skip during quick testing (Escape key)
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setState('fadingOverlay');
                if (onComplete) onComplete();
                setTimeout(() => {
                    setState('finished');
                    document.body.style.overflow = originalOverflow || 'auto';
                }, 600);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            clearTimeout(textFadeTimer);
            clearTimeout(curtainTimer);
            clearTimeout(unmountTimer);
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = originalOverflow || 'auto';
        };
    }, [duration, onComplete]);

    if (state === 'finished') return null;

    return (
        <AnimatePresence>
            {state !== 'fadingOverlay' && state !== 'finished' ? (
                <motion.div
                    key="black-intro-curtain"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed inset-0 z-[999999] bg-black flex items-center justify-center select-none overflow-hidden"
                    aria-label="Grovix Introduction"
                >
                    {/* Centered GROVIX text with intentional cinematic pacing */}
                    <AnimatePresence>
                        {state === 'display' && (
                            <motion.h1
                                key="grovix-title"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{
                                    opacity: [0, 1, 1],
                                    scale: [0.95, 1, 1.02],
                                }}
                                exit={{
                                    opacity: 0,
                                    scale: 1.04,
                                    filter: 'blur(5px)',
                                    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
                                }}
                                transition={{
                                    duration: (duration - 700) / 1000,
                                    ease: [0.16, 1, 0.3, 1],
                                    times: [0, 0.2, 1],
                                }}
                                className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white uppercase text-center flex items-center justify-center tracking-[0.16em] sm:tracking-[0.2em] pointer-events-none drop-shadow-[0_0_40px_rgba(255,255,255,0.18)]"
                                style={{
                                    fontFamily: "'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif",
                                    fontWeight: 900,
                                }}
                            >
                                <span>GROV</span>
                                
                                {/* Letter "I" with Emerald Green Glowing Dot on Top */}
                                <span className="relative inline-flex flex-col items-center">
                                    <span 
                                        className="absolute -top-3 sm:-top-5 md:-top-6 lg:-top-8 left-1/2 -translate-x-1/2 w-2.5 sm:w-3.5 md:w-4.5 lg:w-5 h-2.5 sm:h-3.5 md:h-4.5 lg:h-5 rounded-full bg-[#00B67A] shadow-[0_0_14px_#00B67A,0_0_28px_rgba(0,182,122,0.8)]" 
                                    />
                                    <span>I</span>
                                </span>
                                
                                <span>X</span>
                            </motion.h1>
                        )}
                    </AnimatePresence>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
};

export default BlackIntroScreen;
