import React from 'react';
import { motion } from 'framer-motion';

const SolutionsSection = () => {
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    return (
        <section id="solutions" className="py-24 bg-gray-50/50 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Built for Every Business</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">Tailored workflows and intelligent automation designed specifically for the unique needs of Indian MSMEs across diverse sectors.</p>
                </div>

                <motion.div 
                    initial="hidden" 
                    whileInView="visible" 
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer} 
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {/* Manufacturing Card */}
                    <motion.div variants={fadeIn} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-indigo-100 transition-all duration-300 group">
                        <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-[28px]">precision_manufacturing</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Manufacturing</h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-8">BOM management, production planning, and raw material tracking with precise cost analysis.</p>
                        <a href="#cta" className="inline-flex items-center gap-2 text-blue-600 font-bold text-sm hover:gap-3 transition-all">
                            Explore Solutions <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                        </a>
                    </motion.div>

                    {/* Retail & Trading Card */}
                    <motion.div variants={fadeIn} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-emerald-100 transition-all duration-300 group">
                        <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-[28px]">storefront</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Retail & Trading</h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-8">Multi-warehouse inventory, barcode scanning, and lightning-fast POS integration across all your stores.</p>
                        <a href="#cta" className="inline-flex items-center gap-2 text-emerald-600 font-bold text-sm hover:gap-3 transition-all">
                            Explore Solutions <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                        </a>
                    </motion.div>

                    {/* Services Card */}
                    <motion.div variants={fadeIn} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-purple-100 transition-all duration-300 group">
                        <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-[28px]">support_agent</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Services</h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-8">Time-tracking, project-based invoicing, and subscription billing management designed for agencies.</p>
                        <a href="#cta" className="inline-flex items-center gap-2 text-purple-600 font-bold text-sm hover:gap-3 transition-all">
                            Explore Solutions <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default SolutionsSection;
