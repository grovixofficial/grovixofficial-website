import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-[#07101E] text-slate-300 border-t border-white/10 pt-20 pb-12 relative overflow-hidden">
            {/* Subtle background brand watermark */}
            <div className="absolute right-0 bottom-0 pointer-events-none opacity-[0.04] translate-x-12 translate-y-12 select-none">
                <svg width="400" height="400" viewBox="0 0 200 200" fill="none">
                    <circle cx="100" cy="100" r="80" stroke="#FFFFFF" strokeWidth="8" />
                    <line x1="100" y1="20" x2="100" y2="100" stroke="#FFFFFF" strokeWidth="8" />
                    <line x1="100" y1="100" x2="180" y2="100" stroke="#FFFFFF" strokeWidth="8" />
                    <circle cx="140" cy="60" r="14" fill="#00B67A" />
                </svg>
            </div>

            {/* Ambient subtle glow at footer top */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[120px] bg-[#00B67A]/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-14 border-b border-white/10">
                    {/* Brand Info Column */}
                    <div className="md:col-span-5 flex flex-col justify-between">
                        <div>
                            <a href="#home" className="inline-block group mb-4">
                                <div className="flex items-baseline gap-0.5">
                                    <span className="font-extrabold text-white text-2xl tracking-tight font-heading">Grov</span>
                                    <span className="relative font-extrabold text-white text-2xl tracking-tight font-heading">
                                        ı
                                        <span className="absolute top-[4px] left-[50%] -translate-x-1/2 w-2 h-2 rounded-full bg-[#00B67A] shadow-[0_0_8px_rgba(0,182,122,0.8)]"></span>
                                    </span>
                                    <span className="font-extrabold text-white text-2xl tracking-tight font-heading">x</span>
                                </div>
                                <div className="text-[11px] font-mono font-semibold text-slate-400 tracking-wider uppercase mt-1">
                                    Tech &amp; Automation Solutions
                                </div>
                                <div className="w-10 h-[2.5px] bg-[#00B67A] rounded-full mt-2 transition-all duration-300 group-hover:w-16"></div>
                            </a>
                            <p className="text-sm text-slate-400 max-w-sm mt-3 leading-relaxed font-normal">
                                Helping growing enterprises and SMEs automate manual friction, integrate legacy systems, and build workflow-first custom software.
                            </p>
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono font-medium text-slate-300 mt-5">
                                <span className="w-2 h-2 rounded-full bg-[#00B67A] animate-pulse"></span>
                                <span>AUTOMATE &bull; INNOVATE &bull; SCALE</span>
                            </div>
                        </div>

                        {/* Contact info */}
                        <div className="mt-8 space-y-3">
                            <a href="tel:+12345678900" className="flex items-center gap-3 text-xs font-semibold text-slate-300 hover:text-[#00B67A] transition-colors group">
                                <div className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center text-[#00B67A] group-hover:bg-[#00B67A] group-hover:text-white transition-all">
                                    <span className="material-symbols-outlined text-[15px]">call</span>
                                </div>
                                <span>+1 234 567 8900</span>
                            </a>
                            <a href="mailto:hello@grovix.com" className="flex items-center gap-3 text-xs font-semibold text-slate-300 hover:text-[#00B67A] transition-colors group">
                                <div className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center text-[#00B67A] group-hover:bg-[#00B67A] group-hover:text-white transition-all">
                                    <span className="material-symbols-outlined text-[15px]">mail</span>
                                </div>
                                <span>hello@grovix.com</span>
                            </a>
                            <a href="https://www.grovix.com" className="flex items-center gap-3 text-xs font-semibold text-slate-300 hover:text-[#00B67A] transition-colors group">
                                <div className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center text-[#00B67A] group-hover:bg-[#00B67A] group-hover:text-white transition-all">
                                    <span className="material-symbols-outlined text-[15px]">language</span>
                                </div>
                                <span>www.grovix.com</span>
                            </a>
                        </div>
                    </div>

                    {/* What We Do Column */}
                    <div className="md:col-span-4">
                        <div className="text-xs font-bold uppercase tracking-wider text-white mb-2 flex items-center gap-2 font-mono">
                            <span>Capabilities</span>
                            <span className="w-6 h-[2px] bg-[#00B67A] rounded-full inline-block"></span>
                        </div>
                        <ul className="space-y-3.5 mt-5 text-sm text-slate-400">
                            <li className="flex items-center gap-2.5">
                                <div className="w-5 h-5 rounded-md bg-white/[0.06] border border-white/10 flex items-center justify-center text-[#00B67A]">
                                    <span className="material-symbols-outlined text-[13px]">settings</span>
                                </div>
                                <a href="#features" className="hover:text-white transition-colors font-medium">Custom ERP &amp; CRM</a>
                            </li>
                            <li className="flex items-center gap-2.5">
                                <div className="w-5 h-5 rounded-md bg-white/[0.06] border border-white/10 flex items-center justify-center text-[#00B67A]">
                                    <span className="material-symbols-outlined text-[13px]">memory</span>
                                </div>
                                <a href="#features" className="hover:text-white transition-colors font-medium">AI &amp; Workflow Automation</a>
                            </li>
                            <li className="flex items-center gap-2.5">
                                <div className="w-5 h-5 rounded-md bg-white/[0.06] border border-white/10 flex items-center justify-center text-[#00B67A]">
                                    <span className="material-symbols-outlined text-[13px]">chat</span>
                                </div>
                                <a href="#features" className="hover:text-white transition-colors font-medium">WhatsApp Automation</a>
                            </li>
                            <li className="flex items-center gap-2.5">
                                <div className="w-5 h-5 rounded-md bg-white/[0.06] border border-white/10 flex items-center justify-center text-[#00B67A]">
                                    <span className="material-symbols-outlined text-[13px]">hub</span>
                                </div>
                                <a href="#features" className="hover:text-white transition-colors font-medium">API Integration &amp; Custom Tools</a>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Navigation Column */}
                    <div className="md:col-span-3">
                        <div className="text-xs font-bold uppercase tracking-wider text-white mb-4 font-mono">
                            Navigation
                        </div>
                        <ul className="space-y-2.5 text-sm text-slate-400">
                            <li><a href="#home" className="hover:text-white font-medium transition-colors">Home</a></li>
                            <li><a href="#solutions" className="hover:text-white font-medium transition-colors">Industries</a></li>
                            <li><a href="#features" className="hover:text-white font-medium transition-colors">Capabilities</a></li>
                            <li><a href="#whyus" className="hover:text-white font-medium transition-colors">Why Grovix</a></li>
                            <li><a href="#faqs" className="hover:text-white font-medium transition-colors">FAQs</a></li>
                            <li className="pt-3">
                                <a href="#cta" className="inline-flex items-center gap-2 text-xs font-bold text-[#00B67A] hover:text-[#34D399] transition-colors group">
                                    <span>Schedule Discovery Call</span>
                                    <span className="material-symbols-outlined text-[14px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Copyright, Legal Links & System Status */}
                <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
                    <div>
                        © {new Date().getFullYear()} Grovix. All rights reserved. Tech &amp; Automation Solutions.
                    </div>
                    
                    {/* Legal Links as recommended by skill audit */}
                    <div className="flex items-center gap-4">
                        <a href="#faqs" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
                        <span>&bull;</span>
                        <a href="#faqs" className="hover:text-slate-300 transition-colors">Terms of Service</a>
                        <span>&bull;</span>
                        <a href="#faqs" className="hover:text-slate-300 transition-colors">Security</a>
                    </div>

                    <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400">
                        <span className="w-2 h-2 rounded-full bg-[#00B67A]"></span>
                        <span>Enterprise Grade &bull; 99.8% Uptime SLA</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
