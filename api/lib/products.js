const PRODUCTS = [
  { id: 'ledgermax-pro', name: 'LedgerMax Pro', price: 4999 },
  { id: 'gstwise-billing', name: 'GSTWise Billing', price: 1499 },
  { id: 'account-plus', name: 'Account Plus', price: 999 },
  { id: 'shieldguard-av', name: 'ShieldGuard AV', price: 221 },
  { id: 'safenet-security', name: 'SafeNet Security', price: 311 },
  { id: 'securemax-infiniti', name: 'SecureMax Infiniti', price: 2372 },
  { id: 'peoplepulse-hrms', name: 'PeoplePulse HRMS', price: 45 },
  { id: 'teamtrack-hr', name: 'TeamTrack HR', price: 50 },
  { id: 'saleflow-crm', name: 'SaleFlow CRM', price: 2099 },
  { id: 'leadbridge-crm', name: 'LeadBridge CRM', price: 1680 },
  { id: 'kylas-style-crm', name: 'GrowthCRM Unlimited', price: 12999 },
  { id: 'retailpro-pos', name: 'RetailPro POS', price: 9000 },
  { id: 'shopmate-erp', name: 'ShopMate One ERP', price: 8474 },
  { id: 'invoicehub', name: 'InvoiceHub', price: 699 },
  { id: 'payroll-bill', name: 'PayRoll Bill', price: 3700 },
  { id: 'billmaster-pro', name: 'BillMaster Pro', price: 4500 },
  { id: 'edumanage-pro', name: 'EduManage Pro', price: 7670 },
  { id: 'campus-sync', name: 'CampusSync', price: 3000 },
  { id: 'schooledge', name: 'SchoolEdge ERP', price: 500000 },
  { id: 'workflow-suite', name: 'WorkFlow Suite', price: 2570 },
  { id: 'collabdesk', name: 'CollabDesk', price: 1549 },
  { id: 'taskflow-pro', name: 'TaskFlow Pro', price: 999 },
];

function getProduct(id) {
  return PRODUCTS.find((p) => p.id === id);
}

function validateCart(cart) {
  if (!Array.isArray(cart) || cart.length === 0) {
    throw new Error('Cart is empty');
  }
  let total = 0;
  const items = [];
  for (const item of cart) {
    const product = getProduct(item.id);
    if (!product) throw new Error(`Invalid product: ${item.id}`);
    const qty = Math.max(1, Math.min(99, parseInt(item.qty, 10) || 1));
    const lineTotal = product.price * qty;
    total += lineTotal;
    items.push({ id: product.id, name: product.name, price: product.price, qty, lineTotal });
  }
  if (total < 1) throw new Error('Invalid order total');
  return { items, total, amountPaise: Math.round(total * 100) };
}

module.exports = { PRODUCTS, getProduct, validateCart };
