/**
 * Downloads real product photos from the internet into assets/products/
 * Run: node scripts/download-product-photos.js
 */
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const dir = path.join(__dirname, '..', 'assets', 'products');
fs.mkdirSync(dir, { recursive: true });

const UA = 'WareproBot/1.0 (https://wareprotechpvtltd.in; support@wareprotechpvtltd.in)';

// Real photos: Unsplash + Pexels + Wikimedia Commons (downloaded once, served locally)
const PHOTOS = {
  'ledgermax-pro': 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop&q=85',
  'gstwise-billing': 'https://images.unsplash.com/photo-1554224155-8d04fac62c92?w=800&h=600&fit=crop&q=85',
  'account-plus': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=85',
  'shieldguard-av': 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop&q=85',
  'shieldguard-av-6m': 'https://images.unsplash.com/photo-1614064641938-3bbee5293a2a?w=800&h=600&fit=crop&q=85',
  'safenet-security': 'https://images.unsplash.com/photo-1633265486064-086b219458ec?w=800&h=600&fit=crop&q=85',
  'securemax-infiniti': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop&q=85',
  'quickshield-6m': 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=600&fit=crop&q=85',
  'peoplepulse-hrms': 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=600&fit=crop&q=85',
  'teamtrack-hr': 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&h=600&fit=crop&q=85',
  'hr-connect': 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=800&h=600&fit=crop&q=85',
  'saleflow-crm': 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop&q=85',
  'leadbridge-crm': 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop&q=85',
  'kylas-style-crm': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=85',
  'billeease-pos': 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop&q=85',
  'retailpro-pos': 'https://images.unsplash.com/photo-1556745757-8d76bdb6984b?w=800&h=600&fit=crop&q=85',
  'shopmate-erp': 'https://images.unsplash.com/photo-1563013545-824ae1b704d3?w=800&h=600&fit=crop&q=85',
  'invoicehub': 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop&q=85',
  'payroll-bill': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&q=85',
  'billmaster-pro': 'https://images.unsplash.com/photo-1554224154-8d04fac62c92?w=800&h=600&fit=crop&q=85',
  'edumanage-pro': 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop&q=85',
  'campus-sync': 'https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
  'schooledge': 'https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
  'workflow-suite': 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop&q=85',
  'collabdesk': 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
  'taskflow-pro': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop&q=85',
  // Real cable / adapter product photos
  'vga-cable-1.5m': 'https://upload.wikimedia.org/wikipedia/commons/d/d8/Xbox_360_VGA_cable.jpg',
  'vga-cable-3m': 'https://commons.wikimedia.org/wiki/Special:FilePath/VGA_connector.jpg?width=800',
  'usb-cable-micro-1m': 'https://images.pexels.com/photos/4219862/pexels-photo-4219862.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
  'usb-cable-type-c-1m': 'https://images.pexels.com/photos/6886681/pexels-photo-6886681.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
  'usb-extension-1m': 'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
  'hdmi-usb-adapter': 'https://commons.wikimedia.org/wiki/Special:FilePath/HDMI_Connector.jpg?width=800',
};

// If a URL fails, copy an existing sibling image
const FALLBACK = {
  'gstwise-billing': 'ledgermax-pro',
  'shieldguard-av-6m': 'shieldguard-av',
  'quickshield-6m': 'safenet-security',
  'retailpro-pos': 'billeease-pos',
  'shopmate-erp': 'billeease-pos',
  'billmaster-pro': 'invoicehub',
  'campus-sync': 'edumanage-pro',
  'schooledge': 'edumanage-pro',
  'collabdesk': 'workflow-suite',
  'taskflow-pro': 'workflow-suite',
};

function download(url, redirects = 0) {
  return new Promise((resolve, reject) => {
    if (redirects > 8) return reject(new Error('too many redirects'));
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, { headers: { 'User-Agent': UA } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const next = res.headers.location.startsWith('http')
          ? res.headers.location
          : new URL(res.headers.location, url).href;
        res.resume();
        return download(next, redirects + 1).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode}`));
        res.resume();
        return;
      }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    });
    req.on('error', reject);
    req.setTimeout(45000, () => req.destroy(new Error('timeout')));
  });
}

async function main() {
  let ok = 0;
  let fail = 0;
  for (const [id, url] of Object.entries(PHOTOS)) {
    const out = path.join(dir, `${id}.jpg`);
    try {
      process.stdout.write(`Downloading ${id}... `);
      const buf = await download(url);
      if (buf.length < 5000) throw new Error('file too small');
      fs.writeFileSync(out, buf);
      console.log(`OK (${(buf.length / 1024).toFixed(0)} KB)`);
      ok++;
    } catch (err) {
      console.log(`FAIL: ${err.message}`);
      const fb = FALLBACK[id];
      const fbPath = path.join(dir, `${fb}.jpg`);
      if (fb && fs.existsSync(fbPath)) {
        fs.copyFileSync(fbPath, out);
        console.log(`  → copied fallback from ${fb}`);
        ok++;
      } else {
        fail++;
      }
    }
  }
  console.log(`\nDone: ${ok} images ready, ${fail} still missing`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
