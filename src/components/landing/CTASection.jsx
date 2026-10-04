import React, { useState } from 'react';
import { motion } from 'framer-motion';

const bottlenecks = [
    {
        id: 'wa-chaos',
        label: 'WhatsApp Order & Dispatch Chaos',
        icon: 'chat',
        topic: 'WhatsApp Automation & Dispatch Alerts',
        recommendation: 'Grovix Automated WhatsApp Engine + Instant Delivery Webhook (Average setup: 10-14 days)',
        color: '#00B67A',
    },
    {
        id: 'slow-billing',
        label: 'Slow Invoice & Excel Data Entry',
        icon: 'table_chart',
        topic: 'Document OCR & Automated Billing Sync',
        recommendation: 'Document OCR Pipeline + Automated GST Accounting Ledger Sync (Eliminates 90% re-typing)',
        color: '#8B5CF6',
    },
    {
        id: 'sap-tally-desync',
        label: 'Disconnected Tally / SAP Systems',
        icon: 'sync',
        topic: 'ERP & SAP Real-Time Integration',
        recommendation: 'Two-way BAPI / RFC Connectors + Lightweight Ground Mobile Tools (Zero manual handoffs)',
        color: '#06B6D4',
    },
    {
        id: 'custom-portal',
        label: 'Need Custom Tool / Client Portal',
        icon: 'code_blocks',
        topic: 'Tailor-Made Business Software',
        recommendation: 'Bespoke Cloud Web Portal & Role-Based Operational Engine (Engineered around your exact team)',
        color: '#6366F1',
    }
];

const CTASection = () => {
    const [selectedBottleneck, setSelectedBottleneck] = useState(bottlenecks[0]);

    const mailtoUrl = `mailto:hello@grovix.com?subject=${encodeURIComponent(
        `Grovix Automation Discovery: ${selectedBottleneck.topic}`
    )}&body=${encodeURIComponent(
        `Hi Grovix Team,\n\nI would like to discuss automating: ${selectedBottleneck.topic} in our business.\n\nCompany Name:\nTeam Size:\nPhone Number:\n`
    )}`;

    return (
        <section id="cta" className="py-28 bg-[#07101E] text-white relative overflow-hidden">
            {/* Background Multi-Color Glows */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#8B5CF6]/10 rounded-full blur-[140px]"></div>
                <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#06B6D4]/10 rounded-full blur-[140px]"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00B67A]/12 rounded-full blur-[150px]"></div>
                <div
                    className="absolute inset-0 opacity-[0.035]"
                    style={{
                        backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                        backgroundSize: '32px 32px',
                    }}
                />
            </div>

            <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00B67A]/10 border border-[#00B67A]/25 text-[#00B67A] text-xs font-bold uppercase tracking-wider mb-6"
                >
                    <span className="material-symbols-outlined text-[14px]">rocket_launch</span>
                    Start Your Automation Journey
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6 font-heading"
                >
                    Ready to Eliminate Repetitive Work in Your Business?
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 }}
                    className="text-base sm:text-lg text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed font-normal"
                >
                    Select your primary operational pain point below to see the recommended automation approach and connect directly with our engineering team:
                </motion.p>

                {/* Interactive Bottleneck Selector Chips */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="mb-8"
                >
                    <div className="text-xs font-bold uppercase tracking-widest text-[#06B6D4] mb-3">
                        What is your team's biggest daily bottleneck?
                    </div>
                    <div className="flex flex-wrap justify-center gap-2.5 max-w-3xl mx-auto">
                        {bottlenecks.map((item) => {
                            const isSelected = selectedBottleneck.id === item.id;
                            return (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => setSelectedBottleneck(item)}
                                    className="px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-2 border cursor-pointer"
                                    style={{
                                        backgroundColor: isSelected ? item.color : 'rgba(255,255,255,0.05)',
                                        borderColor: isSelected ? item.color : 'rgba(255,255,255,0.1)',
                                        color: isSelected ? '#FFFFFF' : '#CBD5E1',
                                        boxShadow: isSelected ? `0 8px 24px ${item.color}45` : 'none',
                                        transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                                    }}
                                >
                                    <span 
                                        className="material-symbols-outlined text-[16px]"
                                        style={{ color: isSelected ? '#FFFFFF' : item.color }}
                                    >
                                        {item.icon}
                                    </span>
                                    <span>{item.label}</span>
                                    {isSelected && <span className="text-white font-black">✓</span>}
                                </button>
                            );
                        })}
                    </div>

                    {/* Dynamic Recommendation Box */}
                    <div 
                        className="mt-5 p-4 rounded-2xl bg-white/[0.04] border max-w-xl mx-auto backdrop-blur-md transition-colors duration-300"
                        style={{ borderColor: `${selectedBottleneck.color}40` }}
                    >
                        <div 
                            className="flex items-center justify-center gap-2 text-xs font-bold mb-1"
                            style={{ color: selectedBottleneck.color }}
                        >
                            <span className="material-symbols-outlined text-[16px]">verified</span>
                            Recommended Grovix Solution
                        </div>
                        <p className="text-gray-200 text-xs sm:text-sm font-medium">
                            {selectedBottleneck.recommendation}
                        </p>
                    </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.25 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
                >
                    <a
                        href={mailtoUrl}
                        className="relative overflow-hidden group w-full sm:w-auto px-10 py-4 sm:py-5 bg-gradient-to-r from-[#00B67A] via-[#06B6D4] to-[#6366F1] hover:brightness-110 text-white text-[15px] sm:text-[16px] font-bold rounded-2xl shadow-xl shadow-[#00B67A]/25 transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2"
                    >
                        <span className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12 group-hover:left-[100%] transition-all duration-700"></span>
                        <span>Talk to Grovix About {selectedBottleneck.topic.split(' ')[0]}</span>
                        <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">arrow_forward</span>
                    </a>
                    <a
                        href="#features"
                        className="w-full sm:w-auto px-8 py-4 sm:py-5 bg-white/10 hover:bg-white/20 text-white border border-white/15 text-[15px] sm:text-[16px] font-bold rounded-2xl transition-all duration-300 backdrop-blur-sm text-center hover:-translate-y-0.5"
                    >
                        Explore All Solutions
                    </a>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.35 }}
                    className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-gray-400 font-medium"
                >
                    {[
                        { icon: 'task_alt', text: 'Free 30-min workflow analysis' },
                        { icon: 'hub', text: 'No rip-and-replace required' },
                        { icon: 'support_agent', text: 'Direct access to automation engineers' },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[15px] text-[#00B67A]">{item.icon}</span>
                            <span>{item.text}</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default CTASection;
