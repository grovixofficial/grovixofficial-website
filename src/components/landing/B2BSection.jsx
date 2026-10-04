import React, { useState } from 'react';
import { motion } from 'framer-motion';

const services = [
    {
        id: 'erp-crm',
        icon: 'dashboard_customize',
        badge: '01. Enterprise Systems',
        title: 'Custom ERP & CRM',
        desc: 'Build modular ERP and CRM solutions engineered around your actual business workflow instead of rigid off-the-shelf software.',
        sampleTrigger: 'Lead closed ➔ Auto-generate proforma invoice & task queue',
        points: [
            'Tailored GST & party billing rules',
            'Multi-branch inventory & warehouse sync',
            'Lead pipeline & customer relationship records',
            'Purchase approvals & vendor accounts ledger'
        ]
    },
    {
        id: 'ai-workflow',
        icon: 'auto_awesome',
        badge: '02. Smart Operations',
        title: 'AI & Workflow Automation',
        desc: 'Leverage practical AI to automate document processing, physical bill entry, exception detection, and customer support triage.',
        sampleTrigger: 'Scanned vendor bill ➔ 14 line items extracted to ERP in 1.2s',
        points: [
            'Intelligent OCR extraction from bills & PDFs',
            'Automated PO & vendor quote parsing',
            'Proactive delay & inventory shortage alerts',
            'Daily morning operational digest for owners'
        ]
    },
    {
        id: 'whatsapp',
        icon: 'chat',
        badge: '03. Client Communication',
        title: 'WhatsApp Automation',
        desc: 'Automate customer communications, order dispatches, payment follow-ups, and instant notifications directly on WhatsApp.',
        sampleTrigger: 'Overdue ledger ➔ Automated polite WhatsApp payment reminder',
        points: [
            'Order confirmation & live dispatch alerts',
            'Automated overdue payment reminder sequences',
            '24/7 customer order status & FAQ assistants',
            'Internal shop-floor & team alert notifications'
        ]
    },
    {
        id: 'api-tools',
        icon: 'hub',
        badge: '04. Seamless Connection',
        title: 'API Integration & Tools',
        desc: 'Connect your spreadsheets, Tally, SAP, payment gateways, and databases into one continuous automated data flow.',
        sampleTrigger: 'Bank webhook ➔ Instant ledger reconciliation in accounts',
        points: [
            'TallyPrime & Excel real-time data sync',
            'SAP RFC / BAPI connectors & add-ons',
            'Payment gateway & banking webhooks',
            'Secure cloud databases & REST API endpoints'
        ]
    },
    {
        id: 'business-automation',
        icon: 'sync_alt',
        badge: '05. Core Efficiency',
        title: 'Business Automation',
        desc: 'Eliminate repetitive manual tasks and eliminate duplicate copy-paste data re-entry across company departments.',
        sampleTrigger: 'Order captured ➔ Auto-sync to accounts & dispatch queue',
        points: [
            'Cross-system automated data synchronization',
            'Event-driven scheduled background triggers',
            '1-Click digital management approval routing',
            'Zero human error from manual spreadsheet re-typing'
        ]
    },
    {
        id: 'custom-software',
        icon: 'code_blocks',
        badge: '06. Bespoke Architecture',
        title: 'Custom Software',
        desc: 'Engineer fast, clean web tools, dealer portals, and mobile field interfaces made specifically for how your team works.',
        sampleTrigger: 'Client portal file upload ➔ Auto-assigned job card',
        points: [
            '100% tailor-made operational tools without bloat',
            'Client, dealer & vendor self-service portals',
            'Lightweight field-staff mobile interfaces',
            'Scalable architecture that expands with your growth'
        ]
    }
];

const B2BSection = () => {
    const [hoveredCard, setHoveredCard] = useState(null);

    return (
        <section id="services" className="py-28 bg-[#0B192C] text-white relative overflow-hidden">
            {/* Subtle Grovix Architectural Grid Background */}
            <div className="absolute inset-0 grovix-grid-dark opacity-40 pointer-events-none"></div>

            {/* Ambient Background Aura */}
            <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#00B67A]/10 rounded-full blur-[140px] pointer-events-none"></div>
            <div className="absolute bottom-10 left-0 w-[400px] h-[400px] bg-[#00B67A]/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                    
                    {/* ── Sticky Left Column: Section Heading & Brand Story ── */}
                    <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-6">
                        {/* Eyebrow badge matching business card */}
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00B67A]/15 border border-[#00B67A]/30 text-[#00B67A] text-xs font-bold uppercase tracking-widest shadow-xs">
                            <span className="w-2 h-2 rounded-full bg-[#00B67A]"></span>
                            What We Do
                        </div>

                        <div>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
                                Tailored Software &amp;{' '}
                                <span className="text-[#00B67A]">
                                    Automation Solutions
                                </span>
                            </h2>
                            <div className="w-16 h-1 bg-[#00B67A] rounded-full mt-4"></div>
                        </div>

                        <p className="text-gray-300 text-base leading-relaxed font-normal">
                            We don't force rigid, generic software onto your company. We map your actual workflow, automate repetitive manual handoffs, and engineer custom tools that your ground team adopts effortlessly.
                        </p>

                        {/* Capabilities Quick List (from back of business card) */}
                        <div className="pt-2 space-y-2.5">
                            {[
                                { label: 'Custom ERP & CRM Systems', icon: 'dashboard_customize' },
                                { label: 'AI & Workflow Automation', icon: 'auto_awesome' },
                                { label: 'WhatsApp Automation & Alerts', icon: 'chat' },
                                { label: 'API Integration & Tools', icon: 'hub' },
                            ].map((cap, i) => (
                                <div key={i} className="flex items-center gap-3 text-xs font-semibold text-gray-300 bg-white/[0.04] p-2.5 rounded-xl border border-white/5">
                                    <div className="w-7 h-7 rounded-lg bg-[#00B67A]/15 flex items-center justify-center text-[#00B67A] shrink-0">
                                        <span className="material-symbols-outlined text-[16px]">{cap.icon}</span>
                                    </div>
                                    <span>{cap.label}</span>
                                    <span className="ml-auto text-[#00B67A]">✓</span>
                                </div>
                            ))}
                        </div>

                        <div className="pt-4">
                            <a 
                                href="#cta" 
                                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#00B67A] hover:bg-[#059669] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg hover:shadow-[#00B67A]/25 hover:-translate-y-0.5"
                            >
                                <span>Discuss Your Workflow Bottleneck</span>
                                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                            </a>
                        </div>
                    </div>

                    {/* ── Right Column: Interactive Service Cards ── */}
                    <div className="lg:col-span-7 space-y-6">
                        {services.map((service, idx) => {
                            const isHovered = hoveredCard === service.id;
                            return (
                                <motion.div 
                                    key={service.id}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                                    onMouseEnter={() => setHoveredCard(service.id)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                    className={`relative rounded-3xl p-7 sm:p-8 transition-all duration-300 border ${
                                        isHovered 
                                            ? 'bg-white/[0.08] border-[#00B67A]/50 shadow-2xl -translate-y-1' 
                                            : 'bg-white/[0.035] border-white/10 hover:bg-white/[0.05] hover:border-white/20'
                                    }`}
                                >
                                    {/* Top row */}
                                    <div className="flex items-center justify-between mb-5">
                                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center p-2.5 bg-[#00B67A]/15 border border-[#00B67A]/30 text-[#00B67A] transition-transform duration-300 group-hover:scale-110">
                                            <span className="material-symbols-outlined text-[24px]">
                                                {service.icon}
                                            </span>
                                        </div>
                                        <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#00B67A]/15 text-[#00B67A] border border-[#00B67A]/30">
                                            {service.badge}
                                        </span>
                                    </div>

                                    <h3 className="text-xl sm:text-2xl font-bold mb-2.5 text-white">
                                        {service.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm leading-relaxed mb-5 font-normal">
                                        {service.desc}
                                    </p>

                                    {/* Live Trigger Pipeline Chip */}
                                    <div className="mb-6 p-3 rounded-xl bg-black/30 border border-white/10 flex items-center gap-2.5">
                                        <span className="flex h-2 w-2 relative shrink-0">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00B67A] opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00B67A]"></span>
                                        </span>
                                        <span className="text-[11px] font-mono text-gray-300 truncate">
                                            {service.sampleTrigger}
                                        </span>
                                    </div>
                                    
                                    <div className="grid sm:grid-cols-2 gap-2 mb-6">
                                        {service.points.map((pt, pIdx) => (
                                            <div key={pIdx} className="flex items-start gap-2 text-xs text-gray-300 font-medium">
                                                <span className="material-symbols-outlined text-[15px] text-[#00B67A] shrink-0 mt-0.5">check_circle</span>
                                                <span>{pt}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <a 
                                        href="#cta" 
                                        className="inline-flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-[#00B67A] hover:text-white transition-colors pt-4 border-t border-white/10"
                                    >
                                        <span>Automate with Grovix</span> 
                                        <span className="material-symbols-outlined text-[15px] transition-transform duration-200 hover:translate-x-1">arrow_forward</span>
                                    </a>
                                </motion.div>
                            );
                        })}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default B2BSection;
