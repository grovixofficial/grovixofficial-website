import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ScrollHUD = () => {
    const [progress, setProgress] = useState(0);
    const [velocity, setVelocity] = useState(0);
    const [direction, setDirection] = useState(1);
    const [isHovered, setIsHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const lastScrollY = useRef(0);
    const velocityTimeout = useRef(null);

    // SVG Circle Radius
    const radius = 22;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    // Normalizing velocity for visualization (0 to 1 scale)
    const normalizedSpeed = Math.min(Math.abs(velocity) / 35, 1);
    const isHighSpeed = normalizedSpeed > 0.25;

    useEffect(() => {
        const updateScrollMetrics = (scroll, maxScroll, vel, dir) => {
            const currentY = scroll !== undefined ? scroll : window.scrollY;
            const docHeight = maxScroll !== undefined 
                ? maxScroll 
                : document.documentElement.scrollHeight - window.innerHeight;

            const pct = docHeight > 0 ? Math.min(Math.max((currentY / docHeight) * 100, 0), 100) : 0;
            setProgress(Math.round(pct));
            setIsVisible(currentY > 150);

            if (vel !== undefined) {
                setVelocity(vel);
            } else {
                // Fallback velocity estimation
                const delta = currentY - lastScrollY.current;
                setVelocity(delta);
            }

            if (dir !== undefined) {
                setDirection(dir);
            } else {
                setDirection(currentY >= lastScrollY.current ? 1 : -1);
            }

            lastScrollY.current = currentY;

            // Decay velocity indicator smoothly when scrolling stops
            clearTimeout(velocityTimeout.current);
            velocityTimeout.current = setTimeout(() => {
                setVelocity(0);
            }, 180);
        };

        const onNativeScroll = () => {
            updateScrollMetrics();
        };

        // Attach to global Lenis instance
        let lenisUnsub = null;
        const initLenis = () => {
            if (window.__lenis) {
                lenisUnsub = window.__lenis.on('scroll', (e) => {
                    updateScrollMetrics(e.scroll, e.limit, e.velocity, e.direction);
                });
                return true;
            }
            return false;
        };

        if (!initLenis()) {
            const poll = setInterval(() => {
                if (initLenis()) clearInterval(poll);
            }, 200);
            setTimeout(() => clearInterval(poll), 3000);
        }

        window.addEventListener('scroll', onNativeScroll, { passive: true });
        updateScrollMetrics();

        return () => {
            window.removeEventListener('scroll', onNativeScroll);
            clearTimeout(velocityTimeout.current);
            if (lenisUnsub && typeof lenisUnsub === 'function') lenisUnsub();
        };
    }, []);

    const scrollToTop = () => {
        if (window.__lenis) {
            window.__lenis.scrollTo(0, { duration: 1.2 });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.7, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.7, y: 20 }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    className="fixed bottom-6 right-6 z-40 select-none flex flex-col items-center gap-2"
                >
                    {/* Floating HUD Container */}
                    <div
                        onClick={scrollToTop}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        className="relative group cursor-pointer w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-xl bg-[#07101E]/90 border border-white/15"
                        style={{
                            boxShadow: isHighSpeed
                                ? `0 0 28px rgba(6, 182, 212, ${0.4 + normalizedSpeed * 0.4}), 0 0 12px rgba(0, 182, 122, 0.6), inset 0 0 16px rgba(6, 182, 212, 0.2)`
                                : `0 10px 30px -5px rgba(0, 0, 0, 0.4), 0 0 15px rgba(0, 182, 122, 0.15)`,
                            transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                        }}
                    >
                        {/* Dynamic Velocity Speedometer Aura Ring (Pulsing when fast) */}
                        <motion.div
                            animate={{
                                scale: isHighSpeed ? [1, 1.25, 1] : 1,
                                opacity: isHighSpeed ? [0.4, 0.8, 0.4] : 0,
                            }}
                            transition={{
                                duration: Math.max(0.3, 0.8 - normalizedSpeed * 0.5),
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="absolute inset-0 rounded-full border border-[#06B6D4] pointer-events-none"
                        />

                        {/* Circular Progress SVG */}
                        <svg className="w-full h-full -rotate-90 p-1" viewBox="0 0 60 60">
                            <defs>
                                <linearGradient id="hudGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#00B67A" />
                                    <stop offset="50%" stopColor="#06B6D4" />
                                    <stop offset="100%" stopColor="#8B5CF6" />
                                </linearGradient>
                            </defs>

                            {/* Background Track */}
                            <circle
                                cx="30"
                                cy="30"
                                r={radius}
                                fill="transparent"
                                stroke="rgba(255, 255, 255, 0.08)"
                                strokeWidth="3"
                            />

                            {/* Dynamic Animated Scroll Progress Ring */}
                            <circle
                                cx="30"
                                cy="30"
                                r={radius}
                                fill="transparent"
                                stroke="url(#hudGradient)"
                                strokeWidth={isHighSpeed ? "3.5" : "3"}
                                strokeDasharray={circumference}
                                strokeDashoffset={strokeDashoffset}
                                strokeLinecap="round"
                                className="transition-all duration-150 ease-out"
                            />
                        </svg>

                        {/* Center Icon & Percentage */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white pointer-events-none">
                            {isHovered ? (
                                <motion.div
                                    initial={{ y: 3, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    className="flex flex-col items-center"
                                >
                                    <span className="material-symbols-outlined text-[18px] text-[#00B67A] -mb-1">
                                        arrow_upward
                                    </span>
                                    <span className="text-[8px] font-mono font-bold uppercase tracking-wider text-slate-300">
                                        TOP
                                    </span>
                                </motion.div>
                            ) : (
                                <div className="flex flex-col items-center justify-center">
                                    <span className="text-[11px] sm:text-[12px] font-mono font-black tracking-tight leading-none text-white">
                                        {progress}%
                                    </span>
                                    {/* Velocity Live Pulse Dot */}
                                    <span 
                                        className={`w-1.5 h-1.5 rounded-full mt-1 transition-colors duration-200 ${
                                            isHighSpeed 
                                                ? 'bg-[#06B6D4] animate-ping' 
                                                : direction === -1 
                                                    ? 'bg-[#00B67A]' 
                                                    : 'bg-slate-500'
                                        }`} 
                                    />
                                </div>
                            )}
                        </div>

                        {/* Orbital Speed Particle (Spins fast when scrolling) */}
                        {isHighSpeed && (
                            <motion.div
                                animate={{ rotate: direction === 1 ? 360 : -360 }}
                                transition={{
                                    duration: Math.max(0.4, 1.2 - normalizedSpeed * 0.9),
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                                className="absolute inset-0 pointer-events-none"
                            >
                                <span className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#06B6D4] shadow-[0_0_10px_#06B6D4]" />
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ScrollHUD;
