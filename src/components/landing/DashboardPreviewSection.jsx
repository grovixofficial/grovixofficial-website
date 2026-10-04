import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// 8-Step Engineering Methodology for Grovix
const processSteps = [
    { step: '01', title: 'Bottleneck Discovery', desc: 'You show us your repetitive daily tasks, manual entries & operational headaches.', icon: 'search' },
    { step: '02', title: 'Process Mapping', desc: 'We map out your data, handoffs, and rules before engineering any software.', icon: 'account_tree' },
    { step: '03', title: 'System Architecture', desc: 'Designing clean AI automations, WhatsApp pipelines & software connectors.', icon: 'draw' },
    { step: '04', title: 'Custom Build & Logic', desc: 'Building tailor-made automations and focused tools around your exact team.', icon: 'code' },
    { step: '05', title: 'Live Testing With Team', desc: 'Rigorous testing with your staff using real business invoices and orders.', icon: 'fact_check' },
    { step: '06', title: 'Phased Rollout', desc: 'Smooth zero-disruption launch while your business continues operations.', icon: 'rocket_launch' },
    { step: '07', title: 'Simple Staff Onboarding', desc: 'Simple, non-technical training so ground staff adopt it on day one.', icon: 'school' },
    { step: '08', title: 'Ongoing Engineering Support', desc: 'Continuous optimization, new feature requests, and direct developer access.', icon: 'support_agent' },
];

// Industry-Specific Business Automation Workflows for app.grovix.io/automation-console
const businessWorkflows = [
    {
        id: 'manufacturing',
        tabLabel: 'Manufacturing & Job Works',
        icon: 'precision_manufacturing',
        color: '#00B67A',
        badge: 'Shop Floor & Raw Material Automation',
        title: 'Job Work Intake ➔ BOM & Machine Queue ➔ Dispatch Alert',
        desc: 'Customer sends job-work order ➔ Grovix auto-checks raw material stock in Tally / Excel ➔ Routes digital job card to machine supervisor ➔ Generates delivery challan & WhatsApps dispatch details with live tracking.',
        manualTime: '3-4 hours daily spent on phone calls & paper registers',
        automatedTime: '< 0.4s instant routing & zero shop-floor delays',
        kpis: [
            { label: 'Active Job Cards', value: '48 In-Progress', sub: 'Across 6 lines', icon: 'precision_manufacturing', color: '#0B192C', bg: '#F1F5F9' },
            { label: 'Raw Material Stock Accuracy', value: '99.8%', sub: 'Tally auto-sync', icon: 'fact_check', color: '#00B67A', bg: '#E6F7F0' },
            { label: 'Daily Delivery Challans', value: '184 Units', sub: 'Auto-generated', icon: 'local_shipping', color: '#0284C7', bg: '#F0F9FF' },
            { label: 'Manual Work Eliminated', value: '16+ hrs/wk', sub: 'Ground staff focus', icon: 'schedule', color: '#059669', bg: '#ECFDF5' },
        ],
        nodes: [
            {
                step: 'STEP 1: INCOMING ORDER TRIGGER',
                title: 'Customer Job Work Order Received',
                detail: 'PO PDF or WhatsApp order uploaded with specs & required delivery date',
                icon: 'receipt_long',
                color: '#00B67A',
                bg: '#E6F7F0'
            },
            {
                step: 'STEP 2: GROVIX LOGIC & BOM CHECK',
                title: 'Automated BOM & Raw Material Check',
                detail: 'Verifies MS sheet & alloy stock in Tally/Excel, calculates production batch & capacity',
                icon: 'auto_awesome',
                color: '#0B192C',
                bg: '#F1F5F9'
            },
            {
                step: 'STEP 3: AUTOMATED SHOP-FLOOR ACTION',
                title: 'Digital Job Card Issued to Line',
                detail: 'Dispatches task to supervisor mobile tablet with cutting specs & machine allocation',
                icon: 'precision_manufacturing',
                color: '#00B67A',
                bg: '#E6F7F0'
            },
            {
                step: 'STEP 4: SYSTEM SYNC & CLIENT DISPATCH',
                title: 'Delivery Challan & WhatsApp Alert',
                detail: 'SAP-B1 synced, stock deducted in accounting & dispatch WhatsApped to client',
                icon: 'mark_chat_read',
                color: '#0284C7',
                bg: '#F0F9FF'
            }
        ],
        liveFeed: [
            { id: 'MFG-8402', text: 'Job Card #JC-902 (500 units MS Flange) auto-assigned to Machine Line 03', time: 'Just now', latency: '0.3s' },
            { id: 'MFG-8403', text: 'Raw material alert: CR Steel Sheet batch low (12% remaining) ➔ PO alert triggered', time: '2m ago', latency: '0.2s' },
            { id: 'MFG-8404', text: 'Delivery Challan #DC-310 + Driver live GPS link WhatsApped to Apex Engineering', time: '5m ago', latency: '0.4s' },
            { id: 'MFG-8405', text: 'Inspection QA sign-off completed on tablet ➔ Tally finished goods ledger updated', time: '9m ago', latency: '0.3s' },
        ],
        simulationAction: 'Simulate Incoming Manufacturing Job Order'
    },
    {
        id: 'wholesale',
        tabLabel: 'Wholesale & Distribution',
        icon: 'warehouse',
        color: '#10b981',
        badge: 'Multi-Branch Inventory & Party Payment Recovery',
        title: 'B2B Dealer WhatsApp Order ➔ Depot Allocation ➔ Auto Payment Follow-up',
        desc: 'Distributor messages order on WhatsApp ➔ Grovix verifies stock across 3 regional depots & party credit limit ➔ Generates GST invoice & sets up polite automated WhatsApp reminders with UPI link.',
        manualTime: 'Staff spends 35 mins per order & hours chasing overdue payments',
        automatedTime: '< 0.3s instant quote & automated cash recovery',
        kpis: [
            { label: 'Active B2B Parties', value: '412 Dealers', sub: 'Across 4 states', icon: 'groups', color: '#10b981', bg: '#ecfdf5' },
            { label: 'Multi-Depot Stock Sync', value: '100% Real-time', sub: 'Zero stock-outs', icon: 'warehouse', color: '#0ea5e9', bg: '#f0f9ff' },
            { label: 'Outstanding Recovery', value: '+38% Faster', sub: 'Polite WhatsApp sequence', icon: 'trending_up', color: '#00B67A', bg: '#E6F7F0' },
            { label: 'Weekly Repetitive Saved', value: '18+ hrs/wk', sub: 'Per accounting team', icon: 'schedule', color: '#059669', bg: '#ECFDF5' },
        ],
        nodes: [
            {
                step: 'STEP 1: INCOMING ORDER TRIGGER',
                title: 'WhatsApp Message from Dealer',
                detail: '"Need 120 cartons of SKU-884 delivered to Ahmedabad depot by Friday"',
                icon: 'chat',
                color: '#10B981',
                bg: '#ECFDF5'
            },
            {
                step: 'STEP 2: GROVIX LOGIC & CREDIT CHECK',
                title: 'Multi-Warehouse Check & Pricing Slab',
                detail: 'Checks stock in nearest hub, applies Tier-1 dealer rate & verifies party ledger limit',
                icon: 'hub',
                color: '#0B192C',
                bg: '#F1F5F9'
            },
            {
                step: 'STEP 3: AUTOMATED BILLING ACTION',
                title: 'Instant GST Invoice & Dispatch Order',
                detail: 'Generates branded PDF invoice with UPI payment link & auto-alerts warehouse packing team',
                icon: 'receipt',
                color: '#00B67A',
                bg: '#E6F7F0'
            },
            {
                step: 'STEP 4: SYSTEM SYNC & RECOVERY',
                title: 'Tally Voucher Posted & Follow-up Active',
                detail: 'Sales entry logged in Tally; automated polite WhatsApp reminder scheduled on day 15',
                icon: 'sync',
                color: '#0284C7',
                bg: '#F0F9FF'
            }
        ],
        liveFeed: [
            { id: 'WHS-101', text: 'Dealer Maheshwari Bros: Order #4892 (120 ctns) allocated from Surat Hub', time: 'Just now', latency: '0.3s' },
            { id: 'WHS-102', text: 'GST Tax Invoice #INV-8831 generated & WhatsApped to Party Patel Trading', time: '1m ago', latency: '0.4s' },
            { id: 'WHS-103', text: 'Overdue payment reminder delivered for Invoice #8120 ➔ ₹48,500 collected via UPI link', time: '4m ago', latency: '0.2s' },
            { id: 'WHS-104', text: 'Multi-branch stock transfer #ST-44 auto-reconciled in central inventory database', time: '8m ago', latency: '0.3s' },
        ],
        simulationAction: 'Simulate Incoming Dealer WhatsApp Order'
    },
    {
        id: 'retail',
        tabLabel: 'Retail & Multi-Store',
        icon: 'storefront',
        color: '#0D9488',
        badge: 'Omnichannel POS & Customer Re-engagement',
        title: 'Register Barcode Scan ➔ Cloud Central Stock ➔ WhatsApp Digital Bill',
        desc: 'Customer purchases at store counter ➔ Central stock updates across all branches & online portal ➔ Digital bill sent directly to customer WhatsApp with points balance & repeat re-order nudge.',
        manualTime: 'Paper bill printing, manual ledger entry & lost customer retention',
        automatedTime: '< 0.2s instant cloud sync & zero paper waste',
        kpis: [
            { label: 'Daily POS Bills Synced', value: '1,420 Bills', sub: 'Across 4 branches', icon: 'point_of_sale', color: '#00B67A', bg: '#E6F7F0' },
            { label: 'Cloud Stock Variance', value: '< 0.1%', sub: 'Real-time barcode sync', icon: 'checklist', color: '#10B981', bg: '#ECFDF5' },
            { label: 'WhatsApp Bill Open Rate', value: '96.4%', sub: 'Direct mobile delivery', icon: 'mark_chat_read', color: '#0B192C', bg: '#F1F5F9' },
            { label: 'Customer Repeat Purchases', value: '+24%', sub: 'Automated re-order nudges', icon: 'loyalty', color: '#0284C7', bg: '#F0F9FF' },
        ],
        nodes: [
            {
                step: 'STEP 1: INCOMING TRIGGER',
                title: 'Store Register Barcode Scan',
                detail: 'Counter staff scans item barcode & confirms customer mobile number at POS terminal',
                icon: 'qr_code_scanner',
                color: '#0D9488',
                bg: '#F0FDFA'
            },
            {
                step: 'STEP 2: GROVIX LOGIC & CLOUD SYNC',
                title: 'Multi-Outlet Stock Allocation',
                detail: 'Instantly deducts inventory in branch store & updates e-commerce catalog stock',
                icon: 'cloud_sync',
                color: '#0B192C',
                bg: '#F1F5F9'
            },
            {
                step: 'STEP 3: AUTOMATED CLIENT ACTION',
                title: 'WhatsApp Digital Bill & Loyalty Points',
                detail: 'Customer receives PDF tax bill on WhatsApp with 150 bonus loyalty points banner',
                icon: 'send_to_mobile',
                color: '#00B67A',
                bg: '#E6F7F0'
            },
            {
                step: 'STEP 4: SYSTEM SYNC & RE-ORDER',
                title: 'Daily Tally Voucher & Re-engagement',
                detail: 'Sales posted to Tally nightly; VIP repeat order message scheduled in 30 days',
                icon: 'notifications_active',
                color: '#0284C7',
                bg: '#F0F9FF'
            }
        ],
        liveFeed: [
            { id: 'RET-201', text: 'Branch Store #02 (MG Road): Bill #POS-7741 synced to Central Cloud Stock', time: 'Just now', latency: '0.2s' },
            { id: 'RET-202', text: 'WhatsApp digital bill + 120 loyalty points delivered to Customer (+91-98982-XXXXX)', time: '2m ago', latency: '0.3s' },
            { id: 'RET-203', text: 'Low stock warning: Premium Cotton Shirt (L) only 4 units remaining across all stores', time: '5m ago', latency: '0.4s' },
            { id: 'RET-204', text: 'Automated 30-day replenishment reminder sent to 14 VIP customers with 10% coupon', time: '11m ago', latency: '0.2s' },
        ],
        simulationAction: 'Simulate In-Store POS Checkout & Digital Bill'
    },
    {
        id: 'logistics',
        tabLabel: 'Logistics & Fleet',
        icon: 'local_shipping',
        color: '#0284C7',
        badge: 'Trip Milestones & Driver Expense Automation',
        title: 'Paper Bilty (LR) OCR ➔ Milestone WhatsApp Alerts ➔ Digital POD Settlement',
        desc: 'Driver snaps photo of physical transport bilty (LR) ➔ Grovix AI OCR parses consignment weight & freight ➔ Consignee receives automated live WhatsApp milestone updates ➔ Driver trip expense auto-settled upon digital POD.',
        manualTime: 'Lost paper slips, endless driver calls & delayed freight settlement',
        automatedTime: '< 0.6s instant OCR entry & automated live tracking',
        kpis: [
            { label: 'Active Fleet Monitored', value: '36 Trucks', sub: 'Live transit tracking', icon: 'local_shipping', color: '#0284C7', bg: '#F0F9FF' },
            { label: 'Paper Bilty AI OCR Speed', value: '< 0.8s', sub: '99.4% field accuracy', icon: 'document_scanner', color: '#00B67A', bg: '#E6F7F0' },
            { label: 'Milestone Alerts Sent', value: '540+ Daily', sub: 'Zero consignee calls', icon: 'chat', color: '#10B981', bg: '#ECFDF5' },
            { label: 'Trip Expense Settlement', value: 'Same Day', sub: 'Digital POD verification', icon: 'task_alt', color: '#0D9488', bg: '#F0FDFA' },
        ],
        nodes: [
            {
                step: 'STEP 1: INCOMING TRIGGER',
                title: 'Driver Scans Paper Bilty / LR',
                detail: 'Photo of physical Lorry Receipt (LR) uploaded directly via simple WhatsApp flow',
                icon: 'camera_alt',
                color: '#0284C7',
                bg: '#F0F9FF'
            },
            {
                step: 'STEP 2: GROVIX AI & ROUTE LOGIC',
                title: 'AI OCR Ingestion & Trip Verification',
                detail: 'Extracts consignor, consignee, truck number, weight (18.4T), advance freight & destination',
                icon: 'document_scanner',
                color: '#0B192C',
                bg: '#F1F5F9'
            },
            {
                step: 'STEP 3: AUTOMATED CLIENT ACTION',
                title: 'WhatsApp Milestone Sent to Consignee',
                detail: 'Consignee receives dispatch notification with truck GPS link and driver direct contact',
                icon: 'share_location',
                color: '#00B67A',
                bg: '#E6F7F0'
            },
            {
                step: 'STEP 4: SYSTEM SYNC & POD AUDIT',
                title: 'Digital POD Signed & Ledger Reconciled',
                detail: 'Consignee signs on delivery; diesel advance & freight balance auto-settled in Tally',
                icon: 'price_check',
                color: '#059669',
                bg: '#ECFDF5'
            }
        ],
        liveFeed: [
            { id: 'LOG-301', text: 'Truck #GJ-01-XX-9402 LR scanned: Consignment weight 18.4T parsed & logged', time: 'Just now', latency: '0.6s' },
            { id: 'LOG-302', text: 'Milestone Alert: "Consignment arrived at Nagpur Transshipment Hub" sent to Consignee', time: '3m ago', latency: '0.3s' },
            { id: 'LOG-303', text: 'Digital Proof of Delivery (POD) signed by Receiver ➔ Driver advance ₹14,000 reconciled', time: '7m ago', latency: '0.4s' },
            { id: 'LOG-304', text: 'Toll & diesel expense receipt parsed via OCR and debited to vehicle expense ledger', time: '12m ago', latency: '0.5s' },
        ],
        simulationAction: 'Simulate Paper Bilty Scan & Fleet Milestone'
    },
    {
        id: 'services',
        tabLabel: 'Professional & Field Services',
        icon: 'support_agent',
        color: '#00B67A',
        badge: 'Milestone Invoicing & Client Approval Automation',
        title: 'Task Milestone Complete ➔ 1-Click Client Sign-Off ➔ Retainer Billing',
        desc: 'Field engineer or consultant marks project milestone complete ➔ Client receives instant approval request on WhatsApp ➔ Upon 1-click confirmation, GST invoice is auto-generated with payment link.',
        manualTime: 'Days spent chasing client sign-offs & manual monthly billing cycles',
        automatedTime: '< 0.3s instant milestone capture & zero payment delay',
        kpis: [
            { label: 'Active Retainer Accounts', value: '42 Clients', sub: 'Auto-billed monthly', icon: 'support_agent', color: '#00B67A', bg: '#E6F7F0' },
            { label: 'Client Sign-off Speed', value: '< 5 Mins', sub: '1-Click WhatsApp action', icon: 'touch_app', color: '#10B981', bg: '#ECFDF5' },
            { label: 'On-Time Invoice Delivery', value: '100%', sub: 'Zero missed milestones', icon: 'event_available', color: '#0284C7', bg: '#F0F9FF' },
            { label: 'Weekly Admin Saved', value: '14+ hrs/wk', sub: 'Direct consulting time', icon: 'schedule', color: '#059669', bg: '#ECFDF5' },
        ],
        nodes: [
            {
                step: 'STEP 1: INCOMING TRIGGER',
                title: 'Technician Marks Task Complete',
                detail: 'Field engineer completes equipment AMC service or consultant completes project deliverable',
                icon: 'assignment_turned_in',
                color: '#00B67A',
                bg: '#E6F7F0'
            },
            {
                step: 'STEP 2: GROVIX LOGIC & SCOPE CHECK',
                title: 'Scope Verification & Rate Terms',
                detail: 'Cross-checks client agreement rates, billable hours, and contractual deliverables',
                icon: 'policy',
                color: '#0B192C',
                bg: '#F1F5F9'
            },
            {
                step: 'STEP 3: AUTOMATED CLIENT ACTION',
                title: '1-Click Approval Request on WhatsApp',
                detail: 'Client executive receives summary message with quick "Approve Work & Issue Invoice" button',
                icon: 'chat',
                color: '#10B981',
                bg: '#ECFDF5'
            },
            {
                step: 'STEP 4: SYSTEM SYNC & CASHFLOW',
                title: 'GST Invoice Generated & Bank Sync',
                detail: 'Invoice PDF delivered with UPI QR link; accounting ledger credited upon bank webhook',
                icon: 'account_balance',
                color: '#0284C7',
                bg: '#F0F9FF'
            }
        ],
        liveFeed: [
            { id: 'SRV-401', text: 'Monthly IT AMC Milestone signed off by Client Director via 1-click WhatsApp', time: 'Just now', latency: '0.2s' },
            { id: 'SRV-402', text: 'Tax Invoice #INV-602 (₹75,000) generated with UPI QR link & delivered to Accounts', time: '2m ago', latency: '0.4s' },
            { id: 'SRV-403', text: 'Bank payment webhook received: ₹75,000 reconciled in Tally bank ledger automatically', time: '5m ago', latency: '0.3s' },
            { id: 'SRV-404', text: 'Field service technician job sheet #JS-882 archived in customer digital dossier', time: '10m ago', latency: '0.2s' },
        ],
        simulationAction: 'Simulate Field Milestone Sign-off & Billing'
    }
];

const DashboardPreviewSection = () => {
    const sectionRef = useRef(null);
    const frameRef = useRef(null);
    const glowRef = useRef(null);
    const labelRef = useRef(null);
    const subRef = useRef(null);

    const [activeTabId, setActiveTabId] = useState('manufacturing');
    const activeWorkflow = businessWorkflows.find(w => w.id === activeTabId) || businessWorkflows[0];

    const [liveEvents, setLiveEvents] = useState(activeWorkflow.liveFeed);
    const [isTriggering, setIsTriggering] = useState(false);
    const [counter, setCounter] = useState(1);

    // Update live feed whenever user switches business tab
    useEffect(() => {
        setLiveEvents(activeWorkflow.liveFeed);
    }, [activeTabId]);

    // Interactive button to simulate live business events
    const handleSimulateTrigger = () => {
        if (isTriggering) return;
        setIsTriggering(true);

        const eventPrefix = activeWorkflow.id.substring(0, 3).toUpperCase();
        const newEvent = {
            id: `${eventPrefix}-LIVE-${Math.floor(100 + Math.random() * 900)}`,
            text: `[TEST LIVE TRIGGER] ${activeWorkflow.title.split('➔')[0].trim()} simulated successfully`,
            time: 'Just now',
            latency: '0.2s',
            isNew: true
        };

        setLiveEvents(prev => [newEvent, ...prev.slice(0, 4)]);
        setCounter(c => c + 1);

        setTimeout(() => {
            setIsTriggering(false);
        }, 800);
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                [labelRef.current, subRef.current],
                { opacity: 0, y: 36 },
                {
                    opacity: 1, y: 0,
                    duration: 0.8, stagger: 0.15, ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                        toggleActions: 'play reverse play reverse',
                    }
                }
            );

            gsap.fromTo(
                frameRef.current,
                { opacity: 0, y: 80, scale: 0.96 },
                {
                    opacity: 1, y: 0, scale: 1,
                    duration: 1.0, ease: 'power4.out',
                    scrollTrigger: {
                        trigger: frameRef.current,
                        start: 'top 82%',
                        toggleActions: 'play reverse play reverse',
                    }
                }
            );

            gsap.fromTo(
                glowRef.current,
                { opacity: 0, scale: 0.7 },
                {
                    opacity: 1, scale: 1,
                    duration: 1.4, ease: 'power2.out',
                    scrollTrigger: {
                        trigger: frameRef.current,
                        start: 'top 80%',
                        toggleActions: 'play reverse play reverse',
                    }
                }
            );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="console"
            className="relative z-10 py-28 overflow-hidden"
            style={{ background: 'linear-gradient(180deg, transparent 0%, #F8FAFC 30%, #F1F5F9 70%, transparent 100%)' }}
        >
            <style>{`
                @keyframes pulseGlow {
                    0%, 100% { opacity: 0.4; }
                    50% { opacity: 0.9; }
                }
                .flow-pulse-line {
                    animation: pulseGlow 2s ease-in-out infinite;
                }
            `}</style>

            {/* ── 8-Step Engineering Methodology ── */}
            <div className="max-w-7xl mx-auto px-6 mb-20">
                <div className="text-center mb-12">
                    <div
                        ref={labelRef}
                        className="inline-flex items-center gap-2 bg-[#E6F7F0] border border-[#00B67A]/30 text-[#00B67A] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4"
                        style={{ opacity: 0 }}
                    >
                        <span className="material-symbols-outlined text-[14px]">account_tree</span>
                        Live Automation Architecture
                    </div>
                    <h2
                        ref={subRef}
                        className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B192C] tracking-tight leading-tight"
                        style={{ opacity: 0 }}
                    >
                        You Show Us Your Repetitive Work.<br />
                        <span className="text-[#00B67A] relative inline-block">
                            We Build the Software &amp; Automations to Run It.
                            <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-[#00B67A] rounded-full"></span>
                        </span>
                    </h2>
                    <p className="text-slate-600 max-w-2xl mx-auto text-base sm:text-lg mt-3 font-medium leading-relaxed">
                        We don't force rigid, pre-packaged software on your team. We map how you actually operate and engineer custom automations that take the burden off your staff.
                    </p>
                </div>

                {/* 8-step process timeline cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {processSteps.map((p, idx) => (
                        <div key={idx} className="bg-white/90 backdrop-blur-md rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-[#00B67A]/40 transition-all group">
                            <div className="flex items-center justify-between mb-3">
                                <span className="w-8 h-8 rounded-lg bg-[#E6F7F0] text-[#00B67A] font-extrabold text-xs flex items-center justify-center border border-[#00B67A]/20 group-hover:bg-[#00B67A] group-hover:text-white transition-colors">{p.step}</span>
                                <span className="material-symbols-outlined text-[20px] text-[#00B67A]">{p.icon}</span>
                            </div>
                            <h3 className="font-bold text-[#0B192C] text-sm sm:text-base mb-1">{p.title}</h3>
                            <p className="text-slate-500 text-xs leading-relaxed">{p.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Ambient Background Glow ── */}
            <div
                ref={glowRef}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full blur-[100px] -z-10 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse, rgba(0,182,122,0.12) 0%, rgba(11,25,44,0.06) 50%, transparent 80%)',
                    opacity: 0,
                }}
            />

            {/* ── Interactive Business Industry Selector ── */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-6">
                <div className="text-center mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#00B67A] bg-[#E6F7F0] border border-[#00B67A]/30 px-3 py-1 rounded-full">
                        ✨ Select Your Business Industry to See Your Live Automation Console
                    </span>
                </div>
                <div className="bg-white/95 backdrop-blur-xl border border-slate-200/80 p-1.5 rounded-2xl shadow-xs flex flex-wrap justify-center gap-1.5">
                    {businessWorkflows.map((workflow) => {
                        const isActive = activeTabId === workflow.id;
                        return (
                            <button
                                key={workflow.id}
                                type="button"
                                onClick={() => setActiveTabId(workflow.id)}
                                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-2 ${
                                    isActive
                                        ? 'bg-[#0B192C] text-white shadow-md shadow-[#0B192C]/25 scale-[1.02]'
                                        : 'text-slate-600 hover:text-[#00B67A] hover:bg-[#E6F7F0]/60'
                                }`}
                            >
                                <span className="material-symbols-outlined text-[17px]">{workflow.icon}</span>
                                <span>{workflow.tabLabel}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* ── Visual Process Automation Canvas Frame (app.grovix.io/automation-console) ── */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 relative" style={{ perspective: '1200px' }}>
                <div
                    ref={frameRef}
                    className="relative rounded-2xl sm:rounded-[24px] overflow-hidden shadow-[0_30px_90px_rgba(11,25,44,0.08),0_6px_24px_rgba(0,0,0,0.05)] border border-slate-200 bg-white"
                    style={{ opacity: 0 }}
                >
                    {/* Browser Chrome Header displaying exact requested URL */}
                    <div
                        className="flex items-center gap-3 px-4 sm:px-5 py-3 border-b bg-slate-50/90 border-slate-200/80"
                    >
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-400" />
                            <div className="w-3 h-3 rounded-full bg-amber-400" />
                            <div className="w-3 h-3 rounded-full bg-emerald-400" />
                        </div>
                        <div
                            className="flex-1 max-w-md h-6 rounded-lg flex items-center justify-center text-[11px] text-[#0B192C] font-mono font-medium truncate px-3"
                            style={{ background: '#E6F7F0', border: '1px solid rgba(0,182,122,0.3)' }}
                        >
                            🔒 app.grovix.io/automation-console?business={activeWorkflow.id}
                        </div>
                        <div className="flex items-center gap-2 ml-auto">
                            <span className="flex h-2 w-2 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00B67A] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00B67A]"></span>
                            </span>
                            <span className="hidden sm:inline text-[11px] font-bold text-[#00B67A] uppercase tracking-wider">
                                {activeWorkflow.tabLabel} Console Live
                            </span>
                        </div>
                    </div>

                    {/* Canvas Body */}
                    <div className="p-5 sm:p-7 bg-gradient-to-b from-slate-50/60 to-white">
                        
                        {/* Workflow Overview Banner */}
                        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6 pb-6 border-b border-gray-100">
                            <div>
                                <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-full mb-2">
                                    <span className="material-symbols-outlined text-[13px]">{activeWorkflow.icon}</span>
                                    {activeWorkflow.badge}
                                </div>
                                <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
                                    {activeWorkflow.title}
                                </h3>
                                <p className="text-gray-600 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
                                    {activeWorkflow.desc}
                                </p>
                            </div>

                            {/* Efficiency Comparison Pill & Simulation Trigger */}
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-white p-2.5 rounded-2xl border border-gray-200/80 shadow-sm shrink-0">
                                <div className="px-3 py-1.5 bg-red-50 text-red-600 rounded-xl text-center">
                                    <div className="text-[9px] uppercase font-bold tracking-wider text-red-400">Manual Paperwork</div>
                                    <div className="text-xs font-extrabold line-through">{activeWorkflow.manualTime}</div>
                                </div>
                                <span className="text-gray-300 text-center font-bold hidden sm:inline">➔</span>
                                <div className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-xl text-center border border-emerald-100">
                                    <div className="text-[9px] uppercase font-bold tracking-wider text-emerald-500">Grovix Automated</div>
                                    <div className="text-xs font-black">{activeWorkflow.automatedTime}</div>
                                </div>
                            </div>
                        </div>

                        {/* 4 Industry KPI Metric Badges */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                            {activeWorkflow.kpis.map((kpi, kIdx) => (
                                <div key={kIdx} className="bg-white rounded-xl p-3.5 border border-gray-200/80 shadow-sm flex flex-col justify-between">
                                    <div className="flex items-center justify-between mb-1.5">
                                        <div 
                                            className="w-7 h-7 rounded-lg flex items-center justify-center"
                                            style={{ backgroundColor: kpi.bg, color: kpi.color }}
                                        >
                                            <span className="material-symbols-outlined text-[16px]">{kpi.icon}</span>
                                        </div>
                                        <span className="text-[10px] font-mono text-gray-400 font-medium">{kpi.sub}</span>
                                    </div>
                                    <div>
                                        <div className="text-base sm:text-lg font-black text-gray-900 tracking-tight">{kpi.value}</div>
                                        <div className="text-[11px] font-medium text-gray-500 truncate">{kpi.label}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Visual 4-Step Flow Canvas */}
                        <div className="relative mb-6">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                                    <span className="material-symbols-outlined text-[15px] text-[#00B67A]">account_tree</span>
                                    End-to-End {activeWorkflow.tabLabel} Automation Pipeline
                                </span>
                                <span className="text-[11px] font-mono text-[#00B67A] font-semibold bg-[#E6F7F0] px-2 py-0.5 rounded border border-[#00B67A]/20">
                                    Zero Human Handoff Delays
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-3.5 relative z-10">
                                {activeWorkflow.nodes.map((node, i) => (
                                    <div 
                                        key={i}
                                        className="relative bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-[#00B67A]/40 transition-all duration-300 flex flex-col justify-between group"
                                    >
                                        <div>
                                            <div className="flex items-center justify-between mb-2.5">
                                                <div 
                                                    className="w-9 h-9 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                                                    style={{ backgroundColor: node.bg, color: node.color }}
                                                >
                                                    <span className="material-symbols-outlined text-[18px]">{node.icon}</span>
                                                </div>
                                                <span className="text-[10px] font-mono font-bold text-slate-400">0{i+1}</span>
                                            </div>
                                            <div className="text-[10px] font-bold uppercase tracking-wider text-[#00B67A] mb-1">
                                                {node.step}
                                            </div>
                                            <h4 className="text-xs sm:text-sm font-extrabold text-[#0B192C] mb-1 leading-snug">
                                                {node.title}
                                            </h4>
                                            <p className="text-slate-500 text-xs leading-relaxed">
                                                {node.detail}
                                            </p>
                                        </div>

                                        <div className="mt-3.5 pt-2.5 border-t border-slate-100 flex items-center gap-1.5 text-[10px] font-semibold text-[#00B67A]">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#00B67A]"></span>
                                            <span>Automated in Background</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Live Activity Stream for this Industry + Interactive Simulation Trigger */}
                        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 pb-2.5 border-b border-slate-100">
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-[#00B67A] animate-pulse"></span>
                                    <span className="text-xs font-bold text-slate-800">
                                        Live Execution Feed: {activeWorkflow.tabLabel}
                                    </span>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={handleSimulateTrigger}
                                        disabled={isTriggering}
                                        className="inline-flex items-center gap-1.5 bg-[#E6F7F0] hover:bg-[#d1fae5] text-[#00B67A] border border-[#00B67A]/30 text-xs font-bold px-3 py-1 rounded-lg transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                                    >
                                        <span className={`material-symbols-outlined text-[14px] ${isTriggering ? 'animate-spin' : ''}`}>
                                            {isTriggering ? 'sync' : 'bolt'}
                                        </span>
                                        <span>{isTriggering ? 'Executing Logic...' : 'Simulate Live Trigger'}</span>
                                    </button>
                                    <span className="text-[10px] font-mono text-slate-400 hidden sm:inline">
                                        Real-time
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                {liveEvents.map((evt, idx) => (
                                    <div 
                                        key={evt.id || idx}
                                        className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 rounded-xl border text-xs transition-all duration-300 ${
                                            evt.isNew 
                                                ? 'bg-[#E6F7F0]/80 border-[#00B67A]/30 shadow-xs' 
                                                : 'bg-slate-50/70 border-slate-100'
                                        }`}
                                    >
                                        <div className="flex items-center gap-2.5">
                                            <span className="px-2 py-0.5 rounded-md font-mono font-bold text-[10px] bg-[#E6F7F0] text-[#00B67A] border border-[#00B67A]/20 shrink-0">
                                                {evt.id}
                                            </span>
                                            <span className="font-medium text-slate-700">
                                                {evt.text}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3 text-slate-400 font-mono text-[11px] self-end sm:self-auto shrink-0">
                                            <span className="text-[#00B67A] font-bold bg-[#E6F7F0] px-2 py-0.5 rounded border border-[#00B67A]/20">
                                                ⚡ {evt.latency}
                                            </span>
                                            <span>{evt.time}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default DashboardPreviewSection;
