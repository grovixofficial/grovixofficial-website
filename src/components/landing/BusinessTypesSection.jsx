import React from 'react';
import { motion } from 'framer-motion';
import { businessTypes } from './landingData';

const BusinessTypesSection = () => {
    const fadeIn = {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const [featured, second, third, fourth, fifth] = businessTypes;

    return (
        <section id="solutions" className="py-28 bg-transparent relative">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="inline-flex items-center gap-2 bg-[#E6F7F0] border border-[#00B67A]/30 text-[#0B192C] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4 shadow-xs">
                        <span className="material-symbols-outlined text-[14px] text-[#00B67A]">domain</span>
                        Industry Solutions
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B192C] tracking-tight mb-4 font-heading">
                        Practical Solutions for Key SME Industries
                    </h2>
                    <p className="text-slate-600 max-w-2xl mx-auto text-base sm:text-lg font-normal leading-relaxed">
                        Grovix helps growing businesses across manufacturing, distribution, retail, transport, and services eliminate repetitive manual work with software built around their actual workflow.
                    </p>
                </div>

                <motion.div 
                    initial="hidden" 
                    whileInView="visible" 
                    viewport={{ once: true, margin: "-80px" }}
                    variants={staggerContainer} 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {/* Featured Bento Card: Manufacturing & Job Works (Spans 2 cols on lg) */}
                    <motion.div
                        variants={fadeIn}
                        className="lg:col-span-2 glass-card rounded-3xl p-8 sm:p-10 border border-slate-200/90 hover:border-[#6366F1]/40 hover:shadow-[0_20px_40px_-15px_rgba(99,102,241,0.18)] transition-all duration-300 group flex flex-col justify-between relative overflow-hidden"
                    >
                        <div 
                            className="absolute top-0 left-0 right-0 h-1.5 opacity-90 group-hover:opacity-100 transition-opacity"
                            style={{ background: 'linear-gradient(90deg, #6366F1, #06B6D4, transparent)' }}
                        />
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div 
                                        className="w-13 h-13 rounded-2xl flex items-center justify-center p-3.5 border transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-3deg]"
                                        style={{ 
                                            backgroundColor: featured.bg, 
                                            borderColor: featured.border,
                                            boxShadow: `0 4px 16px ${featured.color}20`
                                        }}
                                    >
                                        <span className="material-symbols-outlined text-[26px]" style={{ color: featured.color }}>
                                            {featured.icon}
                                        </span>
                                    </div>
                                    <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-[#EEF2FF] text-[#6366F1] border border-[#6366F1]/20">
                                        Featured Core Industry
                                    </span>
                                </div>
                                <h3 className="text-2xl sm:text-3xl font-bold text-[#0B192C] mb-3 font-heading">
                                    {featured.title}
                                </h3>
                                <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
                                    {featured.desc}
                                </p>
                            </div>

                            {/* Live Architecture Micro-Chips */}
                            <div className="flex flex-wrap md:flex-col gap-2 shrink-0 md:min-w-[190px]">
                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-medium text-slate-700">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#00B67A]" />
                                    <span>BOM &amp; Job Tracking</span>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-medium text-slate-700">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#6366F1]" />
                                    <span>Machine Capacity Flow</span>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-medium text-slate-700">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4]" />
                                    <span>WhatsApp Dispatch Alerts</span>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                            <a 
                                href="#cta" 
                                className="inline-flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-[#0B192C] group-hover:text-[#6366F1] transition-colors"
                            >
                                <span>Discuss Manufacturing Workflow</span>
                                <span className="material-symbols-outlined text-[16px] text-[#6366F1] group-hover:translate-x-1.5 transition-transform">
                                    arrow_forward
                                </span>
                            </a>
                            <span className="text-[11px] font-mono text-slate-600">
                                Average Deployment: 14 Days
                            </span>
                        </div>
                    </motion.div>

                    {/* Bento Card: Wholesale & Distribution */}
                    <motion.div
                        variants={fadeIn}
                        className="glass-card rounded-3xl p-8 border border-slate-200/90 hover:border-[#F59E0B]/40 hover:shadow-[0_20px_40px_-15px_rgba(245,158,11,0.18)] transition-all duration-300 group flex flex-col justify-between relative overflow-hidden"
                    >
                        <div 
                            className="absolute top-0 left-0 right-0 h-1.5 opacity-90 group-hover:opacity-100 transition-opacity"
                            style={{ background: 'linear-gradient(90deg, #F59E0B, transparent)' }}
                        />
                        <div>
                            <div 
                                className="w-13 h-13 rounded-2xl flex items-center justify-center p-3.5 mb-6 border transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-3deg]"
                                style={{ 
                                    backgroundColor: second.bg, 
                                    borderColor: second.border,
                                    boxShadow: `0 4px 16px ${second.color}20`
                                }}
                            >
                                <span className="material-symbols-outlined text-[26px]" style={{ color: second.color }}>
                                    {second.icon}
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-[#0B192C] mb-2.5 font-heading">
                                {second.title}
                            </h3>
                            <p className="text-slate-600 text-sm leading-relaxed mb-6 font-normal">
                                {second.desc}
                            </p>
                        </div>
                        <a 
                            href="#cta" 
                            className="inline-flex items-center justify-between font-bold text-xs uppercase tracking-wider text-[#0B192C] group-hover:text-[#F59E0B] transition-colors pt-4 border-t border-slate-100"
                        >
                            <span>Discuss Distribution Flow</span>
                            <span className="material-symbols-outlined text-[15px] text-[#F59E0B] group-hover:translate-x-1.5 transition-transform">
                                arrow_forward
                            </span>
                        </a>
                    </motion.div>

                    {/* Row 2: 3 Balanced Columns */}
                    {[third, fourth, fifth].map((type, idx) => (
                        <motion.div 
                            key={idx} 
                            variants={fadeIn} 
                            className="glass-card rounded-3xl p-8 border border-slate-200/90 transition-all duration-300 group flex flex-col justify-between relative overflow-hidden hover-card-elevate"
                            style={{
                                '--card-accent': type.color,
                            }}
                        >
                            <div 
                                className="absolute top-0 left-0 right-0 h-1.5 opacity-80 group-hover:opacity-100 transition-opacity"
                                style={{ background: `linear-gradient(90deg, transparent, ${type.color}, transparent)` }}
                            />

                            <div>
                                <div 
                                    className="w-13 h-13 rounded-2xl flex items-center justify-center p-3.5 mb-6 border transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-3deg]"
                                    style={{ 
                                        backgroundColor: type.bg, 
                                        borderColor: type.border,
                                        boxShadow: `0 4px 16px ${type.color}15`
                                    }}
                                >
                                    <span className="material-symbols-outlined text-[26px]" style={{ color: type.color }}>
                                        {type.icon}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-[#0B192C] mb-2.5 font-heading">
                                    {type.title}
                                </h3>
                                <p className="text-slate-600 text-sm leading-relaxed mb-6 font-normal">
                                    {type.desc}
                                </p>
                            </div>
                            <a 
                                href="#cta" 
                                className="inline-flex items-center justify-between font-bold text-xs uppercase tracking-wider text-[#0B192C] transition-colors pt-4 border-t border-slate-100"
                            >
                                <span className="group-hover:text-[#0B192C]">Discuss Solution</span>
                                <span 
                                    className="material-symbols-outlined text-[15px] group-hover:translate-x-1.5 transition-transform"
                                    style={{ color: type.color }}
                                >
                                    arrow_forward
                                </span>
                            </a>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default BusinessTypesSection;
