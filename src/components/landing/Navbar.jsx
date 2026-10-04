import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [activeSection, setActiveSection] = useState('home');
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScrollUpdate = (scrollY, direction) => {
            const currentY = scrollY !== undefined ? scrollY : window.scrollY;

            // Scrolled threshold for island pill navbar
            setIsScrolled(currentY > 40);

            // Direction-Aware Logic:
            if (currentY <= 60) {
                // Near top -> always visible
                setIsVisible(true);
            } else if (direction === 1 || (direction === undefined && currentY > lastScrollY.current + 8)) {
                // Scrolling DOWN -> smoothly hide
                setIsVisible(false);
                setIsMobileMenuOpen(false);
            } else if (direction === -1 || (direction === undefined && currentY < lastScrollY.current - 6)) {
                // Scrolling UP -> silky-smooth slide down
                setIsVisible(true);
            }

            lastScrollY.current = currentY;

            // Track active section for indicator
            const sections = ['home', 'solutions', 'features', 'whyus', 'faqs'];
            const scrollPos = currentY + 200;
            for (const section of sections) {
                const el = document.getElementById(section);
                if (el) {
                    const top = el.offsetTop;
                    const height = el.offsetHeight;
                    if (scrollPos >= top && scrollPos < top + height) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        const onNativeScroll = () => {
            handleScrollUpdate(window.scrollY);
        };

        // Attach to global Lenis instance
        let lenisUnsub = null;
        const initLenis = () => {
            if (window.__lenis) {
                lenisUnsub = window.__lenis.on('scroll', (e) => {
                    handleScrollUpdate(e.scroll, e.direction);
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
        handleScrollUpdate(window.scrollY);

        return () => {
            window.removeEventListener('scroll', onNativeScroll);
            if (lenisUnsub && typeof lenisUnsub === 'function') lenisUnsub();
        };
    }, []);

    const navLinks = [
        { href: '#home', label: 'Home', id: 'home' },
        { href: '#solutions', label: 'Industries', id: 'solutions' },
        { href: '#features', label: 'Capabilities', id: 'features' },
        { href: '#whyus', label: 'Why Grovix', id: 'whyus' },
        { href: '#faqs', label: 'FAQs', id: 'faqs' },
    ];

    return (
        <header 
            className={`fixed top-0 left-0 right-0 z-50 pointer-events-none transition-transform duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isVisible ? 'translate-y-0' : '-translate-y-[120%]'
            }`}
        >
            <div className={`mx-auto transition-all duration-500 px-4 sm:px-6 pointer-events-auto ${
                isScrolled ? 'pt-3 max-w-5xl' : 'pt-0 max-w-7xl'
            }`}>
                <nav className={`transition-all duration-500 flex items-center justify-between ${
                    isScrolled 
                        ? 'bg-white/90 backdrop-blur-xl border border-gray-200/90 shadow-[0_12px_36px_-8px_rgba(11,25,44,0.1)] rounded-full px-5 py-2.5 h-16' 
                        : 'bg-white/80 backdrop-blur-md border-b border-gray-100 px-2 h-20'
                }`}>
                    {/* Brand Logo with Business Card Visual Identity */}
                    <a href="#home" className="flex items-center gap-3 group shrink-0">
                        {/* Geometric "G" Monogram with Mint Dot (as seen on business card) */}
                        <div className="relative w-9 h-9 rounded-xl bg-[#0B192C] flex items-center justify-center text-white shadow-sm border border-[#0B192C]/10 group-hover:scale-105 transition-transform duration-300">
                            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M19 12H12v4h4a4 4 0 0 1-4 4 8 8 0 1 1 8-8" stroke="currentColor" />
                            </svg>
                            {/* Mint Accent Dot on Logo */}
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#00B67A] ring-2 ring-[#0B192C]"></span>
                        </div>
                        <div className="flex flex-col">
                            {/* Wordmark with Emerald Dot over the 'i' as on the business card */}
                            <div className="flex items-center">
                                <span className="text-xl font-black text-[#0B192C] tracking-tight leading-none">
                                    Grov<span className="relative text-[#0B192C]">i<span className="absolute -top-[5px] left-1/2 -translate-x-1/2 w-[4.5px] h-[4.5px] rounded-full bg-[#00B67A]"></span></span>x
                                </span>
                            </div>
                            <div className="flex items-center gap-1.5 mt-0.5">
                                <span className="text-[8.5px] font-bold text-[#64748B] uppercase tracking-wider leading-none">
                                    Tech &amp; Automation
                                </span>
                                <span className="w-3.5 h-[2px] bg-[#00B67A] rounded-full"></span>
                            </div>
                        </div>
                    </a>
                    
                    {/* Desktop Menu with active pill indicator */}
                    <div className="hidden lg:flex items-center gap-1 bg-[#F8FAFC] p-1.5 rounded-full border border-gray-200/70">
                        {navLinks.map((link) => {
                            const isActive = activeSection === link.id;
                            return (
                                <a 
                                    key={link.id}
                                    href={link.href} 
                                    className={`relative px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 ${
                                        isActive 
                                            ? 'text-[#0B192C]' 
                                            : 'text-gray-600 hover:text-[#0B192C]'
                                    }`}
                                >
                                    {isActive && (
                                        <motion.div 
                                            layoutId="nav-pill" 
                                            className="absolute inset-0 bg-[#E6F7F0] rounded-full border border-[#00B67A]/30 shadow-sm" 
                                            transition={{ type: "spring", stiffness: 450, damping: 30 }}
                                        />
                                    )}
                                    <span className="relative z-10 flex items-center gap-1.5">
                                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#00B67A]"></span>}
                                        {link.label}
                                    </span>
                                </a>
                            );
                        })}
                    </div>

                    {/* Right Action buttons */}
                    <div className="hidden sm:flex items-center gap-2.5">
                        <a 
                            href="#features" 
                            className="px-3.5 py-2 text-xs font-semibold text-gray-700 hover:text-[#00B67A] transition-colors"
                        >
                            What We Do
                        </a>
                        <a 
                            href="#cta" 
                            className="relative overflow-hidden group px-4 py-2 bg-[#0B192C] hover:bg-[#07101E] text-white text-xs font-bold rounded-full shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-1.5 border border-[#0B192C]"
                        >
                            <span className="w-2 h-2 rounded-full bg-[#00B67A]"></span>
                            <span>Talk to Grovix</span>
                            <span className="material-symbols-outlined text-[15px] text-[#00B67A] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
                        </a>
                    </div>

                    {/* Mobile Menu Toggle Button */}
                    <button 
                        aria-label="Toggle mobile menu"
                        className="lg:hidden p-2 text-gray-700 rounded-xl hover:bg-gray-100 transition-colors"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <span className="material-symbols-outlined text-[24px]">
                            {isMobileMenuOpen ? 'close' : 'menu'}
                        </span>
                    </button>
                </nav>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="lg:hidden max-w-md mx-auto px-4 mt-2 pointer-events-auto"
                    >
                        <div className="bg-white/95 backdrop-blur-xl border border-gray-200/90 rounded-2xl p-5 shadow-2xl flex flex-col gap-2.5">
                            {navLinks.map((link) => (
                                <a 
                                    key={link.id}
                                    href={link.href} 
                                    onClick={() => setIsMobileMenuOpen(false)} 
                                    className="px-3.5 py-2.5 text-sm font-semibold text-gray-700 hover:text-[#00B67A] hover:bg-[#E6F7F0]/60 rounded-xl transition-all flex items-center justify-between"
                                >
                                    <span>{link.label}</span>
                                    {activeSection === link.id && (
                                        <span className="w-2 h-2 rounded-full bg-[#00B67A]"></span>
                                    )}
                                </a>
                            ))}
                            
                            <hr className="border-gray-100 my-1" />
                            
                            <div className="flex flex-col gap-2">
                                <a 
                                    href="#features" 
                                    onClick={() => setIsMobileMenuOpen(false)} 
                                    className="text-center px-4 py-2.5 text-xs font-bold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200"
                                >
                                    Explore Solutions
                                </a>
                                <a 
                                    href="#cta" 
                                    onClick={() => setIsMobileMenuOpen(false)} 
                                    className="text-center px-5 py-3 bg-[#0B192C] text-white text-xs font-bold rounded-xl shadow-lg flex items-center justify-center gap-2"
                                >
                                    <span className="w-2 h-2 rounded-full bg-[#00B67A]"></span>
                                    Talk to Grovix <span className="material-symbols-outlined text-[15px] text-[#00B67A]">arrow_forward</span>
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;
