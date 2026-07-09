function renderProductCard(product) {
  const discount = getDiscount(product);
  const priceHtml = product.priceOnRequest || product.price === null
    ? '<span class="price-label">Starting Price:</span><span class="price por">Price on Request</span>'
    : `<span class="price-label">Starting at:</span>
       <span class="price">₹${product.price.toLocaleString('en-IN')}<small>${product.period || ''}</small></span>
       ${product.originalPrice ? `<span class="price-old">₹${product.originalPrice.toLocaleString('en-IN')}</span>` : ''}
       ${discount ? `<span class="badge-save">${discount}</span>` : ''}`;

  const buyBtn = product.priceOnRequest || product.price === null
    ? `<a href="contact.html" class="btn btn-outline btn-sm">Get Quote</a>`
    : `<button class="btn btn-primary btn-sm" onclick="handleAddToCart('${product.id}')">Add to Cart</button>`;

  return `
    <article class="product-card">
      <a href="product.html?id=${product.id}" class="product-card-link">
        <div class="product-icon-wrap">${getCategory(product.category)?.icon || '📦'}</div>
        <h3>${product.name}</h3>
        <p class="vendor">${product.vendor}</p>
        <div class="rating">${product.rating}</div>
        <div class="price-row">${priceHtml}</div>
      </a>
      <div class="product-card-actions">
        <a href="product.html?id=${product.id}" class="btn btn-outline btn-sm">View</a>
        ${buyBtn}
      </div>
    </article>`;
}

function renderCategoryCard(cat) {
  const count = getProductCount(cat.slug);
  const title = cat.shortName || cat.name.replace(' Software', '');
  const bg = cat.color || '#4a6478';
  const img = cat.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=420&fit=crop&q=80';
  return `
    <a href="category.html?cat=${cat.slug}" class="category-card-v2" style="--cat-color: ${bg}">
      <div class="cat-card-banner">
        <span class="cat-title-main">${title}</span>
        <span class="cat-title-sub">Software</span>
      </div>
      <div class="cat-card-photo">
        <img src="${img}" alt="${cat.name}" loading="lazy" width="220" height="200">
      </div>
      <div class="cat-card-hover">
        <p class="cat-hover-tagline">${cat.tagline}</p>
        <span class="cat-hover-link">${count} products →</span>
      </div>
    </a>`;
}

function renderProductGrid(products, containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  if (!products.length) {
    el.innerHTML = '<p class="empty-msg">No products in this category yet.</p>';
    return;
  }
  el.innerHTML = products.map(renderProductCard).join('');
}

function renderCategoryGrid(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  if (containerId === 'all-categories') {
    el.className = 'category-grid category-grid-all';
  }
  el.innerHTML = CATEGORIES.map((cat) => renderCategoryCard(cat)).join('');
}

function handleAddToCart(id) {
  if (addToCart(id)) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = 'Added to cart!';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  }
}

function initCategoryTabs(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const tabs = CATEGORIES.slice(0, 6).map((cat, i) =>
    `<button class="tab-btn ${i === 0 ? 'active' : ''}" data-cat="${cat.slug}">${cat.name.replace(' Software', '')}</button>`
  ).join('');

  container.innerHTML = `
    <div class="tabs">${tabs}</div>
    <div id="tab-products" class="product-grid"></div>`;

  const tabBtns = container.querySelectorAll('.tab-btn');
  const showCat = (slug) => {
    tabBtns.forEach((b) => b.classList.toggle('active', b.dataset.cat === slug));
    renderProductGrid(getProductsByCategory(slug), 'tab-products');
  };

  tabBtns.forEach((btn) => btn.addEventListener('click', () => showCat(btn.dataset.cat)));
  showCat(CATEGORIES[0].slug);
}

function initCategoryPage() {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('cat');
  const cat = getCategory(slug);
  if (!cat) {
    window.location.href = 'categories.html';
    return;
  }
  document.title = `${cat.name} | Warepro`;
  const titleEl = document.getElementById('page-title');
  const breadcrumbEl = document.getElementById('breadcrumb-cat');
  const descEl = document.getElementById('category-desc');
  if (titleEl) titleEl.textContent = cat.name;
  if (breadcrumbEl) breadcrumbEl.textContent = cat.name;
  if (descEl) descEl.textContent = cat.description;
  renderProductGrid(getProductsByCategory(slug), 'category-products');
}

function initProductPage() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const product = getProduct(id);
  if (!product) {
    window.location.href = 'categories.html';
    return;
  }
  const cat = getCategory(product.category);
  document.title = `${product.name} | Warepro`;

  const el = document.getElementById('product-detail');
  if (!el) return;

  const discount = getDiscount(product);
  const priceHtml = product.priceOnRequest || product.price === null
    ? '<p class="price-large por">Price on Request</p><a href="contact.html" class="btn btn-primary">Request Quote</a>'
    : `<p class="price-large">₹${product.price.toLocaleString('en-IN')}<small>${product.period || ''}</small></p>
       ${product.originalPrice ? `<p class="price-old-lg">₹${product.originalPrice.toLocaleString('en-IN')}</p>` : ''}
       ${discount ? `<span class="badge-save">${discount}</span>` : ''}
       <button class="btn btn-primary btn-lg" onclick="handleAddToCart('${product.id}')">Add to Cart</button>
       <a href="checkout.html" class="btn btn-outline btn-lg">Buy Now</a>`;

  el.innerHTML = `
    <nav class="breadcrumb"><a href="index.html">Home</a> › <a href="category.html?cat=${product.category}">${cat?.name || ''}</a> › ${product.name}</nav>
    <div class="product-detail-grid">
      <div class="product-detail-visual">${cat?.icon || '📦'}</div>
      <div class="product-detail-info">
        <h1>${product.name}</h1>
        <p class="vendor">${product.vendor}</p>
        <div class="rating">★ ${product.rating} / 5</div>
        ${priceHtml}
        <p class="product-desc">${product.description}</p>
        <h3>Key Features</h3>
        <ul class="feature-list">${product.features.map((f) => `<li>${f}</li>`).join('')}</ul>
      </div>
    </div>`;
}

function initDealsSection(containerId) {
  const deals = PRODUCTS.filter((p) => p.originalPrice && p.price).slice(0, 6);
  renderProductGrid(deals, containerId);
}

function initTrendingSection(containerId) {
  const trending = [...PRODUCTS].sort((a, b) => b.rating - a.rating).slice(0, 8);
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = `<div class="scroll-row">${trending.map(renderProductCard).join('')}</div>`;
}
