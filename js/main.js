function renderHeader() {
  const catLinks = CATEGORIES.map(
    (c) => `<a href="category.html?cat=${c.slug}">${c.name}</a>`
  ).join('');

  return `
  <header class="site-header">
    <div class="header-top">
      <div class="container header-top-inner">
        <span>📞 <a href="tel:${WAREPRO.phone}">${WAREPRO.phoneDisplay}</a></span>
        <span>✉️ <a href="mailto:${WAREPRO.email}">${WAREPRO.email}</a></span>
      </div>
    </div>
    <div class="container header-main">
      <a href="index.html" class="logo">Ware<span>pro</span></a>
      <nav class="main-nav" id="main-nav">
        <div class="nav-dropdown">
          <a href="categories.html" class="nav-link">Categories ▾</a>
          <div class="dropdown-menu">${catLinks}</div>
        </div>
        <a href="categories.html" class="nav-link">All Products</a>
        <a href="about.html" class="nav-link">About</a>
        <a href="contact.html" class="nav-link">Contact</a>
      </nav>
      <div class="header-actions">
        <a href="cart.html" class="cart-link">
          🛒 Cart <span class="cart-badge">0</span>
        </a>
        <button class="menu-toggle" id="menu-toggle" aria-label="Menu">☰</button>
      </div>
    </div>
  </header>`;
}

function renderFooter() {
  const catLinks = CATEGORIES.slice(0, 6).map(
    (c) => `<li><a href="category.html?cat=${c.slug}">${c.name}</a></li>`
  ).join('');

  return `
  <footer class="site-footer">
    <div class="container footer-grid">
      <div class="footer-col">
        <a href="index.html" class="logo footer-logo">Ware<span>pro</span></a>
        <p>Discover, compare & buy the best software for your business. India's trusted software marketplace.</p>
        <p class="footer-contact">
          <strong>Address:</strong><br>${WAREPRO.address}<br><br>
          <strong>Phone:</strong> <a href="tel:${WAREPRO.phone}">${WAREPRO.phoneDisplay}</a><br>
          <strong>Email:</strong> <a href="mailto:${WAREPRO.email}">${WAREPRO.email}</a>
        </p>
      </div>
      <div class="footer-col">
        <h4>Popular Categories</h4>
        <ul>${catLinks}</ul>
      </div>
      <div class="footer-col">
        <h4>Company</h4>
        <ul>
          <li><a href="about.html">About Us</a></li>
          <li><a href="contact.html">Contact Us</a></li>
          <li><a href="categories.html">Browse Software</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Legal</h4>
        <ul>
          <li><a href="terms.html">Terms & Conditions</a></li>
          <li><a href="privacy.html">Privacy Policy</a></li>
          <li><a href="refund.html">Refund Policy</a></li>
          <li><a href="cancellation.html">Cancellation Policy</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="container">
        <p>© ${new Date().getFullYear()} Warepro. All rights reserved. | Secure payments via Razorpay (UPI, Cards, Net Banking)</p>
      </div>
    </div>
  </footer>`;
}

function injectLayout() {
  const headerSlot = document.getElementById('site-header');
  const footerSlot = document.getElementById('site-footer');
  if (headerSlot) headerSlot.innerHTML = renderHeader();
  if (footerSlot) footerSlot.innerHTML = renderFooter();

  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
  }

  updateCartBadge();
}

function initFAQ() {
  document.querySelectorAll('.faq-question').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach((i) => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  injectLayout();
  initFAQ();
});

function renderLegalPage(title, content) {
  document.title = `${title} | Warepro`;
  const el = document.getElementById('legal-content');
  if (el) {
    el.innerHTML = `<h1>${title}</h1><div class="legal-body">${content}</div>`;
  }
}
