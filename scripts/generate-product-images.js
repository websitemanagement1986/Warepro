const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'assets', 'products');
fs.mkdirSync(dir, { recursive: true });

const products = [
  { id: 'ledgermax-pro', label: 'LedgerMax Pro', sub: 'Accounting', color: '#4a6d8c', type: 'software' },
  { id: 'gstwise-billing', label: 'GSTWise Billing', sub: 'GST Software', color: '#3d6b8c', type: 'software' },
  { id: 'account-plus', label: 'Account Plus', sub: 'Cloud Accounting', color: '#2d5a7b', type: 'software' },
  { id: 'shieldguard-av', label: 'ShieldGuard AV', sub: 'Antivirus', color: '#1e4d6b', type: 'security' },
  { id: 'shieldguard-av-6m', label: 'ShieldGuard 6M', sub: '6 Month Plan', color: '#2563eb', type: 'security' },
  { id: 'safenet-security', label: 'SafeNet Security', sub: 'Antivirus', color: '#0f4c75', type: 'security' },
  { id: 'securemax-infiniti', label: 'SecureMax', sub: 'Enterprise AV', color: '#1a365d', type: 'security' },
  { id: 'quickshield-6m', label: 'QuickShield 6M', sub: '6 Month Plan', color: '#2b6cb0', type: 'security' },
  { id: 'peoplepulse-hrms', label: 'PeoplePulse', sub: 'HRMS', color: '#6b7c4e', type: 'software' },
  { id: 'teamtrack-hr', label: 'TeamTrack HR', sub: 'HR Software', color: '#5a6b3e', type: 'software' },
  { id: 'hr-connect', label: 'HR Connect', sub: 'Enterprise HR', color: '#4a5b2e', type: 'software' },
  { id: 'saleflow-crm', label: 'SaleFlow CRM', sub: 'CRM', color: '#4a6478', type: 'software' },
  { id: 'leadbridge-crm', label: 'LeadBridge CRM', sub: 'CRM', color: '#3a5470', type: 'software' },
  { id: 'kylas-style-crm', label: 'GrowthCRM', sub: 'Unlimited Users', color: '#2a4460', type: 'software' },
  { id: 'billeease-pos', label: 'BillEase POS', sub: 'Point of Sale', color: '#a65d4e', type: 'software' },
  { id: 'retailpro-pos', label: 'RetailPro POS', sub: 'Retail POS', color: '#964f40', type: 'software' },
  { id: 'shopmate-erp', label: 'ShopMate ERP', sub: 'Retail ERP', color: '#864132', type: 'software' },
  { id: 'invoicehub', label: 'InvoiceHub', sub: 'Billing', color: '#7a6348', type: 'software' },
  { id: 'payroll-bill', label: 'PayRoll Bill', sub: 'Billing', color: '#6a5338', type: 'software' },
  { id: 'billmaster-pro', label: 'BillMaster Pro', sub: 'Invoicing', color: '#5a4328', type: 'software' },
  { id: 'edumanage-pro', label: 'EduManage Pro', sub: 'School ERP', color: '#5a7a5e', type: 'software' },
  { id: 'campus-sync', label: 'CampusSync', sub: 'School Mgmt', color: '#4a6a4e', type: 'software' },
  { id: 'schooledge', label: 'SchoolEdge', sub: 'Enterprise', color: '#3a5a3e', type: 'software' },
  { id: 'workflow-suite', label: 'WorkFlow Suite', sub: 'Productivity', color: '#4f6d8f', type: 'software' },
  { id: 'collabdesk', label: 'CollabDesk', sub: 'Team Tools', color: '#3f5d7f', type: 'software' },
  { id: 'taskflow-pro', label: 'TaskFlow Pro', sub: 'Project Mgmt', color: '#2f4d6f', type: 'software' },
  { id: 'vga-cable-1.5m', label: 'VGA Cable', sub: '1.5 Metre', color: '#1565c0', type: 'vga' },
  { id: 'vga-cable-3m', label: 'VGA Cable', sub: '3 Metre', color: '#0d47a1', type: 'vga' },
  { id: 'usb-cable-micro-1m', label: 'Micro USB', sub: '1 Metre Cable', color: '#37474f', type: 'usb-micro' },
  { id: 'usb-cable-type-c-1m', label: 'USB Type-C', sub: '1 Metre Cable', color: '#263238', type: 'usb-c' },
  { id: 'usb-extension-1m', label: 'USB Extension', sub: '1 Metre', color: '#455a64', type: 'usb-ext' },
  { id: 'hdmi-usb-adapter', label: 'USB to HDMI', sub: 'Adapter', color: '#546e7a', type: 'hdmi' },
];

function cableSvg(type) {
  if (type === 'vga') {
    return `<rect x="55" y="158" width="290" height="14" rx="7" fill="#1976d2"/>
<rect x="35" y="148" width="38" height="34" rx="4" fill="#90a4ae" stroke="#546e7a" stroke-width="2"/>
<rect x="44" y="155" width="20" height="20" rx="2" fill="#263238"/>
<circle cx="50" cy="161" r="2" fill="#cfd8dc"/><circle cx="58" cy="161" r="2" fill="#cfd8dc"/>
<circle cx="50" cy="169" r="2" fill="#cfd8dc"/><circle cx="58" cy="169" r="2" fill="#cfd8dc"/>
<rect x="327" y="148" width="38" height="34" rx="4" fill="#90a4ae" stroke="#546e7a" stroke-width="2"/>
<rect x="336" y="155" width="20" height="20" rx="2" fill="#263238"/>
<text x="200" y="210" text-anchor="middle" fill="#546e7a" font-family="Arial" font-size="13" font-weight="bold">VGA Male to Male</text>`;
  }
  if (type === 'usb-micro') {
    return `<rect x="75" y="163" width="250" height="9" rx="4" fill="#455a64"/>
<rect x="45" y="151" width="30" height="32" rx="3" fill="#b0bec5" stroke="#78909c" stroke-width="2"/>
<rect x="300" y="155" width="24" height="24" rx="4" fill="#78909c" stroke="#546e7a" stroke-width="2"/>
<text x="200" y="210" text-anchor="middle" fill="#546e7a" font-family="Arial" font-size="13" font-weight="bold">USB-A to Micro USB</text>`;
  }
  if (type === 'usb-c') {
    return `<rect x="75" y="163" width="250" height="9" rx="4" fill="#37474f"/>
<rect x="45" y="151" width="30" height="32" rx="3" fill="#b0bec5" stroke="#78909c" stroke-width="2"/>
<rect x="296" y="153" width="28" height="28" rx="7" fill="#78909c" stroke="#455a64" stroke-width="2"/>
<text x="200" y="210" text-anchor="middle" fill="#546e7a" font-family="Arial" font-size="13" font-weight="bold">USB-A to Type-C</text>`;
  }
  if (type === 'usb-ext') {
    return `<rect x="65" y="163" width="270" height="9" rx="4" fill="#546e7a"/>
<rect x="40" y="153" width="26" height="28" rx="3" fill="#90a4ae"/>
<rect x="334" y="153" width="26" height="28" rx="3" fill="#cfd8dc"/>
<text x="200" y="210" text-anchor="middle" fill="#546e7a" font-family="Arial" font-size="13" font-weight="bold">USB Extension Cable</text>`;
  }
  if (type === 'hdmi') {
    return `<rect x="115" y="152" width="170" height="44" rx="8" fill="#37474f" stroke="#263238" stroke-width="2"/>
<text x="200" y="180" text-anchor="middle" fill="#fff" font-family="Arial" font-size="14" font-weight="bold">USB → HDMI</text>
<rect x="55" y="166" width="48" height="16" rx="3" fill="#90a4ae"/>
<rect x="297" y="166" width="48" height="16" rx="3" fill="#90a4ae"/>`;
  }
  if (type === 'security') {
    return `<path d="M200 135 L265 162 V208 Q200 252 135 208 V162 Z" fill="#ff6b00"/>
<path d="M200 152 L248 174 V204 Q200 238 152 204 V174 Z" fill="#fff" opacity="0.15"/>
<text x="200" y="198" text-anchor="middle" fill="#fff" font-family="Arial" font-size="42">&#128737;</text>`;
  }
  return `<rect x="95" y="148" width="210" height="120" rx="10" fill="#fff" opacity="0.2" stroke="#b0bec5" stroke-width="2"/>
<rect x="115" y="168" width="170" height="80" rx="6" fill="#fff" opacity="0.35"/>
<rect x="130" y="183" width="70" height="8" rx="4" fill="#fff" opacity="0.6"/>
<rect x="130" y="200" width="130" height="6" rx="3" fill="#fff" opacity="0.4"/>
<rect x="130" y="214" width="100" height="6" rx="3" fill="#fff" opacity="0.4"/>`;
}

products.forEach((p) => {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${p.color}"/>
      <stop offset="100%" stop-color="#0b2447"/>
    </linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(#bg)"/>
  <rect width="400" height="108" fill="rgba(0,0,0,0.22)"/>
  <text x="22" y="50" fill="#fff" font-family="Arial,sans-serif" font-size="21" font-weight="bold">${p.label}</text>
  <text x="22" y="76" fill="rgba(255,255,255,0.8)" font-family="Arial,sans-serif" font-size="14">${p.sub}</text>
  <rect y="108" width="400" height="192" fill="#eceff1"/>
  ${cableSvg(p.type)}
  <rect y="288" width="400" height="12" fill="#ff6b00"/>
  <text x="380" y="298" text-anchor="end" fill="#fff" font-family="Arial" font-size="9" opacity="0.9">Warepro</text>
</svg>`;
  fs.writeFileSync(path.join(dir, `${p.id}.svg`), svg);
});

console.log(`Generated ${products.length} product images in assets/products/`);
