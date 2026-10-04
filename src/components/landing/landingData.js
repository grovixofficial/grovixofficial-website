// Centralized static data for all Grovix landing page components.

export const aiFeatures = [
    {
        title: "Intelligent Document & Bill OCR",
        icon: "document_scanner",
        desc: "Automatically extract line items, taxes, and vendor details from physical bills, PDFs, and purchase orders directly into your ERP or spreadsheets.",
        color: "#8B5CF6",
        bg: "#F5F3FF",
        stat: "Instant",
        statLabel: "Data Capture",
        backIcon: "qr_code_scanner",
        backLabel: "Zero Manual Typing",
    },
    {
        title: "WhatsApp Customer & Order Assistant",
        icon: "chat",
        desc: "Deploy automated WhatsApp bots to handle routine order status checks, payment link delivery, and common customer inquiries 24/7.",
        color: "#00B67A",
        bg: "#E6F7F0",
        stat: "24/7",
        statLabel: "Automated Service",
        backIcon: "smart_toy",
        backLabel: "Customer Automation",
    },
    {
        title: "Smart Exception & Delay Detection",
        icon: "trending_up",
        desc: "Automatically detect delayed dispatches, inventory shortages, and overdue receivables before they impact customer relationships.",
        color: "#F43F5E",
        bg: "#FFF1F2",
        stat: "Proactive",
        statLabel: "Alert Trigger",
        backIcon: "notifications_active",
        backLabel: "Operational Alerts",
    },
    {
        title: "Daily Operational Briefings",
        icon: "lightbulb",
        desc: "Receive an automated morning summary of daily sales, pending approvals, critical stock alerts, and key operational priorities.",
        color: "#06B6D4",
        bg: "#ECFEFF",
        stat: "Daily",
        statLabel: "Owner Briefing",
        backIcon: "analytics",
        backLabel: "Clear Visibility",
    },
    {
        title: "Automated Document & PO Parsing",
        icon: "auto_awesome",
        desc: "Convert incoming supplier quotes and unstructured customer orders into structured system entries ready for 1-click team review.",
        color: "#6366F1",
        bg: "#EEF2FF",
        stat: "1-Click",
        statLabel: "Order Ingestion",
        backIcon: "bolt",
        backLabel: "Structured Intake",
    },
    {
        title: "Automated Ledger Reconciliation",
        icon: "summarize",
        desc: "Intelligently cross-check bank statements against customer ledgers, supplier bills, and payment records to catch discrepancies early.",
        color: "#F59E0B",
        bg: "#FEF3C7",
        stat: "Clean",
        statLabel: "Audit Trails",
        backIcon: "task_alt",
        backLabel: "Reconciliation",
    },
];

export const reasons = [
    {
        icon: 'handshake',
        title: 'Built Around Your Actual Process',
        desc: 'We study your existing operations before writing code, ensuring the software adapts to your team—never the other way around.',
        color: '#00B67A',
    },
    {
        icon: 'hub',
        title: 'Connect What You Already Use',
        desc: 'No need to rip and replace. We bridge your spreadsheets, Tally, SAP, email, and WhatsApp into unified automated workflows.',
        color: '#06B6D4',
    },
    {
        icon: 'trending_up',
        title: 'Start Small, Scale as You Grow',
        desc: 'Begin with a single painful bottleneck—like WhatsApp follow-ups or invoice entry—and expand modularly when ready.',
        color: '#6366F1',
    },
    {
        icon: 'block',
        title: 'Zero Bloat & Unused Modules',
        desc: 'Never pay for 50+ complicated screens you will never open. Grovix delivers focused, fast tools your staff will actually adopt.',
        color: '#F43F5E',
    },
    {
        icon: 'engineering',
        title: 'Direct Engineering Partnership',
        desc: 'Collaborate directly with experienced developers who understand business workflows, not disconnected sales representatives.',
        color: '#8B5CF6',
    },
    {
        icon: 'touch_app',
        title: 'Made for Non-Technical Teams',
        desc: 'Clean interfaces and simple mobile layouts designed so ground staff and office teams can operate comfortably on day one.',
        color: '#F59E0B',
    },
    {
        icon: 'lock',
        title: 'Secure, Private & Controlled',
        desc: 'Granular role-based controls, daily automated backups, and private databases keep your proprietary business data safe.',
        color: '#10B981',
    },
    {
        icon: 'bolt',
        title: 'Fast Modular Implementation',
        desc: 'See working automations and custom tools delivered iteratively in weeks, delivering immediate operational value.',
        color: '#0284C7',
    },
];

export const rows = [
    {
        problem: { icon: 'table_chart',       text: 'Copy-pasting data repeatedly between Excel, Tally & emails' },
        solution: { icon: 'tune',              text: 'Automated data flow connecting spreadsheets, accounts & operations' },
    },
    {
        problem: { icon: 'chat',              text: 'Chasing customers manually for payment follow-ups & dispatch updates' },
        solution: { icon: 'auto_awesome',     text: 'Automated WhatsApp notifications, payment links & instant alerts' },
    },
    {
        problem: { icon: 'folder_off',        text: 'Forced into rigid software packages that fight your team’s workflow' },
        solution: { icon: 'hub',               text: 'Custom ERP, CRM & tools tailored around the way you actually work' },
    },
    {
        problem: { icon: 'extension_off',     text: 'Valuable operational data trapped in SAP or legacy tools without custom reports' },
        solution: { icon: 'api',               text: 'Custom SAP add-ons, real-time reports, and lightweight mobile access' },
    },
    {
        problem: { icon: 'history',           text: 'Slow paper approvals and delayed handoffs between departments' },
        solution: { icon: 'touch_app',         text: '1-Click digital approvals with instant automated status routing' },
    },
    {
        problem: { icon: 'sentiment_dissatisfied', text: 'Overcomplicated software with steep learning curves that employees avoid' },
        solution: { icon: 'engineering',       text: 'Intuitive, focused screens ground staff can use easily on day one' },
    },
];

export const testimonials = [
    {
        quote: "Standard ERP packages forced us to change our factory floor routines. Grovix mapped our job work and machine workflow, building tailored production tracking with automated WhatsApp dispatch alerts for our clients.",
        name: "Manufacturing & Job Works Workflow",
        role: "Production & Machine Shops",
        location: "Custom Shop-Floor Automation",
        initials: "MF",
        color: "#00B67A",
        bg: "#E6F7F0",
        rating: 5,
        tag: "Production & WhatsApp Alerts",
        tagIcon: "precision_manufacturing",
        stat: "Zero Manual Handoffs",
    },
    {
        quote: "Managing stock across multiple warehouses and chasing overdue party payments by phone was consuming hours every week. Grovix connected our inventory ledgers and automated payment reminder sequences via WhatsApp.",
        name: "Wholesale & Distribution Hub",
        role: "B2B Trading & Distribution",
        location: "Multi-Branch Stock & Billing",
        initials: "WD",
        color: "#10B981",
        bg: "#ECFDF5",
        rating: 5,
        tag: "Multi-Branch Stock Sync",
        tagIcon: "warehouse",
        stat: "Automated Reminders",
    },
    {
        quote: "Our team needed specialized reporting and mobile dispatch sign-offs that standard SAP made difficult. Grovix developed custom SAP add-ons and a lightweight web portal connecting directly via BAPI without disrupting core SAP.",
        name: "Enterprise SAP Add-On Integration",
        role: "SAP-Equipped Enterprise",
        location: "Custom Add-On & Field Sync",
        initials: "SP",
        color: "#0D9488",
        bg: "#F0FDFA",
        rating: 5,
        tag: "Custom SAP Reports",
        tagIcon: "extension",
        stat: "Connected SAP System",
    },
    {
        quote: "Vehicle trip updates, driver expenses, and delivery proofs were scattered across paper slips and chat groups. Grovix built a dedicated mobile workflow with automatic milestone notifications sent directly to customers.",
        name: "Transport & Fleet Operations",
        role: "Logistics & Supply Chain",
        location: "Trip & Delivery Automation",
        initials: "LG",
        color: "#0B192C",
        bg: "#F1F5F9",
        rating: 5,
        tag: "Dispatch & Expense Flow",
        tagIcon: "local_shipping",
        stat: "Live Trip Visibility",
    },
    {
        quote: "Tracking client billable hours, project milestones, and recurring retainer invoices manually was leading to missed billing cycles. Grovix built an automated invoicing flow with 1-click customer payment links.",
        name: "Professional Services & Agency",
        role: "Consulting & Services Firm",
        location: "Milestone Billing & CRM",
        initials: "PS",
        color: "#0284C7",
        bg: "#F0F9FF",
        rating: 5,
        tag: "Milestone Billing Engine",
        tagIcon: "support_agent",
        stat: "On-Time Invoicing",
    },
];

export const stats = [
    {
        value: 10,
        suffix: '+ hrs',
        prefix: '',
        label: 'Weekly Manual Work Saved',
        icon: 'schedule',
        color: '#00B67A',
        bg: '#E6F7F0',
        decimals: 0,
    },
    {
        value: 100,
        suffix: '%',
        prefix: '',
        label: 'Tailored Workflow Fit',
        icon: 'tune',
        color: '#6366F1',
        bg: '#EEF2FF',
        decimals: 0,
    },
    {
        value: 6,
        suffix: ' Core',
        prefix: '',
        label: 'Automation & Software Services',
        icon: 'hub',
        color: '#06B6D4',
        bg: '#ECFEFF',
        decimals: 0,
    },
    {
        value: 0,
        suffix: ' Unused',
        prefix: '',
        label: 'Bloatware & Complexity',
        icon: 'block',
        color: '#F43F5E',
        bg: '#FFF1F2',
        decimals: 0,
    },
];

export const marqueeRow1 = [
    { name: 'WhatsApp Business API',   icon: 'chat',                    color: '#00B67A' },
    { name: 'SAP ERP & S/4HANA',       icon: 'database',                color: '#0284C7' },
    { name: 'TallyPrime Integration',  icon: 'account_balance_wallet',  color: '#059669' },
    { name: 'Google Sheets & Workspace', icon: 'grid_on',               color: '#10B981' },
    { name: 'Microsoft 365 & Excel',   icon: 'table_view',              color: '#00B67A' },
    { name: 'Custom REST APIs',        icon: 'api',                     color: '#0D9488' },
];

export const marqueeRow2 = [
    { name: 'Payment Gateways',        icon: 'payments',                color: '#00B67A' },
    { name: 'GST & SAP-B1 Engine',     icon: 'receipt_long',            color: '#10B981' },
    { name: 'Cloud Database Sync',     icon: 'cloud',                   color: '#0284C7' },
    { name: 'Barcode & QR Tracking',   icon: 'qr_code_scanner',         color: '#059669' },
    { name: 'Field Staff Mobile Apps', icon: 'smartphone',              color: '#0D9488' },
    { name: 'Client & Vendor Portals', icon: 'web',                     color: '#0B192C' },
];

export const faqs = [
    {
        question: "What types of businesses can use Grovix’s AI & automation solutions?",
        answer: "Grovix works with growing SMEs, manufacturers, distributors, trading companies, and service businesses that want to eliminate manual data entry, streamline WhatsApp communication, and automate repetitive accounting and operations workflows."
    },
    {
        question: "Do I need technical knowledge to use your solutions?",
        answer: "Not at all. We design clean, intuitive web, mobile, and WhatsApp interfaces so your office staff, ground teams, and operations managers can use them comfortably on day one without technical training."
    },
    {
        question: "How long does it take to implement AI automation?",
        answer: "Because we work modularly, initial automations (like WhatsApp notification triggers or OCR bill parsers) can often be live in 10 to 14 days. Custom ERP, CRM, or portal modules typically roll out in iterative phases over 3 to 6 weeks."
    },
    {
        question: "Can you build custom AI agents for my business?",
        answer: "Yes! We build tailored AI agents for document OCR, intelligent WhatsApp customer support, automated order intake, and exception detection that connect directly with your database, ERP, or spreadsheets."
    },
    {
        question: "What if I need ongoing support?",
        answer: "We provide dedicated post-launch support, proactive cloud monitoring, workflow optimizations as your business scales, and direct access to the software engineers who built your systems."
    },
    {
        question: "We already use Tally, SAP, or spreadsheets. Do we have to replace our software?",
        answer: "Not at all. Grovix connects and builds software around what you already use. We create custom add-ons, integrations, and mobile interfaces that synchronize seamlessly with your existing Tally, SAP, or spreadsheet workflows."
    }
];

export const businessTypes = [
    {
        title: "Manufacturing & Job Works",
        icon: "precision_manufacturing",
        color: "#6366F1",
        bg: "#EEF2FF",
        border: "rgba(99, 102, 241, 0.25)",
        desc: "Automate production orders, bill of materials tracking, machine capacity, raw material planning, and instant WhatsApp dispatch alerts for customers."
    },
    {
        title: "Wholesale & Distribution",
        icon: "local_shipping",
        color: "#F59E0B",
        bg: "#FEF3C7",
        border: "rgba(245, 158, 11, 0.25)",
        desc: "Connect multi-branch stock levels, generate rapid GST invoices, and automate vendor POs and customer payment follow-ups."
    },
    {
        title: "Retail & Multi-Store Networks",
        icon: "storefront",
        color: "#00B67A",
        bg: "#E6F7F0",
        border: "rgba(0, 182, 122, 0.25)",
        desc: "Sync point-of-sale inventory with central stock, scan barcodes, and send automated loyalty messages and digital receipts on WhatsApp."
    },
    {
        title: "Logistics, Transport & Fleet",
        icon: "warehouse",
        color: "#06B6D4",
        bg: "#ECFEFF",
        border: "rgba(6, 182, 212, 0.25)",
        desc: "Digitize trip expense claims, automate vehicle dispatch tracking, and send live milestone updates to clients automatically."
    },
    {
        title: "Professional & Field Services",
        icon: "support_agent",
        color: "#8B5CF6",
        bg: "#F5F3FF",
        border: "rgba(139, 92, 246, 0.25)",
        desc: "Streamline project milestone invoicing, client onboarding, task time tracking, and automated payment reminder sequences."
    }
];

export const features = [
    {
        title: "WhatsApp Business Automation",
        icon: "chat",
        desc: "Automate order confirmations, dispatch tracking, overdue payment reminders, and customer query handling directly inside WhatsApp.",
        accent: "#00B67A",
        lightAccent: "#E6F7F0",
        tag: "Capability 01",
        stat: "Instant",
        statLabel: "client messaging"
    },
    {
        title: "Business Process Automation",
        icon: "sync_alt",
        desc: "Eliminate repetitive manual tasks by linking spreadsheets, databases, and accounting tools with trigger-based automated workflows.",
        accent: "#06B6D4",
        lightAccent: "#ECFEFF",
        tag: "Capability 02",
        stat: "Zero",
        statLabel: "duplicate entries"
    },
    {
        title: "Tailored ERP & CRM Software",
        icon: "dashboard_customize",
        desc: "Build modular ERP and CRM tools engineered specifically around your sales pipeline, stock rules, and party accounting ledger workflows.",
        accent: "#6366F1",
        lightAccent: "#EEF2FF",
        tag: "Capability 03",
        stat: "100%",
        statLabel: "process alignment"
    },
    {
        title: "SAP Add-ons & Integrations",
        icon: "extension",
        desc: "Develop specialized SAP add-on modules, custom ALV reports, BAPI connectors, and lightweight mobile apps for SAP users.",
        accent: "#0284C7",
        lightAccent: "#F0F9FF",
        tag: "Capability 04",
        stat: "Custom",
        statLabel: "SAP extensions"
    },
    {
        title: "Practical AI & Document OCR",
        icon: "document_scanner",
        desc: "Extract structured line items from supplier bills, PDFs, and paper purchase orders into your business systems with AI OCR.",
        accent: "#8B5CF6",
        lightAccent: "#F5F3FF",
        tag: "Capability 05",
        stat: "Accurate",
        statLabel: "bill extraction"
    },
    {
        title: "Custom Web & Mobile Portals",
        icon: "devices",
        desc: "Give clients, distributors, and field staff simple web or mobile portals to view live orders, download statements, and approve requests.",
        accent: "#F43F5E",
        lightAccent: "#FFF1F2",
        tag: "Capability 06",
        stat: "Secure",
        statLabel: "role-based access"
    },
    {
        title: "Operational Dashboards & Alerts",
        icon: "monitoring",
        desc: "Get real-time operational visibility into sales trends, pending tasks, stock shortages, and team approvals in one unified dashboard.",
        accent: "#F59E0B",
        lightAccent: "#FEF3C7",
        tag: "Capability 07",
        stat: "Live",
        statLabel: "operational KPIs"
    }
];
