import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * PixelGridIntro
 * Recreates the exact preloader and digital block curtain reveal
 * from reference video Recording 2026-09-28 215507.mp4
 * 
 * Phase 1: Deep midnight screen with centered Grovix emblem & typography.
 * Phase 2: Logo fades out, full-screen background breaks into a digital grid of blocks
 *          that dissolve in an organic staggered pixel-cascade.
 * Phase 3: Hero section and Navbar underneath are revealed, triggering Hero animations.
 */

// Shuffled sequence generator for organic pixel dissolve
const createPixelGrid = (cols, rows) => {
    const total = cols * rows;
    const items = [];
    
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const index = r * cols + c;
            // Calculate a pseudo-random jitter + slight spatial dispersion
            const pseudoRandom = Math.sin(index * 1337.7) * 43758.5453;
            const jitter = pseudoRandom - Math.floor(pseudoRandom);
            
            // Distance from center for subtle organic wave
            const centerCol = (cols - 1) / 2;
            const centerRow = (rows - 1) / 2;
            const distFromCenter = Math.sqrt(
                Math.pow((c - centerCol) / cols, 2) + Math.pow((r - centerRow) / rows, 2)
            );

            // Combined delay factor (0 to 1)
            const delayFactor = (jitter * 0.7) + (distFromCenter * 0.3);
            
            items.push({
                id: `${r}-${c}`,
                row: r,
                col: c,
                delayFactor,
            });
        }
    }
    
    // Sort by delayFactor to normalize delays evenly across the duration
    const sorted = [...items].sort((a, b) => a.delayFactor - b.delayFactor);
    sorted.forEach((item, rank) => {
        item.staggerDelay = (rank / total) * 0.42; // Dissolve window: 0.42s
    });

    return items;
};

const PixelGridIntro = ({ onRevealStart, onComplete }) => {
    // 10 columns by 6 rows = 60 blocks (matches exact proportions from video frame 76)
    const COLS = 10;
    const ROWS = 6;

    const [showLogo, setShowLogo] = useState(true);
    const [phase, setPhase] = useState('holding'); // 'holding' | 'dissolving' | 'finished'
    const blocks = useMemo(() => createPixelGrid(COLS, ROWS), [COLS, ROWS]);

    useEffect(() => {
        // Prevent scrolling while intro is running
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        // Timeline:
        // 0.0s - 0.85s: Letters 'G R O V I X' glide in with smooth blur & staggered float
        // 0.85s - 1.20s: Wordmark rests with subtle luminous presence
        // 1.20s - 1.55s: Wordmark gracefully blurs & floats away into solid black
        // 1.60s: Pixel curtain dissolves organically with zero seam lines
        // 2.10s: Hero entrance triggered
        // 2.35s: Intro unmounts
        const logoFadeTimer = setTimeout(() => {
            setShowLogo(false);
        }, 1200);

        const dissolveTimer = setTimeout(() => {
            setPhase('dissolving');
            if (onRevealStart) onRevealStart();
        }, 1600);

        const heroTriggerTimer = setTimeout(() => {
            if (onComplete) onComplete();
        }, 2100);

        const finishTimer = setTimeout(() => {
            setPhase('finished');
            document.body.style.overflow = originalOverflow || 'auto';
        }, 2350);

        return () => {
            clearTimeout(logoFadeTimer);
            clearTimeout(dissolveTimer);
            clearTimeout(heroTriggerTimer);
            clearTimeout(finishTimer);
            document.body.style.overflow = originalOverflow || 'auto';
        };
    }, [onRevealStart, onComplete]);

    if (phase === 'finished') return null;

    const letters = ['G', 'R', 'O', 'V', 'I', 'X'];

    return (
        <div 
            className="fixed inset-0 z-[99999] pointer-events-none select-none overflow-hidden"
            aria-hidden="true"
        >
            {/* ═══ Phase 1: Centered Grovix Brand Logo with Subtle Stagger Animation ═══ */}
            <AnimatePresence>
                {showLogo && (
                    <motion.div
                        key="intro-logo"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ 
                            opacity: 0, 
                            y: -8, 
                            filter: 'blur(8px)',
                            scale: 1.02,
                        }}
                        transition={{
                            opacity: { duration: 0.35, ease: 'easeOut' },
                            exit: { duration: 0.35, ease: [0.4, 0, 0.2, 1] }
                        }}
                        className="absolute inset-0 z-20 flex items-center justify-center pointer-events-auto"
                    >
                        {/* Wordmark: GROVIX with subtle letter-by-letter float & blur resolve */}
                        <motion.h1 
                            className="text-5xl sm:text-7xl md:text-8xl font-black text-white tracking-tight flex items-baseline justify-center select-none drop-shadow-[0_0_35px_rgba(255,255,255,0.2)]"
                            style={{
                                fontFamily: "'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif",
                            }}
                            animate={{
                                scale: [1, 1.015, 1],
                            }}
                            transition={{
                                duration: 2.2,
                                ease: 'easeInOut',
                                repeat: Infinity,
                            }}
                        >
                            {letters.map((char, index) => (
                                <motion.span
                                    key={index}
                                    initial={{ 
                                        opacity: 0, 
                                        y: 18, 
                                        filter: 'blur(10px)',
                                    }}
                                    animate={{ 
                                        opacity: 1, 
                                        y: 0, 
                                        filter: 'blur(0px)',
                                    }}
                                    transition={{
                                        duration: 0.6,
                                        delay: index * 0.07,
                                        ease: [0.16, 1, 0.3, 1],
                                    }}
                                    className="inline-block"
                                >
                                    {char}
                                </motion.span>
                            ))}
                        </motion.h1>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ═══ Phase 2: Digital Pixel Grid / Block Curtain (Pure Opacity Dissolve - ZERO Seam Lines) ═══ */}
            <div 
                className="w-full h-full grid grid-cols-10 grid-rows-6"
                style={{
                    backgroundColor: 'transparent',
                }}
            >
                {blocks.map((block) => (
                    <motion.div
                        key={block.id}
                        initial={{ opacity: 1 }}
                        animate={{
                            opacity: phase === 'dissolving' ? 0 : 1,
                        }}
                        transition={{
                            duration: 0.24,
                            delay: phase === 'dissolving' ? block.staggerDelay : 0,
                            ease: [0.25, 1, 0.5, 1],
                        }}
                        className="w-full h-full bg-black"
                        style={{
                            willChange: 'opacity',
                            backgroundColor: '#000000',
                            outline: '1px solid #000000', // Ensures zero subpixel seam gaps
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default PixelGridIntro;
