import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import demoVideo from '../../assets/watermark-removed-creat_the_full_video_from_this.mp4';
import grovix3dHero from '../../assets/grovix-3d-hero.png';

const clientLogos = [
    { name: 'Apex Engineering', icon: 'precision_manufacturing' },
    { name: 'Surat Hub Logistics', icon: 'local_shipping' },
    { name: 'Patel Trading & Co', icon: 'warehouse' },
    { name: 'Indus Retail Omnichannel', icon: 'storefront' },
    { name: 'CloudCore Systems', icon: 'cloud_sync' },
    { name: 'Nexa Trade International', icon: 'hub' },
];

const HeroSection = ({ isReady = true }) => {
    const heroRef = useRef(null);
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

    // Mouse parallax for 3D visual and cards
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const smoothMouseX = useSpring(mouseX, { stiffness: 120, damping: 20 });
    const smoothMouseY = useSpring(mouseY, { stiffness: 120, damping: 20 });

    const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [8, -8]);
    const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-8, 8]);
    const moveX = useTransform(smoothMouseX, [-0.5, 0.5], [-12, 12]);
    const moveY = useTransform(smoothMouseY, [-0.5, 0.5], [-12, 12]);

    const handleMouseMove = (e) => {
        if (!heroRef.current) return;
        const rect = heroRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    // Stagger animations with Sadewa cubic-bezier easing
    const easeBezier = [0.16, 1, 0.3, 1];

    const headingVariants = {
        hidden: { opacity: 0, y: 36 },
        visible: (custom) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.9,
                delay: custom * 0.12,
                ease: easeBezier,
            },
        }),
    };

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.93, y: 30 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { duration: 0.85, delay: 0.18, ease: easeBezier },
        },
    };

    const visualVariants = {
        hidden: { opacity: 0, scale: 0.9, y: 40 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { duration: 1.0, delay: 0.22, ease: easeBezier },
        },
    };

    const textVariants = {
        hidden: { opacity: 0, y: 24 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, delay: 0.32, ease: easeBezier },
        },
    };

    const buttonsVariants = {
        hidden: { opacity: 0, y: 24 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, delay: 0.42, ease: easeBezier },
        },
    };

    const logosVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, delay: 0.52, ease: easeBezier },
        },
    };

    return (
        <section
            ref={heroRef}
            id="home"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden select-none bg-[#F8FAFC]"
        >
            {/* Architectural Background Grid Texture */}
            <div className="absolute inset-0 grovix-grid-bg -z-10 opacity-60 pointer-events-none" />

            {/* Ambient Lighting Glows - Multi-Color Atmospheric Mesh */}
            <div className="absolute top-10 left-1/5 w-[500px] h-[350px] bg-[#00B67A]/12 rounded-full blur-[120px] -z-10 pointer-events-none" />
            <div className="absolute top-20 right-1/4 w-[480px] h-[380px] bg-[#06B6D4]/12 rounded-full blur-[125px] -z-10 pointer-events-none" />
            <div className="absolute top-64 left-1/3 w-[450px] h-[350px] bg-[#8B5CF6]/10 rounded-full blur-[135px] -z-10 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 sm:px-8">
                {/* ── Main Asymmetric 2x2 Hero Grid ── */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    
                    {/* ══ TOP-LEFT: Massive Clean Typography ══ */}
                    <div className="lg:col-span-7 flex flex-col justify-center">
                        {/* Multi-Color Tech Capabilities Pill */}
                        <motion.div
                            custom={0}
                            variants={headingVariants}
                            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/90 border border-slate-200/90 shadow-xs mb-5 w-fit backdrop-blur-md"
                        >
                            <span className="flex h-2 w-2 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#06B6D4] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00B67A]"></span>
                            </span>
                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                                AI Agents <span className="text-[#06B6D4]">•</span> WhatsApp API <span className="text-[#8B5CF6]">•</span> Custom ERP
                            </span>
                        </motion.div>

                        <motion.h1
                            initial="hidden"
                            animate={isReady ? "visible" : "hidden"}
                            className="text-4xl sm:text-6xl lg:text-[78px] font-extrabold text-[#0B192C] tracking-[-0.04em] leading-[1.03] font-heading"
                        >
                            <motion.span custom={1} variants={headingVariants} className="block">
                                Business Automation
                            </motion.span>
                            <motion.span custom={2} variants={headingVariants} className="block text-[#0B192C]">
                                for <span className="text-gradient-tech">Growing Brands.</span>
                            </motion.span>
                        </motion.h1>
                    </div>

                    {/* ══ TOP-RIGHT: Sleek Showreel / Demoreel Interactive Card ══ */}
                    <div className="lg:col-span-5 flex justify-start lg:justify-end">
                        <motion.div
                            initial="hidden"
                            animate={isReady ? "visible" : "hidden"}
                            variants={cardVariants}
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => setIsVideoModalOpen(true)}
                            className="relative w-full max-w-[340px] sm:max-w-[380px] h-[210px] sm:h-[220px] rounded-2xl bg-[#131313] border border-white/10 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.18)] cursor-pointer overflow-hidden group flex flex-col justify-between"
                        >
                            {/* Card Subtle Grid & Noise Texture */}
                            <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

                            {/* Top row of card */}
                            <div className="relative z-10 flex items-center justify-between">
                                <span className="text-[11px] font-mono font-bold text-[#00B67A] tracking-wider uppercase flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#00B67A] animate-pulse" />
                                    /SHOWREEL
                                </span>

                                {/* Floating Software Window Badge */}
                                <motion.div
                                    animate={{ y: [-3, 3, -3], rotate: [-2, 2, -2] }}
                                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                                    className="bg-[#242424] border border-white/10 rounded-lg px-2 py-1 shadow-md flex items-center gap-1"
                                >
                                    <span className="material-symbols-outlined text-[13px] text-slate-300">code</span>
                                </motion.div>
                            </div>

                            {/* Background Grovix Watermark */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                                <span className="text-5xl font-black text-white/[0.07] tracking-tight transform -rotate-3">
                                    Grovix
                                </span>
                            </div>

                            {/* Centered Circular Glass Play Button */}
                            <div className="relative z-10 self-center flex items-center justify-center">
                                {/* Ambient Breathing Ring */}
                                <motion.div
                                    animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.7, 0.3] }}
                                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute w-16 h-16 rounded-full border border-[#00B67A]/50 bg-[#00B67A]/10 pointer-events-none"
                                />
                                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/25 flex items-center justify-center text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#00B67A] group-hover:text-[#0B192C]">
                                    <span className="material-symbols-outlined text-[22px] ml-0.5">play_arrow</span>
                                </div>
                            </div>

                            {/* Bottom row of card: Floating Magnifying Tool */}
                            <div className="relative z-10 flex items-center justify-between">
                                <motion.div
                                    animate={{ y: [3, -3, 3], rotate: [2, -2, 2] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                    className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400"
                                >
                                    <span className="material-symbols-outlined text-[15px]">search</span>
                                </motion.div>

                                <span className="text-[10px] font-mono text-slate-400">
                                    01:24 HD &bull; Watch Demo
                                </span>
                            </div>
                        </motion.div>
                    </div>

                    {/* ══ BOTTOM-LEFT: 3D Architectural Monogram with Continuous Living Float & Physics ══ */}
                    <div className="lg:col-span-7 flex justify-center lg:justify-start items-center relative py-6 lg:py-8">
                        <motion.div
                            initial="hidden"
                            animate={isReady ? "visible" : "hidden"}
                            variants={visualVariants}
                            style={{
                                x: moveX,
                                y: moveY,
                                rotateX: rotateX,
                                rotateY: rotateY,
                                transformPerspective: 1000,
                            }}
                            className="relative w-full max-w-[380px] sm:max-w-[460px] cursor-grab active:cursor-grabbing select-none"
                        >
                            {/* Ambient Breathing Glow Aura Behind Monogram */}
                            <motion.div
                                animate={{
                                    scale: [1, 1.18, 1],
                                    opacity: [0.35, 0.7, 0.35],
                                }}
                                transition={{
                                    duration: 4.2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gradient-to-tr from-[#00B67A]/25 via-[#06B6D4]/20 to-[#8B5CF6]/15 rounded-full blur-[80px] pointer-events-none -z-10"
                            />

                            {/* Dynamic Physical Floating Shadow (scales & blurs as logo levitates) */}
                            <motion.div
                                animate={{
                                    scale: [0.95, 0.8, 0.95],
                                    opacity: [0.28, 0.14, 0.28],
                                    y: [0, 10, 0],
                                }}
                                transition={{
                                    duration: 4.8,
                                    ease: "easeInOut",
                                    repeat: Infinity,
                                }}
                                className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[65%] h-7 bg-[#0B192C] rounded-[100%] blur-[20px] pointer-events-none -z-10"
                            />

                            {/* Continuous Living 3D Floating, Swaying, & Gentle Perspective Rocking */}
                            <motion.div
                                animate={{
                                    y: [-6, 12, -10, 8, -6],
                                    rotateZ: [-2.2, 2.8, -1.8, 2.2, -2.2],
                                    rotateX: [3, -4, 2, -3, 3],
                                    rotateY: [-4, 4, -3, 3, -4],
                                }}
                                transition={{
                                    duration: 5.5,
                                    ease: "easeInOut",
                                    repeat: Infinity,
                                }}
                                className="relative w-full overflow-hidden rounded-3xl"
                            >
                                <img
                                    src={grovix3dHero}
                                    alt="Grovix 3D Architectural Monogram"
                                    className="w-full h-auto object-contain drop-shadow-[0_25px_35px_rgba(11,25,44,0.14)] select-none pointer-events-none"
                                />

                                {/* Periodic Glass Specular Reflection Sheen */}
                                <motion.div
                                    animate={{
                                        x: ['-140%', '240%'],
                                        opacity: [0, 0.85, 0],
                                    }}
                                    transition={{
                                        duration: 3.2,
                                        repeat: Infinity,
                                        repeatDelay: 2.2,
                                        ease: "easeInOut",
                                    }}
                                    className="absolute inset-0 w-3/5 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-25 pointer-events-none"
                                />
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* ══ BOTTOM-RIGHT: Supporting Paragraph + Dual Interaction Buttons ══ */}
                    <div className="lg:col-span-5 flex flex-col justify-center space-y-7">
                        <motion.p
                            initial="hidden"
                            animate={isReady ? "visible" : "hidden"}
                            variants={textVariants}
                            className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-md"
                        >
                            Grovix helps you create custom AI agents, automated WhatsApp workflows, and bespoke ERP systems to eliminate repetitive work and boost team productivity.
                        </motion.p>

                        {/* Dual Compartment Action Buttons (Matching Video Hover Physics) */}
                        <motion.div
                            initial="hidden"
                            animate={isReady ? "visible" : "hidden"}
                            variants={buttonsVariants}
                            className="flex flex-wrap items-center gap-3.5"
                        >
                            {/* Primary Button */}
                            <a
                                href="#cta"
                                className="group inline-flex items-stretch rounded-xl overflow-hidden shadow-sm transition-all duration-200"
                            >
                                <span className="bg-[#0B192C] group-hover:bg-[#00B67A] text-white group-hover:text-[#0B192C] font-semibold text-sm sm:text-[15px] px-5 sm:px-6 py-3.5 flex items-center transition-colors duration-200">
                                    Get Free Consultation
                                </span>
                                <span className="bg-[#00B67A] group-hover:bg-[#0B192C] w-12 flex items-center justify-center transition-colors duration-200 border-l border-white/10 group-hover:border-black/10">
                                    <span className="material-symbols-outlined text-[18px] text-[#0B192C] group-hover:text-[#00B67A] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                                        north_east
                                    </span>
                                </span>
                            </a>

                            {/* Secondary Button */}
                            <a
                                href="#cta"
                                className="group inline-flex items-stretch rounded-xl overflow-hidden border border-slate-200/90 group-hover:border-[#00B67A] shadow-xs transition-all duration-200"
                            >
                                <span className="bg-white group-hover:bg-[#00B67A] text-[#0B192C] font-semibold text-sm sm:text-[15px] px-5 sm:px-6 py-3.5 flex items-center transition-colors duration-200">
                                    Work with us
                                </span>
                                <span className="bg-[#F1F5F9] group-hover:bg-[#0B192C] w-12 flex items-center justify-center transition-colors duration-200 border-l border-slate-200/80 group-hover:border-black/10">
                                    <span className="material-symbols-outlined text-[18px] text-[#0B192C] group-hover:text-[#00B67A] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                                        north_east
                                    </span>
                                </span>
                            </a>
                        </motion.div>
                    </div>

                </div>

                {/* ══ BOTTOM BAR: / TRUSTED BY 120+ COMPANIES Marquee ══ */}
                <motion.div
                    initial="hidden"
                    animate={isReady ? "visible" : "hidden"}
                    variants={logosVariants}
                    className="mt-16 pt-10 border-t border-slate-200/70"
                >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10">
                        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 shrink-0">
                            / TRUSTED BY 120+ GROWING ENTERPRISES
                        </span>

                        <div className="overflow-hidden w-full relative">
                            {/* Left & Right Gradient Fade Masks */}
                            <div className="absolute top-0 left-0 bottom-0 w-12 bg-gradient-to-r from-[#F8FAFC] to-transparent z-10 pointer-events-none" />
                            <div className="absolute top-0 right-0 bottom-0 w-12 bg-gradient-to-l from-[#F8FAFC] to-transparent z-10 pointer-events-none" />

                            <div className="flex items-center gap-10 animate-marquee whitespace-nowrap">
                                {[...clientLogos, ...clientLogos].map((client, i) => (
                                    <div key={i} className="flex items-center gap-2 text-slate-400 hover:text-slate-700 transition-colors select-none">
                                        <span className="material-symbols-outlined text-[18px] text-slate-400">{client.icon}</span>
                                        <span className="text-xs font-bold tracking-tight font-body-md">{client.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* ══ Video Showreel Modal ══ */}
            <AnimatePresence>
                {isVideoModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsVideoModalOpen(false)}
                        className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ duration: 0.3, ease: easeBezier }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-4xl bg-[#07101E] rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
                        >
                            {/* Modal Header */}
                            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-[#0B192C]/90">
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-[#00B67A] animate-pulse" />
                                    <span className="text-xs font-bold text-white tracking-wide">
                                        Grovix Business Automation — Live Demo Reel
                                    </span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setIsVideoModalOpen(false)}
                                    className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                                >
                                    <span className="material-symbols-outlined text-[18px]">close</span>
                                </button>
                            </div>

                            {/* Video player */}
                            <div className="aspect-[16/9] w-full bg-black relative">
                                <video
                                    src={demoVideo}
                                    controls
                                    autoPlay
                                    playsInline
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                @keyframes marqueeScroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    display: flex;
                    width: max-content;
                    animation: marqueeScroll 25s linear infinite;
                }
                .animate-marquee:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </section>
    );
};

export default HeroSection;
