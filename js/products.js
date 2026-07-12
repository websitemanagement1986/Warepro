const WAREPRO = {
  name: 'Warepro',
  phone: '+918826623286',
  phoneDisplay: '+91 8826623286',
  email: 'support@wareprotechpvtltd.in',
  address: 'F-020, FF GNS Plaza, Site 4 Kasna, Greater Noida, Gautam Buddha Nagar, UP 201310',
};

const CATEGORIES = [
  { slug: 'accounting', name: 'Accounting Software', shortName: 'Accounting', icon: '📊', color: '#4a6d8c', image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&h=420&fit=crop&q=80', tagline: 'Growth by 40% with Smart Automation', description: 'Streamline operations, reduce costs, and gain real-time financial insights.', gradient: 'linear-gradient(135deg, #ff6b00 0%, #ff9500 100%)', accent: '#ff6b00' },
  { slug: 'antivirus', name: 'Antivirus Software', shortName: 'Antivirus', icon: '🛡️', color: '#3d5a6c', image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=500&h=420&fit=crop&q=80', tagline: 'Block 99% of Threats', description: 'Protect your devices and data with advanced antivirus software.', gradient: 'linear-gradient(135deg, #1b4d89 0%, #3b82f6 100%)', accent: '#1b4d89' },
  { slug: 'hr', name: 'HR Software', shortName: 'HR', icon: '👥', color: '#6b7c4e', image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=500&h=420&fit=crop&q=80', tagline: 'Boost HR Efficiency by 70%', description: 'Simplify recruitment, payroll, and employee management.', gradient: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)', accent: '#7c3aed' },
  { slug: 'crm', name: 'CRM Software', shortName: 'CRM', icon: '📈', color: '#4a6478', image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&h=420&fit=crop&q=80', tagline: 'Increase Sales by 60%', description: 'Streamline communication, track leads, and boost conversions.', gradient: 'linear-gradient(135deg, #059669 0%, #10b981 100%)', accent: '#059669' },
  { slug: 'pos', name: 'POS Software', shortName: 'POS', icon: '🏪', color: '#a65d4e', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=420&fit=crop&q=80', tagline: 'Sales by 40% with Smart POS', description: 'Seamless billing, real-time inventory, and sales insights.', gradient: 'linear-gradient(135deg, #dc2626 0%, #f97316 100%)', accent: '#dc2626' },
  { slug: 'billing', name: 'Billing & Invoicing', shortName: 'Billing & Invoicing', icon: '🧾', color: '#7a6348', image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=500&h=420&fit=crop&q=80', tagline: 'Reduce Billing Errors by 80%', description: 'Automate billing and invoicing with GST-ready tools.', gradient: 'linear-gradient(135deg, #0891b2 0%, #22d3ee 100%)', accent: '#0891b2' },
  { slug: 'school', name: 'School Management', shortName: 'School Management', icon: '🎓', color: '#5a7a5e', image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500&h=420&fit=crop&q=80', tagline: 'Improve Efficiency by 65%', description: 'Automate attendance, fees, scheduling, and communication.', gradient: 'linear-gradient(135deg, #d97706 0%, #fbbf24 100%)', accent: '#d97706' },
  { slug: 'productivity', name: 'Productivity Software', shortName: 'Productivity', icon: '⚡', color: '#4f6d8f', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=420&fit=crop&q=80', tagline: 'Increase Productivity by 50%', description: 'Simplify tasks, enhance collaboration, and gain insights.', gradient: 'linear-gradient(135deg, #4f46e5 0%, #818cf8 100%)', accent: '#4f46e5' },
  { slug: 'accessories', name: 'Computer Accessories', shortName: 'Accessories', icon: '🔌', color: '#5c6bc0', image: 'https://images.unsplash.com/photo-1588508068419-b388109a7d8d?w=500&h=420&fit=crop&q=80', tagline: 'Starting at just ₹100', description: 'Cables, adapters and essentials for your PC and laptop.' },
];

const PRODUCTS = [
  { id: 'ledgermax-pro', category: 'accounting', name: 'LedgerMax Pro', vendor: 'FinEdge Solutions Pvt Ltd', rating: 4.4, price: 4999, originalPrice: 6499, period: '/Year', description: 'Complete accounting suite with GST compliance, inventory, and reporting for SMEs.', features: ['GST Filing', 'Inventory Management', 'Multi-user Access', 'Bank Reconciliation'] },
  { id: 'gstwise-billing', category: 'accounting', name: 'GSTWise Billing', vendor: 'TaxSync Technolabs', rating: 5.0, price: 1499, originalPrice: 1949, period: '/Year', description: 'GST-compliant billing and invoicing for small businesses.', features: ['E-Invoice', 'GST Reports', 'Customer Portal', 'Payment Reminders'] },
  { id: 'account-plus', category: 'accounting', name: 'Account Plus', vendor: 'Wheelhouse Consultancy', rating: 4.8, price: 999, originalPrice: null, period: '/Month', description: 'Cloud accounting with real-time dashboards and automated entries.', features: ['Cloud Sync', 'Auto Entries', 'Expense Tracking', 'Financial Reports'] },

  { id: 'shieldguard-av', category: 'antivirus', name: 'ShieldGuard AV', vendor: 'CyberShield India', rating: 4.4, price: 221, originalPrice: 480, period: '/PC/Year', description: 'Advanced threat protection with real-time scanning and firewall.', features: ['Real-time Scan', 'Firewall', 'Ransomware Shield', 'Safe Banking'] },
  { id: 'shieldguard-av-6m', category: 'antivirus', name: 'ShieldGuard AV — 6 Month Plan', vendor: 'CyberShield India', rating: 4.5, price: 149, originalPrice: 249, period: '/6 Months', description: 'Discounted 6-month antivirus license. Full protection for 1 PC — ideal for students and home users.', features: ['6 Months License', 'Real-time Protection', 'Auto Updates', 'Email Support'] },
  { id: 'safenet-security', category: 'antivirus', name: 'SafeNet Security', vendor: 'SafeNet Labs', rating: 4.6, price: 311, originalPrice: 979, period: '/Year', description: 'Comprehensive security suite for home and business users.', features: ['Anti-malware', 'Web Protection', 'Parental Controls', 'VPN Add-on'] },
  { id: 'securemax-infiniti', category: 'antivirus', name: 'SecureMax Infiniti', vendor: 'SecureMax Computing', rating: 4.3, price: 2372, originalPrice: 13999, period: '/Year', description: 'Enterprise-grade endpoint security for unlimited devices.', features: ['Unlimited Devices', 'EDR', 'Cloud Console', '24/7 Support'] },
  { id: 'quickshield-6m', category: 'antivirus', name: 'QuickShield Pro — 6 Months', vendor: 'SafeNet Labs', rating: 4.4, price: 179, originalPrice: 299, period: '/6 Months', description: 'Limited-time offer: 6-month antivirus with malware & phishing protection for 1 device.', features: ['Phishing Block', 'USB Scan', 'Silent Mode', 'Instant Activation'] },

  { id: 'peoplepulse-hrms', category: 'hr', name: 'PeoplePulse HRMS', vendor: 'PeoplePulse Tech', rating: 4.9, price: 45, originalPrice: null, period: '/User/Month', description: 'Full HRMS with attendance, payroll, and performance management.', features: ['Payroll', 'Attendance', 'Leave Management', 'Performance Reviews'] },
  { id: 'teamtrack-hr', category: 'hr', name: 'TeamTrack HR', vendor: 'Work Companion LLP', rating: 4.8, price: 50, originalPrice: null, period: '/Month', description: 'HR platform for growing teams with onboarding and compliance.', features: ['Onboarding', 'PF/ESI Compliance', 'Employee Self-service', 'Reports'] },
  { id: 'hr-connect', category: 'hr', name: 'HR Connect', vendor: 'Communities Heritage Pvt Ltd', rating: 4.6, price: null, originalPrice: null, period: '', description: 'Enterprise HR solution with custom modules. Contact for pricing.', features: ['Custom Modules', 'API Integration', 'Multi-location', 'Analytics'], priceOnRequest: true },

  { id: 'saleflow-crm', category: 'crm', name: 'SaleFlow CRM', vendor: 'SaleFlow Inc', rating: 4.3, price: 2099, originalPrice: null, period: '/User/Month', description: 'Industry-leading CRM for sales teams and customer engagement.', features: ['Lead Management', 'Pipeline Tracking', 'Email Integration', 'Analytics'] },
  { id: 'leadbridge-crm', category: 'crm', name: 'LeadBridge CRM', vendor: 'LeadBridge', rating: 5.0, price: 1680, originalPrice: null, period: '/User/Month', description: 'Affordable CRM built for Indian SMBs with WhatsApp integration.', features: ['WhatsApp CRM', 'Lead Scoring', 'Task Automation', 'Mobile App'] },
  { id: 'kylas-style-crm', category: 'crm', name: 'GrowthCRM Unlimited', vendor: 'GrowthStack', rating: 4.1, price: 12999, originalPrice: null, period: '/Month/Unlimited Users', description: 'Unlimited users CRM with sales automation and reporting.', features: ['Unlimited Users', 'Sales Automation', 'Custom Fields', 'Integrations'] },

  { id: 'billeease-pos', category: 'pos', name: 'BillEase POS', vendor: 'RetailEase Apps', rating: 4.7, price: null, originalPrice: null, period: '', description: 'Complete POS for retail with barcode and inventory sync.', features: ['Barcode Scanning', 'Inventory Sync', 'GST Billing', 'Multi-store'], priceOnRequest: true },
  { id: 'retailpro-pos', category: 'pos', name: 'RetailPro POS', vendor: 'Softworld India', rating: 4.3, price: 9000, originalPrice: null, period: '/year', description: 'ERP-integrated POS for retail chains and franchises.', features: ['ERP Integration', 'Loyalty Program', 'Reports', 'Offline Mode'] },
  { id: 'shopmate-erp', category: 'pos', name: 'ShopMate One ERP', vendor: 'ShopMate Plus', rating: 4.6, price: 8474, originalPrice: null, period: '/Quantity', description: 'All-in-one retail ERP with POS, inventory, and accounting.', features: ['POS + ERP', 'Multi-counter', 'GST', 'Cloud Backup'] },

  { id: 'invoicehub', category: 'billing', name: 'InvoiceHub', vendor: 'BillGen Technologies', rating: 4.5, price: 699, originalPrice: 1199, period: '/Year', description: 'Simple billing software for freelancers and small shops.', features: ['GST Invoices', 'Payment Links', 'Expense Tracking', 'Reports'] },
  { id: 'payroll-bill', category: 'billing', name: 'PayRoll Bill', vendor: 'PaySync Solutions', rating: 4.4, price: 3700, originalPrice: 3800, period: '/LifeTime', description: 'Lifetime billing software with payroll integration.', features: ['Lifetime License', 'Payroll Module', 'TDS', 'Multi-company'] },
  { id: 'billmaster-pro', category: 'billing', name: 'BillMaster Pro', vendor: 'BillMaster', rating: 4.5, price: 4500, originalPrice: 7000, period: '/Year', description: 'Professional invoicing with recurring billing and reminders.', features: ['Recurring Bills', 'Auto Reminders', 'Client Portal', 'Analytics'] },

  { id: 'edumanage-pro', category: 'school', name: 'EduManage Pro', vendor: 'EduTech Solutions', rating: 4.5, price: 7670, originalPrice: null, period: '', description: 'Complete school ERP with parent portal and fee management.', features: ['Parent Portal', 'Fee Management', 'Exam Module', 'Transport'] },
  { id: 'campus-sync', category: 'school', name: 'CampusSync', vendor: 'CampusSync Pvt Ltd', rating: 4.7, price: 3000, originalPrice: null, period: '/Month', description: 'Cloud school management with attendance and communication.', features: ['Attendance', 'SMS Alerts', 'Timetable', 'Online Classes'] },
  { id: 'schooledge', category: 'school', name: 'SchoolEdge ERP', vendor: 'Edge Education', rating: 4.4, price: 500000, originalPrice: null, period: '/Quantity', description: 'Enterprise school management for large institutions.', features: ['Multi-campus', 'Biometric', 'Library', 'Hostel'] },

  { id: 'workflow-suite', category: 'productivity', name: 'WorkFlow Suite', vendor: 'Productive Labs', rating: 4.4, price: 2570, originalPrice: 2999, period: '/Year', description: 'Project management and team collaboration platform.', features: ['Kanban Boards', 'Time Tracking', 'File Sharing', 'Integrations'] },
  { id: 'collabdesk', category: 'productivity', name: 'CollabDesk', vendor: 'CollabDesk Inc', rating: 4.6, price: 1549, originalPrice: 2500, period: '/Year', description: 'Team productivity with docs, chat, and video meetings.', features: ['Docs', 'Chat', 'Video Calls', 'Calendar'] },
  { id: 'taskflow-pro', category: 'productivity', name: 'TaskFlow Pro', vendor: 'TaskFlow Tech', rating: 4.5, price: 999, originalPrice: 1499, period: '/Year', description: 'Task and project management for remote teams.', features: ['Gantt Charts', 'Automations', 'Templates', 'Mobile App'] },

  { id: 'vga-cable-1.5m', category: 'accessories', name: 'VGA Cable 1.5m', vendor: 'Warepro Essentials', rating: 4.3, price: 120, originalPrice: 199, period: '', description: 'High-quality VGA (DB15) male-to-male cable for monitors, projectors and CPUs. 1.5 metre length.', features: ['1.5m Length', 'Gold-plated connectors', 'Ferrite cores', 'Monitor & projector compatible'] },
  { id: 'vga-cable-3m', category: 'accessories', name: 'VGA Cable 3m', vendor: 'Warepro Essentials', rating: 4.2, price: 165, originalPrice: 249, period: '', description: 'Extended VGA cable for desk setups. Supports up to 1080p display output.', features: ['3m Length', 'Double shielded', 'Moulded connectors', 'Durable PVC jacket'] },
  { id: 'usb-cable-micro-1m', category: 'accessories', name: 'USB 2.0 Cable (Micro USB) 1m', vendor: 'Warepro Essentials', rating: 4.4, price: 100, originalPrice: 149, period: '', description: 'Standard USB-A to Micro USB cable for charging and data sync. 1 metre — our lowest price!', features: ['USB 2.0', '1m Length', 'Charge + data', 'Android compatible'] },
  { id: 'usb-cable-type-c-1m', category: 'accessories', name: 'USB Type-C Cable 1m', vendor: 'Warepro Essentials', rating: 4.5, price: 149, originalPrice: 199, period: '', description: 'USB-A to Type-C fast charging cable for smartphones, tablets and laptops.', features: ['Type-C', 'Fast charge support', '1m Length', 'Nylon braided'] },
  { id: 'usb-extension-1m', category: 'accessories', name: 'USB Extension Cable 1m', vendor: 'Warepro Essentials', rating: 4.1, price: 110, originalPrice: 169, period: '', description: 'USB-A male to female extension cable. Extend your keyboard, mouse or dongle reach.', features: ['1m Extension', 'USB 2.0', 'Plug & play', 'PC & laptop'] },
  { id: 'hdmi-usb-adapter', category: 'accessories', name: 'USB to HDMI Adapter', vendor: 'Warepro Essentials', rating: 4.0, price: 199, originalPrice: 349, period: '', description: 'Compact USB display adapter for secondary monitor output. Great value under ₹200.', features: ['1080p output', 'Compact design', 'Windows compatible', 'Easy setup'] },
];

const PRODUCT_IMAGE_BASE = 'assets/products';

const PRODUCT_IMAGES = Object.fromEntries(
  PRODUCTS.map((p) => [p.id, `${PRODUCT_IMAGE_BASE}/${p.id}.jpg`])
);

PRODUCTS.forEach((p) => {
  p.image = PRODUCT_IMAGES[p.id];
});

function getProductImage(product) {
  if (!product) return '';
  return product.image || PRODUCT_IMAGES[product.id] || `${PRODUCT_IMAGE_BASE}/${product.id}.jpg`;
}

function getCategory(slug) {
  return CATEGORIES.find((c) => c.slug === slug);
}

function getProductsByCategory(slug) {
  return PRODUCTS.filter((p) => p.category === slug);
}

function getProduct(id) {
  return PRODUCTS.find((p) => p.id === id);
}

function formatPrice(product) {
  if (product.priceOnRequest || product.price === null) return 'Price on Request';
  return `₹${product.price.toLocaleString('en-IN')}${product.period || ''}`;
}

function getDiscount(product) {
  if (!product.originalPrice || !product.price) return null;
  const pct = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  return pct > 0 ? `Save upto ${pct}%` : null;
}

function getBudgetProducts() {
  return PRODUCTS.filter((p) => p.price >= 100 && p.price <= 200 && !p.priceOnRequest);
}

function getProductCount(categorySlug) {
  return PRODUCTS.filter((p) => p.category === categorySlug).length;
}

if (typeof module !== 'undefined') module.exports = { WAREPRO, CATEGORIES, PRODUCTS, PRODUCT_IMAGES, getCategory, getProductsByCategory, getProduct, getProductImage, formatPrice, getDiscount, getProductCount, getBudgetProducts };
