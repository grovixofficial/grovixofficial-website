import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqs } from './landingData';

const FAQSection = () => {
    // Accordion state: by default closed (-1) or toggleable
    const [openFAQ, setOpenFAQ] = useState(-1);

    const toggleFAQ = (idx) => {
        setOpenFAQ(prev => (prev === idx ? -1 : idx));
    };

    return (
        <section id="faqs" className="py-24 sm:py-32 bg-white relative overflow-hidden selection:bg-slate-200">
            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
                
                {/* ── Top Full-Width Divider Line with Angled Tab (Exact Match to Reference) ── */}
                <div className="w-full relative mb-6">
                    {/* Continuous subtle horizontal line */}
                    <div className="w-full h-[1px] bg-[#E5E7EB]" />
                    
                    {/* Thicker grey tab sitting on top with 45-degree angled right cut */}
                    <div 
                        className="absolute -top-[5px] left-0 h-[6px] w-36 bg-[#E5E7EB]"
                        style={{
                            clipPath: 'polygon(0 0, 100% 0, calc(100% - 6px) 100%, 0 100%)'
                        }}
                    />
                </div>

                {/* ── 2-Column Layout ── */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pt-2">
                    
                    {/* ══ LEFT COLUMN: /FAQ Tag & 3-Line Stacked Title ══ */}
                    <div className="lg:col-span-5 lg:sticky lg:top-28">
                        {/* /FAQ Label */}
                        <div className="text-[12px] font-mono font-medium text-[#4B5563] uppercase tracking-wider mb-6">
                            /FAQ
                        </div>

                        {/* Heavy 3-Line Stacked Heading (Exact Match to Reference) */}
                        <h2 className="text-5xl sm:text-6xl lg:text-[70px] font-extrabold text-[#0B192C] tracking-[-0.04em] leading-[0.98] font-heading">
                            Frequently<br />
                            Asked<br />
                            Questions
                        </h2>
                    </div>

                    {/* ══ RIGHT COLUMN: Chamfered Accordion Cards ══ */}
                    <div className="lg:col-span-7 flex flex-col space-y-4">
                        {faqs.map((faq, idx) => {
                            const isOpen = openFAQ === idx;

                            return (
                                <div
                                    key={idx}
                                    className="group cursor-pointer bg-[#F3F4F6] hover:bg-[#EBECEF] transition-colors duration-200"
                                    style={{
                                        clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 22px), calc(100% - 22px) 100%, 0 100%)',
                                    }}
                                    onClick={() => toggleFAQ(idx)}
                                >
                                    {/* Card Header Row */}
                                    <div className="flex items-center justify-between px-7 py-5 sm:px-8 sm:py-6">
                                        <span className="text-[16px] sm:text-[17px] font-normal text-[#18181B] pr-6 select-none leading-normal">
                                            {faq.question}
                                        </span>

                                        {/* Square Plus (+) Button */}
                                        <div
                                            className={`w-9 h-9 rounded-[3px] bg-[#E5E7EB] flex items-center justify-center shrink-0 transition-all duration-200 ${
                                                isOpen ? 'rotate-45 bg-[#D4D4D8]' : 'group-hover:bg-[#DCDCE0]'
                                            }`}
                                        >
                                            <svg
                                                className="w-4 h-4 text-[#18181B]"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.75"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <line x1="12" y1="5" x2="12" y2="19" />
                                                <line x1="5" y1="12" x2="19" y2="12" />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Expandable Accordion Body */}
                                    <AnimatePresence initial={false}>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                                                className="overflow-hidden"
                                            >
                                                <div className="px-7 sm:px-8 pb-6 pt-1 text-[#52525B] text-[15px] leading-relaxed border-t border-black/[0.04]">
                                                    {faq.answer}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default FAQSection;
